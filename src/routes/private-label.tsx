import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { Palette, Settings, TrendingUp, Shield } from "lucide-react";

export const Route = createFileRoute("/private-label")({
  head: () => ({
    meta: [
      { title: "Private Label · Lee Shoe Factory" },
      { name: "description", content: "Build your private label footwear brand. Choose from existing designs or create custom collections." },
      { property: "og:title", content: "Private Label · Lee Shoe Factory" },
      { property: "og:url", content: "/private-label" },
    ],
    links: [{ rel: "canonical", href: "/private-label" }],
  }),
  component: () => (
    <StaticPage
      title="Private Label"
      tagline="Your shoes, our expertise"
      cover="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          Launch your footwear brand without the manufacturing complexity. Choose from our proven designs, customize with your branding, and we handle the rest.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Why Private Label?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Palette,
                title: "Design Flexibility",
                desc: "Choose from 50+ existing styles or customize colors, materials, and finishes."
              },
              {
                icon: Settings,
                title: "Full Customization",
                desc: "Add your logo, embroidery, special packaging, and labels."
              },
              {
                icon: TrendingUp,
                title: "Lower MOQs",
                desc: "Start with just 300 pairs per style. Build your brand gradually."
              },
              {
                icon: Shield,
                title: "Quality Guaranteed",
                desc: "Same 47-point QC inspection as our retail collections."
              }
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
          <h2 className="font-serif text-3xl md:text-4xl mb-8">How Private Label Works</h2>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Browse Our Catalog",
                desc: "Review our 50+ proven designs across dress, casual, and athletic categories."
              },
              {
                step: "02",
                title: "Select Your Styles",
                desc: "Choose which designs you want to carry under your private label."
              },
              {
                step: "03",
                title: "Customize",
                desc: "Select materials, colors, sizing, packaging design, and add your branding."
              },
              {
                step: "04",
                title: "Approve Samples",
                desc: "We send prototypes for your approval before production begins."
              },
              {
                step: "05",
                title: "Place Your Order",
                desc: "Minimum 300 pairs per style. We handle all production and quality control."
              },
              {
                step: "06",
                title: "Receive & Sell",
                desc: "Your branded shoes arrive ready to go. You focus on selling."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 border border-accent/30">
                    <span className="font-serif font-bold text-accent text-sm">{item.step}</span>
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Pricing & Terms</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-muted/50 border border-border p-6 rounded-lg"
            >
              <h3 className="font-serif text-2xl mb-4">Minimums & Lead Times</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>MOQ: 300 pairs</strong> per style</li>
                <li>• <strong>Sample lead time: 7 days</strong></li>
                <li>• <strong>Production: 45–60 days</strong></li>
                <li>• Reorders process faster</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-muted/50 border border-border p-6 rounded-lg"
            >
              <h3 className="font-serif text-2xl mb-4">Cost Range</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>Base design cost: $25–$60</strong> per pair</li>
                <li>• Customization adds 10–20%</li>
                <li>• Packaging/branding: $2–$5 per pair</li>
                <li>• Request quote for exact pricing</li>
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="bg-accent/5 border border-accent/10 p-8 md:p-12 rounded-lg">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Success Stories</h2>
          <p className="text-lg leading-relaxed mb-6">
            Over 480+ retailers worldwide have launched successful private label brands with Lee. From boutique startups to established multi-brand retailers, our partners leverage our expertise to create premium footwear collections that stand out.
          </p>
          <p className="text-muted-foreground">
            Average private label partners see repeat orders within 6 months. Many expand to 5–10 styles within 12 months of launch.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg"
        >
          <h3 className="font-serif text-2xl mb-4">Launch Your Private Label</h3>
          <p className="mb-6 leading-relaxed">
            Let's discuss your brand vision. We'll send you our catalog, design options, and help you plan your first collection.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors rounded">
            Start Your Private Label
          </a>
        </motion.div>
      </motion.div>
    </StaticPage>
  ),
});
