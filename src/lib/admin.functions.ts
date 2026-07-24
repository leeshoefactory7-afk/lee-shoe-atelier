import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (!data) throw new Error("Forbidden");
}

// ---------- Dashboard / read helpers ----------

export const adminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [orders, products, customers, reviews, messages] = await Promise.all([
      supabaseAdmin.from("orders").select("id,total,status", { count: "exact" }),
      supabaseAdmin.from("products").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("reviews").select("id,status", { count: "exact" }),
      supabaseAdmin.from("contact_messages").select("id", { count: "exact", head: true }),
    ]);
    const revenue = (orders.data ?? []).reduce((s: number, o: any) => s + Number(o.total ?? 0), 0);
    const pending = (orders.data ?? []).filter((o: any) => o.status === "pending").length;
    const pendingReviews = (reviews.data ?? []).filter((r: any) => r.status === "pending").length;
    return {
      totalOrders: orders.count ?? 0,
      pendingOrders: pending,
      revenue,
      totalProducts: products.count ?? 0,
      totalCustomers: customers.count ?? 0,
      totalReviews: reviews.count ?? 0,
      pendingReviews,
      totalMessages: messages.count ?? 0,
    };
  });

// ---------- Image upload ----------

export const uploadImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { folder: string; filename: string; contentType: string; base64: string }) =>
    z.object({
      folder: z.string().regex(/^[a-z0-9/_-]+$/),
      filename: z.string().min(1),
      contentType: z.string(),
      base64: z.string().min(1),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const safeName = data.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${data.folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
    const buf = Buffer.from(data.base64, "base64");
    const { error } = await supabaseAdmin.storage
      .from("product-images")
      .upload(path, buf, { contentType: data.contentType, upsert: false });
    if (error) throw new Error(error.message);
    return { path, url: `/api/public/img/${path}` };
  });

export const deleteImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { path: string }) => z.object({ path: z.string() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // path may be full url — strip prefix
    const p = data.path.replace(/^\/api\/public\/img\//, "");
    await supabaseAdmin.storage.from("product-images").remove([p]);
    return { ok: true };
  });

// ---------- Orders ----------

export const adminListOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("orders")
      .select("id,order_number,customer_name,email,total,status,created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    return data ?? [];
  });

export const adminGetOrder = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order } = await supabaseAdmin.from("orders").select("*").eq("id", data.id).maybeSingle();
    if (!order) return null;
    const { data: items } = await supabaseAdmin.from("order_items").select("*").eq("order_id", order.id);
    return { order, items: items ?? [] };
  });

export const adminUpdateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; status: string }) => z.object({ id: z.string().uuid(), status: z.string() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("orders").update({ status: data.status as any }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("orders").delete().eq("id", data.id);
    return { ok: true };
  });

// ---------- Products + color variants ----------

const colorVariantSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  hex: z.string().nullable().optional(),
  images: z.array(z.string()).default([]),
  sort_order: z.number().int().default(0),
});

const productSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1),
  name: z.string().min(1),
  sku: z.string().nullable().optional(),
  category_id: z.string().uuid().nullable().optional(),
  brand: z.string().nullable().optional(),
  gender: z.enum(["men", "women", "unisex", "kids"]).default("unisex"),
  price: z.number().min(0),
  discount_price: z.number().nullable().optional(),
  stock: z.number().int().min(0).default(0),
  material: z.string().nullable().optional(),
  weight_grams: z.number().int().nullable().optional(),
  short_description: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  features: z.array(z.string()).nullable().optional(),
  care_instructions: z.string().nullable().optional(),
  sizes: z.array(z.string()).nullable().optional(),
  main_image: z.string().nullable().optional(),
  images: z.array(z.string()).nullable().optional(),
  status: z.enum(["draft", "published", "archived", "out_of_stock"]).default("published"),
  is_featured: z.boolean().default(false),
  is_bestseller: z.boolean().default(false),
  is_new: z.boolean().default(false),
  is_limited: z.boolean().default(false),
  colorVariants: z.array(colorVariantSchema).default([]),
});

export const adminListProducts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("products")
      .select("id,slug,name,brand,price,discount_price,stock,status,main_image,is_featured")
      .order("created_at", { ascending: false });
    return data ?? [];
  });

export const adminGetProduct = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: product } = await supabaseAdmin.from("products").select("*").eq("id", data.id).maybeSingle();
    if (!product) return null;
    const { data: colors } = await supabaseAdmin
      .from("product_colors").select("*").eq("product_id", data.id).order("sort_order");
    return { product, colors: colors ?? [] };
  });

