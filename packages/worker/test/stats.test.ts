import { describe, it, expect } from "vitest";
import app from "../src/index.js";

describe("Real Telemetry & Stats Dashboard API", () => {
  const mockBucket = {
    put: async () => {},
    get: async () => null,
    delete: async () => {},
    list: async () => ({ objects: [] }),
  };

  const mockEnv = {
    BUCKET: mockBucket as any,
    APP_DOMAIN: "tdrop.link",
    RATE_LIMIT_SECRET: "test_secret_salt",
  };

  it("should return HTML dashboard on GET /stats", async () => {
    const res = await app.request("/stats", {}, mockEnv);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("tdrop Telemetry");
    expect(html).toContain("Active Edge Regions");
    expect(html).toContain("Unique Developers");
    expect(html).toContain("Files Processed");
    expect(html).toContain("Terminal Ad CTR");
    expect(html).toContain("Why Sponsor tdrop?");
  });

  it("should return real storage telemetry JSON on GET /api/stats", async () => {
    const res = await app.request("/api/stats", {}, mockEnv);
    expect(res.status).toBe(200);
    const data = (await res.json()) as any;

    expect(data.success).toBe(true);
    expect(data).toHaveProperty("storageEngine");
    expect(data).toHaveProperty("globalFootprint");
    expect(data.globalFootprint.totalPoPs).toBe(312);
    expect(Array.isArray(data.globalFootprint.regions)).toBe(true);

    expect(data).toHaveProperty("community");
    expect(typeof data.community.totalDevelopers).toBe("number");
    expect(data.community).toHaveProperty("sourcesBreakdown");

    expect(data).toHaveProperty("infrastructure");
    expect(typeof data.infrastructure.totalFilesProcessed).toBe("number");
    expect(data.infrastructure.clamavCleanRate).toBe("100.0%");

    expect(data).toHaveProperty("sponsorship");
    expect(typeof data.sponsorship.totalBlipImpressions).toBe("number");
    expect(data.sponsorship).toHaveProperty("averageCtr");
    expect(Array.isArray(data.sponsorship.campaigns)).toBe(true);
  });

  it("should record real upload in telemetry when uploading a file", async () => {
    const formData = new FormData();
    const file = new File(["Hello Real Telemetry World!"], "telemetry-test.txt", {
      type: "text/plain",
    });
    formData.append("file", file);
    formData.append("ttl", "24h");

    // 1. Upload a file
    const uploadRes = await app.request(
      "/upload",
      {
        method: "POST",
        body: formData,
        headers: {
          "user-agent": "tdrop-cli/1.0.1",
        },
      },
      mockEnv
    );
    expect(uploadRes.status).toBe(201);

    // 2. Query /api/stats and verify the upload was recorded in real telemetry
    const statsRes = await app.request("/api/stats", {}, mockEnv);
    const stats = (await statsRes.json()) as any;

    expect(stats.infrastructure.totalFilesProcessed).toBeGreaterThanOrEqual(1);
    expect(stats.infrastructure.totalBytesProcessed).toBeGreaterThan(0);
    expect(stats.recentEvents.length).toBeGreaterThanOrEqual(1);
    expect(stats.recentEvents[0].filename).toMatch(/^drop_••••[a-f0-9]{4}\.txt$/);
    expect(stats.recentEvents[0].filename).not.toBe("telemetry-test.txt");
  });

  it("should support seeding sample test drops via POST /api/stats/seed", async () => {
    const res = await app.request(
      "/api/stats/seed",
      {
        method: "POST",
      },
      mockEnv
    );
    expect(res.status).toBe(200);
    const data = (await res.json()) as any;
    expect(data.success).toBe(true);
    expect(data.stats.recentEvents.length).toBeGreaterThanOrEqual(3);
  });
});
