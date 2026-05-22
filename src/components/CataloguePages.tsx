// ─────────────────────────────────────────────────────────────
// Catalogue : 1 image = 1 page du PDF, empilées verticalement.
//
// Pour ajouter une page :
//   1. Place le fichier dans  src/assets/catalogue/pages/page-XX.jpg
//   2. Importe-le ci-dessous :
//        import page03 from "@/assets/catalogue/pages/page-03.jpg";
//   3. Ajoute une entrée au tableau PAGES :
//        { src: page03, alt: "Description courte de la page" }
// ─────────────────────────────────────────────────────────────

import page01 from "@/assets/catalogue/pages/page-01.jpg";
import page02 from "@/assets/catalogue/pages/page-02.jpg";
import page03 from "@/assets/catalogue/pages/page-03.jpg";

const PAGES: { src: string; alt: string }[] = [
  { src: page01, alt: "Portfolio de projets 2026 — Envibois, maisons en bois" },
  { src: page02, alt: "Projet personnalisé — 6 chambres, 4 salles d'eau, R+1, 250 m²" },
  { src: page03, alt: "Projet 3" },
  // { src: page03, alt: "..." },
];

export function CataloguePages() {
  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-6 md:gap-10">
      {PAGES.map((p, i) => (
        <figure
          key={i}
          className="bg-white rounded-lg ring-1 ring-charcoal/10 shadow-sm overflow-hidden"
        >
          <img
            src={p.src}
            alt={p.alt}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="block w-full h-auto"
          />
        </figure>
      ))}
    </div>
  );
}
