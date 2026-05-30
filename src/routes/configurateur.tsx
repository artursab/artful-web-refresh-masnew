import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, Link as LinkIcon, X } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";
import {
  BATHROOMS, CLADDINGS, FLOORS, KITCHENS, MODELS, ROOFS, WINDOWS,
  type Option,
} from "@/lib/models";
import { formatPrice, useConfigurator } from "@/lib/configurator-store";
import { CommercialProcess } from "@/components/CommercialProcess";
import { PriceDisclaimer } from "@/components/PriceDisclaimer";

type Search = {
  m?: string; s?: number; f?: number; b?: number; g?: number; t?: number;
  cl?: string; rf?: string; wn?: string; fl?: string; kt?: string; bt?: string;
};

export const Route = createFileRoute("/configurateur")({
  validateSearch: (s: Record<string, unknown>): Search => s as Search,
  head: () => ({
    meta: [
      { title: "Configurateur — Envibois" },
      {
        name: "description",
        content:
          "Configurez votre maison ossature bois Envibois en ligne : modèle, surface, finitions extérieures et intérieures, estimation immédiate.",
      },
      { property: "og:title", content: "Configurateur — Envibois" },
      { property: "og:description", content: "Composez votre maison et obtenez une estimation immédiate." },
      { property: "og:url", content: "/configurateur" },
    ],
    links: [{ rel: "canonical", href: "/configurateur" }],
  }),
  component: Configurator,
});

