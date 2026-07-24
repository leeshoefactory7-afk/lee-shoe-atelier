
-- Product color variants (each color has its own image set)
CREATE TABLE IF NOT EXISTS public.product_colors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  hex TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.product_colors TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_colors TO authenticated;
GRANT ALL ON public.product_colors TO service_role;

ALTER TABLE public.product_colors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pc_public_read" ON public.product_colors FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "pc_admin_write" ON public.product_colors FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS idx_product_colors_product ON public.product_colors(product_id);

CREATE TRIGGER trg_product_colors_updated BEFORE UPDATE ON public.product_colors
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Storage policies: admins can write to product-images bucket; anyone authenticated can read
CREATE POLICY "product_images_admin_all" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'::app_role));
