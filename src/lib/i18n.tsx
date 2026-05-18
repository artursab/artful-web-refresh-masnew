import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { messages, type Locale, type MessageKey } from "./messages";

type Ctx = { locale: Locale; setLocale: (l: Locale) => void; t: (k: MessageKey) => string };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("dorf-lang") as Locale | null) : null;
    if (stored === "fr" || stored === "en") setLocaleState(stored);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") localStorage.setItem("dorf-lang", l);
  };

  const t = (k: MessageKey) => messages[locale][k] ?? messages.fr[k] ?? k;
  return <I18nCtx.Provider value={{ locale, setLocale, t }}>{children}</I18nCtx.Provider>;
}

export function useT() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useT must be used inside I18nProvider");
  return ctx;
}
