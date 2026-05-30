import { createFileRoute, Link } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { motion } from "motion/react";
import { useT } from "@/lib/i18n";
import pool from "@/assets/home/gallery-pool.jpg";
import projet2 from "@/assets/projet-2.jpg";
import projet3 from "@/assets/projet-3.jpg";
import neoWood from "@/assets/gamme-neo-wood.jpg";
import traditionnelle from "@/assets/gamme-traditionanelle.jpg";
import cubique from "@/assets/gamme-cubique.jpg";

export const Route = createFileRoute("/realisations")({
  head: () => ({
    meta: [
      { title: "Réalisations & témoignages — Envibois" },
      {
        name: "description",
        content:
          "Nos dernières maisons ossature bois à travers la France et la parole de nos clients : chalets, maisons familiales, Atlanticas contemporains.",
      },
      { property: "og:title", content: "Réalisations — Envibois" },
      { property: "og:description", content: "Galerie des maisons construites par Envibois." },
      { property: "og:url", content: "/realisations" },
    ],
    links: [{ rel: "canonical", href: "/realisations" }],
  }),
  component: Realisations,
});

const PROJECTS = [
  { img: projet1, title: "Villa Chamonix", place: "Savoie · 2023" },
  { img: projet2, title: "Maison bioclimatique L", place: "Bordeaux · 2022" },
  { img: projet3, title: "L'Atlantica d'artiste", place: "Nantes · 2024" },
  { img: neoWood, title: "Maison neoWood", place: "Bretagne · 2024" },
  { img: traditionnelle, title: "Maison Séquoia", place: "Périgord · 2023" },
  { img: cubique, title: "Chalet Vallée", place: "Haute-Savoie · 2022" },
];

const TESTIMONIALS_FR = [
  {
    name: "Claire & Antoine M.",
    place: "Maison neoWood · Bretagne",
    quote:
      "Du premier rendez-vous à la remise des clés, un seul interlocuteur. La maison est sortie de terre en deux semaines, et 18 mois plus tard nous n'avons toujours aucune surprise.",
  },
  {
    name: "Famille Dubreuil",
    place: "Maison bioclimatique L · Bordeaux",
    quote:
      "Le confort thermique est saisissant. Hiver comme été, la maison se régule presque seule. Nos factures ont été divisées par trois.",
  },
  {
    name: "Sophie R.",
    place: "L'Atlantica d'artiste · Nantes",
    quote:
      "Je voulais une maison-Atlantica baignée de lumière et discrète depuis la rue. L'équipe a parfaitement traduit mes croquis, sans jamais me pousser à dépenser plus.",
  },
  {
    name: "Marc et Élodie T.",
    place: "Chalet Vallée · Haute-Savoie",
    quote:
      "Construire en montagne n'est jamais simple. Envibois a géré l'accès, les délais et le froid avec un calme impressionnant. Le résultat dépasse ce que nous imaginions.",
  },
];
const TESTIMONIALS_EN = [
  {
    name: "Claire & Antoine M.",
    place: "Maison neoWood · Brittany",
    quote:
      "From the first meeting to handover, one single point of contact. The house was raised in two weeks, and 18 months in we've had no surprises.",
  },
  {
    name: "Dubreuil family",
    place: "Maison bioclimatique L · Bordeaux",
    quote:
      "The thermal comfort is striking. Winter or summer, the house almost regulates itself. Our bills have been divided by three.",
  },
  {
    name: "Sophie R.",
    place: "Artist's studio · Nantes",
    quote:
      "I wanted a sun-flooded studio home, discreet from the street. The team perfectly translated my sketches without ever pushing me to spend more.",
  },
  {
    name: "Marc & Élodie T.",
    place: "Chalet Vallée · Haute-Savoie",
    quote:
      "Mountain building is never simple. Envibois handled access, schedule and cold with impressive calm. The result exceeds what we imagined.",
  },
];

function Realisations() {
  const { locale } = useT();
  const isFr = locale === "fr";
  const testimonials = isFr ? TESTIMONIALS_FR : TESTIMONIALS_EN;

  return (
    <div className="pt-32 md:pt-40">
      {/* Header */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 mb-16 md:mb-20">
        <header className="max-w-[52ch]">
          <p className="eyebrow mb-6">— {isFr ? "Réalisations" : "Projects"}</p>
          <h1 className="font-serif text-5xl md:text-7xl italic text-charcoal leading-[1.02] mb-6">
            {isFr ? "Maisons élevées récemment." : "Recently raised homes."}
          </h1>
          <p className="text-lg text-charcoal/65 leading-relaxed">
            {isFr
              ? "Une sélection de projets livrés ces trois dernières années — montagne, bord de mer, forêt, ville."
              : "A selection of projects delivered in the last three years — mountain, coast, forest, city."}
          </p>
        </header>
      </div>

      {/* Project grid */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {PROJECTS.map((p, i) => (
            <motion.figure
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden bg-secondary mb-5">
                <img
                  src={p.img}
                  alt={p.title}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>
              <figcaption>
                <h3 className="font-serif text-2xl italic text-charcoal">{p.title}</h3>
                <p className="text-[10px] text-gold font-medium uppercase tracking-[0.22em] mt-2">
                  {p.place}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <header className="max-w-[44ch] mb-16">
            <p className="eyebrow mb-4">— {isFr ? "Témoignages" : "Testimonials"}</p>
            <h2 className="font-serif text-4xl md:text-6xl italic text-charcoal leading-[1.05]">
              {isFr ? "Ce qu'ils en disent." : "What they say."}
            </h2>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="border border-charcoal/10 p-10 md:p-12 bg-bone hover:border-gold transition-colors"
              >
                <Quote className="text-gold mb-6" size={28} />
                <blockquote className="font-serif text-xl md:text-2xl italic text-charcoal leading-snug mb-8">
                  « {t.quote} »
                </blockquote>
                <figcaption>
                  <div className="font-medium text-charcoal">{t.name}</div>
                  <div className="text-[10px] text-gold uppercase tracking-[0.22em] mt-1">{t.place}</div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
              to="/contact"
              className="inline-flex bg-charcoal text-bone px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-ink transition-colors"
            >
              {isFr ? "Démarrer mon projet" : "Start my project"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
