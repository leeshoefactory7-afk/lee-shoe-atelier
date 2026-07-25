import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { Leaf, Droplets, Zap, Recycle } from "lucide-react";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability · Lee Shoe Factory" },
      { name: "description", content: "We measure our footprint annually and target net-zero manufacturing by 2035. Environmental commitment through vegetable-tanned leathers, water recycling, and renewable energy." },
      { property: "og:title", content: "Sustainability · Lee Shoe Factory" },
      { property: "og:url", content: "/sustainability" },
    ],
    links: [{ rel: "canonical", href: "/sustainability" }],
  }),
  component: () => (
    <StaticPage
      title="Sustainability"
      tagline="Made to last, made responsibly"
      cover="https://images.unsplash.com/photo-1559027615-cd2628902d4a?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          We measure our footprint annually and target net-zero manufacturing by 2035. These aren't marketing promises—they're commitments backed by audited data and driven by the simple belief that a business should leave the world better than it found it.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Our environmental strategy</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Leaf,
                title: "Materials",
                points: [
                  "100% vegetable-tanned leather from LWG-certified tanneries",
                  "Eliminates synthetic dyes and heavy-metal mordants",
                  "Biodegradable leather components at end-of-life",
                  "Vegan leather alternatives using recycled polymers"
                ]
              },
              {
                icon: Droplets,
                title: "Water",
                points: [
                  "Closed-loop dye system recovers 94% of water",
                  "Rainwater harvesting for non-production use",
                  "Wastewater treatment to <5mg/L contaminant levels",
                  "Target: 2.8 liters per pair by 2030 (currently 4.1L)"
                ]
              },
              {
                icon: Zap,
                title: "Energy",
                points: [
                  "3.5 MW solar installation covers 38% of annual usage",
                  "LED lighting throughout production halls",
                  "Geothermal heating system for climate control",
                  "Target: 100% renewable energy by 2035"
                ]
              },
              {
                icon: Recycle,
                title: "Waste",
                points: [
                  "Leather waste converted to biofuel or pulp board",
                  "Thread and textile scraps recycled into insulation",
                  "Packaging 100% recyclable or compostable",
                  "Landfill diversion target: 99% by 2030"
                ]
              }
            ].map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-muted/50 border border-border p-8 rounded-lg"
              >
                <section.icon className="size-8 text-accent mb-4" />
                <h3 className="font-serif text-2xl mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.points.map((point, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-3">
                      <span className="text-accent font-bold mt-1">›</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-accent/5 border border-accent/10 p-8 md:p-12 rounded-lg">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">The lifecycle</h2>
          <p className="text-lg leading-relaxed mb-8">
            We measure environmental impact across every phase: sourcing, manufacturing, shipping, and end-of-life. This holistic approach means continuous improvement in areas you'd never see.
          </p>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { phase: "Sourcing", impact: "28% of footprint", action: "LWG tanneries, ethical suppliers" },
              { phase: "Manufacturing", impact: "42% of footprint", action: "Renewable energy, closed-loop water" },
              { phase: "Logistics", impact: "22% of footprint", action: "DDP shipping consolidation" },
              { phase: "End-of-life", impact: "8% of footprint", action: "Design for disassembly & recycling" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-serif text-accent mb-2">{item.impact}</div>
                <div className="font-medium mb-2">{item.phase}</div>
                <div className="text-xs text-muted-foreground">{item.action}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">What it takes</h2>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-serif text-xl mb-3">The investment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Vegetable-tanned leather costs 40–60% more than chrome-tanned alternatives. Closed-loop water systems required a €1.2M capital investment. Solar installation: €900K. Every efficiency gain costs money upfront and returns value in durability and brand integrity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-serif text-xl mb-3">The transparency</h3>
              <p className="text-muted-foreground leading-relaxed">
                We publish our annual sustainability report with third-party verification. Scope 1 (direct emissions), Scope 2 (purchased energy), and Scope 3 (supply chain) are all measured and disclosed. Our data isn't perfect—but it's real.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-serif text-xl mb-3">The compromise</h3>
              <p className="text-muted-foreground leading-relaxed">
                We won't hit net-zero by cutting quality or moving production to lower-cost regions. If environmental responsibility means layoffs or degraded product, we've failed. We grow margins through efficiency and innovation—not shortcutting.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg"
        >
          <h3 className="font-serif text-2xl mb-4">Our 2035 roadmap</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="font-bold text-primary-foreground/70 min-w-fit">2025</span>
              <span>100% renewable energy across manufacturing halls</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-primary-foreground/70 min-w-fit">2027</span>
              <span>Eliminate all synthetic dyes; transition to natural mordants</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-primary-foreground/70 min-w-fit">2028</span>
              <span>Achieve carbon-neutral shipping across all routes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-primary-foreground/70 min-w-fit">2030</span>
              <span>Reduce water usage to 2.8L per pair</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-primary-foreground/70 min-w-fit">2035</span>
              <span>Achieve net-zero manufacturing operations</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </StaticPage>
  ),
});
