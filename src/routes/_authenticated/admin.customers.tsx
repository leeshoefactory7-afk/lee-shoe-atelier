import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/customers")({
  component: () => (
    <div>
      <h1 className="font-serif text-4xl">Customers</h1>
      <p className="text-muted-foreground mt-4">Customer management coming soon. Data is available in Lovable Cloud.</p>
    </div>
  ),
});
