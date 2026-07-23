import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · Lee Shoe Factory" },
      { name: "description", content: "This page describes how Lee Shoe Factory collects, uses and protects the personal information you share with us. We collect only what is necessary to fulfi" },
      { property: "og:title", content: "Privacy Policy · Lee Shoe Factory" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <StaticPage title="Privacy Policy" tagline="How we handle your data">
      <h2 className="font-serif text-3xl mt-2">Privacy</h2>
      <p>This page describes how Lee Shoe Factory collects, uses and protects the personal information you share with us. We collect only what is necessary to fulfil your order, deliver our service and comply with the law. Contact privacy@leeshoefactory.com to access or delete your data.</p>

    </StaticPage>
  ),
});
