import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Download, ArrowRight, ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { MODELS } from "@/lib/models";
import { formatPrice } from "@/lib/configurator-store";

const CatalogueFlipbook = lazy(() => import("@/components/CatalogueFlipbook"));

export const Route = createFileRoute("/catalogue")({
  head: () => ({
    meta: [
      { title: "Catalogue & modèles — Envibois" },
      {
        name: "description",
        content:
          "Découvrez les 6 gammes Envibois et feuilletez le catalogue : modèles, finitions, prix indicatifs et savoir-faire de l'atelier.",
      },
      { property: "og:title", content: "Catalogue & modèles — Envibois" },
      { property: "og:description", content: "Six gammes de maisons ossature bois et catalogue interactif." },
      { property: "og:url", content: "/catalogue" },
    ],
    links: [{ rel: "canonical", href: "/catalogue" }],
  }),
  component: Catalogue,
});

function Catalogue() {
  const { t, locale } = useT();
  const isFr = locale === "fr";

  return (
    <div className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
        <header className="max-w-[58ch] mb-16 md:mb-20">
          <p className="eyebrow mb-6">— {isFr ? "Catalogue" : "Catalogue"}</p>
          <h1 className="font-serif text-5xl md:text-7xl italic text-charcoal leading-[1.02] mb-6">
            {isFr ? "Six gammes, une seule exigence." : "Six ranges, one standard."}
          </h1>
          <p className="text-lg text-charcoal/65 leading-relaxed">
            {isFr
              ? "Du chalet traditionnel à l'architecture cubique contemporaine, chaque gamme Envibois est conçue pour s'adapter à un terrain, un climat et un mode de vie."
              : "From the traditional chalet to contemporary cubic architecture, every Envibois range is designed to fit a site, a climate and a lifestyle."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/configurateur"
              className="inline-flex items-center gap-3 bg-charcoal text-bone px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-ink transition-colors"
            >
              {isFr ? "Lancer le configurateur" : "Open the configurator"} <ArrowRight size={14} />
            </Link>
            <a
              href="/catalogue.pdf"
              download
              className="inline-flex items-center gap-3 border border-charcoal/30 text-charcoal px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-colors"
            >
              <Download size={14} />
              {isFr ? "Télécharger le PDF" : "Download the PDF"}
            </a>
          </div>
        </header>

        {/* GAMMES GRID */}
        <section className="mb-24 md:mb-32">
          <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-serif text-3xl md:text-5xl italic text-charcoal">
              {isFr ? "Nos six gammes." : "Our six ranges."}
            </h2>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-charcoal/50">
              {MODELS.length} {isFr ? "modèles" : "ranges"}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {MODELS.map((m) => (
              <Link
                key={m.slug}
                to="/maisons/$slug"
                params={{ slug: m.slug }}
                className="group block"
              >
                <div className="overflow-hidden mb-6 aspect-[4/5] bg-secondary">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-serif text-2xl md:text-3xl italic text-charcoal group-hover:text-gold transition-colors">
                    {m.name}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    className="mt-2 text-charcoal/40 group-hover:text-gold transition-colors shrink-0"
                  />
                </div>
                <p className="text-charcoal/65 leading-relaxed text-sm mb-4">{m.tagline[locale]}</p>
                <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/50 pt-4 border-t border-charcoal/10">
                  <span>{t("models.from")} <span className="text-charcoal font-medium">{formatPrice(m.basePrice, locale)}</span></span>
                  <span>{m.baseSurface} m²</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FLIPBOOK */}
        <section>
          <div className="mb-10">
            <p className="eyebrow mb-4">— {isFr ? "Édition complète" : "Complete edition"}</p>
            <h2 className="font-serif text-3xl md:text-5xl italic text-charcoal">
              {isFr ? "Feuilletez le catalogue." : "Browse the catalogue."}
            </h2>
          </div>
          <Suspense
            fallback={
              <div className="mx-auto max-w-5xl aspect-[1/1.414] md:aspect-[1.414/1] w-full bg-secondary animate-pulse" />
            }
          >
            <CatalogueFlipbook />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
