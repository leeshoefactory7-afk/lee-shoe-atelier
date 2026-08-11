# Deploying Lee Shoe Factory (GitHub → Cloudflare Workers)

The app is a TanStack Start project that builds to a Cloudflare Worker
(`.output/server/index.mjs`) plus static assets (`.output/public`).

## 1. Environment variables

Publishable values live in `.env` (committed) and in `wrangler.jsonc` under `vars`:

```
SUPABASE_PROJECT_ID=sqiijqvkfbeyofmbdyww
SUPABASE_URL=https://sqiijqvkfbeyofmbdyww.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_4EaAUdJC_vKuBdx4jL6aPw_aP_pVPHw
VITE_SUPABASE_PROJECT_ID=sqiijqvkfbeyofmbdyww
VITE_SUPABASE_URL=https://sqiijqvkfbeyofmbdyww.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_4EaAUdJC_vKuBdx4jL6aPw_aP_pVPHw
```

`VITE_*` values are inlined at build time, so they must also be present in the
build environment (the GitHub Actions workflow sets them).

The site does **not** require `SUPABASE_SERVICE_ROLE_KEY`. If you ever add a
private key, set it as a Worker secret instead of a var:

```bash
wrangler secret put SOME_SECRET
```

## 2. Deploy from your machine

```bash
bun install
bun run build
bunx wrangler deploy
```

## 3. Deploy from GitHub

Push the repo to GitHub, then add two repository secrets
(Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` — token with "Edit Cloudflare Workers" permission
- `CLOUDFLARE_ACCOUNT_ID` — from the Cloudflare dashboard sidebar

Every push to `main` runs `.github/workflows/deploy-cloudflare.yml`, which
builds and deploys with Wrangler.

## 4. Custom domain

In the Cloudflare dashboard: Workers & Pages → `lee-shoe-factory` → Settings →
Domains & Routes → add `leeshoefactory.com`.
