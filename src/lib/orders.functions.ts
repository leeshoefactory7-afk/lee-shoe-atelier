import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import { SITE } from "./site-config";

function createPublicClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  const isOpaque = key.startsWith("sb_publishable_") || key.startsWith("sb_secret_");
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (isOpaque && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

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
    const { items, ...header } = data;
    const supabase = createPublicClient();
    const { data: orderNumber, error } = await supabase.rpc("place_order", {
      header: header as any,
      items: items as any,
    });
    if (error) throw new Error(error.message);
    return { order_number: orderNumber as string };
  });

/**
 * Server-side FormSubmit attempt. Used only as a fallback: the primary send now
 * happens from the customer's browser, because FormSubmit's free tier throttles
 * per outbound IP and our server IP is shared (HTTP 429 "Rate limit exceeded").
 */
export const sendOrderEmailFromServer = createServerFn({ method: "POST" })
  .inputValidator((d: { payload: Record<string, unknown> }) =>
    z.object({ payload: z.record(z.string(), z.any()) }).parse(d),
  )
  .handler(async ({ data }) => {
    const origin = `https://${SITE.domain}`;
    try {
      const res = await fetch(SITE.formsubmitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin,
          Referer: `${origin}/checkout`,
        },
        body: JSON.stringify(data.payload),
      });
      const body = await res.text().catch(() => "");
      let ok = res.ok;
      try {
        const json = JSON.parse(body);
        if (json && typeof json.success !== "undefined") ok = json.success === true || json.success === "true";
      } catch {
        /* non-JSON */
      }
      if (!ok) console.error("[formsubmit] server fallback failed", res.status, body);
      return { ok, status: res.status, body: body.slice(0, 300) };
    } catch (e: any) {
      console.error("[formsubmit] server fallback threw", e);
      return { ok: false, status: 0, body: String(e?.message ?? e) };
    }
  });


export const getOrderByNumber = createServerFn({ method: "GET" })
  .inputValidator((d: { order_number: string; email: string }) =>
    z.object({ order_number: z.string().min(1), email: z.string().email() }).parse(d),
  )
  .handler(async ({ data }) => {
    const supabase = createPublicClient();
    const { data: result, error } = await supabase.rpc("get_order_by_number_email", {
      _order_number: data.order_number,
      _email: data.email,
    });
    if (error) throw new Error(error.message);
    if (!result) return null;
    return result as { order: any; items: any[] };
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
