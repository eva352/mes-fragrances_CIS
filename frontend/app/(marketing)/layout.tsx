import type { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/brand";

type SitePageNav = {
  id: string;
  slug: string;
  title: string;
  nav_order: number;
  show_in_nav: boolean;
  status: string;
  is_home: boolean;
};

function buildNavList(pages: SitePageNav[]): SitePageNav[] {
  return pages
    .filter((p) => p.status === "published" && p.show_in_nav)
    .sort((a, b) => (a.nav_order !== b.nav_order ? a.nav_order - b.nav_order : a.title.localeCompare(b.title)));
}

function getPageHref(page: SitePageNav) {
  return page.is_home ? "/site" : `/site/${page.slug}`;
}

async function fetchSitePages(): Promise<SitePageNav[]> {
  try {
    const backendOrigin = (process.env.NEXT_BACKEND_ORIGIN ?? "http://localhost:8000").replace(/\/$/, "");
    const res = await fetch(`${backendOrigin}/api/v1/site/pages`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const pages = await fetchSitePages();
  const navItems = buildNavList(pages);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/site" className="text-sm font-semibold">
            {APP_NAME}
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Button key={item.id} variant="ghost" size="sm" asChild>
                <Link href={getPageHref(item)}>{item.title}</Link>
              </Button>
            ))}
            <div className="mx-2 hidden h-5 w-px bg-border sm:block" />
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Backoffice</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border">
        <div className="container flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">{APP_NAME} — starter FastAPI + Next.js + shadcn/ui.</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documentation">Docs</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/support">Support</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#" rel="noreferrer">
                GitHub
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#" rel="noreferrer">
                Mentions légales
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
