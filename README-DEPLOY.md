# Déploiement

Le projet est une SPA statique (pas de backend). Le même dossier `dist/` fonctionne sur GitHub Pages **et** sur OVH mutualisé.

## Lancer en local

Prérequis : Bun ≥ 1.1 (recommandé) **ou** Node ≥ 20 + npm.

### Avec Bun

```bash
bun install
bun run dev          # http://localhost:8080
```

### Avec npm

```bash
npm install
npm run dev
```

### Tester le build statique (identique à GitHub Pages / OVH)

```bash
# Build « racine » (comme OVH domaine principal ou custom domain GitHub) :
PAGES_BASE=/ bunx vite build --config vite.config.pages.ts
bunx serve dist                       # http://localhost:3000

# Build sous-dossier (comme GitHub Pages /dorfart/) :
PAGES_BASE=/dorfart/ bunx vite build --config vite.config.pages.ts
bunx serve dist                       # ouvrir http://localhost:3000/dorfart/
```

Avec npm, remplacer `bunx` par `npx`.


## GitHub Pages (automatique)

1. Pousser le projet complet sur `artursab/dorfart`.
2. GitHub → **Settings → Pages → Source: GitHub Actions**.
3. Chaque push sur `master` reconstruit et publie sur `https://artursab.github.io/dorfart/`.

Le workflow (`.github/workflows/deploy.yml`) gère tout : base path `/dorfart/`, fallback `404.html`, `.nojekyll`.

## OVH mutualisé (FTP)

### 1. Builder en local

```bash
bun install

# Domaine ou sous-domaine racine (https://mon-domaine.tld/) :
PAGES_BASE=/ bunx vite build --config vite.config.pages.ts

# OU sous-dossier (https://mon-domaine.tld/dorfart/) :
PAGES_BASE=/dorfart/ bunx vite build --config vite.config.pages.ts
```

### 2. Uploader

Envoyer **le contenu** du dossier `dist/` (y compris le fichier caché `.htaccess`) via FTP / Gestionnaire de fichiers OVH dans `www/` (ou `www/dorfart/` si sous-dossier).

> ⚠️ Vérifier que `.htaccess` est bien uploadé — certains clients FTP masquent les fichiers commençant par un point. Dans FileZilla : Serveur → Forcer l'affichage des fichiers cachés.

### 3. C'est tout

Pas de Node, pas de PHP, pas de base de données nécessaires côté OVH. Le `.htaccess` gère le routage client (refresh sur `/maisons/xxx` fonctionne) et le cache des assets.

## Notes

- `vite.config.pages.ts` est dédié au build statique. `vite.config.ts` reste utilisé par l'éditeur Lovable (preview SSR) — ne pas y toucher.
- Pour publier la preview Lovable, utiliser le bouton **Publish** (rien à voir avec ce déploiement statique).
