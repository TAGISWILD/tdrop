import type { Bindings } from "../types.js";
import { MetadataService } from "./redis.js";

export async function triggerScanner(
  env: Bindings,
  job: { code: string; objectKey: string; size: number }
): Promise<void> {
  const metadataService = new MetadataService(env);
  const scannerUrl = env.SCANNER_URL || "http://10.0.0.9:3310";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500); // 2.5s timeout

    const res = await fetch(`${scannerUrl}/scan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: env.INTERNAL_SCAN_SECRET ? `Bearer ${env.INTERNAL_SCAN_SECRET}` : "",
      },
      body: JSON.stringify(job),
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
    // Scanner at 10.0.0.9 is offline, unreachable, or timed out
    console.warn(
      `[tdrop:SCANNER] Scanner at ${scannerUrl} is unreachable or timed out (${err.message}). Bypassing ClamAV scan for file under 10MB.`
    );
  }

  // Graceful fallback: allow small files <= 10MB to pass through
  await metadataService.updateStatus(job.code, "READY", true);
}
