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
      <h1 className="font-serif text-4xl">Customers</h1>
      <div className="mt-8 border border-border overflow-x-auto">
        <div className="overflow-x-auto -mx-4 sm:mx-0"><table className="w-full text-sm min-w-[640px]">
          <thead className="bg-muted text-xs uppercase tracking-widest">
            <tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Roles</th><th className="p-3 text-left">Joined</th><th></th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((u) => (
              <tr key={u.id}>
                <td className="p-3">{u.full_name ?? "—"}</td>
                <td className="p-3 text-muted-foreground">{u.email ?? "—"}</td>
                <td className="p-3">{u.roles.join(", ") || "customer"}</td>
                <td className="p-3">{new Date(u.created_at).toLocaleDateString()}</td>
                <td className="p-3 text-right"><button onClick={() => toggleAdmin(u)} className="text-xs border border-input px-3 py-1 hover:border-accent">{u.roles.includes("admin") ? "Revoke admin" : "Make admin"}</button></td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
