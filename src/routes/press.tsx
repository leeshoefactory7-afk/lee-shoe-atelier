import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press · Lee Shoe Factory" },
      { name: "description", content: "Download our press kit (logos, product imagery, executive bios). For media inquiries contact press@leeshoefactory.com." },
      { property: "og:title", content: "Press · Lee Shoe Factory" },
      { property: "og:url", content: "/press" },
    ],
    links: [{ rel: "canonical", href: "/press" }],
  }),
  component: () => (
    <StaticPage title="Press" tagline="Media & mentions">
      <h2 className="font-serif text-3xl mt-2">Press kit</h2>
      <p>Download our press kit (logos, product imagery, executive bios). For media inquiries contact press@leeshoefactory.com.</p>

    </StaticPage>
  ),
});
