import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews · Lee Shoe Factory" },
      { name: "description", content: "Over 12,000 verified reviews across our product range. Average rating 4.8 / 5. See individual product pages for detailed feedback." },
      { property: "og:title", content: "Reviews · Lee Shoe Factory" },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: () => (
    <StaticPage title="Reviews" tagline="What customers say">
      <h2 className="font-serif text-3xl mt-2">Customer reviews</h2>
      <p>Over 12,000 verified reviews across our product range. Average rating 4.8 / 5. See individual product pages for detailed feedback.</p>

    </StaticPage>
  ),
});
