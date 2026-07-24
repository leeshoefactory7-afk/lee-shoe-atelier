import { createFileRoute } from "@tanstack/react-router";
import { StaticPage } from "@/components/site/StaticPage";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ · Lee Shoe Factory" },
      { name: "description", content: "**Where are your shoes made?**" },
      { property: "og:title", content: "FAQ · Lee Shoe Factory" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: () => (
    <StaticPage title="FAQ" tagline="Frequently asked">
      <h2 className="font-serif text-3xl mt-2">Questions & answers</h2>
      <p>**Where are your shoes made?**
At our own facilities. No outsourcing, no subcontractors.</p>
<p>**Do you offer custom orders?**
Yes — see our Manufacturing page for MOQ and lead times.</p>
<p>**How true to size is your sizing?**
See the Size Guide. Most styles run true to size.</p>
<p>**Do you offer wholesale?**
Yes — apply on the Wholesale page.</p>
<p>**What payment methods do you accept?**
Wire transfer, PayPal, and major cards via our sales team after checkout.</p>

    </StaticPage>
  ),
});
