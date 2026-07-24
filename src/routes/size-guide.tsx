import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size Guide · Lee Shoe Factory" },
      { name: "description", content: "Lee shoes run true to size for most feet. If you're between sizes we recommend sizing up. Full size conversion chart below." },
      { property: "og:title", content: "Size Guide · Lee Shoe Factory" },
      { property: "og:url", content: "/size-guide" },
    ],
    links: [{ rel: "canonical", href: "/size-guide" }],
  }),
  component: () => (
    <StaticPage title="Size Guide" tagline="Find your perfect fit">
      <h2 className="font-serif text-3xl mt-2">Sizing</h2>
      <p>Lee shoes run true to size for most feet. If you're between sizes we recommend sizing up. Full size conversion chart below.</p>
<p>**How to measure**
1. Place your foot on a piece of paper against a wall
2. Mark the tip of your longest toe
3. Measure heel-to-mark in centimetres
4. Match to the chart</p>
<p>Refer to individual product pages for last-specific advice.</p>

    </StaticPage>
  ),
});
