import atelier from "@/assets/model-atelier.jpg";
import sequoia from "@/assets/model-sequoia.jpg";
import horizon from "@/assets/model-horizon.jpg";
import alpin from "@/assets/model-alpin.jpg";
const atelierPine = atelier, atelierLarch = atelier, atelierCharred = atelier, atelierMixed = atelier;
const sequoiaPine = sequoia, sequoiaLarch = sequoia, sequoiaCharred = sequoia, sequoiaMixed = sequoia;
const horizonPine = horizon, horizonLarch = horizon, horizonCharred = horizon, horizonMixed = horizon;
const alpinPine = alpin, alpinLarch = alpin, alpinCharred = alpin, alpinMixed = alpin;

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
    slug: "atelier",
    name: "L'Atelier",
    tagline: { fr: "Studio compact, plain-pied", en: "Compact single-story studio" },
    description: {
      fr: "Idéal pour studio, bureau ou retraite d'artiste. Volumes essentiels, lumière naturelle.",
      en: "Ideal for a studio, home office or artist's retreat. Essential volumes, natural light.",
    },
    basePrice: 95000,
    baseSurface: 45,
    defaultBedrooms: 1,
    image: atelier,
    claddingImages: {
      pine: atelierPine,
      larch: atelierLarch,
      charred: atelierCharred,
      mixed: atelierMixed,
    },
  },
  {
    slug: "sequoia",
    name: "Séquoia",
    tagline: { fr: "Maison familiale R+1", en: "Two-story family home" },
    description: {
      fr: "Maison familiale lumineuse et ouverte, pensée pour la vie en famille.",
      en: "A bright, open family home designed around modern family life.",
    },
    basePrice: 245000,
    baseSurface: 120,
    defaultBedrooms: 3,
    image: sequoia,
    claddingImages: {
      pine: sequoiaPine,
      larch: sequoiaLarch,
      charred: sequoiaCharred,
      mixed: sequoiaMixed,
    },
  },
  {
    slug: "horizon",
    name: "Horizon",
    tagline: { fr: "Plain-pied panoramique", en: "Panoramic single-story" },
    description: {
      fr: "Design plain-pied avec baies panoramiques pour s'ouvrir sur le paysage.",
      en: "Single-story design with panoramic bays opening to the landscape.",
    },
    basePrice: 215000,
    baseSurface: 95,
    defaultBedrooms: 2,
    image: horizon,
    claddingImages: {
      pine: horizonPine,
      larch: horizonLarch,
      charred: horizonCharred,
      mixed: horizonMixed,
    },
  },
  {
    slug: "alpin",
    name: "L'Alpin",
    tagline: { fr: "Chalet contemporain", en: "Contemporary chalet" },
    description: {
      fr: "Chalet contemporain pour la montagne, charpente apparente et grandes baies.",
      en: "Contemporary mountain chalet, exposed framework and large glazed openings.",
    },
    basePrice: 285000,
    baseSurface: 110,
    defaultBedrooms: 3,
    image: alpin,
    claddingImages: {
      pine: alpinPine,
      larch: alpinLarch,
      charred: alpinCharred,
      mixed: alpinMixed,
    },
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
