import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl italic text-charcoal">404</h1>
        <p className="mt-4 text-sm text-charcoal/60">Page introuvable.</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-charcoal px-5 py-2 text-sm font-medium text-cream hover:bg-moss transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl italic text-charcoal">Une erreur est survenue.</h1>
        <p className="mt-3 text-sm text-charcoal/60">{error.message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-charcoal px-5 py-2 text-sm font-medium text-cream hover:bg-moss transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dorf SIA — Maisons ossature bois sur-mesure" },
      {
        name: "description",
        content:
          "Constructeur de maisons modernes en ossature bois. Conception sur-mesure, configurateur en ligne et devis personnalisé.",
      },
      { name: "author", content: "Dorf SIA" },
      { property: "og:site_name", content: "Dorf SIA" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Dorf SIA",
          url: "https://www.dorf.fr",
          description: "Constructeur de maisons ossature bois en France.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <HeadContent />
        <div className="min-h-screen flex flex-col bg-cream text-charcoal font-sans selection:bg-oak/20">
          <Header />
          <main className="flex-1"><Outlet /></main>
          <Footer />
          <Toaster />
        </div>
      </I18nProvider>
    </QueryClientProvider>
  );
}
