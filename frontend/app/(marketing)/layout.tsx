import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPublicProjectInfo } from "@/lib/site/project";

const PRIMARY_LINKS = [
  { href: "/site", label: "Accueil" },
  { href: "/site#nouveautes", label: "Nouveautés" },
  { href: "/site#meilleures-ventes", label: "Meilleures ventes" },
  { href: "/site/quiz-parfum", label: "Test de personnalité olfactif" },
];

const SITE_THEME_STYLE = {
  "--mf-shell": "30 48% 97%",
  "--mf-shell-strong": "26 44% 93%",
  "--mf-cream": "34 58% 98%",
  "--mf-blush": "18 54% 95%",
  "--mf-petal": "349 56% 92%",
  "--mf-rose": "348 48% 83%",
  "--mf-rose-strong": "346 40% 72%",
  "--mf-line": "12 33% 86%",
  "--mf-ink": "18 27% 22%",
  "--mf-ink-soft": "18 17% 39%",
  "--background": "30 48% 97%",
  "--foreground": "18 27% 22%",
  "--card": "34 58% 98%",
  "--card-foreground": "18 27% 22%",
  "--popover": "34 58% 98%",
  "--popover-foreground": "18 27% 22%",
  "--primary": "346 40% 72%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "349 56% 92%",
  "--secondary-foreground": "18 27% 22%",
  "--accent": "18 54% 95%",
  "--accent-foreground": "18 27% 22%",
  "--border": "12 33% 86%",
  "--input": "12 33% 86%",
  "--ring": "346 40% 72%",
} as CSSProperties;

function HeaderSearchForm() {
  return (
    <form action="/site/recherche" className="relative w-full max-w-[22rem]">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--mf-rose-strong))]" />
      <Input
        type="search"
        name="q"
        placeholder="Rechercher un parfum..."
        className="h-12 rounded-full border-[hsla(var(--mf-rose),0.95)] bg-white/92 pl-11 text-sm text-[hsl(var(--mf-ink))] shadow-none placeholder:text-[hsl(var(--mf-ink-soft))]"
      />
    </form>
  );
}

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const project = await getPublicProjectInfo();

  return (
    <div
      className="min-h-screen scroll-smooth bg-[linear-gradient(180deg,hsla(var(--mf-shell),1),hsla(var(--mf-blush),0.82)_42%,hsla(var(--mf-shell-strong),0.92)_100%)] text-[hsl(var(--mf-ink))]"
      style={SITE_THEME_STYLE}
    >
      <header className="sticky top-0 z-50 border-b border-[hsla(var(--mf-line),0.82)] bg-white/92 backdrop-blur-xl">
        <div className="container py-4">
          <div className="hidden items-center gap-6 xl:grid xl:grid-cols-[auto_1fr_auto]">
            <Link href="/site" className="flex min-w-0 items-center gap-4" aria-label={`Retour à l'accueil ${project.title}`}>
              <Image
                src="/branding/logo-128.png"
                alt={`${project.title} logo`}
                width={72}
                height={72}
                className="h-[4.4rem] w-[4.4rem] shrink-0 object-contain"
                priority
              />
              <span className="min-w-0">
                <span className="block font-serif text-[2rem] leading-none tracking-[0.03em] text-[hsl(var(--mf-ink))]">
                  {project.title}
                </span>
                <span className="mt-1 block text-[0.72rem] uppercase tracking-[0.28em] text-[hsl(var(--mf-ink-soft))]">
                  Comparateur éditorial premium
                </span>
              </span>
            </Link>

            <nav className="flex items-center justify-center gap-2">
              {PRIMARY_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-[1.02rem] text-[hsl(var(--mf-ink-soft))] transition hover:text-[hsl(var(--mf-rose-strong))]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-end gap-3">
              <HeaderSearchForm />
              <Link
                href="/"
                className="text-sm text-[hsl(var(--mf-ink-soft))] transition hover:text-[hsl(var(--mf-ink))]"
              >
                CIS
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 xl:hidden">
            <div className="flex items-center justify-between gap-4">
              <Link href="/site" className="flex min-w-0 items-center gap-3" aria-label={`Retour à l'accueil ${project.title}`}>
                <Image
                  src="/branding/logo-128.png"
                  alt={`${project.title} logo`}
                  width={64}
                  height={64}
                  className="h-14 w-14 shrink-0 object-contain"
                  priority
                />
                <span className="min-w-0">
                  <span className="block font-serif text-[1.7rem] leading-none text-[hsl(var(--mf-ink))]">
                    {project.title}
                  </span>
                  <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.24em] text-[hsl(var(--mf-ink-soft))]">
                    Comparateur éditorial premium
                  </span>
                </span>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="rounded-full border border-[hsla(var(--mf-line),0.82)] bg-white/88 px-4 text-[hsl(var(--mf-ink-soft))]"
              >
                <Link href="/">CIS</Link>
              </Button>
            </div>

            <nav className="flex flex-wrap gap-2">
              {PRIMARY_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full bg-white/82 px-4 py-2 text-sm text-[hsl(var(--mf-ink-soft))] transition hover:text-[hsl(var(--mf-rose-strong))]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <HeaderSearchForm />
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-[hsl(var(--mf-line))] bg-white/55">
        <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="font-serif text-xl text-[hsl(var(--mf-ink))]">{project.title}</p>
            <p className="max-w-xl text-sm leading-6 text-[hsl(var(--mf-ink-soft))]">
              Découvrir des parfums, comparer les offres partenaires et rester transparente sur l'affiliation.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" asChild className="rounded-full px-4 text-[hsl(var(--mf-ink-soft))] hover:bg-white/80">
              <Link href="/site/mentions-legales">Mentions légales</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="rounded-full px-4 text-[hsl(var(--mf-ink-soft))] hover:bg-white/80">
              <Link href="/site/confidentialite">Confidentialité</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="rounded-full px-4 text-[hsl(var(--mf-ink-soft))] hover:bg-white/80">
              <Link href="/site/cookies">Cookies</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
