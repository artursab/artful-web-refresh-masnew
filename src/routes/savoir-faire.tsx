import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import savoirImg from "@/assets/savoir-faire.jpg";
import wallImg from "@/assets/composition-wall.jpg";
import roofImg from "@/assets/composition-roof.jpg";
import deliveryImg from "@/assets/point-delivery.jpg";
import factoryImg from "@/assets/point-factory.jpg";
import teamImg from "@/assets/point-team.jpg";
import { useT } from "@/lib/i18n";

const STEPS_FR = [
  { n: "01", t: "Premier contact", d: "Un échange pour cerner votre projet, votre terrain et votre budget." },
  { n: "02", t: "Étude & devis", d: "Esquisse personnalisée et devis détaillé sous 15 jours." },
  { n: "03", t: "Conception", d: "Plans d'exécution, dessins 3D, dépôt du permis de construire." },
  { n: "04", t: "Atelier", d: "Préfabrication des murs, planchers et caissons dans notre atelier de Daugavpils." },
  { n: "05", t: "Montage", d: "Levage à la grue et mise hors d'eau hors d'air en 5 à 10 jours." },
  { n: "06", t: "Remise des clés", d: "Second œuvre, contrôle qualité, garantie décennale." },
];
const STEPS_EN = [
  { n: "01", t: "First contact", d: "An exchange to scope your project, your land and your budget." },
  { n: "02", t: "Study & quote", d: "Personalised sketch and detailed quote within 15 days." },
  { n: "03", t: "Design", d: "Construction drawings, 3D plans, building permit filing." },
  { n: "04", t: "Workshop", d: "Walls, floors and cassettes prefabricated in Daugavpils." },
  { n: "05", t: "Assembly", d: "Crane raising, watertight & airtight shell in 5 to 10 days." },
  { n: "06", t: "Handover", d: "Fit-out, quality check, ten-year guarantee." },
];

const GUARANTEES_FR = [
  { t: "Décennale", d: "10 ans sur les dommages compromettant la solidité de l'ouvrage." },
  { t: "Biennale", d: "2 ans sur les équipements : chauffage, ventilation, menuiseries." },
  { t: "Parfait achèvement", d: "1 an pour la reprise de tous les désordres signalés." },
  { t: "Dommages-ouvrage", d: "Assurance complémentaire pour une indemnisation rapide." },
];
const GUARANTEES_EN = [
  { t: "10-year guarantee", d: "Mandatory coverage for damage affecting structural integrity." },
  { t: "2-year guarantee", d: "Equipment warranty: heating, ventilation, joinery." },
  { t: "1-year completion", d: "One year to remedy any defect reported at handover." },
  { t: "Construction insurance", d: "Complementary cover for fast compensation." },
];

const CERTS = [
  "PEFC / FSC", "RE2020", "Qualibat ossature bois", "Label biosourcé",
  "CE marquage", "ISO 9001", "Assurance décennale MAF", "Garantie de livraison",
];

const FAQ_FR = [
  { q: "Quel est le délai entre la signature et la livraison ?", a: "Comptez 9 à 14 mois en moyenne : 2 à 3 mois d'études et permis, 3 mois d'atelier, 1 à 3 mois de montage et finitions." },
  { q: "Quel est le prix au mètre carré ?", a: "Nos maisons clés en main démarrent à environ 2 200 € / m² TTC hors fondations et raccordements." },
  { q: "Travaillez-vous partout en France ?", a: "Oui, partout en France métropolitaine, en Outre-mer et dans plusieurs pays d'Europe." },
  { q: "Le bois est-il vraiment plus écologique ?", a: "Oui : matériau renouvelable, qui stocke le CO₂ et demande peu d'énergie à transformer." },
  { q: "Une maison bois résiste-t-elle au feu ?", a: "Le bois massif brûle lentement et garde sa portance. Nos compositions sont conformes EI 30 à EI 90." },
  { q: "Puis-je personnaliser un modèle existant ?", a: "Absolument. Nos modèles sont des bases — surface, plan, bardage et finitions s'adaptent." },
];
const FAQ_EN = [
  { q: "How long between contract and handover?", a: "Allow 9 to 14 months: 2-3 months for design and permit, 3 months in workshop, 1-3 months for assembly." },
  { q: "What is the price per square metre?", a: "Our turnkey homes start around €2,200/m² incl. VAT, excluding foundations and utilities." },
  { q: "Do you build everywhere in France?", a: "Yes, across mainland France, French overseas territories and several European countries." },
  { q: "Is timber really more sustainable?", a: "Yes: renewable, stores CO₂ and needs little energy to process." },
  { q: "Is a timber-frame house fire resistant?", a: "Solid timber burns slowly and keeps load-bearing capacity. Our assemblies meet EI 30 to EI 90." },
  { q: "Can I customise an existing model?", a: "Absolutely. Our models are starting points — surface, plan, cladding and finishes adapt." },
];

