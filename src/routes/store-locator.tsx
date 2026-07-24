import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/store-locator")({
  head: () => ({
    meta: [
      { title: "Store Locator · Lee Shoe Factory" },
      { name: "description", content: "Our shoes are stocked in 480+ retailers across 60 countries. Enter your city on the Contact page and our team will point you to the closest partner." },
      { property: "og:title", content: "Store Locator · Lee Shoe Factory" },
      { property: "og:url", content: "/store-locator" },
    ],
    links: [{ rel: "canonical", href: "/store-locator" }],
  }),
  component: () => (
    <StaticPage title="Store Locator" tagline="Find Lee near you">
      <h2 className="font-serif text-3xl mt-2">Retail partners</h2>
      <p>Our shoes are stocked in 480+ retailers across 60 countries. Enter your city on the Contact page and our team will point you to the closest partner.</p>

    </StaticPage>
  ),
});
