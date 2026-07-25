import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { Zap, Package, Award, Clock } from "lucide-react";

export const Route = createFileRoute("/oem")({
  head: () => ({
    meta: [
      { title: "OEM Manufacturing · Lee Shoe Factory" },
      { name: "description", content: "Original Equipment Manufacturer services. Custom footwear production with your specifications and branding." },
      { property: "og:title", content: "OEM Manufacturing · Lee Shoe Factory" },
      { property: "og:url", content: "/oem" },
    ],
    links: [{ rel: "canonical", href: "/oem" }],
  }),
  component: () => (
    <StaticPage
      title="OEM Manufacturing"
      tagline="Build your brand with us"
      cover="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          We manufacture footwear to your exact specifications. You provide the design, we handle the production, quality control, and logistics.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">What is OEM?</h2>
          <p className="text-lg leading-relaxed mb-6 text-muted-foreground">
            Original Equipment Manufacturing (OEM) means we produce footwear designed and branded by you. You maintain complete control over specifications, materials, and branding while we handle manufacturing, quality assurance, and delivery.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: "Your Design",
                desc: "Provide tech-packs, lasts, or samples. We'll manufacture to your exact specifications."
              },
              {
                icon: Award,
                title: "Your Brand",
                desc: "All finished shoes are branded with your logo, packaging, and labeling."
              },
              {
                icon: Clock,
                title: "Fast Turnaround",
                desc: "45–90 day production lead times depending on complexity and volume."
              },
              {
                icon: Package,
                title: "Direct Shipping",
                desc: "DDP freight to your location or warehouses in 60+ countries."
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
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Our OEM Process</h2>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Design Consultation",
                desc: "Submit your design brief, tech-pack, or samples. We'll assess feasibility and provide feedback."
              },
              {
                step: "02",
                title: "Sample Development",
                desc: "We create prototypes from your specifications (14-day turnaround). Revisions until you approve."
              },
              {
                step: "03",
                title: "Production Setup",
                desc: "Once approved, we set up production lines, order materials, and prepare tooling."
              },
              {
                step: "04",
                title: "Manufacturing",
                desc: "Full-scale production with 47-point quality inspections at every stage."
              },
              {
                step: "05",
                title: "Quality Control",
                desc: "Final inspection, packaging with your branding, and preparation for shipment."
              },
              {
                step: "06",
                title: "Delivery",
                desc: "DDP freight to your location with full tracking and documentation."
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
          <h2 className="font-serif text-3xl md:text-4xl mb-8">OEM Pricing & Terms</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-muted/50 border border-border p-6 rounded-lg"
            >
              <h3 className="font-serif text-2xl mb-4">Minimums</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>300 pairs minimum</strong> per style</li>
                <li>• Mixed colors/sizes count toward minimum</li>
                <li>• Multiple styles can be ordered simultaneously</li>
                <li>• No maximum order size</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-muted/50 border border-border p-6 rounded-lg"
            >
              <h3 className="font-serif text-2xl mb-4">Pricing</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Cost depends on material, construction method, and volume</li>
                <li>• Typical range: $25–$85 per pair (production cost)</li>
                <li>• Samples: $50–$150 per pair (one-time)</li>
                <li>• Request quote for exact pricing</li>
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg"
        >
          <h3 className="font-serif text-2xl mb-4">Ready to get started?</h3>
          <p className="mb-6 leading-relaxed">
            Contact our OEM team to discuss your project. We'll provide a detailed quote and timeline based on your specifications.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors rounded">
            Request OEM Quote
          </a>
        </motion.div>
      </motion.div>
    </StaticPage>
  ),
});
