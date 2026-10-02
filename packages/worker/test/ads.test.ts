import { describe, it, expect } from "vitest";
import app from "../src/index.js";
import { AdsService } from "../src/services/ads.js";

describe("Ads Engine & Sponsor Management", () => {
  const mockEnv = {
    BUCKET: {} as any,
    APP_DOMAIN: "tdrop.link",
    RATE_LIMIT_SECRET: "test_admin_secret",
  };

  it("should serve a blip ad with an ad tracking URL", async () => {
    const res = await app.request("/blip", {}, mockEnv);
    expect(res.status).toBe(200);

    const ad = (await res.json()) as any;
    expect(ad).toHaveProperty("sponsor");
    expect(ad).toHaveProperty("text");
    expect(ad).toHaveProperty("url");
    expect(ad.url).toContain("https://tdrop.link/ad/");
  });

  it("should redirect to destination URL and track clicks on GET /ad/:id", async () => {
    const res = await app.request("/ad/cloudflare-r2", {}, mockEnv);
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("https://www.cloudflare.com/developer-platform/r2/");
  });

  it("should deny unauthorized access to /admin/ads", async () => {
    const res = await app.request("/admin/ads", {}, mockEnv);
    expect(res.status).toBe(401);
  });

  it("should return campaigns with CTR metrics when authorized on GET /admin/ads", async () => {
    const res = await app.request(
      "/admin/ads",
      {
        headers: { "x-admin-secret": "test_admin_secret" },
      },
      mockEnv
    );
    expect(res.status).toBe(200);

    const data = (await res.json()) as any;
    expect(data.totalCampaigns).toBeGreaterThanOrEqual(4);
    expect(data.campaigns[0]).toHaveProperty("ctr");
    expect(data.campaigns[0]).toHaveProperty("impressions");
    expect(data.campaigns[0]).toHaveProperty("clicks");
  });

  it("should create a new sponsored campaign via POST /admin/ads", async () => {
    const newAd = {
      id: "test-sponsor",
      sponsor: "MyAwesomeTool",
      text: "Boost your CLI productivity 10x.",
      url: "https://myawesometool.dev",
      weight: 15,
    };

    const res = await app.request(
      "/admin/ads",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": "test_admin_secret",
        },
        body: JSON.stringify(newAd),
      },
      mockEnv
    );

    expect(res.status).toBe(201);
    const data = (await res.json()) as any;
    expect(data.campaign.sponsor).toBe("MyAwesomeTool");

    // Verify it exists in ads list
    const adsService = new AdsService(mockEnv);
    const all = await adsService.getAllCampaigns();
    expect(all.some((c) => c.id === "test-sponsor")).toBe(true);

    // Delete it
    await adsService.deleteCampaign("test-sponsor");
  });
});
