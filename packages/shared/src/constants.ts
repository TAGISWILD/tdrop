/**
 * Core limits and constants for tdrop
 */

// Maximum file size for free unauthenticated uploads: 10MB
export const MAX_FREE_BYTES = 10 * 1024 * 1024; // 10,485,760 bytes

// Base62 Alphabet for 7-character shortcodes
export const BASE62_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const SHORTCODE_LENGTH = 7; // 62^7 ≈ 3.52 trillion combinations

// Retention classes and TTLs in seconds
export const RETENTION_CLASSES = {
  "1h": 3600,
  "24h": 86400,
  "7d": 604800,
} as const;

export type RetentionClass = keyof typeof RETENTION_CLASSES;
export const DEFAULT_RETENTION: RetentionClass = "24h";

// Rate limiting & anti-brute-force tripwire
export const TOKEN_BUCKET_CAPACITY = 10;
export const TOKEN_BUCKET_REFILL_RATE = 0.5; // 0.5 tokens/sec = 30 tokens/min sustained
export const MAX_PROBES_BEFORE_BLOCK = 15;
export const PROBE_WINDOW_MS = 300_000; // 5 minutes rolling window
export const BLOCK_DURATION_SECONDS = 1800; // 30 minutes block

// Service URLs & Branding
export const APP_NAME = "tdrop";
export const DEFAULT_DOMAIN = "tdrop.link";
export const SCANNER_DEFAULT_HOST = "127.0.0.1";
export const SCANNER_DEFAULT_PORT = 3310;
