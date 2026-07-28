import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { Globe, DollarSign, Users, Zap, CheckCircle, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale · Lee Shoe Factory" },
      { name: "description", content: "Join 480+ department stores and retailers stocking Lee across 60 countries. Wholesale pricing, exclusive territories, and dedicated support." },
      { property: "og:title", content: "Wholesale · Lee Shoe Factory" },
      { property: "og:url", content: "/wholesale" },
    ],
    links: [{ rel: "canonical", href: "/wholesale" }],
  }),
  component: () => (
    <StaticPage
      title="Wholesale"
      tagline="Factory-direct pricing for retail partners"
      cover="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          480+ retailers across 60 countries stock Lee because our margins work, our quality is uncompromising, and our partnership model treats you like a partner—not a transaction.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Why partner with Lee</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: DollarSign, title: "Margins that work", desc: "45–65% discount off retail depending on volume. Direct from factory means no middleman markup." },
              { icon: Globe, title: "Global reach", desc: "Export to 60+ countries. DDP shipping, customs clearance, consolidated freight handling." },
              { icon: Users, title: "Dedicated support", desc: "Assigned account manager. Direct line to production for rush orders and custom requests." },
              { icon: Zap, title: "Fast lead times", desc: "45–90 days production. Reorder samples in 2 weeks. Emergency expedites available." },
              { icon: TrendingUp, title: "Consistent demand", desc: "Shoes made to last decades attract repeat customers and strong resale value." },
              { icon: CheckCircle, title: "Quality promise", desc: "47-point QC inspection. 12-month warranty. Zero compromise on craftsmanship." }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-muted/50 border border-border p-6 rounded-lg"
              >
                <benefit.icon className="size-6 text-accent mb-3" />
                <h3 className="font-serif text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">What we offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-serif text-2xl mb-4">Pricing tiers</h3>
                <div className="space-y-4 text-sm">
                  {[
                    { vol: "300–500 pairs/order", disc: "45% off retail", term: "Net 30" },
                    { vol: "500–2,000 pairs/order", disc: "55% off retail", term: "Net 45" },
                    { vol: "2,000+ pairs/order", disc: "65% off retail", term: "Net 60" },
                    { vol: "Seasonal allocation", disc: "Best pricing", term: "Negotiable" }
                  ].map((tier, i) => (
                    <div key={i} className="flex justify-between items-center pb-3 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{tier.vol}</span>
                      <div className="text-right">
                        <div className="font-bold text-accent">{tier.disc}</div>
                        <div className="text-xs text-muted-foreground">{tier.term}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-serif text-2xl mb-4">Key benefits</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    "4 seasonal collections per year + evergreen core",
                    "Priority order allocation during high-demand periods",
                    "Exclusive territory options for qualifying retailers",
                    "High-resolution product imagery & marketing assets",
                    "Product data feeds (sizes, materials, care instructions)",
                    "Drop-shipping available for e-commerce partners",
                    "Co-marketing support and social media assets",
                    "Sample access for merchandise planning"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="size-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Our partner types</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                type: "Department Stores",
                examples: "Mid-to-high-end multibrand retail",
                minOrder: "1,000+ pairs",
                benefits: ["Exclusive floor display", "Co-op marketing", "Buyer support"]
              },
              {
                type: "Boutiques & Concept Stores",
                examples: "Independent or small chains",
                minOrder: "300+ pairs",
                benefits: ["Premium positioning", "Flexible ordering", "Trend forecasting"]
              },
              {
                type: "E-commerce & Online",
                examples: "Direct-to-consumer or marketplace",
                minOrder: "500+ pairs",
                benefits: ["Drop-shipping", "Product feeds", "Marketing assets"]
              }
            ].map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-border p-6 rounded-lg hover:border-accent/50 transition-colors"
              >
                <h3 className="font-serif text-lg mb-2">{partner.type}</h3>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium mb-4">{partner.examples}</p>
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">Min. order</div>
                  <p className="text-sm font-medium text-accent">{partner.minOrder}</p>
                </div>
                <ul className="space-y-2">
                  {partner.benefits.map((benefit, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="text-accent">→</span> {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-accent/5 border border-accent/10 p-8 md:p-12 rounded-lg"
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-6">How to get started</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Apply", desc: "Fill out our wholesale application form." },
              { step: "02", title: "Review", desc: "We evaluate your retail model and market fit." },
              { step: "03", title: "Sample", desc: "Send samples. Test with your customers." },
              { step: "04", title: "Order", desc: "Place your first bulk order and grow from there." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-serif font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <WholeApplyForm />
      </motion.div>
    </StaticPage>
  ),
});

function WholeApplyForm() {
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
        body: JSON.stringify({ _subject: "Lee · Wholesale Application", ...payload }),
      });
      toast.success("Application submitted — we'll review within 48 hours");
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
      className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg"
    >
      <h3 className="font-serif text-3xl md:text-4xl mb-2">Ready to partner?</h3>
      <p className="mb-8 text-primary-foreground/90 leading-relaxed max-w-2xl">
        Fill out the form below or email us directly at info@leeshoefactory.com. We'll connect within 48 hours.
      </p>

      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-6 max-w-2xl">
        <input
          type="text"
          name="store_name"
          placeholder="Store name"
          required
          className="px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded"
        />
        <input
          type="text"
          name="contact_name"
          placeholder="Your name"
          required
          className="px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          required
          className="px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded"
        />
        <select
          name="retailType"
          required
          className="px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded"
        >
          <option value="">Select retail type</option>
          <option value="department">Department Store</option>
          <option value="boutique">Boutique</option>
          <option value="ecommerce">E-commerce</option>
          <option value="other">Other</option>
        </select>
        <textarea
          name="message"
          placeholder="Tell us about your business"
          rows={4}
          className="md:col-span-2 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded"
        />
        <motion.button
          disabled={busy}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="md:col-span-2 px-6 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 disabled:opacity-60 transition-all rounded"
        >
          {busy ? "Submitting…" : "Submit application"}
        </motion.button>
      </form>
    </motion.div>
  );
}
