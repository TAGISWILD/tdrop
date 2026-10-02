import { Redis } from "@upstash/redis";
import type { FileMetadata, ScanStatus } from "@tdrop/shared";
import {
  TOKEN_BUCKET_CAPACITY,
  TOKEN_BUCKET_REFILL_RATE,
  MAX_PROBES_BEFORE_BLOCK,
  PROBE_WINDOW_MS,
  BLOCK_DURATION_SECONDS,
} from "@tdrop/shared";
import type { Bindings } from "../types.js";

// In-memory fallback for unit testing
const memoryStore = new Map<string, { value: any; expiresAt: number }>();
const memoryProbes = new Map<string, number[]>();
const memoryBlocks = new Map<string, number>();

export class MetadataService {
  private redis: Redis | null = null;
  private kv: KVNamespace | null = null;

  constructor(env: Bindings) {
    if (env.METADATA) {
      this.kv = env.METADATA;
    }
    if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
      this.redis = new Redis({
        url: env.UPSTASH_REDIS_REST_URL,
        token: env.UPSTASH_REDIS_REST_TOKEN,
      });
    }
  }

  async getMetadata(code: string): Promise<FileMetadata | null> {
    const key = `tdrop:code:${code}`;
    if (this.redis) {
      return await this.redis.get<FileMetadata>(key);
    }
    if (this.kv) {
      return await this.kv.get<FileMetadata>(key, "json");
    }

    // Memory fallback
    const item = memoryStore.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      memoryStore.delete(key);
      return null;
    }
    return item.value;
  }

  async setMetadata(code: string, meta: FileMetadata, ttlSeconds: number): Promise<boolean> {
    const key = `tdrop:code:${code}`;
    if (this.redis) {
      const res = await this.redis.set(key, JSON.stringify(meta), {
        nx: true,
        ex: ttlSeconds,
      });
      return res === "OK";
    }
    if (this.kv) {
      // Check collision
      const existing = await this.kv.get(key);
      if (existing) return false;

      // KV requires minimum 60 seconds expirationTtl
      const expirationTtl = Math.max(60, ttlSeconds);
      await this.kv.put(key, JSON.stringify(meta), { expirationTtl });
      return true;
    }

    // Memory fallback
    if (memoryStore.has(key)) {
      const existing = memoryStore.get(key)!;
      if (Date.now() <= existing.expiresAt) {
        return false;
      }
    }
    memoryStore.set(key, {
      value: meta,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
    return true;
  }

  async updateStatus(code: string, status: ScanStatus, malwareClean: boolean): Promise<void> {
    const meta = await this.getMetadata(code);
    if (!meta) return;

    meta.status = status;
    meta.malwareClean = malwareClean;

    const remainingTtl = Math.max(60, Math.floor((meta.expiresAt - Date.now()) / 1000));
    const key = `tdrop:code:${code}`;

    if (this.redis) {
      await this.redis.set(key, JSON.stringify(meta), { ex: remainingTtl });
    } else if (this.kv) {
      await this.kv.put(key, JSON.stringify(meta), { expirationTtl: remainingTtl });
    } else {
      memoryStore.set(key, {
        value: meta,
        expiresAt: meta.expiresAt,
      });
    }
  }

  async deleteMetadata(code: string): Promise<void> {
    const key = `tdrop:code:${code}`;
    if (this.redis) {
      await this.redis.del(key);
    } else if (this.kv) {
      await this.kv.delete(key);
    } else {
      memoryStore.delete(key);
    }
  }

  async isBlocked(ipHash: string): Promise<boolean> {
    const key = `tdrop:blocked:${ipHash}`;
    if (this.redis) {
      const blocked = await this.redis.get(key);
      return Boolean(blocked);
    }
    if (this.kv) {
      const blocked = await this.kv.get(key);
      return Boolean(blocked);
    }
    const expiresAt = memoryBlocks.get(ipHash);
    if (!expiresAt) return false;
    if (Date.now() > expiresAt) {
      memoryBlocks.delete(ipHash);
      return false;
    }
    return true;
  }

  async recordFailedProbe(ipHash: string): Promise<boolean> {
    const now = Date.now();
    const probeKey = `tdrop:probe:${ipHash}`;
    const blockKey = `tdrop:blocked:${ipHash}`;

    if (this.redis) {
      const pipeline = this.redis.pipeline();
      pipeline.zremrangebyscore(probeKey, 0, now - PROBE_WINDOW_MS);
      pipeline.zadd(probeKey, { score: now, member: `${now}-${Math.random()}` });
      pipeline.zcard(probeKey);
      pipeline.expire(probeKey, Math.ceil(PROBE_WINDOW_MS / 1000));

      const results = await pipeline.exec<[number, number, number, number]>();
      const probeCount = results[2];

      if (probeCount >= MAX_PROBES_BEFORE_BLOCK) {
        await this.redis.set(blockKey, 1, { ex: BLOCK_DURATION_SECONDS });
        return true;
      }
      return false;
    }

    if (this.kv) {
      const existing = (await this.kv.get<number[]>(probeKey, "json")) || [];
      const valid = existing.filter((t) => now - t <= PROBE_WINDOW_MS);
      valid.push(now);

      if (valid.length >= MAX_PROBES_BEFORE_BLOCK) {
        await this.kv.put(blockKey, "1", { expirationTtl: BLOCK_DURATION_SECONDS });
        return true;
      } else {
        await this.kv.put(probeKey, JSON.stringify(valid), { expirationTtl: 300 });
        return false;
      }
    }

    // Memory fallback
    let timestamps = memoryProbes.get(ipHash) || [];
    timestamps = timestamps.filter((t) => now - t <= PROBE_WINDOW_MS);
    timestamps.push(now);
    memoryProbes.set(ipHash, timestamps);

    if (timestamps.length >= MAX_PROBES_BEFORE_BLOCK) {
      memoryBlocks.set(ipHash, now + BLOCK_DURATION_SECONDS * 1000);
      return true;
    }
    return false;
  }

  async checkRateLimit(ipHash: string): Promise<boolean> {
    const bucketKey = `tdrop:bucket:${ipHash}`;
    const now = Date.now();

    if (this.redis) {
      const data = await this.redis.hmget<{ tokens?: string; last_refill?: string }>(
        bucketKey,
        "tokens",
        "last_refill"
      );

      let tokens = data?.tokens ? parseFloat(data.tokens) : TOKEN_BUCKET_CAPACITY;
      const lastRefill = data?.last_refill ? parseInt(data.last_refill, 10) : now;

      const elapsedSec = Math.max(0, (now - lastRefill) / 1000);
      tokens = Math.min(TOKEN_BUCKET_CAPACITY, tokens + elapsedSec * TOKEN_BUCKET_REFILL_RATE);

      if (tokens >= 1) {
        tokens -= 1;
        await this.redis.hset(bucketKey, {
          tokens: tokens.toString(),
          last_refill: now.toString(),
        });
        await this.redis.expire(bucketKey, 120);
        return true;
      }
      return false;
    }

    // Memory or KV fallback
    const key = `rate:${ipHash}`;
    const item = memoryStore.get(key);
    let tokens = item ? item.value.tokens : TOKEN_BUCKET_CAPACITY;
    let lastRefill = item ? item.value.lastRefill : now;

    const elapsedSec = Math.max(0, (now - lastRefill) / 1000);
    tokens = Math.min(TOKEN_BUCKET_CAPACITY, tokens + elapsedSec * TOKEN_BUCKET_REFILL_RATE);

    if (tokens >= 1) {
      tokens -= 1;
      memoryStore.set(key, {
        value: { tokens, lastRefill: now },
        expiresAt: now + 120_000,
      });
      return true;
    }
    return false;
  }
}
