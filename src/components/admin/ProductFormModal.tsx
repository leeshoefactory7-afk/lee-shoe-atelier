import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminListCategories, adminSaveProduct, adminGetProduct } from "@/lib/admin.functions";
import { ImageUploader, MultiImageUploader } from "@/components/admin/ImageUploader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2, X } from "lucide-react";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCats().then(setCats).catch(() => {});
  }, [fetchCats]);

  useEffect(() => {
    if (productId && open) {
      setLoading(true);
      fetchProduct({ data: { id: productId } })
        .then((res) => setExistingProduct(res.product))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setExistingProduct(null);
    }
  }, [productId, open, fetchProduct]);

  const [p, setP] = useState({
    slug: existingProduct?.slug ?? "",
    name: existingProduct?.name ?? "",
    sku: existingProduct?.sku ?? "",
    category_id: existingProduct?.category_id ?? "",
    brand: existingProduct?.brand ?? "Lee Shoe Factory",
    gender: existingProduct?.gender ?? "unisex",
    price: Number(existingProduct?.price ?? 0),
    discount_price: existingProduct?.discount_price != null ? Number(existingProduct.discount_price) : null,
    stock: existingProduct?.stock ?? 0,
    material: existingProduct?.material ?? "",
    weight_grams: existingProduct?.weight_grams ?? null,
    short_description: existingProduct?.short_description ?? "",
    description: existingProduct?.description ?? "",
    features: (existingProduct?.features ?? []) as string[],
    care_instructions: existingProduct?.care_instructions ?? "",
    sizes: (existingProduct?.sizes ?? []) as string[],
    main_image: existingProduct?.main_image ?? null,
    images: (existingProduct?.images ?? []) as string[],
    status: existingProduct?.status ?? "published",
    is_featured: existingProduct?.is_featured ?? false,
    is_bestseller: existingProduct?.is_bestseller ?? false,
    is_new: existingProduct?.is_new ?? false,
    is_limited: existingProduct?.is_limited ?? false,
  });

  const [colors, setColors] = useState<Color[]>(
    (existingProduct?.colors ?? []).map((c: any) => ({
      id: c.id,
      name: c.name,
      hex: c.hex ?? "#000000",
      images: c.images ?? [],
      sort_order: c.sort_order ?? 0,
    })),
  );

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
        (existingProduct.colors ?? []).map((c: any) => ({
          id: c.id,
          name: c.name,
          hex: c.hex ?? "#000000",
          images: c.images ?? [],
          sort_order: c.sort_order ?? 0,
        })),
      );
    } else {
      setP({
        slug: "",
        name: "",
        sku: "",
        category_id: "",
        brand: "Lee Shoe Factory",
        gender: "unisex",
        price: 0,
        discount_price: null,
        stock: 0,
        material: "",
        weight_grams: null,
        short_description: "",
        description: "",
        features: [],
        care_instructions: "",
        sizes: [],
        main_image: null,
        images: [],
        status: "published",
        is_featured: false,
        is_bestseller: false,
        is_new: false,
        is_limited: false,
      });
      setColors([]);
    }
  }, [existingProduct]);

  function set<K extends keyof typeof p>(k: K, v: typeof p[K]) {
    setP((s) => ({ ...s, [k]: v }));
  }

  function slugify(s: string) {
    return s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Product" : "Create New Product"}</DialogTitle>
          <DialogDescription>{isEditing ? "Update product details" : "Add a new product to your catalog"}</DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-6">
          {/* Basics Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Basics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Name *</label>
                <input value={p.name} onChange={(e) => set("name", e.target.value)} required className="input w-full" placeholder="Product name" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Slug (auto if empty)</label>
                <input value={p.slug} onChange={(e) => set("slug", e.target.value)} className="input w-full" placeholder={slugify(p.name) || "auto"} />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Brand</label>
                <input value={p.brand} onChange={(e) => set("brand", e.target.value)} className="input w-full" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">SKU</label>
                <input value={p.sku ?? ""} onChange={(e) => set("sku", e.target.value)} className="input w-full" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Category</label>
                <select value={p.category_id ?? ""} onChange={(e) => set("category_id", e.target.value as any)} className="input w-full">
                  <option value="">— None —</option>
                  {cats.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Gender</label>
                <select value={p.gender} onChange={(e) => set("gender", e.target.value as any)} className="input w-full">
                  {["men", "women", "unisex", "kids"].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Pricing & Stock</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Price ($)</label>
                <input type="number" value={p.price} onChange={(e) => set("price", Number(e.target.value))} className="input w-full" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Discount Price ($)</label>
                <input type="number" value={p.discount_price ?? ""} onChange={(e) => set("discount_price", e.target.value ? Number(e.target.value) : null)} className="input w-full" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Stock</label>
                <input type="number" value={p.stock} onChange={(e) => set("stock", Number(e.target.value))} className="input w-full" />
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Images</h3>
            <div>
              <ImageUploader value={p.main_image} onChange={(v) => set("main_image", v)} folder="products" label="Main Image" />
            </div>
            <div>
              <MultiImageUploader value={p.images} onChange={(v) => set("images", v)} folder="products" label="Additional Images" />
            </div>
          </div>

          {/* Flags Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Product Flags</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={p.is_featured} onChange={(e) => set("is_featured", e.target.checked)} className="rounded" />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={p.is_bestseller} onChange={(e) => set("is_bestseller", e.target.checked)} className="rounded" />
                Bestseller
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={p.is_new} onChange={(e) => set("is_new", e.target.checked)} className="rounded" />
                New
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={p.is_limited} onChange={(e) => set("is_limited", e.target.checked)} className="rounded" />
                Limited
              </label>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Details</h3>
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Short Description</label>
              <textarea value={p.short_description} onChange={(e) => set("short_description", e.target.value)} rows={2} className="input w-full" placeholder="Brief description for listings" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Full Description</label>
              <textarea value={p.description} onChange={(e) => set("description", e.target.value)} rows={3} className="input w-full" placeholder="Detailed product description" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Material</label>
              <input value={p.material} onChange={(e) => set("material", e.target.value)} className="input w-full" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Care Instructions</label>
              <textarea value={p.care_instructions} onChange={(e) => set("care_instructions", e.target.value)} rows={2} className="input w-full" />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <button type="button" onClick={() => onOpenChange(false)} className="px-4 py-2 text-sm border border-input rounded hover:bg-muted/50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={busy} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium">
              {busy ? "Saving…" : "Save Product"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
