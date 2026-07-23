import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy · Lee Shoe Factory" },
      { name: "description", content: "We use essential cookies for the shopping cart, and analytical cookies to understand traffic patterns. You can disable cookies in your browser settings wit" },
      { property: "og:title", content: "Cookie Policy · Lee Shoe Factory" },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => (
    <StaticPage title="Cookie Policy" tagline="How we use cookies">
      <h2 className="font-serif text-3xl mt-2">Cookies</h2>
      <p>We use essential cookies for the shopping cart, and analytical cookies to understand traffic patterns. You can disable cookies in your browser settings without affecting core functionality.</p>

    </StaticPage>
  ),
});
