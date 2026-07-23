import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/warranty")({
  head: () => ({
    meta: [
      { title: "Warranty · Lee Shoe Factory" },
      { name: "description", content: "Every pair of Lee shoes carries a 12-month warranty against manufacturing defects — including sole delamination, stitching failure and hardware breakage. N" },
      { property: "og:title", content: "Warranty · Lee Shoe Factory" },
      { property: "og:url", content: "/warranty" },
    ],
    links: [{ rel: "canonical", href: "/warranty" }],
  }),
  component: () => (
    <StaticPage title="Warranty" tagline="12-month tread warranty">
      <h2 className="font-serif text-3xl mt-2">Coverage</h2>
      <p>Every pair of Lee shoes carries a 12-month warranty against manufacturing defects — including sole delamination, stitching failure and hardware breakage. Normal wear, water damage and improper care are not covered.</p>

    </StaticPage>
  ),
});
