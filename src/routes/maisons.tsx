import { createFileRoute, Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { MODELS } from "@/lib/models";
import { formatPrice } from "@/lib/configurator-store";

export const Route = createFileRoute("/maisons")({
  head: () => ({
    meta: [
      { title: "Modèles de maisons bois — Dorf SIA" },
      {
        name: "description",
        content:
          "Découvrez le catalogue de maisons en ossature bois Dorf SIA : du studio au plain-pied panoramique en passant par le chalet contemporain.",
      },
      { property: "og:title", content: "Modèles — Dorf SIA" },
      { property: "og:description", content: "Catalogue de maisons ossature bois sur-mesure." },
      { property: "og:url", content: "/maisons" },
    ],
    links: [{ rel: "canonical", href: "/maisons" }],
  }),
  component: Models,
});

function Models() {
  const { t, locale } = useT();
  return (
    <div className="py-24">
      <div className="max-w-screen-xl mx-auto px-6">
        <header className="max-w-[44ch] mb-16">
          <h1 className="font-serif text-5xl md:text-6xl italic text-charcoal mb-6">
            {t("models.title")}
          </h1>
          <p className="text-lg text-charcoal/70 leading-relaxed">{t("models.lead")}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
          {MODELS.map((m, i) => (
            <Link
              key={m.slug}
              to="/maisons/$slug"
              params={{ slug: m.slug }}
              className="group block"
            >
              <div
                className={`aspect-[4/5] rounded-xl overflow-hidden ring-1 ring-charcoal/5 mb-6 bg-stone-100 ${
                  i % 2 === 1 ? "md:mt-16" : ""
                }`}
              >
                <img
                  src={m.image}
                  alt={m.name}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="font-serif text-3xl mb-1">{m.name}</h2>
                  <p className="text-sm text-charcoal/60">{m.tagline[locale]}</p>
                </div>
                <p className="text-xs text-oak font-medium uppercase tracking-wider whitespace-nowrap">
                  {t("models.from")} {formatPrice(m.basePrice, locale)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
