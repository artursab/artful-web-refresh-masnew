import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import projet1 from "@/assets/projet-1.jpg";
import projet2 from "@/assets/projet-2.jpg";
import projet3 from "@/assets/projet-3.jpg";
import horizon from "@/assets/model-horizon.jpg";
import sequoia from "@/assets/model-sequoia.jpg";
import alpin from "@/assets/model-alpin.jpg";

export const Route = createFileRoute("/realisations")({
  head: () => ({
    meta: [
      { title: "Réalisations — Dorf SIA" },
      {
        name: "description",
        content:
          "Découvrez nos dernières réalisations de maisons ossature bois à travers la France : chalets, maisons familiales et ateliers contemporains.",
      },
      { property: "og:title", content: "Réalisations — Dorf SIA" },
      { property: "og:description", content: "Galerie des maisons ossature bois construites par Dorf SIA." },
      { property: "og:url", content: "/realisations" },
    ],
    links: [{ rel: "canonical", href: "/realisations" }],
  }),
  component: Realisations,
});

const PROJECTS = [
  { img: projet1, title: "Villa Chamonix", place: "Savoie · 2023" },
  { img: projet2, title: "Maison bioclimatique L", place: "Bordeaux · 2022" },
  { img: projet3, title: "L'Atelier d'artiste", place: "Nantes · 2024" },
  { img: horizon, title: "Maison Horizon", place: "Bretagne · 2024" },
  { img: sequoia, title: "Maison Séquoia", place: "Périgord · 2023" },
  { img: alpin, title: "Chalet Vallée", place: "Haute-Savoie · 2022" },
];

function Realisations() {
  const { t } = useT();
  return (
    <div className="py-24">
      <div className="max-w-screen-xl mx-auto px-6">
        <header className="max-w-[44ch] mb-16">
          <h1 className="font-serif text-5xl md:text-6xl italic text-charcoal mb-6">
            {t("projects.title")}
          </h1>
          <p className="text-lg text-charcoal/70">{t("projects.lead")}</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <figure key={i} className="group">
              <div className="aspect-[4/5] rounded-xl overflow-hidden ring-1 ring-charcoal/5 bg-stone-100 mb-4">
                <img
                  src={p.img}
                  alt={p.title}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption>
                <h3 className="font-serif text-xl">{p.title}</h3>
                <p className="text-xs text-oak font-medium uppercase tracking-wider mt-1">
                  {p.place}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
