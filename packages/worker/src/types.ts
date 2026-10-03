export interface Bindings {
  BUCKET: R2Bucket;
  METADATA?: KVNamespace;
  APP_DOMAIN?: string;
  SCANNER_URL?: string;
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;
  RATE_LIMIT_SECRET?: string;
  INTERNAL_SCAN_SECRET?: string;
}

export type AppContext = {
  Bindings: Bindings;
  Variables: {
    ipHash?: string;
  };
};
