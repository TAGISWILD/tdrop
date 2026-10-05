import { Hono } from "hono";
import type { AppContext } from "../types.js";

export const seoRoute = new Hono<AppContext>();

/**
 * robots.txt
 * Instructs search engine crawlers (Googlebot, Bingbot, etc.) on allowed public indexable pages
 * and disallows indexing ephemeral private uploads and internal API routes.
 */
seoRoute.on(["GET", "HEAD"], "/robots.txt", (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const robots = `# https://www.robotstxt.org/robotstxt.html
# Search engine crawl rules for tdrop (${domain})

User-agent: *
Allow: /
Allow: /sitemap.xml
Allow: /robots.txt
Allow: /stats
Allow: /sponsor
Allow: /sponsorship
Allow: /privacy
Allow: /terms
Allow: /install.sh
Allow: /install.ps1
Allow: /assets/
Allow: /favicon.ico
Allow: /manifest.json
Allow: /site.webmanifest

# Disallow private user uploads, internal endpoints, and API mutations
Disallow: /upload
Disallow: /upload/raw
Disallow: /api/
Disallow: /internal/

# Sitemap location
Sitemap: https://${domain}/sitemap.xml
`;

  return c.text(robots, 200, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "public, max-age=86400, s-maxage=86400",
  });
});

/**
 * sitemap.xml
 * Fully compliant sitemaps.org XML schema with Google image extensions for Search Console indexing
 */
seoRoute.on(["GET", "HEAD"], "/sitemap.xml", (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://${domain}/assets/preview.png</image:loc>
    </image:image>
    <image:image>
      <image:loc>https://${domain}/assets/logo.png</image:loc>
    </image:image>
  </url>
  <url>
    <loc>https://${domain}/stats</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://${domain}/sponsor</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://${domain}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://${domain}/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
});

/**
 * Web App Manifest (PWA for mobile & desktop Google ranking signals)
 */
const manifestHandler = (c: any) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const manifest = {
    name: "tdrop - Ephemeral File Sharing",
    short_name: "tdrop",
    description: "Ultra-fast, ephemeral, authless file sharing from your terminal, cURL, or browser.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/assets/favicon.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/assets/logo-128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/assets/logo.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };

  return c.json(manifest, 200, {
    "Content-Type": "application/manifest+json; charset=utf-8",
    "Cache-Control": "public, max-age=86400",
  });
};

seoRoute.on(["GET", "HEAD"], "/manifest.json", manifestHandler);
seoRoute.on(["GET", "HEAD"], "/site.webmanifest", manifestHandler);

/**
 * Dynamic Google Search Console HTML verification file handler
 * Matches: /google[a-f0-9]+.html
 */
seoRoute.get("/:file{google[a-f0-9]+\\.html}", async (c) => {
  const file = c.req.param("file");
  return c.text(`google-site-verification: ${file}`);
});
