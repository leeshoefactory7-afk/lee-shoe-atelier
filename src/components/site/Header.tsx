import { Link } from "@tanstack/react-router";
import { Menu, Search, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/lib/site-config";
import { CartDrawer } from "@/components/site/CartDrawer";

const NAV = [
  { to: "/products", label: "Shop" },
  { to: "/manufacturing", label: "Manufacturing" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSignedIn(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <>
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="container-lux flex h-9 items-center justify-between gap-4 px-4 md:px-6">
          <span className="hidden sm:inline">Worldwide shipping · Factory-direct pricing · OEM & Private label</span>
          <span className="sm:hidden text-[11px]">Worldwide shipping</span>
          <a href={`mailto:${SITE.email}`} className="hover:text-accent transition-colors ml-auto sm:ml-0">{SITE.email}</a>
        </div>
      </div>
      <header
        className={`sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[var(--shadow-soft)]" : ""
        }`}
      >
        <div className="container-lux flex items-center gap-4 h-14 md:h-20 px-4 md:px-6">
          <button className="md:hidden -ml-2 p-2.5 hover:bg-muted rounded transition-colors" onClick={() => setOpen(true)} aria-label="Menu">
            <Menu className="size-5 md:size-6" />
          </button>
          <Link to="/" className="flex items-baseline gap-2 min-w-0">
            <span className="font-serif text-xl md:text-3xl tracking-tight truncate">Lee<span className="text-accent">.</span></span>
            <span className="hidden lg:inline text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Shoe Factory</span>
          </Link>
          <nav className="hidden md:flex flex-1 items-center justify-center gap-5 lg:gap-7 min-w-0">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors [&.active]:text-accent whitespace-nowrap"
                activeProps={{ className: "active" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 ml-auto">
            <Link to="/products" className="p-2.5 hover:bg-muted rounded transition-colors" aria-label="Search">
              <Search className="size-4 md:size-5" />
            </Link>
            <Link to={signedIn ? "/account" : "/auth"} className="p-2.5 hover:bg-muted rounded transition-colors" aria-label="Account">
              <User className="size-4 md:size-5" />
            </Link>
            <CartDrawer />
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 bg-background md:hidden flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between h-14 px-4 border-b border-border flex-shrink-0">
            <span className="font-serif text-xl">Lee<span className="text-accent">.</span></span>
            <button onClick={() => setOpen(false)} className="p-2.5 hover:bg-muted rounded transition-colors" aria-label="Close">
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-0 flex-1 pt-2 px-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-4 px-4 border-b border-border font-serif text-lg hover:bg-muted transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
