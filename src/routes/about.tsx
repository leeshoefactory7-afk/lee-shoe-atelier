import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";
import { SITE } from "@/lib/site-config";

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
      <p className="text-xl font-serif text-accent italic">
        A family workshop that became a global footwear house — without losing a single stitch of craft.
      </p>
      <p>
        Lee Shoe Factory was founded in 1990 as a single-room atelier making leather dress shoes for local
        gentlemen. Today, {SITE.stats.yearsExperience} years later, we operate three manufacturing halls,
        serve {SITE.stats.countriesServed} countries, and count {SITE.stats.wholesalePartners}+ wholesale
        partners across department stores, boutiques and hotel chains.
      </p>
      <h2 className="font-serif text-3xl mt-10">Our craft</h2>
      <p>
        Every pair leaves our line after passing 47 individual quality checks. We work with vegetable-tanned
        leathers, rubber compounds engineered in-house, and hand-finish every welt. Nothing rushed. Nothing
        outsourced.
      </p>
      <h2 className="font-serif text-3xl mt-10">Our promise</h2>
      <p>
        Factory-direct prices. Ethical wages. Materials traceable to their origin. And a 12-month tread
        warranty on every shoe we make.
      </p>
    </StaticPage>
  ),
});
