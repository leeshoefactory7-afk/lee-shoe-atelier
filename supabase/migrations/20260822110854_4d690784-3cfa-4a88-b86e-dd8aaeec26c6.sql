DROP FUNCTION IF EXISTS public.mark_order_notified(text, boolean, text);

CREATE OR REPLACE FUNCTION public.mark_order_notified(_order_number text, _email text, _ok boolean, _error text DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _updated boolean := false;
BEGIN
  UPDATE public.orders
     SET notified_at = CASE WHEN _ok THEN now() ELSE notified_at END,
         notify_error = CASE WHEN _ok THEN NULL ELSE left(coalesce(_error,'unknown error'), 500) END
   WHERE order_number = _order_number
     AND lower(email) = lower(_email)
     AND created_at > now() - interval '7 days';
  GET DIAGNOSTICS _updated = ROW_COUNT;
  RETURN _updated;
END;
$$;

REVOKE ALL ON FUNCTION public.mark_order_notified(text, text, boolean, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.mark_order_notified(text, text, boolean, text) TO anon, authenticated, service_role;