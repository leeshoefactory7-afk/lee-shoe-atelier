import { supabase } from "@/integrations/supabase/client";
import { buildOrderEmailPayload, FORMSUBMIT_URL, type OrderEmailHeader, type OrderEmailItem } from "./order-email";
import { sendOrderEmailFromServer } from "./orders.functions";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function postFromBrowser(payload: Record<string, unknown>) {
  const res = await fetch(FORMSUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text().catch(() => "");
  let ok = res.ok;
  try {
    const json = JSON.parse(text);
    if (json && typeof json.success !== "undefined") ok = json.success === true || json.success === "true";
  } catch {
    /* non-JSON body */
  }
  return { ok, status: res.status, body: text.slice(0, 300) };
}

/**
 * Sends the order notification from the customer's browser (own IP + real origin),
 * which avoids the shared server-IP rate limit on FormSubmit's free tier.
 * Retries once, then falls back to a server-side attempt. Never throws.
 */
export async function notifyOrderEmail(header: OrderEmailHeader, items: OrderEmailItem[]) {
  const payload = buildOrderEmailPayload(header, items);
  let lastError = "";

  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) await sleep(2000);
    try {
      const r = await postFromBrowser(payload);
      if (r.ok) {
        await record(header, true);
        return { ok: true as const, via: "browser" as const };
      }
      lastError = `browser ${r.status}: ${r.body}`;
    } catch (e: any) {
      lastError = `browser error: ${e?.message ?? String(e)}`;
    }
  }

  // Fallback: try again from the server.
  try {
    const r = await sendOrderEmailFromServer({ data: { payload } });
    if (r.ok) {
      await record(header, true);
      return { ok: true as const, via: "server" as const };
    }
    lastError = `${lastError} | server ${r.status}: ${r.body ?? ""}`;
  } catch (e: any) {
    lastError = `${lastError} | server error: ${e?.message ?? String(e)}`;
  }

  await record(header, false, lastError);
  return { ok: false as const, error: lastError };
}

async function record(header: OrderEmailHeader, ok: boolean, error?: string) {
  try {
    await (supabase as any).rpc("mark_order_notified", {
      _order_number: header.order_number,
      _email: header.email,
      _ok: ok,
      _error: error ?? null,
    });
  } catch {
    /* non-critical */
  }
}
