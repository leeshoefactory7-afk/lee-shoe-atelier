import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { listProducts, listCategories } from "@/lib/catalog.functions";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Search } from "lucide-react";

const q = queryOptions({ queryKey: ["all-products"], queryFn: () => listProducts({ data: { limit: 200 } }) });
const cq = queryOptions({ queryKey: ["categories"], queryFn: () => listCategories() });

export const Route = createFileRoute("/products")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(q);
    context.queryClient.ensureQueryData(cq);
  },
  head: () => ({
    meta: [
      { title: "Shop All Footwear · Lee Shoe Factory" },
      { name: "description", content: "Browse the complete Lee Shoe Factory catalog — leather shoes, sneakers, boots, sports and formal footwear at factory-direct pricing." },
      { property: "og:title", content: "Shop All Footwear · Lee Shoe Factory" },
      { property: "og:description", content: "Browse the complete Lee Shoe Factory catalog." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { data: products } = useSuspenseQuery(q);
  const { data: categories } = useSuspenseQuery(cq);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [gender, setGender] = useState<string>("all");
  const [sort, setSort] = useState<string>("newest");

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== "all") {
      const c = categories.find((x) => x.slug === cat);
      if (c) list = list.filter((p) => p.category_id === c.id);
    }
    if (gender !== "all") list = list.filter((p: any) => p.gender === gender);
    if (search) {
      const s = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(s) || (p.brand ?? "").toLowerCase().includes(s));
    }
    if (sort === "price-asc") list.sort((a, b) => Number(a.discount_price ?? a.price) - Number(b.discount_price ?? b.price));
    if (sort === "price-desc") list.sort((a, b) => Number(b.discount_price ?? b.price) - Number(a.discount_price ?? a.price));
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, cat, gender, search, sort, categories]);

  return (
    <SiteLayout>
      <div className="container-lux pt-10">
        <Breadcrumbs items={[{ label: "Shop" }]} />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-accent">The Full Collection</p>
            <h1 className="font-serif text-5xl md:text-6xl mt-3">All Footwear</h1>
            <p className="mt-3 text-muted-foreground max-w-xl">Factory-direct pricing on {products.length} styles across our men's, women's, kids and sports collections.</p>
          </div>
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search shoes…"
              className="pl-9 pr-4 py-2.5 border border-input bg-background text-sm w-64 focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      <div className="container-lux mt-10 grid md:grid-cols-[220px_1fr] gap-10">
        <aside className="space-y-8 text-sm">
          <FilterGroup title="Category">
            <FilterLink label="All" active={cat === "all"} onClick={() => setCat("all")} />
            {categories.map((c) => <FilterLink key={c.id} label={c.name} active={cat === c.slug} onClick={() => setCat(c.slug)} />)}
          </FilterGroup>
          <FilterGroup title="Gender">
            {["all", "men", "women", "unisex", "kids"].map((g) => (
              <FilterLink key={g} label={g[0].toUpperCase() + g.slice(1)} active={gender === g} onClick={() => setGender(g)} />
            ))}
          </FilterGroup>
          <FilterGroup title="Sort by">
            {[
              ["newest", "Newest"], ["price-asc", "Price: low to high"],
              ["price-desc", "Price: high to low"], ["name", "Name A–Z"],
            ].map(([v, l]) => (
              <FilterLink key={v} label={l} active={sort === v} onClick={() => setSort(v)} />
            ))}
          </FilterGroup>
        </aside>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">{filtered.length} products</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          {!filtered.length && <div className="text-center py-24 text-muted-foreground">No products match those filters.</div>}
        </div>
      </div>
      <div className="h-24" />
    </SiteLayout>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.24em] mb-3 text-muted-foreground">{title}</h3>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}
function FilterLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <li>
      <button onClick={onClick} className={`text-left w-full py-1 ${active ? "text-accent font-medium" : "text-foreground/80 hover:text-foreground"}`}>{label}</button>
    </li>
  );
}
