import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

const STATIC_PATHS = [
  "/", "/products", "/about", "/contact", "/gallery", "/blog",
  "/manufacturing", "/wholesale", "/size-guide", "/shipping",
  "/returns", "/warranty", "/faq", "/care-guide", "/materials",
  "/sustainability", "/careers", "/press", "/store-locator",
  "/privacy", "/terms", "/cookies", "/accessibility",
  "/refund-policy", "/wholesale-terms", "/gift-cards",
  "/track-order", "/reviews",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = STATIC_PATHS.map((p) =>
          `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
