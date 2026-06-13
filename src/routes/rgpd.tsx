import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { LegalPage } from "./mentions-legales";

export const Route = createFileRoute("/rgpd")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité / Privacy Policy — Envibois" },
      {
        name: "description",
        content: "Traitement des données personnelles par Envibois conformément au RGPD.",
      },
      { property: "og:title", content: "RGPD — Envibois" },
      { property: "og:url", content: "/rgpd" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/rgpd" }],
  }),
  component: RgpdPage,
});

function RgpdPage() {
  const { locale } = useT();
  const isFr = locale === "fr";

  return (
    <LegalPage
      title={isFr ? "Politique de confidentialité" : "Privacy Policy"}
      sections={isFr ? SECTIONS_FR : SECTIONS_EN}
    />
  );
}

const SECTIONS_FR = [
  {
    h: "Responsable du traitement",
    p: `Le responsable du traitement des données personnelles collectées via ce site est :

DORF SIA
Gimnazijas 28-5, LV-5401 Daugavpils, Lettonie
Email : info@envibois.fr`,
  },
  {
    h: "Données collectées",
    p: `Les données personnelles susceptibles d’être collectées sont notamment : nom, prénom, adresse email, numéro de téléphone, pays, code postal, informations relatives au terrain, surface souhaitée, budget, description du projet, documents transmis volontairement et contenu des messages envoyés via les formulaires du site.`,
  },
  {
    h: "Finalités du traitement",
    p: `Les données sont utilisées pour répondre aux demandes de contact, préparer une étude ou un devis, assurer le suivi commercial du projet, organiser les échanges avec le client, gérer les obligations administratives et contractuelles, et améliorer la qualité du service.`,
  },
  {
    h: "Base légale",
    p: `Selon le cas, les traitements reposent sur l’exécution de mesures précontractuelles ou contractuelles, l’intérêt légitime de l’entreprise à répondre aux demandes reçues, le respect d’obligations légales ou le consentement de l’utilisateur lorsque celui-ci est requis.`,
  },
  {
    h: "Durée de conservation",
    p: `Les données sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées. Les données liées aux demandes commerciales peuvent être conservées pendant la durée du suivi du projet. Les données liées aux clients, devis, factures et contrats sont conservées conformément aux obligations légales et comptables applicables.`,
  },
  {
    h: "Destinataires des données",
    p: `Les données sont destinées aux équipes de DORF SIA, DORF SARL et, si nécessaire, à leurs prestataires techniques ou partenaires intervenant dans le traitement de la demande : hébergement, messagerie, outils de formulaire, gestion commerciale, étude technique ou suivi de projet.`,
  },
  {
    h: "Transfert hors Union européenne",
    p: `Si certains prestataires techniques traitent des données en dehors de l’Union européenne, Envibois veille à ce que des garanties appropriées soient mises en place conformément au RGPD.`,
  },
  {
    h: "Vos droits",
    p: `Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité concernant vos données personnelles. Vous pouvez également retirer votre consentement lorsque le traitement repose sur celui-ci.

Pour exercer vos droits, vous pouvez écrire à : info@envibois.fr.

Vous pouvez également introduire une réclamation auprès de l’autorité de contrôle compétente, notamment la CNIL en France.`,
  },
];

const SECTIONS_EN = [
  {
    h: "Data controller",
    p: `The controller responsible for the personal data collected through this website is:

DORF SIA
Gimnazijas 28-5, LV-5401 Daugavpils, Latvia
Email: info@envibois.fr`,
  },
  {
    h: "Data collected",
    p: `The personal data that may be collected includes: first name, last name, email address, telephone number, country, postal code, land information, desired surface area, budget, project description, documents voluntarily submitted and the content of messages sent through the website forms.`,
  },
  {
    h: "Purpose of processing",
    p: `The data is used to respond to contact requests, prepare a study or quotation, manage commercial follow-up, organise communication with the client, handle administrative and contractual obligations and improve the quality of the service.`,
  },
  {
    h: "Legal basis",
    p: `Depending on the situation, the processing is based on pre-contractual or contractual measures, the company’s legitimate interest in responding to requests, compliance with legal obligations or the user’s consent when required.`,
  },
  {
    h: "Retention period",
    p: `Personal data is kept only for the period necessary for the purposes for which it was collected. Data related to commercial requests may be kept for the duration of the project follow-up. Data related to clients, quotations, invoices and contracts is kept in accordance with applicable legal and accounting obligations.`,
  },
  {
    h: "Recipients of the data",
    p: `The data is intended for the teams of DORF SIA, DORF SARL and, where necessary, their technical providers or partners involved in handling the request: hosting, email services, form tools, commercial management, technical study or project follow-up.`,
  },
  {
    h: "Transfer outside the European Union",
    p: `If certain technical providers process data outside the European Union, Envibois ensures that appropriate safeguards are implemented in accordance with the GDPR.`,
  },
  {
    h: "Your rights",
    p: `You have the right to access, rectify, erase, restrict, object to and request portability of your personal data. You may also withdraw your consent when the processing is based on consent.

To exercise your rights, you can write to: info@envibois.fr.

You may also lodge a complaint with the competent supervisory authority, including the CNIL in France.`,
  },
];
