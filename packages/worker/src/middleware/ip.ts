import type { Context, Next } from "hono";
import type { AppContext } from "../types.js";
import { MetadataService } from "../services/redis.js";

/**
 * Computes HMAC-SHA256(secret, clientIp) using standard Web Crypto API.
 */
export async function hashIp(clientIp: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(clientIp));
  const hashArray = Array.from(new Uint8Array(signature));
  // Convert to base64url
  return btoa(String.fromCharCode(...hashArray))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function rateLimitMiddleware(c: Context<AppContext>, next: Next) {
  const rawIp =
    c.req.header("cf-connecting-ip") ||
    c.req.header("x-real-ip") ||
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
    "127.0.0.1";

  const secret = c.env.RATE_LIMIT_SECRET || "default_tdrop_secret_salt";
  const ipHash = await hashIp(rawIp, secret);
  c.set("ipHash", ipHash);

  const redisService = new MetadataService(c.env);

  // Check if IP is temporarily blocked by the probe tripwire
  const isBlocked = await redisService.isBlocked(ipHash);
  if (isBlocked) {
    return c.json(
      {
        error: "Too Many Requests",
        message: "Your IP has been temporarily blocked due to repeated suspicious probes.",
      },
      429
    );
  }

  // Token bucket check
  const allowed = await redisService.checkRateLimit(ipHash);
  if (!allowed) {
    return c.json(
      {
        error: "Too Many Requests",
        message: "Rate limit exceeded. Please wait a moment before sending another request.",
      },
      429
    );
  }

  await next();
}
