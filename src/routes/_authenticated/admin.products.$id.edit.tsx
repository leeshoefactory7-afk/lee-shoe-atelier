import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { adminGetProduct } from "@/lib/admin.functions";
import { useEffect, useState } from "react";
import { ProductForm } from "@/components/admin/ProductForm";

export const Route = createFileRoute("/_authenticated/admin/products/$id/edit")({
  component: EditProduct,
});

function EditProduct() {
  const { id } = Route.useParams();
  const fetchProd = useServerFn(adminGetProduct);
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetchProd({ data: { id } }).then(setData).catch(() => {}); }, [fetchProd, id]);
  if (!data) return <div className="text-muted-foreground">Loading…</div>;
  return <ProductForm product={data.product} colors={data.colors} />;
}