function Configurator() {
  const { t, locale } = useT();
  const search = Route.useSearch();
  const state = useConfigurator();
  const [quoteOpen, setQuoteOpen] = useState(false);

  // hydrate from URL once
  useEffect(() => {
    const q = new URLSearchParams();
    Object.entries(search ?? {}).forEach(([k, v]) => v != null && q.set(k, String(v)));
    if ([...q.keys()].length) state.hydrateFromQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = state.total();
  const model = MODELS.find((m) => m.slug === state.modelSlug) ?? MODELS[0];
  const selectedImage = model.claddingImages[state.cladding] ?? model.image;

  const copyShare = async () => {
    const url = `${window.location.origin}/configurateur?${state.toQueryString()}`;
    await navigator.clipboard.writeText(url);
    toast.success(t("config.shared"));
  };

  return (
    <div className="bg-charcoal text-cream min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <header className="mb-12 max-w-[40ch]">
          <span className="text-oak font-medium uppercase tracking-widest text-xs">
            {t("nav.configurator")}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl mt-4 italic leading-tight">
            {t("config.title")}
          </h1>
          <p className="mt-4 text-cream/70">{t("config.lead")}</p>
        </header>

        <div className="grid lg:grid-cols-[320px_1fr_340px] gap-8 items-start">
          {/* LEFT — options */}
          <div className="space-y-10">
            {/* Model */}
            <Group label={t("config.step.model")}>
              <div className="space-y-2">
                {MODELS.map((m) => (
                  <button
                    key={m.slug}
                    onClick={() => state.setModel(m.slug)}
                    className={`w-full text-left p-4 rounded-lg text-sm flex justify-between items-center transition-colors ${
                      state.modelSlug === m.slug
                        ? "bg-cream/10 ring-1 ring-cream/15"
                        : "hover:bg-cream/5 text-cream/70"
                    }`}
                  >
                    <span>{m.name}</span>
                    {state.modelSlug === m.slug && <span className="size-1.5 rounded-full bg-oak" />}
                  </button>
                ))}
              </div>
            </Group>

            {/* Size */}
            <Group label={t("config.step.size")}>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs text-cream/60 mb-2">
                    <span>{t("config.surface")}</span>
                    <span className="text-cream font-medium">{state.surface} m²</span>
                  </div>
                  <input
                    type="range" min={45} max={250} step={5}
                    value={state.surface}
                    onChange={(e) => state.set("surface", Number(e.target.value))}
                    className="w-full accent-oak h-1 bg-cream/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-1 text-[10px] text-cream/40">
                    <span>45 m²</span><span>250 m²</span>
                  </div>
                </div>

                <SegRow
                  label={t("config.floors")}
                  value={state.floors}
                  options={[{ v: 1, l: "1" }, { v: 2, l: "2" }]}
                  onChange={(v) => state.set("floors", v as 1 | 2)}
                />

                <div>
                  <div className="flex justify-between text-xs text-cream/60 mb-3">
                    <span>{t("config.bedrooms")}</span>
                    <span className="text-cream font-medium">{state.bedrooms}</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => state.set("bedrooms", n)}
                        className={`flex-1 py-2 rounded-md text-sm transition-colors ${
                          state.bedrooms === n
                            ? "bg-oak text-charcoal"
                            : "bg-cream/5 text-cream/60 hover:bg-cream/10"
                        }`}
                      >{n}</button>
                    ))}
                  </div>
                </div>

                <SegRow
                  label={t("config.garage")}
                  value={state.garage ? 1 : 0}
                  options={[{ v: 0, l: t("config.no") }, { v: 1, l: t("config.yes") }]}
                  onChange={(v) => state.set("garage", v === 1)}
                />
                <SegRow
                  label={t("config.terrace")}
                  value={state.terrace ? 1 : 0}
                  options={[{ v: 0, l: t("config.no") }, { v: 1, l: t("config.yes") }]}
                  onChange={(v) => state.set("terrace", v === 1)}
                />
              </div>
            </Group>

            {/* Exterior */}
            <Group label={t("config.step.exterior")}>
              <SwatchRow
                label={t("config.cladding")} options={CLADDINGS}
                value={state.cladding} onChange={(v) => state.set("cladding", v)} locale={locale}
              />
              <SwatchRow
                label={t("config.roof")} options={ROOFS}
                value={state.roof} onChange={(v) => state.set("roof", v)} locale={locale}
              />
              <SwatchRow
                label={t("config.window")} options={WINDOWS}
                value={state.window} onChange={(v) => state.set("window", v)} locale={locale}
              />
            </Group>

            {/* Interior */}
            <Group label={t("config.step.interior")}>
              <SwatchRow
                label={t("config.floor")} options={FLOORS}
                value={state.floor} onChange={(v) => state.set("floor", v)} locale={locale}
              />
              <SwatchRow
                label={t("config.kitchen")} options={KITCHENS}
                value={state.kitchen} onChange={(v) => state.set("kitchen", v)} locale={locale}
              />
              <SwatchRow
                label={t("config.bathroom")} options={BATHROOMS}
                value={state.bathroom} onChange={(v) => state.set("bathroom", v)} locale={locale}
              />
            </Group>
          </div>

          {/* CENTER — viewer */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] bg-cream/5 rounded-2xl overflow-hidden ring-1 ring-cream/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${model.slug}-${state.cladding}`}
                  src={selectedImage}
                  alt={`${model.name} — ${swatchLabel(CLADDINGS, state.cladding, locale)}`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              <div
                className="absolute inset-x-0 top-0 h-24 pointer-events-none transition-colors duration-500"
                style={{ background: `linear-gradient(to bottom, ${ROOFS.find((r) => r.id === state.roof)?.swatch ?? "#3a3a3a"}55, transparent)` }}
              />

              <div className="absolute top-4 left-4 bg-charcoal/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-cream">
                {model.name}
              </div>
            </div>

            <button
              onClick={copyShare}
              className="w-full text-xs text-cream/60 hover:text-cream flex items-center justify-center gap-2 py-2 transition-colors"
            >
              <LinkIcon size={12} /> {t("config.share")}
            </button>
          </div>

          {/* RIGHT — summary */}
          <aside className="bg-cream text-charcoal p-7 rounded-2xl ring-1 ring-black/5 lg:sticky lg:top-24">
            <h3 className="text-xs font-medium uppercase tracking-widest mb-5 opacity-50">
              {t("config.summary")}
            </h3>

            <ul className="space-y-3 pb-5 border-b border-charcoal/10 text-sm">
              <Row label={t("config.base")} value={`${model.name}`} />
              <Row label={t("config.surface")} value={`${state.surface} m²`} />
              <Row label={t("config.bedrooms")} value={String(state.bedrooms)} />
              <Row label={t("config.cladding")} value={swatchLabel(CLADDINGS, state.cladding, locale)} />
              <Row label={t("config.roof")} value={swatchLabel(ROOFS, state.roof, locale)} />
              <Row label={t("config.floor")} value={swatchLabel(FLOORS, state.floor, locale)} />
              <Row label={t("config.kitchen")} value={swatchLabel(KITCHENS, state.kitchen, locale)} />
            </ul>

            <div className="py-6">
              <div className="text-[10px] uppercase tracking-widest opacity-50 mb-1">
                {t("config.total")}
              </div>
              <div className="font-serif text-4xl">{formatPrice(total, locale)}</div>
            </div>

            <Link
              to="/contact"
              search={{
                model: state.modelSlug,
                surface: state.surface,
                config: state.toQueryString(),
                estimate: total,
              }}
              className="w-full bg-charcoal text-cream flex items-center justify-between pl-5 pr-2 py-2.5 rounded-full text-sm font-medium hover:bg-moss transition-colors"
            >
              <span>{t("config.quote")}</span>
              <span className="size-7 flex items-center justify-center bg-cream/15 rounded-full">
                <ArrowUpRight size={14} />
              </span>
            </Link>

            <button
              onClick={() => setQuoteOpen(true)}
              className="mt-3 w-full border border-charcoal/15 text-charcoal/70 py-2 rounded-full text-xs font-medium hover:border-charcoal/40 hover:text-charcoal transition-colors"
            >
              {locale === "fr" ? "Envoi rapide par email" : "Quick email send"}
            </button>

            <div className="mt-5">
              <PriceDisclaimer variant="compact" />
            </div>

            <Link to="/catalogue" className="mt-6 block text-xs text-charcoal/50 hover:text-oak transition-colors text-center">
              ← {t("models.back")}
            </Link>
          </aside>
        </div>
      </div>

      {/* Process section near configurator */}
      <div className="bg-bone text-charcoal">
        <CommercialProcess variant="compact" showCta={false} showDisclaimer={false} />
      </div>

      <QuoteDialog open={quoteOpen} onClose={() => setQuoteOpen(false)} total={total} />
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[10px] uppercase tracking-widest text-cream/40 mb-4 pb-3 border-b border-cream/10">
        {label}
      </h3>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function SegRow({
  label, value, options, onChange,
}: { label: string; value: number; options: { v: number; l: string }[]; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="text-xs text-cream/60 mb-2">{label}</div>
      <div className="flex gap-2">
        {options.map((o) => (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            className={`flex-1 py-2 rounded-md text-sm transition-colors ${
              value === o.v ? "bg-oak text-charcoal" : "bg-cream/5 text-cream/60 hover:bg-cream/10"
            }`}
          >{o.l}</button>
        ))}
      </div>
    </div>
  );
}

function SwatchRow({
  label, options, value, onChange, locale,
}: { label: string; options: Option[]; value: string; onChange: (v: string) => void; locale: "fr" | "en" }) {
  const current = options.find((o) => o.id === value);
  return (
    <div>
      <div className="flex justify-between text-xs text-cream/60 mb-3">
        <span>{label}</span>
        <span className="text-cream/80 italic font-serif">{current?.label[locale]}</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              onClick={() => onChange(o.id)}
              aria-label={o.label[locale]}
              title={o.label[locale]}
              className={`size-9 rounded-full transition-all ${
                active
                  ? "ring-2 ring-oak ring-offset-2 ring-offset-charcoal"
                  : "ring-1 ring-cream/15 hover:ring-cream/40"
              }`}
              style={{ backgroundColor: o.swatch }}
            />
          );
        })}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between gap-3">
      <span className="text-charcoal/60">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </li>
  );
}

const swatchLabel = (list: Option[], id: string, locale: "fr" | "en") =>
  list.find((o) => o.id === id)?.label[locale] ?? "—";

// ---- Quote dialog ----
const quoteSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(30),
  postal: z.string().trim().min(3).max(15),
  message: z.string().trim().max(1000).optional(),
  honey: z.string().max(0).optional(),
});

function QuoteDialog({ open, onClose, total }: { open: boolean; onClose: () => void; total: number }) {
  const { t, locale } = useT();
  const state = useConfigurator();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = quoteSchema.safeParse({
      name: fd.get("name"), email: fd.get("email"), phone: fd.get("phone"),
      postal: fd.get("postal"), message: fd.get("message") ?? "", honey: fd.get("honey") ?? "",
    });
    if (!parsed.success) {
      toast.error(t("quote.error"));
      return;
    }
    setSending(true);
    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
      if (!accessKey) throw new Error("Web3Forms access key not configured");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Envibois] Nouvelle demande de devis — ${parsed.data.name}`,
          from_name: "Envibois Configurateur",
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          postal: parsed.data.postal,
          message: parsed.data.message || "(aucun)",
          estimation_eur: total,
          configuration: state.toQueryString(),
          locale,
          botcheck: parsed.data.honey ?? "",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error("send failed");
      setDone(true);
      toast.success(t("quote.success"));
    } catch {
      toast.error(t("quote.error"));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-cream text-charcoal w-full max-w-lg rounded-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-charcoal/50 hover:text-charcoal"
          aria-label="Fermer"
        ><X size={20} /></button>

        {done ? (
          <div className="py-10 text-center">
            <div className="size-12 mx-auto rounded-full bg-moss text-cream flex items-center justify-center mb-5">
              <Check size={22} />
            </div>
            <h3 className="font-serif text-3xl italic mb-3">{t("quote.success")}</h3>
            <p className="text-sm text-charcoal/60">{t("config.disclaimer")}</p>
          </div>
        ) : (
          <>
            <h3 className="font-serif text-3xl italic mb-2">{t("quote.title")}</h3>
            <p className="text-sm text-charcoal/60 mb-6">{t("quote.lead")}</p>

            <div className="bg-charcoal/5 rounded-lg p-4 mb-5 text-sm flex justify-between items-center">
              <span className="text-charcoal/60">{t("config.total")}</span>
              <span className="font-serif text-xl">{formatPrice(total, locale)}</span>
            </div>

            <form onSubmit={submit} className="space-y-3">
              <Field name="name" label={t("quote.name")} required />
              <div className="grid grid-cols-2 gap-3">
                <Field name="email" type="email" label={t("quote.email")} required />
                <Field name="phone" label={t("quote.phone")} required />
              </div>
              <Field name="postal" label={t("quote.postal")} required />
              <Field name="message" label={t("quote.message")} as="textarea" />
              <input type="text" name="honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-charcoal text-cream py-3 rounded-full text-sm font-medium hover:bg-moss transition-colors disabled:opacity-60"
              >
                {sending ? t("quote.sending") : t("quote.submit")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  name, label, type = "text", as, required,
}: { name: string; label: string; type?: string; as?: "textarea"; required?: boolean }) {
  const cls = "w-full px-3 py-2.5 rounded-md bg-white border border-charcoal/10 text-sm focus:outline-none focus:border-oak focus:ring-1 focus:ring-oak transition-colors";
  return (
    <label className="block">
      <span className="text-xs text-charcoal/60 mb-1 block">{label}{required && " *"}</span>
      {as === "textarea" ? (
        <textarea name={name} rows={3} className={cls} maxLength={1000} />
      ) : (
        <input name={name} type={type} required={required} className={cls} maxLength={255} />
      )}
    </label>
  );
}
