import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-charcoal/10 py-20 bg-cream">
      <div className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        <div className="max-w-[32ch]">
          <span className="font-serif text-3xl block italic text-charcoal mb-4">Dorf SIA</span>
          <p className="text-sm text-charcoal/60 leading-relaxed">{t("footer.tagline")}</p>
        </div>
        <div className="space-y-4">
          <span className="text-[10px] font-medium uppercase tracking-widest text-charcoal/40">
            {t("footer.nav")}
          </span>
          <ul className="text-sm space-y-2">
            <li><Link to="/maisons" className="hover:text-oak transition-colors">{t("nav.models")}</Link></li>
            <li><Link to="/configurateur" className="hover:text-oak transition-colors">{t("nav.configurator")}</Link></li>
            <li><Link to="/realisations" className="hover:text-oak transition-colors">{t("nav.projects")}</Link></li>
            <li><Link to="/savoir-faire" className="hover:text-oak transition-colors">{t("nav.savoir")}</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <span className="text-[10px] font-medium uppercase tracking-widest text-charcoal/40">
            {t("footer.contact")}
          </span>
          <ul className="text-sm space-y-2 text-charcoal/80">
            <li><a href="mailto:info@envibois.fr" className="hover:text-oak transition-colors">info@envibois.fr</a></li>
            <li><a href="tel:+33632763074" className="hover:text-oak transition-colors">+33 6 32 76 30 74</a> <span className="text-charcoal/40">(FR)</span></li>
            <li><a href="tel:+37126895717" className="hover:text-oak transition-colors">+371 26 89 57 17</a> <span className="text-charcoal/40">(LV)</span></li>
            <li><a href="tel:+33970406464" className="hover:text-oak transition-colors">09 70 40 64 64</a> <span className="text-charcoal/40">(Agence)</span></li>
            <li className="pt-2">Dorf SIA<br />Višķu iela 15A<br />LV-5410 Daugavpils, Latvia</li>
          </ul>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-6 pt-12 mt-12 border-t border-charcoal/10 text-xs text-charcoal/50 flex flex-wrap gap-x-6 gap-y-2">
        <span>© {new Date().getFullYear()} Dorf SIA — Reg. LV 415 030 38 694</span>
        <span>{t("footer.legal")}</span>
      </div>
    </footer>
  );
}
