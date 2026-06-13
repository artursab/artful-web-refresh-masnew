import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import heroImg from "@/assets/home/hero.jpg";
import storyImg1 from "@/assets/story1.png";
import storyImg2 from "@/assets/story2.png";
import bandForest from "@/assets/home/band-craft.jpg";
import neoWood from "@/assets/home/gamme-neo-wood.jpg";
import bandInterior from "@/assets/home/band-daylight.jpg";
import classicWood from "@/assets/gamme-classic-wood.jpg";
import tropicale from "@/assets/gamme-tropicale.jpg";
import traditionnelle from "@/assets/gamme-traditionanelle.jpg";
import model3 from "@/assets/home/model-3.jpg";
import { useT } from "@/lib/i18n";
import { CommercialProcess } from "@/components/CommercialProcess";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { MODELS } from "@/lib/models";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Envibois — Maisons ossature bois sur-mesure en France" },
      {
        name: "description",
        content:
          "Concepteur et constructeur de maisons modernes en ossature bois. Atlantica de précision, savoir-faire artisanal, livraison clés en main.",
      },
      { property: "og:title", content: "Envibois — L'art de vivre AU NATUREL" },
      {
        property: "og:description",
        content: "Maisons en ossature bois haute performance, conçues et construites pour durer.",
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
  const isFr = locale === "fr";

  const storyImages = [storyImg1, storyImg2];
  const [storyIndex, setStoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStoryIndex((prev) => (prev + 1) % storyImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt={isFr ? "Maison ossature bois au coucher du soleil" : "Timber-frame house at dusk"}
          className="absolute inset-0 h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-bone max-w-screen-2xl mx-auto w-full">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif italic text-5xl md:text-7xl lg:text-8xl leading-[1.05]"
          >
            {isFr ? "L'art de vivre AU NATUREL." : "The art of living naturally."}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 max-w-2xl text-base md:text-lg text-bone/90 leading-relaxed"
          >
            {isFr
              ? "Maisons en ossature bois sur-mesure. Durables et eco responsables."
              : "Custom timber-frame homes. Sustainable and environmentally friendly."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/catalogue"
              className="px-8 py-4 bg-bone text-ink text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-gold transition-colors"
            >
              {isFr ? "Découvrir les modèles" : "Discover the models"}
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border border-bone/60 text-bone text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-bone hover:text-ink transition-colors"
            >
              {isFr ? "Contactez-nous" : "Contact Us"}
            </Link>
          </motion.div>
        </div>
        <a
          href="#about"
          aria-label="Scroll"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-bone/70 hover:text-bone z-10"
        >
          <ChevronDown size={26} className="animate-bounce" />
        </a>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-charcoal/10 py-10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: "100+", l: isFr ? "maisons livrées" : "homes raised" },
            { n: "20", l: isFr ? "ans d'expérience" : "years of experience" },
            { n: "100%", l: isFr ? "bois certifié" : "certified timber" },
            { n: "RE2020", l: isFr ? "conforme" : "compliant" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-serif text-3xl md:text-4xl italic text-charcoal">{s.n}</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-charcoal/50 mt-2">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section id="about" className="py-28 md:py-40">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 overflow-hidden relative h-[620px]">
            {storyImages.map((img, index) => (
              <img
                key={img}
                src={img}
                alt={isFr ? "Atelier de charpente" : "Carpentry workshop"}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === storyIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow mb-6">— {isFr ? "Notre histoire" : "Our story"}</p>
            <h2 className="font-serif text-4xl md:text-6xl italic text-charcoal leading-[1.05]">
              {isFr
                ? "La Nature, la foret, et l’idée d’un habitat sein et harmonieux."
                : "Nature, the forest, and the idea of a healthy and harmonious home."}
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-charcoal/70 max-w-xl">
              {isFr
                ? "C’est en arpentant les Pays Baltes dans les années 2000 que notre fondateur découvrit l’habitat traditionnel en Bois Nordique:\nFait de bois et de paille, chauffé au bois par un poelle de masse: un confort exceptionnel et chauffé avec si peu…\nDe cet engoument naissant suivi une période de formation aux metiers et techniques, puis la sélection des produits, des savoirs faires et l’élaboration d’un systéme constructif alliant des matériaux biosourcés, performants et durables en conformité avec les normes locales des différentes régions de destination.\nAujourd’hui, nous sommes fiers d’avoir réalisé plus de 100 constructions dans des regions aussi différentes que la Scandinavie et les caraibes mais aussi: en Allemagne, au benelux, et dans toute la France métropolitaine."
                : "It was whilst travelling through the Baltic States in the 2000s that our founder discovered traditional Nordic timber housing: Built from timber and straw, heated by a wood-burning masonry stove: exceptional comfort achieved with so little… This budding enthusiasm was followed by a period of training in the trades and techniques, then the selection of products and expertise, and the development of a construction system combining bio-based, high-performance and sustainable materials in compliance with local standards in the various regions of destination. Today, we are proud to have completed over 100 projects in regions as diverse as Scandinavia and the Caribbean, as well as in Germany, the Benelux countries, and throughout mainland France."}
            </p>
            {/*<Link
              to="/savoir-faire"
              className="inline-flex items-center gap-3 mt-10 text-[11px] font-medium uppercase tracking-[0.22em] text-charcoal border-b border-charcoal/30 pb-1 hover:border-gold hover:text-gold transition-colors"
            >
              {isFr ? "Découvrir notre savoir-faire" : "Discover our craftsmanship"} <ArrowUpRight size={14} />
            </Link> */}
          </div>
        </div>
      </section>

      {/* COMMERCIAL PROCESS */}
      <CommercialProcess variant="full" />

      {/* PARALLAX QUOTE */}
      <section
        className="relative bg-fixed bg-center bg-cover flex items-center justify-center text-bone"
        style={{ backgroundImage: `url(${neoWood})`, minHeight: "65vh" }}
      >
        <div className="absolute inset-0 bg-ink/60" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center py-24">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold mb-8">
            — {isFr ? "De la forêt" : "From the forest"}
          </p>
          <p className="font-serif text-3xl md:text-5xl leading-snug italic">
            {isFr
              ? "« Le bois est la seule matière qui repousse. Nous traitons chaque planche comme empruntée à la génération suivante. »"
              : "“Wood is the only material that grows back. We treat every plank like it's borrowed from the next generation.”"}
          </p>
        </div>
      </section>

      {/* MODELS */}
      <section className="py-28 md:py-40">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow mb-4">— {isFr ? "Ce que nous bâtissons" : "What we build"}</p>
              <h2 className="font-serif text-4xl md:text-6xl italic max-w-2xl text-charcoal leading-[1.05]">
                {isFr ? "Trois façons d'habiter le bois." : "Three ways to live in wood."}
              </h2>
            </div>
            <Link
              to="/catalogue"
              className="self-start md:self-auto inline-flex items-center gap-3 border border-charcoal px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-charcoal hover:text-bone transition-colors"
            >
              {t("home.models.cta")} <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {MODELS.slice(0, 3).map((m, i) => {
              const img = [traditionnelle, neoWood, classicWood][i] ?? m.image;
              return (
                <Link
                  key={m.slug}
                  to="/maisons/$slug"
                  params={{ slug: m.slug }}
                  className="group block"
                >
                  <div className="overflow-hidden mb-6 aspect-[4/5] bg-secondary">
                    <img
                      src={img}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-3xl mb-3 italic text-charcoal group-hover:text-gold transition-colors">
                    {m.name}
                  </h3>
                  <p className="text-charcoal/65 leading-relaxed">{m.tagline[locale]}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-secondary/40 py-28 md:py-36">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow mb-4">
                — {isFr ? "Projets sélectionnés" : "Selected projects"}
              </p>
              <h2 className="font-serif text-4xl md:text-6xl italic text-charcoal leading-[1.05]">
                {isFr ? "Récemment achevés." : "Recently completed."}
              </h2>
            </div>
            <Link
              to="/realisations"
              className="self-start md:self-auto inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-charcoal border-b border-charcoal/30 pb-1 hover:border-gold hover:text-gold transition-colors"
            >
              {isFr ? "Toutes les réalisations" : "All projects"} <ArrowUpRight size={14} />
            </Link>
          </div>
          <ProjectsCarousel />
        </div>
      </section>

      {/* DAYLIGHT BAND */}
      <section
        className="relative bg-fixed bg-center bg-cover flex items-center justify-center text-bone"
        style={{ backgroundImage: `url(${bandInterior})`, minHeight: "70vh" }}
      >
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center py-24">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold mb-8">
            — {isFr ? "Pensé autour de la lumière" : "Designed around daylight"}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl italic leading-[1.05]">
            {isFr ? "Chaque plan commence par le soleil." : "Every plan begins with the sun."}
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-bone/85 leading-relaxed">
            {isFr
              ? "Nous orientons pièces, poutres et fenêtres selon la course de la lumière — pour que la maison change de visage du matin au soir."
              : "We orient rooms, beams and windows to the path of the light — so the house feels different in the morning than at dusk."}
          </p>
        </div>
      </section>
    </div>
  );
}
