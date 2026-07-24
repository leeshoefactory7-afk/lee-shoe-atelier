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
      <button onClick={() => setOpen(true)} className="p-2 hover:text-accent relative" aria-label="Cart">
        <ShoppingBag className="size-5" />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] rounded-full size-4 flex items-center justify-center">
            {count}
          </span>
        )}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="w-full max-w-md bg-background flex flex-col h-full">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-serif text-2xl">Your cart</h2>
              <button onClick={() => setOpen(false)} aria-label="Close"><X className="size-5" /></button>
            </div>
            <div className="flex-1 overflow-auto p-5 space-y-4">
              {items.length === 0 && <p className="text-sm text-muted-foreground">Your cart is empty.</p>}
              {items.map((it) => (
                <div key={`${it.productId}-${it.size}-${it.color}`} className="flex gap-3">
                  <img src={it.image} alt="" className="w-20 h-24 object-cover bg-muted" />
                  <div className="flex-1 min-w-0">
                    <Link to="/products/$slug" params={{ slug: it.slug }} onClick={() => setOpen(false)} className="text-sm font-medium hover:text-accent line-clamp-2">
                      {it.name}
                    </Link>
                    <div className="text-xs text-muted-foreground mt-1">{[it.color, it.size].filter(Boolean).join(" · ")}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-input">
                        <button onClick={() => updateQty(it.productId, it.quantity - 1, it.size, it.color)} className="px-2 py-1"><Minus className="size-3" /></button>
                        <span className="px-2 text-sm">{it.quantity}</span>
                        <button onClick={() => updateQty(it.productId, it.quantity + 1, it.size, it.color)} className="px-2 py-1"><Plus className="size-3" /></button>
                      </div>
                      <div className="text-sm">{formatPrice(it.price * it.quantity)}</div>
                    </div>
                  </div>
                  <button onClick={() => remove(it.productId, it.size, it.color)} className="text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-3">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <Link to="/checkout" onClick={() => setOpen(false)} className="block w-full bg-primary text-primary-foreground py-3 text-center text-sm tracking-wide hover:bg-primary/90">
                  Checkout
                </Link>
                <Link to="/cart" onClick={() => setOpen(false)} className="block w-full border border-input py-3 text-center text-sm">
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
