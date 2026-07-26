import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { formatPrice } from "@/lib/site-config";

type Product = {
  id: string;
  slug: string;
  name: string;
  brand?: string | null;
  price: number | string;
  discount_price?: number | string | null;
  main_image?: string | null;
  rating_avg?: number | null;
  rating_count?: number | null;
  is_new?: boolean | null;
  is_bestseller?: boolean | null;
  is_limited?: boolean | null;
  short_description?: string | null;
  min_order_qty?: number | null;
};

export function ProductCard({ p }: { p: Product }) {
  const hasDiscount = p.discount_price != null && Number(p.discount_price) > 0;
  return (
    <Link to="/products/$slug" params={{ slug: p.slug }} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {p.main_image && (
          <img
            src={p.main_image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {p.is_new && <span className="bg-background text-foreground text-[10px] uppercase tracking-widest px-2 py-1">New</span>}
          {p.is_bestseller && <span className="bg-accent text-accent-foreground text-[10px] uppercase tracking-widest px-2 py-1">Bestseller</span>}
          {p.is_limited && <span className="bg-primary text-primary-foreground text-[10px] uppercase tracking-widest px-2 py-1">Limited</span>}
        </div>
      </div>
      <div className="pt-3 md:pt-4 space-y-1">
        {p.brand && <div className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{p.brand}</div>}
        <h3 className="font-serif text-base md:text-lg leading-tight group-hover:text-accent transition-colors line-clamp-2">{p.name}</h3>
        <div className="flex items-center gap-2 text-sm md:text-base">
          {hasDiscount ? (
            <>
              <span className="text-foreground font-medium">{formatPrice(p.discount_price!)}</span>
              <span className="text-muted-foreground line-through text-xs md:text-sm">{formatPrice(p.price)}</span>
            </>
          ) : (
            <span className="text-foreground font-medium">{formatPrice(p.price)}</span>
          )}
        </div>
        {p.min_order_qty && p.min_order_qty > 1 && (
          <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-muted-foreground">MOQ · {p.min_order_qty} pairs</div>
        )}
      </div>
    </Link>
  );
}

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= Math.round(value) ? "fill-accent text-accent" : "text-muted-foreground/40"}
        />
      ))}
    </div>
  );
}
