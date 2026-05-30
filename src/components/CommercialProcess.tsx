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
        { t: "Choisir un modèle", d: "Vous sélectionnez un modèle de maison ou configurez la vôtre via notre configurateur en ligne." },
        { t: "Formulaire de projet", d: "Vous remplissez le formulaire avec les informations clés : terrain, surface, options, budget." },
        { t: "Étude préliminaire gratuite", d: "Notre équipe prépare une première estimation chiffrée, sans engagement de votre part." },
        { t: "Échanges & compléments", d: "Nous revenons vers vous pour préciser les détails manquants : sol, accès, contraintes locales." },
        { t: "Offre finale détaillée", d: "Vous recevez une évaluation complète : descriptif technique, planning, prix ferme." },
        { t: "Lancement des travaux", d: "Les travaux démarrent uniquement après confirmation de l'offre et réception de l'acompte." },
      ]
    : [
        { t: "Pick a model", d: "Select a house model or configure your own using our online configurator." },
        { t: "Project form", d: "Fill in the form with the key information: land, surface, options, budget." },
        { t: "Free preliminary study", d: "Our team prepares a first costed estimate, with no commitment on your side." },
        { t: "Exchanges & details", d: "We come back to you to clarify missing details: soil, access, local constraints." },
        { t: "Final detailed offer", d: "You receive a complete evaluation: technical scope, schedule, firm price." },
        { t: "Work begins", d: "Work starts only after offer confirmation and reception of the deposit." },
      ];

  const isCompact = variant === "compact";

  return (
    <section className={isCompact ? "py-12" : "py-24 md:py-32 bg-bone"}>
      <div className={`mx-auto px-6 md:px-10 ${isCompact ? "max-w-screen-xl" : "max-w-screen-2xl"}`}>
        <header className={`max-w-3xl ${isCompact ? "mb-10" : "mb-16 md:mb-20"}`}>
          <p className="eyebrow mb-5">— {isFr ? "Comment ça marche" : "How it works"}</p>
          <h2
            className={`font-serif italic text-charcoal leading-[1.05] ${
              isCompact ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl"
            }`}
          >
            {isFr ? "Notre processus, étape par étape." : "Our process, step by step."}
          </h2>
          {!isCompact && (
            <p className="mt-6 text-lg text-charcoal/65 leading-relaxed max-w-2xl">
              {isFr
                ? "De la première idée à la pose de la dernière planche : un parcours transparent, sans surprise."
                : "From the first idea to the last plank: a transparent journey, no surprises."}
            </p>
          )}
        </header>

        <ol
          className={`grid gap-px bg-charcoal/10 border border-charcoal/10 ${
            isCompact ? "md:grid-cols-3 sm:grid-cols-2" : "md:grid-cols-3 sm:grid-cols-2"
          }`}
        >
          {steps.map((s, i) => (
            <li
              key={i}
              className="bg-bone p-6 md:p-8 group hover:bg-charcoal/[0.02] transition-colors"
            >
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-serif italic text-3xl md:text-4xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-charcoal/15" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl italic text-charcoal mb-3 leading-tight">
                {s.t}
              </h3>
              <p className="text-sm text-charcoal/65 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>

        {showDisclaimer && (
          <div className={isCompact ? "mt-8" : "mt-12"}>
            <PriceDisclaimer />
          </div>
        )}

        {showCta && !isCompact && (
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-charcoal text-bone px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-ink transition-colors"
            >
              {isFr ? "Démarrer mon projet" : "Start my project"} <ArrowUpRight size={14} />
            </Link>
            <Link
              to="/configurateur"
              className="inline-flex items-center gap-3 border border-charcoal/30 text-charcoal px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:border-gold hover:text-gold transition-colors"
            >
              {isFr ? "Configurer ma maison" : "Configure my home"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
