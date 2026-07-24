import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/wholesale-terms")({
  head: () => ({
    meta: [
      { title: "Wholesale Terms · Lee Shoe Factory" },
      { name: "description", content: "Minimum first-order value $2,500. Net-30 terms after three successful orders. Returns limited to defective merchandise. Full terms are shared upon account " },
      { property: "og:title", content: "Wholesale Terms · Lee Shoe Factory" },
      { property: "og:url", content: "/wholesale-terms" },
    ],
    links: [{ rel: "canonical", href: "/wholesale-terms" }],
  }),
  component: () => (
    <StaticPage title="Wholesale Terms" tagline="Terms for retail partners">
      <h2 className="font-serif text-3xl mt-2">Wholesale terms</h2>
      <p>Minimum first-order value $2,500. Net-30 terms after three successful orders. Returns limited to defective merchandise. Full terms are shared upon account approval.</p>

    </StaticPage>
  ),
});
