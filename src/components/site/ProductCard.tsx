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
      <div className="pt-4 space-y-1">
        {p.brand && <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{p.brand}</div>}
        <h3 className="font-serif text-lg leading-tight group-hover:text-accent transition-colors">{p.name}</h3>
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-foreground font-medium">{formatPrice(p.discount_price!)}</span>
              <span className="text-muted-foreground line-through text-sm">{formatPrice(p.price)}</span>
            </>
          ) : (
            <span className="text-foreground font-medium">{formatPrice(p.price)}</span>
          )}
        </div>
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
