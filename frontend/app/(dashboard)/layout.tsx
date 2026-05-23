"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { AppRuntimeProvider } from "@/components/app-runtime-context";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth/context";
import { getAppSpec, type AppSpec, type AppSpecEnvelope } from "@/lib/api/app-spec";

function getPageTitle(pathname: string) {
  const map: Record<string, string> = {
    "/": "Dashboard",
    "/dashboard": "Dashboard",
    "/aide": "Aide",
    "/support": "Support",
    "/documentation": "Documentation",
    "/settings": "Paramètres",
    "/profil": "Mon profil",
    "/ui/components": "Showroom (composants)",
  };

  if (pathname.startsWith("/builder")) {
    if (pathname.startsWith("/builder/brief")) return "Brief projet";
    if (pathname.startsWith("/builder/app")) return "Builder (WebApp)";
    return "Builder (website)";
  }

  return map[pathname] ?? "Dashboard";
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [appEnvelope, setAppEnvelope] = useState<AppSpecEnvelope | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSpec() {
      const env = await getAppSpec();
      if (!cancelled) setAppEnvelope(env);
    }

    if (!isLoading && isAuthenticated) {
      loadSpec().catch(() => {
        if (!cancelled) setAppEnvelope(null);
      });
    }

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isLoading]);

  const pageTitle = useMemo(() => {
    const fixed = getPageTitle(pathname);
    if (!appEnvelope) return fixed;
    const dynamic = appEnvelope.spec.pages.find((p) => p.path === pathname);
    return dynamic?.title ?? fixed;
  }, [appEnvelope, pathname]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Verification de la session...
          </p>
        </div>
      </main>
    );
  }

  if (!appEnvelope) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Chargement de la spec webapp…
          </p>
        </div>
      </main>
    );
  }

  const onSetSpec = (spec: AppSpec) => {
    setAppEnvelope((prev) => (prev ? { ...prev, spec } : prev));
  };

  return (
    <SidebarProvider>
      <AppRuntimeProvider envelope={appEnvelope} onSetSpec={onSetSpec}>
        <AppSidebar />
        <SidebarInset>
          <header className="flex min-h-16 shrink-0 items-center border-b border-border bg-background/80 backdrop-blur">
            <div className="flex flex-1 items-center gap-3 px-4 py-3">
              <SidebarTrigger className="-ml-1" />
              <div className="flex flex-col leading-tight">
                <h1 className="text-base font-semibold">{pageTitle}</h1>
                <p className="text-xs text-muted-foreground">Lorem ipsum ...</p>
              </div>
            </div>
          </header>
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">{children}</div>
        </SidebarInset>
      </AppRuntimeProvider>
    </SidebarProvider>
  );
}
