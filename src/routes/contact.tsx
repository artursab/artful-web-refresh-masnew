import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dorf SIA" },
      { name: "description", content: "Contactez Dorf SIA — équipe France, Latvia et outre-mer. Devis personnalisé pour votre maison ossature bois." },
      { property: "og:title", content: "Contact — Dorf SIA" },
      { property: "og:description", content: "Contactez nos équipes en France, en Lettonie et aux Caraïbes." },
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

function Contact() {
  const { t } = useT();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const mailto = `mailto:info@envibois.fr?subject=${encodeURIComponent("Demande — " + (form.name || "site web"))}&body=${encodeURIComponent(form.message + "\n\n— " + form.name + " (" + form.email + ")")}`;

  return (
    <div className="py-24">
      <div className="max-w-screen-xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <div>
          <h1 className="font-serif text-5xl md:text-6xl italic text-charcoal mb-6">
            {t("contact.title")}
          </h1>
          <p className="text-lg text-charcoal/70 mb-12 max-w-[40ch]">{t("contact.lead")}</p>

          <dl className="space-y-8">
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-charcoal/50 mb-2">Email</dt>
              <dd className="text-lg"><a href="mailto:info@envibois.fr" className="hover:text-oak transition-colors">info@envibois.fr</a></dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-charcoal/50 mb-2">Téléphone</dt>
              <dd className="text-lg space-y-1">
                <div><a href="tel:+33632763074" className="hover:text-oak">+33 6 32 76 30 74</a> <span className="text-charcoal/40 text-sm">France</span></div>
                <div><a href="tel:+37126895717" className="hover:text-oak">+371 26 89 57 17</a> <span className="text-charcoal/40 text-sm">Lettonie</span></div>
                <div><a href="tel:+33970406464" className="hover:text-oak">09 70 40 64 64</a> <span className="text-charcoal/40 text-sm">Agence</span></div>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-charcoal/50 mb-2">Siège social</dt>
              <dd className="text-lg">Dorf SIA<br />Višķu iela 15A<br />LV-5410 Daugavpils, Latvia</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-charcoal/50 mb-2">Horaires</dt>
              <dd className="text-lg">Lundi — Vendredi, 9h — 18h</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-charcoal/50 mb-2">N° d'enregistrement</dt>
              <dd className="text-lg">LV 415 030 38 694</dd>
            </div>
          </dl>
        </div>

        <aside className="bg-charcoal text-cream p-10 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-oak text-xs uppercase tracking-[0.2em] font-medium">Devis rapide</span>
            <p className="font-serif text-3xl italic mt-4 mb-6">Écrivez-nous votre projet.</p>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = mailto; }}>
              <input
                required
                placeholder="Votre nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border-b border-cream/30 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-oak"
              />
              <input
                required
                type="email"
                placeholder="Votre email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border-b border-cream/30 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-oak"
              />
              <textarea
                required
                rows={4}
                placeholder="Parlez-nous de votre projet…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border-b border-cream/30 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-oak resize-none"
              />
              <button type="submit" className="mt-4 inline-flex bg-cream text-charcoal px-6 py-3 rounded-full text-sm font-medium hover:bg-oak transition-colors">
                Envoyer la demande
              </button>
            </form>
          </div>
          <Link
            to="/configurateur"
            className="mt-10 text-cream/70 text-sm hover:text-oak inline-flex"
          >
            Préférez utiliser le configurateur →
          </Link>
        </aside>
      </div>

      {/* Regional team */}
      <section className="max-w-screen-xl mx-auto px-6 mt-32">
        <span className="text-oak text-xs font-medium uppercase tracking-[0.2em]">Notre équipe</span>
        <h2 className="font-serif text-4xl md:text-5xl italic text-charcoal mt-4 mb-12">Un contact par région.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TEAM.map((p) => (
            <div key={p.name} className="border border-charcoal/10 rounded-2xl p-8 hover:border-oak transition-colors">
              <span className="text-[10px] uppercase tracking-widest text-oak">{p.role}</span>
              <h3 className="font-serif text-2xl italic mt-3 mb-2">{p.name}</h3>
              <p className="text-sm text-charcoal/60 mb-6">{p.area}</p>
              <a href={`tel:${p.tel}`} className="text-charcoal font-medium border-b border-charcoal/20 pb-1 hover:border-oak">{p.phone}</a>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="max-w-screen-xl mx-auto px-6 mt-24">
        <span className="text-oak text-xs font-medium uppercase tracking-[0.2em]">Nous trouver</span>
        <h2 className="font-serif text-4xl italic text-charcoal mt-4 mb-8">Atelier de Daugavpils.</h2>
        <div className="rounded-2xl overflow-hidden ring-1 ring-charcoal/10 aspect-[16/9]">
          <iframe
            title="Dorf SIA — Daugavpils"
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
