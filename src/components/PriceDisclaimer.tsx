import { useT } from "@/lib/i18n";

type Props = {
  variant?: "default" | "compact" | "dark";
  className?: string;
};

export function PriceDisclaimer({ variant = "default", className = "" }: Props) {
  const { locale } = useT();
  const isFr = locale === "fr";

  const text = isFr
    ? "Le prix affiché est une estimation. Le prix final dépend des détails du projet, des conditions du terrain, de la livraison, des fondations, des options choisies et des exigences techniques. Les travaux ne démarrent qu'après confirmation de l'offre finale et réception de l'acompte / du paiement."
    : "The displayed price is only an estimate. The final price depends on project details, land conditions, delivery, foundation, selected options and technical requirements. Work starts only after final offer confirmation and payment/deposit reception.";

  const label = isFr ? "Note importante" : "Important notice";

  if (variant === "compact") {
    return (
      <p className={`text-[11px] leading-relaxed italic text-charcoal/55 border-l-2 border-gold pl-3 ${className}`}>
        {text}
      </p>
    );
  }

  if (variant === "dark") {
    return (
      <div className={`border-l-2 border-gold pl-4 py-2 ${className}`}>
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold mb-2">— {label}</p>
        <p className="text-xs leading-relaxed italic text-cream/70">{text}</p>
      </div>
    );
  }

  return (
    <div className={`bg-charcoal/[0.03] border-l-2 border-gold p-5 md:p-6 ${className}`}>
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-gold mb-3">— {label}</p>
      <p className="text-sm leading-relaxed italic text-charcoal/70 max-w-3xl">{text}</p>
    </div>
  );
}
