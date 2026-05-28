import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useT } from "@/lib/i18n";

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
    { to: "/maisons", label: t("nav.models") },
    { to: "/savoir-faire", label: t("nav.savoir") },
    { to: "/realisations", label: t("nav.projects") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  const base = transparent
    ? "text-white"
    : "text-charcoal bg-cream/85 backdrop-blur-md border-b border-charcoal/5";
  const linkBase = transparent
    ? "text-white/85 hover:text-white"
    : "text-charcoal/80 hover:text-oak";
  const ctaCls = transparent
    ? "bg-white text-charcoal hover:bg-oak hover:text-cream ring-1 ring-white/30"
    : "bg-charcoal text-cream hover:bg-moss ring-1 ring-charcoal";

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${base}`}>
      <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="font-serif text-2xl tracking-tight">
            Envibois
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wider">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`transition-colors ${linkBase}`}
                activeProps={{ className: transparent ? "text-white" : "text-oak" }}
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
              className={
                locale === "fr"
                  ? transparent
                    ? "text-white"
                    : "text-charcoal"
                  : transparent
                    ? "text-white/50 hover:text-white"
                    : "text-charcoal/40 hover:text-charcoal"
              }
              aria-label="Français"
            >
              FR
            </button>
            <span className={transparent ? "text-white/40" : "text-charcoal/30"}>/</span>
            <button
              onClick={() => setLocale("en")}
              className={
                locale === "en"
                  ? transparent
                    ? "text-white"
                    : "text-charcoal"
                  : transparent
                    ? "text-white/50 hover:text-white"
                    : "text-charcoal/40 hover:text-charcoal"
              }
              aria-label="English"
            >
              EN
            </button>
          </div>
          <Link
            to="/configurateur"
            className={`hidden md:inline-flex px-5 py-2 rounded-full text-sm font-medium transition-colors ${ctaCls}`}
          >
            {t("nav.configurator")}
          </Link>
          <button className="md:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-charcoal/5 bg-cream text-charcoal">
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
