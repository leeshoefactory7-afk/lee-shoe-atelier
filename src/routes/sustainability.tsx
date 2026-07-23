import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability · Lee Shoe Factory" },
      { name: "description", content: "We measure our footprint annually and target net-zero manufacturing by 2035. Our vegetable-tanned leathers, water-recycling dye systems and solar-powered h" },
      { property: "og:title", content: "Sustainability · Lee Shoe Factory" },
      { property: "og:url", content: "/sustainability" },
    ],
    links: [{ rel: "canonical", href: "/sustainability" }],
  }),
  component: () => (
    <StaticPage title="Sustainability" tagline="Made to last, made responsibly">
      <h2 className="font-serif text-3xl mt-2">Our commitments</h2>
      <p>We measure our footprint annually and target net-zero manufacturing by 2035. Our vegetable-tanned leathers, water-recycling dye systems and solar-powered halls are steps on that road, not a destination.</p>

    </StaticPage>
  ),
});
