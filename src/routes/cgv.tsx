import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { LegalPage } from "./mentions-legales";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "Conditions générales de vente / Terms of Sale — Envibois" },
      {
        name: "description",
        content:
          "Conditions générales de vente de Envibois pour les prestations liées aux maisons ossature bois.",
      },
      { property: "og:title", content: "CGV — Envibois" },
      { property: "og:url", content: "/cgv" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/cgv" }],
  }),
  component: CgvPage,
});

function CgvPage() {
  const { locale } = useT();
  const isFr = locale === "fr";

  return (
    <LegalPage
      title={isFr ? "Conditions générales de vente" : "Terms and Conditions of Sale"}
      sections={isFr ? SECTIONS_FR : SECTIONS_EN}
    />
  );
}

const SECTIONS_FR = [
  {
    h: "1. Objet",
    p: `Les présentes conditions générales de vente ont pour objet de définir les conditions applicables aux prestations proposées par Envibois / DORF, notamment l’étude, la fabrication, la fourniture, la pose et le montage de maisons à ossature bois, menuiseries, charpentes, couvertures, étanchéité et revêtements de façades.`,
  },
  {
    h: "2. Devis et commande",
    p: `Toute prestation fait l’objet d’un devis ou d’une offre commerciale précisant le périmètre, les travaux inclus, les exclusions, le prix, les délais estimatifs et les conditions de paiement.

La commande devient définitive après acceptation écrite de l’offre par le client et réception de l’acompte prévu, sauf disposition différente indiquée dans le devis.`,
  },
  {
    h: "3. Prix et modalités de paiement",
    p: `Les prix sont indiqués dans le devis accepté par le client. Les modalités de paiement, l’échéancier, les acomptes et les éventuelles retenues sont précisés dans l’offre commerciale ou le contrat.

Tout retard de paiement peut entraîner la suspension des prestations jusqu’au règlement des sommes dues.`,
  },
  {
    h: "4. Délais d’exécution",
    p: `Les délais sont indiqués à titre prévisionnel, sauf engagement écrit contraire. Ils peuvent être adaptés en fonction de la validation des plans, de la disponibilité des matériaux, des conditions météorologiques, des contraintes du chantier, des autorisations administratives ou de tout cas de force majeure.`,
  },
  {
    h: "5. Obligations du client",
    p: `Le client s’engage à fournir des informations exactes et complètes concernant le projet, le terrain, les accès, les contraintes locales, les autorisations administratives, les plans et tout document utile à la bonne exécution de la prestation.

Le client est responsable de l’obtention des autorisations nécessaires, sauf mission spécifique confiée par écrit à Envibois / DORF.`,
  },
  {
    h: "6. Garanties et assurances",
    p: `Pour les prestations concernées, Envibois / DORF dispose des assurances suivantes :

Responsabilité civile décennale obligatoire : police N° 1512DECCEL07870
Responsabilité civile professionnelle du bâtiment : police N° 1512RCCEL07906

Les garanties applicables dépendent de la nature des prestations réalisées et des dispositions légales en vigueur.`,
  },
  {
    h: "7. Réception des travaux",
    p: `La réception des travaux intervient à l’achèvement des prestations prévues au contrat. Elle peut donner lieu à un procès-verbal de réception avec ou sans réserves. Les éventuelles réserves sont traitées selon les modalités prévues dans le contrat ou la réglementation applicable.`,
  },
  {
    h: "8. Droit applicable et litiges",
    p: `Les présentes conditions sont soumises au droit applicable au contrat conclu avec le client. En cas de litige, les parties s’efforcent de rechercher une solution amiable avant toute action judiciaire. Les juridictions compétentes sont déterminées selon les règles applicables au contrat et au lieu d’exécution des prestations.`,
  },
];

const SECTIONS_EN = [
  {
    h: "1. Purpose",
    p: `These terms and conditions of sale define the conditions applicable to the services offered by Envibois / DORF, including the study, manufacture, supply, installation and assembly of timber-frame houses, joinery, frameworks, roofing, waterproofing and façade cladding.`,
  },
  {
    h: "2. Quotation and order",
    p: `Each service is subject to a quotation or commercial offer specifying the scope, included works, exclusions, price, estimated deadlines and payment conditions.

The order becomes final after written acceptance of the offer by the client and receipt of the agreed deposit, unless otherwise stated in the quotation.`,
  },
  {
    h: "3. Prices and payment terms",
    p: `Prices are those stated in the quotation accepted by the client. Payment terms, payment schedule, deposits and any retentions are specified in the commercial offer or contract.

Any delay in payment may result in the suspension of the services until the outstanding amounts have been paid.`,
  },
  {
    h: "4. Execution deadlines",
    p: `Deadlines are provided as estimates unless otherwise agreed in writing. They may be adjusted depending on plan approval, availability of materials, weather conditions, site constraints, administrative authorisations or any force majeure event.`,
  },
  {
    h: "5. Client obligations",
    p: `The client undertakes to provide accurate and complete information concerning the project, the land, access conditions, local constraints, administrative authorisations, plans and any document required for the proper performance of the service.

The client is responsible for obtaining the necessary authorisations, unless a specific mission is entrusted in writing to Envibois / DORF.`,
  },
  {
    h: "6. Guarantees and insurance",
    p: `For the relevant services, Envibois / DORF has the following insurance policies:

Mandatory ten-year civil liability insurance: policy No. 1512DECCEL07870
Professional civil liability insurance for construction activities: policy No. 1512RCCEL07906

The applicable guarantees depend on the nature of the services performed and the legal provisions in force.`,
  },
  {
    h: "7. Acceptance of works",
    p: `Acceptance of the works takes place upon completion of the services provided for in the contract. It may be recorded in an acceptance report with or without reservations. Any reservations are handled according to the terms of the contract or the applicable regulations.`,
  },
  {
    h: "8. Applicable law and disputes",
    p: `These terms are governed by the law applicable to the contract concluded with the client. In the event of a dispute, the parties will seek an amicable solution before taking legal action. The competent courts are determined according to the rules applicable to the contract and the place where the services are performed.`,
  },
];
