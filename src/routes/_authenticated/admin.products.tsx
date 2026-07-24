import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListProducts } from "@/lib/admin.functions";
import { formatPrice } from "@/lib/site-config";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: ProductsAdmin,
});

function ProductsAdmin() {
  const fetch = useServerFn(adminListProducts);
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { fetch().then(setRows).catch(() => {}); }, [fetch]);
  return (
    <div>
      <h1 className="font-serif text-4xl">Products</h1>
      <div className="mt-8 border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted text-xs uppercase tracking-widest">
            <tr><th className="p-3 text-left">Product</th><th className="p-3 text-left">Brand</th><th className="p-3 text-left">Price</th><th className="p-3 text-left">Stock</th><th className="p-3 text-left">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((p) => (
              <tr key={p.id}>
                <td className="p-3 flex items-center gap-3"><img src={p.main_image} alt="" className="size-10 object-cover bg-muted" /><span>{p.name}</span></td>
                <td className="p-3">{p.brand}</td>
                <td className="p-3">{formatPrice(p.discount_price ?? p.price)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3"><span className="px-2 py-1 text-xs bg-muted uppercase tracking-widest">{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
