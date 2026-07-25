import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { MapPin, Calendar, Users, Award } from "lucide-react";

export const Route = createFileRoute("/factory-tour")({
  head: () => ({
    meta: [
      { title: "Factory Tour · Lee Shoe Factory" },
      { name: "description", content: "Visit our 42,000 m² manufacturing facility in Seoul. See the craft and craftsmanship firsthand." },
      { property: "og:title", content: "Factory Tour · Lee Shoe Factory" },
      { property: "og:url", content: "/factory-tour" },
    ],
    links: [{ rel: "canonical", href: "/factory-tour" }],
  }),
  component: () => (
    <StaticPage
      title="Factory Tour"
      tagline="See craft firsthand"
      cover="https://images.unsplash.com/photo-1578062298140-e6fbddc0cc1c?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          Step inside our 42,000 m² facility in Seoul and witness three decades of footwear mastery. From leather sourcing to final inspection, see how we create shoes built to last.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">The Experience</h2>
          <p className="text-lg leading-relaxed mb-8 text-muted-foreground">
            Our factory tours are designed for media, partners, retailers, and shoe enthusiasts. You'll walk the production floor, meet our master craftspeople, and understand why Lee shoes are different.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: MapPin,
                title: "Location",
                desc: "Seoul, South Korea\n42,000 m² facility\n15 production lines"
              },
              {
                icon: Calendar,
                title: "Scheduling",
                desc: "Tours available Monday–Friday\nBy appointment only\n2–3 week advance notice recommended"
              },
              {
                icon: Users,
                title: "Groups",
                desc: "Individual or group tours\nMaximum 15 people per group\nMultiple tours per day available"
              },
              {
                icon: Award,
                title: "Highlights",
                desc: "Meet master craftspeople\nSee 47-point QC in action\nLeather sourcing overview"
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
                <h3 className="font-serif text-lg mb-3">{item.title}</h3>
                <p className="text-muted-foreground whitespace-pre-line text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Tour Highlights</h2>
          <div className="space-y-6">
            {[
              {
                title: "The Heritage",
                desc: "Visit our archives and learn 35+ years of design evolution. See original samples from 1990."
              },
              {
                title: "Material Selection",
                desc: "Watch how we source and grade Italian leather. See why full-grain matters."
              },
              {
                title: "Last & Pattern Engineering",
                desc: "Tour our in-house last lab. See how precision engineering creates perfect fit."
              },
              {
                title: "The Factory Floor",
                desc: "Walk the 15 production lines. See craftspeople at work—cutting, stitching, assembling."
              },
              {
                title: "Quality Control",
                desc: "Observe our legendary 47-point inspection process. Understand why defects are disassembled."
              },
              {
                title: "Finishing & Packaging",
                desc: "See the final touches—polishing, conditioning, boxing. Meet our packaging team."
              }
            ].map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-l-4 border-accent pl-6 py-3"
              >
                <h3 className="font-serif text-lg mb-2">{highlight.title}</h3>
                <p className="text-muted-foreground">{highlight.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Practical Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-muted/50 border border-border p-6 rounded-lg"
            >
              <h3 className="font-serif text-2xl mb-4">Before You Visit</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Closed-toe shoes required</li>
                <li>• Safety vest and earplugs provided</li>
                <li>• Production floor noise levels</li>
                <li>• Comfortable walking shoes</li>
                <li>• Tour duration: 2–3 hours</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-muted/50 border border-border p-6 rounded-lg"
            >
              <h3 className="font-serif text-2xl mb-4">What's Included</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Guided tour with English-speaking guide</li>
                <li>• Complimentary coffee/tea</li>
                <li>• Product samples and information</li>
                <li>• Q&A with production managers</li>
                <li>• Exclusive factory store discount</li>
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="bg-accent/5 border border-accent/10 p-8 md:p-12 rounded-lg">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Who Should Visit?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Retail partners & buyers",
              "Wholesale distributors",
              "Media & journalists",
              "Design & fashion professionals",
              "Brand founders & entrepreneurs",
              "Footwear enthusiasts"
            ].map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="text-accent font-bold">✓</span>
                <span className="text-muted-foreground">{group}</span>
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
          <h3 className="font-serif text-2xl mb-4">Schedule Your Tour</h3>
          <p className="mb-6 leading-relaxed">
            Factory tours must be scheduled in advance. Provide your preferred dates and we'll confirm availability.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors rounded">
            Request a Tour
          </a>
          <p className="text-sm text-primary-foreground/70 mt-4">
            For press/media tours, email: press@leeshoefactory.com
          </p>
        </motion.div>
      </motion.div>
    </StaticPage>
  ),
});
