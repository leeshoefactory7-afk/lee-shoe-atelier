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
      <h1 className="font-serif text-4xl">Messages</h1>
      <div className="mt-8 space-y-3">
        {rows.map((m) => (
          <details key={m.id} className="border border-border p-4">
            <summary className="cursor-pointer flex justify-between text-sm">
              <span><strong>{m.name}</strong> · <span className="text-muted-foreground">{m.email}</span> · <span className="uppercase text-xs tracking-widest">{m.kind}</span></span>
              <span className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</span>
            </summary>
            <div className="mt-3 text-sm space-y-1">
              {m.subject && <div><strong>Subject:</strong> {m.subject}</div>}
              {m.company && <div><strong>Company:</strong> {m.company}</div>}
              {m.country && <div><strong>Country:</strong> {m.country}</div>}
              {m.phone && <div><strong>Phone:</strong> {m.phone}</div>}
              <p className="mt-2 whitespace-pre-line">{m.message}</p>
              <button onClick={async () => { if (confirm("Delete?")) { await del({ data: { id: m.id } }); reload(); } }} className="inline-flex items-center gap-1 text-destructive text-xs mt-3"><Trash2 className="size-3" /> Delete</button>
            </div>
          </details>
        ))}
        {rows.length === 0 && <div className="text-muted-foreground text-sm">No messages yet.</div>}
      </div>
    </div>
  );
}
