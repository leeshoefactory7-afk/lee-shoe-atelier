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
      <h1 className="font-serif text-2xl md:text-4xl">Orders</h1>
      <div className="mt-6 md:mt-8 border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead className="bg-muted text-xs uppercase tracking-widest sticky top-0">
              <tr>
                <th className="p-2 md:p-3 text-left whitespace-nowrap">Order</th>
                <th className="p-2 md:p-3 text-left whitespace-nowrap hidden sm:table-cell">Customer</th>
                <th className="p-2 md:p-3 text-left whitespace-nowrap">Total</th>
                <th className="p-2 md:p-3 text-left whitespace-nowrap hidden md:table-cell">Date</th>
                <th className="p-2 md:p-3 text-left whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-2 md:p-3 font-medium text-xs md:text-sm">{o.order_number}</td>
                  <td className="p-2 md:p-3 hidden sm:table-cell text-xs md:text-sm">
                    <div className="font-medium truncate">{o.customer_name}</div>
                    <div className="text-xs text-muted-foreground truncate">{o.email}</div>
                  </td>
                  <td className="p-2 md:p-3 font-medium text-xs md:text-sm">{formatPrice(o.total)}</td>
                  <td className="p-2 md:p-3 hidden md:table-cell text-xs md:text-sm">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="p-2 md:p-3">
                    <select
                      value={o.status}
                      onChange={(e) => change(o.id, e.target.value)}
                      className="border border-input bg-background px-2 py-1 text-xs rounded hover:border-accent focus:outline-none focus:border-accent transition-colors"
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 md:p-8 text-center text-muted-foreground text-xs md:text-sm">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
