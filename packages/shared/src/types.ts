import type { RetentionClass } from "./constants.js";

export type ScanStatus = "PENDING_SCAN" | "READY" | "INFECTED" | "BYPASS_CLEAN";

export interface FileMetadata {
  code: string;
  objectKey: string;
  filename: string;
  sanitizedFilename: string;
  size: number;
  mimeType: string;
  createdAt: number;
  expiresAt: number;
  ttlSeconds: number;
  retentionClass: RetentionClass;
  status: ScanStatus;
  malwareClean: boolean;
  sha256?: string;
  ipHash?: string;
}

export interface UploadResponse {
  success: boolean;
  code: string;
  url: string;
  filename: string;
  size: number;
  expiresAt: string;
  expiresIn: string;
  malwareScan: "Verified Clean (ClamAV Engine)" | "Verification In Progress";
  qrSvg?: string;
}

export interface BlipAd {
  id?: string;
  text: string;
  url: string;
  sponsor: string;
}

export interface AdCampaign {
  id: string;
  sponsor: string;
  text: string;
  url: string;
  active: boolean;
  weight: number;
  impressions: number;
  clicks: number;
  createdAt: number;
}

export interface ScanJobPayload {
  code: string;
  objectKey: string;
  size: number;
  timestamp: number;
}

export interface ScanResultCallback {
  code: string;
  result: "clean" | "infected" | "error";
  signature?: string;
}

export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
