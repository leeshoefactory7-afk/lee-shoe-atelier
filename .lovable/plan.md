# Remove Shopify & Build Full Admin CRUD

## 1. Remove Shopify completely
- Delete: `src/lib/shopify.ts`, `src/stores/shopifyCartStore.ts`, `src/hooks/useCartSync.ts`, `src/components/site/ShopifyCartDrawer.tsx`, `src/routes/shop.tsx`, `src/routes/product.$handle.tsx`
- Uninstall shopify env usage; remove `useCartSync` from `__root.tsx`
- Header: swap `ShopifyCartDrawer` back to local cart drawer linking to `/cart`; primary nav uses `/products`
- Keep local `cart-store.ts` + `/cart` + `/checkout` as the real flow

## 2. Checkout via FormSubmit.co
- `/checkout` posts order to `info@leeshoefactory.com` via FormSubmit (already in `forms.functions.ts` pattern)
- Still persist order in Supabase `orders` + `order_items`, then fire FormSubmit email with full order details
- Order success page shows confirmation + order number

## 3. Storage for images (Supabase Storage)
- Create public bucket `product-images` via `supabase--storage_create_bucket`
- RLS: public read, admin-only write (policy on `storage.objects` using `has_role`)
- Add `uploadProductImage` server fn using `supabaseAdmin.storage` returning public URL
- Admin UI uses `<input type="file">` → server fn → returns URL stored on product

## 4. Schema updates (migration)
- Add `product_colors` table:
  - `id`, `product_id` (fk cascade), `name`, `hex`, `images` (text[] of URLs), `sort_order`
  - GRANTs + RLS: public read via products.status='active'; admin write
- Keep existing `products.colors` jsonb for backward compat but new UI uses `product_colors`
- Add `site_settings` writable rows for editable brand/contact/hero content (table exists — extend usage)

## 5. Admin CRUD (all under `/admin/*`)
Expand `src/lib/admin.functions.ts` with full CRUD:
- **Products**: create/update/delete + manage color variants + image uploads (multi)
- **Categories**: full CRUD w/ image
- **Blog posts**: full CRUD w/ cover image + rich text (textarea markdown)
- **Gallery images**: upload/delete
- **Reviews**: approve/reject/delete
- **Orders**: status update (exists) + view details + delete
- **Customers**: list + role management (promote/demote admin)
- **Site settings**: edit brand name, contact info, hero copy, social links, About/Manufacturing/etc. page content
- **Contact messages / newsletter**: list + export

New admin routes:
- `admin.products.new.tsx`, `admin.products.$id.edit.tsx`
- `admin.categories.tsx`, `admin.categories.new.tsx`, `admin.categories.$id.edit.tsx`
- `admin.blog.tsx`, `admin.blog.new.tsx`, `admin.blog.$id.edit.tsx`
- `admin.gallery.tsx`
- `admin.messages.tsx`
- `admin.settings.tsx` (rewrite as editable form)
- Extend `admin.customers.tsx` with role toggle
- Extend `admin.reviews.tsx` with approve/reject actions

Reusable `<ImageUploader />` and `<MultiImageUploader />` components.
Reusable `<ColorVariantEditor />` (name + hex + multi-image upload).

## 6. Public site reads editable content
- Homepage hero, About, Manufacturing etc. read from `site_settings` when present, fallback to hardcoded copy
- Product detail: read `product_colors` → color swatches switch image gallery

## 7. Verification
- Typecheck (`tsgo`)
- Manual: create product with 2 colors + images as admin, view on `/products/:slug`, add to cart, checkout → FormSubmit email received + order in DB

## Technical notes
- Storage bucket public for simple `<img src>`; upload only via authenticated admin server fn (RLS on `storage.objects`)
- FormSubmit endpoint: `https://formsubmit.co/ajax/info@leeshoefactory.com`
- All admin mutations gated by `has_role(uid,'admin')` check in server fn
- `site_settings` uses key/value JSON rows so new editable fields don't need schema changes
