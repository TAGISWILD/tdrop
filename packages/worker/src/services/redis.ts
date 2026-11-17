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
const memoryViews = new Map<string, number>();
const memoryDownloads = new Map<string, number>();
const memoryBlockedIps = new Map<string, { expiresAt: number; reason: string }>();
let totalLinksCreatedMemory = 0;

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
    let success = false;

    if (this.redis) {
      const res = await this.redis.set(key, JSON.stringify(meta), {
        nx: true,
        ex: ttlSeconds,
      });
      success = res === "OK";
    } else if (this.kv) {
      // Check collision
      const existing = await this.kv.get(key);
      if (!existing) {
        // KV requires minimum 60 seconds expirationTtl
        const expirationTtl = Math.max(60, ttlSeconds);
        await this.kv.put(key, JSON.stringify(meta), { expirationTtl });
        success = true;
      }
    } else {
      // Memory fallback
      if (!memoryStore.has(key) || Date.now() > memoryStore.get(key)!.expiresAt) {
        memoryStore.set(key, {
          value: meta,
          expiresAt: Date.now() + ttlSeconds * 1000,
        });
        success = true;
      }
    }

    if (success) {
      await this.incrementTotalLinks().catch(() => {});
      await this.recordDropInOpsIndex(meta, ttlSeconds).catch(() => {});
    }

    return success;
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
    await this.removeDropFromOpsIndex(code).catch(() => {});
  }

  async isBlocked(ipHash: string, rawIp?: string): Promise<boolean> {
    const now = Date.now();

    // 1. Check raw IP ban (Admin Ops Block)
    if (rawIp) {
      const mem = memoryBlockedIps.get(rawIp);
      if (mem) {
        if (now <= mem.expiresAt) return true;
        memoryBlockedIps.delete(rawIp);
      }
      const rawKey = `tdrop:blocked_ip:${rawIp}`;
      if (this.redis) {
        const b = await this.redis.get(rawKey);
        if (b) return true;
      } else if (this.kv) {
        const b = await this.kv.get(rawKey);
        if (b) return true;
      }
    }

    // 2. Check hashed IP block (Probe Tripwire)
    const expiresAt = memoryBlocks.get(ipHash);
    if (expiresAt && now <= expiresAt) {
      return true;
    }

    const key = `tdrop:blocked:${ipHash}`;
    if (this.redis) {
      const blocked = await this.redis.get(key);
      return Boolean(blocked);
    }
    if (this.kv) {
      const blocked = await this.kv.get(key);
      return Boolean(blocked);
    }

    return false;
  }

  // --- Views & Downloads Tracking ---

  async incrementViews(code: string): Promise<number> {
    const key = `tdrop:views:${code}`;
    if (this.redis) {
      return await this.redis.incr(key);
    }
    if (this.kv) {
      const cur = parseInt((await this.kv.get(key)) || "0", 10) + 1;
      await this.kv.put(key, cur.toString(), { expirationTtl: 604800 });
      return cur;
    }
    const cur = (memoryViews.get(code) || 0) + 1;
    memoryViews.set(code, cur);
    return cur;
  }

  async getViews(code: string): Promise<number> {
    const key = `tdrop:views:${code}`;
    if (this.redis) {
      const v = await this.redis.get<string | number>(key);
      return v ? Number(v) : 0;
    }
    if (this.kv) {
      const v = await this.kv.get(key);
      return v ? parseInt(v, 10) : 0;
    }
    return memoryViews.get(code) || 0;
  }

  async incrementDownloads(code: string): Promise<number> {
    const key = `tdrop:downloads:${code}`;
    if (this.redis) {
      return await this.redis.incr(key);
    }
    if (this.kv) {
      const cur = parseInt((await this.kv.get(key)) || "0", 10) + 1;
      await this.kv.put(key, cur.toString(), { expirationTtl: 604800 });
      return cur;
    }
    const cur = (memoryDownloads.get(code) || 0) + 1;
    memoryDownloads.set(code, cur);
    return cur;
  }

  async getDownloads(code: string): Promise<number> {
    const key = `tdrop:downloads:${code}`;
    if (this.redis) {
      const v = await this.redis.get<string | number>(key);
      return v ? Number(v) : 0;
    }
    if (this.kv) {
      const v = await this.kv.get(key);
      return v ? parseInt(v, 10) : 0;
    }
    return memoryDownloads.get(code) || 0;
  }

  // --- Total Links Created Counter ---

  async incrementTotalLinks(): Promise<number> {
    const key = "tdrop:stats:total_links_created";
    if (this.redis) {
      return await this.redis.incr(key);
    }
    if (this.kv) {
      const cur = parseInt((await this.kv.get(key)) || "0", 10) + 1;
      await this.kv.put(key, cur.toString());
      return cur;
    }
    totalLinksCreatedMemory += 1;
    return totalLinksCreatedMemory;
  }

  async getTotalLinksCreated(): Promise<number> {
    const key = "tdrop:stats:total_links_created";
    if (this.redis) {
      const v = await this.redis.get<string | number>(key);
      return v ? Number(v) : 0;
    }
    if (this.kv) {
      const v = await this.kv.get(key);
      return v ? parseInt(v, 10) : 0;
    }
    return totalLinksCreatedMemory;
  }

  // --- Drop Indexing for Ops Forensics ---

  async recordDropInOpsIndex(meta: FileMetadata, ttlSeconds: number): Promise<void> {
    const summary = {
      code: meta.code,
      filename: meta.filename,
      size: meta.size,
      mimeType: meta.mimeType,
      createdAt: meta.createdAt,
      expiresAt: meta.expiresAt,
      uploaderIp: meta.uploaderIp || "127.0.0.1",
      uploaderSource: meta.uploaderSource || "Web Drop",
      country: meta.country || "XX",
      colo: meta.colo || "EDGE",
      status: meta.status,
    };

    if (this.redis) {
      try {
        await this.redis.lpush("tdrop:ops:recent_drops", JSON.stringify(summary));
        await this.redis.ltrim("tdrop:ops:recent_drops", 0, 499);
      } catch (e) {
        console.warn("[tdrop:ops] Failed to index drop in Redis:", e);
      }
    } else if (this.kv) {
      try {
        const raw = await this.kv.get("tdrop:ops:recent_drops");
        const list = raw ? JSON.parse(raw) : [];
        list.unshift(summary);
        if (list.length > 500) list.pop();
        await this.kv.put("tdrop:ops:recent_drops", JSON.stringify(list));
      } catch (e) {
        console.warn("[tdrop:ops] Failed to index drop in KV:", e);
      }
    }
  }

  async removeDropFromOpsIndex(code: string): Promise<void> {
    if (this.redis) {
      try {
        const items = await this.redis.lrange<string>("tdrop:ops:recent_drops", 0, 499);
        const filtered = items
          .map((s) => (typeof s === "string" ? JSON.parse(s) : s))
          .filter((it: any) => it.code !== code);
        await this.redis.del("tdrop:ops:recent_drops");
        if (filtered.length > 0) {
          const pipe = this.redis.pipeline();
          for (let i = filtered.length - 1; i >= 0; i--) {
            pipe.lpush("tdrop:ops:recent_drops", JSON.stringify(filtered[i]));
          }
          await pipe.exec();
        }
      } catch {}
    } else if (this.kv) {
      try {
        const raw = await this.kv.get("tdrop:ops:recent_drops");
        if (raw) {
          const list = JSON.parse(raw).filter((it: any) => it.code !== code);
          await this.kv.put("tdrop:ops:recent_drops", JSON.stringify(list));
        }
      } catch {}
    }
  }

  async listRecentDrops(limit = 100): Promise<Array<FileMetadata & { views: number; downloads: number }>> {
    let items: any[] = [];

    if (this.redis) {
      try {
        const rawList = await this.redis.lrange<string>("tdrop:ops:recent_drops", 0, limit - 1);
        items = rawList.map((s) => (typeof s === "string" ? JSON.parse(s) : s));
      } catch {}
    } else if (this.kv) {
      try {
        const raw = await this.kv.get("tdrop:ops:recent_drops");
        if (raw) {
          items = JSON.parse(raw).slice(0, limit);
        }
      } catch {}
    }

    // Memory fallback for tests / local
    if (items.length === 0) {
      const now = Date.now();
      for (const [k, v] of memoryStore.entries()) {
        if (k.startsWith("tdrop:code:") && v.expiresAt > now) {
          items.push(v.value);
        }
      }
    }

    const now = Date.now();
    const result: Array<FileMetadata & { views: number; downloads: number }> = [];

    for (const item of items) {
      if (item.expiresAt && item.expiresAt <= now) continue;
      const views = await this.getViews(item.code);
      const downloads = await this.getDownloads(item.code);
      result.push({
        ...item,
        views,
        downloads,
      });
    }

    return result;
  }

  // --- IP Blacklisting for Abuse Prevention (Miners / Malicious APKs) ---

  async blockRawIp(rawIp: string, durationSeconds: number = 86400, reason = "Admin Ban"): Promise<void> {
    const key = `tdrop:blocked_ip:${rawIp}`;
    const payload = JSON.stringify({ ip: rawIp, reason, expiresAt: Date.now() + durationSeconds * 1000 });

    if (this.redis) {
      await this.redis.set(key, payload, { ex: durationSeconds });
      await this.redis.sadd("tdrop:ops:blocked_ips_set", rawIp);
    } else if (this.kv) {
      await this.kv.put(key, payload, { expirationTtl: Math.max(60, durationSeconds) });
      const rawSet = (await this.kv.get<string[]>("tdrop:ops:blocked_ips_set", "json")) || [];
      if (!rawSet.includes(rawIp)) {
        rawSet.push(rawIp);
        await this.kv.put("tdrop:ops:blocked_ips_set", JSON.stringify(rawSet));
      }
    }
    memoryBlockedIps.set(rawIp, { expiresAt: Date.now() + durationSeconds * 1000, reason });
  }

  async unblockRawIp(rawIp: string): Promise<boolean> {
    const key = `tdrop:blocked_ip:${rawIp}`;
    if (this.redis) {
      await this.redis.del(key);
      await this.redis.srem("tdrop:ops:blocked_ips_set", rawIp);
    } else if (this.kv) {
      await this.kv.delete(key);
      const rawSet = (await this.kv.get<string[]>("tdrop:ops:blocked_ips_set", "json")) || [];
      const updated = rawSet.filter((ip) => ip !== rawIp);
      await this.kv.put("tdrop:ops:blocked_ips_set", JSON.stringify(updated));
    }
    memoryBlockedIps.delete(rawIp);
    return true;
  }

  async listBlockedIps(): Promise<Array<{ ip: string; expiresAt: number; reason: string }>> {
    const list: Array<{ ip: string; expiresAt: number; reason: string }> = [];
    const now = Date.now();

    for (const [ip, info] of memoryBlockedIps.entries()) {
      if (info.expiresAt > now) {
        list.push({ ip, expiresAt: info.expiresAt, reason: info.reason });
      }
    }

    if (this.kv) {
      try {
        const rawSet = (await this.kv.get<string[]>("tdrop:ops:blocked_ips_set", "json")) || [];
        for (const ip of rawSet) {
          const item = await this.kv.get<{ ip: string; expiresAt: number; reason: string }>(`tdrop:blocked_ip:${ip}`, "json");
          if (item && item.expiresAt > now) {
            if (!list.find((x) => x.ip === ip)) list.push(item);
          }
        }
      } catch {}
    } else if (this.redis) {
      try {
        const set = await this.redis.smembers("tdrop:ops:blocked_ips_set");
        for (const ip of set) {
          const raw = await this.redis.get<string>(`tdrop:blocked_ip:${ip}`);
          if (raw) {
            const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
            if (parsed.expiresAt > now && !list.find((x) => x.ip === ip)) {
              list.push(parsed);
            }
          }
        }
      } catch {}
    }

    return list;
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
