import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListReviews, adminSetReviewStatus, adminDeleteReview } from "@/lib/admin.functions";
import { useEffect, useState } from "react";
import { Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/reviews")({
  component: ReviewsAdmin,
});

function ReviewsAdmin() {
  const fetch = useServerFn(adminListReviews);
  const setStatus = useServerFn(adminSetReviewStatus);
  const del = useServerFn(adminDeleteReview);
  const [rows, setRows] = useState<any[]>([]);
  const reload = () => fetch().then(setRows).catch(() => {});
  useEffect(() => { reload(); }, []);

  async function act(id: string, status: "approved" | "rejected") {
    await setStatus({ data: { id, status } });
    setRows((r) => r.map((x) => x.id === id ? { ...x, status } : x));
    toast.success(status);
  }
  async function remove(id: string) {
    if (!confirm("Delete review?")) return;
    await del({ data: { id } }); reload();
  }

  return (
    <div>
      <h1 className="font-serif text-4xl">Reviews</h1>
      <div className="mt-8 border border-border divide-y divide-border">
        {rows.map((r) => (
          <div key={r.id} className="p-4">
            <div className="flex justify-between text-sm">
              <div><strong>{r.customer_name}</strong> · {"★".repeat(r.rating)}</div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">{r.status}</span>
                <button onClick={() => act(r.id, "approved")} className="p-1 hover:text-accent" title="Approve"><Check className="size-4" /></button>
                <button onClick={() => act(r.id, "rejected")} className="p-1 hover:text-destructive" title="Reject"><X className="size-4" /></button>
                <button onClick={() => remove(r.id)} className="p-1 hover:text-destructive"><Trash2 className="size-4" /></button>
              </div>
            </div>
            <div className="mt-1 text-sm font-serif">{r.title}</div>
            <p className="text-sm text-muted-foreground mt-1">{r.body}</p>
          </div>
        ))}
        {rows.length === 0 && <div className="p-6 text-muted-foreground text-sm">No reviews yet.</div>}
      </div>
    </div>
  );
}
