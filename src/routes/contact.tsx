import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";
import { SITE } from "@/lib/site-config";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Lee Shoe Factory · Get in touch with our team" },
      { name: "description", content: "Reach the Lee Shoe Factory sales, wholesale and manufacturing partnerships team." },
      { property: "og:title", content: "Contact Lee Shoe Factory" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [busy, setBusy] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      await fetch(SITE.formsubmitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: "Lee · New contact inquiry", ...payload }),
      });
      toast.success("Message sent — we'll reply within 24h");
      e.currentTarget.reset();
    } catch { toast.error("Failed to send"); } finally { setBusy(false); }
  }
  return (
    <StaticPage title="Contact" tagline="We're listening" cover="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1600&q=80">
      <div className="grid md:grid-cols-3 gap-4 not-prose">
        <Info icon={Mail} label="Email" value={SITE.email} />
        <Info icon={MessageCircle} label="WhatsApp" value={SITE.whatsapp} />
        <Info icon={MapPin} label="Address" value={SITE.address} />
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="size-4 text-accent" /> {SITE.hours}</div>
      <form onSubmit={onSubmit} className="mt-10 grid md:grid-cols-2 gap-4">
        <Field name="name" label="Name" required />
        <Field name="email" type="email" label="Email" required />
        <Field name="company" label="Company (optional)" />
        <Field name="subject" label="Subject" required />
        <label className="md:col-span-2 block text-sm">
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Message</span>
          <textarea name="message" rows={5} required className="mt-1 w-full border border-input bg-background px-3 py-2.5 focus:outline-none focus:border-accent" />
        </label>
        <button disabled={busy} className="md:col-span-2 bg-primary text-primary-foreground py-4 text-sm tracking-wide hover:bg-primary/90 disabled:opacity-60">
          {busy ? "Sending…" : "Send message"}
        </button>
      </form>
    </StaticPage>
  );
}

function Info({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="border border-border p-4">
      <Icon className="size-4 text-accent" />
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">{label}</div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  );
}
function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1 w-full border border-input bg-background px-3 py-2.5 focus:outline-none focus:border-accent" />
    </label>
  );
}
