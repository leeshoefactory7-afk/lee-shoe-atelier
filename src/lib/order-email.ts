import { SITE } from "./site-config";

export type OrderEmailItem = {
  product_name: string;
  color?: string | null;
  size?: string | null;
  quantity: number;
  unit_price: number;
};

export type OrderEmailHeader = {
  order_number: string;
  customer_name: string;
  company_name?: string | null;
  email: string;
  phone?: string | null;
  country?: string | null;
  city?: string | null;
  postal_code?: string | null;
  shipping_address?: string | null;
  billing_address?: string | null;
  notes?: string | null;
  subtotal: number;
  shipping: number;
  total: number;
};

/** Builds the FormSubmit payload for an order. Isomorphic — no browser/server APIs. */
export function buildOrderEmailPayload(header: OrderEmailHeader, items: OrderEmailItem[]) {
  const itemsText = items
    .map(
      (it, i) =>
        `${i + 1}. ${it.product_name}${it.color ? ` · ${it.color}` : ""}${it.size ? ` · size ${it.size}` : ""} × ${it.quantity} @ $${Number(it.unit_price).toFixed(2)} = $${(it.quantity * Number(it.unit_price)).toFixed(2)}`,
    )
    .join("\n");

  return {
    _subject: `Lee · New order ${header.order_number}`,
    _template: "table",
    _captcha: "false",
    order_number: header.order_number,
    customer_name: header.customer_name,
    company_name: header.company_name ?? "",
    email: header.email,
    phone: header.phone ?? "",
    country: header.country ?? "",
    city: header.city ?? "",
    postal_code: header.postal_code ?? "",
    shipping_address: header.shipping_address ?? "",
    billing_address: header.billing_address ?? "",
    notes: header.notes ?? "",
    subtotal: `$${Number(header.subtotal).toFixed(2)}`,
    shipping: `$${Number(header.shipping).toFixed(2)}`,
    total: `$${Number(header.total).toFixed(2)}`,
    items: itemsText,
  };
}

export const FORMSUBMIT_URL = SITE.formsubmitUrl;
