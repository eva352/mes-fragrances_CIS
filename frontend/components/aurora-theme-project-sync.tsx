"use client";

import { useEffect, useRef } from "react";

import { getAppSpec } from "@/lib/api/app-spec";
import { upsertAppSpec } from "@/lib/api/app-spec";
import {
  AURORA_THEMES,
  AURORA_THEME_STORAGE_KEY,
  DEFAULT_AURORA_THEME_ID,
  useAuroraTheme,
} from "@/lib/aurora-theme";
import { AURORA_THEME_COOKIE_NAME } from "@/lib/aurora-theme/constants";

/**
 * Assure que le thème Aurora est bien restauré depuis la spec projet (backend),
 * même si le localStorage/cookies du navigateur ont été nettoyés.
 */
export function AuroraThemeProjectSync() {
  const { themeId, setTheme } = useAuroraTheme();
  const hasSyncedRef = useRef(false);
  const themeIdRef = useRef(themeId);

  useEffect(() => {
    themeIdRef.current = themeId;
  }, [themeId]);

  useEffect(() => {
    if (hasSyncedRef.current) return;
    hasSyncedRef.current = true;

    const isValidThemeId = (id: string) => AURORA_THEMES.some((t) => t.id === id);

    function hasLocalThemeStored(): boolean {
      try {
        const stored = window.localStorage.getItem(AURORA_THEME_STORAGE_KEY);
        if (stored && isValidThemeId(stored)) return true;
      } catch {
        // ignore
      }

      try {
        const cookies = document.cookie.split(";");
        for (const raw of cookies) {
          const cookie = raw.trim();
          const names = [AURORA_THEME_COOKIE_NAME, AURORA_THEME_STORAGE_KEY];
          const match = names.find((n) => cookie.startsWith(`${n}=`));
          if (!match) continue;

          const value = cookie.slice(match.length + 1);
          const decoded = (() => {
            try {
              return decodeURIComponent(value);
            } catch {
              return value;
            }
          })();

          if (decoded && isValidThemeId(decoded)) return true;
        }
      } catch {
        // ignore
      }

      return false;
    }

    async function sync() {
      try {
        const env = await getAppSpec();
        const remoteThemeId = env.spec?.project?.theme?.palette;
        const localThemeId = themeIdRef.current;
        const localExplicit = hasLocalThemeStored();

        const resolvedRemote =
          typeof remoteThemeId === "string" && remoteThemeId.length && isValidThemeId(remoteThemeId)
            ? remoteThemeId
            : null;

        if (!localExplicit) {
          if (resolvedRemote && resolvedRemote !== localThemeId) setTheme(resolvedRemote);
          return;
        }

        const normalizedLocal = isValidThemeId(localThemeId) ? localThemeId : DEFAULT_AURORA_THEME_ID;
        if (resolvedRemote === normalizedLocal) return;

        try {
          await upsertAppSpec({
            ...env.spec,
            project: {
              ...env.spec.project,
              theme: {
                ...env.spec.project.theme,
                palette: normalizedLocal,
              },
            },
          });
        } catch {
          // best-effort
        }
      } catch {
        // best-effort
      }
    }

    void sync();
  }, [setTheme]);

  return null;
}
