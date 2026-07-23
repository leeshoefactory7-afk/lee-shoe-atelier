import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/materials")({
  head: () => ({
    meta: [
      { title: "Materials · Lee Shoe Factory" },
      { name: "description", content: "Full-grain leathers from LWG-certified tanneries in Italy and Turkey. Rubber compounds from Malaysia. Cotton laces from Portugal. Every component traceable" },
      { property: "og:title", content: "Materials · Lee Shoe Factory" },
      { property: "og:url", content: "/materials" },
    ],
    links: [{ rel: "canonical", href: "/materials" }],
  }),
  component: () => (
    <StaticPage title="Materials" tagline="Sourced with intent">
      <h2 className="font-serif text-3xl mt-2">What goes into a Lee shoe</h2>
      <p>Full-grain leathers from LWG-certified tanneries in Italy and Turkey. Rubber compounds from Malaysia. Cotton laces from Portugal. Every component traceable to source.</p>

    </StaticPage>
  ),
});
