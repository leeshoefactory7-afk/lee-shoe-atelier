import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListReviews } from "@/lib/admin.functions";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/reviews")({
  component: ReviewsAdmin,
});

function ReviewsAdmin() {
  const fetch = useServerFn(adminListReviews);
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { fetch().then(setRows).catch(() => {}); }, [fetch]);
  return (
    <div>
      <h1 className="font-serif text-4xl">Reviews</h1>
      <div className="mt-8 border border-border">
        <div className="divide-y divide-border">
          {rows.map((r) => (
            <div key={r.id} className="p-4">
              <div className="flex justify-between text-sm">
                <div><strong>{r.customer_name}</strong> · {"★".repeat(r.rating)}</div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">{r.status}</span>
              </div>
              <div className="mt-1 text-sm font-serif">{r.title}</div>
              <p className="text-sm text-muted-foreground mt-1">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
