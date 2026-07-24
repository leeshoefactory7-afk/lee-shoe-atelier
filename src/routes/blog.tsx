import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { listBlogPosts } from "@/lib/catalog.functions";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

const q = queryOptions({ queryKey: ["blog"], queryFn: () => listBlogPosts() });

export const Route = createFileRoute("/blog")({
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  head: () => ({
    meta: [
      { title: "The Journal · Lee Shoe Factory" },
      { name: "description", content: "Craft, materials, manufacturing and industry insight from the Lee Shoe Factory atelier." },
      { property: "og:title", content: "The Journal · Lee Shoe Factory" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogList,
});

function BlogList() {
  const { data: posts } = useSuspenseQuery(q);
  return (
    <SiteLayout>
      <div className="container-lux py-16">
        <Breadcrumbs items={[{ label: "Journal" }]} />
        <h1 className="font-serif text-5xl md:text-6xl mt-6">The Journal</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Craft, materials and the making of premium footwear.</p>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {posts.map((p: any) => (
            <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                {p.cover_image && <img src={p.cover_image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
              </div>
              <div className="text-xs uppercase tracking-[0.24em] text-accent mt-4">{p.category}</div>
              <h2 className="font-serif text-2xl mt-2 group-hover:text-accent transition-colors">{p.title}</h2>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
              <div className="text-xs text-muted-foreground mt-3">{p.author} · {new Date(p.published_at).toLocaleDateString()}</div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
