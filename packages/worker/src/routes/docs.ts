import { Hono } from "hono";
import type { AppContext } from "../types.js";
import { renderDocsPage, DOCS_PAGES } from "../views/docs.html.js";
import { renderErrorPage } from "../views/error.html.js";

export const docsRoute = new Hono<AppContext>();

// GET /docs - Documentation Home / Overview
docsRoute.get("/docs", (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  return c.html(renderDocsPage(domain, "index"));
});

// GET /docs/:slug - Individual Technical Guides
docsRoute.get("/docs/:slug", (c) => {
  const domain = c.env.APP_DOMAIN || "tdrop.link";
  const slug = c.req.param("slug");

  if (!DOCS_PAGES[slug]) {
    return c.html(
      renderErrorPage(
        404,
        "Document Not Found",
        `The documentation page "/docs/${slug}" does not exist. Please check the documentation index for available guides.`,
        domain
      ),
      404
    );
  }

  return c.html(renderDocsPage(domain, slug));
});
