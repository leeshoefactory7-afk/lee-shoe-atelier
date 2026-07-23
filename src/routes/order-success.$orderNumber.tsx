import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CheckCircle2 } from "lucide-react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getOrderByNumber } from "@/lib/orders.functions";
import { formatPrice } from "@/lib/site-config";

const opts = (num: string) => queryOptions({ queryKey: ["order", num], queryFn: () => getOrderByNumber({ data: { order_number: num } }) });

export const Route = createFileRoute("/order-success/$orderNumber")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(opts(params.orderNumber)),
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
  const { data } = useSuspenseQuery(opts(orderNumber));
  return (
    <SiteLayout>
      <div className="container-lux py-24 max-w-2xl mx-auto text-center">
        <CheckCircle2 className="size-14 text-accent mx-auto" />
        <h1 className="font-serif text-5xl mt-6">Order received</h1>
        <p className="mt-4 text-muted-foreground">
          Thank you — your order <span className="text-foreground font-medium">{orderNumber}</span> has been submitted to our team.
          You will receive a confirmation email with payment instructions shortly.
        </p>
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
