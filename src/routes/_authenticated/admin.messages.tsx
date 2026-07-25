import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListMessages, adminDeleteMessage } from "@/lib/admin.functions";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/messages")({
  component: MessagesAdmin,
});

function MessagesAdmin() {
  const fetch = useServerFn(adminListMessages);
  const del = useServerFn(adminDeleteMessage);
  const [rows, setRows] = useState<any[]>([]);
  const reload = () => fetch().then(setRows).catch(() => {});
  useEffect(() => { reload(); }, []);
  return (
    <div>
      <h1 className="font-serif text-2xl md:text-4xl">Messages</h1>
      <div className="mt-6 md:mt-8 space-y-2">
        {rows.map((m) => (
          <details key={m.id} className="border border-border p-3 md:p-4 rounded-lg group hover:border-accent/50 transition-colors">
            <summary className="cursor-pointer flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 text-xs md:text-sm">
              <span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 font-medium group-open:text-accent transition-colors">
                <strong className="truncate">{m.name}</strong>
                <span className="text-muted-foreground truncate hidden sm:inline">·</span>
                <span className="text-muted-foreground truncate hidden sm:inline text-[10px] md:text-xs">{m.email}</span>
                <span className="uppercase text-[10px] md:text-xs tracking-widest bg-muted px-2 py-1 rounded w-fit">{m.kind}</span>
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground flex-shrink-0">{new Date(m.created_at).toLocaleString()}</span>
            </summary>
            <div className="mt-3 text-xs md:text-sm space-y-1">
              {m.subject && <div><strong>Subject:</strong> {m.subject}</div>}
              {m.company && <div><strong>Company:</strong> {m.company}</div>}
              {m.country && <div><strong>Country:</strong> {m.country}</div>}
              {m.phone && <div><strong>Phone:</strong> {m.phone}</div>}
              <p className="mt-3 whitespace-pre-line leading-relaxed break-words">{m.message}</p>
              <button onClick={async () => { if (confirm("Delete?")) { await del({ data: { id: m.id } }); reload(); } }} className="inline-flex items-center gap-1.5 text-destructive text-[10px] md:text-xs mt-3 p-1.5 hover:bg-destructive/10 rounded transition-colors"><Trash2 className="size-3.5" /> Delete</button>
            </div>
          </details>
        ))}
        {rows.length === 0 && <div className="text-muted-foreground text-xs md:text-sm text-center py-6">No messages yet.</div>}
      </div>
    </div>
  );
}
