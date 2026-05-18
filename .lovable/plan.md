## Good news — no recreation needed

I checked the code. The site has **no real backend**:
- no Supabase, no database, no auth
- no `createServerFn` usage anywhere in `src/routes/` or `src/lib/`
- the only loader (`maisons/$slug`) just looks up an in-memory array

Everything can run as a **pure static SPA**. The same `dist/` folder will work on **GitHub Pages** and on **OVH mutualisé** (shared hosting). We don't need a VPS. We just need a clean static build + the right SPA-fallback file for each host.

You already have `vite.config.pages.ts` from the previous step — we'll reuse it and add what's missing for OVH.

## What I'll set up

### 1. One static build, two deploy targets

| Host | Where it serves from | Base path | SPA fallback file |
|---|---|---|---|
| GitHub Pages | `https://artursab.github.io/dorfart/` | `/dorfart/` | `404.html` (copy of `index.html`) |
| OVH mutualisé (subdomain or root) | `https://your-domain.tld/` | `/` | `.htaccess` rewriting to `index.html` |
| OVH in a subfolder (e.g. `/dorfart/`) | `https://your-domain.tld/dorfart/` | `/dorfart/` | `.htaccess` in that folder |

The base path is already controlled by the `PAGES_BASE` env var in `vite.config.pages.ts`, so the **same config** handles all three cases.

### 2. Files I will add / change

- **`public/.htaccess`** (new) — Apache rewrite rules for OVH:
  - rewrite all unknown URLs to `index.html` so client routing works on refresh
  - send long-cache headers for hashed assets in `/assets/`
  - force HTTPS (optional)
- **`.github/workflows/deploy.yml`** (existing) — already correct; no change needed beyond what we already did (auto-runs on `master`, sets `PAGES_BASE=/dorfart/`, copies `index.html` → `404.html`, writes `.nojekyll`).
- **`README-DEPLOY.md`** (new) — short copy-paste instructions for both hosts (see below).
- I will **not** touch `src/`, `vite.config.ts`, `wrangler.jsonc`, or `src/server.ts`. The Lovable preview keeps working in SSR mode; only the GitHub Actions build produces the static SPA.

### 3. How you deploy

**GitHub Pages** (already wired):
1. Push the full project to `artursab/dorfart` via Lovable's **+ → GitHub → Connect project**.
2. On GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Every push to `master` rebuilds and publishes to `https://artursab.github.io/dorfart/`.

**OVH mutualisé** (manual, one-off or repeated):
1. Locally (or in any CI), run:
   ```
   bun install
   PAGES_BASE=/ bunx vite build --config vite.config.pages.ts
   ```
   Use `PAGES_BASE=/` for a domain root, or `PAGES_BASE=/dorfart/` if you upload into a subfolder.
2. Upload the **contents of `dist/`** (including `.htaccess` and `index.html`) to OVH via FTP / the OVH file manager, into `www/` (or `www/dorfart/`).
3. Done — no Node, no PHP, no database needed on OVH.

If you'd like, I can also add a second GitHub Actions job that produces an **OVH-ready `dist-ovh.zip`** artifact on every push, so you can download and FTP it without building locally.

## Technical notes

- `public/.htaccess` is automatically copied into `dist/` by Vite (everything in `public/` is copied as-is). It will be ignored by GitHub Pages (nginx) and used by OVH (Apache) — safe on both.
- The `loader` in `maisons/$slug.tsx` is fine for SSG/SPA: it's a synchronous lookup, runs on the client during navigation, and TanStack Router handles `notFound()` correctly.
- `src/server.ts`, `wrangler.jsonc`, and `vite.config.ts` stay in the repo so the Lovable editor preview keeps using SSR. They are simply not used by the static build (`vite.config.pages.ts` is a separate, self-contained config).
- `.htaccess` content (preview):
  ```apache
  Options -MultiViews
  RewriteEngine On
  # Don't rewrite real files / directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  # SPA fallback
  RewriteRule ^ index.html [L]

  # Long cache for hashed assets
  <FilesMatch "\.(js|css|woff2|png|jpg|jpeg|webp|svg)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  ```

## Questions before I implement

1. For OVH: will you deploy at the **domain root** (`https://domain.tld/`) or in a **subfolder** (`https://domain.tld/dorfart/`)? This decides the default `PAGES_BASE` I document.
2. Do you want the extra **GitHub Actions job that produces a downloadable `dist-ovh.zip`** on every push, so you never have to build locally?
