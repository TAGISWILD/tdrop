import { Hono } from "hono";
import { cors } from "hono/cors";
import type { AppContext } from "./types.js";
import { rateLimitMiddleware } from "./middleware/ip.js";
import { uploadRoute } from "./routes/upload.js";
import { downloadRoute } from "./routes/download.js";
import { blipRoute } from "./routes/blip.js";
import { internalRoute } from "./routes/internal.js";
import { statsRoute } from "./routes/stats.js";
import { renderHomePage } from "./views/home.html.js";

const app = new Hono<AppContext>();

// Global CORS & standard headers
app.use("*", cors());

// Health check endpoint
app.get("/health", (c) => {
  return c.json({
    status: "healthy",
    service: "tdrop-edge",
    time: new Date().toISOString(),
  });
});

// Root landing: Rich web homepage for browsers, plain text for curl/terminal
app.get("/", (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const acceptHeader = c.req.header("accept") || "";

  if (acceptHeader.includes("text/html")) {
    return c.html(renderHomePage(domain));
  }

  return c.text(
    `tdrop (Terminal Drop) - Ephemeral File Sharing

USAGE VIA CLI:
  npx tdrop <file>
  cat archive.tar.gz | npx tdrop --filename archive.tar.gz

USAGE VIA CURL:
  curl -F "file=@myfile.zip" https://${domain}/upload
  curl -T "myfile.zip" -H "X-TDrop-Filename: myfile.zip" https://${domain}/upload/raw

SECURITY:
  🛡️  Files scanned with ClamAV Engine before distribution.
  🔒 Direct streaming to Cloudflare R2 (zero disk writes).
  ⏳ Strictly ephemeral: 1 hour, 24 hours, or 7 days retention.
`
  );
});

// Mount internal routes & public telemetry (bypasses code probe rate limiter)
app.route("/", internalRoute);
app.route("/", blipRoute);
app.route("/", statsRoute);

// Apply rate limiting & probe protection to public API routes
app.use("/upload", rateLimitMiddleware);
app.use("/upload/raw", rateLimitMiddleware);
app.use("/:code", rateLimitMiddleware);

// Mount upload and download routes
app.route("/", uploadRoute);
app.route("/", downloadRoute);

// 404 handler
app.notFound((c) => {
  return c.json({ error: "Not Found", message: "The requested route does not exist." }, 404);
});

// Global error handler
app.onError((err, c) => {
  console.error("[tdrop:ERROR]", err);
  return c.json(
    {
      error: "Internal Server Error",
      message: err.message || "An unexpected error occurred.",
    },
    500
  );
});

export default app;
