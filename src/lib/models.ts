import atlanticaWood from "@/assets/gamme-atlantica.jpg";
import traditionnelle from "@/assets/gamme-traditionanelle.jpg";
import neoWood from "@/assets/gamme-neo-wood.jpg";
import cubique from "@/assets/gamme-cubique.jpg";
import classicWood from "@/assets/gamme-classic-wood.jpg";
import tropicale from "@/assets/gamme-tropicale.jpg";

const imgFor = (i: string) => ({ pine: i, larch: i, charred: i, mixed: i });

export type Model = {
  slug: string;
  name: string;
  tagline: { fr: string; en: string };
  description: { fr: string; en: string };
  basePrice: number;
  baseSurface: number;
  defaultBedrooms: number;
  image: string;
  claddingImages: Record<string, string>;
};

export const MODELS: Model[] = [
  {
    slug: "traditionnelle",
    name: "Gamme Traditionnelle",
    tagline: { fr: "L'élégance intemporelle du bois", en: "The timeless elegance of wood" },
    description: {
      fr: "Maisons en ossature bois inspirées de l'architecture classique française : toitures à deux pans, volumes rassurants et finitions soignées.",
      en: "Timber-frame homes inspired by classic French architecture: pitched roofs, reassuring volumes and refined finishes.",
    },
    basePrice: 185000,
    baseSurface: 100,
    defaultBedrooms: 3,
    image: traditionnelle,
    claddingImages: imgFor(traditionnelle),
  },
  {
    slug: "neo-wood",
    name: "Gamme Neo Wood",
    tagline: { fr: "Le bois revisité, signature contemporaine", en: "Wood reimagined, contemporary signature" },
    description: {
      fr: "Lignes franches, bardages mixtes et grandes ouvertures. Une nouvelle écriture du bois pour les modes de vie d'aujourd'hui.",
      en: "Sharp lines, mixed cladding and generous openings. A new wood vocabulary for today's lifestyles.",
    },
    basePrice: 235000,
    baseSurface: 115,
    defaultBedrooms: 3,
    image: neoWood,
    claddingImages: imgFor(neoWood),
  },
  {
    slug: "classic-wood",
    name: "Gamme Classic Wood",
    tagline: { fr: "L'essence même de la maison bois", en: "The essence of the wooden home" },
    description: {
      fr: "Bardage bois plein, charpente apparente, proportions équilibrées. La maison bois dans toute sa pureté.",
      en: "Full timber cladding, exposed framework, balanced proportions. The wood home in its purest expression.",
    },
    basePrice: 175000,
    baseSurface: 95,
    defaultBedrooms: 2,
    image: classicWood,
    claddingImages: imgFor(classicWood),
  },
  {
    slug: "tropicale",
    name: "Gamme Tropicale",
    tagline: { fr: "Pensée pour les climats chauds", en: "Designed for warm climates" },
    description: {
      fr: "Toitures débordantes, ventilation naturelle, bois traités classe 4. Conçue pour les outre-mer et zones tropicales.",
      en: "Overhanging roofs, natural ventilation, class-4 treated timber. Built for tropical and overseas climates.",
    },
    basePrice: 165000,
    baseSurface: 85,
    defaultBedrooms: 2,
    image: tropicale,
    claddingImages: imgFor(tropicale),
  },
  {
    slug: "atlantica",
    name: "Gamme Atlantica",
    tagline: { fr: "L'esprit océan, robustesse côtière", en: "Ocean spirit, coastal resilience" },
    description: {
      fr: "Inspirée des maisons du littoral atlantique : bardage clair, volumes ouverts sur l'horizon, résistance aux embruns.",
      en: "Inspired by Atlantic coastal homes: light cladding, volumes opened to the horizon, sea-spray resistance.",
    },
    basePrice: 215000,
    baseSurface: 105,
    defaultBedrooms: 3,
    image: atlanticaWood,
    claddingImages: imgFor(atlanticaWood),
  },
  {
    slug: "cubique",
    name: "Gamme Cubique",
    tagline: { fr: "Architecture radicale, lignes pures", en: "Radical architecture, pure lines" },
    description: {
      fr: "Volumes cubiques, toits plats, grandes baies vitrées. Une signature résolument moderne pour amateurs d'épure.",
      en: "Cubic volumes, flat roofs, large bay windows. A resolutely modern signature for lovers of minimalism.",
    },
    basePrice: 265000,
    baseSurface: 120,
    defaultBedrooms: 3,
    image: cubique,
    claddingImages: imgFor(cubique),
  },
];

