import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/site-config";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const items = useCart((s) => s.items);
  const updateQty = useCart((s) => s.updateQty);
  const remove = useCart((s) => s.remove);
  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  const count = items.reduce((n, i) => n + i.quantity, 0);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2.5 md:p-2 hover:bg-muted rounded transition-colors relative"
        aria-label="Cart"
      >
        <ShoppingBag className="size-4 md:size-5" />
        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] rounded-full size-4 flex items-center justify-center font-medium"
          >
            {count > 9 ? "9+" : count}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex min-h-screen"
            onClick={() => setOpen(false)}
          >
            <motion.div className="flex-1 bg-black/40" />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm sm:max-w-md bg-background flex flex-col min-h-screen shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border sticky top-0 bg-background z-10">
                <h2 className="font-serif text-lg sm:text-2xl">Shopping Cart</h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="p-2 hover:bg-muted rounded transition-colors"
                >
                  <X className="size-5 sm:size-6" />
                </motion.button>
              </div>

              {/* Items Container */}
              <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-8 bg-gradient-to-b from-white via-white to-gray-50 dark:from-slate-50 dark:via-slate-50 dark:to-slate-100">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center min-h-64 text-center px-6"
                  >
                    <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <ShoppingBag className="size-8 sm:size-10 text-gray-400" />
                    </div>
                    <p className="text-base sm:text-lg font-semibold text-foreground mb-2">Your cart is empty</p>
                    <p className="text-sm text-gray-500">Add items to get started</p>
                  </motion.div>
                ) : (
                  <motion.div className="space-y-6 sm:space-y-8">
                    {items.map((it, idx) => (
                      <motion.div
                        key={`${it.productId}-${it.size}-${it.color}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex gap-5 sm:gap-6 p-4 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                      >
                        {/* Product Image */}
                        <Link
                          to="/products/$slug"
                          params={{ slug: it.slug }}
                          onClick={() => setOpen(false)}
                          className="flex-shrink-0"
                        >
                          <motion.img
                            whileHover={{ scale: 1.08 }}
                            src={it.image}
                            alt={it.name}
                            className="w-24 sm:w-32 h-28 sm:h-40 object-cover bg-muted rounded-lg cursor-pointer flex-shrink-0"
                          />
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0 flex flex-col">
                          {/* Name & Color/Size */}
                          <Link
                            to="/products/$slug"
                            params={{ slug: it.slug }}
                            onClick={() => setOpen(false)}
                            className="text-sm sm:text-base font-semibold text-foreground hover:text-accent transition-colors line-clamp-2 mb-2"
                          >
                            {it.name}
                          </Link>
                          <p className="text-xs sm:text-sm text-gray-500 mb-3">
                            {[it.color, it.size].filter(Boolean).join(" · ")}
                          </p>

                          {/* Price - Always visible */}
                          <div className="text-lg sm:text-xl font-bold text-primary mb-3">
                            {formatPrice(it.price * it.quantity)}
                          </div>

                          {/* Quantity & Delete */}
                          <div className="flex items-center justify-between gap-3 mt-auto">
                            <div className="flex items-center border border-input rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQty(it.productId, it.quantity - 1, it.size, it.color)}
                                className="px-2.5 sm:px-3 py-1.5 hover:bg-gray-200 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="size-4 sm:size-5" />
                              </motion.button>
                              <span className="px-2.5 sm:px-3 py-1.5 text-sm sm:text-base font-semibold min-w-[2.5rem] text-center">
                                {it.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQty(it.productId, it.quantity + 1, it.size, it.color)}
                                className="px-2.5 sm:px-3 py-1.5 hover:bg-gray-200 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="size-4 sm:size-5" />
                              </motion.button>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => remove(it.productId, it.size, it.color)}
                              className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="size-5 sm:size-6" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Footer with Actions */}
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-border p-4 sm:p-6 space-y-3 sm:space-y-4 bg-background sticky bottom-0"
                >
                  {/* Subtotal */}
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="text-lg sm:text-xl font-semibold text-accent">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/checkout"
                      onClick={() => setOpen(false)}
                      className="block w-full bg-primary text-primary-foreground py-3 sm:py-4 text-center text-sm sm:text-base font-medium tracking-wide hover:bg-primary/90 rounded transition-all active:scale-95"
                    >
                      Proceed to checkout
                    </Link>
                  </motion.div>

                  {/* View Cart Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/cart"
                      onClick={() => setOpen(false)}
                      className="block w-full border border-input py-3 sm:py-4 text-center text-sm sm:text-base font-medium hover:bg-muted transition-all rounded active:scale-95"
                    >
                      View full cart
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
