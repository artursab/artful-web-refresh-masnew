import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { MODELS } from "@/lib/models";

const BASE_URL = "https://pixel-sparkle-revive.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/catalogue", changefreq: "monthly", priority: "0.9" },
          { path: "/configurateur", changefreq: "monthly", priority: "0.9" },
          { path: "/savoir-faire", changefreq: "monthly", priority: "0.8" },
          { path: "/realisations", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", changefreq: "yearly", priority: "0.8" },
          { path: "/mentions-legales", changefreq: "yearly", priority: "0.3" },
          { path: "/cgv", changefreq: "yearly", priority: "0.3" },
          { path: "/rgpd", changefreq: "yearly", priority: "0.3" },
          { path: "/cookies", changefreq: "yearly", priority: "0.3" },
        ];

        for (const m of MODELS) {
          entries.push({ path: `/maisons/${m.slug}`, changefreq: "monthly", priority: "0.7" });
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
