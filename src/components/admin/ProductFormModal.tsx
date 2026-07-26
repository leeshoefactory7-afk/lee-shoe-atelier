import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminListCategories, adminSaveProduct, adminGetProduct } from "@/lib/admin.functions";
import { ImageUploader, MultiImageUploader } from "@/components/admin/ImageUploader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

type Color = { id?: string; name: string; hex: string; images: string[]; sort_order: number };

interface ProductFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId?: string | null;
  onSuccess?: () => void;
}

export function ProductFormModal({ open, onOpenChange, productId, onSuccess }: ProductFormModalProps) {
  const save = useServerFn(adminSaveProduct);
  const fetchCats = useServerFn(adminListCategories);
  const fetchProduct = useServerFn(adminGetProduct);
  const [cats, setCats] = useState<any[]>([]);
  const [existingProduct, setExistingProduct] = useState<any>(null);
  const [existingColors, setExistingColors] = useState<any[]>([]);

  useEffect(() => {
    fetchCats().then(setCats).catch(() => {});
  }, [fetchCats]);

  useEffect(() => {
    if (productId && open) {
      fetchProduct({ data: { id: productId } })
        .then((res) => {
          setExistingProduct(res?.product ?? null);
          setExistingColors(res?.colors ?? []);
        })
        .catch(() => {});
    } else {
      setExistingProduct(null);
      setExistingColors([]);
    }
  }, [productId, open, fetchProduct]);

  const emptyState = {
    slug: "", name: "", sku: "", category_id: "", brand: "Lee Shoe Factory", gender: "unisex",
    price: 0, discount_price: null as number | null, stock: 0, min_order_qty: 1,
    material: "", weight_grams: null as number | null,
    short_description: "", description: "", features: [] as string[], care_instructions: "",
    sizes: [] as string[], main_image: null as string | null, images: [] as string[],
    status: "published", is_featured: false, is_bestseller: false, is_new: false, is_limited: false,
  };
  const [p, setP] = useState(emptyState);
  const [colors, setColors] = useState<Color[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (existingProduct) {
      setP({
        slug: existingProduct.slug ?? "",
        name: existingProduct.name ?? "",
        sku: existingProduct.sku ?? "",
        category_id: existingProduct.category_id ?? "",
        brand: existingProduct.brand ?? "Lee Shoe Factory",
        gender: existingProduct.gender ?? "unisex",
        price: Number(existingProduct.price ?? 0),
        discount_price: existingProduct.discount_price != null ? Number(existingProduct.discount_price) : null,
        stock: existingProduct.stock ?? 0,
        min_order_qty: existingProduct.min_order_qty ?? 1,
        material: existingProduct.material ?? "",
        weight_grams: existingProduct.weight_grams ?? null,
        short_description: existingProduct.short_description ?? "",
        description: existingProduct.description ?? "",
        features: (existingProduct.features ?? []) as string[],
        care_instructions: existingProduct.care_instructions ?? "",
        sizes: (existingProduct.sizes ?? []) as string[],
        main_image: existingProduct.main_image ?? null,
        images: (existingProduct.images ?? []) as string[],
        status: existingProduct.status ?? "published",
        is_featured: existingProduct.is_featured ?? false,
        is_bestseller: existingProduct.is_bestseller ?? false,
        is_new: existingProduct.is_new ?? false,
        is_limited: existingProduct.is_limited ?? false,
      });
      setColors(
        (existingColors ?? []).map((c: any) => ({
          id: c.id, name: c.name, hex: c.hex ?? "#000000",
          images: c.images ?? [], sort_order: c.sort_order ?? 0,
        })),
      );
    } else {
      setP(emptyState);
      setColors([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingProduct, existingColors]);

  function set<K extends keyof typeof p>(k: K, v: typeof p[K]) {
    setP((s) => ({ ...s, [k]: v }));
  }

  function slugify(s: string) {
    return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = {
        id: existingProduct?.id,
        ...p,
        slug: p.slug || slugify(p.name),
        category_id: p.category_id || null,
        colorVariants: colors.map((c, i) => ({ id: c.id, name: c.name, hex: c.hex, images: c.images, sort_order: i })),
      };
      await save({ data: payload as any });
      toast.success("Saved");
      onOpenChange(false);
      onSuccess?.();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  const isEditing = !!existingProduct?.id;
  const L = "text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Product" : "Create New Product"}</DialogTitle>
          <DialogDescription>{isEditing ? "Update product details" : "Add a new product to your catalog"}</DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Basics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={L}>Name *</label><input value={p.name} onChange={(e) => set("name", e.target.value)} required className="input w-full" /></div>
              <div><label className={L}>Slug (auto if empty)</label><input value={p.slug} onChange={(e) => set("slug", e.target.value)} className="input w-full" placeholder={slugify(p.name) || "auto"} /></div>
              <div><label className={L}>Brand</label><input value={p.brand} onChange={(e) => set("brand", e.target.value)} className="input w-full" /></div>
              <div><label className={L}>SKU</label><input value={p.sku ?? ""} onChange={(e) => set("sku", e.target.value)} className="input w-full" /></div>
              <div><label className={L}>Category</label>
                <select value={p.category_id ?? ""} onChange={(e) => set("category_id", e.target.value as any)} className="input w-full">
                  <option value="">— None —</option>
                  {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div><label className={L}>Gender</label>
                <select value={p.gender} onChange={(e) => set("gender", e.target.value as any)} className="input w-full">
                  {["men", "women", "unisex", "kids"].map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Wholesale Pricing & Stock</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div><label className={L}>Price ($)</label><input type="number" step="0.01" value={p.price} onChange={(e) => set("price", Number(e.target.value))} className="input w-full" /></div>
              <div><label className={L}>Discount ($)</label><input type="number" step="0.01" value={p.discount_price ?? ""} onChange={(e) => set("discount_price", e.target.value ? Number(e.target.value) : null)} className="input w-full" /></div>
              <div><label className={L}>Stock</label><input type="number" value={p.stock} onChange={(e) => set("stock", Number(e.target.value))} className="input w-full" /></div>
              <div>
                <label className={L}>Min Order Qty *</label>
                <input type="number" min={1} value={p.min_order_qty} onChange={(e) => set("min_order_qty", Math.max(1, Number(e.target.value) || 1))} className="input w-full" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Wholesale: buyers must order at least the minimum quantity per line item.</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Main Image</h3>
            <ImageUploader value={p.main_image} onChange={(v) => set("main_image", v)} folder="products" label="Main image (thumbnail)" />
            <div>
              <MultiImageUploader values={p.images} onChange={(v) => set("images", v)} folder="products" label="Fallback images (shown when no color is selected)" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Color Variants (each color has its own image set)</h3>
            <div className="space-y-4">
              {colors.map((c, idx) => (
                <div key={idx} className="border border-border rounded p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div><label className={L}>Color name</label>
                        <input value={c.name} onChange={(e) => setColors((all) => all.map((x, i) => i === idx ? { ...x, name: e.target.value } : x))} className="input w-full" placeholder="e.g. Black" />
                      </div>
                      <div><label className={L}>Hex</label>
                        <div className="flex gap-2">
                          <input type="color" value={c.hex} onChange={(e) => setColors((all) => all.map((x, i) => i === idx ? { ...x, hex: e.target.value } : x))} className="w-12 h-10 border border-input" />
                          <input value={c.hex} onChange={(e) => setColors((all) => all.map((x, i) => i === idx ? { ...x, hex: e.target.value } : x))} className="input flex-1" />
                        </div>
                      </div>
                    </div>
                    <button type="button" onClick={() => setColors((all) => all.filter((_, i) => i !== idx))} className="p-2 hover:text-destructive" aria-label="Remove color"><Trash2 className="size-4" /></button>
                  </div>
                  <div className="mt-4">
                    <MultiImageUploader values={c.images} folder="products/colors" label={`${c.name || "Color"} images`}
                      onChange={(v) => setColors((all) => all.map((x, i) => i === idx ? { ...x, images: v } : x))} />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setColors((c) => [...c, { name: "", hex: "#000000", images: [], sort_order: c.length }])} className="inline-flex items-center gap-2 border border-input px-4 py-2 text-sm rounded hover:border-accent">
                <Plus className="size-4" /> Add color
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Details</h3>
            <div><label className={L}>Short description</label><textarea value={p.short_description} onChange={(e) => set("short_description", e.target.value)} rows={2} className="input w-full" /></div>
            <div><label className={L}>Full description</label><textarea value={p.description} onChange={(e) => set("description", e.target.value)} rows={4} className="input w-full" /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={L}>Material</label><input value={p.material} onChange={(e) => set("material", e.target.value)} className="input w-full" /></div>
              <div><label className={L}>Weight (g)</label><input type="number" value={p.weight_grams ?? ""} onChange={(e) => set("weight_grams", e.target.value ? Number(e.target.value) : null)} className="input w-full" /></div>
              <div><label className={L}>Sizes (comma-separated)</label><input value={p.sizes.join(", ")} onChange={(e) => set("sizes", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className="input w-full" /></div>
              <div><label className={L}>Features (comma-separated)</label><input value={p.features.join(", ")} onChange={(e) => set("features", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className="input w-full" /></div>
            </div>
            <div><label className={L}>Care instructions</label><textarea value={p.care_instructions} onChange={(e) => set("care_instructions", e.target.value)} rows={2} className="input w-full" /></div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Flags & Status</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="col-span-2 sm:col-span-1">
                <label className={L}>Status</label>
                <select value={p.status} onChange={(e) => set("status", e.target.value as any)} className="input w-full">
                  {["published", "draft", "archived", "out_of_stock"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {(["is_featured", "is_bestseller", "is_new", "is_limited"] as const).map((k) => (
                <label key={k} className="flex items-center gap-2 text-sm mt-6">
                  <input type="checkbox" checked={p[k] as boolean} onChange={(e) => set(k, e.target.checked as any)} />
                  {k.replace("is_", "")}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t sticky bottom-0 bg-background">
            <button type="button" onClick={() => onOpenChange(false)} className="px-4 py-2 text-sm border border-input rounded hover:bg-muted/50">Cancel</button>
            <button type="submit" disabled={busy} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 font-medium">
              {busy ? "Saving…" : "Save Product"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
