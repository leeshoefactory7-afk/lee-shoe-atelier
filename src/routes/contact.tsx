import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { SITE } from "@/lib/site-config";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MessageCircle, MapPin, Clock, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Lee Shoe Factory · Get in touch with our team" },
      { name: "description", content: "Reach the Lee Shoe Factory sales, wholesale and manufacturing partnerships team. We respond within 24 hours." },
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

  const contactChannels = [
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: SITE.whatsapp, href: `https://wa.me/${SITE.whatsapp.replace(/\D/g, '')}` },
    { icon: MapPin, label: "Address", value: SITE.address, href: "#" },
  ];

  return (
    <StaticPage
      title="Contact"
      tagline="We're listening"
      cover="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          Whether you have a question about our products, want to explore wholesale partnerships, or have feedback about your experience—we'd love to hear from you. Our team typically responds within 24 hours.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-4 not-prose mb-12"
      >
        {contactChannels.map((channel, i) => (
          <motion.a
            key={i}
            href={channel.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="border border-border p-6 rounded-lg hover:border-accent hover:bg-accent/5 transition-all group"
          >
            <channel.icon className="size-6 text-accent mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">{channel.label}</div>
            <div className="mt-3 text-sm font-medium hover:text-accent transition-colors">{channel.value}</div>
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 text-sm text-muted-foreground mb-12"
      >
        <Clock className="size-4 text-accent" />
        <span>{SITE.hours}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="grid lg:grid-cols-2 gap-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Send us a message</h2>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Field name="name" label="Name" required />
              <Field name="email" type="email" label="Email" required />
            </div>
            <Field name="company" label="Company (optional)" />
            <Field name="subject" label="Subject" required />
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">Message</span>
              <textarea
                name="message"
                rows={5}
                required
                className="mt-3 w-full border border-input bg-background px-4 py-3 focus:outline-none focus:border-accent rounded"
              />
            </label>
            <motion.button
              disabled={busy}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-wide hover:bg-primary/90 disabled:opacity-60 transition-all rounded flex items-center justify-center gap-2 font-medium"
            >
              <Send className="size-4" />
              {busy ? "Sending…" : "Send message"}
            </motion.button>
          </form>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-serif text-2xl mb-4">Sales inquiries</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For product questions, bulk orders, and direct-to-consumer inquiries:
            </p>
            <a href={`mailto:info@leeshoefactory.com`} className="text-accent hover:underline font-medium">
              info@leeshoefactory.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-serif text-2xl mb-4">Wholesale & partnerships</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Interested in private label, OEM, or wholesale distribution:
            </p>
            <a href={`mailto:info@leeshoefactory.com`} className="text-accent hover:underline font-medium">
              info@leeshoefactory.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-serif text-2xl mb-4">Press & media</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For media inquiries and press kit requests:
            </p>
            <a href={`mailto:info@leeshoefactory.com`} className="text-accent hover:underline font-medium">
              info@leeshoefactory.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-muted/50 border border-border p-6 rounded-lg"
          >
            <h3 className="font-serif text-lg mb-3">Response times</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• General inquiries: 24 hours</li>
              <li>• Wholesale inquiries: 48 hours</li>
              <li>• Press requests: 4 business hours</li>
              <li>• Customer support: 12 hours</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </StaticPage>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">{label}</span>
      <input
        {...rest}
        className="mt-3 w-full border border-input bg-background px-4 py-3 focus:outline-none focus:border-accent rounded transition-colors"
      />
    </label>
  );
}
