import { Hono } from "hono";
import type { AppContext } from "../types.js";
import { AdsService } from "../services/ads.js";

export const blipRoute = new Hono<AppContext>();

// Helper to authenticate admin operations
function isAuthorizedAdmin(c: any): boolean {
  const secret = c.env.INTERNAL_SCAN_SECRET || c.env.RATE_LIMIT_SECRET;
  const authHeader = c.req.header("x-admin-secret") || c.req.header("authorization")?.replace("Bearer ", "");
  const querySecret = c.req.query("secret");

  return Boolean(secret && (authHeader === secret || querySecret === secret));
}

// 1. GET /blip - Serve sponsored blip to CLI with impression tracking
blipRoute.get("/blip", async (c) => {
  const adsService = new AdsService(c.env);
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const { blip, id } = await adsService.getBlipAd(domain);

  // Asynchronously record impression without delaying CLI
  try {
    c.executionCtx.waitUntil(adsService.recordImpression(id));
  } catch {
    adsService.recordImpression(id).catch(console.error);
  }

  return c.json(blip);
});

// 2. GET /ad/:id - Click tracking redirect to sponsor destination
blipRoute.get("/ad/:id", async (c) => {
  const adId = c.req.param("id");
  const adsService = new AdsService(c.env);

  const destinationUrl = await adsService.recordClick(adId);
  return c.redirect(destinationUrl, 302);
});

// 3. GET /admin/ads - List campaigns and view impression/click/CTR metrics
blipRoute.get("/admin/ads", async (c) => {
  if (!isAuthorizedAdmin(c)) {
    return c.json({ error: "Unauthorized", message: "Missing or invalid admin secret" }, 401);
  }

  const adsService = new AdsService(c.env);
  const campaigns = await adsService.getAllCampaigns();

  const formatted = campaigns.map((campaign) => {
    const ctr =
      campaign.impressions > 0
        ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2) + "%"
        : "0.00%";

    return {
      ...campaign,
      ctr,
    };
  });

  return c.json({
    totalCampaigns: formatted.length,
    activeCampaigns: formatted.filter((c) => c.active).length,
    campaigns: formatted,
  });
});

// 4. POST /admin/ads - Create or update an ad campaign
blipRoute.post("/admin/ads", async (c) => {
  if (!isAuthorizedAdmin(c)) {
    return c.json({ error: "Unauthorized", message: "Missing or invalid admin secret" }, 401);
  }

  const body = await c.req.json();
  if (!body.sponsor || !body.text || !body.url) {
    return c.json({ error: "Bad Request", message: "Fields 'sponsor', 'text', and 'url' are required" }, 400);
  }

  const adsService = new AdsService(c.env);
  const saved = await adsService.saveCampaign(body);

  return c.json({ success: true, campaign: saved }, 201);
});

// 5. DELETE /admin/ads/:id - Delete an ad campaign
blipRoute.delete("/admin/ads/:id", async (c) => {
  if (!isAuthorizedAdmin(c)) {
    return c.json({ error: "Unauthorized", message: "Missing or invalid admin secret" }, 401);
  }

  const adId = c.req.param("id");
  const adsService = new AdsService(c.env);
  const deleted = await adsService.deleteCampaign(adId);

  if (!deleted) {
    return c.json({ error: "Not Found", message: `Ad campaign '${adId}' not found` }, 404);
  }

  return c.json({ success: true, message: `Ad campaign '${adId}' deleted` });
});
