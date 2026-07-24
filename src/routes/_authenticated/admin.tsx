import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LayoutDashboard, Package, ShoppingBag, Star, Users, Settings } from "lucide-react";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin · Lee Shoe Factory" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <SiteLayout>
      <div className="container-lux py-10">
        <div className="grid md:grid-cols-[220px_1fr] gap-10">
          <aside>
            <h2 className="font-serif text-xl mb-4">Admin</h2>
            <nav className="space-y-1 text-sm">
              {NAV.map((n) => {
                const active = n.exact ? path === n.to : path.startsWith(n.to);
                return (
                  <Link key={n.to} to={n.to as any} className={`flex items-center gap-2 px-3 py-2 border-l-2 ${active ? "border-accent text-accent bg-muted/50" : "border-transparent hover:border-border"}`}>
                    <n.icon className="size-4" /> {n.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          <div><Outlet /></div>
        </div>
      </div>
    </SiteLayout>
  );
}
