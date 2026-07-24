import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-store";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/lib/site-config";

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
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
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
        <div className="container-lux flex h-9 items-center justify-between">
          <span className="hidden sm:inline">Worldwide shipping · Factory-direct pricing · OEM & Private label</span>
          <span className="sm:hidden">Worldwide shipping</span>
          <a href={`mailto:${SITE.email}`} className="hover:text-accent transition-colors">{SITE.email}</a>
        </div>
      </div>
      <header
        className={`sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[var(--shadow-soft)]" : ""
        }`}
      >
        <div className="container-lux grid grid-cols-[auto_1fr_auto] items-center gap-4 h-16 md:h-20">
          <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Menu">
            <Menu className="size-6" />
          </button>
          <Link to="/" className="justify-self-center md:justify-self-start flex items-baseline gap-2">
            <span className="font-serif text-2xl md:text-3xl tracking-tight">Lee<span className="text-accent">.</span></span>
            <span className="hidden md:inline text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Shoe Factory</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 justify-self-center absolute left-1/2 -translate-x-1/2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors [&.active]:text-accent"
                activeProps={{ className: "active" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1 md:gap-2 justify-self-end">
            <Link to="/products" className="p-2 hover:text-accent" aria-label="Search">
              <Search className="size-5" />
            </Link>
            <Link to="/account/wishlist" className="p-2 hover:text-accent hidden sm:inline-flex" aria-label="Wishlist">
              <Heart className="size-5" />
            </Link>
            <Link to={signedIn ? "/account" : "/auth"} className="p-2 hover:text-accent" aria-label="Account">
              <User className="size-5" />
            </Link>
            <Link to="/cart" className="p-2 hover:text-accent relative" aria-label="Cart">
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-accent text-accent-foreground text-[10px] grid place-items-center px-1 font-medium">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container-lux flex h-16 items-center justify-between">
            <span className="font-serif text-2xl">Lee<span className="text-accent">.</span></span>
            <button onClick={() => setOpen(false)} aria-label="Close"><X className="size-6" /></button>
          </div>
          <nav className="container-lux flex flex-col gap-1 pt-6">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 border-b border-border font-serif text-2xl">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
