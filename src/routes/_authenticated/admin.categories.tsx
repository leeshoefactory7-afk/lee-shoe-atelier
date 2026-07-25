import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListCategories, adminSaveCategory, adminDeleteCategory } from "@/lib/admin.functions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/categories")({
  component: CategoriesAdmin,
});

function CategoriesAdmin() {
  const fetch = useServerFn(adminListCategories);
  const save = useServerFn(adminSaveCategory);
  const del = useServerFn(adminDeleteCategory);
  const [rows, setRows] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  const reload = () => fetch().then(setRows).catch(() => {});

  useEffect(() => {
    reload();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await save({
        data: {
          id: editing.id,
          slug: editing.slug || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          name: editing.name,
          description: editing.description ?? null,
          image_url: editing.image_url ?? null,
          sort_order: editing.sort_order ?? 0,
        },
      });
      toast.success("Saved");
      setModalOpen(false);
      setEditing(null);
      reload();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete category?")) return;
    try {
      await del({ data: { id } });
      reload();
      toast.success("Deleted");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  function openModal(cat?: any) {
    if (cat) {
      setEditing(cat);
    } else {
      setEditing({ name: "", slug: "", sort_order: rows.length });
    }
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="font-serif text-2xl md:text-4xl">Categories</h1>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs md:text-sm rounded whitespace-nowrap hover:bg-primary/90 transition-colors font-medium"
        >
          <Plus className="size-4" /> <span className="hidden sm:inline">New</span>
        </button>
      </div>
      <div className="mt-6 md:mt-8 border border-border divide-y divide-border rounded-lg overflow-hidden">
        {rows.map((c) => (
          <div key={c.id} className="p-3 md:p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors">
            {c.image_url && <img src={c.image_url} alt="" className="size-10 md:size-12 object-cover bg-muted rounded shrink-0" />}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm md:text-base truncate">{c.name}</div>
              <div className="text-xs text-muted-foreground truncate">/{c.slug}</div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => openModal(c)}
                className="px-2 md:px-3 py-1.5 md:py-2 hover:text-accent hover:bg-muted/50 rounded transition-colors text-xs md:text-sm font-medium whitespace-nowrap"
              >
                Edit
              </button>
              <button onClick={() => remove(c.id)} className="p-1.5 md:p-2 hover:text-destructive hover:bg-muted/50 rounded transition-colors" title="Delete" aria-label="Delete">
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <div className="p-6 text-muted-foreground text-xs md:text-sm text-center">No categories yet.</div>}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit Category" : "Create Category"}</DialogTitle>
            <DialogDescription>{editing?.id ? "Update category details" : "Add a new product category"}</DialogDescription>
          </DialogHeader>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Name *</label>
              <input
                required
                value={editing?.name ?? ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="input w-full"
                placeholder="Category name"
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Slug (auto if empty)</label>
              <input
                value={editing?.slug ?? ""}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                className="input w-full"
                placeholder={editing?.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "auto"}
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Description</label>
              <textarea
                value={editing?.description ?? ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                rows={3}
                className="input w-full"
                placeholder="Brief description"
              />
            </div>
            <div>
              <ImageUploader value={editing?.image_url} onChange={(v) => setEditing({ ...editing, image_url: v })} folder="categories" label="Category Image" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Sort Order</label>
              <input
                type="number"
                value={editing?.sort_order ?? 0}
                onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                className="input w-full"
              />
            </div>

            <div className="flex gap-2 justify-end pt-4 border-t">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-sm border border-input rounded hover:bg-muted/50 transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
              >
                {busy ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
