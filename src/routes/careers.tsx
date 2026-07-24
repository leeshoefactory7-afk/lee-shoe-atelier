import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers · Lee Shoe Factory" },
      { name: "description", content: "We hire for craft, curiosity and care. Current openings for pattern engineers, quality controllers, and international sales managers. Email careers@leeshoe" },
      { property: "og:title", content: "Careers · Lee Shoe Factory" },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: () => (
    <StaticPage title="Careers" tagline="Join the atelier">
      <h2 className="font-serif text-3xl mt-2">Open roles</h2>
      <p>We hire for craft, curiosity and care. Current openings for pattern engineers, quality controllers, and international sales managers. Email careers@leeshoefactory.com with your CV.</p>

    </StaticPage>
  ),
});
