import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { Briefcase, Users, TrendingUp, Award } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers · Lee Shoe Factory" },
      { name: "description", content: "Join our team. We hire for craft, curiosity and care. Current openings in engineering, quality, and sales. Competitive compensation and growth opportunities." },
      { property: "og:title", content: "Careers · Lee Shoe Factory" },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: () => (
    <StaticPage
      title="Careers"
      tagline="Join the atelier"
      cover="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          We're looking for people who believe that craft matters. Who see shoes not as commodity goods, but as intimate tools that carry their owners through decades of living.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Why work here</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Award, title: "Craft first", desc: "Zero pressure to compromise quality for margin. We invest in doing things right." },
              { icon: Users, title: "Family culture", desc: "Founded 35 years ago, still family-owned. We treat everyone like we'd treat family." },
              { icon: TrendingUp, title: "Growth path", desc: "Invest 15% of revenue annually in R&D and employee development. Room to grow." },
              { icon: Briefcase, title: "Competitive comp", desc: "Wages 5–10% above regional standard. Health, retirement, and education support." }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-muted/50 border border-border p-8 rounded-lg"
              >
                <benefit.icon className="size-8 text-accent mb-4" />
                <h3 className="font-serif text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Open positions</h2>
          <div className="space-y-6">
            {[
              {
                title: "Pattern Engineer",
                level: "Mid–Senior",
                location: "Seoul, South Korea",
                desc: "Lead pattern design and grading for new collections. Work with designers and production to create technically sound, beautiful patterns.",
                qualifications: ["5+ years footwear pattern making", "CAD proficiency (WinGarment or similar)", "Knowledge of construction methods", "Attention to detail & creative problem-solving"]
              },
              {
                title: "Quality Control Manager",
                level: "Senior",
                location: "Seoul, South Korea",
                desc: "Oversee all quality checkpoints across production. Implement improvements, manage team of 12+ inspectors, set standards.",
                qualifications: ["10+ years QC experience in footwear", "Leadership and process improvement", "ISO 9001 knowledge", "Bilingual (Korean + English preferred)"]
              },
              {
                title: "International Sales Manager",
                level: "Mid–Senior",
                location: "Seoul or Remote",
                desc: "Build and maintain relationships with wholesale partners. Manage B2B sales across Americas and Europe regions.",
                qualifications: ["8+ years B2B sales or wholesale experience", "Footwear or fashion background preferred", "Fluent English, other languages bonus", "Travel: 25% domestic, 10% international"]
              },
              {
                title: "Materials Sourcing Specialist",
                level: "Mid",
                location: "Seoul, South Korea",
                desc: "Source and qualify new leather, sole, and component suppliers. Negotiate terms, manage quality, ensure ethical compliance.",
                qualifications: ["5+ years materials/procurement experience", "Footwear or apparel background", "Knowledge of tanneries and suppliers", "Sustainability-focused mindset"]
              }
            ].map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-border p-8 rounded-lg hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-2xl mb-2">{job.title}</h3>
                    <div className="flex gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">
                      <span>{job.level}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <Briefcase className="size-6 text-accent flex-shrink-0" />
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{job.desc}</p>
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium mb-2">Qualifications</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {job.qualifications.map((qual, j) => (
                      <li key={j}>• {qual}</li>
                    ))}
                  </ul>
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
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Culture & values</h2>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              We close on weekends—truly close. No emails, no Slack. Because burnout is the enemy of craft. We believe that a person doing great work needs rest, family time, and space to think.
            </p>
            <p className="text-lg leading-relaxed">
              We've been in Seoul since 1990. When we hire, we hire for the long term. Advancement is from within. The factory manager started on the cutting floor. The design director came up through pattern engineering.
            </p>
            <p className="text-lg leading-relaxed">
              We invest 15% of annual revenue into R&D, production capacity, and employee development. That means education allowances, training programs, and opportunities to attend industry conferences.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg"
        >
          <h3 className="font-serif text-2xl mb-4">Apply now</h3>
          <p className="mb-6 leading-relaxed">
            Interested in joining our team? Send your CV and a brief note about why you're interested to:
          </p>
          <a href="mailto:info@leeshoefactory.com" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors rounded">
            info@leeshoefactory.com
          </a>
          <p className="mt-6 text-sm text-primary-foreground/80">
            We review applications on a rolling basis. We'll get back to you within 2–3 weeks.
          </p>
        </motion.div>
      </motion.div>
    </StaticPage>
  ),
});
