import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { publicDb } from "@/lib/public-db.server";

const BASE_URL = "https://leeshoefactory.com";

const STATIC_PATHS = [
  "/", "/products", "/about", "/contact", "/gallery", "/blog",
  "/manufacturing", "/wholesale", "/size-guide", "/shipping",
  "/returns", "/warranty", "/faq", "/care-guide", "/materials",
  "/sustainability", "/careers", "/press", "/store-locator",
  "/privacy", "/terms", "/cookies", "/accessibility",
  "/refund-policy", "/wholesale-terms", "/gift-cards",
  "/track-order", "/reviews", "/bulk-orders", "/oem",
  "/private-label", "/request-quote", "/become-distributor",
  "/factory-tour",
];

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sb = publicDb();
        const [{ data: products }, { data: categories }, { data: posts }] = await Promise.all([
          sb.from("products").select("slug,updated_at").eq("status", "published"),
          sb.from("categories").select("slug,updated_at"),
          sb.from("blog_posts").select("slug,updated_at").eq("published", true),
        ]);

        type Entry = { path: string; lastmod?: string; changefreq: string; priority?: string };
        const entries: Entry[] = [
          ...STATIC_PATHS.map((p) => ({
            path: p,
            changefreq: "weekly",
            priority: p === "/" ? "1.0" : undefined,
          })),
          ...(categories ?? []).map((c) => ({
            path: `/category/${c.slug}`,
            lastmod: c.updated_at ?? undefined,
            changefreq: "weekly",
            priority: "0.8",
          })),
          ...(products ?? []).map((p) => ({
            path: `/products/${p.slug}`,
            lastmod: p.updated_at ?? undefined,
            changefreq: "weekly",
            priority: "0.9",
          })),
          ...(posts ?? []).map((b) => ({
            path: `/blog/${b.slug}`,
            lastmod: b.updated_at ?? undefined,
            changefreq: "monthly",
            priority: "0.6",
          })),
        ];

        const urls = entries.map((e) =>
          [
            "  <url>",
            `    <loc>${esc(BASE_URL + e.path)}</loc>`,
            e.lastmod ? `    <lastmod>${new Date(e.lastmod).toISOString().slice(0, 10)}</lastmod>` : null,
            `    <changefreq>${e.changefreq}</changefreq>`,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            "  </url>",
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
