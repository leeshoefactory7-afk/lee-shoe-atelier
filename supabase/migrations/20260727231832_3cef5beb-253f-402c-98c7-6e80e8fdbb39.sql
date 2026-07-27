
DROP POLICY IF EXISTS orders_public_lookup ON public.orders;
DROP POLICY IF EXISTS oi_public_read ON public.order_items;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
