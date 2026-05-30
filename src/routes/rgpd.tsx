import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "./mentions-legales";

export const Route = createFileRoute("/rgpd")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité (RGPD) — Envibois" },
      { name: "description", content: "Traitement de vos données personnelles par Envibois, conformément au RGPD." },
      { property: "og:title", content: "RGPD — Envibois" },
      { property: "og:url", content: "/rgpd" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/rgpd" }],
  }),
  component: () => (
    <LegalPage
      title="Politique de confidentialité"
      sections={[
        { h: "Responsable du traitement", p: "Envibois — Višķu iela 15A, LV-5410 Daugavpils, Lettonie. Contact : info@envibois.fr." },
        { h: "Données collectées", p: "[À COMPLÉTER] — données collectées via les formulaires de contact, devis et configurateur (nom, email, téléphone, code postal, descriptif du projet)." },
        { h: "Finalités du traitement", p: "[À COMPLÉTER] — réponse aux demandes commerciales, établissement d'un devis, suivi de chantier, communication." },
        { h: "Base légale", p: "[À COMPLÉTER] — exécution d'un contrat, intérêt légitime, consentement selon le cas." },
        { h: "Durée de conservation", p: "[À COMPLÉTER] — durée par finalité (prospects, clients, comptabilité)." },
        { h: "Destinataires", p: "[À COMPLÉTER] — équipe Envibois et sous-traitants techniques (hébergement, emailing)." },
        { h: "Vos droits", p: "Vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité, de limitation et d'opposition. Pour les exercer : info@envibois.fr. Vous pouvez également introduire une réclamation auprès de la CNIL." },
      ]}
    />
  ),
});
