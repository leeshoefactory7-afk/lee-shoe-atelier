import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/care-guide")({
  head: () => ({
    meta: [
      { title: "Care Guide · Lee Shoe Factory" },
      { name: "description", content: "Wipe with a dry cloth after each wear. Condition leather monthly with a neutral cream. Store with cedar shoe trees. Rotate pairs — leather needs 24 hours t" },
      { property: "og:title", content: "Care Guide · Lee Shoe Factory" },
      { property: "og:url", content: "/care-guide" },
    ],
    links: [{ rel: "canonical", href: "/care-guide" }],
  }),
  component: () => (
    <StaticPage title="Care Guide" tagline="Keep them looking new">
      <h2 className="font-serif text-3xl mt-2">Leather care</h2>
      <p>Wipe with a dry cloth after each wear. Condition leather monthly with a neutral cream. Store with cedar shoe trees. Rotate pairs — leather needs 24 hours to dry between wears. Never machine-wash.</p>

    </StaticPage>
  ),
});
