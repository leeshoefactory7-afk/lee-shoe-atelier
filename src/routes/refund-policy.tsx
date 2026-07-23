import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy · Lee Shoe Factory" },
      { name: "description", content: "Refunds are processed to the original payment method within 5 business days of receiving the returned item at our warehouse. Original shipping charges are " },
      { property: "og:title", content: "Refund Policy · Lee Shoe Factory" },
      { property: "og:url", content: "/refund-policy" },
    ],
    links: [{ rel: "canonical", href: "/refund-policy" }],
  }),
  component: () => (
    <StaticPage title="Refund Policy" tagline="Refund terms">
      <h2 className="font-serif text-3xl mt-2">Refunds</h2>
      <p>Refunds are processed to the original payment method within 5 business days of receiving the returned item at our warehouse. Original shipping charges are non-refundable unless the return is due to our error.</p>

    </StaticPage>
  ),
});
