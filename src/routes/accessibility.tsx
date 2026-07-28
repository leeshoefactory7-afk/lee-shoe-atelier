import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility · Lee Shoe Factory" },
      { name: "description", content: "We aim for WCAG 2.1 AA compliance across the website. If you encounter accessibility issues, please email info@leeshoefactory.com and we will remedy them" },
      { property: "og:title", content: "Accessibility · Lee Shoe Factory" },
      { property: "og:url", content: "/accessibility" },
    ],
    links: [{ rel: "canonical", href: "/accessibility" }],
  }),
  component: () => (
    <StaticPage title="Accessibility" tagline="Committed to inclusive design">
      <h2 className="font-serif text-3xl mt-2">Accessibility statement</h2>
      <p>We aim for WCAG 2.1 AA compliance across the website. If you encounter accessibility issues, please email info@leeshoefactory.com and we will remedy them promptly.</p>

    </StaticPage>
  ),
});
