import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/site-config";
import { Minus, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart · Lee Shoe Factory" },
      { name: "description", content: "Review the items in your cart before checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const updateQty = useCart((s) => s.updateQty);
  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  const shipping = subtotal > 200 ? 0 : items.length ? 25 : 0;

  return (
    <SiteLayout>
      <div className="container-lux py-16">
        <h1 className="font-serif text-5xl">Shopping Cart</h1>
        {!items.length ? (
          <div className="mt-16 text-center py-16 border border-dashed border-border">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link to="/products" className="mt-4 inline-block bg-primary text-primary-foreground px-6 py-3 text-sm">Shop products</Link>
          </div>
        ) : (
          <div className="mt-10 grid md:grid-cols-[1.6fr_1fr] gap-14">
            <div className="divide-y divide-border">
              {items.map((it) => (
                <div key={`${it.productId}-${it.size}-${it.color}`} className="grid grid-cols-[100px_1fr_auto] gap-4 py-6 items-center">
                  <img src={it.image} alt={it.name} className="w-24 h-28 object-cover bg-muted" />
                  <div>
                    <Link to="/products/$slug" params={{ slug: it.slug }} className="font-serif text-xl hover:text-accent">{it.name}</Link>
                    <div className="text-xs text-muted-foreground mt-1">
                      {[it.color, it.size].filter(Boolean).join(" · ")}
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center border border-input">
                        <button onClick={() => updateQty(it.productId, it.quantity - 1, it.size, it.color)} className="px-2 py-1"><Minus className="size-3" /></button>
                        <div className="px-3 text-sm">{it.quantity}</div>
                        <button onClick={() => updateQty(it.productId, it.quantity + 1, it.size, it.color)} className="px-2 py-1"><Plus className="size-3" /></button>
                      </div>
                      <button onClick={() => remove(it.productId, it.size, it.color)} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1">
                        <Trash2 className="size-3" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-medium">{formatPrice(it.price * it.quantity)}</div>
                </div>
              ))}
            </div>
            <aside className="bg-muted/50 p-8 h-fit">
              <h2 className="font-serif text-2xl">Order summary</h2>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span>Estimated shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
                <div className="border-t border-border pt-3 flex justify-between text-lg font-medium">
                  <span>Total</span><span>{formatPrice(subtotal + shipping)}</span>
                </div>
              </div>
              <Link to="/checkout" className="mt-8 block text-center bg-primary text-primary-foreground py-4 text-sm tracking-wide hover:bg-primary/90">Proceed to checkout</Link>
              <Link to="/products" className="mt-3 block text-center text-sm underline underline-offset-2">Continue shopping</Link>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
