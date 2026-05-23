import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

import { MarketingMobileNav } from "@/components/site/marketing-mobile-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PUBLIC_PATHS } from "@/lib/site/public-paths";
import { getPublicProjectInfo } from "@/lib/site/project";

const PRIMARY_LINKS = [
  { href: PUBLIC_PATHS.home, label: "Accueil" },
  { href: PUBLIC_PATHS.catalog, label: "Nos parfums" },
  { href: PUBLIC_PATHS.quiz, label: "Test de personnalité olfactif" },
];

const SITE_THEME_STYLE = {
  "--mf-shell": "18 100% 98%",
  "--mf-shell-strong": "20 47% 96%",
  "--mf-cream": "20 52% 94%",
  "--mf-blush": "20 47% 96%",
  "--mf-petal": "351 34% 57%",
  "--mf-rose": "351 34% 57%",
  "--mf-rose-strong": "343 33% 45%",
  "--mf-line": "343 20% 84%",
  "--mf-ink": "0 5% 22%",
  "--mf-ink-soft": "0 4% 34%",
  "--background": "18 100% 98%",
  "--foreground": "0 5% 22%",
  "--card": "18 100% 98%",
  "--card-foreground": "0 5% 22%",
  "--popover": "18 100% 98%",
  "--popover-foreground": "0 5% 22%",
  "--primary": "343 33% 45%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "20 47% 96%",
  "--secondary-foreground": "0 5% 22%",
  "--accent": "20 52% 94%",
  "--accent-foreground": "0 5% 22%",
  "--border": "343 20% 84%",
  "--input": "343 20% 84%",
  "--ring": "343 33% 45%",
} as CSSProperties;

function HeaderSearchForm() {
  return (
    <form action={PUBLIC_PATHS.search} className="relative w-full max-w-[22rem]">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--mf-rose-strong))]" />
      <Input
        type="search"
        name="q"
        placeholder="Rechercher un parfum..."
        className="h-12 rounded-full border-[hsla(var(--mf-petal),0.72)] bg-[hsla(var(--mf-cream),0.92)] pl-11 text-sm text-[hsl(var(--mf-ink))] shadow-[0_10px_24px_rgba(116,54,71,0.08)] placeholder:text-[hsl(var(--mf-ink-soft))]"
      />
    </form>
  );
}

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const project = await getPublicProjectInfo();

  return (
    <div
      className="min-h-screen scroll-smooth bg-[hsl(var(--mf-shell))] text-[hsl(var(--mf-ink))]"
      style={SITE_THEME_STYLE}
    >
      <header className="sticky top-0 z-50 border-b border-[hsla(var(--mf-line),0.82)] bg-[linear-gradient(180deg,hsla(var(--mf-cream),0.94),hsla(var(--mf-shell),0.9))] backdrop-blur-xl">
        <div className="container py-4">
          <div className="hidden items-center gap-6 xl:grid xl:grid-cols-[auto_1fr_auto]">
            <Link href={PUBLIC_PATHS.home} className="flex min-w-0 items-center gap-4" aria-label={`Retour à l'accueil ${project.title}`}>
              <Image
                src="/branding/logo-128.png"
                alt={`${project.title} logo`}
                width={108}
                height={108}
                className="h-[6rem] w-[6rem] shrink-0 object-contain drop-shadow-[0_14px_28px_rgba(116,54,71,0.18)]"
                priority
              />
              <span className="min-w-0">
                <span className="block font-serif text-[2rem] leading-none tracking-[0.03em] text-[hsl(var(--mf-ink))]">
                  {project.title}
                </span>
              </span>
            </Link>

            <nav className="flex items-center justify-center gap-2">
              {PRIMARY_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-[1.02rem] text-[hsl(var(--mf-ink-soft))] transition hover:bg-[hsla(var(--mf-cream),0.72)] hover:text-[hsl(var(--mf-rose-strong))]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-end gap-3">
              <HeaderSearchForm />
            </div>
          </div>

          <MarketingMobileNav projectTitle={project.title} links={PRIMARY_LINKS} />
        </div>
      </header>

      <main className="bg-[linear-gradient(180deg,#FFF7F3_0%,#F6E8E2_45%,#F1DDD6_100%)]">{children}</main>

      <footer className="border-t border-[hsl(var(--mf-line))] bg-[hsla(var(--mf-cream),0.66)]">
        <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="font-serif text-xl text-[hsl(var(--mf-ink))]">{project.title}</p>
            <p className="max-w-xl text-sm leading-6 text-[hsl(var(--mf-ink-soft))]">
              Découvrir son profil olfactif, explorer des parfums cohérents et afficher les offres partenaires quand elles sont disponibles.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" asChild className="rounded-full px-4 text-[hsl(var(--mf-ink-soft))] hover:bg-[hsla(var(--mf-blush),0.42)]">
              <Link href={PUBLIC_PATHS.legal}>Mentions légales</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="rounded-full px-4 text-[hsl(var(--mf-ink-soft))] hover:bg-[hsla(var(--mf-blush),0.42)]">
              <Link href={PUBLIC_PATHS.privacy}>Confidentialité</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="rounded-full px-4 text-[hsl(var(--mf-ink-soft))] hover:bg-[hsla(var(--mf-blush),0.42)]">
              <Link href={PUBLIC_PATHS.cookies}>Cookies</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
