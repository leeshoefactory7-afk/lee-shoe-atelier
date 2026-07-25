import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListOrders, adminUpdateOrderStatus } from "@/lib/admin.functions";
import { formatPrice } from "@/lib/site-config";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  component: OrdersAdmin,
});

const STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

function OrdersAdmin() {
  const fetchOrders = useServerFn(adminListOrders);
  const updateStatus = useServerFn(adminUpdateOrderStatus);
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => { fetchOrders().then(setOrders).catch(() => {}); }, [fetchOrders]);

  async function change(id: string, status: string) {
    await updateStatus({ data: { id, status } });
    setOrders((o) => o.map((x) => x.id === id ? { ...x, status } : x));
    toast.success("Status updated");
  }

  return (
    <div>
      <h1 className="font-serif text-4xl">Orders</h1>
      <div className="mt-8 border border-border overflow-x-auto">
        <div className="overflow-x-auto -mx-4 sm:mx-0"><table className="w-full text-sm min-w-[640px]">
          <thead className="bg-muted text-xs uppercase tracking-widest">
            <tr><th className="p-3 text-left">Order</th><th className="p-3 text-left">Customer</th><th className="p-3 text-left">Total</th><th className="p-3 text-left">Date</th><th className="p-3 text-left">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="p-3 font-medium">{o.order_number}</td>
                <td className="p-3">{o.customer_name}<br /><span className="text-xs text-muted-foreground">{o.email}</span></td>
                <td className="p-3">{formatPrice(o.total)}</td>
                <td className="p-3">{new Date(o.created_at).toLocaleDateString()}</td>
                <td className="p-3">
                  <select value={o.status} onChange={(e) => change(o.id, e.target.value)} className="border border-input bg-background px-2 py-1 text-xs">
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
