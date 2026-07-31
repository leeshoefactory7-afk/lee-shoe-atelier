import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { LayoutDashboard, Package, ShoppingBag, Star, Users, Settings, FileText, Image, Tag, Mail, Menu } from "lucide-react";

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

function NavList({ path, onNavigate }: { path: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 text-sm">
      {NAV.map((n) => {
        const active = n.exact ? path === n.to : path.startsWith(n.to);
        return (
          <Link
            key={n.to}
            to={n.to as any}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md border-l-2 transition-colors ${
              active
                ? "border-accent text-accent bg-muted/60"
                : "border-transparent text-foreground/80 hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            <n.icon className="size-4 shrink-0" />
            <span className="truncate">{n.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function AdminLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const current = NAV.filter((n) => (n.exact ? path === n.to : path.startsWith(n.to))).pop();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <SiteLayout>
      <div className="container-lux py-4 md:py-10 px-3 md:px-6">
        {/* Mobile top bar */}
        <div className="md:hidden mb-4 flex items-center gap-3 border border-border rounded-lg px-3 py-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex items-center gap-2 text-sm shrink-0 rounded-md px-2 py-1.5 hover:bg-muted/60 transition-colors">
              <Menu className="size-5" />
              <span className="sr-only">Open admin menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80vw] max-w-[280px] p-0">
              <SheetHeader className="px-4 pt-5 pb-3 border-b border-border">
                <SheetTitle className="font-serif text-xl text-left">Admin</SheetTitle>
              </SheetHeader>
              <div className="p-3 overflow-y-auto">
                <NavList path={path} onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <div className="min-w-0 flex items-center gap-2">
            {current && <current.icon className="size-4 shrink-0 text-accent" />}
            <span className="truncate font-serif text-base">{current?.label ?? "Admin"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)] gap-4 md:gap-8 lg:gap-10">
          <aside className="hidden md:block md:sticky md:top-24 md:self-start">
            <h2 className="font-serif text-xl mb-4">Admin</h2>
            <NavList path={path} />
          </aside>
          <div className="min-w-0 overflow-hidden"><Outlet /></div>
        </div>
      </div>
    </SiteLayout>
  );
}


