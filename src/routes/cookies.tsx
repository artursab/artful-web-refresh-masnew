import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { LegalPage } from "./mentions-legales";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Politique cookies / Cookie Policy — Envibois" },
      {
        name: "description",
        content: "Politique de gestion des cookies du site Envibois.",
      },
      { property: "og:title", content: "Cookies — Envibois" },
      { property: "og:url", content: "/cookies" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  const { locale } = useT();
  const isFr = locale === "fr";

  return (
    <LegalPage
      title={isFr ? "Politique de cookies" : "Cookie Policy"}
      sections={isFr ? SECTIONS_FR : SECTIONS_EN}
    />
  );
}

const SECTIONS_FR = [
  {
    h: "Qu’est-ce qu’un cookie ?",
    p: `Un cookie est un petit fichier enregistré sur votre appareil lorsque vous consultez un site internet. Il peut permettre au site de fonctionner correctement, de mémoriser certaines préférences ou de mesurer l’audience du site.`,
  },
  {
    h: "Cookies utilisés sur ce site",
    p: `Le site Envibois peut utiliser des cookies strictement nécessaires au fonctionnement du site, par exemple pour la navigation, la sécurité, la langue d’affichage ou le bon fonctionnement des formulaires.

Si des outils de mesure d’audience, de publicité, de cartographie ou d’intégration de services tiers sont ajoutés, les cookies concernés seront indiqués dans cette politique ou dans le bandeau de consentement.`,
  },
  {
    h: "Cookies strictement nécessaires",
    p: `Les cookies strictement nécessaires permettent au site de fonctionner correctement. Ils ne nécessitent pas toujours de consentement préalable lorsqu’ils sont indispensables au service demandé par l’utilisateur.`,
  },
  {
    h: "Cookies soumis au consentement",
    p: `Les cookies analytiques, publicitaires ou provenant de certains services tiers peuvent nécessiter votre consentement préalable. Vous pouvez les accepter, les refuser ou modifier vos préférences lorsque le bandeau de consentement est disponible.`,
  },
  {
    h: "Gestion de vos préférences",
    p: `Vous pouvez gérer ou supprimer les cookies depuis les paramètres de votre navigateur. Selon le navigateur utilisé, vous pouvez bloquer tous les cookies, supprimer les cookies existants ou recevoir une alerte avant leur dépôt.`,
  },
  {
    h: "Contact",
    p: `Pour toute question relative à la politique de cookies du site Envibois, vous pouvez écrire à : info@envibois.fr.`,
  },
];

const SECTIONS_EN = [
  {
    h: "What is a cookie?",
    p: `A cookie is a small file stored on your device when you visit a website. It can allow the website to function properly, remember certain preferences or measure website traffic.`,
  },
  {
    h: "Cookies used on this website",
    p: `The Envibois website may use cookies that are strictly necessary for the operation of the website, for example for navigation, security, language display or the proper functioning of forms.

If analytics, advertising, mapping or third-party integration tools are added, the relevant cookies will be indicated in this policy or in the consent banner.`,
  },
  {
    h: "Strictly necessary cookies",
    p: `Strictly necessary cookies allow the website to function properly. They do not always require prior consent when they are essential to the service requested by the user.`,
  },
  {
    h: "Cookies requiring consent",
    p: `Analytics, advertising or certain third-party cookies may require your prior consent. You can accept them, refuse them or change your preferences when a consent banner is available.`,
  },
  {
    h: "Managing your preferences",
    p: `You can manage or delete cookies from your browser settings. Depending on the browser used, you can block all cookies, delete existing cookies or receive an alert before cookies are stored.`,
  },
  {
    h: "Contact",
    p: `For any question regarding the Envibois cookie policy, you can write to: info@envibois.fr.`,
  },
];
