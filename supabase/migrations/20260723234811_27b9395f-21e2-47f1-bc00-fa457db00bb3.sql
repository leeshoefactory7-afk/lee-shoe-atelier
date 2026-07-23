
-- Fix search_path on functions
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- Restrict has_role execute so it's only callable by authenticated & service_role
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
-- handle_new_user runs via trigger only; keep only service_role can call directly
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

-- Narrow permissive INSERT policies to include validated shape (still allows guest checkout / newsletter but not blanket true).
-- Replace WITH CHECK (true) with column-based guards.
DROP POLICY IF EXISTS "orders_public_insert" ON public.orders;
CREATE POLICY "orders_public_insert" ON public.orders FOR INSERT TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND customer_name IS NOT NULL AND status = 'pending'
    AND (auth.uid() IS NULL OR user_id = auth.uid() OR user_id IS NULL)
  );

DROP POLICY IF EXISTS "oi_public_insert" ON public.order_items;
CREATE POLICY "oi_public_insert" ON public.order_items FOR INSERT TO anon, authenticated
  WITH CHECK (product_name IS NOT NULL AND quantity > 0);

DROP POLICY IF EXISTS "news_public_insert" ON public.newsletter_subscribers;
CREATE POLICY "news_public_insert" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated
  WITH CHECK (email IS NOT NULL AND email <> '' AND length(email) < 320);

DROP POLICY IF EXISTS "msg_public_insert" ON public.contact_messages;
CREATE POLICY "msg_public_insert" ON public.contact_messages FOR INSERT TO anon, authenticated
  WITH CHECK (name IS NOT NULL AND email IS NOT NULL AND message IS NOT NULL AND length(message) < 5000 AND handled = false);
