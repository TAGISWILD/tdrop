import { describe, it, expect } from "vitest";
import { formatBytes } from "../src/ui/progress.js";

describe("tdrop CLI", () => {
  describe("Formatting Utilities", () => {
    it("should format bytes into human-readable strings", () => {
      expect(formatBytes(500)).toBe("500 B");
      expect(formatBytes(1500)).toBe("1.5 KB");
      expect(formatBytes(10 * 1024 * 1024)).toBe("10.00 MB");
      expect(formatBytes(5.25 * 1024 * 1024)).toBe("5.25 MB");
    });
  });
});
