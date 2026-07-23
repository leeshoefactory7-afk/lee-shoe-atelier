import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getBlogPost } from "@/lib/catalog.functions";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

const opts = (slug: string) => queryOptions({ queryKey: ["blog", slug], queryFn: () => getBlogPost({ data: { slug } }) });

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const r = await context.queryClient.ensureQueryData(opts(params.slug));
    if (!r) throw notFound();
    return r;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Post not found" }, { name: "robots", content: "noindex" }] };
    const p: any = loaderData.post;
    return {
      meta: [
        { title: `${p.title} · Lee Journal` },
        { name: "description", content: p.excerpt ?? "" },
        { property: "og:title", content: p.title },
        { property: "og:type", content: "article" },
        { property: "og:image", content: p.cover_image ?? "" },
        { property: "og:url", content: `/blog/${p.slug}` },
        { name: "twitter:image", content: p.cover_image ?? "" },
      ],
      links: [{ rel: "canonical", href: `/blog/${p.slug}` }],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const params = Route.useParams();
  const { data } = useSuspenseQuery(opts(params.slug));
  if (!data) return null;
  const p: any = data.post;
  return (
    <SiteLayout>
      <div className="container-lux pt-8">
        <Breadcrumbs items={[{ to: "/blog", label: "Journal" }, { label: p.title }]} />
      </div>
      {p.cover_image && (
        <div className="aspect-[21/9] overflow-hidden bg-muted mt-6">
          <img src={p.cover_image} alt={p.title} className="h-full w-full object-cover" />
        </div>
      )}
      <article className="container-lux py-12 max-w-3xl mx-auto">
        <div className="text-xs uppercase tracking-[0.24em] text-accent">{p.category}</div>
        <h1 className="font-serif text-4xl md:text-5xl mt-4">{p.title}</h1>
        <div className="text-sm text-muted-foreground mt-3">By {p.author} · {new Date(p.published_at).toLocaleDateString()}</div>
        <div className="mt-8 leading-relaxed text-foreground/85 whitespace-pre-line">{p.content ?? p.excerpt}</div>
      </article>
      {data.related.length > 0 && (
        <div className="container-lux py-12 border-t border-border">
          <h3 className="font-serif text-2xl mb-6">Related reading</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {data.related.map((r: any) => (
              <Link key={r.id} to="/blog/$slug" params={{ slug: r.slug }} className="group">
                <div className="aspect-[4/3] overflow-hidden bg-muted"><img src={r.cover_image} alt="" className="h-full w-full object-cover" /></div>
                <h4 className="font-serif text-xl mt-3 group-hover:text-accent">{r.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
