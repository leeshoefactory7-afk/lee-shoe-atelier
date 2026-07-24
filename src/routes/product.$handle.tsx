import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { useShopifyCart } from "@/stores/shopifyCartStore";

const productOpts = (handle: string) =>
  queryOptions({
    queryKey: ["shopify", "product", handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.product ?? null;
    },
  });

export const Route = createFileRoute("/product/$handle")({
  loader: async ({ context, params }) => {
    const product = await context.queryClient.ensureQueryData(productOpts(params.handle));
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const p: any = loaderData;
    const title = p ? `${p.title} · Lee Shoe Factory` : "Product · Lee Shoe Factory";
    const desc = (p?.description ?? "Premium footwear direct from the factory.").slice(0, 155);
    const image = p?.images?.edges?.[0]?.node?.url;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image ? [{ property: "og:image" as const, content: image }, { name: "twitter:image" as const, content: image }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-lux py-24 text-center">
        <h1 className="font-serif text-4xl">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block underline">Back to shop</Link>
      </div>
    </SiteLayout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product } = useSuspenseQuery(productOpts(handle));
  const addItem = useShopifyCart((s) => s.addItem);
  const isLoading = useShopifyCart((s) => s.isLoading);
  const [variantId, setVariantId] = useState<string>(product?.variants.edges[0]?.node.id ?? "");

  if (!product) return null;

  const variant =
    product.variants.edges.find((v: any) => v.node.id === variantId)?.node ?? product.variants.edges[0]?.node;
  const image = product.images.edges[0]?.node;

  async function handleAdd() {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success("Added to cart");
  }

  return (
    <SiteLayout>
      <div className="container-lux py-16 grid md:grid-cols-2 gap-14">
        <div className="aspect-[4/5] bg-muted overflow-hidden">
          {image && <img src={image.url} alt={image.altText ?? product.title} className="w-full h-full object-cover" />}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Lee Shoe Factory</p>
          <h1 className="font-serif text-4xl md:text-5xl mt-2">{product.title}</h1>
          <p className="mt-3 text-2xl">
            {variant?.price.currencyCode} {parseFloat(variant?.price.amount ?? "0").toFixed(2)}
          </p>
          {product.description && (
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</p>
          )}

          {product.variants.edges.length > 1 && (
            <div className="mt-8">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Variant</label>
              <select
                value={variantId}
                onChange={(e) => setVariantId(e.target.value)}
                className="mt-2 w-full border border-input bg-background px-3 py-2.5"
              >
                {product.variants.edges.map((v: any) => (
                  <option key={v.node.id} value={v.node.id} disabled={!v.node.availableForSale}>
                    {v.node.title} {!v.node.availableForSale ? "(sold out)" : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleAdd}
            disabled={!variant?.availableForSale || isLoading}
            className="mt-8 w-full bg-primary text-primary-foreground py-4 text-sm tracking-wide hover:bg-primary/90 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : variant?.availableForSale ? "Add to cart" : "Sold out"}
          </button>
          <Link to="/shop" className="mt-4 block text-center text-sm underline">← Back to shop</Link>
        </div>
      </div>
    </SiteLayout>
  );
}
