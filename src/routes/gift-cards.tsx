import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/gift-cards")({
  head: () => ({
    meta: [
      { title: "Gift Cards · Lee Shoe Factory" },
      { name: "description", content: "Digital gift cards available in denominations from $50 to $1,000. Delivered by email, valid for 12 months, redeemable on any product." },
      { property: "og:title", content: "Gift Cards · Lee Shoe Factory" },
      { property: "og:url", content: "/gift-cards" },
    ],
    links: [{ rel: "canonical", href: "/gift-cards" }],
  }),
  component: () => (
    <StaticPage title="Gift Cards" tagline="The perfect present">
      <h2 className="font-serif text-3xl mt-2">Gift cards</h2>
      <p>Digital gift cards available in denominations from $50 to $1,000. Delivered by email, valid for 12 months, redeemable on any product.</p>

    </StaticPage>
  ),
});
