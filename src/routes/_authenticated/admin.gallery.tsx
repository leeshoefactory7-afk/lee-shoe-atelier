import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminListGallery, adminAddGallery, adminDeleteGallery, uploadImage } from "@/lib/admin.functions";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Trash2, Upload } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: GalleryAdmin,
});

async function fileToBase64(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  let bin = ""; const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function GalleryAdmin() {
  const fetch = useServerFn(adminListGallery);
  const add = useServerFn(adminAddGallery);
  const del = useServerFn(adminDeleteGallery);
  const upload = useServerFn(uploadImage);
  const [rows, setRows] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const reload = () => fetch().then(setRows).catch(() => {});
  useEffect(() => { reload(); }, []);

  async function onFiles(files: FileList) {
    setBusy(true);
    try {
      for (const f of Array.from(files)) {
        const base64 = await fileToBase64(f);
        const res = await upload({ data: { folder: "gallery", filename: f.name, contentType: f.type, base64 } });
        await add({ data: { image_url: res.url } });
      }
      toast.success("Uploaded"); reload();
    } catch (e: any) { toast.error(e.message); }
    finally { setBusy(false); if (inputRef.current) inputRef.current.value = ""; }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="font-serif text-2xl md:text-4xl">Gallery</h1>
        <button disabled={busy} onClick={() => inputRef.current?.click()} className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs md:text-sm rounded whitespace-nowrap hover:bg-primary/90 disabled:opacity-60 transition-colors">
          <Upload className="size-4" /> <span className="hidden sm:inline">{busy ? "Uploading…" : "Upload"}</span><span className="sm:hidden">{busy ? "..." : "Upload"}</span>
        </button>
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && onFiles(e.target.files)} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8">
        {rows.map((g) => (
          <div key={g.id} className="relative aspect-square bg-muted group rounded-lg overflow-hidden hover:shadow-md transition-all">
            <img src={g.image_url} alt={g.caption ?? ""} className="w-full h-full object-cover" />
            <button onClick={async () => { if (confirm("Delete image?")) { await del({ data: { id: g.id } }); reload(); } }} className="absolute top-1.5 md:top-2 right-1.5 md:right-2 bg-background/90 p-1.5 md:p-2 hover:bg-background rounded opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="size-4" /></button>
          </div>
        ))}
        {rows.length === 0 && <div className="col-span-full text-center text-muted-foreground py-8 text-xs md:text-sm">No images yet.</div>}
      </div>
    </div>
  );
}
