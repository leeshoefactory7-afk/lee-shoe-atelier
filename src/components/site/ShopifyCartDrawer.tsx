import { useEffect, useState } from "react";
import { ExternalLink, Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useShopifyCart } from "@/stores/shopifyCartStore";

export function ShopifyCartDrawer() {
  const [open, setOpen] = useState(false);
  const items = useShopifyCart((s) => s.items);
  const isLoading = useShopifyCart((s) => s.isLoading);
  const isSyncing = useShopifyCart((s) => s.isSyncing);
  const updateQuantity = useShopifyCart((s) => s.updateQuantity);
  const removeItem = useShopifyCart((s) => s.removeItem);
  const getCheckoutUrl = useShopifyCart((s) => s.getCheckoutUrl);
  const syncCart = useShopifyCart((s) => s.syncCart);

  const totalItems = items.reduce((n, i) => n + i.quantity, 0);
  const totalPrice = items.reduce((n, i) => n + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "";

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  function handleCheckout() {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 hover:text-accent relative"
        aria-label="Shopify cart"
      >
        <ShoppingBag className="size-5" />
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-accent text-accent-foreground text-[10px] grid place-items-center px-1 font-medium">
            {totalItems}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-full sm:max-w-md bg-background border-l border-border flex flex-col shadow-2xl">
            <header className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="font-serif text-2xl">Shopping Cart</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground text-2xl leading-none">×</button>
            </header>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="size-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.variantId} className="flex gap-4">
                      <div className="w-16 h-20 bg-muted overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.product.node.title}</h3>
                        {item.selectedOptions.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.selectedOptions.map((o) => o.value).join(" · ")}
                          </p>
                        )}
                        <p className="text-sm mt-1">
                          {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-input">
                            <button
                              className="px-2 py-1"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              aria-label="Decrease"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="px-3 text-sm">{item.quantity}</span>
                            <button
                              className="px-2 py-1"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              aria-label="Increase"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"
                          >
                            <Trash2 className="size-3" /> Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Total</span>
                  <span className="font-medium">{currency} {totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading || isSyncing}
                  className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-wide hover:bg-primary/90 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="size-4" /> Checkout with Shopify
                    </>
                  )}
                </button>
                <p className="text-[11px] text-muted-foreground text-center">
                  Secure payment handled by Shopify · Opens in a new tab
                </p>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
