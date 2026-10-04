import { Hono } from "hono";
import { isValidShortcode, formatContentDisposition } from "@tdrop/shared";
import type { AppContext } from "../types.js";
import { MetadataService } from "../services/redis.js";
import { AdsService } from "../services/ads.js";
import { renderDownloadPage } from "../views/download.html.js";
import { renderErrorPage } from "../views/error.html.js";
import { TelemetryService } from "../services/telemetry.js";

export const downloadRoute = new Hono<AppContext>();

const RESERVED_CODES = new Set([
  "sponsor",
  "sponsorship",
  "privacy",
  "terms",
  "health",
  "upload",
  "blip",
  "stats",
  "api",
  "admin",
  "dashboard",
]);

// Common handler for GET and HEAD
async function handleDownload(c: any, isHead: boolean) {
  const code = c.req.param("code");
  const redisService = new MetadataService(c.env);
  const ipHash = c.get("ipHash") || "unknown";
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const ua = (c.req.header("user-agent") || "").toLowerCase();
  const acceptHeader = (c.req.header("accept") || "").toLowerCase();
  const isTerminalClient =
    (ua.startsWith("curl/") || ua.startsWith("wget/") || ua.startsWith("httpie/") || ua.includes("libcurl")) &&
    !acceptHeader.includes("text/html");
  const shouldServeHtml = !isTerminalClient;

  // Check reserved routes
  if (RESERVED_CODES.has(code.toLowerCase())) {
    if (shouldServeHtml) {
      return c.html(renderErrorPage(404, "Page Not Found", "The requested link or route does not exist.", domain), 404);
    }
    return c.json({ error: "Not Found", message: "Route is reserved." }, 404);
  }

  // Validate format
  if (!isValidShortcode(code)) {
    await redisService.recordFailedProbe(ipHash);
    if (shouldServeHtml) {
      return c.html(renderErrorPage(404, "Invalid Shortcode", "The file link format is invalid.", domain), 404);
    }
    return c.json({ error: "Not Found", message: "Invalid or nonexistent shortcode." }, 404);
  }

  // Retrieve metadata
  const metadata = await redisService.getMetadata(code);
  if (!metadata) {
    const isNowBlocked = await redisService.recordFailedProbe(ipHash);
    if (isNowBlocked) {
      if (shouldServeHtml) {
        return c.html(
          renderErrorPage(429, "Too Many Requests", "Repeated invalid probes detected. Your IP is blocked for 30 minutes.", domain),
          429
        );
      }
      return c.json(
        {
          error: "Too Many Requests",
          message: "Repeated invalid probes detected. Your IP is blocked for 30 minutes.",
        },
        429
      );
    }
    if (shouldServeHtml) {
      return c.html(
        renderErrorPage(
          404,
          "File Expired or Not Found",
          "This file has reached its retention expiration (1h, 24h, or 7d) and was permanently incinerated from Cloudflare R2 edge storage.",
          domain
        ),
        404
      );
    }
    return c.json({ error: "Not Found", message: "File has expired or does not exist." }, 404);
  }

  // Check logical expiration
  if (Date.now() > metadata.expiresAt) {
    await redisService.deleteMetadata(code);
    await c.env.BUCKET.delete(metadata.objectKey);
    if (shouldServeHtml) {
      return c.html(
        renderErrorPage(
          410,
          "File Expired",
          "This ephemeral file has reached its retention window and was permanently incinerated.",
          domain
        ),
        410
      );
    }
    return c.json({ error: "Gone", message: "This file has expired and been purged." }, 410);
  }

  // Check malware quarantine verdict
  if (metadata.status === "INFECTED") {
    if (shouldServeHtml) {
      return c.html(
        renderErrorPage(410, "File Quarantined", "This file was flagged by ClamAV security inspection and purged.", domain),
        410
      );
    }
    return c.json(
      {
        error: "Unavailable",
        message: "This file was flagged by security scanning and purged.",
      },
      410
    );
  }

  // BROWSER & CRAWLER DETECTION: If opened in Chrome, Googlebot, or preview tools and not explicitly downloading
  const forceDownload = Boolean(c.req.query("download"));

  if (!isHead && !forceDownload && !isTerminalClient) {
    return c.html(renderDownloadPage(metadata, domain));
  }

  // Range Header handling
  const rangeHeader = c.req.header("range");
  const headers = new Headers();
  headers.set("Content-Type", metadata.mimeType || "application/octet-stream");
  headers.set("Content-Disposition", formatContentDisposition(metadata.filename));
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Security-Scan", "ClamAV-Verified");
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");

  let r2Object: R2ObjectBody | R2Object | null = null;

  if (rangeHeader) {
    const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
    if (match) {
      const start = parseInt(match[1], 10);
      const end = match[2] ? parseInt(match[2], 10) : metadata.size - 1;

      if (start >= metadata.size || end >= metadata.size || start > end) {
        headers.set("Content-Range", `bytes */${metadata.size}`);
        return new Response(null, { status: 416, headers });
      }

      const length = end - start + 1;
      r2Object = await c.env.BUCKET.get(metadata.objectKey, {
        range: { offset: start, length },
      });

      headers.set("Content-Range", `bytes ${start}-${end}/${metadata.size}`);
      headers.set("Content-Length", length.toString());

      if (isHead || !r2Object || !("body" in r2Object)) {
        return new Response(null, { status: 206, headers });
      }

      return new Response(r2Object.body, { status: 206, headers });
    }
  }

  // Full object request
  headers.set("Content-Length", metadata.size.toString());

  if (isHead) {
    return new Response(null, { status: 200, headers });
  }

  r2Object = await c.env.BUCKET.get(metadata.objectKey);
  if (!r2Object || !("body" in r2Object)) {
    return c.json({ error: "Not Found", message: "Underlying storage object not found." }, 404);
  }

  // Record real download telemetry
  const telemetry = new TelemetryService(c.env);
  const downloadPayload = {
    code,
    filename: metadata.filename,
    size: metadata.size,
    retention: metadata.retentionClass,
    ipHash,
    cf: (c.req.raw as any)?.cf,
  };
  try {
    c.executionCtx.waitUntil(telemetry.recordDownload(downloadPayload));
  } catch {
    telemetry.recordDownload(downloadPayload).catch(console.error);
  }

  return new Response(r2Object.body, { status: 200, headers });
}

downloadRoute.on(["GET", "HEAD"], "/:code", (c) =>
  handleDownload(c, c.req.method === "HEAD")
);

// Allow pretty URLs for terminal curl: curl -O https://tdrop.link/:code/:filename
downloadRoute.on(["GET", "HEAD"], "/:code/:filename", (c) =>
  handleDownload(c, c.req.method === "HEAD")
);
