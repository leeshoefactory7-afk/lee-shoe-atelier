import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { getCategoryBySlug } from "@/lib/catalog.functions";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

const opts = (slug: string) => queryOptions({ queryKey: ["category", slug], queryFn: () => getCategoryBySlug({ data: { slug } }) });

export const Route = createFileRoute("/category/$slug")({
  loader: async ({ context, params }) => {
    const r = await context.queryClient.ensureQueryData(opts(params.slug));
    if (!r) throw notFound();
    return r;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Category · Lee Shoe Factory" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.category;
    return {
      meta: [
        { title: `${c.name} · Lee Shoe Factory` },
        { name: "description", content: c.seo_description ?? c.description ?? `Shop ${c.name} at Lee Shoe Factory.` },
        { property: "og:title", content: `${c.name} · Lee Shoe Factory` },
        { property: "og:description", content: c.description ?? "" },
        { property: "og:image", content: c.image_url ?? "" },
        { property: "og:url", content: `/category/${c.slug}` },
      ],
      links: [{ rel: "canonical", href: `/category/${c.slug}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const params = Route.useParams();
  const { data } = useSuspenseQuery(opts(params.slug));
  if (!data) return null;
  const { category, products } = data;
  return (
    <SiteLayout>
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        {category.image_url && <img src={category.image_url} alt={category.name} className="absolute inset-0 h-full w-full object-cover opacity-50" />}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
        <div className="relative container-lux py-24 md:py-32">
          <Breadcrumbs items={[{ to: "/products", label: "Shop" }, { label: category.name }]} />
          <h1 className="font-serif text-5xl md:text-7xl mt-6">{category.name}</h1>
          {category.description && <p className="mt-4 max-w-xl text-primary-foreground/80">{category.description}</p>}
        </div>
      </section>
      <div className="container-lux py-16">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">{products.length} products</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </SiteLayout>
  );
}