export const adminSaveProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => productSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { colorVariants, id, ...row } = data;
    let productId = id;
    if (productId) {
      const { error } = await supabaseAdmin.from("products").update(row as any).eq("id", productId);
      if (error) throw new Error(error.message);
    } else {
      const { data: created, error } = await supabaseAdmin.from("products").insert(row as any).select("id").single();
      if (error || !created) throw new Error(error?.message ?? "Insert failed");
      productId = created.id;
    }
    // Sync color variants: delete all then insert.
    await supabaseAdmin.from("product_colors").delete().eq("product_id", productId);
    if (colorVariants.length) {
      await supabaseAdmin.from("product_colors").insert(
        colorVariants.map((c, i) => ({
          product_id: productId!,
          name: c.name,
          hex: c.hex ?? null,
          images: c.images,
          sort_order: c.sort_order ?? i,
        })),
      );
    }
    return { id: productId };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("products").delete().eq("id", data.id);
    return { ok: true };
  });

// ---------- Categories ----------

const categorySchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  sort_order: z.number().int().default(0),
});

export const adminListCategories = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.from("categories").select("*").order("sort_order");
    return data ?? [];
  });

export const adminSaveCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => categorySchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...row } = data;
    if (id) {
      const { error } = await supabaseAdmin.from("categories").update(row as any).eq("id", id);
      if (error) throw new Error(error.message);
      return { id };
    }
    const { data: created, error } = await supabaseAdmin.from("categories").insert(row as any).select("id").single();
    if (error) throw new Error(error.message);
    return { id: created!.id };
  });

export const adminDeleteCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("categories").delete().eq("id", data.id);
    return { ok: true };
  });

// ---------- Blog ----------

const blogSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  cover_image: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  author: z.string().nullable().optional(),
  published: z.boolean().default(true),
});

export const adminListBlog = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.from("blog_posts").select("*").order("created_at", { ascending: false });
    return data ?? [];
  });

export const adminSaveBlog = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => blogSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...row } = data;
    if (id) {
      const { error } = await supabaseAdmin.from("blog_posts").update(row as any).eq("id", id);
      if (error) throw new Error(error.message);
      return { id };
    }
    const { data: created, error } = await supabaseAdmin.from("blog_posts").insert(row as any).select("id").single();
    if (error) throw new Error(error.message);
    return { id: created!.id };
  });

export const adminDeleteBlog = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("blog_posts").delete().eq("id", data.id);
    return { ok: true };
  });

// ---------- Gallery ----------

export const adminListGallery = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.from("gallery_images").select("*").order("sort_order");
    return data ?? [];
  });

export const adminAddGallery = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { image_url: string; caption?: string; category?: string }) =>
    z.object({ image_url: z.string().min(1), caption: z.string().optional(), category: z.string().optional() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("gallery_images").insert({
      image_url: data.image_url, caption: data.caption ?? null, category: data.category ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteGallery = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("gallery_images").delete().eq("id", data.id);
    return { ok: true };
  });

// ---------- Reviews ----------

export const adminListReviews = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.from("reviews").select("*").order("created_at", { ascending: false }).limit(300);
    return data ?? [];
  });

export const adminSetReviewStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string; status: "pending" | "approved" | "rejected" }) =>
    z.object({ id: z.string().uuid(), status: z.enum(["pending", "approved", "rejected"]) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("reviews").update({ status: data.status as any }).eq("id", data.id);
    return { ok: true };
  });

export const adminDeleteReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("reviews").delete().eq("id", data.id);
    return { ok: true };
  });

// ---------- Customers ----------

export const adminListCustomers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: profiles } = await supabaseAdmin.from("profiles").select("*").order("created_at", { ascending: false });
    const { data: roles } = await supabaseAdmin.from("user_roles").select("user_id,role");
    const rolesByUser = new Map<string, string[]>();
    (roles ?? []).forEach((r: any) => {
      const arr = rolesByUser.get(r.user_id) ?? [];
      arr.push(r.role);
      rolesByUser.set(r.user_id, arr);
    });
    return (profiles ?? []).map((p: any) => ({ ...p, roles: rolesByUser.get(p.id) ?? [] }));
  });

export const adminSetRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { user_id: string; role: "admin" | "customer"; grant: boolean }) =>
    z.object({ user_id: z.string().uuid(), role: z.enum(["admin", "customer"]), grant: z.boolean() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.grant) {
      await supabaseAdmin.from("user_roles").upsert({ user_id: data.user_id, role: data.role as any });
    } else {
      await supabaseAdmin.from("user_roles").delete().eq("user_id", data.user_id).eq("role", data.role as any);
    }
    return { ok: true };
  });

// ---------- Contact messages ----------

export const adminListMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(300);
    return data ?? [];
  });

export const adminDeleteMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("contact_messages").delete().eq("id", data.id);
    return { ok: true };
  });

// ---------- Site settings ----------

export const adminListSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.from("site_settings").select("*").order("key");
    return data ?? [];
  });

export const adminSaveSetting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { key: string; value: unknown }) => z.object({ key: z.string().min(1), value: z.any() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("site_settings").upsert({ key: data.key, value: data.value as any });
    return { ok: true };
  });

export const adminDeleteSetting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { key: string }) => z.object({ key: z.string() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("site_settings").delete().eq("key", data.key);
    return { ok: true };
  });
