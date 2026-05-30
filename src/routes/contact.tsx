import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";
import { MODELS } from "@/lib/models";
import { PriceDisclaimer } from "@/components/PriceDisclaimer";
import { formatPrice } from "@/lib/configurator-store";

type ContactSearch = {
  model?: string;
  surface?: number;
  config?: string;
  estimate?: number;
};

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): ContactSearch => ({
    model: typeof s.model === "string" ? s.model : undefined,
    surface: s.surface != null ? Number(s.surface) || undefined : undefined,
    config: typeof s.config === "string" ? s.config : undefined,
    estimate: s.estimate != null ? Number(s.estimate) || undefined : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact & demande de devis — Envibois" },
      { name: "description", content: "Contactez Envibois pour un devis personnalisé. Étude gratuite, réponse sous 48h. Équipe France, Lettonie et outre-mer." },
      { property: "og:title", content: "Contact — Envibois" },
      { property: "og:description", content: "Étude gratuite, sans engagement, réponse sous 48h." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const TEAM = [
  { name: "Julien Dicharry", role: "Direction", phone: "+33 6 32 76 30 74", tel: "+33632763074", area: "Landes & Pyrénées-Atlantiques" },
  { name: "Gérard Bruneau", role: "Commercial", phone: "+33 6 12 15 43 37", tel: "+33612154337", area: "Landes & Pyrénées-Atlantiques" },
  { name: "Fred Mobetie", role: "Outre-mer", phone: "+590 690 062 555", tel: "+590690062555", area: "Caraïbes & DOM-TOM" },
];

const BUDGETS_FR = ["Moins de 80 000 €", "80 000 – 150 000 €", "150 000 – 250 000 €", "250 000 – 400 000 €", "Plus de 400 000 €", "À définir"];
const BUDGETS_EN = ["Under €80,000", "€80,000 – 150,000", "€150,000 – 250,000", "€250,000 – 400,000", "Over €400,000", "To be defined"];

function Contact() {
  const { locale } = useT();
  const isFr = locale === "fr";
  const search = Route.useSearch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    model: "",
    options: "",
    surface: "",
    budget: "",
    timeline: "",
    message: "",
  });

  // Pre-fill from configurator handoff
  useEffect(() => {
    setForm((f) => ({
      ...f,
      model: search.model ?? f.model,
      surface: search.surface ? String(search.surface) : f.surface,
      options: search.config ? decodeURIComponent(search.config) : f.options,
      message:
        search.estimate && !f.message
          ? (isFr
              ? `Estimation issue du configurateur : ${formatPrice(search.estimate, "fr")}.\n\n`
              : `Estimate from the configurator: ${formatPrice(search.estimate, "en")}.\n\n`)
          : f.message,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const modelName = MODELS.find((m) => m.slug === form.model)?.name ?? form.model ?? "—";
    const subject = `Demande de devis — ${form.name || (isFr ? "site web" : "website")}`;
    const lines = [
      `Nom: ${form.name}`,
      `Email: ${form.email}`,
      `Téléphone: ${form.phone}`,
      `Localisation du projet: ${form.location}`,
      `Modèle sélectionné: ${modelName}`,
      `Surface souhaitée: ${form.surface} m²`,
      `Options / configuration: ${form.options}`,
      `Budget: ${form.budget}`,
      `Horizon: ${form.timeline}`,
      ``,
      `Message:`,
      form.message,
    ].join("\n");
    window.location.href = `mailto:info@envibois.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
  };

  const field =
    "w-full bg-transparent border-b border-charcoal/20 py-3.5 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold transition-colors";

  return (
    <div className="pt-32 md:pt-40 pb-20 md:pb-28">
      {/* Header */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 mb-16 md:mb-20">
        <header className="max-w-[52ch]">
          <p className="eyebrow mb-6">— {isFr ? "Contact & devis" : "Contact & quote"}</p>
          <h1 className="font-serif text-5xl md:text-7xl italic text-charcoal leading-[1.02] mb-6">
            {isFr ? "Parlez-nous de votre projet." : "Tell us about your project."}
          </h1>
          <p className="text-lg text-charcoal/65 leading-relaxed">
            {isFr
              ? "Étude gratuite, sans engagement. Notre équipe revient vers vous sous 48 heures ouvrées avec une première estimation."
              : "Free study, no commitment. Our team comes back within 48 working hours with a first estimate."}
          </p>
        </header>
      </div>

      {/* Form + contact info */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-16 mb-24 md:mb-32">
        {/* Form */}
        <form onSubmit={onSubmit} className="lg:col-span-7 space-y-8">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            <input required placeholder={isFr ? "Nom complet *" : "Full name *"} value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} maxLength={100} />
            <input required type="email" placeholder="Email *" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} maxLength={150} />
            <input placeholder={isFr ? "Téléphone" : "Phone"} value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} maxLength={30} />
            <input
              placeholder={isFr ? "Localisation du projet (ville, CP, pays)" : "Project location (city, ZIP, country)"}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className={field}
              maxLength={150}
            />

            <select
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className={`${field} appearance-none`}
            >
              <option value="">{isFr ? "Modèle sélectionné" : "Selected model"}</option>
              {MODELS.map((m) => (
                <option key={m.slug} value={m.slug}>{m.name}</option>
              ))}
              <option value="custom">{isFr ? "Sur-mesure / je ne sais pas encore" : "Custom / not sure yet"}</option>
            </select>

            <input
              placeholder={isFr ? "Surface souhaitée (m²)" : "Desired surface (sqm)"}
              value={form.surface}
              onChange={(e) => setForm({ ...form, surface: e.target.value })}
              className={field}
              maxLength={10}
            />

            <select
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className={`${field} appearance-none`}
            >
              <option value="">{isFr ? "Fourchette de budget" : "Budget range"}</option>
              {(isFr ? BUDGETS_FR : BUDGETS_EN).map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            <select
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              className={`${field} appearance-none`}
            >
              <option value="">{isFr ? "Horizon du projet" : "Project horizon"}</option>
              <option>{isFr ? "Moins de 6 mois" : "Less than 6 months"}</option>
              <option>{isFr ? "6 à 12 mois" : "6 to 12 months"}</option>
              <option>{isFr ? "12 à 24 mois" : "12 to 24 months"}</option>
              <option>{isFr ? "Plus de 24 mois" : "Over 24 months"}</option>
            </select>
          </div>

          <textarea
            rows={3}
            placeholder={isFr ? "Options / configuration (bardage, toiture, finitions…)" : "Options / configuration (cladding, roof, finishes…)"}
            value={form.options}
            onChange={(e) => setForm({ ...form, options: e.target.value })}
            className={`${field} resize-none`}
            maxLength={1000}
          />

          <textarea rows={6}
            placeholder={isFr ? "Décrivez votre projet (terrain, style, contraintes…)" : "Describe your project (land, style, constraints…)"}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${field} resize-none`} maxLength={2000} />

          <PriceDisclaimer />

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-xs text-charcoal/50 max-w-[40ch] leading-relaxed">
              {isFr
                ? "Vos données sont utilisées uniquement pour traiter votre demande. Voir notre politique RGPD."
                : "Your data is used solely to handle your request. See our GDPR policy."}
            </p>
            <button type="submit" className="bg-charcoal text-bone px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-ink transition-colors">
              {isFr ? "Envoyer ma demande" : "Send my request"}
            </button>
          </div>
        </form>

        {/* Contact info */}
        <aside className="lg:col-span-4 lg:col-start-9">
          <p className="eyebrow mb-6">— {isFr ? "Coordonnées" : "Get in touch"}</p>
          <dl className="space-y-8">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-charcoal/45 mb-2">Email</dt>
              <dd className="font-serif text-2xl italic"><a href="mailto:info@envibois.fr" className="hover:text-gold transition-colors">info@envibois.fr</a></dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-charcoal/45 mb-2">{isFr ? "Téléphone" : "Phone"}</dt>
              <dd className="space-y-1.5 text-lg">
                <div><a href="tel:+33632763074" className="hover:text-gold">+33 6 32 76 30 74</a> <span className="text-charcoal/40 text-sm">FR</span></div>
                <div><a href="tel:+37126895717" className="hover:text-gold">+371 26 89 57 17</a> <span className="text-charcoal/40 text-sm">LV</span></div>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-charcoal/45 mb-2">{isFr ? "Atelier" : "Workshop"}</dt>
              <dd className="text-base text-charcoal/75 leading-relaxed">Envibois<br />Višķu iela 15A<br />LV-5410 Daugavpils, Latvia</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.22em] text-charcoal/45 mb-2">{isFr ? "Horaires" : "Hours"}</dt>
              <dd className="text-base text-charcoal/75">{isFr ? "Lundi — Vendredi · 9h — 18h" : "Mon — Fri · 9am — 6pm"}</dd>
            </div>
          </dl>
        </aside>
      </div>

      {/* Regional team */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-10 mb-24">
        <p className="eyebrow mb-4">— {isFr ? "Notre équipe" : "Our team"}</p>
        <h2 className="font-serif text-4xl md:text-5xl italic text-charcoal mb-12 leading-tight">
          {isFr ? "Un contact par région." : "One contact per region."}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TEAM.map((p) => (
            <div key={p.name} className="border border-charcoal/10 p-8 md:p-10 hover:border-gold transition-colors">
              <span className="text-[10px] uppercase tracking-[0.22em] text-gold">{p.role}</span>
              <h3 className="font-serif text-2xl italic mt-3 mb-2 text-charcoal">{p.name}</h3>
              <p className="text-sm text-charcoal/60 mb-6">{p.area}</p>
              <a href={`tel:${p.tel}`} className="text-charcoal font-medium border-b border-charcoal/20 pb-1 hover:border-gold">{p.phone}</a>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-10">
        <p className="eyebrow mb-4">— {isFr ? "Nous trouver" : "Find us"}</p>
        <h2 className="font-serif text-3xl md:text-4xl italic text-charcoal mb-8">
          {isFr ? "Atelier de Daugavpils." : "Daugavpils workshop."}
        </h2>
        <div className="overflow-hidden aspect-[16/9]">
          <iframe
            title="Envibois — Daugavpils"
            src="https://www.google.com/maps?q=Vi%C5%A1%C4%B7u%20iela%2015A%2C%20Daugavpils%2C%20Latvia&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
