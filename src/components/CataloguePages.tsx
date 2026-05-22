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

import page01 from "@/assets/catalogue/pages/img1.webp";
import page02 from "@/assets/catalogue/pages/img2.webp";
import page03 from "@/assets/catalogue/pages/img3.webp";
import page04 from "@/assets/catalogue/pages/img4.webp";
import page05 from "@/assets/catalogue/pages/img5.webp";
import page06 from "@/assets/catalogue/pages/img6.webp";
import page07 from "@/assets/catalogue/pages/img7.webp";
import page08 from "@/assets/catalogue/pages/img8.webp";
import page09 from "@/assets/catalogue/pages/img9.webp";
import page10 from "@/assets/catalogue/pages/img10.webp";
import page11 from "@/assets/catalogue/pages/img11.webp";
import page12 from "@/assets/catalogue/pages/img12.webp";
import page13 from "@/assets/catalogue/pages/img13.webp";
import page14 from "@/assets/catalogue/pages/img14.webp";
import page15 from "@/assets/catalogue/pages/img15.webp";
import page16 from "@/assets/catalogue/pages/img16.webp";
import page17 from "@/assets/catalogue/pages/img17.webp";
import page18 from "@/assets/catalogue/pages/img18.webp";
import page19 from "@/assets/catalogue/pages/img19.webp";
import page20 from "@/assets/catalogue/pages/img20.webp";
import page21 from "@/assets/catalogue/pages/img21.webp";
import page22 from "@/assets/catalogue/pages/img22.webp";
import page23 from "@/assets/catalogue/pages/img23.webp";
import page24 from "@/assets/catalogue/pages/img24.webp";
import page25 from "@/assets/catalogue/pages/img25.webp";
import page26 from "@/assets/catalogue/pages/img26.webp";
import page27 from "@/assets/catalogue/pages/img27.webp";
import page28 from "@/assets/catalogue/pages/img28.webp";
import page29 from "@/assets/catalogue/pages/img29.webp";
import page30 from "@/assets/catalogue/pages/img30.webp";

const PAGES: { src: string; alt: string }[] = [
  { src: page01, alt: "img1" },
  { src: page02, alt: "img2" },
  { src: page03, alt: "img3" },
  { src: page04, alt: "img4" },
  { src: page05, alt: "img5" },
  { src: page06, alt: "img6" },
  { src: page07, alt: "img7" },
  { src: page08, alt: "img8" },
  { src: page09, alt: "img9" },
  { src: page10, alt: "img10" },
  { src: page11, alt: "img11" },
  { src: page12, alt: "img12" },
  { src: page13, alt: "img13" },
  { src: page14, alt: "img14" },
  { src: page15, alt: "img15" },
  { src: page16, alt: "img16" },
  { src: page17, alt: "img17" },
  { src: page18, alt: "img18" },
  { src: page19, alt: "img19" },
  { src: page20, alt: "img20" },
  { src: page21, alt: "img21" },
  { src: page22, alt: "img22" },
  { src: page23, alt: "img23" },
  { src: page24, alt: "img24" },
  { src: page25, alt: "img25" },
  { src: page26, alt: "img26" },
  { src: page27, alt: "img27" },
  { src: page28, alt: "img28" },
  { src: page29, alt: "img29" },
  { src: page30, alt: "img30" },
];

export function CataloguePages() {
  return (
    <div className="mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 px-6">
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
