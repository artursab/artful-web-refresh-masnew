import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useT } from "@/lib/i18n";

export function Header() {
  const { t, locale, setLocale } = useT();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/maisons", label: t("nav.models") },
    { to: "/savoir-faire", label: t("nav.savoir") },
    { to: "/realisations", label: t("nav.projects") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md border-b border-charcoal/5">
      <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="font-serif text-2xl tracking-tight text-charcoal">
            Dorf SIA
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wider">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-charcoal/80 hover:text-oak transition-colors"
                activeProps={{ className: "text-oak" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex gap-2 text-xs font-medium">
            <button
              onClick={() => setLocale("fr")}
              className={locale === "fr" ? "text-charcoal" : "text-charcoal/40 hover:text-charcoal transition-colors"}
              aria-label="Français"
            >
              FR
            </button>
            <span className="text-charcoal/30">/</span>
            <button
              onClick={() => setLocale("en")}
              className={locale === "en" ? "text-charcoal" : "text-charcoal/40 hover:text-charcoal transition-colors"}
              aria-label="English"
            >
              EN
            </button>
          </div>
          <Link
            to="/configurateur"
            className="hidden md:inline-flex bg-charcoal text-cream px-5 py-2 rounded-full text-sm font-medium hover:bg-moss transition-colors ring-1 ring-charcoal"
          >
            {t("nav.configurator")}
          </Link>
          <button
            className="md:hidden text-charcoal"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-charcoal/5 bg-cream">
          <div className="px-6 py-6 flex flex-col gap-5 text-sm uppercase tracking-wider">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-charcoal/80 hover:text-oak"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/configurateur"
              className="bg-charcoal text-cream px-5 py-3 rounded-full text-center font-medium ring-1 ring-charcoal"
              onClick={() => setOpen(false)}
            >
              {t("nav.configurator")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
