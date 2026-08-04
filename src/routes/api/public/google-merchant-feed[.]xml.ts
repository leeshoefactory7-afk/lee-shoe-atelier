import { createFileRoute } from "@tanstack/react-router";
import { publicDb } from "@/lib/public-db.server";

const BASE_URL = "https://leeshoefactory.com";

function esc(s: unknown) {
  return String(s ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const Route = createFileRoute("/api/public/google-merchant-feed.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sb = publicDb();
        const { data: products } = await sb.from("products").select("*").eq("status", "published");
        const { data: colors } = await sb.from("product_colors").select("*").order("sort_order");
        const byProduct: Record<string, any[]> = {};
        for (const c of colors ?? []) (byProduct[c.product_id] ||= []).push(c);

        const items: string[] = [];
        for (const p of products ?? []) {
          const variants = byProduct[p.id]?.length
            ? byProduct[p.id]
            : [{ name: (p.colors?.[0] as string) ?? "", images: p.images ?? [] }];
          for (const v of variants) {
            const imgs: string[] = (v.images?.length ? v.images : p.images) ?? [];
            const price = Number(p.discount_price ?? p.price ?? 0).toFixed(2);
            const id = `${p.sku || p.slug}-${String(v.name || "default").replace(/[^A-Za-z0-9]+/g, "-").toLowerCase()}`;
            items.push(
              [
                "  <item>",
                `    <g:id>${esc(id)}</g:id>`,
                `    <g:title>${esc(`${p.name}${v.name ? ` — ${v.name}` : ""}`)}</g:title>`,
                `    <g:description>${esc(p.description || p.short_description || p.name)}</g:description>`,
                `    <g:link>${esc(`${BASE_URL}/products/${p.slug}`)}</g:link>`,
                `    <g:image_link>${esc(imgs[0] || p.main_image || "")}</g:image_link>`,
                ...imgs.slice(1, 11).map((i) => `    <g:additional_image_link>${esc(i)}</g:additional_image_link>`),
                `    <g:availability>${(p.stock ?? 0) > 0 ? "in_stock" : "out_of_stock"}</g:availability>`,
                `    <g:price>${price} USD</g:price>`,
                `    <g:brand>${esc(p.brand || "Lee Shoe Factory")}</g:brand>`,
                `    <g:mpn>${esc(p.sku || p.slug)}</g:mpn>`,
                `    <g:identifier_exists>no</g:identifier_exists>`,
                `    <g:condition>new</g:condition>`,
                `    <g:google_product_category>187</g:google_product_category>`,
                `    <g:product_type>Apparel &amp; Accessories &gt; Shoes</g:product_type>`,
                `    <g:age_group>${p.gender === "kids" ? "kids" : "adult"}</g:age_group>`,
                `    <g:gender>${p.gender === "men" ? "male" : p.gender === "women" ? "female" : "unisex"}</g:gender>`,
                v.name ? `    <g:color>${esc(v.name)}</g:color>` : null,
                `    <g:item_group_id>${esc(p.slug)}</g:item_group_id>`,
                `    <g:custom_label_0>MOQ ${p.min_order_qty ?? 1}</g:custom_label_0>`,
                "  </item>",
              ].filter(Boolean).join("\n"),
            );
          }
        }

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">`,
          `<channel>`,
          `  <title>Lee Shoe Factory — Wholesale Footwear</title>`,
          `  <link>${BASE_URL}</link>`,
          `  <description>Factory-direct wholesale footwear catalog.</description>`,
          ...items,
          `</channel>`,
          `</rss>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=1800" },
        });
      },
    },
  },
});
