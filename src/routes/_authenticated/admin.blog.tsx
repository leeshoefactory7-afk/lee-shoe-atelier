import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListBlog, adminSaveBlog, adminDeleteBlog } from "@/lib/admin.functions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Plus, Pencil } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  component: BlogAdmin,
});

function BlogAdmin() {
  const fetch = useServerFn(adminListBlog);
  const save = useServerFn(adminSaveBlog);
  const del = useServerFn(adminDeleteBlog);
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
          slug: editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          title: editing.title,
          excerpt: editing.excerpt ?? null,
          content: editing.content ?? null,
          cover_image: editing.cover_image ?? null,
          category: editing.category ?? null,
          author: editing.author ?? null,
          published: !!editing.published,
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
    if (!confirm("Delete post?")) return;
    try {
      await del({ data: { id } });
      reload();
      toast.success("Deleted");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  function openModal(post?: any) {
    if (post) {
      setEditing(post);
    } else {
      setEditing({ title: "", published: true, author: "Lee Shoe Factory Editorial" });
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
        <h1 className="font-serif text-2xl md:text-4xl">Journal</h1>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs md:text-sm rounded whitespace-nowrap hover:bg-primary/90 transition-colors font-medium"
        >
          <Plus className="size-4" /> <span className="hidden sm:inline">New post</span>
        </button>
      </div>
      <div className="mt-6 md:mt-8 border border-border divide-y divide-border rounded-lg overflow-hidden max-h-[70vh] overflow-y-auto">
        {rows.map((p) => (
          <div key={p.id} className="p-3 md:p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors">
            {p.cover_image && <img src={p.cover_image} alt="" className="size-12 md:size-14 object-cover bg-muted rounded shrink-0" />}
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate text-xs md:text-sm">{p.title}</div>
              <div className="text-xs text-muted-foreground">
                {p.category} · {p.published ? "Published" : "Draft"}
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => openModal(p)}
                className="p-1.5 md:p-2 hover:text-accent hover:bg-muted/50 rounded transition-colors"
                title="Edit"
                aria-label="Edit"
              >
                <Pencil className="size-4" />
              </button>
              <button onClick={() => remove(p.id)} className="p-1.5 md:p-2 hover:text-destructive hover:bg-muted/50 rounded transition-colors" title="Delete" aria-label="Delete">
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <div className="p-6 text-muted-foreground text-xs md:text-sm text-center">No posts yet.</div>}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit Post" : "Create Post"}</DialogTitle>
            <DialogDescription>{editing?.id ? "Update blog post" : "Publish a new journal entry"}</DialogDescription>
          </DialogHeader>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Title *</label>
              <input required value={editing?.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input w-full" placeholder="Post title" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Slug (auto if empty)</label>
              <input
                value={editing?.slug ?? ""}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                className="input w-full"
                placeholder={editing?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "auto"}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Category</label>
                <input value={editing?.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="input w-full" placeholder="e.g. News" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Author</label>
                <input
                  value={editing?.author ?? ""}
                  onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                  className="input w-full"
                  placeholder="Lee Shoe Factory"
                />
              </div>
            </div>
            <div>
              <ImageUploader value={editing?.cover_image} onChange={(v) => setEditing({ ...editing, cover_image: v })} folder="blog" label="Cover image" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Excerpt</label>
              <textarea value={editing?.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} rows={2} className="input w-full" placeholder="Brief summary" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Content</label>
              <textarea
                value={editing?.content ?? ""}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                rows={6}
                className="input w-full"
                placeholder="Post content (markdown or plain text)"
              />
            </div>
            <label className="flex items-center gap-2 text-xs md:text-sm">
              <input type="checkbox" checked={!!editing?.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
              Published
            </label>

            <div className="flex gap-2 justify-end pt-4 border-t">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-sm border border-input rounded hover:bg-muted/50 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={busy} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium">
                {busy ? "Saving…" : "Publish"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
