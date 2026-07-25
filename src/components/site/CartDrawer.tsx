import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/site-config";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const items = useCart((s) => s.items);
  const updateQty = useCart((s) => s.updateQty);
  const remove = useCart((s) => s.remove);
  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  const count = items.reduce((n, i) => n + i.quantity, 0);

  return (
    <>
      <button onClick={() => setOpen(true)} className="p-2.5 md:p-2 hover:bg-muted rounded transition-colors relative" aria-label="Cart">
        <ShoppingBag className="size-4 md:size-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] rounded-full size-4 flex items-center justify-center font-medium">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="w-full max-w-md bg-background flex flex-col h-full">
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-border">
              <h2 className="font-serif text-xl md:text-2xl">Your cart</h2>
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-2.5 hover:bg-muted rounded transition-colors"><X className="size-5" /></button>
            </div>
            <div className="flex-1 overflow-auto p-4 md:p-5 space-y-4">
              {items.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">Your cart is empty.</p>}
              {items.map((it) => (
                <div key={`${it.productId}-${it.size}-${it.color}`} className="grid grid-cols-[56px_minmax(0,1fr)_40px] gap-3 items-start border-b border-border pb-4">
                  <img src={it.image} alt="" className="w-14 h-[72px] object-cover bg-muted shrink-0 rounded" />
                  <div className="min-w-0">
                    <Link
                      to="/products/$slug"
                      params={{ slug: it.slug }}
                      onClick={() => setOpen(false)}
                      className="text-xs md:text-sm font-medium hover:text-accent line-clamp-2 block"
                    >
                      {it.name}
                    </Link>
                    <div className="text-xs text-muted-foreground mt-1.5 truncate">
                      {[it.color, it.size].filter(Boolean).join(" · ")}
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center border border-input rounded">
                        <button onClick={() => updateQty(it.productId, it.quantity - 1, it.size, it.color)} className="px-2.5 py-1.5 hover:bg-muted transition-colors" aria-label="Decrease quantity"><Minus className="size-3.5" /></button>
                        <span className="px-2.5 text-sm font-medium">{it.quantity}</span>
                        <button onClick={() => updateQty(it.productId, it.quantity + 1, it.size, it.color)} className="px-2.5 py-1.5 hover:bg-muted transition-colors" aria-label="Increase quantity"><Plus className="size-3.5" /></button>
                      </div>
                      <div className="text-xs md:text-sm font-medium shrink-0">{formatPrice(it.price * it.quantity)}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(it.productId, it.size, it.color)}
                    className="text-muted-foreground hover:text-destructive p-2 hover:bg-muted rounded transition-colors shrink-0 self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <div className="border-t border-border p-4 md:p-5 space-y-3">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
                <Link to="/checkout" onClick={() => setOpen(false)} className="block w-full bg-primary text-primary-foreground py-3 text-center text-sm font-medium tracking-wide hover:bg-primary/90 rounded transition-colors">
                  Checkout
                </Link>
                <Link to="/cart" onClick={() => setOpen(false)} className="block w-full border border-input py-3 text-center text-sm hover:bg-muted transition-colors rounded">
                  View cart
                </Link>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
