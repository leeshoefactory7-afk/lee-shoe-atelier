import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StaticPage } from "@/components/site/StaticPage";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

export const Route = createFileRoute("/care-guide")({
  head: () => ({
    meta: [
      { title: "Care Guide · Lee Shoe Factory" },
      { name: "description", content: "Learn how to care for your Lee shoes to ensure they last decades. Cleaning, conditioning, storage, and repair tips." },
      { property: "og:title", content: "Care Guide · Lee Shoe Factory" },
      { property: "og:url", content: "/care-guide" },
    ],
    links: [{ rel: "canonical", href: "/care-guide" }],
  }),
  component: () => (
    <StaticPage
      title="Care Guide"
      tagline="Keep them looking new"
      cover="https://images.unsplash.com/photo-1543163521-9733539c2d30?auto=format&fit=crop&w=1600&q=80"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg md:text-xl leading-relaxed text-accent font-serif italic mb-8">
          Lee shoes are designed to last decades. The care you provide in the first weeks and months sets them up for a lifetime of wear.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12"
      >
        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Daily care</h2>
          <div className="space-y-6">
            {[
              { title: "After each wear", steps: ["Wipe the exterior with a soft dry cloth to remove dust and debris", "Loosen the laces fully and remove the shoes gently", "Insert shoe trees (cedar preferred) to help maintain shape and absorb moisture", "Store in a cool, dry place away from direct heat or sunlight"] },
              { title: "Weekly maintenance", steps: ["Inspect the sole for debris or damage", "Wipe the leather with a slightly damp cloth if needed", "Apply neutral cream conditioner to leather uppers once per week initially, then monthly after break-in", "Allow shoes to air-dry naturally—never use heat sources"] },
              { title: "Seasonal care", steps: ["During wet seasons, treat with a water-repellent spray (for non-treated leathers)", "In winter, use salt-removal wipes if exposed to road salt", "Inspect stitching and sole attachment for wear", "Re-condition leather as seasons change—leather needs more moisture in dry climates"] }
            ].map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-l-4 border-accent pl-6"
              >
                <h3 className="font-serif text-2xl mb-4">{section.title}</h3>
                <ol className="space-y-3">
                  {section.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="font-serif font-bold text-accent min-w-fit">{j + 1}.</span>
                      <span className="text-muted-foreground leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Conditioning & restoration</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-serif text-2xl mb-4">Break-in period</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                New Lee shoes require a break-in period of 2–4 weeks. During this time:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Wear them for 1–2 hours at a time initially</li>
                <li>• Apply leather conditioner 2–3 times during break-in</li>
                <li>• The leather will soften and mold to your foot</li>
                <li>• Some creasing is normal and adds character</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-serif text-2xl mb-4">Long-term conditioning</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                After the break-in period, maintain your shoes with:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Monthly neutral cream conditioning for light wear</li>
                <li>• Every 3 months for regular daily wear</li>
                <li>• Use mink oil or beeswax-based conditioners for depth</li>
                <li>• Occasional polish to maintain color and shine</li>
              </ul>
            </motion.div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Storage & rotation</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-accent/5 border border-accent/10 p-8 rounded-lg"
          >
            <p className="text-lg leading-relaxed mb-6">
              Leather needs time to rest and recover between wears. Alternating pairs extends their lifespan significantly.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-serif font-bold mb-2">Ideal rotation</h4>
                <p className="text-muted-foreground">
                  If you have 2–3 pairs of Lee shoes, rotate daily. Leather needs 24 hours to fully dry and recover its shape. Wearing the same pair consecutively accelerates creasing and moisture damage.
                </p>
              </div>
              <div>
                <h4 className="font-serif font-bold mb-2">Storage conditions</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Keep in a cool, dark place (15–25°C ideal)</li>
                  <li>• Avoid basements (moisture) and attics (heat)</li>
                  <li>• Use breathable dust bags—never plastic bags</li>
                  <li>• Cedar shoe trees or cedar blocks prevent odor and mold</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl mb-8">Do's and Don'ts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-serif text-2xl mb-6 flex items-center gap-2">
                <CheckCircle className="size-6 text-green-600" />
                Do
              </h3>
              <ul className="space-y-3">
                {[
                  "Wipe with a soft cloth after each wear",
                  "Use cedar shoe trees",
                  "Rotate between pairs",
                  "Condition leather monthly",
                  "Spot-clean with a damp cloth",
                  "Have soles re-heeled professionally",
                  "Store in a cool, dry place",
                  "Break in gradually over 2–4 weeks"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-serif text-2xl mb-6 flex items-center gap-2">
                <XCircle className="size-6 text-red-600" />
                Don't
              </h3>
              <ul className="space-y-3">
                {[
                  "Machine wash or dry clean without care advice",
                  "Expose to direct heat or sunlight",
                  "Wear the same pair every single day",
                  "Use plastic bags for storage",
                  "Ignore creasing or stains",
                  "Throw them away when soles wear—get them re-soled",
                  "Store in humid or very dry environments",
                  "Use harsh chemicals or bleach"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <XCircle className="size-4 text-red-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg flex items-start gap-4"
        >
          <AlertCircle className="size-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-serif text-2xl mb-2">Professional repair & restoration</h3>
            <p className="leading-relaxed mb-4">
              Lee shoes are designed to be resoled and repaired. When soles wear through, we recommend visiting a quality cobbler rather than discarding the shoes. Properly maintained Lee shoes should last 10–20 years or more.
            </p>
            <p>
              For major damage or professional restoration, contact us at care@leeshoefactory.com for cobbler recommendations in your region.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </StaticPage>
  ),
});
