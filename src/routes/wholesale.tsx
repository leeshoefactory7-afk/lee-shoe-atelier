import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale · Lee Shoe Factory" },
      { name: "description", content: "Join 480+ department stores, boutiques and multi-brand retailers stocking Lee across 60 countries. Tiered pricing, exclusive territory options and dedicate" },
      { property: "og:title", content: "Wholesale · Lee Shoe Factory" },
      { property: "og:url", content: "/wholesale" },
    ],
    links: [{ rel: "canonical", href: "/wholesale" }],
  }),
  component: () => (
    <StaticPage title="Wholesale" tagline="Factory-direct pricing for retail partners">
      <h2 className="font-serif text-3xl mt-2">Become a partner</h2>
      <p>Join 480+ department stores, boutiques and multi-brand retailers stocking Lee across 60 countries. Tiered pricing, exclusive territory options and dedicated account management.</p>
<h3 className="font-serif text-xl mt-6">What we offer</h3>
<ul className="list-none space-y-1">
  <li>• Wholesale pricing 45–65% off retail</li>
  <li>• seasonal drops per year plus core carry-over</li>
  <li>• Marketing assets, imagery and product data feed</li>
  <li>• Drop-shipping available for e-commerce partners</li>
  <li>• -day net terms after 3 successful orders</li>
</ul>
<p>Apply below or email wholesale@leeshoefactory.com.</p>

    </StaticPage>
  ),
});
