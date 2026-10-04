#!/usr/bin/env node

import http from "node:http";
import { exec } from "node:child_process";
import { networkInterfaces } from "node:os";
import { Readable } from "node:stream";
import appModule from "../packages/worker/dist/index.js";
const app = appModule.default?.default || appModule.default || appModule;

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;

// Find local network IP (e.g. 10.0.0.x or 192.168.x.x) for mobile access
function getLocalNetworkIp() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}

const localIp = getLocalNetworkIp();

// In-Memory Cloudflare R2 bucket implementation for seamless local uploads & downloads
const memoryStorage = new Map();
const localBucket = {
  async put(key, buffer, options) {
    memoryStorage.set(key, {
      buffer,
      httpMetadata: options?.httpMetadata,
      customMetadata: options?.customMetadata,
      uploadedAt: Date.now(),
    });
    return { key, size: buffer.byteLength };
  },
  async get(key, options) {
    const item = memoryStorage.get(key);
    if (!item) return null;
    let buf = item.buffer;
    if (options?.range) {
      const { offset = 0, length } = options.range;
      buf = buf.subarray(offset, length ? offset + length : undefined);
    }
    return {
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(buf);
          controller.close();
        },
      }),
      size: item.buffer.byteLength,
      httpMetadata: item.httpMetadata,
      customMetadata: item.customMetadata,
    };
  },
  async delete(key) {
    memoryStorage.delete(key);
  },
  async list() {
    const objects = Array.from(memoryStorage.entries()).map(([key, item]) => ({
      key,
      size: item.buffer.byteLength,
      uploaded: new Date(item.uploadedAt),
    }));
    return { objects };
  },
};

const localEnv = {
  BUCKET: localBucket,
  APP_DOMAIN: `${localIp}:${PORT}`,
  RATE_LIMIT_SECRET: "local_dev_rate_limit_secret",
};

// HTTP Server delegating directly to Hono app.fetch
const server = http.createServer(async (req, res) => {
  const host = req.headers.host || `${localIp}:${PORT}`;
  const url = new URL(req.url || "/", `http://${host}`);

  // Convert Node IncomingMessage to Web Request
  const body = req.method === "GET" || req.method === "HEAD" ? null : Readable.toWeb(req);

  const headers = new Headers();
  for (const [key, val] of Object.entries(req.headers)) {
    if (val) {
      if (Array.isArray(val)) {
        val.forEach((v) => headers.append(key, v));
      } else {
        headers.set(key, val);
      }
    }
  }

  // Provide synthetic cf object for local edge geo-routing
  const cf = {
    colo: "IAD",
    country: "US",
    city: "Local Edge",
  };

  const webReq = new Request(url.toString(), {
    method: req.method,
    headers,
    body,
    duplex: "half",
  });

  // Attach cf to request
  webReq.cf = cf;

  try {
    const webRes = await app.fetch(webReq, localEnv, {
      waitUntil(promise) {
        promise.catch(console.error);
      },
      passThroughOnException() {},
    });

    res.statusCode = webRes.status;
    for (const [key, val] of webRes.headers.entries()) {
      res.setHeader(key, val);
    }

    if (webRes.body) {
      const reader = webRes.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error("[tdrop:local-server] Error:", err);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error", message: err.message }));
    }
  }
});

// Listen on all network interfaces (0.0.0.0) so mobile devices on Wi-Fi can connect!
server.listen(PORT, "0.0.0.0", () => {
  const localUrl = `http://localhost:${PORT}/stats`;
  const mobileUrl = `http://${localIp}:${PORT}`;
  const mobileStats = `http://${localIp}:${PORT}/stats`;

  console.log(`\n\x1b[32m✔ tdrop Full Stack & Real-Time Telemetry is LIVE!\x1b[0m`);
  console.log(`\x1b[36m➜ Local Dashboard:\x1b[0m    ${localUrl}`);
  console.log(`\x1b[36m➜ Mobile Web Access:\x1b[0m  ${mobileUrl} (or ${mobileStats})`);
  console.log(`\x1b[36m➜ Realtime API:\x1b[0m       http://${localIp}:${PORT}/api/stats`);
  console.log(`\x1b[36m➜ Realtime SSE Stream:\x1b[0m http://${localIp}:${PORT}/api/stats/live\n`);

  console.log(`\x1b[33m⚡ How to test terminal uploads locally:\x1b[0m`);
  console.log(`  \x1b[1mcurl -F "file=@README.md" http://${localIp}:${PORT}/upload\x1b[0m`);
  console.log(`  \x1b[1mnpx tdrop README.md -u http://${localIp}:${PORT}\x1b[0m`);
  console.log(`\nPress Ctrl+C to stop.\n`);

  if (!process.env.CI) {
    const startCmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
    exec(`${startCmd} ${localUrl}`, () => {});
  }
});
