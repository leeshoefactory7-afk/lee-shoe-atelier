import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LayoutDashboard, Package, ShoppingBag, Star, Users, Settings, FileText, Image, Tag, Mail } from "lucide-react";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tag },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/gallery", label: "Gallery", icon: Image },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/messages", label: "Messages", icon: Mail },
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
      <div className="container-lux py-6 md:py-10">
        <div className="grid md:grid-cols-[220px_minmax(0,1fr)] gap-6 md:gap-10">
          <aside className="md:sticky md:top-24 md:self-start">
            <h2 className="font-serif text-xl mb-3 md:mb-4">Admin</h2>
            <nav className="flex md:flex-col gap-1 text-sm overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0">
              {NAV.map((n) => {
                const active = n.exact ? path === n.to : path.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to as any}
                    className={`flex items-center gap-2 px-3 py-2 whitespace-nowrap md:whitespace-normal border md:border-0 md:border-l-2 rounded md:rounded-none ${
                      active
                        ? "border-accent text-accent bg-muted/50"
                        : "border-border md:border-transparent hover:border-border"
                    }`}
                  >
                    <n.icon className="size-4 shrink-0" /> <span>{n.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
          <div className="min-w-0"><Outlet /></div>
        </div>
      </div>
    </SiteLayout>
  );
}

