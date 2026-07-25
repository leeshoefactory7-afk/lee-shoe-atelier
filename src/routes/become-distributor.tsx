import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { Globe, TrendingUp, Users, Award } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/become-distributor")({
  head: () => ({
    meta: [
      { title: "Become a Distributor · Lee Shoe Factory" },
      { name: "description", content: "Become an authorized distributor of Lee shoes in your territory. Exclusive rights, premium support, and wholesale pricing." },
      { property: "og:title", content: "Become a Distributor · Lee Shoe Factory" },
      { property: "og:url", content: "/become-distributor" },
    ],
    links: [{ rel: "canonical", href: "/become-distributor" }],
  }),
  component: () => (
    <StaticPage
      title="Become a Distributor"
      tagline="Join our global network"
      cover="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          Become the official distributor of Lee shoes in your region. Exclusive territory rights, premium wholesale pricing, and dedicated support.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Why Become a Distributor?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Globe, title: "Exclusive Territory", desc: "Be the sole distributor of Lee shoes in your region" },
              { icon: TrendingUp, title: "Growth Potential", desc: "Strong brand recognition and premium positioning drives sales" },
              { icon: Users, title: "Support Network", desc: "Training, marketing materials, and dedicated support team" },
              { icon: Award, title: "Premium Margins", desc: "Distributor-level pricing with healthy profit margins" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-muted/50 border border-border p-6 rounded-lg"
              >
                <item.icon className="size-8 text-accent mb-3" />
                <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Distributor Requirements</h2>
          <div className="space-y-6">
            {[
              {
                title: "Territory & Market",
                items: ["Defined territory (country or region)", "Established retail relationships", "Minimum initial order: 5,000 pairs", "Commitment to yearly growth"]
              },
              {
                title: "Business Infrastructure",
                items: ["Warehouse capacity", "Shipping/logistics capability", "B2B sales experience", "Financial stability & credit"]
              },
              {
                title: "Marketing & Promotion",
                items: ["Local marketing campaigns", "Retail training & support", "Digital presence", "Participate in trade shows"]
              },
              {
                title: "Customer Service",
                items: ["Dedicated account managers", "Local customer support", "Warranty administration", "Return/defect handling"]
              }
            ].map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-l-4 border-accent pl-6"
              >
                <h3 className="font-serif text-2xl mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-muted-foreground flex items-center gap-2">
                      <span className="text-accent font-bold">→</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Distributor Benefits</h2>
          <div className="bg-accent/5 border border-accent/10 p-8 md:p-12 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Pricing", desc: "50–65% off retail depending on volume" },
                { title: "Payment Terms", desc: "Net 30 after 3 successful orders" },
                { title: "Territory Rights", desc: "Exclusive distribution rights in your region" },
                { title: "Inventory Support", desc: "Consignment options available" },
                { title: "Training", desc: "Product knowledge & sales training" },
                { title: "Marketing", desc: "Co-op advertising and promotional materials" },
                { title: "Dedicated Support", desc: "Direct access to distributor manager" },
                { title: "Sample Priority", desc: "Priority access to new collections" }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <h4 className="font-serif font-bold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <DistributorForm />
      </motion.div>
    </StaticPage>
  ),
});

function DistributorForm() {
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
        body: JSON.stringify({ _subject: "Lee · Distributor Application", ...payload }),
      });
      toast.success("Application submitted — we'll review within 48 hours");
      e.currentTarget.reset();
    } catch {
      toast.error("Failed to submit. Please email wholesale@leeshoefactory.com");
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
      <h3 className="font-serif text-3xl md:text-4xl mb-2">Apply to Become a Distributor</h3>
      <p className="mb-8 text-primary-foreground/90 leading-relaxed max-w-2xl">
        Fill out the form below and our distributor team will review your application. We'll contact you within 48 hours to discuss opportunities in your region.
      </p>

      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-6 max-w-2xl">
        <input type="text" name="company_name" placeholder="Company Name" required className="px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded" />
        <input type="text" name="contact_name" placeholder="Your Name" required className="px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded" />
        <input type="email" name="email" placeholder="Email" required className="px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded" />
        <input type="tel" name="phone" placeholder="Phone" className="px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded" />
        <input type="text" name="country" placeholder="Country/Region" required className="px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded" />
        <input type="text" name="retail_experience" placeholder="Years in Retail/Distribution" className="px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded" />
        <textarea name="business_summary" placeholder="Tell us about your business and why you want to distribute Lee shoes" rows={4} className="md:col-span-2 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 rounded" />
        <motion.button disabled={busy} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="md:col-span-2 px-6 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 disabled:opacity-60 transition-all rounded">
          {busy ? "Submitting…" : "Submit Application"}
        </motion.button>
      </form>
    </motion.div>
  );
}
