import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/materials")({
  head: () => ({
    meta: [
      { title: "Materials · Lee Shoe Factory" },
      { name: "description", content: "Full-grain leathers from LWG-certified tanneries in Italy and Turkey. Premium rubber compounds, cotton laces, and hardware from trusted suppliers worldwide." },
      { property: "og:title", content: "Materials · Lee Shoe Factory" },
      { property: "og:url", content: "/materials" },
    ],
    links: [{ rel: "canonical", href: "/materials" }],
  }),
  component: () => (
    <StaticPage
      title="Materials"
      tagline="Sourced with intent"
      cover="https://images.unsplash.com/photo-1604987556577-48e91f4b8f55?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          Every component that goes into a Lee shoe is chosen with the same rigor: durability first, ethics always, innovation when it serves the wearer. We partner with suppliers who've been perfecting their craft for decades.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Leather</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-serif text-2xl mb-3">Full-grain Italian</h3>
                <p className="text-muted-foreground mb-4">
                  Sourced from heritage tanneries in Tuscany, these leathers are vegetable-tanned over 16–24 weeks. The tanning process uses tree bark and water—no chromium or synthetic chemicals. Hides age naturally, developing character and patina.
                </p>
                <div className="bg-muted/50 p-4 rounded border border-border text-sm space-y-2">
                  <div><strong>Thickness:</strong> 1.4–1.8mm</div>
                  <div><strong>Finish:</strong> Natural, aniline-dyed</div>
                  <div><strong>Certification:</strong> LWG Gold-rated tannery</div>
                  <div><strong>Use:</strong> Premium dress shoes, heritage models</div>
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
                <h3 className="font-serif text-2xl mb-3">Full-grain Turkish</h3>
                <p className="text-muted-foreground mb-4">
                  From tanneries in Izmir, these leathers offer similar quality with a slightly different aesthetic. Vegetable-tanning and chrome-tanning blends allow variety in color and finish. All LWG-certified.
                </p>
                <div className="bg-muted/50 p-4 rounded border border-border text-sm space-y-2">
                  <div><strong>Thickness:</strong> 1.2–1.6mm</div>
                  <div><strong>Finish:</strong> Chrome-vegetable blend, semi-aniline</div>
                  <div><strong>Certification:</strong> LWG Silver-rated tannery</div>
                  <div><strong>Use:</strong> Everyday shoes, work boots</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-serif text-2xl mb-3">Suede & Nubuck</h3>
                <p className="text-muted-foreground mb-4">
                  The inside of full-grain hides buffed to create a soft nap finish. Luxurious to touch, delicate in care, but unmatched in comfort. Used for uppers and accents.
                </p>
                <div className="bg-muted/50 p-4 rounded border border-border text-sm space-y-2">
                  <div><strong>Weight:</strong> 0.8–1.2mm</div>
                  <div><strong>Origin:</strong> Italy, France, or Germany</div>
                  <div><strong>Care:</strong> Requires suede brush and protectant</div>
                  <div><strong>Use:</strong> Uppers, collars, decorative elements</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-serif text-2xl mb-3">Vegan Alternatives</h3>
                <p className="text-muted-foreground mb-4">
                  For customers who prefer plant or recycled-polymer bases, we partner with suppliers developing high-performance synthetics. Not yet as durable as full-grain leather, but improving rapidly.
                </p>
                <div className="bg-muted/50 p-4 rounded border border-border text-sm space-y-2">
                  <div><strong>Composition:</strong> Recycled PET or plant-based PU</div>
                  <div><strong>Durability:</strong> 3–5 years typical wear</div>
                  <div><strong>Cost:</strong> 25% less than leather</div>
                  <div><strong>Use:</strong> Casual models, training shoes</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Soles & Outsoles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Natural Rubber",
                desc: "Harvested from Hevea trees in Malaysia, vulcanized for durability. Premium, durable, eco-friendly.",
                specs: { "Durability": "7–10 years", "Cost": "Premium", "Traction": "Excellent", "Sustainability": "Highly renewable" }
              },
              {
                name: "Neoprene Rubber",
                desc: "Synthetic rubber with superior oil and chemical resistance. Ideal for work boots and technical footwear.",
                specs: { "Durability": "8–12 years", "Cost": "Premium", "Traction": "Superior", "Sustainability": "Recyclable" }
              },
              {
                name: "EVA (Ethyl Vinyl Acetate)",
                desc: "Lightweight, cushioned, affordable. Used for comfort-oriented designs and sport models.",
                specs: { "Durability": "4–6 years", "Cost": "Affordable", "Traction": "Good", "Sustainability": "Recyclable" }
              },
              {
                name: "PU (Polyurethane)",
                desc: "Flexible, water-resistant, durable. Bridges the gap between rubber and EVA in performance and cost.",
                specs: { "Durability": "5–8 years", "Cost": "Mid-range", "Traction": "Good", "Sustainability": "Recyclable" }
              }
            ].map((sole, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-muted/50 p-6 rounded-lg border border-border"
              >
                <h3 className="font-serif text-lg mb-3">{sole.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{sole.desc}</p>
                <div className="space-y-2 text-xs">
                  {Object.entries(sole.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Components & Hardware</h2>
          <div className="space-y-6">
            {[
              {
                item: "Laces",
                material: "100% cotton or waxed cotton",
                source: "Portugal (Laces Inc.)",
                details: "Soft, durable, and dye-stable. Pre-shrunk to prevent loosening over time."
              },
              {
                item: "Eyelets & Grommets",
                material: "Stainless steel or solid brass",
                source: "Germany (Prym)",
                details: "Corrosion-resistant, precision-stamped. Brass develops patina; steel maintains shine."
              },
              {
                item: "Stitching Thread",
                material: "Waxed polyester or pure linen",
                source: "Italy (Gutermann)",
                details: "High-tenacity, water-resistant. Waxed thread adds abrasion protection."
              },
              {
                item: "Insoles",
                material: "Cork-latex or leather",
                source: "Portugal (natural cork) or Italy (leather)",
                details: "Contoured for arch support, breathable, naturally antimicrobial."
              },
              {
                item: "Heel Stacks",
                material: "Rubber or leather",
                source: "Japan or Germany",
                details: "Stacked in 0.5mm layers for precision. Replaceable on premium models."
              },
              {
                item: "Edge Binding",
                material: "Welt cord or leather strip",
                source: "Italy",
                details: "Stitched to create a finished edge. Aesthetic and protective."
              }
            ].map((comp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="grid md:grid-cols-4 gap-4 pb-6 border-b border-border last:border-0"
              >
                <div>
                  <h3 className="font-serif font-bold">{comp.item}</h3>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{comp.material}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{comp.source}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{comp.details}</p>
                </div>
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
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Our sourcing philosophy</h2>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              We've built relationships—not contracts—with our suppliers. Some we've worked with for 20+ years. We pay premiums for premium materials. We don't chase the cheapest rubber or fastest delivery.
            </p>
            <p className="text-lg leading-relaxed">
              Every material is tested in-house. Every batch is inspected. Defects trigger immediate investigation and supplier feedback. Our suppliers know we'll push back on quality degradation—and they respect that.
            </p>
            <p className="text-lg leading-relaxed">
              The result: shoes that feel premium in hand, perform over decades, and develop patina rather than falling apart.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </StaticPage>
  ),
});
