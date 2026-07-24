import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListCategories, adminSaveCategory, adminDeleteCategory } from "@/lib/admin.functions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Save, Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/categories")({
  component: CategoriesAdmin,
});

function CategoriesAdmin() {
  const fetch = useServerFn(adminListCategories);
  const save = useServerFn(adminSaveCategory);
  const del = useServerFn(adminDeleteCategory);
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);

  const reload = () => fetch().then(setRows).catch(() => {});
  useEffect(() => { reload(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await save({ data: {
      id: editing.id, slug: editing.slug || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: editing.name, description: editing.description ?? null,
      image_url: editing.image_url ?? null, sort_order: editing.sort_order ?? 0,
    } });
    toast.success("Saved"); setEditing(null); reload();
  }

  async function remove(id: string) {
    if (!confirm("Delete category?")) return;
    await del({ data: { id } }); reload();
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-4xl">Categories</h1>
        <button onClick={() => setEditing({ name: "", slug: "", sort_order: rows.length })} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm"><Plus className="size-4" /> New</button>
      </div>
      <div className="mt-8 grid md:grid-cols-[1fr_1fr] gap-8">
        <div className="border border-border divide-y divide-border">
          {rows.map((c) => (
            <div key={c.id} className="p-4 flex items-center gap-3">
              {c.image_url && <img src={c.image_url} alt="" className="size-12 object-cover bg-muted" />}
              <div className="flex-1">
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-muted-foreground">/{c.slug}</div>
              </div>
              <button onClick={() => setEditing(c)} className="p-2 hover:text-accent text-sm">Edit</button>
              <button onClick={() => remove(c.id)} className="p-2 hover:text-destructive"><Trash2 className="size-4" /></button>
            </div>
          ))}
          {rows.length === 0 && <div className="p-6 text-muted-foreground text-sm">No categories yet.</div>}
        </div>
        {editing && (
          <form onSubmit={submit} className="border border-border p-6 space-y-4 h-fit">
            <h2 className="font-serif text-2xl">{editing.id ? "Edit" : "New"} category</h2>
            <Field label="Name"><input required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="input" /></Field>
            <Field label="Slug"><input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="input" /></Field>
            <Field label="Description"><textarea value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="input" /></Field>
            <ImageUploader value={editing.image_url} onChange={(v) => setEditing({ ...editing, image_url: v })} folder="categories" label="Image" />
            <Field label="Sort order"><input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="input" /></Field>
            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm"><Save className="size-4" /> Save</button>
              <button type="button" onClick={() => setEditing(null)} className="border border-input px-4 py-2 text-sm">Cancel</button>
            </div>
            <style>{`.input{width:100%;border:1px solid hsl(var(--input));background:hsl(var(--background));padding:.5rem .75rem;font-size:.875rem} .input:focus{outline:none;border-color:hsl(var(--accent))}`}</style>
          </form>
        )}
      </div>
    </div>
  );
}
function Field({ label, children }: any) {
  return <label className="block text-sm"><span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span><div className="mt-1">{children}</div></label>;
}
