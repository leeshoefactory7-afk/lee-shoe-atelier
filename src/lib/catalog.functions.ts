import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function serverPublicClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listProducts = createServerFn({ method: "GET" })
  .inputValidator((d: { limit?: number; featured?: boolean; bestseller?: boolean; isNew?: boolean; limited?: boolean; category?: string } | undefined) =>
    z
      .object({
        limit: z.number().int().min(1).max(200).optional(),
        featured: z.boolean().optional(),
        bestseller: z.boolean().optional(),
        isNew: z.boolean().optional(),
        limited: z.boolean().optional(),
        category: z.string().optional(),
      })
      .default({})
      .parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const sb = serverPublicClient();
    let q = sb
      .from("products")
      .select("id,slug,name,brand,gender,price,discount_price,main_image,rating_avg,rating_count,is_new,is_bestseller,is_limited,category_id,short_description,stock,min_order_qty")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    if (data.featured) q = q.eq("is_featured", true);
    if (data.bestseller) q = q.eq("is_bestseller", true);
    if (data.isNew) q = q.eq("is_new", true);
    if (data.limited) q = q.eq("is_limited", true);
    if (data.category) {
      const { data: cat } = await sb.from("categories").select("id").eq("slug", data.category).maybeSingle();
      if (cat?.id) q = q.eq("category_id", cat.id);
    }
    if (data.limit) q = q.limit(data.limit);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const sb = serverPublicClient();
  const { data, error } = await sb.from("categories").select("*").order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const sb = serverPublicClient();
    const { data: product, error } = await sb
      .from("products")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!product) return null;
    const { data: reviews } = await sb
      .from("reviews")
      .select("*")
      .eq("product_id", product.id)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(20);
    const { data: colorVariants } = await sb
      .from("product_colors")
      .select("*")
      .eq("product_id", product.id)
      .order("sort_order");
    const { data: related } = await sb
      .from("products")
      .select("id,slug,name,price,discount_price,main_image,brand")
      .eq("status", "published")
      .eq("category_id", product.category_id ?? "")
      .neq("id", product.id)
      .limit(4);
    return { product, reviews: reviews ?? [], related: related ?? [], colorVariants: colorVariants ?? [] };
  });

export const getCategoryBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const sb = serverPublicClient();
    const { data: cat } = await sb.from("categories").select("*").eq("slug", data.slug).maybeSingle();
    if (!cat) return null;
    const { data: products } = await sb
      .from("products")
      .select("id,slug,name,brand,gender,price,discount_price,main_image,rating_avg,rating_count,is_new,is_bestseller,is_limited,short_description,min_order_qty")
      .eq("status", "published")
      .eq("category_id", cat.id)
      .order("created_at", { ascending: false });
    return { category: cat, products: products ?? [] };
  });

export const listReviews = createServerFn({ method: "GET" })
  .inputValidator((d: { limit?: number } | undefined) =>
    z.object({ limit: z.number().int().min(1).max(500).optional() }).default({}).parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const sb = serverPublicClient();
    const q = sb
      .from("reviews")
      .select("id,product_id,customer_name,customer_country,customer_avatar,rating,title,body,image_url,verified,purchase_date,created_at,products(name,slug,main_image)")
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    const { data: rows, error } = data.limit ? await q.limit(data.limit) : await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const listBlogPosts = createServerFn({ method: "GET" })
  .inputValidator((d: { limit?: number } | undefined) =>
    z.object({ limit: z.number().int().min(1).max(100).optional() }).default({}).parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    const sb = serverPublicClient();
    const q = sb
      .from("blog_posts")
      .select("id,slug,title,excerpt,cover_image,category,tags,author,published_at")
      .eq("published", true)
      .order("published_at", { ascending: false });
    const { data: rows, error } = data.limit ? await q.limit(data.limit) : await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const getBlogPost = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const sb = serverPublicClient();
    const { data: post } = await sb.from("blog_posts").select("*").eq("slug", data.slug).eq("published", true).maybeSingle();
    if (!post) return null;
    const { data: related } = await sb
      .from("blog_posts")
      .select("id,slug,title,excerpt,cover_image,category,published_at")
      .eq("published", true)
      .neq("id", post.id)
      .limit(3);
    return { post, related: related ?? [] };
  });

export const listGallery = createServerFn({ method: "GET" }).handler(async () => {
  const sb = serverPublicClient();
  const { data, error } = await sb.from("gallery_images").select("*").order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const searchProducts = createServerFn({ method: "GET" })
  .inputValidator((d: { q: string }) => z.object({ q: z.string().max(100) }).parse(d))
  .handler(async ({ data }) => {
    const sb = serverPublicClient();
    // Escape PostgREST filter delimiters (comma, parentheses, colon, period, backslash)
    // and wildcard characters to prevent injection into the .or() filter string.
    const safe = data.q.replace(/[\\,\.\(\):%*]/g, " ").trim();
    if (!safe) return [];
    const term = `%${safe}%`;
    const { data: rows } = await sb
      .from("products")
      .select("id,slug,name,price,discount_price,main_image,brand")
      .eq("status", "published")
      .or(`name.ilike.${term},short_description.ilike.${term},brand.ilike.${term}`)
      .limit(12);
    return rows ?? [];
  });

