import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PRODUCTS_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { useShopifyCart } from "@/stores/shopifyCartStore";
import { toast } from "sonner";

const productsOpts = queryOptions({
  queryKey: ["shopify", "products"],
  queryFn: async () => {
    const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 50, query: null });
    return (data?.data?.products?.edges ?? []) as ShopifyProduct[];
  },
});

export const Route = createFileRoute("/shop")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsOpts),
  head: () => ({
    meta: [
      { title: "Shop · Lee Shoe Factory" },
      { name: "description", content: "Buy premium leather shoes, sneakers and boots directly from Lee Shoe Factory with secure Shopify checkout." },
      { property: "og:title", content: "Shop · Lee Shoe Factory" },
      { property: "og:description", content: "Buy premium footwear direct from the factory with secure checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { data: products } = useSuspenseQuery(productsOpts);

  return (
    <SiteLayout>
      <div className="container-lux py-16">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Direct from the factory</p>
          <h1 className="font-serif text-5xl md:text-6xl mt-3">Shop</h1>
          <p className="mt-4 text-muted-foreground">
            Live Shopify catalog with secure hosted checkout — cards, Apple Pay, Google Pay and more.
          </p>
        </div>

        {products.length === 0 ? (
          <EmptyStore />
        ) : (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductTile key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}

function EmptyStore() {
  return (
    <div className="mt-16 border border-dashed border-border py-20 text-center">
      <p className="font-serif text-2xl">No products yet</p>
      <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
        Your Shopify store is connected and ready to accept payments. Add your first product from the chat —
        tell me the name, price, and description and I'll create it in Shopify.
      </p>
    </div>
  );
}

function ProductTile({ product }: { product: ShopifyProduct }) {
  const addItem = useShopifyCart((s) => s.addItem);
  const isLoading = useShopifyCart((s) => s.isLoading);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  async function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success("Added to cart");
  }

  return (
    <div className="group">
      <Link to="/product/$handle" params={{ handle: product.node.handle }} className="block">
        <div className="aspect-[4/5] bg-muted overflow-hidden">
          {image ? (
            <img
              src={image.url}
              alt={image.altText ?? product.node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-xs text-muted-foreground">No image</div>
          )}
        </div>
        <h3 className="mt-4 font-serif text-lg">{product.node.title}</h3>
        <p className="text-sm text-muted-foreground">
          {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
        </p>
      </Link>
      <button
        onClick={handleAdd}
        disabled={!variant?.availableForSale || isLoading}
        className="mt-3 w-full border border-primary py-2.5 text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading ? <Loader2 className="size-3 animate-spin" /> : variant?.availableForSale ? "Add to cart" : "Sold out"}
      </button>
    </div>
  );
}
