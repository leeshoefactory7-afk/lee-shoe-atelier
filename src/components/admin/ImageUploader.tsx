import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { uploadImage, deleteImage } from "@/lib/admin.functions";
import { toast } from "sonner";
import { Upload, X, Loader2 } from "lucide-react";

async function fileToBase64(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  let bin = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

export function ImageUploader({
  value, onChange, folder = "misc", label = "Image",
}: { value: string | null | undefined; onChange: (url: string | null) => void; folder?: string; label?: string }) {
  const upload = useServerFn(uploadImage);
  const del = useServerFn(deleteImage);
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function pick(file: File) {
    setBusy(true);
    try {
      const base64 = await fileToBase64(file);
      const res = await upload({ data: { folder, filename: file.name, contentType: file.type, base64 } });
      onChange(res.url);
    } catch (e: any) { toast.error(e.message ?? "Upload failed"); }
    finally { setBusy(false); }
  }

  async function clear() {
    if (value) await del({ data: { path: value } }).catch(() => {});
    onChange(null);
  }

  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">{label}</div>
      <div className="flex items-start gap-3">
        {value ? (
          <div className="relative w-32 h-32 bg-muted">
            <img src={value} alt="" className="w-full h-full object-cover" />
            <button type="button" onClick={clear} className="absolute top-1 right-1 bg-background/90 p-1 hover:bg-background">
              <X className="size-3" />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => inputRef.current?.click()} className="w-32 h-32 border-2 border-dashed border-input flex items-center justify-center hover:border-accent text-muted-foreground">
            {busy ? <Loader2 className="size-5 animate-spin" /> : <Upload className="size-5" />}
          </button>
        )}
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && pick(e.target.files[0])} />
      </div>
    </div>
  );
}

export function MultiImageUploader({
  values, onChange, folder = "misc", label = "Images",
}: { values: string[]; onChange: (urls: string[]) => void; folder?: string; label?: string }) {
  const upload = useServerFn(uploadImage);
  const del = useServerFn(deleteImage);
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function pick(files: FileList) {
    setBusy(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const base64 = await fileToBase64(file);
        const res = await upload({ data: { folder, filename: file.name, contentType: file.type, base64 } });
        uploaded.push(res.url);
      }
      onChange([...values, ...uploaded]);
    } catch (e: any) { toast.error(e.message ?? "Upload failed"); }
    finally { setBusy(false); if (inputRef.current) inputRef.current.value = ""; }
  }

  async function remove(idx: number) {
    const url = values[idx];
    if (url) await del({ data: { path: url } }).catch(() => {});
    onChange(values.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">{label}</div>
      <div className="flex flex-wrap gap-3">
        {values.map((v, i) => (
          <div key={i} className="relative w-24 h-24 bg-muted">
            <img src={v} alt="" className="w-full h-full object-cover" />
            <button type="button" onClick={() => remove(i)} className="absolute top-0.5 right-0.5 bg-background/90 p-1 hover:bg-background">
              <X className="size-3" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => inputRef.current?.click()} className="w-24 h-24 border-2 border-dashed border-input flex items-center justify-center hover:border-accent text-muted-foreground">
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
        </button>
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && pick(e.target.files)} />
      </div>
    </div>
  );
}
