import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size Guide · Lee Shoe Factory" },
      { name: "description", content: "Find your perfect Lee size. Measurement guide, size conversion chart, and fit recommendations by shoe type." },
      { property: "og:title", content: "Size Guide · Lee Shoe Factory" },
      { property: "og:url", content: "/size-guide" },
    ],
    links: [{ rel: "canonical", href: "/size-guide" }],
  }),
  component: () => (
    <StaticPage
      title="Size Guide"
      tagline="Find your perfect fit"
      cover="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          Lee shoes run true to size for most feet. We recommend measuring your foot rather than relying solely on your existing shoe size, as sizing varies between brands and shoe types.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">How to measure your foot</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-muted/50 border border-border p-8 rounded-lg space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold">1</div>
                    <h3 className="font-serif text-lg">Prepare</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">Place a piece of paper on a hard floor and position it against a wall.</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold">2</div>
                    <h3 className="font-serif text-lg">Align</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">Bare foot or in thin socks. Stand with your heel touching the wall and your weight distributed evenly.</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold">3</div>
                    <h3 className="font-serif text-lg">Mark</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">Mark the tip of your longest toe on the paper with a pen.</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold">4</div>
                    <h3 className="font-serif text-lg">Measure</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">Measure from the wall (heel) to your mark in centimeters. Record both feet—they may differ slightly.</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold">5</div>
                    <h3 className="font-serif text-lg">Match</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">Use the conversion chart below to find your Lee size.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-accent/5 border border-accent/10 p-8 rounded-lg">
                <h3 className="font-serif text-2xl mb-6">Sizing tips</h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1">→</span>
                    <span><strong>Measure in the evening</strong> — feet swell throughout the day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1">→</span>
                    <span><strong>Both feet may differ</strong> — use the larger measurement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1">→</span>
                    <span><strong>Between sizes?</strong> We recommend sizing up for comfort</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1">→</span>
                    <span><strong>Check product pages</strong> for last-specific guidance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1">→</span>
                    <span><strong>Questions?</strong> Email us at sizing@leeshoefactory.com</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Size conversion chart</h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="overflow-x-auto"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-accent">
                  <th className="text-left py-3 px-3 font-serif text-lg">Foot length (cm)</th>
                  <th className="text-left py-3 px-3 font-serif text-lg">US Men</th>
                  <th className="text-left py-3 px-3 font-serif text-lg">EU</th>
                  <th className="text-left py-3 px-3 font-serif text-lg">UK</th>
                  <th className="text-left py-3 px-3 font-serif text-lg">Korean</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cm: "23.0–23.5", us: "5.5", eu: "37", uk: "4", kr: "230" },
                  { cm: "23.5–24.0", us: "6", eu: "37.5", uk: "5", kr: "240" },
                  { cm: "24.0–24.5", us: "6.5", eu: "38.5", uk: "5.5", kr: "245" },
                  { cm: "24.5–25.0", us: "7", eu: "39", uk: "6", kr: "250" },
                  { cm: "25.0–25.5", us: "7.5", eu: "40", uk: "6.5", kr: "255" },
                  { cm: "25.5–26.0", us: "8", eu: "40.5", uk: "7", kr: "260" },
                  { cm: "26.0–26.5", us: "8.5", eu: "41.5", uk: "7.5", kr: "265" },
                  { cm: "26.5–27.0", us: "9", eu: "42", uk: "8", kr: "270" },
                  { cm: "27.0–27.5", us: "9.5", eu: "42.5", uk: "8.5", kr: "275" },
                  { cm: "27.5–28.0", us: "10", eu: "43", uk: "9", kr: "280" },
                  { cm: "28.0–28.5", us: "10.5", eu: "44", uk: "9.5", kr: "285" },
                  { cm: "28.5–29.0", us: "11", eu: "44.5", uk: "10", kr: "290" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-3 font-serif font-bold">{row.cm}</td>
                    <td className="py-3 px-3">{row.us}</td>
                    <td className="py-3 px-3">{row.eu}</td>
                    <td className="py-3 px-3">{row.uk}</td>
                    <td className="py-3 px-3">{row.kr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">By shoe type</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                type: "Dress shoes & oxfords",
                fit: "True to size",
                notes: "Classic lasts have moderate room. If between sizes, consider sizing up."
              },
              {
                type: "Chelsea boots",
                fit: "True to size",
                notes: "Elastic construction allows slight give. Size true for snug fit."
              },
              {
                type: "Loafers",
                fit: "True to size to size up",
                notes: "These run slightly narrow. If between sizes, size up for comfortable slip-on."
              },
              {
                type: "Sneakers & athletic",
                fit: "Slightly generous",
                notes: "Sport lasts have additional room for active wear. Size true for performance fit."
              }
            ].map((shoe, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-border p-6 rounded-lg"
              >
                <h3 className="font-serif text-xl mb-2">{shoe.type}</h3>
                <div className="mb-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">Fit</span>
                  <p className="text-accent font-medium">{shoe.fit}</p>
                </div>
                <p className="text-sm text-muted-foreground">{shoe.notes}</p>
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
          <h3 className="font-serif text-2xl mb-4">Still unsure?</h3>
          <p className="mb-6 leading-relaxed">
            We offer free returns and exchanges within 30 days of delivery. If your first pair doesn't fit perfectly, we'll ship a replacement size free of charge.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors rounded">
            Contact our sizing team
          </a>
        </motion.div>
      </motion.div>
    </StaticPage>
  ),
});
