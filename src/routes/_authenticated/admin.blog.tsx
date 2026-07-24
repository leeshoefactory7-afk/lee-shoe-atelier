import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListBlog, adminSaveBlog, adminDeleteBlog } from "@/lib/admin.functions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Save, Plus, Pencil } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  component: BlogAdmin,
});

function BlogAdmin() {
  const fetch = useServerFn(adminListBlog);
  const save = useServerFn(adminSaveBlog);
  const del = useServerFn(adminDeleteBlog);
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const reload = () => fetch().then(setRows).catch(() => {});
  useEffect(() => { reload(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await save({ data: {
      id: editing.id,
      slug: editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: editing.title, excerpt: editing.excerpt ?? null, content: editing.content ?? null,
      cover_image: editing.cover_image ?? null, category: editing.category ?? null,
      author: editing.author ?? null, published: !!editing.published,
    } });
    toast.success("Saved"); setEditing(null); reload();
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-4xl">Journal</h1>
        <button onClick={() => setEditing({ title: "", published: true, author: "Lee Shoe Factory Editorial" })} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm"><Plus className="size-4" /> New post</button>
      </div>
      <div className="mt-8 grid lg:grid-cols-[1fr_1.2fr] gap-8">
        <div className="border border-border divide-y divide-border max-h-[70vh] overflow-auto">
          {rows.map((p) => (
            <div key={p.id} className="p-4 flex items-center gap-3">
              {p.cover_image && <img src={p.cover_image} alt="" className="size-14 object-cover bg-muted" />}
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{p.title}</div>
                <div className="text-xs text-muted-foreground">{p.category} · {p.published ? "Published" : "Draft"}</div>
              </div>
              <button onClick={() => setEditing(p)} className="p-2 hover:text-accent"><Pencil className="size-4" /></button>
              <button onClick={async () => { if (confirm("Delete post?")) { await del({ data: { id: p.id } }); reload(); } }} className="p-2 hover:text-destructive"><Trash2 className="size-4" /></button>
            </div>
          ))}
          {rows.length === 0 && <div className="p-6 text-muted-foreground text-sm">No posts yet.</div>}
        </div>
        {editing && (
          <form onSubmit={submit} className="border border-border p-6 space-y-4 h-fit">
            <h2 className="font-serif text-2xl">{editing.id ? "Edit post" : "New post"}</h2>
            <Field label="Title"><input required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input" /></Field>
            <Field label="Slug"><input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="input" /></Field>
            <Field label="Category"><input value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="input" /></Field>
            <Field label="Author"><input value={editing.author ?? ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className="input" /></Field>
            <ImageUploader value={editing.cover_image} onChange={(v) => setEditing({ ...editing, cover_image: v })} folder="blog" label="Cover image" />
            <Field label="Excerpt"><textarea value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} rows={2} className="input" /></Field>
            <Field label="Content (markdown or plain text)"><textarea value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={12} className="input" /></Field>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} /> Published</label>
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
