import type { Bindings } from "../types.js";
import { MetadataService } from "./redis.js";

export interface ScanResult {
  clean: boolean;
  signature?: string;
  bypassed?: boolean;
}

/**
 * Synchronously scan an in-memory buffer before writing to R2.
 */
export async function scanFileBuffer(
  env: Bindings,
  code: string,
  filename: string,
  buffer: Uint8Array
): Promise<ScanResult> {
  const scannerUrl = env.SCANNER_URL || "https://clamav.ethiccode.in";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000); // 7s timeout

    const res = await fetch(`${scannerUrl}/scan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "X-Shortcode": code,
        "X-Filename": encodeURIComponent(filename),
        Authorization: env.INTERNAL_SCAN_SECRET ? `Bearer ${env.INTERNAL_SCAN_SECRET}` : "",
      },
      body: buffer as any,
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (res.ok) {
      const data = (await res.json()) as { result: "clean" | "infected"; signature?: string };
      if (data.result === "infected") {
        console.warn(`[tdrop:SECURITY] Malware detected by ClamAV for ${filename} (code ${code}): ${data.signature}`);
        return { clean: false, signature: data.signature };
      }
      return { clean: true };
    }
  } catch (err: any) {
    console.warn(`[tdrop:SCANNER] ClamAV scanner at ${scannerUrl} error (${err.message}). Bypassing scan.`);
  }

  // Fallback if scanner is temporarily down
  return { clean: true, bypassed: true };
}

/**
 * Asynchronous background scanner for R2 objects
 */
export async function triggerScanner(
  env: Bindings,
  job: { code: string; objectKey: string; size: number }
): Promise<void> {
  const metadataService = new MetadataService(env);
  const scannerUrl = env.SCANNER_URL || "https://clamav.ethiccode.in";

  try {
    const obj = await env.BUCKET.get(job.objectKey);
    if (!obj || !obj.body) return;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const res = await fetch(`${scannerUrl}/scan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "X-Shortcode": job.code,
        Authorization: env.INTERNAL_SCAN_SECRET ? `Bearer ${env.INTERNAL_SCAN_SECRET}` : "",
      },
      body: obj.body,
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (res.ok) {
      const data = (await res.json()) as { result: "clean" | "infected"; signature?: string };
      if (data.result === "clean") {
        await metadataService.updateStatus(job.code, "READY", true);
        return;
      } else {
        // Infected! Delete R2 object immediately
        console.warn(`[tdrop:SECURITY] Malware detected by ClamAV for code ${job.code}: ${data.signature}`);
        await env.BUCKET.delete(job.objectKey);
        await metadataService.updateStatus(job.code, "INFECTED", false);
        return;
      }
    }
  } catch (err: any) {
    console.warn(
      `[tdrop:SCANNER] Scanner at ${scannerUrl} is unreachable or timed out (${err.message}).`
    );
  }

  // Graceful fallback
  await metadataService.updateStatus(job.code, "READY", true);
}
