import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListCategories, adminSaveProduct } from "@/lib/admin.functions";
import { ImageUploader, MultiImageUploader } from "@/components/admin/ImageUploader";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

type Color = { id?: string; name: string; hex: string; images: string[]; sort_order: number };

export function ProductForm({ product, colors: initialColors }: { product?: any; colors?: Color[] }) {
  const save = useServerFn(adminSaveProduct);
  const fetchCats = useServerFn(adminListCategories);
  const navigate = useNavigate();
  const [cats, setCats] = useState<any[]>([]);
  useEffect(() => { fetchCats().then(setCats).catch(() => {}); }, [fetchCats]);

  const [p, setP] = useState({
    slug: product?.slug ?? "",
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    category_id: product?.category_id ?? "",
    brand: product?.brand ?? "Lee Shoe Factory",
    gender: product?.gender ?? "unisex",
    price: Number(product?.price ?? 0),
    discount_price: product?.discount_price != null ? Number(product.discount_price) : null,
    stock: product?.stock ?? 0,
    material: product?.material ?? "",
    weight_grams: product?.weight_grams ?? null,
    short_description: product?.short_description ?? "",
    description: product?.description ?? "",
    features: (product?.features ?? []) as string[],
    care_instructions: product?.care_instructions ?? "",
    sizes: (product?.sizes ?? []) as string[],
    main_image: product?.main_image ?? null,
    images: (product?.images ?? []) as string[],
    status: product?.status ?? "published",
    is_featured: product?.is_featured ?? false,
    is_bestseller: product?.is_bestseller ?? false,
    is_new: product?.is_new ?? false,
    is_limited: product?.is_limited ?? false,
  });

  const [colors, setColors] = useState<Color[]>(
    (initialColors ?? []).map((c: any) => ({
      id: c.id, name: c.name, hex: c.hex ?? "#000000", images: c.images ?? [], sort_order: c.sort_order ?? 0,
    })),
  );

  const [busy, setBusy] = useState(false);

  function set<K extends keyof typeof p>(k: K, v: typeof p[K]) { setP((s) => ({ ...s, [k]: v })); }

  function slugify(s: string) { return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = {
        id: product?.id,
        ...p,
        slug: p.slug || slugify(p.name),
        category_id: p.category_id || null,
        colorVariants: colors.map((c, i) => ({ id: c.id, name: c.name, hex: c.hex, images: c.images, sort_order: i })),
      };
      await save({ data: payload as any });
      toast.success("Saved");
      navigate({ to: "/admin/products" });
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); }
  }

  return (
    <form onSubmit={submit} className="space-y-8 max-w-4xl">
      <h1 className="font-serif text-4xl">{product ? "Edit product" : "New product"}</h1>

      <Section title="Basics">
        <Grid>
          <Field label="Name" required><input value={p.name} onChange={(e) => set("name", e.target.value)} required className="input" /></Field>
          <Field label="Slug (auto if empty)"><input value={p.slug} onChange={(e) => set("slug", e.target.value)} placeholder={slugify(p.name)} className="input" /></Field>
          <Field label="Brand"><input value={p.brand} onChange={(e) => set("brand", e.target.value)} className="input" /></Field>
          <Field label="SKU"><input value={p.sku ?? ""} onChange={(e) => set("sku", e.target.value)} className="input" /></Field>
          <Field label="Category">
            <select value={p.category_id ?? ""} onChange={(e) => set("category_id", e.target.value as any)} className="input">
              <option value="">— None —</option>
              {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Gender">
            <select value={p.gender} onChange={(e) => set("gender", e.target.value as any)} className="input">
              {["men", "women", "unisex", "kids"].map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select value={p.status} onChange={(e) => set("status", e.target.value as any)} className="input">
              {["published", "draft", "archived", "out_of_stock"].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Stock"><input type="number" value={p.stock} onChange={(e) => set("stock", Number(e.target.value))} className="input" /></Field>
        </Grid>
      </Section>

      <Section title="Pricing">
        <Grid>
          <Field label="Price (USD)" required><input type="number" step="0.01" value={p.price} onChange={(e) => set("price", Number(e.target.value))} required className="input" /></Field>
          <Field label="Discount price (optional)"><input type="number" step="0.01" value={p.discount_price ?? ""} onChange={(e) => set("discount_price", e.target.value ? Number(e.target.value) : null)} className="input" /></Field>
        </Grid>
      </Section>

      <Section title="Images">
        <ImageUploader value={p.main_image} onChange={(v) => set("main_image", v)} folder="products" label="Main image" />
        <div className="mt-6">
          <MultiImageUploader values={p.images} onChange={(v) => set("images", v)} folder="products" label="Additional images (shown when no color selected)" />
        </div>
      </Section>

      <Section title="Color variants (each color has its own image set)">
        <div className="space-y-6">
          {colors.map((c, idx) => (
            <div key={idx} className="border border-border p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1 grid md:grid-cols-3 gap-3">
                  <Field label="Color name"><input value={c.name} onChange={(e) => setColors((all) => all.map((x, i) => i === idx ? { ...x, name: e.target.value } : x))} className="input" /></Field>
                  <Field label="Hex color">
                    <div className="flex gap-2">
                      <input type="color" value={c.hex} onChange={(e) => setColors((all) => all.map((x, i) => i === idx ? { ...x, hex: e.target.value } : x))} className="w-12 h-10 border border-input" />
                      <input value={c.hex} onChange={(e) => setColors((all) => all.map((x, i) => i === idx ? { ...x, hex: e.target.value } : x))} className="input flex-1" />
                    </div>
                  </Field>
                </div>
                <button type="button" onClick={() => setColors((all) => all.filter((_, i) => i !== idx))} className="p-2 hover:text-destructive"><Trash2 className="size-4" /></button>
              </div>
              <div className="mt-4">
                <MultiImageUploader values={c.images} folder={`products/colors`} label={`${c.name || "Color"} images`}
                  onChange={(v) => setColors((all) => all.map((x, i) => i === idx ? { ...x, images: v } : x))} />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => setColors((c) => [...c, { name: "", hex: "#000000", images: [], sort_order: c.length }])} className="inline-flex items-center gap-2 border border-input px-4 py-2 text-sm hover:border-accent">
            <Plus className="size-4" /> Add color
          </button>
        </div>
      </Section>

      <Section title="Details">
        <Field label="Short description"><textarea value={p.short_description} onChange={(e) => set("short_description", e.target.value)} rows={2} className="input" /></Field>
        <div className="mt-4"><Field label="Full description"><textarea value={p.description} onChange={(e) => set("description", e.target.value)} rows={6} className="input" /></Field></div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <Field label="Material"><input value={p.material} onChange={(e) => set("material", e.target.value)} className="input" /></Field>
          <Field label="Weight (grams)"><input type="number" value={p.weight_grams ?? ""} onChange={(e) => set("weight_grams", e.target.value ? Number(e.target.value) : null)} className="input" /></Field>
          <Field label="Sizes (comma-separated)"><input value={p.sizes.join(", ")} onChange={(e) => set("sizes", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className="input" /></Field>
          <Field label="Features (comma-separated)"><input value={p.features.join(", ")} onChange={(e) => set("features", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className="input" /></Field>
        </div>
        <div className="mt-4"><Field label="Care instructions"><textarea value={p.care_instructions} onChange={(e) => set("care_instructions", e.target.value)} rows={2} className="input" /></Field></div>
      </Section>

      <Section title="Flags">
        <div className="flex flex-wrap gap-4">
          {(["is_featured", "is_bestseller", "is_new", "is_limited"] as const).map((k) => (
            <label key={k} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={p[k] as boolean} onChange={(e) => set(k, e.target.checked as any)} />
              {k.replace("is_", "").replace("_", " ")}
            </label>
          ))}
        </div>
      </Section>

      <div className="flex gap-3 sticky bottom-0 bg-background border-t border-border py-4">
        <button disabled={busy} className="bg-primary text-primary-foreground px-6 py-3 text-sm disabled:opacity-60">{busy ? "Saving…" : "Save product"}</button>
        <button type="button" onClick={() => navigate({ to: "/admin/products" })} className="border border-input px-6 py-3 text-sm">Cancel</button>
      </div>
    </form>
  );
}


function Section({ title, children }: any) {
  return <div><h2 className="font-serif text-2xl mb-4">{title}</h2>{children}</div>;
}
function Grid({ children }: any) { return <div className="grid md:grid-cols-2 gap-4">{children}</div>; }
function Field({ label, children, required }: any) {
  return (
    <label className="block text-sm">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}{required && " *"}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
