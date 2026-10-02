import { Hono } from "hono";
import type { ScanResultCallback } from "@tdrop/shared";
import type { AppContext } from "../types.js";
import { MetadataService } from "../services/redis.js";

export const internalRoute = new Hono<AppContext>();

internalRoute.post("/internal/scan-result", async (c) => {
  const secret = c.env.INTERNAL_SCAN_SECRET;
  const authHeader = c.req.header("authorization") || "";

  if (secret && authHeader !== `Bearer ${secret}`) {
    return c.json({ error: "Unauthorized", message: "Invalid scan callback secret." }, 401);
  }

  const payload = (await c.req.json()) as ScanResultCallback;
  const redisService = new MetadataService(c.env);
  const metadata = await redisService.getMetadata(payload.code);

  if (!metadata) {
    return c.json({ error: "Not Found", message: "Metadata not found." }, 404);
  }

  if (payload.result === "clean") {
    await redisService.updateStatus(payload.code, "READY", true);
    return c.json({ success: true, status: "READY" });
  } else {
    // Purge object immediately
    await c.env.BUCKET.delete(metadata.objectKey);
    await redisService.updateStatus(payload.code, "INFECTED", false);
    console.warn(`[tdrop:SECURITY] Object ${metadata.objectKey} purged. Malware: ${payload.signature}`);
    return c.json({ success: true, status: "INFECTED_PURGED" });
  }
});
