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
