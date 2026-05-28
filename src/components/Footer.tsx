import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export function Footer() {
  const { t, locale } = useT();

  return (
    <>
      {/* Dark CTA band */}
      <section className="py-28 md:py-36 bg-charcoal text-cream text-center">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-oak mb-6">
            — {locale === "fr" ? "Commencer" : "Begin"}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl italic mb-8">
            {locale === "fr"
              ? "Dessinez la maison que vous ne voudrez plus quitter."
              : "Design the house you'll never want to leave."}
          </h2>
          <p className="text-cream/70 max-w-xl mx-auto mb-12 leading-relaxed">
            {locale === "fr"
              ? "Utilisez notre configurateur pour façonner votre modèle, votre bardage et votre surface — ou parcourez la collection complète."
              : "Use our configurator to shape your model, cladding and footprint — or browse the full collection."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/configurateur"
              className="px-8 py-4 bg-oak text-charcoal text-xs font-medium uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
            >
              {t("nav.configurator")}
            </Link>
            <Link
              to="/maisons"
              className="px-8 py-4 border border-cream/30 text-cream text-xs font-medium uppercase tracking-[0.2em] hover:bg-cream hover:text-charcoal transition-colors"
            >
              {t("home.cta.models")}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-cream/80 border-t border-cream/10 py-16">
        <div className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="max-w-[32ch]">
            <span className="font-serif text-3xl block italic text-cream mb-4">Envibois</span>
            <p className="text-sm text-cream/60 leading-relaxed">{t("footer.tagline")}</p>
          </div>
          <div className="space-y-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-cream/40">
              {t("footer.nav")}
            </span>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/maisons" className="hover:text-oak transition-colors">
                  {t("nav.models")}
                </Link>
              </li>
              <li>
                <Link to="/configurateur" className="hover:text-oak transition-colors">
                  {t("nav.configurator")}
                </Link>
              </li>
              <li>
                <Link to="/realisations" className="hover:text-oak transition-colors">
                  {t("nav.projects")}
                </Link>
              </li>
              <li>
                <Link to="/savoir-faire" className="hover:text-oak transition-colors">
                  {t("nav.savoir")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-cream/40">
              {t("footer.contact")}
            </span>
            <ul className="text-sm space-y-2 text-cream/80">
              <li>
                <a href="mailto:info@envibois.fr" className="hover:text-oak transition-colors">
                  info@envibois.fr
                </a>
              </li>
              <li>
                <a href="tel:+33632763074" className="hover:text-oak transition-colors">
                  +33 6 32 76 30 74
                </a>{" "}
                <span className="text-cream/40">(FR)</span>
              </li>
              <li>
                <a href="tel:+37126895717" className="hover:text-oak transition-colors">
                  +371 26 89 57 17
                </a>{" "}
                <span className="text-cream/40">(LV)</span>
              </li>
              <li className="pt-2">
                Dorf SIA
                <br />
                Višķu iela 15A
                <br />
                LV-5410 Daugavpils, Latvia
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-6 pt-10 mt-10 border-t border-cream/10 text-xs text-cream/50 flex flex-wrap gap-x-6 gap-y-2">
          <span>© {new Date().getFullYear()} Dorf SIA — Reg. LV 415 030 38 694</span>
          <span>{t("footer.legal")}</span>
        </div>
      </footer>
    </>
  );
}
