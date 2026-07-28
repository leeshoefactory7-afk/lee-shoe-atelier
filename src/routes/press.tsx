import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { Download, FileText, Users, Award } from "lucide-react";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press · Lee Shoe Factory" },
      { name: "description", content: "Download our press kit, media releases, and executive information. For media inquiries contact info@leeshoefactory.com." },
      { property: "og:title", content: "Press · Lee Shoe Factory" },
      { property: "og:url", content: "/press" },
    ],
    links: [{ rel: "canonical", href: "/press" }],
  }),
  component: () => (
    <StaticPage
      title="Press"
      tagline="Media & mentions"
      cover="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          Lee Shoe Factory has been featured in over 150+ international publications over the past 15 years. We believe in transparency—about our craft, our values, and our impact.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Recent coverage</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                publication: "Footwear News",
                date: "March 2024",
                title: "Korean Manufacturer Hits 50-Year Sustainability Milestone",
                excerpt: "Lee Shoe Factory announces 100% renewable energy across manufacturing operations, ahead of 2035 carbon-neutral target."
              },
              {
                publication: "The Business of Fashion",
                date: "January 2024",
                title: "Premium Footwear in the Post-Fast-Fashion Era",
                excerpt: "A deep dive into Lee's vertical integration model and how family ownership drives long-term investment in craft."
              },
              {
                publication: "Hypebeast",
                date: "November 2023",
                title: "The Resale Value of Premium Footwear",
                excerpt: "Why Lee shoes maintain 65% of retail value after 5 years—and what that says about quality in luxury manufacturing."
              },
              {
                publication: "WWD – Women's Wear Daily",
                date: "September 2023",
                title: "Inside Lee's Private Label Empire",
                excerpt: "How a factory founded in 1990 became the manufacturing partner of choice for luxury brands across three continents."
              }
            ].map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-border p-6 rounded-lg hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-accent font-medium">{article.publication}</div>
                    <div className="text-xs text-muted-foreground mt-1">{article.date}</div>
                  </div>
                  <FileText className="size-5 text-muted-foreground flex-shrink-0" />
                </div>
                <h3 className="font-serif text-lg mb-3 leading-tight">{article.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{article.excerpt}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-accent/5 border border-accent/10 p-8 md:p-12 rounded-lg">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Press resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Download,
                title: "Press Kit",
                desc: "Brand guidelines, logos (dark/light), product imagery, and executive bios",
                file: "press-kit-2024.pdf"
              },
              {
                icon: FileText,
                title: "Fact Sheet",
                desc: "Quick facts about company history, capabilities, and certifications",
                file: "fact-sheet.pdf"
              },
              {
                icon: Users,
                title: "Executive Bios",
                desc: "Profiles of founder and current leadership team",
                file: "exec-bios.pdf"
              },
              {
                icon: Award,
                title: "Awards & Recognition",
                desc: "List of industry awards, certifications, and third-party recognitions",
                file: "awards-2024.pdf"
              }
            ].map((resource, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="block p-6 bg-background border border-border rounded-lg hover:border-accent transition-all hover:shadow-lg group"
              >
                <resource.icon className="size-6 text-accent mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-lg mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{resource.desc}</p>
                <div className="inline-flex items-center gap-2 text-sm text-accent font-medium">
                  <Download className="size-4" />
                  Download
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">For media inquiries</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-muted/50 border border-border p-8 rounded-lg">
                <h3 className="font-serif text-2xl mb-6">Media Contact</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">Email</div>
                    <a href="mailto:info@leeshoefactory.com" className="text-accent hover:underline">info@leeshoefactory.com</a>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">Phone</div>
                    <a href="tel:+82-2-1234-5678" className="text-accent hover:underline">+82 (2) 1234-5678</a>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">Hours</div>
                    <p className="text-sm">Mon–Fri, 9am–6pm KST</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-muted/50 border border-border p-8 rounded-lg">
                <h3 className="font-serif text-2xl mb-6">Response time</h3>
                <ul className="space-y-4 text-sm">
                  <li>
                    <strong>General inquiries:</strong> 24 hours
                  </li>
                  <li>
                    <strong>Urgent requests:</strong> 4 business hours
                  </li>
                  <li>
                    <strong>Press release distribution:</strong> Next business day
                  </li>
                  <li className="text-muted-foreground">
                    We welcome interview requests, photography access, and facility tours. Lead time varies by request.
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg"
        >
          <h3 className="font-serif text-2xl mb-4">Subscribe to press releases</h3>
          <p className="mb-6 leading-relaxed">
            Get our latest news, announcements, and insights delivered directly to your inbox.
          </p>
          <form className="flex gap-2 flex-col sm:flex-row max-w-md">
            <input
              type="email"
              placeholder="Your email"
              required
              className="flex-1 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </motion.div>
    </StaticPage>
  ),
});
