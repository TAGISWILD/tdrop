import nodeCrypto from "node:crypto";
import { BASE62_ALPHABET, SHORTCODE_LENGTH } from "./constants.js";

/**
 * Generate a cryptographically secure Base62 shortcode.
 * Compatible with Node.js and Cloudflare Workers (Web Crypto API).
 */
export function generateShortcode(length: number = SHORTCODE_LENGTH): string {
  const alphabetLength = BASE62_ALPHABET.length;
  // Use rejection sampling to eliminate modulo bias
  const maxValidByte = 256 - (256 % alphabetLength);
  const result: string[] = [];

  const cryptoApi =
    typeof globalThis.crypto !== "undefined" && typeof globalThis.crypto.getRandomValues === "function"
      ? globalThis.crypto
      : (nodeCrypto as unknown as Crypto);

  while (result.length < length) {
    const randomBytes = new Uint8Array(length * 2);
    cryptoApi.getRandomValues(randomBytes);

    for (let i = 0; i < randomBytes.length && result.length < length; i++) {
      const byte = randomBytes[i];
      if (byte < maxValidByte) {
        result.push(BASE62_ALPHABET[byte % alphabetLength]);
      }
    }
  }

  return result.join("");
}

/**
 * Validate whether a string is a valid shortcode format.
 */
export function isValidShortcode(code: string): boolean {
  return /^[0-9a-zA-Z]{7,8}$/.test(code);
}
