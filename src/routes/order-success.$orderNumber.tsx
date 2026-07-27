import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CheckCircle2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { getOrderByNumber } from "@/lib/orders.functions";
import { formatPrice } from "@/lib/site-config";
import { useEffect, useState } from "react";
import { z } from "zod";

const searchSchema = z.object({ email: z.string().email().optional() });

export const Route = createFileRoute("/order-success/$orderNumber")({
  validateSearch: (s) => searchSchema.parse(s),
  head: ({ params }) => ({
    meta: [
      { title: `Order ${params.orderNumber} · Lee Shoe Factory` },
      { name: "description", content: "Thank you for your order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Success,
});

function Success() {
  const { orderNumber } = Route.useParams();
  const { email: emailFromUrl } = Route.useSearch();
  const [email, setEmail] = useState(emailFromUrl ?? "");
  const [data, setData] = useState<Awaited<ReturnType<typeof getOrderByNumber>> | null>(null);
  const [notFound, setNotFound] = useState(false);

  const lookup = useMutation({
    mutationFn: async (e: string) => getOrderByNumber({ data: { order_number: orderNumber, email: e } }),
    onSuccess: (res) => {
      if (res) { setData(res); setNotFound(false); } else { setData(null); setNotFound(true); }
    },
  });

  useEffect(() => {
    if (emailFromUrl) lookup.mutate(emailFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailFromUrl]);

  return (
    <SiteLayout>
      <div className="container-lux py-24 max-w-2xl mx-auto text-center">
        <CheckCircle2 className="size-14 text-accent mx-auto" />
        <h1 className="font-serif text-5xl mt-6">Order received</h1>
        <p className="mt-4 text-muted-foreground">
          Thank you — your order <span className="text-foreground font-medium">{orderNumber}</span> has been submitted to our team.
          You will receive a confirmation email with payment instructions shortly.
        </p>

        {!data && (
          <form
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
            onSubmit={(e) => { e.preventDefault(); if (email) lookup.mutate(email); }}
          >
            <input
              type="email"
              required
              placeholder="Enter the email used at checkout to view details"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-input bg-background px-4 py-2 text-sm rounded flex-1"
            />
            <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 text-sm" disabled={lookup.isPending}>
              {lookup.isPending ? "Loading…" : "View details"}
            </button>
          </form>
        )}
        {notFound && !data && (
          <p className="mt-4 text-sm text-destructive">We couldn't find an order matching that email.</p>
        )}

        {data?.order && (
          <div className="mt-10 text-left bg-muted/40 p-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><div className="text-xs uppercase tracking-widest text-muted-foreground">Customer</div>{data.order.customer_name}</div>
              <div><div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>{data.order.email}</div>
              <div><div className="text-xs uppercase tracking-widest text-muted-foreground">Country</div>{data.order.country ?? "—"}</div>
              <div><div className="text-xs uppercase tracking-widest text-muted-foreground">Total</div>{formatPrice(data.order.total)}</div>
            </div>
            <div className="mt-6 divide-y divide-border">
              {data.items.map((it) => (
                <div key={it.id} className="flex justify-between py-2 text-sm">
                  <span>{it.product_name} × {it.quantity}</span>
                  <span>{formatPrice(it.subtotal)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-10 flex justify-center gap-3">
          <Link to="/" className="border border-primary px-6 py-3 text-sm">Return home</Link>
          <Link to="/products" className="bg-primary text-primary-foreground px-6 py-3 text-sm">Continue shopping</Link>
        </div>
      </div>
    </SiteLayout>
  );
}
