import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListProducts, adminDeleteProduct } from "@/lib/admin.functions";
import { formatPrice } from "@/lib/site-config";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Pencil } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: ProductsAdmin,
});

function ProductsAdmin() {
  const fetchProducts = useServerFn(adminListProducts);
  const del = useServerFn(adminDeleteProduct);
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { fetchProducts().then(setRows).catch(() => {}); }, [fetchProducts]);

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    await del({ data: { id } });
    setRows((r) => r.filter((x) => x.id !== id));
    toast.success("Deleted");
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-4xl">Products</h1>
        <Link to="/admin/products/new" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm">
          <Plus className="size-4" /> New product
        </Link>
      </div>
      <div className="mt-8 border border-border overflow-x-auto">
        <div className="overflow-x-auto -mx-4 sm:mx-0"><table className="w-full text-sm min-w-[640px]">
          <thead className="bg-muted text-xs uppercase tracking-widest">
            <tr><th className="p-3 text-left">Product</th><th className="p-3 text-left">Brand</th><th className="p-3 text-left">Price</th><th className="p-3 text-left">Stock</th><th className="p-3 text-left">Status</th><th className="p-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((p) => (
              <tr key={p.id}>
                <td className="p-3 flex items-center gap-3">
                  {p.main_image && <img src={p.main_image} alt="" className="size-10 object-cover bg-muted" />}
                  <span>{p.name}</span>
                </td>
                <td className="p-3">{p.brand}</td>
                <td className="p-3">{formatPrice(p.discount_price ?? p.price)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3"><span className="px-2 py-1 text-xs bg-muted uppercase tracking-widest">{p.status}</span></td>
                <td className="p-3 text-right">
                  <div className="inline-flex gap-2">
                    <Link to="/admin/products/$id/edit" params={{ id: p.id }} className="p-2 hover:text-accent" aria-label="Edit"><Pencil className="size-4" /></Link>
                    <button onClick={() => remove(p.id)} className="p-2 hover:text-destructive" aria-label="Delete"><Trash2 className="size-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No products yet. Create your first one.</td></tr>}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
