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
import { renderSponsorPage } from "./views/sponsor.html.js";
import { renderPrivacyPage } from "./views/privacy.html.js";
import { renderTermsPage } from "./views/terms.html.js";
import { renderErrorPage } from "./views/error.html.js";
import { AdsService } from "./services/ads.js";

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

// Dedicated Public Landing & Legal Pages (Before code router)
app.get("/sponsor", (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  return c.html(renderSponsorPage(domain));
});

app.get("/sponsorship", (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  return c.html(renderSponsorPage(domain));
});

app.get("/privacy", (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  return c.html(renderPrivacyPage(domain));
});

app.get("/terms", (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  return c.html(renderTermsPage(domain));
});

// Sponsor Inquiry Submission API
app.post("/api/sponsor-inquiry", async (c) => {
  try {
    const body = await c.req.json();
    const id = `inquiry_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
    if (c.env.METADATA) {
      await c.env.METADATA.put(`tdrop:sponsor_inquiry:${id}`, JSON.stringify(body), {
        expirationTtl: 60 * 60 * 24 * 90, // 90 days
      });
    }
    return c.json({ success: true, message: "Inquiry received. We will respond within 24 hours.", id });
  } catch (err: any) {
    return c.json({ error: "Failed to process inquiry", message: err.message }, 500);
  }
});

// Root landing: Rich web homepage for browsers/crawlers/Google, plain text for curl/terminal
app.get("/", async (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const ua = (c.req.header("user-agent") || "").toLowerCase();
  const acceptHeader = (c.req.header("accept") || "").toLowerCase();

  // Only terminal CLI tools without explicit text/html request get raw text
  const isTerminalClient =
    (ua.startsWith("curl/") ||
      ua.startsWith("wget/") ||
      ua.startsWith("httpie/") ||
      ua.includes("libcurl")) &&
    !acceptHeader.includes("text/html");

  c.header("Vary", "Accept, User-Agent");

  if (isTerminalClient) {
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
  }

  // ALL browsers, Google AdSense crawlers, Googlebot, and preview proxies receive the full HTML
  return c.html(renderHomePage(domain));
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
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const ua = (c.req.header("user-agent") || "").toLowerCase();
  const acceptHeader = (c.req.header("accept") || "").toLowerCase();
  const isTerminalClient =
    (ua.startsWith("curl/") ||
      ua.startsWith("wget/") ||
      ua.startsWith("httpie/") ||
      ua.includes("libcurl")) &&
    !acceptHeader.includes("text/html");

  if (!isTerminalClient) {
    return c.html(
      renderErrorPage(
        404,
        "Page Not Found",
        "The requested link or route does not exist or has expired.",
        domain
      ),
      404
    );
  }
  return c.json({ error: "Not Found", message: "The requested route does not exist." }, 404);
});

// Global error handler
app.onError((err, c) => {
  console.error("[tdrop:ERROR]", err);
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const ua = (c.req.header("user-agent") || "").toLowerCase();
  const acceptHeader = (c.req.header("accept") || "").toLowerCase();
  const isTerminalClient =
    (ua.startsWith("curl/") ||
      ua.startsWith("wget/") ||
      ua.startsWith("httpie/") ||
      ua.includes("libcurl")) &&
    !acceptHeader.includes("text/html");

  if (!isTerminalClient) {
    return c.html(
      renderErrorPage(
        500,
        "Internal Edge Error",
        "An unexpected edge error occurred while processing your request.",
        domain
      ),
      500
    );
  }
  return c.json(
    {
      error: "Internal Server Error",
      message: err.message || "An unexpected error occurred.",
    },
    500
  );
});

export default app;
