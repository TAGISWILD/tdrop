import { describe, it, expect } from "vitest";
import app from "../src/index.js";
import { createByteLimitGuard, PayloadTooLargeError } from "../src/services/stream-guard.js";
import { MetadataService } from "../src/services/redis.js";
import { MAX_FREE_BYTES } from "@tdrop/shared";

describe("@tdrop/worker", () => {
  const mockEnv = {
    BUCKET: {} as any,
    APP_DOMAIN: "tdrop.link",
    RATE_LIMIT_SECRET: "test_secret_salt",
  };

  describe("Public Endpoints", () => {
    it("should return healthy status on GET /health", async () => {
      const res = await app.request("/health", {}, mockEnv);
      expect(res.status).toBe(200);
      const data = (await res.json()) as any;
      expect(data.status).toBe("healthy");
      expect(data.service).toBe("tdrop-edge");
    });

    it("should return documentation on GET /", async () => {
      const res = await app.request("/", {}, mockEnv);
      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).toContain("tdrop (Terminal Drop)");
      expect(text).toContain("npx tdrop");
    });

    it("should return a sponsored blip on GET /blip", async () => {
      const res = await app.request("/blip", {}, mockEnv);
      expect(res.status).toBe(200);
      const data = (await res.json()) as any;
      expect(data).toHaveProperty("sponsor");
      expect(data).toHaveProperty("text");
      expect(data).toHaveProperty("url");
    });
  });

  describe("ByteLimitGuard (10MB Strict Free Limit)", () => {
    it("should allow data under 10MB without error", async () => {
      const guard = createByteLimitGuard(MAX_FREE_BYTES);
      const chunk = new Uint8Array(1024 * 1024); // 1MB
      const source = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(chunk);
          controller.close();
        },
      });

      const guarded = source.pipeThrough(guard);
      const reader = guarded.getReader();
      const { value, done } = await reader.read();

      expect(done).toBe(false);
      expect(value?.byteLength).toBe(1024 * 1024);
      expect(guard.getBytesRead()).toBe(1024 * 1024);
    });

    it("should abort immediately with PayloadTooLargeError when exceeding 10MB", async () => {
      const guard = createByteLimitGuard(100); // 100 bytes limit for test
      const chunk = new Uint8Array(101); // 101 bytes
      const source = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(chunk);
          controller.close();
        },
      });

      const guarded = source.pipeThrough(guard);
      const reader = guarded.getReader();

      await expect(reader.read()).rejects.toThrow(PayloadTooLargeError);
    });
  });

  describe("Probe Protection Tripwire (Anti-Brute Force)", () => {
    it("should block client after 15 invalid probes", async () => {
      const redis = new MetadataService(mockEnv);
      const ipHash = "test_attacker_ip_hash";

      expect(await redis.isBlocked(ipHash)).toBe(false);

      // Record 14 probes -> not yet blocked
      for (let i = 0; i < 14; i++) {
        const blocked = await redis.recordFailedProbe(ipHash);
        expect(blocked).toBe(false);
      }

      // 15th probe -> should trigger block
      const blocked = await redis.recordFailedProbe(ipHash);
      expect(blocked).toBe(true);
      expect(await redis.isBlocked(ipHash)).toBe(true);
    });
  });

  describe("Metadata & Status Lifecycle", () => {
    it("should store and retrieve file metadata correctly", async () => {
      const redis = new MetadataService(mockEnv);
      const code = "test1234";
      const meta = {
        code,
        objectKey: "objects/24h/quarantine/test-uuid",
        filename: "demo.zip",
        sanitizedFilename: "demo.zip",
        size: 5000,
        mimeType: "application/zip",
        createdAt: Date.now(),
        expiresAt: Date.now() + 86400 * 1000,
        ttlSeconds: 86400,
        retentionClass: "24h" as const,
        status: "PENDING_SCAN" as const,
        malwareClean: true,
      };

      const setRes = await redis.setMetadata(code, meta, 86400);
      expect(setRes).toBe(true);

      const retrieved = await redis.getMetadata(code);
      expect(retrieved).not.toBeNull();
      expect(retrieved?.filename).toBe("demo.zip");
      expect(retrieved?.status).toBe("PENDING_SCAN");

      // Update status to READY
      await redis.updateStatus(code, "READY", true);
      const updated = await redis.getMetadata(code);
      expect(updated?.status).toBe("READY");
    });
  });
});