export const Route = createFileRoute("/savoir-faire")({
  head: () => ({
    meta: [
      { title: "Savoir-faire, process & garanties — Envibois" },
      {
        name: "description",
        content:
          "Notre process en 6 étapes, nos matériaux, certifications et garanties. Trente ans d'expérience dans la maison ossature bois.",
      },
      { property: "og:title", content: "Savoir-faire — Envibois" },
      { property: "og:description", content: "Process, matériaux, garanties, certifications." },
      { property: "og:image", content: savoirImg },
      { property: "og:url", content: "/savoir-faire" },
    ],
    links: [{ rel: "canonical", href: "/savoir-faire" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_FR.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Savoir,
});

function Savoir() {
  const { locale } = useT();
  const isFr = locale === "fr";
  const steps = isFr ? STEPS_FR : STEPS_EN;
  const guarantees = isFr ? GUARANTEES_FR : GUARANTEES_EN;
  const faq = isFr ? FAQ_FR : FAQ_EN;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="pt-32 md:pt-40">
      {/* Hero */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-10 mb-20 md:mb-28">
        <header className="max-w-[52ch] mb-14">
          <p className="eyebrow mb-6">— {isFr ? "Savoir-faire" : "Craftsmanship"}</p>
          <h1 className="font-serif text-5xl md:text-7xl italic text-charcoal leading-[1.02] mb-6">
            {isFr ? "Trente ans, une seule matière." : "Thirty years, one material."}
          </h1>
          <p className="text-lg text-charcoal/65 leading-relaxed">
            {isFr
              ? "Conception, atelier, montage et garanties — un savoir-faire intégré, sous un même toit, du premier croquis à la remise des clés."
              : "Design, workshop, assembly and guarantees — one integrated craft, under one roof, from first sketch to handover."}
          </p>
        </header>
        <div className="overflow-hidden">
          <img
            src={savoirImg}
            alt={isFr ? "Charpentier travaillant sur une ossature bois" : "Carpenter working on a timber frame"}
            width={1536}
            height={1024}
            loading="lazy"
            className="w-full aspect-[16/9] object-cover"
          />
        </div>
      </section>

      {/* Process — 6 steps */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-10 mb-24 md:mb-32">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">— {isFr ? "Process" : "Process"}</p>
            <h2 className="font-serif text-4xl md:text-5xl italic text-charcoal leading-tight">
              {isFr ? "Six étapes, un interlocuteur." : "Six steps, one point of contact."}
            </h2>
          </div>
          <p className="md:col-span-7 md:col-start-6 text-lg text-charcoal/65 leading-relaxed self-end">
            {isFr
              ? "De la première rencontre à la remise des clés, votre projet est suivi par une équipe unique. Comptez 9 à 14 mois entre le devis signé et l'emménagement."
              : "From first meeting to handover, your project is run by a single team. Allow 9 to 14 months from signed quote to move-in."}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-charcoal/15 pt-6">
              <div className="font-serif italic text-2xl text-gold mb-3">{s.n}</div>
              <h3 className="font-serif text-2xl text-charcoal mb-3">{s.t}</h3>
              <p className="text-charcoal/65 leading-relaxed text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Composition — wall */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="overflow-hidden order-2 lg:order-1">
            <img src={wallImg} alt={isFr ? "Coupe d'une paroi ossature bois" : "Timber frame wall section"} width={1280} height={960} loading="lazy" className="w-full aspect-[4/3] object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-4">— {isFr ? "Composition" : "Composition"}</p>
            <h2 className="font-serif text-4xl md:text-5xl italic text-charcoal mb-6 leading-tight">
              {isFr ? "Le principe du mur ossature bois." : "The timber frame wall."}
            </h2>
            <p className="text-charcoal/65 leading-relaxed mb-8">
              {isFr
                ? "Une trame de montants en résineux, isolée par fibre de bois ou laine biosourcée, protégée d'un pare-pluie et habillée d'un bardage. Fine, performante, respirante."
                : "A softwood stud frame, insulated with wood fibre or bio-sourced wool, protected by a rain barrier and clad in timber. Thin, high-performance, breathable."}
            </p>
            <ul className="space-y-3 text-sm text-charcoal/75">
              {(isFr ? [
                "Modularité architecturale exceptionnelle",
                "Choix très large de finitions intérieures et extérieures",
                "Isolation thermique haute performance (R ≥ 5)",
                "Étanchéité à l'air conforme RE2020",
              ] : [
                "Outstanding architectural flexibility",
                "Wide range of interior and exterior finishes",
                "High-performance thermal insulation (R ≥ 5)",
                "Airtightness compliant with RE2020",
              ]).map((b) => (
                <li key={b} className="flex gap-3"><span className="text-gold">—</span>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Composition — roof */}
      <section className="py-24 md:py-32">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow mb-4">— {isFr ? "Toiture" : "Roof"}</p>
            <h2 className="font-serif text-4xl md:text-5xl italic text-charcoal mb-6 leading-tight">
              {isFr ? "Caissons préfabriqués, posés en heures." : "Prefab cassettes, raised in hours."}
            </h2>
            <p className="text-charcoal/65 leading-relaxed mb-8">
              {isFr
                ? "La toiture est terminée, isolée et étanche dès le premier jour de montage."
                : "The roof is finished, insulated and watertight from the very first day on site."}
            </p>
            <ul className="space-y-3 text-sm text-charcoal/75">
              {(isFr ? [
                "Hors d'eau dès la pose",
                "Isolation pleine épaisseur sans pont thermique",
                "Pentes adaptées à toutes les régions",
                "Compatible toiture végétalisée",
              ] : [
                "Watertight from day one",
                "Full-thickness insulation, no thermal bridges",
                "Pitches suited to every region",
                "Green roof compatible",
              ]).map((b) => (
                <li key={b} className="flex gap-3"><span className="text-gold">—</span>{b}</li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden">
            <img src={roofImg} alt={isFr ? "Caisson de toit levé à la grue" : "Roof cassette raised by crane"} width={1280} height={960} loading="lazy" className="w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </section>

      {/* Strong points */}
      <section className="bg-ink text-bone py-28 md:py-36">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <p className="eyebrow text-gold mb-4">— {isFr ? "Nos points forts" : "Our strengths"}</p>
          <h2 className="font-serif text-4xl md:text-6xl italic mt-2 mb-16 max-w-[26ch]">
            {isFr ? "Livraison, atelier, engagement." : "Delivery, workshop, commitment."}
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { img: deliveryImg, t: isFr ? "Livraison" : "Delivery", d: isFr ? "Un processus fiable et sans accroc, peu importe la région ou l'envergure du projet." : "A reliable delivery process, whatever the region or project scale." },
              { img: factoryImg, t: isFr ? "Atelier" : "Workshop", d: isFr ? "Innovation et précision d'atelier pour des maisons modulaires, durables et performantes." : "Workshop innovation and precision for modular, durable, high-performance homes." },
              { img: teamImg, t: isFr ? "Engagement" : "Commitment", d: isFr ? "Une équipe d'artisans expérimentés dédiée à la construction de votre maison." : "A team of seasoned craftspeople dedicated to your home." },
            ].map((p) => (
              <div key={p.t}>
                <div className="overflow-hidden mb-6 aspect-[4/3]">
                  <img src={p.img} alt={p.t} width={1280} height={960} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-serif text-3xl italic mb-3">{p.t}</h3>
                <p className="text-sm text-bone/65 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-24 md:py-32">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-4">
              <p className="eyebrow mb-4">— {isFr ? "Garanties" : "Guarantees"}</p>
              <h2 className="font-serif text-4xl md:text-5xl italic text-charcoal leading-tight">
                {isFr ? "Construire en confiance." : "Build with confidence."}
              </h2>
            </div>
            <p className="md:col-span-7 md:col-start-6 text-lg text-charcoal/65 leading-relaxed self-end">
              {isFr
                ? "Toutes nos constructions sont couvertes par les garanties légales françaises et un ensemble de certifications professionnelles."
                : "All our builds are covered by French statutory guarantees and a set of professional certifications."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mb-16">
            {guarantees.map((g) => (
              <div key={g.t} className="border-t border-charcoal/15 pt-6">
                <h3 className="font-serif text-2xl text-charcoal mb-3">{g.t}</h3>
                <p className="text-charcoal/65 leading-relaxed text-sm">{g.d}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-charcoal/15 pt-12">
            <p className="eyebrow mb-6">— {isFr ? "Certifications" : "Certifications"}</p>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {CERTS.map((c) => (
                <li key={c} className="border border-charcoal/15 px-4 py-3 text-center text-charcoal/70 hover:border-gold hover:text-charcoal transition-colors">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <header className="text-center mb-16">
            <p className="eyebrow mb-4">— FAQ</p>
            <h2 className="font-serif text-4xl md:text-6xl italic text-charcoal leading-tight">
              {isFr ? "Vos questions, nos réponses." : "Your questions, our answers."}
            </h2>
          </header>

          <div className="divide-y divide-charcoal/15 border-y border-charcoal/15">
            {faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start justify-between text-left py-6 group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg md:text-xl text-charcoal pr-8">{item.q}</span>
                    <ChevronDown
                      size={20}
                      className={`mt-1 shrink-0 text-charcoal/50 group-hover:text-gold transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-6 -mt-2 text-charcoal/70 leading-relaxed">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-charcoal/60 mb-4">{isFr ? "Une autre question ?" : "Another question?"}</p>
            <Link to="/contact" className="inline-flex bg-charcoal text-bone px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-ink">
              {isFr ? "Nous contacter" : "Contact us"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
