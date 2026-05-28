import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import heroImg from "@/assets/home/hero.jpg";
import storyImg from "@/assets/home/story.jpg";
import bandForest from "@/assets/home/band-craft.jpg";
import bandInterior from "@/assets/home/band-daylight.jpg";
import model1 from "@/assets/home/model-1.jpg";
import model2 from "@/assets/home/model-2.jpg";
import model3 from "@/assets/home/model-3.jpg";
import gal1 from "@/assets/home/model-3.jpg";
import gal2 from "@/assets/home/model-2.jpg";
import gal3 from "@/assets/home/gallery-sofa.jpg";
import gal4 from "@/assets/home/gallery-pool.jpg";
import gal5 from "@/assets/home/band-daylight.jpg";
import { useT } from "@/lib/i18n";
import { MODELS } from "@/lib/models";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Envibois — Maisons ossature bois sur-mesure en France" },
      {
        name: "description",
        content:
          "Concepteur et constructeur de maisons modernes en ossature bois. Configurateur en ligne, savoir-faire artisanal, livraison clés en main.",
      },
      { property: "og:title", content: "Envibois — L'art de vivre en symbiose" },
      {
        property: "og:description",
        content: "Maisons en ossature bois haute performance, conçues et construites en France.",
      },
      { property: "og:image", content: "/og-home.jpg" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { t, locale } = useT();

  return (
    <div>
      {/* HERO — full screen with overlay */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <img
          src={model3}
          alt="Maison ossature bois moderne au coucher du soleil"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal/85" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.1)_100%)]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-cream">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-5xl italic"
          >
            {t("home.title")}
            <span className="block not-italic font-serif text-2xl md:text-3xl lg:text-4xl mt-6 text-cream/90 max-w-3xl mx-auto">
              {t("home.lead")}
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/maisons"
              className="px-8 py-4 bg-cream text-charcoal text-xs font-medium uppercase tracking-[0.2em] hover:bg-oak hover:text-charcoal transition-colors"
            >
              {t("home.cta.models")}
            </Link>
            <Link
              to="/configurateur"
              className="px-8 py-4 border border-cream/80 text-cream text-xs font-medium uppercase tracking-[0.2em] hover:bg-cream hover:text-charcoal transition-colors"
            >
              {t("home.cta.configure")}
            </Link>
          </motion.div>
          <a
            href="#about"
            aria-label="Scroll"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream/80 hover:text-cream"
          >
            <ChevronDown size={28} className="animate-bounce" />
          </a>
        </div>
      </section>

      {/* STORY + STATS */}
      <section id="about" className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 overflow-hidden rounded-sm">
            <img
              src={storyImg}
              alt="Atelier de charpente bois"
              loading="lazy"
              className="w-full h-[560px] object-cover"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-oak mb-6">
              — {locale === "fr" ? "Notre histoire" : "Our story"}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight italic text-charcoal">
              {locale === "fr"
                ? "Un atelier, une forêt, et l'obsession discrète du bois."
                : "A workshop, a forest, and a quiet obsession with wood."}
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-charcoal/70 max-w-xl">
              {locale === "fr"
                ? "Depuis plus de trente ans, Dorf dessine, usine et élève des maisons en bois à travers l'Europe. Chaque poutre est sourcée, chaque assemblage vérifié à la main. Nous ne construisons pas vite — nous construisons pour durer."
                : "For more than three decades, Dorf has been drawing, milling and raising wooden homes across Europe. Every beam is sourced, every joint hand-checked. We don't build fast — we build to outlive us."}
            </p>
            <div className="mt-10 flex flex-wrap gap-10 border-t border-charcoal/15 pt-8">
              {[
                { n: "180+", l: locale === "fr" ? "maisons livrées" : "homes raised" },
                { n: "30", l: locale === "fr" ? "années d'expérience" : "years crafting" },
                { n: "100%", l: locale === "fr" ? "bois certifié" : "certified timber" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-serif text-4xl italic text-charcoal">{s.n}</p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-charcoal/50 mt-2">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX QUOTE BAND */}
      <section
        className="relative bg-fixed bg-center bg-cover flex items-center justify-center text-cream"
        style={{ backgroundImage: `url(${heroImg})`, minHeight: "60vh" }}
      >
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center py-24">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-cream/70 mb-6">
            — {locale === "fr" ? "De la forêt" : "From the forest"}
          </p>
          <p className="font-serif text-3xl md:text-5xl leading-snug italic">
            {locale === "fr"
              ? "« Le bois est la seule matière qui repousse. Nous traitons chaque planche comme empruntée à la génération suivante. »"
              : "“Wood is the only material that grows back. We treat every plank like it's borrowed from the next generation.”"}
          </p>
        </div>
      </section>

      {/* THREE WAYS / MODELS */}
      <section className="py-28 md:py-40 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-oak mb-4">
                — {locale === "fr" ? "Ce que nous bâtissons" : "What we build"}
              </p>
              <h2 className="font-serif text-4xl md:text-6xl italic max-w-2xl text-charcoal">
                {locale === "fr" ? "Trois façons d'habiter le bois." : "Three ways to live in wood."}
              </h2>
            </div>
            <Link
              to="/maisons"
              className="self-start md:self-auto border border-charcoal px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] hover:bg-charcoal hover:text-cream transition-colors"
            >
              {t("home.models.cta")} →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {MODELS.slice(0, 3).map((m, i) => {
              const img = [model1, model2, heroImg][i] ?? m.image;
              return (
                <Link
                  key={m.slug}
                  to="/maisons/$slug"
                  params={{ slug: m.slug }}
                  className="group block"
                >
                  <div className="overflow-hidden mb-6 aspect-[4/5]">
                    <img
                      src={img}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-3xl mb-3 italic">{m.name}</h3>
                  <p className="text-charcoal/70 leading-relaxed">{m.tagline[locale]}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-oak mb-4">
              — {locale === "fr" ? "Projets sélectionnés" : "Selected projects"}
            </p>
            <h2 className="font-serif text-4xl md:text-6xl italic">
              {locale === "fr" ? "Récemment achevés" : "Recently completed"}
            </h2>
          </div>
          <div className="grid md:grid-cols-12 gap-6">
            <figure className="md:col-span-7 overflow-hidden aspect-[5/4]">
              <img src={gal1} alt="" loading="lazy" className="h-full w-full object-cover hover:scale-[1.03] transition-transform duration-700" />
            </figure>
            <figure className="md:col-span-5 overflow-hidden aspect-[4/5]">
              <img src={gal2} alt="" loading="lazy" className="h-full w-full object-cover hover:scale-[1.03] transition-transform duration-700" />
            </figure>
            <figure className="md:col-span-4 overflow-hidden aspect-square">
              <img src={gal3} alt="" loading="lazy" className="h-full w-full object-cover hover:scale-[1.03] transition-transform duration-700" />
            </figure>
            <figure className="md:col-span-4 overflow-hidden aspect-square">
              <img src={gal4} alt="" loading="lazy" className="h-full w-full object-cover hover:scale-[1.03] transition-transform duration-700" />
            </figure>
            <figure className="md:col-span-4 overflow-hidden aspect-square">
              <img src={gal5} alt="" loading="lazy" className="h-full w-full object-cover hover:scale-[1.03] transition-transform duration-700" />
            </figure>
          </div>
        </div>
      </section>

      {/* PARALLAX BAND — DAYLIGHT */}
      <section
        className="relative bg-fixed bg-center bg-cover flex items-center justify-center text-cream"
        style={{ backgroundImage: `url(${bandInterior})`, minHeight: "70vh" }}
      >
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center py-24">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-cream/80 mb-6">
            — {locale === "fr" ? "Pensé autour de la lumière" : "Designed around daylight"}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl italic">
            {locale === "fr" ? "Chaque plan commence par le soleil." : "Every plan begins with the sun."}
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-cream/85 leading-relaxed">
            {locale === "fr"
              ? "Nous orientons pièces, poutres et fenêtres selon la course de la lumière — pour que la maison change de visage du matin au soir."
              : "We orient rooms, beams and windows to the path of the light — so the house feels different in the morning than at dusk."}
          </p>
        </div>
      </section>
    </div>
  );
}
