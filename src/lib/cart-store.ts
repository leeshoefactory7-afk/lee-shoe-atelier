import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string, size?: string, color?: string) => void;
  updateQty: (productId: string, quantity: number, size?: string, color?: string) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

const key = (i: { productId: string; size?: string; color?: string }) =>
  `${i.productId}|${i.size ?? ""}|${i.color ?? ""}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) => {
          const k = key(item);
          const existing = s.items.find((x) => key(x) === k);
          if (existing) {
            return {
              items: s.items.map((x) =>
                key(x) === k ? { ...x, quantity: x.quantity + item.quantity } : x,
              ),
            };
          }
          return { items: [...s.items, item] };
        }),
      remove: (productId, size, color) =>
        set((s) => ({
          items: s.items.filter((x) => key(x) !== key({ productId, size, color })),
        })),
      updateQty: (productId, quantity, size, color) =>
        set((s) => ({
          items: s.items.map((x) =>
            key(x) === key({ productId, size, color }) ? { ...x, quantity: Math.max(1, quantity) } : x,
          ),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.quantity, 0),
      subtotal: () => get().items.reduce((n, i) => n + i.quantity * i.price, 0),
    }),
    { name: "lsf-cart" },
  ),
);

type WishlistState = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};
export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "lsf-wishlist" },
  ),
);
