import { describe, it, expect } from "vitest";
import {
  generateShortcode,
  isValidShortcode,
  sanitizeFilename,
  toSafeAsciiFilename,
  formatContentDisposition,
  sanitizeTerminalText,
  anonymizeTelemetryFilename,
  MAX_FREE_BYTES,
  RETENTION_CLASSES,
} from "../src/index.js";

describe("@tdrop/shared", () => {
  describe("Constants", () => {
    it("should enforce exactly 10MB free limit", () => {
      expect(MAX_FREE_BYTES).toBe(10 * 1024 * 1024);
    });

    it("should define standard retention classes", () => {
      expect(RETENTION_CLASSES["1h"]).toBe(3600);
      expect(RETENTION_CLASSES["24h"]).toBe(86400);
      expect(RETENTION_CLASSES["7d"]).toBe(604800);
    });
  });

  describe("Shortcode Generator", () => {
    it("should generate 7-character Base62 string", () => {
      const code = generateShortcode();
      expect(code).toHaveLength(7);
      expect(isValidShortcode(code)).toBe(true);
    });

    it("should generate unique codes without collisions in a sample of 1,000", () => {
      const set = new Set<string>();
      for (let i = 0; i < 1000; i++) {
        set.add(generateShortcode());
      }
      expect(set.size).toBe(1000);
    });

    it("should validate valid and reject invalid shortcodes", () => {
      expect(isValidShortcode("a7kX9b2")).toBe(true);
      expect(isValidShortcode("12345678")).toBe(true);
      expect(isValidShortcode("short")).toBe(false);
      expect(isValidShortcode("invalid-code")).toBe(false);
      expect(isValidShortcode("a7kX9b2!")).toBe(false);
      expect(isValidShortcode("")).toBe(false);
    });
  });

  describe("Filename Sanitizer (RFC 5987)", () => {
    it("should sanitize path traversal attempts", () => {
      // Strips leading dots and replaces path separators with underscore
      expect(sanitizeFilename("../../etc/passwd")).toBe("_.._etc_passwd");
      expect(sanitizeFilename("..\\Windows\\System32")).toBe("_Windows_System32");
    });

    it("should strip CRLF and control characters", () => {
      expect(sanitizeFilename("file\r\nname.txt")).toBe("filename.txt");
      expect(sanitizeFilename("evil\x00file.png")).toBe("evilfile.png");
    });

    it("should fallback to safe default when empty", () => {
      expect(sanitizeFilename("")).toBe("download");
      expect(sanitizeFilename("...")).toBe("file");
    });

    it("should format valid RFC 5987 Content-Disposition header", () => {
      const header = formatContentDisposition("test report 📄.pdf");
      expect(header).toContain('filename="test report __.pdf"');
      expect(header).toContain("filename*=UTF-8''test%20report%20%F0%9F%93%84.pdf");
    });
  });

  describe("Terminal Sanitizer (Anti-ANSI Injection)", () => {
    it("should strip ANSI color codes", () => {
      const malicious = "\x1b[31mRed Alert\x1b[0m";
      expect(sanitizeTerminalText(malicious)).toBe("Red Alert");
    });

    it("should strip terminal clear and cursor movement commands", () => {
      const payload = "\x1b[2J\x1b[HSystem Hacked!";
      expect(sanitizeTerminalText(payload)).toBe("System Hacked!");
    });

    it("should strip OSC hyperlink sequences", () => {
      const osc = "\x1b]8;;https://phishing.site\x07Click Here\x1b]8;;\x07";
      expect(sanitizeTerminalText(osc)).toBe("Click Here");
    });
  });

  describe("Telemetry Privacy Anonymization", () => {
    it("should anonymize personal names while preserving common file extensions", () => {
      const masked = anonymizeTelemetryFilename("Pavitra_photo (2).jpg");
      expect(masked).toMatch(/^drop_••••[a-f0-9]{4}\.jpg$/);
      expect(masked).not.toContain("Pavitra");
      expect(masked).not.toContain("photo");
    });

    it("should preserve compound archive extensions like .tar.gz", () => {
      const masked = anonymizeTelemetryFilename("internal-company-backup.tar.gz");
      expect(masked).toMatch(/^drop_••••[a-f0-9]{4}\.tar\.gz$/);
      expect(masked).not.toContain("internal");
    });

    it("should handle files without extensions", () => {
      const masked = anonymizeTelemetryFilename("id_rsa");
      expect(masked).toMatch(/^drop_••••[a-f0-9]{4}$/);
      expect(masked).not.toContain("id_rsa");
    });

    it("should be idempotent if already anonymized", () => {
      const already = "drop_••••3a9f.png";
      expect(anonymizeTelemetryFilename(already)).toBe(already);
    });

    it("should produce stable token when given a seed", () => {
      const res1 = anonymizeTelemetryFilename("sensitive.pdf", "session-xyz");
      const res2 = anonymizeTelemetryFilename("other.pdf", "session-xyz");
      expect(res1).toBe(res2);
    });

    it("should handle empty or null values gracefully", () => {
      expect(anonymizeTelemetryFilename("")).toBe("drop_••••••");
      expect(anonymizeTelemetryFilename(null as any)).toBe("drop_••••••");
    });
  });
});
