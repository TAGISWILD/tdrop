import { describe, it, expect, beforeEach } from "vitest";
import app from "../src/index.js";

describe("Stealth Ops & Anti-Abuse Forensics API", () => {
  const deletedObjects: string[] = [];

  const mockBucket = {
    put: async () => {},
    get: async (key: string) => ({
      body: new Uint8Array([1, 2, 3]),
      size: 3,
    }),
    delete: async (key: string) => {
      deletedObjects.push(key);
    },
    list: async () => ({ objects: [] }),
  };

  const mockEnv = {
    BUCKET: mockBucket as any,
    APP_DOMAIN: "tdrop.link",
    RATE_LIMIT_SECRET: "test_secret_salt",
    ADMIN_SECRET: "test_admin_ops_secret_key",
  };

  const validHeaders = {
    "x-tdrop-ops-key": "test_admin_ops_secret_key",
    "x-tdrop-ops-client": "tdrop-admin-tui",
  };

  beforeEach(() => {
    deletedObjects.length = 0;
  });

  describe("Stealth Security Guard", () => {
    it("should return 404 Not Found on /api/ops/* when accessed without headers", async () => {
      const res = await app.request("/api/ops/summary", {}, mockEnv);
      expect(res.status).toBe(404);
      const data = (await res.json()) as any;
      expect(data.error).toBe("Not Found");
    });

    it("should return 404 Not Found when accessed with invalid key or missing client header", async () => {
      const res1 = await app.request(
        "/api/ops/summary",
        { headers: { "x-tdrop-ops-key": "wrong_key", "x-tdrop-ops-client": "tdrop-admin-tui" } },
        mockEnv
      );
      expect(res1.status).toBe(404);

      const res2 = await app.request(
        "/api/ops/summary",
        { headers: { "x-tdrop-ops-key": "test_admin_ops_secret_key" } },
        mockEnv
      );
      expect(res2.status).toBe(404);
    });

    it("should grant access with HTTP 200 when valid stealth headers are provided", async () => {
      const res = await app.request("/api/ops/summary", { headers: validHeaders }, mockEnv);
      expect(res.status).toBe(200);
      const data = (await res.json()) as any;
      expect(data.success).toBe(true);
      expect(data.summary).toHaveProperty("totalLinksCreated");
      expect(data.summary).toHaveProperty("activeDropsCount");
      expect(data.summary).toHaveProperty("totalViews");
      expect(data.summary).toHaveProperty("totalDownloads");
    });
  });

  describe("Upload, View, Download & Uploader IP Tracking", () => {
    it("should capture uploader IP and track views and downloads", async () => {
      // 1. Upload a file simulating a client with CF-Connecting-IP
      const formData = new FormData();
      const file = new File(["console.log('hello');"], "app-test.js", { type: "application/javascript" });
      formData.append("file", file);
      formData.append("ttl", "1h");

      const uploadRes = await app.request(
        "/upload",
        {
          method: "POST",
          headers: {
            "cf-connecting-ip": "198.51.100.42",
            "user-agent": "curl/7.88.1",
          },
          body: formData,
        },
        mockEnv
      );

      expect(uploadRes.status).toBe(201);
      const uploadData = (await uploadRes.json()) as any;
      const code = uploadData.code;
      expect(code).toBeDefined();

      // 2. View the link (Browser preview request)
      const viewRes = await app.request(
        `/${code}`,
        {
          headers: {
            accept: "text/html",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
          },
        },
        mockEnv
      );
      expect(viewRes.status).toBe(200);

      // 3. Download the link (Explicit download request)
      const downloadRes = await app.request(
        `/${code}?download=true`,
        {
          headers: {
            "cf-connecting-ip": "203.0.113.19",
          },
        },
        mockEnv
      );
      expect(downloadRes.status).toBe(200);

      // 4. Verify in Ops API
      const inspectRes = await app.request(`/api/ops/link/${code}`, { headers: validHeaders }, mockEnv);
      expect(inspectRes.status).toBe(200);
      const inspectData = (await inspectRes.json()) as any;

      expect(inspectData.success).toBe(true);
      expect(inspectData.link.code).toBe(code);
      expect(inspectData.link.uploaderIp).toBe("198.51.100.42");
      expect(inspectData.link.uploaderSource).toBe("cURL");
      expect(inspectData.link.views).toBeGreaterThanOrEqual(1);
      expect(inspectData.link.downloads).toBeGreaterThanOrEqual(1);
    });

    it("should detect suspicious APK and crypto miner keywords", async () => {
      const formData = new FormData();
      const file = new File(["malicious payload"], "xmrig-miner-payload.apk", {
        type: "application/vnd.android.package-archive",
      });
      formData.append("file", file);
      formData.append("ttl", "1h");

      const uploadRes = await app.request(
        "/upload",
        {
          method: "POST",
          headers: {
            "cf-connecting-ip": "185.220.101.5",
            "user-agent": "tdrop-cli/1.0.1",
          },
          body: formData,
        },
        mockEnv
      );

      expect(uploadRes.status).toBe(201);
      const uploadData = (await uploadRes.json()) as any;
      const code = uploadData.code;

      // Query suspicious filter
      const suspiciousRes = await app.request(
        "/api/ops/links?filter=suspicious",
        { headers: validHeaders },
        mockEnv
      );
      expect(suspiciousRes.status).toBe(200);
      const susData = (await suspiciousRes.json()) as any;

      const found = susData.links.find((l: any) => l.code === code);
      expect(found).toBeDefined();
      expect(found.isSuspicious).toBe(true);
      expect(found.uploaderIp).toBe("185.220.101.5");
      expect(found.uploaderSource).toBe("CLI (npx tdrop)");
      expect(found.suspiciousReason).toContain("APK");
    });
  });

  describe("Incident Mitigation: Instant Takedown & IP Ban", () => {
    it("should allow instant purge/incinerate of a malicious drop", async () => {
      // 1. Upload a file to purge
      const formData = new FormData();
      const file = new File(["miner payload"], "miner.sh", { type: "text/x-sh" });
      formData.append("file", file);
      formData.append("ttl", "1h");

      const uploadRes = await app.request("/upload", { method: "POST", body: formData }, mockEnv);
      const code = (await uploadRes.json() as any).code;

      // 2. Execute instant purge via DELETE /api/ops/link/:code
      const purgeRes = await app.request(
        `/api/ops/link/${code}`,
        { method: "DELETE", headers: validHeaders },
        mockEnv
      );
      expect(purgeRes.status).toBe(200);
      const purgeData = (await purgeRes.json()) as any;
      expect(purgeData.success).toBe(true);
      expect(purgeData.purged.code).toBe(code);

      // Verify deleted from R2
      expect(deletedObjects.length).toBeGreaterThan(0);

      // 3. Verify link is no longer accessible
      const checkRes = await app.request(`/${code}`, {}, mockEnv);
      expect(checkRes.status).toBe(404);
    });

    it("should allow banning and unbanning malicious uploader IPs", async () => {
      const maliciousIp = "192.0.2.123";

      // 1. Block the IP
      const blockRes = await app.request(
        "/api/ops/block-ip",
        {
          method: "POST",
          headers: { ...validHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({
            ip: maliciousIp,
            reason: "Bitcoin miner campaign",
            durationSeconds: 3600,
          }),
        },
        mockEnv
      );
      expect(blockRes.status).toBe(200);

      // 2. Check blocked list
      const listRes = await app.request("/api/ops/blocked-ips", { headers: validHeaders }, mockEnv);
      expect(listRes.status).toBe(200);
      const listData = (await listRes.json()) as any;
      expect(listData.blockedIps.some((b: any) => b.ip === maliciousIp)).toBe(true);

      // 3. Malicious IP tries to upload -> should be rejected with 429
      const formData = new FormData();
      formData.append("file", new File(["test"], "test.txt", { type: "text/plain" }));
      formData.append("ttl", "1h");

      const blockedUploadRes = await app.request(
        "/upload",
        {
          method: "POST",
          headers: { "cf-connecting-ip": maliciousIp },
          body: formData,
        },
        mockEnv
      );
      expect(blockedUploadRes.status).toBe(429);

      // 4. Unblock the IP
      const unblockRes = await app.request(
        "/api/ops/unblock-ip",
        {
          method: "POST",
          headers: { ...validHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ ip: maliciousIp }),
        },
        mockEnv
      );
      expect(unblockRes.status).toBe(200);
    });
  });
});
