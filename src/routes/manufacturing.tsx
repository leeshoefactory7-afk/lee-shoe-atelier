import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { title: "Manufacturing · Lee Shoe Factory" },
      { name: "description", content: "Three purpose-built halls totalling 42,000 m², producing up to 8,000 pairs per day. We handle full-package OEM, private label and ODM orders for global brands." },
      { property: "og:title", content: "Manufacturing · Lee Shoe Factory" },
      { property: "og:url", content: "/manufacturing" },
    ],
    links: [{ rel: "canonical", href: "/manufacturing" }],
  }),
  component: () => (
    <StaticPage
      title="Manufacturing"
      tagline="Craftsmanship at industrial scale"
      cover="https://images.unsplash.com/photo-1578062298140-e6fbddc0cc1c?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          Three purpose-built halls, 42,000 m² of optimized production space, and a daily capacity that reaches 8,000 pairs. We've built more than a factory—we've engineered a symphony of human skill and precision machinery.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12"
      >
        <AnimatedCounter value="42000" label="Square meters" />
        <AnimatedCounter value="8000" label="Pairs daily" />
        <AnimatedCounter value="15" label="Production lines" />
        <AnimatedCounter value="300" label="Min order" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="space-y-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">What we produce</h2>
          <p className="text-lg leading-relaxed mb-6">
            We handle full-package OEM, private label, and ODM orders for global brands. Whether you need 300 pairs of a single style or 50,000 mixed orders, our infrastructure scales. Custom leathers, custom soles, custom lasts—with lead times as tight as 45 days from tech-pack to freight-ready.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted/50 p-6 rounded-lg border border-border">
              <h3 className="font-serif text-xl mb-3">Construction Methods</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Goodyear-welt (premium hand-stitched)</li>
                <li>✓ Cemented (flexible lightweight)</li>
                <li>✓ Vulcanized (durable athletic)</li>
                <li>✓ Direct-attach (modern comfort)</li>
              </ul>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg border border-border">
              <h3 className="font-serif text-xl mb-3">Material Capabilities</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Full-grain, suede, nubuck leather</li>
                <li>✓ Vegan leather alternatives</li>
                <li>✓ Specialized technical fabrics</li>
                <li>✓ Heritage canvas and cordura</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">The production journey</h2>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Pattern & Last Engineering",
                desc: "Our in-house last-making team creates custom lasts from your tech-pack. We can produce precision lasts in 5–7 days, including multiple toe and heel variations for fit optimization."
              },
              {
                step: "02",
                title: "Material Cutting",
                desc: "Leather is graded, sorted, and cut using CAD-optimized patterns. Our automated cutting systems reduce waste to 12%—industry standard is 18%. Every hide is hand-inspected pre-cutting."
              },
              {
                step: "03",
                title: "Upper Construction",
                desc: "Component parts are stitched, glued, and assembled into uppers. We use both computerized and hand-stitching depending on design requirements. Goodyear-welt uppers hand-stitched by our master craftspeople."
              },
              {
                step: "04",
                title: "Sole & Bottom Assembly",
                desc: "Soles are attached using your specified method. Our tooling includes rubber, EVA, PU, and TPR compounds. Heel stacking, sole stitching, and finishing—all executed with tolerance control of ±0.5mm."
              },
              {
                step: "05",
                title: "Final Finishing",
                desc: "Shoes are cleaned, conditioned, polished, and inspected against our 47-point checklist. Defects trigger full disassembly and rework. Quality is non-negotiable."
              },
              {
                step: "06",
                title: "Packaging & Logistics",
                desc: "Shoes are boxed, palleted, and staged for DDP freight. We offer consolidation services and can handle mixed shipments across multiple clients."
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
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Quality & certification</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We maintain <strong>BSCI audit compliance</strong> (Business Social Compliance Initiative) and hold <strong>ISO 9001:2015</strong> certification. Beyond standards, we've built a culture of craft—every defect triggers investigation and process improvement.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our 47-point quality inspection isn't a checkbox. It's a philosophy that shoes leaving our factory should outlast their owners.
              </p>
            </div>
            <div className="bg-accent/5 border border-accent/10 p-6 rounded-lg">
              <h3 className="font-serif text-lg mb-4">Compliance Standards</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  <span><strong>BSCI</strong> - Worker welfare & ethical manufacturing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  <span><strong>ISO 9001:2015</strong> - Quality management systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  <span><strong>Lead testing</strong> - CPSIA compliance for export</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  <span><strong>Fire resistance</strong> - FMVSS 1201 & 1202</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg">
          <h3 className="font-serif text-2xl mb-4">Ready to partner?</h3>
          <p className="mb-4 leading-relaxed">
            MOQ from 300 pairs per style. Sample lead time: 14 days. Production lead time: 45–90 days depending on complexity and volume.
          </p>
          <p className="text-primary-foreground/90">
            We've built partnerships with some of the world's most discerning brands. Let's talk about what you need.
          </p>
        </div>
      </motion.div>
    </StaticPage>
  ),
});
