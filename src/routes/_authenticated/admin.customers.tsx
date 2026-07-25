import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListCustomers, adminSetRole } from "@/lib/admin.functions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/customers")({
  component: CustomersAdmin,
});

function CustomersAdmin() {
  const fetch = useServerFn(adminListCustomers);
  const setRole = useServerFn(adminSetRole);
  const [rows, setRows] = useState<any[]>([]);
  const reload = () => fetch().then(setRows).catch(() => {});
  useEffect(() => { reload(); }, []);

  async function toggleAdmin(u: any) {
    const isAdmin = u.roles.includes("admin");
    await setRole({ data: { user_id: u.id, role: "admin", grant: !isAdmin } });
    toast.success(isAdmin ? "Revoked admin" : "Granted admin");
    reload();
  }

  return (
    <div>
      <h1 className="font-serif text-2xl md:text-4xl">Customers</h1>
      <div className="mt-6 md:mt-8 border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead className="bg-muted text-xs uppercase tracking-widest sticky top-0">
              <tr>
                <th className="p-2 md:p-3 text-left whitespace-nowrap">Name</th>
                <th className="p-2 md:p-3 text-left whitespace-nowrap hidden sm:table-cell">Email</th>
                <th className="p-2 md:p-3 text-left whitespace-nowrap hidden md:table-cell">Roles</th>
                <th className="p-2 md:p-3 text-left whitespace-nowrap">Joined</th>
                <th className="p-2 md:p-3 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((u) => (
                <tr key={u.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-2 md:p-3 text-xs md:text-sm">{u.full_name ?? "—"}</td>
                  <td className="p-2 md:p-3 text-muted-foreground text-xs md:text-sm hidden sm:table-cell truncate">{u.email ?? "—"}</td>
                  <td className="p-2 md:p-3 hidden md:table-cell text-xs md:text-sm">{u.roles.join(", ") || "customer"}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="p-2 md:p-3 text-right">
                    <button onClick={() => toggleAdmin(u)} className="text-[10px] md:text-xs border border-input px-2 md:px-3 py-1 rounded hover:border-accent hover:bg-muted/50 transition-colors whitespace-nowrap">
                      {u.roles.includes("admin") ? "Revoke" : "Make admin"}
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-muted-foreground text-xs md:text-sm">
                    No customers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