export const getModel = (slug: string) => MODELS.find((m) => m.slug === slug);

export type Option = {
  id: string;
  label: { fr: string; en: string };
  swatch: string;
  delta: number;
};

export const CLADDINGS: Option[] = [
  { id: "pine", label: { fr: "Pin naturel", en: "Natural pine" }, swatch: "#c9a06b", delta: 0 },
  { id: "larch", label: { fr: "Mélèze", en: "Larch" }, swatch: "#8b7355", delta: 4200 },
  { id: "charred", label: { fr: "Bois brûlé (Yakisugi)", en: "Charred wood (Yakisugi)" }, swatch: "#1a1a1a", delta: 7800 },
  { id: "mixed", label: { fr: "Mixte bois & enduit", en: "Mixed wood & render" }, swatch: "#dcd5c7", delta: 5400 },
];

export const ROOFS: Option[] = [
  { id: "flat", label: { fr: "Toit plat", en: "Flat roof" }, swatch: "#3a3a3a", delta: 0 },
  { id: "mono", label: { fr: "Monopente", en: "Mono-pitch" }, swatch: "#5a5a5a", delta: 3500 },
  { id: "pitched", label: { fr: "Deux pans", en: "Pitched" }, swatch: "#8a8a8a", delta: 2200 },
];

export const WINDOWS: Option[] = [
  { id: "alu-black", label: { fr: "Alu noir mat", en: "Matte black aluminium" }, swatch: "#1a1a1a", delta: 0 },
  { id: "alu-grey", label: { fr: "Alu gris anthracite", en: "Anthracite aluminium" }, swatch: "#3d4044", delta: 0 },
  { id: "wood", label: { fr: "Bois chêne", en: "Oak wood" }, swatch: "#a07c52", delta: 3200 },
];

export const FLOORS: Option[] = [
  { id: "oak", label: { fr: "Parquet chêne", en: "Oak parquet" }, swatch: "#b58d67", delta: 0 },
  { id: "pine", label: { fr: "Pin huilé", en: "Oiled pine" }, swatch: "#d4b48a", delta: -2400 },
  { id: "concrete", label: { fr: "Béton ciré", en: "Polished concrete" }, swatch: "#9c9c98", delta: 1800 },
  { id: "tile", label: { fr: "Carrelage grand format", en: "Large format tile" }, swatch: "#e2dfd8", delta: 1200 },
];

export const KITCHENS: Option[] = [
  { id: "modern", label: { fr: "Moderne mat", en: "Matte modern" }, swatch: "#2c2c2c", delta: 0 },
  { id: "scandi", label: { fr: "Scandinave bois", en: "Scandi wood" }, swatch: "#c9a06b", delta: 1500 },
  { id: "minimal", label: { fr: "Minimal blanc", en: "Minimal white" }, swatch: "#f3f1ec", delta: 800 },
];

export const BATHROOMS: Option[] = [
  { id: "stone", label: { fr: "Pierre naturelle", en: "Natural stone" }, swatch: "#bdb6a8", delta: 0 },
  { id: "concrete", label: { fr: "Béton ciré", en: "Polished concrete" }, swatch: "#8c8c88", delta: 1100 },
  { id: "wood", label: { fr: "Bois & noir mat", en: "Wood & matte black" }, swatch: "#3a2e22", delta: 2400 },
];

export const PRICE_PER_EXTRA_SQM = 1850;
export const GARAGE_PRICE = 18000;
export const TERRACE_PRICE = 9500;
