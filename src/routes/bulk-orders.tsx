import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { Truck, DollarSign, CheckCircle, Zap } from "lucide-react";

export const Route = createFileRoute("/bulk-orders")({
  head: () => ({
    meta: [
      { title: "Bulk Orders · Lee Shoe Factory" },
      { name: "description", content: "Large volume orders with special pricing, flexible payment terms, and dedicated support." },
      { property: "og:title", content: "Bulk Orders · Lee Shoe Factory" },
      { property: "og:url", content: "/bulk-orders" },
    ],
    links: [{ rel: "canonical", href: "/bulk-orders" }],
  }),
  component: () => (
    <StaticPage
      title="Bulk Orders"
      tagline="Volume pricing for serious buyers"
      cover="https://images.unsplash.com/photo-1578062298140-e6fbddc0cc1c?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          Order 5,000+ pairs and unlock premium wholesale rates, flexible payment terms, and dedicated account management.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Bulk Order Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: DollarSign, title: "Premium Pricing", desc: "Up to 65% off retail for orders 5,000+ pairs" },
              { icon: Truck, title: "Flexible Shipping", desc: "Consolidated freight, multiple destinations, and flexible timing" },
              { icon: CheckCircle, title: "Priority Support", desc: "Dedicated account manager, fast responses, priority production" },
              { icon: Zap, title: "Custom Terms", desc: "Negotiate payment terms, extended payment periods, and special pricing" }
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
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Bulk Order Pricing</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-accent">
                  <th className="text-left py-4 px-4 font-serif text-lg">Order Volume</th>
                  <th className="text-left py-4 px-4 font-serif text-lg">Discount</th>
                  <th className="text-left py-4 px-4 font-serif text-lg">Payment Terms</th>
                  <th className="text-left py-4 px-4 font-serif text-lg">Lead Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { vol: "5,000–10,000 pairs", disc: "55% off retail", terms: "Net 30", time: "45–60 days" },
                  { vol: "10,000–25,000 pairs", disc: "60% off retail", terms: "Net 45", time: "45–60 days" },
                  { vol: "25,000–50,000 pairs", disc: "62% off retail", terms: "Net 60", time: "45–90 days" },
                  { vol: "50,000+ pairs", disc: "65% off retail", terms: "Negotiable", time: "Custom" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 font-medium">{row.vol}</td>
                    <td className="py-4 px-4 text-accent font-bold">{row.disc}</td>
                    <td className="py-4 px-4">{row.terms}</td>
                    <td className="py-4 px-4">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            * Prices vary based on material, construction method, and product selection. Request a quote for exact pricing.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Bulk Order Process</h2>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Initial Consultation",
                desc: "Discuss your order requirements, preferred styles, and timeline."
              },
              {
                step: "02",
                title: "Quote & Terms",
                desc: "Receive detailed quote with pricing, payment terms, and production schedule."
              },
              {
                step: "03",
                title: "Order Confirmation",
                desc: "Confirm order details, deposit (typically 30%), and assign dedicated account manager."
              },
              {
                step: "04",
                title: "Production Planning",
                desc: "Material sourcing, tooling setup, and production line scheduling."
              },
              {
                step: "05",
                title: "Manufacturing & QC",
                desc: "Full-scale production with continuous quality monitoring and 47-point inspections."
              },
              {
                step: "06",
                title: "Shipment",
                desc: "Packaging, consolidation, and freight to your location or multiple destinations."
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
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Special Bulk Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Custom Packaging",
                items: ["Branded boxes", "Tissue & materials", "Printed insoles", "Custom labels"]
              },
              {
                title: "Consolidation",
                items: ["Multiple styles in one shipment", "Multiple destinations", "Staggered delivery", "Partial shipments"]
              },
              {
                title: "Customization",
                items: ["Private labeling", "Custom colorways", "Embroidery", "Special sizes"]
              },
              {
                title: "Support Services",
                items: ["Dedicated account manager", "Weekly updates", "Rush production options", "Priority changes"]
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-muted/50 border border-border p-6 rounded-lg"
              >
                <h3 className="font-serif text-lg mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle className="size-4 text-accent flex-shrink-0" />
                      {item}
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
          className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg"
        >
          <h3 className="font-serif text-2xl mb-4">Ready for a bulk order?</h3>
          <p className="mb-6 leading-relaxed">
            Contact our wholesale team. We'll provide a custom quote based on your specifications and discuss payment options.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors rounded">
            Request Bulk Order Quote
          </a>
        </motion.div>
      </motion.div>
    </StaticPage>
  ),
});
