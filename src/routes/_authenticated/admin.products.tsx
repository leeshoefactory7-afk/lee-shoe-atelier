import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListProducts, adminDeleteProduct } from "@/lib/admin.functions";
import { formatPrice } from "@/lib/site-config";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Pencil } from "lucide-react";
import { ProductFormModal } from "@/components/admin/ProductFormModal";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: ProductsAdmin,
});

function ProductsAdmin() {
  const fetchProducts = useServerFn(adminListProducts);
  const del = useServerFn(adminDeleteProduct);
  const [rows, setRows] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const reload = () => fetchProducts().then(setRows).catch(() => {});

  useEffect(() => {
    reload();
  }, [fetchProducts]);

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    try {
      await del({ data: { id } });
      setRows((r) => r.filter((x) => x.id !== id));
      toast.success("Deleted");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  function openModal(id?: string) {
    setEditingId(id || null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="font-serif text-2xl md:text-4xl">Products</h1>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs md:text-sm rounded whitespace-nowrap hover:bg-primary/90 transition-colors font-medium"
        >
          <Plus className="size-4" /> <span className="hidden sm:inline">New product</span><span className="sm:hidden">New</span>
        </button>
      </div>
      <div className="mt-6 md:mt-8 border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead className="bg-muted text-xs uppercase tracking-widest sticky top-0">
              <tr>
                <th className="p-2 md:p-3 text-left whitespace-nowrap">Product</th>
                <th className="p-2 md:p-3 text-left whitespace-nowrap hidden sm:table-cell">Brand</th>
                <th className="p-2 md:p-3 text-left whitespace-nowrap">Price</th>
                <th className="p-2 md:p-3 text-left whitespace-nowrap hidden md:table-cell">Stock</th>
                <th className="p-2 md:p-3 text-left whitespace-nowrap">Status</th>
                <th className="p-2 md:p-3 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((p) => (
                <tr key={p.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-2 md:p-3 flex items-center gap-2 min-w-0">
                    {p.main_image && <img src={p.main_image} alt="" className="size-8 md:size-10 object-cover bg-muted rounded shrink-0" />}
                    <span className="truncate text-xs md:text-sm font-medium">{p.name}</span>
                  </td>
                  <td className="p-2 md:p-3 hidden sm:table-cell text-xs md:text-sm">{p.brand || "—"}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm font-medium">{formatPrice(p.discount_price ?? p.price)}</td>
                  <td className="p-2 md:p-3 hidden md:table-cell text-xs md:text-sm">{p.stock}</td>
                  <td className="p-2 md:p-3">
                    <span className="px-2 py-1 text-[10px] md:text-xs bg-muted uppercase tracking-wider rounded inline-block">{p.status}</span>
                  </td>
                  <td className="p-2 md:p-3 text-right">
                    <div className="inline-flex gap-1 md:gap-2">
                      <button
                        onClick={() => openModal(p.id)}
                        className="p-1.5 md:p-2 hover:text-accent hover:bg-muted/50 rounded transition-colors"
                        title="Edit"
                        aria-label="Edit"
                      >
                        <Pencil className="size-3.5 md:size-4" />
                      </button>
                      <button onClick={() => remove(p.id)} className="p-1.5 md:p-2 hover:text-destructive hover:bg-muted/50 rounded transition-colors" aria-label="Delete" title="Delete">
                        <Trash2 className="size-3.5 md:size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 md:p-8 text-center text-muted-foreground text-xs md:text-sm">
                    No products yet. Create your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        productId={editingId}
        onSuccess={() => {
          reload();
          closeModal();
        }}
      />
    </div>
  );
}
