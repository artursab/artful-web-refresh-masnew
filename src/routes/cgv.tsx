import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "./mentions-legales";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "Conditions générales de vente — Envibois" },
      { name: "description", content: "Conditions générales de vente de Envibois pour les prestations de conception et construction de maisons ossature bois." },
      { property: "og:title", content: "CGV — Envibois" },
      { property: "og:url", content: "/cgv" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/cgv" }],
  }),
  component: () => (
    <LegalPage
      title="Conditions générales de vente"
      sections={[
        { h: "1. Objet", p: "[À COMPLÉTER] — objet et champ d'application des présentes conditions." },
        { h: "2. Devis et commande", p: "[À COMPLÉTER] — validité du devis, conditions d'acceptation, acompte." },
        { h: "3. Prix et modalités de paiement", p: "[À COMPLÉTER] — échéancier, modalités, pénalités de retard." },
        { h: "4. Délais d'exécution", p: "[À COMPLÉTER] — délais indicatifs, cas de force majeure." },
        { h: "5. Garanties", p: "[À COMPLÉTER] — décennale, biennale, parfait achèvement. Voir aussi la page Garanties." },
        { h: "6. Réception des travaux", p: "[À COMPLÉTER] — procès-verbal, réserves, levée de réserves." },
        { h: "7. Droit applicable et juridiction", p: "[À COMPLÉTER] — droit français, tribunal compétent, médiation de la consommation." },
      ]}
    />
  ),
});
