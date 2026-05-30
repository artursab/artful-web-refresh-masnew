import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "./mentions-legales";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Politique cookies — Envibois" },
      { name: "description", content: "Politique de gestion des cookies du site Envibois." },
      { property: "og:title", content: "Cookies — Envibois" },
      { property: "og:url", content: "/cookies" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => (
    <LegalPage
      title="Politique de cookies"
      sections={[
        { h: "Qu'est-ce qu'un cookie ?", p: "Un cookie est un petit fichier déposé sur votre appareil lorsque vous visitez un site internet. Il permet de mémoriser des informations relatives à votre navigation." },
        { h: "Cookies utilisés sur ce site", p: "[À COMPLÉTER] — liste des cookies (techniques, analytiques, tiers), leur finalité et leur durée de conservation." },
        { h: "Gestion de vos préférences", p: "[À COMPLÉTER] — comment accepter, refuser ou supprimer les cookies via les paramètres du navigateur ou un bandeau de consentement." },
        { h: "Cookies tiers", p: "[À COMPLÉTER] — éventuels services tiers déposant des cookies (analytics, intégrations réseaux sociaux, cartographie)." },
        { h: "Contact", p: "Pour toute question relative à notre politique cookies : info@envibois.fr." },
      ]}
    />
  ),
});
