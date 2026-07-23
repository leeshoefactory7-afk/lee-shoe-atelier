import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/track-order")({
  head: () => ({
    meta: [
      { title: "Track Order · Lee Shoe Factory" },
      { name: "description", content: "Enter your order number and email in the search below or check the confirmation email we sent you. For assistance email support@leeshoefactory.com." },
      { property: "og:title", content: "Track Order · Lee Shoe Factory" },
      { property: "og:url", content: "/track-order" },
    ],
    links: [{ rel: "canonical", href: "/track-order" }],
  }),
  component: () => (
    <StaticPage title="Track Order" tagline="Follow your delivery">
      <h2 className="font-serif text-3xl mt-2">Order tracking</h2>
      <p>Enter your order number and email in the search below or check the confirmation email we sent you. For assistance email support@leeshoefactory.com.</p>

    </StaticPage>
  ),
});
