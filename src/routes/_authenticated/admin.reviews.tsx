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
      <h1 className="font-serif text-2xl md:text-4xl">Reviews</h1>
      <div className="mt-6 md:mt-8 border border-border divide-y divide-border rounded-lg overflow-hidden">
        {rows.map((r) => (
          <div key={r.id} className="p-3 md:p-4 hover:bg-muted/50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div className="text-xs md:text-sm">
                <strong className="block">{r.customer_name}</strong>
                <span className="text-xs">{"★".repeat(r.rating)}</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground bg-muted px-2 py-1 rounded">{r.status}</span>
                <button onClick={() => act(r.id, "approved")} className="p-1.5 md:p-2 hover:text-accent hover:bg-muted/50 rounded transition-colors" title="Approve"><Check className="size-4" /></button>
                <button onClick={() => act(r.id, "rejected")} className="p-1.5 md:p-2 hover:text-destructive hover:bg-muted/50 rounded transition-colors" title="Reject"><X className="size-4" /></button>
                <button onClick={() => remove(r.id)} className="p-1.5 md:p-2 hover:text-destructive hover:bg-muted/50 rounded transition-colors"><Trash2 className="size-4" /></button>
              </div>
            </div>
            <div className="mt-2 text-xs md:text-sm font-serif font-medium">{r.title}</div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1.5 leading-relaxed">{r.body}</p>
          </div>
        ))}
        {rows.length === 0 && <div className="p-6 text-muted-foreground text-xs md:text-sm text-center">No reviews yet.</div>}
      </div>
    </div>
  );
}
