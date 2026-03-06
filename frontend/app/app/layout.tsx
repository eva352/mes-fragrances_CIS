"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ProductSidebar } from "@/components/product-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth/context";
import { getAppSpec, type AppSpecEnvelope, type AppSpecShellNavItem } from "@/lib/api/app-spec";
import { AppRuntimeProvider } from "@/components/app-runtime-context";

function getTitle(pathname: string, nav: AppSpecShellNavItem[]) {
  return nav.find((i) => i.path === pathname)?.title ?? "WebApp";
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [envelope, setEnvelope] = useState<AppSpecEnvelope | null>(null);
  const [specLoading, setSpecLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;

    async function load() {
      setSpecLoading(true);
      try {
        const env = await getAppSpec();
        if (!cancelled) setEnvelope(env);
      } finally {
        if (!cancelled) setSpecLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const navigation = envelope?.spec.shell.navigation ?? [];
  const pageTitle = useMemo(() => getTitle(pathname, navigation), [pathname, navigation]);

  if (isLoading || !isAuthenticated || !envelope || specLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Chargement de la webapp...
          </p>
        </div>
      </main>
    );
  }

  return (
    <SidebarProvider>
      <ProductSidebar navigation={navigation} />
      <SidebarInset>
        <header className="flex min-h-16 shrink-0 items-center border-b border-border bg-background/80 backdrop-blur">
          <div className="flex flex-1 items-center gap-3 px-4 py-3">
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-col leading-tight">
              <h1 className="text-base font-semibold">{pageTitle}</h1>
              <p className="text-xs text-muted-foreground">Runtime via `llm_specs/app.json`</p>
            </div>
          </div>
        </header>
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
          <AppRuntimeProvider
            envelope={envelope}
            onSetSpec={(spec) => setEnvelope((prev) => (prev ? { ...prev, spec } : prev))}
          >
            {children}
          </AppRuntimeProvider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

