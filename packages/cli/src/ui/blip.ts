import { sanitizeTerminalText, type BlipAd } from "@tdrop/shared";

/**
 * Fetches and renders a clean, non-intrusive sponsored text blip above the progress bar.
 */
export async function fetchAndFormatBlip(apiUrl: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1200); // 1.2s fast timeout

    const res = await fetch(`${apiUrl}/blip`, {
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!res.ok) return null;

    const ad = (await res.json()) as BlipAd;
    const sponsor = sanitizeTerminalText(ad.sponsor);
    const text = sanitizeTerminalText(ad.text);
    const url = sanitizeTerminalText(ad.url);

    return `\x1b[90m[Sponsored by ${sponsor}]\x1b[0m ${text} \x1b[4m${url}\x1b[0m`;
  } catch {
    // Non-blocking: skip ad on any failure
    return null;
  }
}
