import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { PriceDisclaimer } from "./PriceDisclaimer";

type Props = {
  variant?: "full" | "compact";
  showDisclaimer?: boolean;
  showCta?: boolean;
};

export function CommercialProcess({
  variant = "full",
  showDisclaimer = true,
  showCta = true,
}: Props) {
  const { locale } = useT();
  const isFr = locale === "fr";

  const steps = isFr
    ? [
        {
          t: "Choisir une ligne architecturale",
          d: "Vous consultez nos catalogues en ligne pour choisir le style extérieur et l’ambiance intérieure de votre future maison.",
        },
        {
          t: "Formulaire de projet",
          d: "Vous remplissez le formulaire avec les informations clés : terrain, surface souhaitée, besoins, budget et avancement du projet.",
        },
        {
          t: "Étude préliminaire gratuite",
          d: "Notre équipe prépare une première estimation chiffrée, sans engagement de votre part.",
        },
        {
          t: "Échanges & compléments",
          d: "Nous revenons vers vous pour préciser les détails manquants : accès, sol, contraintes locales, plans ou documents disponibles.",
        },
        {
          t: "Offre finale détaillée",
          d: "Vous recevez une évaluation complète : descriptif technique, planning prévisionnel et prix détaillé.",
        },
        {
          t: "Lancement des travaux",
          d: "Les travaux démarrent uniquement après confirmation de l’offre et réception de l’acompte.",
        },
      ]
    : [
        {
          t: "Choose an architectural direction",
          d: "Browse our online catalogues to choose the exterior style and interior atmosphere of your future home.",
        },
        {
          t: "Project form",
          d: "Fill in the form with the key information: land, desired surface, needs, budget and project progress.",
        },
        {
          t: "Free preliminary study",
          d: "Our team prepares a first costed estimate, with no commitment on your side.",
        },
        {
          t: "Exchanges & details",
          d: "We come back to you to clarify missing details: access, soil, local constraints, plans or available documents.",
        },
        {
          t: "Final detailed offer",
          d: "You receive a complete evaluation: technical description, provisional schedule and detailed price.",
        },
        {
          t: "Work begins",
          d: "Work starts only after confirmation of the offer and reception of the deposit.",
        },
      ];

  const isCompact = variant === "compact";

  return (
    <section className={isCompact ? "py-12" : "py-24 md:py-32 bg-bone"}>
      <div
        className={`mx-auto w-full px-6 md:px-10 ${
          isCompact ? "max-w-screen-xl" : "max-w-screen-2xl"
        }`}
      >
        {!isCompact && (
          <header className="max-w-6xl mb-16 md:mb-20 text-left">
            <p className="eyebrow mb-5 text-left">
              —{" "}
              {isFr
                ? "Projets personnalisés : Une offre à la carte"
                : "Customised projects: a bespoke service"}
            </p>

            <h2 className="font-serif italic text-charcoal leading-[1.05] text-4xl md:text-6xl text-left">
              {isFr
                ? "Si vous disposez d’un dossier de permis de construire réalisé par un architecte :"
                : "If you already have a building permit file prepared by an architect:"}
            </h2>

            <p className="mt-6 text-lg text-charcoal/65 leading-relaxed max-w-3xl text-left">
              {isFr
                ? "Nous vous proposons un devis gratuit pour la fabrication et le montage de votre ossature bois hors d’eau / hors d’air, hors travaux de fondation. Ce devis correspond à l’étape 3 du processus."
                : "We offer a free quotation for the manufacture and assembly of your timber frame structure, watertight and airtight, excluding foundation work. This quotation corresponds to step 3 of the process."}
            </p>

            <h2 className="font-serif italic text-charcoal leading-[1.05] text-4xl md:text-5xl mt-14 text-left lg:whitespace-nowrap">
              {isFr
                ? "Vous êtes dans une phase de première approche projet:"
                : "You are in the first approach phase of your project:"}
            </h2>
          </header>
        )}

        <div className="w-full">
          <header className={`max-w-3xl text-left ${isCompact ? "mb-10" : "mb-12"}`}>
            <h2
              className={`font-serif italic text-charcoal leading-[1.05] text-left ${
                isCompact ? "text-2xl md:text-3xl" : "text-2xl md:text-5xl"
              }`}
            >
              {isFr ? "Notre processus, étape par étape." : "Our process, step by step."}
            </h2>

            {!isCompact && (
              <p className="mt-6 text-lg text-charcoal/65 leading-relaxed max-w-2xl text-left">
                {isFr
                  ? "De l’idée initiale au clos-couvert : une démarche transparente et sans surprises."
                  : "From the initial idea to the watertight and airtight stage: a transparent process with no surprises."}
              </p>
            )}
          </header>

          <ol
            className={`mx-auto grid w-full max-w-6xl overflow-hidden border border-charcoal/10 bg-charcoal/10 gap-px ${
              isCompact
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {steps.map((s, i) => (
              <li
                key={i}
                className="bg-bone p-6 md:p-8 text-center flex flex-col items-center justify-start group hover:bg-charcoal/[0.02] transition-colors"
              >
                <div className="flex w-full items-center justify-center gap-4 mb-4">
                  <span className="font-serif italic text-3xl md:text-4xl text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-12 bg-charcoal/15" />
                </div>

                <h3 className="font-serif text-xl md:text-2xl italic text-charcoal mb-3 leading-tight text-center">
                  {s.t}
                </h3>

                <p className="text-sm text-charcoal/65 leading-relaxed text-center max-w-xs">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {showDisclaimer && (
          <div
            className={`mx-auto max-w-5xl overflow-x-auto text-center ${
              isCompact ? "mt-8" : "mt-12"
            } 
          [&_*]:text-center 
          [&_table]:mx-auto 
          [&_table]:w-full 
          [&_th]:text-center 
          [&_td]:text-center`}
          >
            <PriceDisclaimer />
          </div>
        )}

        {showCta && !isCompact && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <Link
              to="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-charcoal text-bone px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-ink transition-colors text-center"
            >
              {isFr ? "Démarrer mon projet" : "Start my project"} <ArrowUpRight size={14} />
            </Link>

            <Link
              to="/maisons"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 border border-charcoal/30 text-charcoal px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:border-gold hover:text-gold transition-colors text-center"
            >
              {isFr ? "Voir les catalogues" : "View catalogues"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
