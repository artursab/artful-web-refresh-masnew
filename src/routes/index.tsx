import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { useT } from "@/lib/i18n";
import { MODELS } from "@/lib/models";
import { formatPrice } from "@/lib/configurator-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dorf SIA — Maisons ossature bois sur-mesure en France" },
      {
        name: "description",
        content:
          "Concepteur et constructeur de maisons modernes en ossature bois. Configurateur en ligne, savoir-faire artisanal, livraison clés en main.",
      },
      { property: "og:title", content: "Dorf SIA — L'art de vivre en symbiose" },
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
      {/* Hero */}
      <section className="pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="max-w-screen-xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[42ch] mb-14"
          >
            <span className="text-oak text-xs font-medium uppercase tracking-[0.2em]">
              {t("home.eyebrow")}
            </span>
            <h1 className="font-serif text-6xl md:text-8xl leading-[0.95] text-balance mt-6 mb-8 italic text-charcoal">
              {t("home.title")}
            </h1>
            <p className="text-lg leading-relaxed text-pretty text-charcoal/75 max-w-[44ch]">
              {t("home.lead")}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/maisons"
                className="bg-charcoal text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-moss transition-colors ring-1 ring-charcoal"
              >
                {t("home.cta.models")}
              </Link>
              <Link
                to="/configurateur"
                className="border border-charcoal/15 text-charcoal px-6 py-3 rounded-full text-sm font-medium hover:bg-charcoal hover:text-cream transition-colors inline-flex items-center gap-2"
              >
                {t("home.cta.configure")}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="overflow-hidden rounded-2xl ring-1 ring-charcoal/5"
          >
            <img
              src={heroImg}
              alt="Maison ossature bois moderne dans une clairière"
              width={1920}
              height={1080}
              className="w-full aspect-[21/9] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl mb-16 max-w-[20ch] text-balance text-charcoal">
            {t("home.values.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 border-t border-charcoal/10 pt-12">
            {([1, 2, 3] as const).map((i) => (
              <div key={i}>
                <span className="text-[10px] font-medium uppercase tracking-widest text-oak">
                  0{i}
                </span>
                <h3 className="font-serif text-2xl mt-3 mb-3">
                  {t(`home.values.${i}.t` as const)}
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  {t(`home.values.${i}.d` as const)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator CTA — dark band */}
      <section className="bg-charcoal text-cream py-32">
        <div className="max-w-screen-xl mx-auto px-6">
          <span className="text-oak font-medium uppercase tracking-widest text-xs">
            {t("home.config.eyebrow")}
          </span>
          <h2 className="font-serif text-5xl md:text-6xl mt-4 leading-tight text-balance max-w-[20ch] italic">
            {t("home.config.title")}
          </h2>
          <p className="mt-6 max-w-[50ch] text-cream/70 text-lg leading-relaxed">
            {t("home.config.lead")}
          </p>
          <Link
            to="/configurateur"
            className="mt-10 inline-flex items-center gap-3 bg-cream text-charcoal pl-6 pr-3 py-3 rounded-full text-sm font-medium hover:bg-oak hover:text-charcoal transition-colors"
          >
            {t("home.config.start")}
            <span className="size-7 flex items-center justify-center bg-charcoal text-cream rounded-full">
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* Models grid */}
      <section className="py-32">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-serif text-4xl md:text-5xl">{t("home.models.title")}</h2>
            <Link
              to="/maisons"
              className="text-sm font-medium border-b border-charcoal/20 pb-1 hover:border-oak transition-colors"
            >
              {t("home.models.cta")}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {MODELS.slice(0, 3).map((m) => (
              <Link
                key={m.slug}
                to="/maisons/$slug"
                params={{ slug: m.slug }}
                className="group block"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-charcoal/5 mb-5 bg-stone-100">
                  <img
                    src={m.image}
                    alt={m.name}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="font-serif text-2xl mb-1">{m.name}</h3>
                <p className="text-sm text-charcoal/60">{m.tagline[locale]}</p>
                <p className="text-xs text-oak font-medium mt-2 uppercase tracking-wider">
                  {t("models.from")} {formatPrice(m.basePrice, locale)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-charcoal/10 py-20 bg-cream">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { n: "12+", l: "années d'expérience" },
            { n: "180", l: "projets livrés" },
            { n: "3", l: "régions couvertes" },
            { n: "100%", l: "ossature bois" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif text-5xl md:text-6xl italic text-charcoal">{s.n}</div>
              <div className="text-xs uppercase tracking-widest text-charcoal/50 mt-3">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How we build */}
      <section className="py-32">
        <div className="max-w-screen-xl mx-auto px-6">
          <span className="text-oak text-xs font-medium uppercase tracking-[0.2em]">Notre méthode</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-16 max-w-[24ch] text-balance text-charcoal italic">
            Quatre étapes, de l'esquisse à la remise des clés.
          </h2>
          <ol className="grid md:grid-cols-4 gap-10">
            {[
              { n: "01", t: "Conception", d: "Étude personnalisée, plans 3D et choix des matériaux avec un architecte dédié." },
              { n: "02", t: "Préfabrication", d: "Fabrication en atelier : murs, planchers et toiture montés avec précision millimétrique." },
              { n: "03", t: "Livraison", d: "Acheminement sécurisé des modules sur site, partout en France et en outre-mer." },
              { n: "04", t: "Assemblage", d: "Montage en quelques jours, hors d'eau hors d'air, puis finitions clés en main." },
            ].map((s) => (
              <li key={s.n} className="border-t border-charcoal/15 pt-6">
                <span className="text-[10px] font-medium uppercase tracking-widest text-oak">{s.n}</span>
                <h3 className="font-serif text-2xl italic mt-3 mb-3">{s.t}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-cream border-t border-charcoal/10">
        <div className="max-w-screen-lg mx-auto px-6">
          <span className="text-oak text-xs font-medium uppercase tracking-[0.2em]">Questions fréquentes</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-12 italic text-charcoal">
            Tout ce que vous voulez savoir.
          </h2>
          <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {[
              { q: "Quels sont les délais de livraison ?", a: "Comptez 3 à 4 mois de conception et préfabrication, puis 2 à 6 semaines de montage selon le modèle." },
              { q: "Quel est le budget moyen ?", a: "Nos maisons démarrent à partir de 95 000 € pour L'Atelier et évoluent selon la surface, les finitions et le terrain." },
              { q: "Dans quelles régions intervenez-vous ?", a: "Landes, Pyrénées-Atlantiques et outre-mer (Caraïbes) avec des équipes locales dédiées." },
              { q: "Quelles garanties offrez-vous ?", a: "Garantie décennale, biennale de bon fonctionnement et de parfait achèvement. Nous sommes certifiés constructeur ossature bois." },
              { q: "Le bois est-il vraiment durable ?", a: "Bien conçue, une maison ossature bois dépasse 100 ans. Le bois utilisé est issu de forêts gérées durablement (PEFC / FSC)." },
            ].map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="cursor-pointer list-none flex justify-between items-start gap-6">
                  <span className="font-serif text-xl italic text-charcoal">{f.q}</span>
                  <span className="text-oak text-2xl leading-none mt-1 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm text-charcoal/70 leading-relaxed max-w-[60ch]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
