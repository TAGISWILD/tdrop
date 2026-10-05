/**
 * Sanitize and format filenames according to RFC 5987 / RFC 6266
 */

/**
 * Strips path traversal, CRLF, and unprintable ASCII control characters.
 */
export function sanitizeFilename(raw: string): string {
  if (!raw || typeof raw !== "string") {
    return "download";
  }

  // 1. Remove path separators (prevent directory traversal)
  let clean = raw.replace(/[/\\]/g, "_");

  // 2. Remove CRLF and control characters (\x00-\x1F, \x7F)
  clean = clean.replace(/[\r\n\x00-\x1f\x7f]/g, "");

  // 3. Remove dangerous leading periods or relative segments
  clean = clean.replace(/^\.+/, "").trim();

  // 4. Default fallback if empty
  if (!clean || clean === "." || clean === "..") {
    return "file";
  }

  // 5. Limit length to 255 chars
  return clean.slice(0, 255);
}

/**
 * Creates an ASCII-only fallback filename for legacy clients.
 */
export function toSafeAsciiFilename(filename: string): string {
  const sanitized = sanitizeFilename(filename);
  // Replace non-ASCII or double-quotes with underscore
  const ascii = sanitized.replace(/[^\x20-\x7E]|"/g, "_").trim();
  return ascii || "download";
}

/**
 * Generates an RFC 5987 / RFC 6266 compliant Content-Disposition header.
 * Example: attachment; filename="report.pdf"; filename*=UTF-8''report%20%F0%9F%93%84.pdf
 */
export function formatContentDisposition(
  filename: string,
  disposition: "attachment" | "inline" = "attachment"
): string {
  const safeAscii = toSafeAsciiFilename(filename);
  const cleanUtf8 = sanitizeFilename(filename);
  const encodedUtf8 = encodeURIComponent(cleanUtf8).replace(
    /['()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );

  return `${disposition}; filename="${safeAscii}"; filename*=UTF-8''${encodedUtf8}`;
}

/**
 * Anonymizes a filename for public telemetry / feeds to protect user privacy.
 * Preserves the file extension while replacing the entire base name with a privacy mask and short hash token.
 * Example: "Pavitra_photo (2).jpg" -> "drop_••••3a9f.jpg"
 */
export function anonymizeTelemetryFilename(raw: string, seed?: string): string {
  if (!raw || typeof raw !== "string") {
    return "drop_••••••";
  }

  // If already anonymized, return as-is
  if (raw.startsWith("drop_••••")) {
    return raw;
  }

  const clean = sanitizeFilename(raw);
  const lower = clean.toLowerCase();
  let ext = "";

  if (lower.endsWith(".tar.gz")) ext = ".tar.gz";
  else if (lower.endsWith(".tar.bz2")) ext = ".tar.bz2";
  else if (lower.endsWith(".tar.xz")) ext = ".tar.xz";
  else {
    const lastDot = clean.lastIndexOf(".");
    if (lastDot > 0 && lastDot < clean.length - 1) {
      const candidate = clean.slice(lastDot).toLowerCase();
      if (/^\.[a-z0-9]{1,8}$/i.test(candidate)) {
        ext = candidate;
      }
    }
  }

  // Derive stable 4-char hex token from seed or filename
  const str = seed || clean;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const token = Math.abs(hash).toString(16).slice(0, 4).padStart(4, "7");

  return `drop_••••${token}${ext}`;
}
