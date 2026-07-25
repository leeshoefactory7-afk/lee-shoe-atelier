import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { SITE } from "@/lib/site-config";
import { Award, Leaf, Globe, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Lee Shoe Factory · 35 Years of Footwear Craft" },
      { name: "description", content: "Discover the story behind Lee Shoe Factory — three decades of premium footwear manufacturing, serving 60+ countries with factory-direct craftsmanship." },
      { property: "og:title", content: "About Lee Shoe Factory" },
      { property: "og:description", content: "Three decades of premium footwear manufacturing." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: () => (
    <StaticPage
      title="Our Story"
      tagline="Since 1990"
      cover="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-lg md:text-2xl font-serif text-accent italic leading-relaxed"
      >
        From a family workshop to a global footwear house — we've built something rare in modern manufacturing: a factory where craftsmanship isn't just an aspiration, it's a daily commitment.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-12 space-y-6"
      >
        <p className="text-lg leading-relaxed">
          In 1990, Lee Shoe Factory began as a single-room atelier in Seoul, with a simple vision: make shoes that would outlast their owners. Three decades later, we've grown into one of Asia's premier footwear manufacturers—operating {SITE.stats.countriesServed}+ countries across four continents, partnering with {SITE.stats.wholesalePartners}+ wholesale partners, and producing {SITE.stats.pairsShipped}+ pairs annually.
        </p>
        <p className="text-lg leading-relaxed">
          But growth never meant compromise. Every pair that leaves our factory has passed through the same rigorous 47-point quality inspection. We've simply gotten better at it.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 grid md:grid-cols-2 gap-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">The craft</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We believe shoes are an investment, not a commodity. Every pair begins with vegetable-tanned leather sourced directly from Tuscan tanneries—the same suppliers that have served European luxury houses for centuries. Our rubber compounds are engineered in-house. Our soles are welted by hand. Our finishing touches take hours.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Quality assurance isn't a checkpoint; it's a philosophy. At 47 separate quality milestones, shoes that don't meet our standards are disassembled and returned to production. Nothing moves to packaging until it's flawless.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">The promise</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Factory-direct prices. We own our production, so our margins are measured in integrity, not middlemen. Ethical wages for every worker—5–10% above regional standards. Traceability on every material from tannery to last to packing.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            And a 12-month tread warranty. If the outsole wears through within a year under normal conditions, we'll replace it free. Because we stand behind our work.
          </p>
          <p className="text-muted-foreground leading-relaxed font-medium text-accent">
            In an industry ruled by disposable design, we still make shoes that last decades.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { icon: Award, title: "Award Recognized", body: "Cited by footwear associations for material excellence and craft." },
          { icon: Leaf, title: "Sustainable Materials", body: "Full-grain Italian leather, vegetable-tanned, sustainable rubber compounds." },
          { icon: Globe, title: "Global Reach", body: "Serving 60+ countries via factory-direct DDP shipping." },
          { icon: Users, title: "Ethical Manufacturing", body: "Fair wages, family ownership, 35+ years in one location." },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
            className="bg-muted/50 p-6 rounded-lg border border-border"
          >
            <item.icon className="size-8 text-accent mb-3" />
            <h3 className="font-serif text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.body}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16 bg-accent/5 border border-accent/10 p-8 md:p-12 rounded-lg"
      >
        <h2 className="font-serif text-3xl md:text-4xl mb-6">Our culture</h2>
        <p className="text-lg leading-relaxed mb-4">
          We've remained in Seoul since 1990. Our founder's children now lead design and operations. More than half our workforce has been here for 10+ years. We close on weekends—truly close—because we believe burnout is the enemy of craft.
        </p>
        <p className="text-lg leading-relaxed">
          We invest 15% of annual revenue into production capacity, materials R&D, and worker development. We've turned down lucrative partnerships that would require moving production overseas. And we've built relationships with retailers who believe what we believe: that a great shoe isn't a transaction—it's a decade-long conversation.
        </p>
      </motion.div>
    </StaticPage>
  ),
});
