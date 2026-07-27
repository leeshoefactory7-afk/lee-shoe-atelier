import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { SITE } from "./site-config";

const itemSchema = z.object({
  product_id: z.string().uuid().nullable().optional(),
  product_name: z.string().min(1),
  product_image: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  quantity: z.number().int().min(1),
  unit_price: z.number().min(0),
});

const orderSchema = z.object({
  order_number: z.string().min(4),
  customer_name: z.string().min(1),
  company_name: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  shipping_address: z.string().optional(),
  billing_address: z.string().optional(),
  notes: z.string().optional(),
  subtotal: z.number().min(0),
  shipping: z.number().min(0),
  total: z.number().min(0),
  items: z.array(itemSchema).min(1),
});

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => orderSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { items, ...header } = data;
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({ ...header, status: "pending" })
      .select()
      .single();
    if (error || !order) throw new Error(error?.message ?? "Failed");
    const itemsToInsert = items.map((i) => ({
      order_id: order.id,
      product_id: i.product_id ?? null,
      product_name: i.product_name,
      product_image: i.product_image ?? null,
      size: i.size ?? null,
      color: i.color ?? null,
      quantity: i.quantity,
      unit_price: i.unit_price,
      subtotal: i.quantity * i.unit_price,
    }));
    await supabaseAdmin.from("order_items").insert(itemsToInsert);
    // Fire FormSubmit
    try {
      await fetch(SITE.formsubmitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Lee · New order ${order.order_number}`,
          ...header,
          items,
        }),
      });
    } catch {}
    return { order_number: order.order_number };
  });

export const getOrderByNumber = createServerFn({ method: "GET" })
  .inputValidator((d: { order_number: string; email: string }) =>
    z.object({ order_number: z.string().min(1), email: z.string().email() }).parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("order_number", data.order_number)
      .maybeSingle();
    if (!order) return null;
    // Require the requester to also know the order's email to prevent
    // enumeration of low-entropy order numbers exposing customer PII.
    if ((order.email ?? "").trim().toLowerCase() !== data.email.trim().toLowerCase()) {
      return null;
    }
    const { data: items } = await supabaseAdmin
      .from("order_items")
      .select("*")
      .eq("order_id", order.id);
    return { order, items: items ?? [] };
  });


export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("orders")
      .select("id,order_number,total,status,created_at")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getMyOrder = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: order } = await context.supabase
      .from("orders")
      .select("*")
      .eq("id", data.id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (!order) return null;
    const { data: items } = await context.supabase.from("order_items").select("*").eq("order_id", order.id);
    return { order, items: items ?? [] };
  });
