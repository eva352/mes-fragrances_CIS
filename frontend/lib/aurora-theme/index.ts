"use client";

import * as React from "react";
import {
  AURORA_THEME_STORAGE_KEY,
  DEFAULT_AURORA_THEME_ID,
  type AuroraTheme,
  AURORA_THEMES,
} from "./themes";
import { AURORA_THEME_COOKIE_NAME } from "./constants";

export type { AuroraTheme };
export { AURORA_THEMES, DEFAULT_AURORA_THEME_ID, AURORA_THEME_STORAGE_KEY };

const AURORA_THEME_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year

function isValidThemeId(themeId: string) {
  return AURORA_THEMES.some((t) => t.id === themeId);
}

function applyThemeToDocument(themeId: string) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.dataset.auroraTheme = themeId;
}

function readCookieTheme(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  for (const rawCookie of cookies) {
    const cookie = rawCookie.trim();
    const names = [AURORA_THEME_COOKIE_NAME, AURORA_THEME_STORAGE_KEY];
    const match = names.find((n) => cookie.startsWith(`${n}=`));
    if (!match) continue;

    const value = cookie.slice(match.length + 1);
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  return null;
}

function readStoredTheme(): string {
  if (typeof window === "undefined") return DEFAULT_AURORA_THEME_ID;
  try {
    const stored = window.localStorage.getItem(AURORA_THEME_STORAGE_KEY);
    if (stored && isValidThemeId(stored)) return stored;
  } catch {
    // ignore
  }

  const cookieTheme = readCookieTheme();
  if (cookieTheme && isValidThemeId(cookieTheme)) return cookieTheme;

  return DEFAULT_AURORA_THEME_ID;
}

function writeStoredTheme(themeId: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(AURORA_THEME_STORAGE_KEY, themeId);
  } catch {
    // ignore
  }

  try {
    document.cookie = `${AURORA_THEME_COOKIE_NAME}=${encodeURIComponent(themeId)}; Path=/; Max-Age=${AURORA_THEME_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
  } catch {
    // ignore
  }
}

export function useAuroraTheme() {
  const [themeId, setThemeId] = React.useState<string>(() => readStoredTheme());

  React.useEffect(() => {
    applyThemeToDocument(themeId);
  }, [themeId]);

  React.useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.storageArea !== window.localStorage) return;
      if (e.key !== AURORA_THEME_STORAGE_KEY) return;

      const next = e.newValue && isValidThemeId(e.newValue) ? e.newValue : DEFAULT_AURORA_THEME_ID;
      setThemeId(next);
      applyThemeToDocument(next);
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = React.useCallback((nextThemeId: string) => {
    const next = isValidThemeId(nextThemeId) ? nextThemeId : DEFAULT_AURORA_THEME_ID;
    setThemeId(next);
    writeStoredTheme(next);
    applyThemeToDocument(next);
  }, []);

  const theme =
    AURORA_THEMES.find((t) => t.id === themeId) ??
    AURORA_THEMES.find((t) => t.id === DEFAULT_AURORA_THEME_ID) ??
    null;

  return { themeId, theme, setTheme };
}
