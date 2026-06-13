import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

type LegalSection = {
  h: string;
  p: string;
};

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales / Legal Notice — Envibois" },
      {
        name: "description",
        content:
          "Mentions légales du site Envibois — éditeur, contact, garanties, assurances et propriété intellectuelle.",
      },
      { property: "og:title", content: "Mentions légales — Envibois" },
      { property: "og:url", content: "/mentions-legales" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/mentions-legales" }],
  }),
  component: MentionsLegalesPage,
});

function MentionsLegalesPage() {
  const { locale } = useT();
  const isFr = locale === "fr";

  return (
    <LegalPage
      title={isFr ? "Mentions légales" : "Legal Notice"}
      sections={isFr ? SECTIONS_FR : SECTIONS_EN}
    />
  );
}

const SECTIONS_FR: LegalSection[] = [
  {
    h: "Éditeur du site",
    p: `DORF SIA
Société au capital social de 50 000 €
Adresse du siège social : Gimnazijas 28-5, LV-5401 Daugavpils, Lettonie
Adresse atelier : Višķu 15A, LV-5404 Daugavpils, Lettonie
Numéro d’enregistrement au registre de commerce : 415 030 38 694
TVA intracommunautaire : LV415 030 38 694
Code EORI : LV 415 030 38 694`,
  },
  {
    h: "Construction de maisons bois particulières en France",
    p: `DORF SARL
Adresse du siège social : Gimnazijas 28-5, LV-5401 Daugavpils, Lettonie
Adresse mandataire : 109 route d’Urt, FR-40220 Tarnos, France
SIRET : 520 068 602 00017
TVA : FR 06 520 068 602`,
  },
  {
    h: "Contact",
    p: `Email : info@envibois.fr
Agence : +33 9 70 40 64 64
Mobile France : +33 6 32 76 30 74
Mobile Lettonie : +371 26 89 57 17`,
  },
  {
    h: "Garanties et assurances",
    p: `Maisons ossature bois : fourniture, pose, menuiseries, charpente, couverture, étanchéité, revêtements de façades.

Responsabilité civile décennale obligatoire : police N° 1512DECCEL07870
Responsabilité civile professionnelle du bâtiment : police N° 1512RCCEL07906`,
  },
  {
    h: "Hébergeur",
    p: `[À COMPLÉTER] — nom, adresse et contact de l’hébergeur du site.`,
  },
  {
    h: "Propriété intellectuelle",
    p: `L’ensemble des contenus présents sur ce site, notamment les textes, images, photographies, vidéos, logos, marques, éléments graphiques et documents, sont la propriété de DORF SIA, DORF SARL ou de leurs auteurs respectifs.

Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, est interdite sans autorisation écrite préalable.`,
  },
  {
    h: "Limitation de responsabilité",
    p: `Envibois s’efforce de fournir des informations exactes et à jour. Toutefois, l’éditeur ne peut garantir l’exactitude, la complétude ou l’actualité permanente des informations diffusées sur ce site. Les informations présentées ne constituent pas une offre contractuelle définitive et peuvent être modifiées selon les projets, contraintes techniques et réglementaires.`,
  },
];

const SECTIONS_EN: LegalSection[] = [
  {
    h: "Website publisher",
    p: `DORF SIA
Company with share capital of €50,000
Registered office address: Gimnazijas 28-5, LV-5401 Daugavpils, Latvia
Workshop address: Višķu 15A, LV-5404 Daugavpils, Latvia
Commercial register number: 415 030 38 694
Intra-community VAT number: LV415 030 38 694
EORI code: LV 415 030 38 694`,
  },
  {
    h: "Construction of private timber houses in France",
    p: `DORF SARL
Registered office address: Gimnazijas 28-5, LV-5401 Daugavpils, Latvia
Representative address: 109 route d’Urt, FR-40220 Tarnos, France
SIRET: 520 068 602 00017
VAT: FR 06 520 068 602`,
  },
  {
    h: "Contact",
    p: `Email: info@envibois.fr
Agency: +33 9 70 40 64 64
Mobile France: +33 6 32 76 30 74
Mobile Latvia: +371 26 89 57 17`,
  },
  {
    h: "Guarantees and insurance",
    p: `Timber-frame houses: supply, installation, joinery, framework, roofing, waterproofing and façade cladding.

Mandatory ten-year civil liability insurance: policy No. 1512DECCEL07870
Professional civil liability insurance for construction activities: policy No. 1512RCCEL07906`,
  },
  {
    h: "Hosting provider",
    p: `[TO BE COMPLETED] — name, address and contact details of the website hosting provider.`,
  },
  {
    h: "Intellectual property",
    p: `All content published on this website, including texts, images, photographs, videos, logos, trademarks, graphic elements and documents, is the property of DORF SIA, DORF SARL or their respective authors.

Any reproduction, representation, modification, publication or adaptation, in whole or in part, is prohibited without prior written authorisation.`,
  },
  {
    h: "Limitation of liability",
    p: `Envibois makes every effort to provide accurate and up-to-date information. However, the publisher cannot guarantee the permanent accuracy, completeness or timeliness of the information published on this website. The information presented does not constitute a final contractual offer and may vary depending on each project, technical constraints and applicable regulations.`,
  },
];

export function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
  const { locale } = useT();
  const isFr = locale === "fr";

  return (
    <div className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-serif text-4xl md:text-5xl italic text-charcoal mb-12">{title}</h1>

        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-serif text-xl text-charcoal mb-3">{s.h}</h2>
              <p className="text-charcoal/70 leading-relaxed whitespace-pre-line">{s.p}</p>
            </section>
          ))}
        </div>

        <p className="mt-16 text-xs text-charcoal/40">
          {isFr ? "Dernière mise à jour : " : "Last updated: "}
          {new Date().toLocaleDateString(isFr ? "fr-FR" : "en-GB")}
        </p>
      </div>
    </div>
  );
}
