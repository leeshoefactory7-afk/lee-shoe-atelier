
-- Atomic order placement callable by anon/authenticated without service role.
CREATE OR REPLACE FUNCTION public.place_order(header jsonb, items jsonb)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_order public.orders;
  item jsonb;
  effective_user uuid := auth.uid();
BEGIN
  IF header IS NULL OR items IS NULL OR jsonb_array_length(items) = 0 THEN
    RAISE EXCEPTION 'Invalid order payload';
  END IF;

  INSERT INTO public.orders (
    order_number, user_id, customer_name, company_name, email, phone,
    country, city, postal_code, shipping_address, billing_address, notes,
    subtotal, shipping, total, status
  ) VALUES (
    header->>'order_number',
    effective_user,
    header->>'customer_name',
    NULLIF(header->>'company_name',''),
    header->>'email',
    NULLIF(header->>'phone',''),
    NULLIF(header->>'country',''),
    NULLIF(header->>'city',''),
    NULLIF(header->>'postal_code',''),
    NULLIF(header->>'shipping_address',''),
    NULLIF(header->>'billing_address',''),
    NULLIF(header->>'notes',''),
    COALESCE((header->>'subtotal')::numeric, 0),
    COALESCE((header->>'shipping')::numeric, 0),
    COALESCE((header->>'total')::numeric, 0),
    'pending'::order_status
  )
  RETURNING * INTO new_order;

  FOR item IN SELECT * FROM jsonb_array_elements(items)
  LOOP
    INSERT INTO public.order_items (
      order_id, product_id, product_name, product_image, size, color,
      quantity, unit_price, subtotal
    ) VALUES (
      new_order.id,
      NULLIF(item->>'product_id','')::uuid,
      item->>'product_name',
      NULLIF(item->>'product_image',''),
      NULLIF(item->>'size',''),
      NULLIF(item->>'color',''),
      COALESCE((item->>'quantity')::int, 1),
      COALESCE((item->>'unit_price')::numeric, 0),
      COALESCE((item->>'quantity')::int, 1) * COALESCE((item->>'unit_price')::numeric, 0)
    );
  END LOOP;

  RETURN new_order.order_number;
END;
$$;

REVOKE ALL ON FUNCTION public.place_order(jsonb, jsonb) FROM public;
GRANT EXECUTE ON FUNCTION public.place_order(jsonb, jsonb) TO anon, authenticated;

-- Lookup by order number + email (no PII enumeration; both must match).
CREATE OR REPLACE FUNCTION public.get_order_by_number_email(_order_number text, _email text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  o public.orders;
  its jsonb;
BEGIN
  IF _order_number IS NULL OR _email IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT * INTO o FROM public.orders
    WHERE order_number = _order_number
      AND lower(trim(email)) = lower(trim(_email))
    LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  SELECT COALESCE(jsonb_agg(to_jsonb(oi)), '[]'::jsonb) INTO its
    FROM public.order_items oi WHERE oi.order_id = o.id;

  RETURN jsonb_build_object('order', to_jsonb(o), 'items', its);
END;
$$;

REVOKE ALL ON FUNCTION public.get_order_by_number_email(text, text) FROM public;
GRANT EXECUTE ON FUNCTION public.get_order_by_number_email(text, text) TO anon, authenticated;
