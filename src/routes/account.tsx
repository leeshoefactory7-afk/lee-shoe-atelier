import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { listMyOrders } from "@/lib/orders.functions";
import { formatPrice } from "@/lib/site-config";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account · Lee Shoe Factory" },
      { name: "description", content: "Manage your Lee Shoe Factory account, orders and wishlist." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Account,
});

function Account() {
  const [email, setEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchOrders = useServerFn(listMyOrders);
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { window.location.href = "/auth?redirect=/account"; return; }
      setEmail(data.user.email ?? null);
      try { setOrders(await fetchOrders()); } catch {}
      setLoading(false);
    });
  }, [fetchOrders]);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    window.location.href = "/";
  }

  return (
    <SiteLayout>
      <div className="container-lux py-16">
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-5xl">My Account</h1>
            {email && <p className="text-muted-foreground mt-2">{email}</p>}
          </div>
          <button onClick={signOut} className="text-sm underline underline-offset-4">Sign out</button>
        </div>
        <h2 className="font-serif text-2xl mt-12 mb-4">Order history</h2>
        {loading ? <div className="text-muted-foreground text-sm">Loading…</div> : orders.length === 0 ? (
          <div className="border border-dashed border-border p-10 text-center text-muted-foreground text-sm">
            No orders yet. <Link to="/products" className="underline text-accent">Start shopping →</Link>
          </div>
        ) : (
          <div className="border border-border divide-y divide-border">
            {orders.map((o) => (
              <div key={o.id} className="grid grid-cols-4 gap-4 p-4 text-sm items-center">
                <div className="font-medium">{o.order_number}</div>
                <div>{new Date(o.created_at).toLocaleDateString()}</div>
                <div>{formatPrice(o.total)}</div>
                <div><span className="px-2 py-1 text-xs bg-muted uppercase tracking-widest">{o.status}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
