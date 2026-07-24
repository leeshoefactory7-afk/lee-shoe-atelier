import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { title: "Manufacturing · Lee Shoe Factory" },
      { name: "description", content: "Three purpose-built halls totalling 42,000 m², producing up to 8,000 pairs per day. We handle full-package OEM, private label and ODM orders for global bra" },
      { property: "og:title", content: "Manufacturing · Lee Shoe Factory" },
      { property: "og:url", content: "/manufacturing" },
    ],
    links: [{ rel: "canonical", href: "/manufacturing" }],
  }),
  component: () => (
    <StaticPage title="Manufacturing" tagline="Craftsmanship at industrial scale">
      <h2 className="font-serif text-3xl mt-2">Our capabilities</h2>
      <p>Three purpose-built halls totalling 42,000 m², producing up to 8,000 pairs per day. We handle full-package OEM, private label and ODM orders for global brands. Custom leathers, custom soles, custom lasts — with lead times as tight as 45 days from tech-pack to freight.</p>
<h3 className="font-serif text-xl mt-6">Capabilities</h3>
<ul className="list-none space-y-1">
  <li>• Goodyear-welt, cemented, and vulcanised construction</li>
  <li>• In-house last-making and pattern engineering</li>
  <li>• Full-grain, suede, nubuck and vegan leather sourcing</li>
  <li>• Rubber, EVA, PU and TPR sole tooling</li>
  <li>• BSCI-audited factory with ISO 9001:2015</li>
</ul>
<p>MOQ from 300 pairs per style. Sample lead time 14 days.</p>

    </StaticPage>
  ),
});
