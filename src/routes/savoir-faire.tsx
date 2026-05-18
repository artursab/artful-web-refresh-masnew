import { createFileRoute, Link } from "@tanstack/react-router";
import savoirImg from "@/assets/savoir-faire.jpg";
import wallImg from "@/assets/composition-wall.jpg";
import roofImg from "@/assets/composition-roof.jpg";
import deliveryImg from "@/assets/point-delivery.jpg";
import factoryImg from "@/assets/point-factory.jpg";
import teamImg from "@/assets/point-team.jpg";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/savoir-faire")({
  head: () => ({
    meta: [
      { title: "Savoir-faire — Dorf SIA" },
      {
        name: "description",
        content:
          "Trente ans d'expérience dans la conception et la fabrication de maisons en ossature bois. Découvrez notre processus de la conception à la livraison.",
      },
      { property: "og:title", content: "Savoir-faire — Dorf SIA" },
      { property: "og:description", content: "Notre processus, de l'atelier au chantier." },
      { property: "og:image", content: savoirImg },
      { property: "og:url", content: "/savoir-faire" },
    ],
    links: [{ rel: "canonical", href: "/savoir-faire" }],
  }),
  component: Savoir,
});

function Savoir() {
  const { t } = useT();
  const steps = ["s1", "s2", "s3", "s4"] as const;
  return (
    <div className="py-24">
      <div className="max-w-screen-xl mx-auto px-6">
        <header className="max-w-[48ch] mb-16">
          <h1 className="font-serif text-5xl md:text-6xl italic text-charcoal mb-6">
            {t("savoir.title")}
          </h1>
          <p className="text-lg text-charcoal/70 leading-relaxed">{t("savoir.lead")}</p>
        </header>

        <div className="rounded-2xl overflow-hidden ring-1 ring-charcoal/5 mb-20">
          <img
            src={savoirImg}
            alt="Charpentier travaillant sur une ossature bois"
            width={1536}
            height={1024}
            loading="lazy"
            className="w-full aspect-[3/2] object-cover"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 border-t border-charcoal/10 pt-16">
          {steps.map((s) => (
            <div key={s}>
              <h2 className="font-serif text-3xl text-charcoal mb-4">
                {t(`savoir.${s}.t` as const)}
              </h2>
              <p className="text-charcoal/70 leading-relaxed">{t(`savoir.${s}.d` as const)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Composition — wall */}
      <section className="mt-32 bg-cream border-y border-charcoal/10 py-24">
        <div className="max-w-screen-xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden ring-1 ring-charcoal/5 order-2 lg:order-1">
            <img src={wallImg} alt="Coupe d'une paroi ossature bois isolée" width={1280} height={960} loading="lazy" className="w-full aspect-[4/3] object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-oak text-xs font-medium uppercase tracking-[0.2em]">Composition</span>
            <h2 className="font-serif text-4xl md:text-5xl italic text-charcoal mt-4 mb-6">Le principe du mur ossature bois.</h2>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              Une trame de montants en bois résineux, isolée par de la fibre de bois ou de la laine biosourcée, protégée d'un pare-pluie et habillée d'un bardage extérieur. Une paroi fine, performante et respirante.
            </p>
            <ul className="space-y-3 text-sm text-charcoal/80">
              {[
                "Modularité architecturale exceptionnelle",
                "Choix très large de finitions intérieures et extérieures",
                "Isolation thermique haute performance (R ≥ 5)",
                "Étanchéité à l'air conforme RE2020",
              ].map((b) => (
                <li key={b} className="flex gap-3"><span className="text-oak">—</span>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Composition — roof */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-oak text-xs font-medium uppercase tracking-[0.2em]">Toiture</span>
            <h2 className="font-serif text-4xl md:text-5xl italic text-charcoal mt-4 mb-6">Le principe du caisson de toit.</h2>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              Caissons préfabriqués en atelier, posés à la grue en quelques heures. La toiture est terminée, isolée et étanche dès le premier jour de montage.
            </p>
            <ul className="space-y-3 text-sm text-charcoal/80">
              {[
                "Hors d'eau dès la pose",
                "Isolation pleine épaisseur sans pont thermique",
                "Pentes adaptées à toutes les régions",
                "Compatible toiture végétalisée",
              ].map((b) => (
                <li key={b} className="flex gap-3"><span className="text-oak">—</span>{b}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden ring-1 ring-charcoal/5">
            <img src={roofImg} alt="Caisson de toit ossature bois levé à la grue" width={1280} height={960} loading="lazy" className="w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </section>

      {/* Strong points */}
      <section className="bg-charcoal text-cream py-32">
        <div className="max-w-screen-xl mx-auto px-6">
          <span className="text-oak text-xs font-medium uppercase tracking-[0.2em]">Nos points forts</span>
          <h2 className="font-serif text-4xl md:text-5xl italic mt-4 mb-16 max-w-[24ch]">Livraison, atelier, engagement.</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { img: deliveryImg, t: "Livraison", d: "Un processus de livraison fiable et sans accroc, peu importe la région ou l'envergure du projet." },
              { img: factoryImg, t: "Atelier", d: "Innovation et savoir-faire d'atelier pour des maisons modulaires durables, performantes et précises." },
              { img: teamImg, t: "Engagement", d: "Une équipe de professionnels expérimentés dédiée à la construction de votre maison ossature bois." },
            ].map((p) => (
              <div key={p.t}>
                <div className="rounded-2xl overflow-hidden ring-1 ring-cream/10 mb-5 aspect-[4/3]">
                  <img src={p.img} alt={p.t} width={1280} height={960} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-serif text-3xl italic mb-3">{p.t}</h3>
                <p className="text-sm text-cream/70 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & certifications */}
      <section className="py-24 border-t border-charcoal/10">
        <div className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-oak text-xs font-medium uppercase tracking-[0.2em]">Matériaux</span>
            <h2 className="font-serif text-4xl italic text-charcoal mt-4 mb-6">Bois, fibres, et soin.</h2>
            <p className="text-charcoal/70 leading-relaxed mb-6">
              Bois épicéa et douglas de structure issus de forêts gérées durablement, isolants biosourcés (fibre de bois, ouate de cellulose), bardages en mélèze, pin ou bois brûlé.
            </p>
          </div>
          <div>
            <span className="text-oak text-xs font-medium uppercase tracking-[0.2em]">Certifications</span>
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {["PEFC / FSC", "RE2020", "Garantie décennale", "Qualibat ossature bois", "Label biosourcé", "CE marquage"].map((c) => (
                <li key={c} className="border border-charcoal/15 rounded-full px-4 py-2 text-center text-charcoal/70">{c}</li>
              ))}
            </ul>
            <Link to="/contact" className="inline-flex mt-10 items-center gap-2 text-sm font-medium border-b border-charcoal/30 pb-1 hover:border-oak">
              Parler à un expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
