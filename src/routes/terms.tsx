import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service · Lee Shoe Factory" },
      { name: "description", content: "By using this website you agree to these terms. Prices are in USD and subject to change. Product images are indicative. Lee Shoe Factory reserves the right" },
      { property: "og:title", content: "Terms of Service · Lee Shoe Factory" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <StaticPage title="Terms of Service" tagline="Terms & conditions">
      <h2 className="font-serif text-3xl mt-2">Terms</h2>
      <p>By using this website you agree to these terms. Prices are in USD and subject to change. Product images are indicative. Lee Shoe Factory reserves the right to refuse service.</p>

    </StaticPage>
  ),
});
