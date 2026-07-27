import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart } from "@/lib/cart-store";
import { formatPrice, generateOrderNumber } from "@/lib/site-config";
import { useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { submitOrder } from "@/lib/orders.functions";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout · Lee Shoe Factory" },
      { name: "description", content: "Complete your order at Lee Shoe Factory." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const submit = useServerFn(submitOrder);
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const subtotal = items.reduce((n: number, i: any) => n + i.price * i.quantity, 0);
  const shipping = subtotal > 200 ? 0 : items.length ? 25 : 0;
  const total = subtotal + shipping;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!items.length) return toast.error("Your cart is empty");
    setBusy(true);
    try {
      const fd = new FormData(e.currentTarget);
      const orderNumber = generateOrderNumber();
      const payload = {
        order_number: orderNumber,
        customer_name: String(fd.get("customer_name") ?? ""),
        company_name: String(fd.get("company_name") ?? "") || undefined,
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? "") || undefined,
        country: String(fd.get("country") ?? "") || undefined,
        city: String(fd.get("city") ?? "") || undefined,
        postal_code: String(fd.get("postal_code") ?? "") || undefined,
        shipping_address: String(fd.get("shipping_address") ?? "") || undefined,
        billing_address: String(fd.get("billing_address") ?? "") || undefined,
        notes: String(fd.get("notes") ?? "") || undefined,
        subtotal, shipping, total,
        items: items.map((i) => ({
          product_id: i.productId,
          product_name: i.name,
          product_image: i.image,
          size: i.size,
          color: i.color,
          quantity: i.quantity,
          unit_price: i.price,
        })),
      };
      const { order_number } = await submit({ data: payload });
      clear();
      navigate({ to: "/order-success/$orderNumber", params: { orderNumber: order_number }, search: { email: payload.email } });

    } catch (err: any) {
      toast.error(err?.message ?? "Order failed");
    } finally { setBusy(false); }
  }

  return (
    <SiteLayout>
      <div className="container-lux py-16">
        <h1 className="font-serif text-5xl">Checkout</h1>
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-14 mt-10">
          <form onSubmit={onSubmit} className="space-y-8">
            <Fieldset title="Contact">
              <Grid>
                <Input name="customer_name" label="Full name" required />
                <Input name="company_name" label="Company (optional)" />
                <Input name="email" type="email" label="Email" required />
                <Input name="phone" label="Phone" />
              </Grid>
            </Fieldset>
            <Fieldset title="Shipping address">
              <Grid>
                <Input name="country" label="Country" required />
                <Input name="city" label="City" required />
                <Input name="postal_code" label="Postal code" required />
                <Input name="shipping_address" label="Address line" required full />
              </Grid>
            </Fieldset>
            <Fieldset title="Billing address">
              <Input name="billing_address" label="Billing address (leave empty to use shipping)" full />
            </Fieldset>
            <Fieldset title="Order notes">
              <textarea name="notes" rows={3} className="w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent" placeholder="Any special instructions?" />
            </Fieldset>
            <button disabled={busy} className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-wide hover:bg-primary/90 disabled:opacity-60">
              {busy ? "Placing order…" : "Place order"}
            </button>
            <p className="text-xs text-muted-foreground text-center">Orders are submitted to our sales team. You'll receive a confirmation and payment instructions by email.</p>
          </form>
          <aside className="bg-muted/50 p-8 h-fit">
            <h2 className="font-serif text-2xl">Your order</h2>
            <div className="mt-6 space-y-4 max-h-80 overflow-auto">
              {items.map((it: any) => (
                <div key={`${it.productId}-${it.size}-${it.color}`} className="flex gap-3 text-sm">
                  <img src={it.image} alt="" className="w-14 h-16 object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{it.name}</div>
                    <div className="text-xs text-muted-foreground">{[it.color, it.size].filter(Boolean).join(" · ")} · Qty {it.quantity}</div>
                  </div>
                  <div>{formatPrice(it.price * it.quantity)}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
              <div className="flex justify-between text-lg font-medium pt-2 border-t border-border">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link to="/cart" className="mt-6 block text-center underline underline-offset-2 text-sm">← Back to cart</Link>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-serif text-xl mb-4">{title}</h3>
      {children}
    </div>
  );
}
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}
function Input({ label, full, ...rest }: { label: string; full?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block text-sm ${full ? "md:col-span-2" : ""}`}>
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1 w-full border border-input bg-background px-3 py-2.5 focus:outline-none focus:border-accent" />
    </label>
  );
}
