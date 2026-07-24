import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { getProductBySlug } from "@/lib/catalog.functions";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ProductCard, Stars } from "@/components/site/ProductCard";
import { formatPrice } from "@/lib/site-config";
import { useCart, useWishlist } from "@/lib/cart-store";
import { useState } from "react";
import { toast } from "sonner";
import { Heart, Minus, Plus, ShieldCheck, Truck, Undo2 } from "lucide-react";

const opts = (slug: string) => queryOptions({ queryKey: ["product", slug], queryFn: () => getProductBySlug({ data: { slug } }) });

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ context, params }) => {
    const r = await context.queryClient.ensureQueryData(opts(params.slug));
    if (!r) throw notFound();
    return r;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product not found · Lee Shoe Factory" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} · Lee Shoe Factory` },
        { name: "description", content: p.short_description ?? `Shop the ${p.name} at Lee Shoe Factory. Factory-direct pricing on premium footwear.` },
        { property: "og:title", content: p.name },
        { property: "og:description", content: p.short_description ?? "" },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${p.slug}` },
        { property: "og:image", content: p.main_image ?? "" },
        { name: "twitter:image", content: p.main_image ?? "" },
      ],
      links: [{ rel: "canonical", href: `/products/${p.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          image: p.images ?? [p.main_image],
          description: p.short_description,
          brand: { "@type": "Brand", name: p.brand ?? "Lee" },
          sku: p.sku,
          offers: {
            "@type": "Offer",
            price: p.discount_price ?? p.price,
            priceCurrency: "USD",
            availability: (p.stock ?? 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        }),
      }],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const data = Route.useLoaderData() as any;
  const { product, reviews, related } = data as { product: any; reviews: any[]; related: any[] };
  const [size, setSize] = useState<string | undefined>(product.sizes?.[0]);
  const [color, setColor] = useState<string | undefined>(product.colors?.[0]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(product.main_image ?? product.images?.[0] ?? "");
  const add = useCart((s) => s.add);
  const wish = useWishlist();
  const navigate = useNavigate();
  const price = Number(product.discount_price ?? product.price);
  const avg = reviews.length ? reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length : 0;

  function addToCart() {
    add({
      productId: product.id, slug: product.slug, name: product.name,
      image: product.main_image ?? "", price, size, color, quantity: qty,
    });
    toast.success("Added to cart");
  }

  return (
    <SiteLayout>
      <div className="container-lux pt-8">
        <Breadcrumbs items={[{ to: "/products", label: "Shop" }, { label: product.name }]} />
        <div className="grid md:grid-cols-[1.15fr_1fr] gap-14 mt-8">
          <div>
            <div className="aspect-square overflow-hidden bg-muted">
              {activeImg && <img src={activeImg} alt={product.name} className="h-full w-full object-cover" />}
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {(product.images ?? []).slice(0, 8).map((img: string) => (
                <button key={img} onClick={() => setActiveImg(img)} className={`aspect-square overflow-hidden bg-muted ${activeImg === img ? "ring-2 ring-accent" : ""}`}>
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div>
            {product.brand && <div className="text-xs uppercase tracking-[0.24em] text-accent">{product.brand}</div>}
            <h1 className="font-serif text-4xl md:text-5xl mt-2">{product.name}</h1>
            {reviews.length > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <Stars value={avg} />
                <span className="text-xs text-muted-foreground">{avg.toFixed(1)} · {reviews.length} reviews</span>
              </div>
            )}
            <div className="mt-5 flex items-baseline gap-3">
              <div className="font-serif text-3xl">{formatPrice(price)}</div>
              {product.discount_price && (
                <div className="text-muted-foreground line-through">{formatPrice(product.price)}</div>
              )}
            </div>
            {product.short_description && <p className="mt-5 text-muted-foreground">{product.short_description}</p>}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-8">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Color · {color}</div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c: string) => (
                    <button key={c} onClick={() => setColor(c)} className={`px-4 py-2 border text-sm ${color === c ? "border-accent text-accent" : "border-input"}`}>{c}</button>
                  ))}
                </div>
              </div>
            )}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  <span>Size · {size}</span>
                  <Link to="/size-guide" className="underline underline-offset-2">Size guide</Link>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((s: string) => (
                    <button key={s} onClick={() => setSize(s)} className={`py-3 border text-sm ${size === s ? "border-accent text-accent" : "border-input hover:border-foreground"}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-8 flex items-stretch gap-3">
              <div className="flex items-center border border-input">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3"><Minus className="size-4" /></button>
                <div className="px-4 text-sm w-10 text-center">{qty}</div>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-3"><Plus className="size-4" /></button>
              </div>
              <button onClick={addToCart} className="flex-1 bg-primary text-primary-foreground py-3 text-sm tracking-wide hover:bg-primary/90">Add to cart</button>
              <button
                onClick={() => { addToCart(); navigate({ to: "/checkout" }); }}
                className="bg-accent text-accent-foreground px-6 py-3 text-sm tracking-wide hover:brightness-95"
              >Buy now</button>
              <button onClick={() => { wish.toggle(product.id); toast.success(wish.has(product.id) ? "Removed from wishlist" : "Added to wishlist"); }} className={`p-3 border border-input ${wish.has(product.id) ? "text-accent" : ""}`}>
                <Heart className="size-4" fill={wish.has(product.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 text-xs">
              <Perk icon={Truck} label="Worldwide DDP shipping" />
              <Perk icon={ShieldCheck} label="12-month tread warranty" />
              <Perk icon={Undo2} label="30-day easy returns" />
            </div>

            <div className="mt-10 space-y-4">
              {product.description && (
                <details open className="border-t border-border pt-4">
                  <summary className="cursor-pointer font-serif text-xl">Description</summary>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed whitespace-pre-line">{product.description}</p>
                </details>
              )}
              {product.features && product.features.length > 0 && (
                <details className="border-t border-border pt-4">
                  <summary className="cursor-pointer font-serif text-xl">Features & materials</summary>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {product.features.map((f: string) => <li key={f}>• {f}</li>)}
                    {product.material && <li>• Material: {product.material}</li>}
                    {product.weight_grams && <li>• Weight: {product.weight_grams}g / pair</li>}
                  </ul>
                </details>
              )}
              <details className="border-t border-border pt-4">
                <summary className="cursor-pointer font-serif text-xl">Shipping & returns</summary>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  Worldwide shipping via DDP to 60+ countries. Standard delivery 5–8 business days. Free returns within 30 days.
                </p>
              </details>
              {product.care_instructions && (
                <details className="border-t border-border pt-4">
                  <summary className="cursor-pointer font-serif text-xl">Care instructions</summary>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{product.care_instructions}</p>
                </details>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <section className="mt-24 border-t border-border pt-16">
            <h2 className="font-serif text-3xl">Customer reviews</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {reviews.slice(0, 6).map((r: any) => (
                <div key={r.id} className="border border-border p-6">
                  <Stars value={r.rating} />
                  <div className="mt-3 font-serif text-lg">{r.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <img src={r.customer_avatar ?? ""} alt="" className="size-8 rounded-full" />
                    <div>{r.customer_name} · <span className="text-muted-foreground">{r.customer_country}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-24 border-t border-border pt-16">
            <h2 className="font-serif text-3xl mb-8">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p: any) => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>
        )}
      </div>
      <div className="h-24" />
    </SiteLayout>
  );
}

function Perk({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="border border-border p-3 flex flex-col items-center text-center gap-1">
      <Icon className="size-4 text-accent" />
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}
