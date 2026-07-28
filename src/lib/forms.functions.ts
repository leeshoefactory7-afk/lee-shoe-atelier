import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
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

async function submitFormsubmit(subject: string, payload: Record<string, unknown>) {
  try {
    await fetch(SITE.formsubmitUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, ...payload }),
    });
  } catch {
    // Ignore FormSubmit failures — data is already persisted.
  }
}

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((d: { email: string }) => z.object({ email: z.string().email() }).parse(d))
  .handler(async ({ data }) => {
    const supabase = createPublicClient();
    // Public INSERT policy exists; ignore duplicate errors.
    await supabase.from("newsletter_subscribers").insert({ email: data.email });
    await submitFormsubmit("New Lee newsletter subscriber", { email: data.email });
    return { ok: true };
  });

const contactSchema = z.object({
  kind: z.enum(["contact", "bulk", "distributor", "quote"]).default("contact"),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  company: z.string().trim().max(160).optional().default(""),
  country: z.string().trim().max(80).optional().default(""),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1).max(4000),
  meta: z.record(z.string(), z.any()).optional(),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    const supabase = createPublicClient();
    const { error } = await supabase.from("contact_messages").insert({
      kind: data.kind,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      country: data.country || null,
      subject: data.subject || null,
      message: data.message,
      meta: data.meta ?? null,
    });
    if (error) throw new Error(error.message);
    await submitFormsubmit(`Lee · ${data.kind} · ${data.name}`, data);
    return { ok: true };
  });
