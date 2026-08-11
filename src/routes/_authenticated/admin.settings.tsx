import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListSettings, adminSaveSetting, adminDeleteSetting } from "@/lib/admin.functions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Save, Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: SettingsAdmin,
});

const PRESETS = [
  { key: "brand.name", value: "Lee Shoe Factory" },
  { key: "brand.tagline", value: "Premium Footwear, Crafted for the World" },
  { key: "brand.email", value: "info@leeshoefactory.com" },
  { key: "brand.whatsapp", value: "+1 (912) 831-9041" },
  { key: "brand.address", value: "Industrial Zone, Manufacturing District" },
  { key: "brand.hours", value: "Mon–Sat · 9:00 – 18:00 (GMT+0)" },
  { key: "social.instagram", value: "https://instagram.com" },
  { key: "social.facebook", value: "https://facebook.com" },
  { key: "social.linkedin", value: "https://linkedin.com" },
  { key: "hero.title", value: "Crafted in the atelier. Worn around the world." },
  { key: "hero.subtitle", value: "Factory-direct luxury shoes." },
  { key: "hero.image", value: "" },
  { key: "about.heading", value: "Our story" },
  { key: "about.body", value: "Three decades of shoemaking heritage…" },
  { key: "manufacturing.heading", value: "OEM & private label" },
  { key: "manufacturing.body", value: "Modern facilities, master craftspeople…" },
];

function SettingsAdmin() {
  const fetch = useServerFn(adminListSettings);
  const save = useServerFn(adminSaveSetting);
  const del = useServerFn(adminDeleteSetting);
  const [rows, setRows] = useState<any[]>([]);
  const [newKey, setNewKey] = useState("");
  const reload = () => fetch().then(setRows).catch(() => {});
  useEffect(() => { reload(); }, []);

  const existingKeys = new Set(rows.map((r) => r.key));
  const missing = PRESETS.filter((p) => !existingKeys.has(p.key));

  async function update(key: string, value: any) {
    await save({ data: { key, value } });
    toast.success("Saved"); reload();
  }
  async function remove(key: string) {
    if (!confirm(`Delete "${key}"?`)) return;
    await del({ data: { key } }); reload();
  }
  async function addPreset(p: { key: string; value: any }) {
    await save({ data: { key: p.key, value: p.value } });
    reload();
  }

  return (
    <div>
      <h1 className="font-serif text-2xl md:text-4xl">Site settings</h1>
      <p className="text-muted-foreground mt-2 text-xs md:text-sm">Edit content that appears across the website. Public pages read from here first.</p>

      {missing.length > 0 && (
        <div className="mt-6 md:mt-8 border border-dashed border-border p-3 md:p-4 rounded-lg">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Quick add</div>
          <div className="flex flex-wrap gap-2">
            {missing.map((p) => (
              <button key={p.key} onClick={() => addPreset(p)} className="text-xs border border-input px-2 md:px-3 py-1.5 rounded hover:border-accent hover:bg-muted/50 transition-colors inline-flex items-center gap-1 whitespace-nowrap">
                <Plus className="size-3" /> <span className="hidden sm:inline">{p.key}</span><span className="sm:hidden text-[9px]">{p.key.split(".")[1]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 md:mt-8 space-y-3">
        {rows.map((r) => <Row key={r.key} row={r} onSave={update} onDelete={remove} />)}
      </div>

      <div className="mt-6 md:mt-8 border border-border p-3 md:p-4 rounded-lg">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Add custom key</div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="e.g. footer.notice" className="input flex-1" />
          <button onClick={() => { if (newKey) { update(newKey, ""); setNewKey(""); } }} className="bg-primary text-primary-foreground px-4 py-2 text-xs md:text-sm rounded hover:bg-primary/90 transition-colors whitespace-nowrap">Add</button>
        </div>
      </div>
      <style>{`.input{width:100%;border:1px solid var(--color-input);background:var(--color-background);padding:.5rem .75rem;font-size:.875rem;border-radius:2px} .input:focus{outline:none;border-color:var(--color-accent)}`}</style>
    </div>
  );
}

function Row({ row, onSave, onDelete }: any) {
  const [val, setVal] = useState<string>(typeof row.value === "string" ? row.value : JSON.stringify(row.value, null, 2));
  const isMulti = val.length > 80 || val.includes("\n");
  return (
    <div className="border border-border p-3 md:p-4 rounded-lg hover:border-accent/50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
        <code className="text-xs md:text-sm text-accent break-all">{row.key}</code>
        <div className="flex gap-1">
          <button onClick={() => onSave(row.key, val)} className="inline-flex items-center gap-1 text-xs bg-primary text-primary-foreground px-2 md:px-3 py-1.5 rounded hover:bg-primary/90 transition-colors"><Save className="size-3" /> <span className="hidden sm:inline">Save</span></button>
          <button onClick={() => onDelete(row.key)} className="p-1.5 md:p-2 hover:text-destructive hover:bg-muted/50 rounded transition-colors"><Trash2 className="size-4" /></button>
        </div>
      </div>
      {isMulti
        ? <textarea value={val} onChange={(e) => setVal(e.target.value)} rows={4} className="input text-xs" />
        : <input value={val} onChange={(e) => setVal(e.target.value)} className="input text-xs" />}
    </div>
  );
}
