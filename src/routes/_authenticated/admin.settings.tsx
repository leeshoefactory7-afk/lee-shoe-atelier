import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: () => (
    <div>
      <h1 className="font-serif text-4xl">Settings</h1>
      <p className="text-muted-foreground mt-4">Site configuration is managed in <code className="text-accent">src/lib/site-config.ts</code>.</p>
      <div className="mt-6 border border-border p-6 text-sm space-y-2">
        <div><strong>Brand:</strong> {SITE.name}</div>
        <div><strong>Email:</strong> {SITE.email}</div>
        <div><strong>WhatsApp:</strong> {SITE.whatsapp}</div>
      </div>
    </div>
  ),
});
