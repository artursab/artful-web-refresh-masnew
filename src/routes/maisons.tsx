import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { lazy, Suspense } from "react";
import { useT } from "@/lib/i18n";

const CatalogueFlipbook = lazy(() => import("@/components/CatalogueFlipbook"));

export const Route = createFileRoute("/maisons")({
  head: () => ({
    meta: [
      { title: "Catalogue de maisons bois — Dorf SIA" },
      {
        name: "description",
        content:
          "Catalogue Dorf SIA : projets personnalisés et gamme traditionnelle en ossature bois.",
      },
      { property: "og:title", content: "Catalogue — Dorf SIA" },
      { property: "og:description", content: "Catalogue de maisons ossature bois sur-mesure." },
      { property: "og:url", content: "/maisons" },
    ],
    links: [{ rel: "canonical", href: "/maisons" }],
  }),
  component: Models,
});

function Models() {
  const { t } = useT();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <header className="max-w-[44ch] mb-12 md:mb-16">
          <h1 className="font-serif text-5xl md:text-6xl italic text-charcoal mb-6">
            {t("models.title")}
          </h1>
          <p className="text-lg text-charcoal/70 leading-relaxed">{t("models.lead")}</p>
        </header>

        <Suspense
          fallback={
            <div className="mx-auto max-w-5xl aspect-[1/1.414] md:aspect-[1.414/1] w-full rounded-lg bg-stone-100 ring-1 ring-charcoal/10 animate-pulse" />
          }
        >
          <CatalogueFlipbook />
        </Suspense>

        <div className="mt-14 md:mt-20 flex justify-center">
          <Link
            to="/configurateur"
            className="inline-flex items-center gap-3 bg-charcoal text-cream pl-6 pr-3 py-3 rounded-full text-sm font-medium hover:bg-moss transition-colors"
          >
            Configurer un projet similaire
            <span className="size-7 flex items-center justify-center bg-cream/15 rounded-full">
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
