import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import logo from "@/assets/LOGO_ENVIBOIS_2.png";

export function Header() {
  const { t, locale, setLocale } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/catalogue", label: locale === "fr" ? "Catalogue" : "Catalogue" },
    /*{ to: "/configurateur", label: t("nav.configurator") },
    { to: "/savoir-faire", label: t("nav.savoir") },*/
    { to: "/realisations", label: t("nav.projects") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  const base = transparent
    ? "text-bone"
    : "text-charcoal bg-bone/90 backdrop-blur-md border-b border-charcoal/5";
  const linkBase = transparent
    ? "text-bone/80 hover:text-bone"
    : "text-charcoal/70 hover:text-charcoal";
  const ctaCls = transparent
    ? "bg-bone text-charcoal hover:bg-gold hover:text-ink"
    : "bg-charcoal text-bone hover:bg-ink";

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${base}`}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Envibois logo"
            className="h-12 w-auto"
          />
        </Link>

        <div className="hidden md:flex gap-10 text-[11px] font-medium uppercase tracking-[0.18em]">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`transition-colors ${linkBase}`}
              activeProps={{ className: transparent ? "text-bone" : "text-charcoal" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <div className="flex gap-1.5 text-[11px] font-medium tracking-wider">
            <button
              onClick={() => setLocale("fr")}
              className={
                locale === "fr"
                  ? transparent ? "text-bone" : "text-charcoal"
                  : transparent ? "text-bone/50 hover:text-bone" : "text-charcoal/40 hover:text-charcoal"
              }
              aria-label="Français"
            >
              FR
            </button>
            <span className={transparent ? "text-bone/30" : "text-charcoal/25"}>/</span>
            <button
              onClick={() => setLocale("en")}
              className={
                locale === "en"
                  ? transparent ? "text-bone" : "text-charcoal"
                  : transparent ? "text-bone/50 hover:text-bone" : "text-charcoal/40 hover:text-charcoal"
              }
              aria-label="English"
            >
              EN
            </button>
          </div>
          <Link
            to="/contact"
            className={`hidden md:inline-flex px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${ctaCls}`}
          >
            {locale === "fr" ? "Devis" : "Quote"}
          </Link>
          <button
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-charcoal/5 bg-bone text-charcoal">
          <div className="px-6 py-8 flex flex-col gap-5 text-sm uppercase tracking-[0.18em]">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-charcoal/80 hover:text-charcoal"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/configurateur"
              className="bg-charcoal text-bone px-5 py-3 text-center text-[11px] font-medium tracking-[0.18em]"
              onClick={() => setOpen(false)}
            >
              {locale === "fr" ? "Demander un devis" : "Request a quote"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
