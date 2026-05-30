import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export function Footer() {
  const { t, locale } = useT();

  return (
    <>
      {/* Dark CTA band */}
      <section className="py-28 md:py-40 bg-ink text-bone text-center">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold mb-8">
            — {locale === "fr" ? "Commencer" : "Begin"}
          </p>
          <h2 className="font-serif text-5xl md:text-7xl italic leading-[1.05] mb-10">
            {locale === "fr"
              ? "Dessinez la maison que vous ne voudrez plus quitter."
              : "Design the house you'll never want to leave."}
          </h2>
          <p className="text-bone/60 max-w-xl mx-auto mb-12 leading-relaxed">
            {locale === "fr"
              ? "Parcourez le catalogue, explorez nos modèles, ou parlez-nous directement de votre projet."
              : "Browse the catalogue, explore our models, or tell us directly about your project."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/configurateur"
              className="px-8 py-4 bg-gold text-ink text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-bone transition-colors"
            >
              {locale === "fr" ? "Demander un devis" : "Request a quote"}
            </Link>
            <Link
              to="/catalogue"
              className="px-8 py-4 border border-bone/30 text-bone text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-bone hover:text-ink transition-colors"
            >
              {t("home.cta.models")}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-bone/70 border-t border-bone/10 py-20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 max-w-[34ch]">
            <span className="font-serif text-3xl block italic text-bone mb-4">Envibois</span>
            <p className="text-sm text-bone/55 leading-relaxed">{t("footer.tagline")}</p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-bone/35">
              {t("footer.nav")}
            </span>
            <ul className="text-sm space-y-2.5">
              <li><Link to="/catalogue" className="hover:text-gold transition-colors">{locale === "fr" ? "Catalogue" : "Catalogue"}</Link></li>
              <li><Link to="/configurateur" className="hover:text-gold transition-colors">{t("nav.configurator")}</Link></li>
              <li><Link to="/savoir-faire" className="hover:text-gold transition-colors">{t("nav.savoir")}</Link></li>
              <li><Link to="/realisations" className="hover:text-gold transition-colors">{t("nav.projects")}</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-bone/35">
              {t("footer.contact")}
            </span>
            <ul className="text-sm space-y-2 text-bone/75">
              <li><a href="mailto:info@envibois.fr" className="hover:text-gold transition-colors">info@envibois.fr</a></li>
              <li><a href="tel:+33632763074" className="hover:text-gold transition-colors">+33 6 32 76 30 74</a> <span className="text-bone/35">(FR)</span></li>
              <li><a href="tel:+37126895717" className="hover:text-gold transition-colors">+371 26 89 57 17</a> <span className="text-bone/35">(LV)</span></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-bone/35">
              {locale === "fr" ? "Siège" : "Office"}
            </span>
            <p className="text-sm text-bone/65 leading-relaxed">
              Envibois<br />Višķu iela 15A<br />LV-5410 Daugavpils<br />Latvia
            </p>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 pt-12 mt-12 border-t border-bone/10 text-xs text-bone/45 flex flex-wrap gap-x-6 gap-y-2 items-center">
          <span>© {new Date().getFullYear()} Envibois — Reg. LV 415 030 38 694</span>
          <span className="grow" />
          <Link to="/mentions-legales" className="hover:text-gold">{locale === "fr" ? "Mentions légales" : "Legal notice"}</Link>
          <Link to="/cgv" className="hover:text-gold">CGV</Link>
          <Link to="/rgpd" className="hover:text-gold">RGPD</Link>
          <Link to="/cookies" className="hover:text-gold">Cookies</Link>
        </div>
      </footer>
    </>
  );
}
