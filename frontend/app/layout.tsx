import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider } from "@/lib/auth/context";
import {
  AURORA_THEMES,
  AURORA_THEME_STORAGE_KEY,
  DEFAULT_AURORA_THEME_ID,
} from "@/lib/aurora-theme/themes";
import { AURORA_THEME_COOKIE_NAME } from "@/lib/aurora-theme/constants";
import "./globals.css";
import "./aurora-themes.css";
import { Toaster } from "@/components/ui/sonner";
import { AuroraThemeProjectSync } from "@/components/aurora-theme-project-sync";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME ?? "AuroraStack",
  description: "Base officielle UI Aurora (thème Northern Light)",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const rawCookieThemeId =
    cookieStore.get(AURORA_THEME_COOKIE_NAME)?.value ??
    cookieStore.get(AURORA_THEME_STORAGE_KEY)?.value;
  const cookieThemeId = rawCookieThemeId
    ? (() => {
        try {
          return decodeURIComponent(rawCookieThemeId);
        } catch {
          return rawCookieThemeId;
        }
      })()
    : undefined;
  const isValidThemeId = (id: string) => AURORA_THEMES.some((t) => t.id === id);
  const initialThemeId =
    cookieThemeId && isValidThemeId(cookieThemeId)
      ? cookieThemeId
      : DEFAULT_AURORA_THEME_ID;

  return (
    <html
      lang="fr"
      suppressHydrationWarning
      data-aurora-theme={initialThemeId}
    >
      <Script id="aurora-theme-init" strategy="beforeInteractive">{`
(() => {
  try {
    const DEFAULT = ${JSON.stringify(DEFAULT_AURORA_THEME_ID)};
    const KEY = ${JSON.stringify(AURORA_THEME_STORAGE_KEY)};
    const COOKIE = ${JSON.stringify(AURORA_THEME_COOKIE_NAME)};

    const readCookie = (name) => {
      const parts = document.cookie.split(";");
      for (const raw of parts) {
        const c = raw.trim();
        if (!c.startsWith(name + "=")) continue;
        const v = c.slice(name.length + 1);
        try { return decodeURIComponent(v); } catch { return v; }
      }
      return null;
    };

    const t = localStorage.getItem(KEY) || readCookie(COOKIE) || readCookie(KEY) || DEFAULT;
    document.documentElement.dataset.auroraTheme = t;
  } catch {}
})();
      `}</Script>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background text-foreground font-sans"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="aurora_stack_color_mode"
        >
          <AuthProvider>
            <AuroraThemeProjectSync />
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
