"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PUBLIC_PATHS } from "@/lib/site/public-paths";

type MarketingNavLink = {
  href: string;
  label: string;
};

type MarketingMobileNavProps = {
  projectTitle: string;
  links: readonly MarketingNavLink[];
};

const LEGAL_LINKS = [
  { href: PUBLIC_PATHS.legal, label: "Mentions légales" },
  { href: PUBLIC_PATHS.privacy, label: "Confidentialité" },
  { href: PUBLIC_PATHS.cookies, label: "Cookies" },
] as const;

function MobileSearchForm({ inputRef }: { inputRef?: Ref<HTMLInputElement> }) {
  return (
    <form action={PUBLIC_PATHS.search} className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--mf-rose-strong))]" />
      <Input
        ref={inputRef}
        type="search"
        name="q"
        placeholder="Rechercher un parfum..."
        className="h-12 rounded-full border-[hsla(var(--mf-petal),0.72)] bg-[hsla(var(--mf-cream),0.96)] pl-11 text-sm text-[hsl(var(--mf-ink))] shadow-[0_10px_24px_rgba(116,54,71,0.08)] placeholder:text-[hsl(var(--mf-ink-soft))]"
      />
    </form>
  );
}

export function MarketingMobileNav({ projectTitle, links }: MarketingMobileNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  return (
    <div className="xl:hidden">
      <div className="flex items-center justify-between gap-3">
        <Link href={PUBLIC_PATHS.home} className="flex min-w-0 items-center gap-3" aria-label={`Retour à l'accueil ${projectTitle}`}>
          <Image
            src="/branding/logo-128.png"
            alt={`${projectTitle} logo`}
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 object-contain drop-shadow-[0_12px_24px_rgba(116,54,71,0.16)]"
            priority
          />
          <span className="min-w-0">
            <span className="block truncate font-serif text-[1.25rem] leading-none text-[hsl(var(--mf-ink))]">
              {projectTitle}
            </span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={searchOpen ? "Fermer la recherche" : "Ouvrir la recherche"}
            aria-expanded={searchOpen}
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen((open) => !open);
            }}
            className="h-11 w-11 rounded-full border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-cream),0.92)] text-[hsl(var(--mf-ink))] shadow-[0_10px_24px_rgba(116,54,71,0.08)] hover:bg-[hsla(var(--mf-blush),0.52)]"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Sheet
            open={menuOpen}
            onOpenChange={(open) => {
              setMenuOpen(open);
              if (open) {
                setSearchOpen(false);
              }
            }}
          >
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Ouvrir la navigation"
                className="h-11 w-11 rounded-full border-[hsla(var(--mf-line),0.9)] bg-[hsla(var(--mf-cream),0.92)] text-[hsl(var(--mf-ink))] shadow-[0_10px_24px_rgba(116,54,71,0.08)] hover:bg-[hsla(var(--mf-blush),0.52)]"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[min(88vw,24rem)] border-l border-[hsla(var(--mf-line),0.82)] bg-[linear-gradient(180deg,hsla(var(--mf-cream),0.98),hsla(var(--mf-shell),0.96))] p-0 sm:max-w-[24rem]"
            >
              <SheetHeader className="border-b border-[hsla(var(--mf-line),0.72)] px-6 py-5 text-left">
                <SheetTitle className="font-serif text-[1.7rem] text-[hsl(var(--mf-ink))]">{projectTitle}</SheetTitle>
                <SheetDescription className="text-[0.95rem] text-[hsl(var(--mf-ink-soft))]">
                  Navigation mobile.
                </SheetDescription>
              </SheetHeader>

              <div className="flex h-full flex-col gap-6 overflow-y-auto px-6 py-6">
                <nav className="flex flex-col gap-3">
                  {links.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="rounded-[1.4rem] border border-[hsla(var(--mf-line),0.78)] bg-[hsla(var(--mf-cream),0.84)] px-4 py-3 text-base text-[hsl(var(--mf-ink-soft))] transition hover:bg-[hsla(var(--mf-blush),0.5)] hover:text-[hsl(var(--mf-rose-strong))]"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto border-t border-[hsla(var(--mf-line),0.72)] pt-5">
                  <div className="flex flex-col gap-2">
                    {LEGAL_LINKS.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="rounded-full px-1 py-2 text-sm text-[hsl(var(--mf-ink-soft))] transition hover:text-[hsl(var(--mf-rose-strong))]"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {searchOpen ? (
        <div className="pt-4">
          <MobileSearchForm inputRef={searchInputRef} />
        </div>
      ) : null}
    </div>
  );
}
