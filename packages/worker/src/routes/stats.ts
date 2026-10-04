import { Hono } from "hono";
import type { AppContext } from "../types.js";
import { TelemetryService, subscribeTelemetry } from "../services/telemetry.js";
import { renderStatsPage } from "../views/stats.html.js";

export const statsRoute = new Hono<AppContext>();

// Return 100% REAL system telemetry from Redis / KV / R2
export async function getLiveStatsPayload(env: any, domain: string) {
  const telemetry = new TelemetryService(env);
  return await telemetry.getRealStats();
}

// 1. GET /stats & GET /dashboard - Rich Web HTML Dashboard
statsRoute.get("/stats", (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  return c.html(renderStatsPage(domain));
});

statsRoute.get("/dashboard", (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  return c.html(renderStatsPage(domain));
});

// 2. GET /api/stats - Realtime JSON endpoint for metrics, sponsors, and maps
statsRoute.get("/api/stats", async (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const payload = await getLiveStatsPayload(c.env, domain);
  return c.json(payload);
});

// 3. GET /api/stats/live - Realtime Server-Sent Events (SSE) stream
statsRoute.get("/api/stats/live", (c) => {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  // Send initial ping to keep connection alive
  writer.write(encoder.encode(`event: ping\ndata: ${Date.now()}\n\n`));

  const unsubscribe = subscribeTelemetry(async (data) => {
    try {
      await writer.write(encoder.encode(`event: update\ndata: ${JSON.stringify(data)}\n\n`));
    } catch {
      unsubscribe();
    }
  });

  c.req.raw.signal.addEventListener("abort", () => {
    unsubscribe();
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
});

// 4. POST /api/stats/seed - Generate sample test drops for local testing / pitch demos
statsRoute.post("/api/stats/seed", async (c) => {
  const telemetry = new TelemetryService(c.env);
  await telemetry.seedDemoActivity(3);
  const updated = await telemetry.getRealStats();
  return c.json({ success: true, message: "Sample test drops seeded to real telemetry store", stats: updated });
});
