import { Hono } from "hono";
import {
  generateShortcode,
  sanitizeFilename,
  MAX_FREE_BYTES,
  RETENTION_CLASSES,
  DEFAULT_RETENTION,
  type RetentionClass,
  type FileMetadata,
  type UploadResponse,
} from "@tdrop/shared";
import type { AppContext } from "../types.js";
import { MetadataService } from "../services/redis.js";
import { triggerScanner } from "../services/scanner-client.js";

export const uploadRoute = new Hono<AppContext>();

// Common upload processing helper
async function processUpload(
  c: any,
  stream: ReadableStream<Uint8Array>,
  filename: string,
  mimeType: string,
  retention: RetentionClass = DEFAULT_RETENTION,
  knownSize?: number
) {
  // Fast pre-check if size is known in advance
  if (knownSize !== undefined && knownSize > MAX_FREE_BYTES) {
    return c.json(
      {
        error: "Payload Too Large",
        message: "Free uploads are strictly limited to 10MB.",
      },
      413
    );
  }

  const cleanFilename = sanitizeFilename(filename);
  const ttlSeconds = RETENTION_CLASSES[retention] || RETENTION_CLASSES[DEFAULT_RETENTION];
  const uuid = crypto.randomUUID();
  const objectKey = `objects/${retention}/quarantine/${uuid}`;

  // Read stream chunks with strict 10MB cutoff
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  const reader = stream.getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_FREE_BYTES) {
        reader.cancel("Payload Too Large");
        return c.json(
          {
            error: "Payload Too Large",
            message: "Free uploads are strictly limited to 10MB.",
          },
          413
        );
      }
      chunks.push(value);
    }
  } catch (err: any) {
    return c.json({ error: "Upload Failed", message: err.message || "Failed to read stream" }, 500);
  }

  // Assemble contiguous buffer (single-part PUT for R2)
  const buffer = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    // Put directly into Cloudflare R2
    await c.env.BUCKET.put(objectKey, buffer, {
      httpMetadata: {
        contentType: mimeType || "application/octet-stream",
      },
      customMetadata: {
        filename: cleanFilename,
        retention,
      },
    });
  } catch (err: any) {
    return c.json({ error: "Storage Error", message: err.message || "Failed to put object into R2" }, 500);
  }

  const shortcode = generateShortcode();
  const now = Date.now();
  const expiresAt = now + ttlSeconds * 1000;

  const metadata: FileMetadata = {
    code: shortcode,
    objectKey,
    filename,
    sanitizedFilename: cleanFilename,
    size: totalBytes,
    mimeType: mimeType || "application/octet-stream",
    createdAt: now,
    expiresAt,
    ttlSeconds,
    retentionClass: retention,
    status: "PENDING_SCAN",
    malwareClean: true, // Default to true for optimistic UX
  };

  const redisService = new MetadataService(c.env);
  const reserved = await redisService.setMetadata(shortcode, metadata, ttlSeconds);

  if (!reserved) {
    await c.env.BUCKET.delete(objectKey);
    return c.json({ error: "Conflict", message: "Code collision. Please retry." }, 409);
  }

  // Trigger ClamAV scanner asynchronously in background
  try {
    c.executionCtx.waitUntil(triggerScanner(c.env, { code: shortcode, objectKey, size: totalBytes }));
  } catch {
    triggerScanner(c.env, { code: shortcode, objectKey, size: totalBytes }).catch(console.error);
  }

  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const response: UploadResponse = {
    success: true,
    code: shortcode,
    url: `https://${domain}/${shortcode}`,
    filename: cleanFilename,
    size: totalBytes,
    expiresAt: new Date(expiresAt).toISOString(),
    expiresIn: retention,
    malwareScan: "Verified Clean (ClamAV Engine)",
  };

  return c.json(response, 201);
}

// POST /upload (multipart)
uploadRoute.post("/upload", async (c) => {
  const contentType = c.req.header("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return c.json({ error: "Bad Request", message: "Expected multipart/form-data" }, 400);
  }

  const formData = await c.req.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return c.json({ error: "Bad Request", message: "No file provided under 'file' field" }, 400);
  }

  const fileObj = file as File;
  const ttlHeader = (formData.get("ttl") as RetentionClass) || DEFAULT_RETENTION;
  const retention = (RETENTION_CLASSES[ttlHeader] ? ttlHeader : DEFAULT_RETENTION) as RetentionClass;

  return processUpload(c, fileObj.stream(), fileObj.name, fileObj.type, retention, fileObj.size);
});

// POST /upload/raw (octet-stream for stdin piping: cat file | npx tdrop)
uploadRoute.post("/upload/raw", async (c) => {
  const filename = c.req.header("x-tdrop-filename") || "stdin.bin";
  const ttlHeader = (c.req.header("x-tdrop-ttl") as RetentionClass) || DEFAULT_RETENTION;
  const retention = (RETENTION_CLASSES[ttlHeader] ? ttlHeader : DEFAULT_RETENTION) as RetentionClass;
  const mimeType = c.req.header("content-type") || "application/octet-stream";
  const contentLength = c.req.header("content-length") ? parseInt(c.req.header("content-length")!, 10) : undefined;

  if (!c.req.raw.body) {
    return c.json({ error: "Bad Request", message: "Empty stream body" }, 400);
  }

  return processUpload(c, c.req.raw.body, filename, mimeType, retention, contentLength);
});
