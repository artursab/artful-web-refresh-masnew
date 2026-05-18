// Static SPA build for GitHub Pages.
// Used ONLY by the GitHub Actions workflow — Lovable dev keeps using vite.config.ts.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// Set via env so we can flip between subpath ("/<repo>/") and root ("/") for custom domains.
const base = process.env.PAGES_BASE ?? "/JulienLading-main/";

export default defineConfig({
  base,
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "src/routes",
      generatedRouteTree: "src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
