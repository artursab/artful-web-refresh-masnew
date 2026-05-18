import { create } from "zustand";
import {
  BATHROOMS,
  CLADDINGS,
  FLOORS,
  GARAGE_PRICE,
  KITCHENS,
  MODELS,
  PRICE_PER_EXTRA_SQM,
  ROOFS,
  TERRACE_PRICE,
  WINDOWS,
  getModel,
} from "./models";

export type ConfigState = {
  modelSlug: string;
  surface: number;
  floors: 1 | 2;
  bedrooms: number;
  garage: boolean;
  terrace: boolean;
  cladding: string;
  roof: string;
  window: string;
  floor: string;
  kitchen: string;
  bathroom: string;
};

type ConfigStore = ConfigState & {
  set: <K extends keyof ConfigState>(key: K, value: ConfigState[K]) => void;
  setModel: (slug: string) => void;
  total: () => number;
  hydrateFromQuery: (query: URLSearchParams) => void;
  toQueryString: () => string;
};

const initial = (slug = "sequoia"): ConfigState => {
  const m = getModel(slug) ?? MODELS[0];
  return {
    modelSlug: m.slug,
    surface: m.baseSurface,
    floors: 1,
    bedrooms: m.defaultBedrooms,
    garage: false,
    terrace: true,
    cladding: CLADDINGS[0].id,
    roof: ROOFS[0].id,
    window: WINDOWS[0].id,
    floor: FLOORS[0].id,
    kitchen: KITCHENS[0].id,
    bathroom: BATHROOMS[0].id,
  };
};

const optDelta = (list: { id: string; delta: number }[], id: string) =>
  list.find((o) => o.id === id)?.delta ?? 0;

export const useConfigurator = create<ConfigStore>((set, get) => ({
  ...initial(),

  set: (key, value) => set({ [key]: value } as Partial<ConfigState>),

  setModel: (slug) => {
    const m = getModel(slug);
    if (!m) return;
    const s = get();
    set({
      modelSlug: slug,
      surface: Math.max(m.baseSurface, s.surface),
      bedrooms: m.defaultBedrooms,
    });
  },

  total: () => {
    const s = get();
    const m = getModel(s.modelSlug) ?? MODELS[0];
    const extraSqm = Math.max(0, s.surface - m.baseSurface);
    return (
      m.basePrice +
      extraSqm * PRICE_PER_EXTRA_SQM +
      (s.garage ? GARAGE_PRICE : 0) +
      (s.terrace ? TERRACE_PRICE : 0) +
      optDelta(CLADDINGS, s.cladding) +
      optDelta(ROOFS, s.roof) +
      optDelta(WINDOWS, s.window) +
      optDelta(FLOORS, s.floor) +
      optDelta(KITCHENS, s.kitchen) +
      optDelta(BATHROOMS, s.bathroom)
    );
  },

  hydrateFromQuery: (q) => {
    const patch: Partial<ConfigState> = {};
    const m = q.get("m");
    if (m && getModel(m)) patch.modelSlug = m;
    const surface = q.get("s");
    if (surface) patch.surface = Math.max(40, Math.min(300, Number(surface) || 0));
    const floors = q.get("f");
    if (floors === "1" || floors === "2") patch.floors = Number(floors) as 1 | 2;
    const beds = q.get("b");
    if (beds) patch.bedrooms = Math.max(1, Math.min(6, Number(beds) || 1));
    if (q.get("g") === "1") patch.garage = true;
    if (q.get("t") === "0") patch.terrace = false;
    const map: Array<[string, keyof ConfigState, { id: string }[]]> = [
      ["cl", "cladding", CLADDINGS],
      ["rf", "roof", ROOFS],
      ["wn", "window", WINDOWS],
      ["fl", "floor", FLOORS],
      ["kt", "kitchen", KITCHENS],
      ["bt", "bathroom", BATHROOMS],
    ];
    for (const [key, field, list] of map) {
      const v = q.get(key);
      if (v && list.find((o) => o.id === v)) (patch as Record<string, unknown>)[field] = v;
    }
    if (Object.keys(patch).length) set(patch);
  },

  toQueryString: () => {
    const s = get();
    const p = new URLSearchParams({
      m: s.modelSlug,
      s: String(s.surface),
      f: String(s.floors),
      b: String(s.bedrooms),
      g: s.garage ? "1" : "0",
      t: s.terrace ? "1" : "0",
      cl: s.cladding,
      rf: s.roof,
      wn: s.window,
      fl: s.floor,
      kt: s.kitchen,
      bt: s.bathroom,
    });
    return p.toString();
  },
}));

export const formatPrice = (n: number, locale: "fr" | "en" = "fr") =>
  new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
