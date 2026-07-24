import { useEffect } from "react";
import { useShopifyCart } from "@/stores/shopifyCartStore";

export function useCartSync() {
  const syncCart = useShopifyCart((s) => s.syncCart);
  useEffect(() => {
    syncCart();
    const onVisibility = () => {
      if (document.visibilityState === "visible") syncCart();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [syncCart]);
}
