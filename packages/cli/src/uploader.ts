import fs from "node:fs";
import { Readable, Transform } from "node:stream";
import type { UploadResponse, RetentionClass } from "@tdrop/shared";
import { MAX_FREE_BYTES } from "@tdrop/shared";
import { request, FormData } from "undici";

export interface UploadOptions {
  apiUrl: string;
  filename: string;
  ttl: RetentionClass;
  onProgress?: (uploadedBytes: number) => void;
}

/**
 * Upload a local file via multipart/form-data.
 */
export async function uploadFile(
  filePath: string,
  options: UploadOptions
): Promise<UploadResponse> {
  const stats = fs.statSync(filePath);
  if (stats.size > MAX_FREE_BYTES) {
    throw new Error(`File size (${(stats.size / 1024 / 1024).toFixed(1)}MB) exceeds the 10MB free tier limit.`);
  }

  const formData = new FormData();
  const fileStream = fs.createReadStream(filePath);

  let uploaded = 0;
  const progressTracker = new Transform({
    transform(chunk, _encoding, callback) {
      uploaded += chunk.length;
      options.onProgress?.(uploaded);
      callback(null, chunk);
    },
  });

  const trackedStream = fileStream.pipe(progressTracker);
  // @ts-ignore undici FormData supports stream blob
  formData.append("file", {
    [Symbol.toStringTag]: "File",
    name: options.filename,
    stream: () => trackedStream,
  });
  formData.append("ttl", options.ttl);

  const res = await request(`${options.apiUrl}/upload`, {
    method: "POST",
    headers: {
      "user-agent": "tdrop-cli/1.0.1",
      "x-tdrop-cli": "true",
    },
    body: formData,
  });

  if (res.statusCode === 413) {
    fileStream.destroy();
    throw new Error("File exceeds the 10MB free tier limit.");
  }

  if (res.statusCode !== 201) {
    const errorBody = await res.body.json().catch(() => ({}));
    throw new Error((errorBody as any).message || `Upload failed with HTTP ${res.statusCode}`);
  }

  return (await res.body.json()) as UploadResponse;
}

/**
 * Upload piped stdin stream directly via POST /upload/raw.
 */
export async function uploadStdin(
  stdin: Readable,
  options: UploadOptions
): Promise<UploadResponse> {
  let uploaded = 0;

  const progressTracker = new Transform({
    transform(chunk, _encoding, callback) {
      uploaded += chunk.length;
      if (uploaded > MAX_FREE_BYTES) {
        stdin.destroy();
        return callback(new Error("Piped input exceeds the 10MB free tier limit."));
      }
      options.onProgress?.(uploaded);
      callback(null, chunk);
    },
  });

  const trackedStream = stdin.pipe(progressTracker);

  try {
    const res = await request(`${options.apiUrl}/upload/raw`, {
      method: "POST",
      headers: {
        "user-agent": "tdrop-cli/1.0.1",
        "x-tdrop-cli": "true",
        "Content-Type": "application/octet-stream",
        "X-TDrop-Filename": options.filename,
        "X-TDrop-TTL": options.ttl,
      },
      body: trackedStream,
    });

    if (res.statusCode === 413) {
      stdin.destroy();
      throw new Error("Piped input exceeds the 10MB free tier limit.");
    }

    if (res.statusCode !== 201) {
      const errorBody = await res.body.json().catch(() => ({}));
      throw new Error((errorBody as any).message || `Upload failed with HTTP ${res.statusCode}`);
    }

    return (await res.body.json()) as UploadResponse;
  } catch (err: any) {
    stdin.destroy();
    throw err;
  }
}
