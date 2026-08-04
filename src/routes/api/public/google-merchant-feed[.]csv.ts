import { createFileRoute } from "@tanstack/react-router";
import { publicDb } from "@/lib/public-db.server";

const BASE_URL = "https://leeshoefactory.com";

const HEADERS = [
  "id","title","description","link","image_link","additional_image_link","availability","price",
  "brand","gtin","mpn","condition","identifier_exists","google_product_category","product_type",
  "age_group","gender","color","size","item_group_id","shipping_weight","min_handling_time",
  "max_handling_time","multipack","is_bundle","custom_label_0",
];

function csvCell(v: unknown) {
  const s = String(v ?? "").replace(/\s+/g, " ").trim();
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function buildFeedRows(products: any[], colorsByProduct: Record<string, any[]>) {
  const rows: string[][] = [];
  for (const p of products) {
    const variants = colorsByProduct[p.id]?.length
      ? colorsByProduct[p.id]
      : [{ name: (p.colors?.[0] as string) ?? "", images: p.images ?? [] }];
    for (const v of variants) {
      const imgs: string[] = (v.images?.length ? v.images : p.images) ?? [];
      const price = Number(p.discount_price ?? p.price ?? 0).toFixed(2);
      rows.push([
        `${p.sku || p.slug}-${String(v.name || "default").replace(/[^A-Za-z0-9]+/g, "-").toLowerCase()}`,
        `${p.name}${v.name ? ` — ${v.name}` : ""}`,
        p.description || p.short_description || p.name,
        `${BASE_URL}/products/${p.slug}`,
        imgs[0] || p.main_image || "",
        imgs.slice(1, 11).join(","),
        (p.stock ?? 0) > 0 ? "in_stock" : "out_of_stock",
        `${price} USD`,
        p.brand || "Lee Shoe Factory",
        "",
        p.sku || p.slug,
        "new",
        "no",
        "187",
        "Apparel & Accessories > Shoes",
        p.gender === "kids" ? "kids" : "adult",
        p.gender === "men" ? "male" : p.gender === "women" ? "female" : "unisex",
        v.name || "",
        (p.sizes ?? []).join(","),
        p.slug,
        p.weight_grams ? `${(p.weight_grams / 1000).toFixed(2)} kg` : "",
        "1",
        "5",
        "0",
        "no",
        `MOQ ${p.min_order_qty ?? 1}`,
      ]);
    }
  }
  return rows;
}

export const Route = createFileRoute("/api/public/google-merchant-feed.csv")({
  server: {
    handlers: {
      GET: async () => {
        const sb = publicDb();
        const { data: products } = await sb.from("products").select("*").eq("status", "published");
        const { data: colors } = await sb.from("product_colors").select("*").order("sort_order");
        const byProduct: Record<string, any[]> = {};
        for (const c of colors ?? []) (byProduct[c.product_id] ||= []).push(c);

        const rows = buildFeedRows(products ?? [], byProduct);
        const csv = [HEADERS, ...rows].map((r) => r.map(csvCell).join(",")).join("\n");

        return new Response(csv, {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": 'attachment; filename="google-merchant-feed.csv"',
            "Cache-Control": "public, max-age=1800",
          },
        });
      },
    },
  },
});
