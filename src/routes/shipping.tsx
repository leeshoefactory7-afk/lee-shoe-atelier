import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping · Lee Shoe Factory" },
      { name: "description", content: "We ship to 60+ countries via DHL Express and FedEx Priority. All duties and taxes are calculated at checkout — no surprises at your door." },
      { property: "og:title", content: "Shipping · Lee Shoe Factory" },
      { property: "og:url", content: "/shipping" },
    ],
    links: [{ rel: "canonical", href: "/shipping" }],
  }),
  component: () => (
    <StaticPage title="Shipping" tagline="Worldwide DDP delivery">
      <h2 className="font-serif text-3xl mt-2">Shipping policy</h2>
      <p>We ship to 60+ countries via DHL Express and FedEx Priority. All duties and taxes are calculated at checkout — no surprises at your door.</p>
<h3 className="font-serif text-xl mt-6">Delivery times</h3>
<ul className="list-none space-y-1">
  <li>• Europe: 3–5 business days</li>
  <li>• North America: 4–6 business days</li>
  <li>• Asia-Pacific: 5–8 business days</li>
  <li>• Rest of world: 7–12 business days</li>
</ul>
<p>Free shipping on orders over $200. Standard shipping $25 flat.</p>

    </StaticPage>
  ),
});
