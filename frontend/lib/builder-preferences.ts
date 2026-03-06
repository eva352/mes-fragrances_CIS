import * as React from "react";

type BuilderKey = "webapp" | "website" | "brief";

type BuilderPreferences = Record<BuilderKey, boolean>;

const BUILDER_PREFERENCES_STORAGE_KEY = "aurora_stack_builders";
const DEFAULT_BUILDER_PREFERENCES: BuilderPreferences = {
  webapp: true,
  website: true,
  brief: true,
};
const BUILDER_PREFERENCES_POLL_MS = 500;

function readStoredPreferences(): BuilderPreferences {
  if (typeof window === "undefined") return DEFAULT_BUILDER_PREFERENCES;
  try {
    const raw = window.localStorage.getItem(BUILDER_PREFERENCES_STORAGE_KEY);
    if (!raw) return DEFAULT_BUILDER_PREFERENCES;
    const parsed = JSON.parse(raw) as Partial<BuilderPreferences>;
    return { ...DEFAULT_BUILDER_PREFERENCES, ...parsed };
  } catch {
    return DEFAULT_BUILDER_PREFERENCES;
  }
}

function writeStoredPreferences(prefs: BuilderPreferences) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    BUILDER_PREFERENCES_STORAGE_KEY,
    JSON.stringify(prefs),
  );
}

function arePreferencesEqual(a: BuilderPreferences, b: BuilderPreferences) {
  return a.webapp === b.webapp && a.website === b.website && a.brief === b.brief;
}

export function useBuilderPreferences() {
  const [prefs, setPrefs] = React.useState<BuilderPreferences>(() =>
    readStoredPreferences(),
  );

  React.useEffect(() => {
    writeStoredPreferences(prefs);
  }, [prefs]);

  React.useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage) return;
      if (event.key !== BUILDER_PREFERENCES_STORAGE_KEY) return;
      setPrefs(readStoredPreferences());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const interval = window.setInterval(() => {
      const stored = readStoredPreferences();
      setPrefs((prev) =>
        arePreferencesEqual(prev, stored) ? prev : stored,
      );
    }, BUILDER_PREFERENCES_POLL_MS);
    return () => window.clearInterval(interval);
  }, []);

  const setBuilderEnabled = React.useCallback(
    (builder: BuilderKey, enabled: boolean) => {
      setPrefs((prev) => {
        if (prev[builder] === enabled) return prev;
        return { ...prev, [builder]: enabled };
      });
    },
    [],
  );

  return { prefs, setBuilderEnabled };
}
