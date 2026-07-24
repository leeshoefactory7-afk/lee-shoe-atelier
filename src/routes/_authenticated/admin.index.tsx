import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminStats } from "@/lib/admin.functions";
import { formatPrice } from "@/lib/site-config";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const fetchStats = useServerFn(adminStats);
  const [stats, setStats] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    fetchStats().then(setStats).catch((e) => setErr(e.message));
  }, [fetchStats]);

  if (err) return <div className="text-destructive">{err} — you may not have admin access.</div>;
  if (!stats) return <div className="text-muted-foreground">Loading…</div>;

  const cards = [
    { label: "Revenue", value: formatPrice(stats.revenue) },
    { label: "Total orders", value: stats.totalOrders },
    { label: "Pending orders", value: stats.pendingOrders },
    { label: "Products", value: stats.totalProducts },
    { label: "Customers", value: stats.totalCustomers },
    { label: "Reviews", value: stats.totalReviews },
  ];
  return (
    <div>
      <h1 className="font-serif text-4xl">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {cards.map((c) => (
          <div key={c.label} className="border border-border p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
            <div className="font-serif text-3xl mt-2">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
