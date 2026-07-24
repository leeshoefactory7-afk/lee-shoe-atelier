import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SITE } from "./site-config";

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
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("newsletter_subscribers").upsert({ email: data.email }, { onConflict: "email" });
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
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert({
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
