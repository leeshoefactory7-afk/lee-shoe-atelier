import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { useState } from "react";
import { toast } from "sonner";
import { SITE } from "@/lib/site-config";


export const Route = createFileRoute("/request-quote")({
  head: () => ({
    meta: [
      { title: "Request a Quote · Lee Shoe Factory" },
      { name: "description", content: "Get a detailed quote for OEM, private label, wholesale, or bulk orders." },
      { property: "og:title", content: "Request a Quote · Lee Shoe Factory" },
      { property: "og:url", content: "/request-quote" },
    ],
    links: [{ rel: "canonical", href: "/request-quote" }],
  }),
  component: () => (
    <StaticPage
      title="Request a Quote"
      tagline="Let's talk numbers"
      cover="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          Submit your project details and receive a customized quote within 48 hours. No hidden fees, no surprises.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        <QuoteForm />

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">What We Need to Know</h2>
          <div className="space-y-6">
            {[
              {
                title: "Project Type",
                desc: "Are you interested in OEM manufacturing, private label, wholesale, or bulk orders? Each has different requirements and pricing."
              },
              {
                title: "Order Volume",
                desc: "How many pairs are you looking to order? MOQ is 300 pairs. Volume significantly affects pricing."
              },
              {
                title: "Design/Style",
                desc: "Are you using our existing designs or providing your own? Do you have a tech-pack, sketches, or samples?"
              },
              {
                title: "Materials & Construction",
                desc: "What materials do you prefer (leather type, sole material)? What construction method (Goodyear-welt, cemented, etc.)?"
              },
              {
                title: "Branding & Customization",
                desc: "Do you need private labeling, custom packaging, embroidery, or other customization?"
              },
              {
                title: "Timeline",
                desc: "When do you need the shoes? Sample lead time is 14 days, production is 45–90 days."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-l-4 border-accent pl-6"
              >
                <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-accent/5 border border-accent/10 p-8 md:p-12 rounded-lg">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Quote Includes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Manufacturing cost per unit",
              "Total project cost breakdown",
              "Sample lead time",
              "Production lead time",
              "Shipping & logistics",
              "Payment terms & options",
              "Quality assurance details",
              "Customization costs (if applicable)"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="text-accent font-bold text-lg">✓</span>
                <span className="text-muted-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg">
          <h3 className="font-serif text-2xl mb-4">Questions Before Submitting?</h3>
          <p className="mb-6 leading-relaxed">
            Don't hesitate to reach out. Our sales team is happy to discuss your project before you fill out a formal quote request.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors rounded">
            Contact Us First
          </a>
        </div>
      </motion.div>
    </StaticPage>
  ),
});

function QuoteForm() {
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      await fetch("https://formspree.io/f/xyzabcd123", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: "Lee · Quote Request", ...payload }),
      });
      toast.success("Quote request submitted — we'll follow up within 48 hours");
      e.currentTarget.reset();
    } catch {
      toast.error("Failed to submit. Please email info@leeshoefactory.com");
    } finally {
      setBusy(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-white border border-border p-8 md:p-12 rounded-xl"
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-2">Get Your Quote</h2>
      <p className="text-muted-foreground mb-8">Complete this form to receive a detailed quote for your project.</p>

      <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Company Name *</label>
            <input type="text" name="company_name" required className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:border-accent" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Contact Name *</label>
            <input type="text" name="contact_name" required className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:border-accent" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input type="email" name="email" required className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:border-accent" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input type="tel" name="phone" className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:border-accent" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Country *</label>
          <input type="text" name="country" required className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:border-accent" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Project Type *</label>
          <select name="project_type" required className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:border-accent">
            <option value="">Select type</option>
            <option value="oem">OEM Manufacturing</option>
            <option value="private-label">Private Label</option>
            <option value="wholesale">Wholesale</option>
            <option value="bulk-orders">Bulk Orders</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Order Volume (pairs) *</label>
          <input type="number" name="order_volume" placeholder="Minimum 300 pairs" min="300" required className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:border-accent" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Design Approach *</label>
          <div className="space-y-2">
            {["Our existing designs", "Your custom design", "Your tech-pack", "Samples provided"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input type="radio" name="design_approach" value={option} required className="w-4 h-4" />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Materials & Construction</label>
          <textarea name="materials" placeholder="Leather type, sole material, construction method, etc." rows={3} className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:border-accent" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Special Requirements</label>
          <textarea name="special_requirements" placeholder="Private labeling, custom packaging, embroidery, timeline, etc." rows={3} className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:border-accent" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Ideal Timeline</label>
          <input type="text" name="timeline" placeholder="e.g., Samples by June, production by August" className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:border-accent" />
        </div>

        <motion.button
          disabled={busy}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-60 transition-all rounded-lg"
        >
          {busy ? "Submitting…" : "Request Quote"}
        </motion.button>

        <p className="text-xs text-muted-foreground text-center">
          By submitting this form, you agree to be contacted by our sales team regarding your quote request.
        </p>
      </form>
    </motion.div>
  );
}
