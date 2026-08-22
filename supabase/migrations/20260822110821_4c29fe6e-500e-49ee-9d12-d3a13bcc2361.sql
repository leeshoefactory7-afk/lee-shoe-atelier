ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS notified_at timestamptz,
  ADD COLUMN IF NOT EXISTS notify_error text;

CREATE OR REPLACE FUNCTION public.mark_order_notified(_order_number text, _ok boolean, _error text DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.orders
     SET notified_at = CASE WHEN _ok THEN now() ELSE notified_at END,
         notify_error = CASE WHEN _ok THEN NULL ELSE left(coalesce(_error,'unknown error'), 500) END
   WHERE order_number = _order_number;
  RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION public.mark_order_notified(text, boolean, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.mark_order_notified(text, boolean, text) TO anon, authenticated, service_role;