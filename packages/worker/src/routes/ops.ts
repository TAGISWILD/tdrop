import { Hono } from "hono";
import type { AppContext } from "../types.js";
import { MetadataService } from "../services/redis.js";
import { renderErrorPage } from "../views/error.html.js";

export const opsRoute = new Hono<AppContext>();

// Suspicious patterns (Crypto miners, malicious APKs, loaders, stealers)
const SUSPICIOUS_EXTENSIONS = new Set([
  ".apk",
  ".exe",
  ".scr",
  ".bat",
  ".cmd",
  ".sh",
  ".elf",
  ".dll",
  ".vbs",
  ".ps1",
  ".msi",
  ".bin",
]);

const SUSPICIOUS_KEYWORDS = [
  "miner",
  "xmrig",
  "crypto",
  "btc",
  "eth",
  "monero",
  "stratum",
  "pool",
  "hack",
  "crack",
  "payload",
  "trojan",
  "bank",
  "phish",
  "wallet",
  "stealer",
  "keygen",
  "bypass",
  "rat",
  "botnet",
  "ddos",
  "dropper",
];

function analyzeThreat(filename: string): { isSuspicious: boolean; reason?: string } {
  const lower = filename.toLowerCase();
  const extMatch = lower.match(/\.[0-9a-z]+$/);
  const ext = extMatch ? extMatch[0] : "";

  if (SUSPICIOUS_EXTENSIONS.has(ext)) {
    if (ext === ".apk") {
      return { isSuspicious: true, reason: "Android APK package (high-risk binary distribution)" };
    }
    return { isSuspicious: true, reason: `Executable or script extension detected (${ext})` };
  }

  for (const kw of SUSPICIOUS_KEYWORDS) {
    if (lower.includes(kw)) {
      return { isSuspicious: true, reason: `Threat keyword detected: '${kw}'` };
    }
  }

  return { isSuspicious: false };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// 1. STEALTH GUARD: Unauthorized requests get standard 404 (zero leakage of existence)
opsRoute.use("*", async (c, next) => {
  const adminSecret = c.env.ADMIN_SECRET || c.env.RATE_LIMIT_SECRET || "tdrop_ops_master_8f93e2b1";
  const key = c.req.header("x-tdrop-ops-key");
  const client = c.req.header("x-tdrop-ops-client");

  if (!key || key !== adminSecret || client !== "tdrop-admin-tui") {
    const domain = c.env.APP_DOMAIN || "tdrop.link";
    const accept = (c.req.header("accept") || "").toLowerCase();
    if (accept.includes("text/html")) {
      return c.html(
        renderErrorPage(404, "Page Not Found", "The requested link or route does not exist.", domain),
        404
      );
    }
    return c.json({ error: "Not Found", message: "The requested route does not exist." }, 404);
  }

  await next();
});

// 2. GET /summary - High-level metrics for ops dashboard
opsRoute.get("/summary", async (c) => {
  const redisService = new MetadataService(c.env);
  const totalCreated = await redisService.getTotalLinksCreated();
  const activeDrops = await redisService.listRecentDrops(500);
  const blockedIps = await redisService.listBlockedIps();

  let totalViews = 0;
  let totalDownloads = 0;
  let suspiciousCount = 0;

  for (const drop of activeDrops) {
    totalViews += drop.views || 0;
    totalDownloads += drop.downloads || 0;
    const threat = analyzeThreat(drop.filename);
    if (threat.isSuspicious) suspiciousCount++;
  }

  return c.json({
    success: true,
    summary: {
      totalLinksCreated: totalCreated,
      activeDropsCount: activeDrops.length,
      totalViews,
      totalDownloads,
      suspiciousDropsCount: suspiciousCount,
      blockedIpsCount: blockedIps.length,
      serverTime: new Date().toISOString(),
    },
  });
});

// 3. GET /links - Detailed link listing with uploader IP, views, downloads & threat analysis
opsRoute.get("/links", async (c) => {
  const redisService = new MetadataService(c.env);
  const filter = c.req.query("filter") || "all"; // "all" | "suspicious"
  const limit = Math.min(200, parseInt(c.req.query("limit") || "100", 10));

  const rawDrops = await redisService.listRecentDrops(limit * 2);
  const now = Date.now();

  const enriched = rawDrops
    .filter((d) => d.expiresAt > now)
    .map((d) => {
      const threat = analyzeThreat(d.filename);
      const timeLeftSec = Math.max(0, Math.floor((d.expiresAt - now) / 1000));
      return {
        code: d.code,
        filename: d.filename,
        size: d.size,
        sizeFormatted: formatBytes(d.size),
        uploaderIp: d.uploaderIp || "unknown",
        uploaderSource: d.uploaderSource || "Web Drop",
        country: d.country || "XX",
        colo: d.colo || "EDGE",
        views: d.views || 0,
        downloads: d.downloads || 0,
        status: d.status || "READY",
        isSuspicious: threat.isSuspicious,
        suspiciousReason: threat.reason || null,
        createdAt: d.createdAt,
        expiresAt: d.expiresAt,
        timeLeftFormatted: `${Math.floor(timeLeftSec / 60)}m ${timeLeftSec % 60}s`,
      };
    });

  const finalDrops =
    filter === "suspicious" ? enriched.filter((d) => d.isSuspicious) : enriched;

  return c.json({
    success: true,
    count: finalDrops.slice(0, limit).length,
    links: finalDrops.slice(0, limit),
  });
});

// 4. GET /link/:code - Deep inspection of a single drop
opsRoute.get("/link/:code", async (c) => {
  const code = c.req.param("code");
  const redisService = new MetadataService(c.env);
  const meta = await redisService.getMetadata(code);

  if (!meta) {
    return c.json({ error: "Not Found", message: `Link ${code} not found or expired.` }, 404);
  }

  const views = await redisService.getViews(code);
  const downloads = await redisService.getDownloads(code);
  const threat = analyzeThreat(meta.filename);

  return c.json({
    success: true,
    link: {
      ...meta,
      sizeFormatted: formatBytes(meta.size),
      views,
      downloads,
      isSuspicious: threat.isSuspicious,
      suspiciousReason: threat.reason || null,
    },
  });
});

// 5. DELETE /link/:code - Instant incinerate/purge of malicious drops (miners, bad APKs)
opsRoute.delete("/link/:code", async (c) => {
  const code = c.req.param("code");
  const redisService = new MetadataService(c.env);
  const meta = await redisService.getMetadata(code);

  if (!meta) {
    return c.json({ error: "Not Found", message: `Link ${code} not found.` }, 404);
  }

  // Incinerate file from R2 object storage immediately
  try {
    await c.env.BUCKET.delete(meta.objectKey);
  } catch (err: any) {
    console.error("[tdrop:ops] Failed to delete object from R2:", err);
  }

  // Remove metadata & indexing
  await redisService.deleteMetadata(code);

  return c.json({
    success: true,
    message: `Link ${code} (${meta.filename}) was permanently incinerated from R2 storage.`,
    purged: {
      code,
      filename: meta.filename,
      uploaderIp: meta.uploaderIp || "unknown",
      objectKey: meta.objectKey,
    },
  });
});

// 6. POST /block-ip - Ban malicious uploader IP
opsRoute.post("/block-ip", async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as {
    ip: string;
    reason?: string;
    durationSeconds?: number;
  };

  if (!body.ip || typeof body.ip !== "string") {
    return c.json({ error: "Bad Request", message: "Field 'ip' is required." }, 400);
  }

  const ip = body.ip.trim();
  const reason = body.reason || "Malicious distribution (Bitcoin miner/bad APK)";
  const duration = body.durationSeconds || 86400 * 7; // Default 7 days

  const redisService = new MetadataService(c.env);
  await redisService.blockRawIp(ip, duration, reason);

  return c.json({
    success: true,
    message: `IP ${ip} has been blocked for ${Math.floor(duration / 3600)} hours.`,
    blocked: { ip, reason, durationSeconds: duration },
  });
});

// 7. POST /unblock-ip - Lift IP ban
opsRoute.post("/unblock-ip", async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as { ip: string };

  if (!body.ip || typeof body.ip !== "string") {
    return c.json({ error: "Bad Request", message: "Field 'ip' is required." }, 400);
  }

  const redisService = new MetadataService(c.env);
  await redisService.unblockRawIp(body.ip.trim());

  return c.json({
    success: true,
    message: `IP ${body.ip.trim()} has been unblocked.`,
  });
});

// 8. GET /blocked-ips - List currently banned IPs
opsRoute.get("/blocked-ips", async (c) => {
  const redisService = new MetadataService(c.env);
  const list = await redisService.listBlockedIps();

  return c.json({
    success: true,
    count: list.length,
    blockedIps: list,
  });
});
