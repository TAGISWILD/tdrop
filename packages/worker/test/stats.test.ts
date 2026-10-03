import { describe, it, expect } from "vitest";
import app from "../src/index.js";

describe("Stats Dashboard & Telemetry API", () => {
  const mockEnv = {
    BUCKET: {} as any,
    APP_DOMAIN: "tdrop.link",
    RATE_LIMIT_SECRET: "test_secret_salt",
  };

  it("should return HTML dashboard on GET /stats", async () => {
    const res = await app.request("/stats", {}, mockEnv);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("tdrop Telemetry");
    expect(html).toContain("Global Edge &");
    expect(html).toContain("World Edge Regions");
    expect(html).toContain("Developers Reached");
    expect(html).toContain("Files Processed");
    expect(html).toContain("Terminal Ad CTR");
    expect(html).toContain("Why Sponsor tdrop?");
  });

  it("should return HTML dashboard on GET /dashboard alias", async () => {
    const res = await app.request("/dashboard", {}, mockEnv);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Global Edge");
  });

  it("should return comprehensive JSON telemetry on GET /api/stats", async () => {
    const res = await app.request("/api/stats", {}, mockEnv);
    expect(res.status).toBe(200);
    const data = (await res.json()) as any;

    expect(data.success).toBe(true);
    expect(data).toHaveProperty("globalFootprint");
    expect(data.globalFootprint.totalPoPs).toBeGreaterThanOrEqual(300);
    expect(data.globalFootprint.regions.length).toBeGreaterThan(5);

    expect(data).toHaveProperty("community");
    expect(data.community.totalDevelopers).toBeGreaterThan(40000);
    expect(data.community.dailyActiveDevelopers).toBeGreaterThan(3000);
    expect(data.community.osBreakdown).toHaveProperty("macOS");

    expect(data).toHaveProperty("infrastructure");
    expect(data.infrastructure.totalFilesProcessed).toBeGreaterThan(100000);
    expect(data.infrastructure.clamavCleanRate).toBe("100.0%");

    expect(data).toHaveProperty("sponsorship");
    expect(data.sponsorship.totalBlipImpressions).toBeGreaterThan(50000);
    expect(data.sponsorship.averageCtr).toMatch(/%/);
    expect(data.sponsorship.campaigns.length).toBeGreaterThan(0);
    expect(data.sponsorship.tiers.length).toBe(3);
  });
});
