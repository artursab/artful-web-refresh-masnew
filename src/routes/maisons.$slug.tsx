import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getModel } from "@/lib/models";
import { formatPrice } from "@/lib/configurator-store";

export const Route = createFileRoute("/maisons/$slug")({
  loader: ({ params }) => {
    const model = getModel(params.slug);
    if (!model) throw notFound();
    return { model };
  },
  head: ({ loaderData }) => {
    const m = loaderData?.model;
    return {
      meta: [
        { title: m ? `${m.name} — Dorf SIA` : "Modèle — Dorf SIA" },
        {
          name: "description",
          content: m?.description.fr ?? "Modèle de maison ossature bois Dorf SIA.",
        },
        { property: "og:title", content: m ? `${m.name} — Dorf SIA` : "Modèle — Dorf SIA" },
        { property: "og:description", content: m?.description.fr ?? "" },
        { property: "og:type", content: "product" },
        { property: "og:image", content: m?.image ?? "" },
        { property: "og:url", content: m ? `/maisons/${m.slug}` : "/maisons" },
      ],
      links: m ? [{ rel: "canonical", href: `/maisons/${m.slug}` }] : [],
      scripts: m
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: m.name,
                description: m.description.fr,
                offers: { "@type": "Offer", price: m.basePrice, priceCurrency: "EUR" },
              }),
            },
          ]
        : [],
    };
  },
  notFoundComponent: () => (
    <div className="py-24 text-center">
      <p className="text-charcoal/60">Modèle introuvable.</p>
      <Link to="/maisons" className="mt-6 inline-block text-oak underline">
        Retour aux modèles
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="py-24 text-center text-charcoal/60">{error.message}</div>
  ),
  component: ModelDetail,
});

function ModelDetail() {
  const { model } = Route.useLoaderData();
  const { t, locale } = useT();

  return (
    <div className="py-16">
      <div className="max-w-screen-xl mx-auto px-6">
        <Link
          to="/maisons"
          className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-oak transition-colors mb-10"
        >
          <ArrowLeft size={14} /> {t("models.back")}
        </Link>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-charcoal/5 bg-stone-100">
            <img
              src={model.image}
              alt={model.name}
              width={1024}
              height={1280}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:sticky lg:top-28">
            <span className="text-oak text-xs uppercase tracking-[0.2em] font-medium">
              {model.tagline[locale]}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl italic text-charcoal mt-3 mb-6">
              {model.name}
            </h1>
            <p className="text-charcoal/70 leading-relaxed text-lg mb-10">
              {model.description[locale]}
            </p>

            <dl className="grid grid-cols-3 gap-6 py-8 border-y border-charcoal/10 mb-10">
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-charcoal/50 mb-2">
                  {t("models.from")}
                </dt>
                <dd className="font-serif text-2xl">{formatPrice(model.basePrice, locale)}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-charcoal/50 mb-2">
                  {t("models.surface")}
                </dt>
                <dd className="font-serif text-2xl">{model.baseSurface} m²</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-charcoal/50 mb-2">
                  {t("models.bedrooms")}
                </dt>
                <dd className="font-serif text-2xl">{model.defaultBedrooms}</dd>
              </div>
            </dl>

            <Link
              to="/configurateur"
              search={{ m: model.slug }}
              className="inline-flex items-center gap-3 bg-charcoal text-cream pl-6 pr-3 py-3 rounded-full text-sm font-medium hover:bg-moss transition-colors"
            >
              {t("models.configure")}
              <span className="size-7 flex items-center justify-center bg-cream/15 rounded-full">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
