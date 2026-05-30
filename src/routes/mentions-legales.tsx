import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Envibois" },
      { name: "description", content: "Mentions légales du site Envibois — éditeur, hébergeur, propriété intellectuelle." },
      { property: "og:title", content: "Mentions légales — Envibois" },
      { property: "og:url", content: "/mentions-legales" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/mentions-legales" }],
  }),
  component: () => <LegalPage title="Mentions légales" sections={SECTIONS} />,
});

const SECTIONS = [
  {
    h: "Éditeur du site",
    p: "Envibois — Société à responsabilité limitée. Siège social : Višķu iela 15A, LV-5410 Daugavpils, Lettonie. N° d'enregistrement : LV 415 030 38 694. Contact : info@envibois.fr.",
  },
  {
    h: "Directeur de la publication",
    p: "Julien Dicharry, gérant de Envibois.",
  },
  {
    h: "Hébergeur",
    p: "[À COMPLÉTER] — nom, adresse, téléphone de l'hébergeur du site.",
  },
  {
    h: "Propriété intellectuelle",
    p: "L'ensemble des contenus présents sur ce site (textes, images, vidéos, logos, marques) sont la propriété exclusive de Envibois ou de leurs auteurs respectifs. Toute reproduction, totale ou partielle, est interdite sans autorisation écrite préalable.",
  },
  {
    h: "Crédits photos",
    p: "[À COMPLÉTER] — crédits des photographes et illustrateurs.",
  },
  {
    h: "Limitation de responsabilité",
    p: "Envibois s'efforce de fournir des informations exactes et à jour mais ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées sur ce site. L'éditeur ne saurait être tenu responsable des erreurs, d'une absence de disponibilité des informations ou de la présence de virus sur son site.",
  },
];

export function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <div className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-serif text-4xl md:text-5xl italic text-charcoal mb-12">{title}</h1>
        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-serif text-xl text-charcoal mb-3">{s.h}</h2>
              <p className="text-charcoal/70 leading-relaxed">{s.p}</p>
            </section>
          ))}
        </div>
        <p className="mt-16 text-xs text-charcoal/40">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>
      </div>
    </div>
  );
}
