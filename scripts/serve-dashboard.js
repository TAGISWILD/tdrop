#!/usr/bin/env node

import http from "node:http";
import { exec } from "node:child_process";
import { renderStatsPage } from "../packages/worker/dist/views/stats.html.js";
import { getLiveStatsPayload } from "../packages/worker/dist/routes/stats.js";

// Fallback in case typescript files are directly referenced
let renderFn = renderStatsPage;
let payloadFn = getLiveStatsPayload;

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (url.pathname === "/api/stats") {
    const dummyEnv = {
      APP_DOMAIN: "localhost:3333",
    };
    try {
      const stats = await payloadFn(dummyEnv, "localhost:3333");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(stats, null, 2));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  if (url.pathname === "/" || url.pathname === "/stats" || url.pathname === "/dashboard") {
    try {
      const html = renderFn("localhost:3333");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error: " + err.message);
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

server.listen(PORT, () => {
  const localUrl = `http://localhost:${PORT}/stats`;
  console.log(`\n\x1b[32m✔ tdrop Real-Time Stats & Sponsor Dashboard is LIVE!\x1b[0m`);
  console.log(`\x1b[36m➜ Local URL:\x1b[0m   ${localUrl}`);
  console.log(`\x1b[36m➜ Telemetry API:\x1b[0m http://localhost:${PORT}/api/stats\n`);
  console.log(`Press Ctrl+C to stop.\n`);

  // Automatically open browser on Mac / Linux / Windows if not in CI
  if (!process.env.CI) {
    const startCmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
    exec(`${startCmd} ${localUrl}`, () => {});
  }
});
