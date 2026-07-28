import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns · Lee Shoe Factory" },
      { name: "description", content: "Not the right fit? Return unworn shoes in original packaging within 30 days of delivery for a full refund. We even cover the return shipping for orders wit" },
      { property: "og:title", content: "Returns · Lee Shoe Factory" },
      { property: "og:url", content: "/returns" },
    ],
    links: [{ rel: "canonical", href: "/returns" }],
  }),
  component: () => (
    <StaticPage title="Returns" tagline="30-day easy returns">
      <h2 className="font-serif text-3xl mt-2">Returns policy</h2>
      <p>Not the right fit? Return unworn shoes in original packaging within 30 days of delivery for a full refund. We even cover the return shipping for orders within the EU, UK and US.</p>
<p>To initiate a return, email info@leeshoefactory.com with your order number.</p>

    </StaticPage>
  ),
});
