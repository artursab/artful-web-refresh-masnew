import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gal1 from "@/assets/home/gallery-sofa.jpg";
import gal2 from "@/assets/home/gallery-pool.jpg";
import gal3 from "@/assets/home/band-daylight.jpg";
import projet1 from "@/assets/home/gallery-pool.jpg";
import projet2 from "@/assets/gamme-neo-wood.jpg";
import projet3 from "@/assets/gamme-traditionanelle.jpg";
import story from "@/assets/home/story.jpg";
import craft from "@/assets/home/band-craft.jpg";
import classicWood from "@/assets/gamme-classic-wood.jpg";
import tropicale from "@/assets/gamme-tropicale.jpg";
import model3 from "@/assets/home/model-3.jpg";

const POOL = [
  { src: projet1, alt: "Projet ossature bois" },
  { src: gal1, alt: "Salon intérieur" },
  { src: projet2, alt: "Maison contemporaine" },
  { src: gal2, alt: "Maison avec piscine" },
  { src: projet3, alt: "Réalisation bois" },
  { src: gal3, alt: "Lumière du jour" },
  { src: story, alt: "atlanticaWood" },
  { src: craft, alt: "Charpente" },
  { src: classicWood, alt: "Modèle 1" },
  { src: tropicale, alt: "Modèle 2" },
  { src: model3, alt: "Modèle 3" },
];

// Build clusters of 7 images each (loops the pool)
const CLUSTERS: { src: string; alt: string }[][] = [];
for (let i = 0; i < 3; i++) {
  const cluster = [];
  for (let j = 0; j < 7; j++) {
    cluster.push(POOL[(i * 7 + j) % POOL.length]);
  }
  CLUSTERS.push(cluster);
}

// Mosaic template that fills a 6-col × 2-row grid exactly (no empty cells)
// Layout: left (1 top big + 2 small bottom) | center (1 tall) | right (2 small top + 1 big bottom)
const TEMPLATE_A = [
  "col-span-2 row-span-1", // left top
  "col-span-1 row-span-1", // left bottom-left
  "col-span-1 row-span-1", // left bottom-right
  "col-span-2 row-span-2", // center tall
  "col-span-1 row-span-1", // right top-left
  "col-span-1 row-span-1", // right top-right
  "col-span-2 row-span-1", // right bottom
];

// Mirror for variety
const TEMPLATE_B = [
  "col-span-1 row-span-1", // left top-left
  "col-span-1 row-span-1", // left top-right
  "col-span-2 row-span-1", // left bottom
  "col-span-2 row-span-2", // center tall
  "col-span-2 row-span-1", // right top
  "col-span-1 row-span-1", // right bottom-left
  "col-span-1 row-span-1", // right bottom-right
];


export function ProjectsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = (i: number) => emblaApi?.scrollTo(i);
  const prev = () => emblaApi?.scrollPrev();
  const next = () => emblaApi?.scrollNext();

  return (
    <div className="relative">
      {/* Arrows top-right */}
      <div className="flex justify-end gap-3 mb-6">
        <button
          onClick={prev}
          aria-label="Précédent"
          className="h-11 w-11 rounded-full border border-charcoal/30 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-bone transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Suivant"
          className="h-11 w-11 rounded-full border border-charcoal/30 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-bone transition-colors"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Embla viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {CLUSTERS.map((cluster, ci) => {
            const tpl = ci % 2 === 0 ? TEMPLATE_A : TEMPLATE_B;
            return (
              <div key={ci} className="shrink-0 basis-full min-w-0 pr-2">
                <div className="grid grid-cols-6 grid-rows-2 gap-3 md:gap-4 h-[60vh] min-h-[480px] max-h-[700px]">
                  {cluster.map((img, i) => (
                    <figure
                      key={i}
                      className={`${tpl[i]} overflow-hidden`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </figure>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-10">
        {snaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Aller à la diapositive ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === selected ? "w-6 bg-charcoal" : "w-2 bg-charcoal/30 hover:bg-charcoal/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
