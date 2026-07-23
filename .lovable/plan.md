
# Lee Shoe Factory — Full Build Plan

Building a premium storefront + customer accounts + full admin dashboard + blog + gallery + all info pages in one pass. Given the scope, each area will be functional and cohesively styled, but individual pages will be less deeply detailed than a narrower build. Expect follow-up iterations for polish.

## Design System

- Palette: near-black `#0A0A0A`, ivory `#FAFAF7`, charcoal `#1A1A1A`, warm gold `#C9A961`, muted neutrals. Dark accents on light base.
- Typography: `Cormorant Garamond` (display serif) + `Inter` (body). Loaded via `<link>` in `__root.tsx`.
- Tokens defined in `src/styles.css` (`--gold`, `--charcoal`, gradient/shadow tokens). No hardcoded colors in components.
- Subtle radius (`6px`), soft elevated shadows, generous whitespace, hairline gold dividers.
- Motion: Framer Motion for section reveals, image parallax on hero, hover lifts. Restrained.

## Backend (Lovable Cloud)

Enable Cloud, then migrations for:

- `profiles` (id → auth.users, name, phone, country, avatar_url)
- `user_roles` + `app_role` enum (`admin`, `customer`) + `has_role()` security-definer fn
- `categories` (slug, name, parent_id, image, seo)
- `products` (slug, name, price, discount_price, sku, category_id, brand, gender, material, weight, description, features[], care, status, flags: featured/bestseller/new/limited, stock)
- `product_images`, `product_variants` (size, color, stock)
- `reviews` (product_id, user_id, rating, title, body, verified, image_url, status)
- `orders` (order_number, user_id nullable, customer snapshot, address, totals, status enum, notes)
- `order_items`
- `wishlists`, `cart_items` (user-scoped; guest cart in localStorage)
- `addresses`
- `blog_posts` (+ categories, tags), `gallery_images`, `newsletter_subscribers`, `contact_messages`, `bulk_order_requests`, `distributor_requests`
- `site_settings` (key/value)

RLS on every table with `GRANT` blocks. Public-read for products/categories/blog/gallery/approved-reviews via `TO anon`. Owner-scoped for cart/wishlist/orders/addresses. Admin-only writes via `has_role(auth.uid(),'admin')`.

Storage buckets: `product-images` (public), `blog-images` (public), `gallery` (public), `avatars` (public), `review-images` (public).

Auth: email/password + Google OAuth via `lovable.auth.signInWithOAuth`. Password reset with `/reset-password` route. First user auto-promoted to admin via trigger; subsequent admins promoted from admin UI.

## Routes

Public storefront (top-level):
- `/` home, `/about`, `/contact`, `/reviews`, `/gallery`, `/faq`, `/blog`, `/blog/$slug`
- `/products`, `/products/$slug`, `/category/$slug`
- `/cart`, `/checkout`, `/order-success/$orderNumber`, `/track-order`
- `/manufacturing`, `/oem`, `/private-label`, `/wholesale`, `/bulk-orders`, `/become-distributor`, `/request-quote`, `/factory-tour`, `/sustainability`, `/careers`
- `/shipping`, `/returns`, `/refund-policy`, `/privacy`, `/cookies`, `/terms`, `/size-guide`, `/shoe-care`
- `/auth`, `/reset-password`
- `/sitemap.xml`, `/robots.txt`

Authenticated (`_authenticated/`):
- `/account`, `/account/orders`, `/account/orders/$id`, `/account/wishlist`, `/account/addresses`, `/account/profile`, `/account/security`

Admin (`_authenticated/admin/` gated by `has_role('admin')`):
- `/admin` overview, `/admin/products` (+ new/edit), `/admin/categories`, `/admin/orders` (+ detail), `/admin/customers`, `/admin/reviews`, `/admin/messages`, `/admin/newsletter`, `/admin/gallery`, `/admin/blog` (+ editor), `/admin/pages`, `/admin/analytics`, `/admin/settings`, `/admin/users`

Each public route defines its own `head()` with unique title/description/OG. Route-level canonicals. JSON-LD for Organization (root), Product, Article, Review, FAQ, Breadcrumb.

## Data / Content

- Seed migration inserts ~40 products across categories (leather, sneakers, sports, formal, boots, women's, kids), 8 blog posts, 30 gallery images, 55 approved reviews with RandomUser avatars, categories tree, site_settings defaults.
- Product/blog/gallery images use `data-lov-image-placeholder` → generated via imagegen (batched) or Unsplash placeholders where volume is too high.

## Key Features

- Cart: Zustand store, localStorage persist; syncs to DB `cart_items` on sign-in.
- Wishlist: DB-backed for signed-in users, localStorage fallback.
- Search: client-side fuzzy search over products (Fuse.js) + suggestions.
- Filters/sort on catalog (category, gender, price, size, color, brand).
- Product page: image gallery + zoom + lightbox, variant picker, related products (same category), recently viewed (localStorage).
- Checkout: no payment processing; submits order to DB, then POSTs summary to `https://formsubmit.co/ajax/info@leeshoefactory.com`. Generates order number `LSF-YYYYMMDD-XXXX`.
- Contact / bulk / distributor / quote forms → DB + FormSubmit.
- Reviews page: paginated, filterable, verified badges, rating summary.
- Newsletter: DB insert + FormSubmit notification.
- Admin: TanStack Table for lists, forms with react-hook-form + zod, image uploads via Storage, order status workflow, review moderation, blog editor (textarea + markdown render — not a rich WYSIWYG in this pass), analytics from real DB counts (revenue/traffic as placeholders per spec).

## SEO / Infrastructure

- Dynamic `/sitemap.xml` server route pulling products, categories, blog posts (published only).
- `public/robots.txt` allowing all.
- JSON-LD per page type. Breadcrumbs component on catalog/product/blog.
- Semantic HTML, alt text on all images, lazy loading, `<h1>` per route.

## Tech

- TanStack Start + Query (loader `ensureQueryData` + `useSuspenseQuery`).
- Server functions in `src/lib/*.functions.ts`; `requireSupabaseAuth` for user/admin fns; publishable-key server client for public reads.
- Framer Motion, lucide-react icons, shadcn components (Button, Card, Dialog, Sheet, Tabs, Table, Form, Sonner toasts, Carousel).
- Zustand for cart, Fuse.js for search, react-hook-form + zod for forms.

## Explicit Scope Cuts (to keep quality up in one pass)

- Blog editor is markdown textarea, not a rich WYSIWYG.
- "Compare products" and product video upload deferred (video field exists in schema, UI not built).
- Analytics dashboard uses real DB counts; visitors/traffic sources/conversion are labeled placeholders per spec.
- Roles & Permissions UI is admin-only role grant (no granular permissions matrix).
- Activity logs surfaced as a simple audit table for admin actions.
- Notifications shown as in-app toasts + a bell dropdown of recent admin events; no email/push.

## Build Order

1. Enable Lovable Cloud, run schema + seed migrations, create storage buckets.
2. Design system (`styles.css`, fonts, root layout, header/footer, mega menu).
3. Auth (email + Google) + `_authenticated` gate + account pages.
4. Storefront: home, catalog, product, cart, checkout, order success, reviews, contact, gallery, about, blog + all info/policy pages.
5. Admin dashboard: all sections above.
6. SEO: sitemap, robots, per-route head(), JSON-LD, breadcrumbs.
7. Image generation pass + final polish, empty/error/404 states, back-to-top, loading skeletons.

I will confirm Google OAuth setup during build and prompt you if any secrets are needed.
