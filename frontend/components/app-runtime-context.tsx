"use client";

import * as React from "react";

import type { AppSpec, AppSpecEnvelope } from "@/lib/api/app-spec";

type AppRuntimeContextValue = {
  envelope: AppSpecEnvelope;
  setSpec: (spec: AppSpec) => void;
};

const AppRuntimeContext = React.createContext<AppRuntimeContextValue | null>(
  null,
);

export function AppRuntimeProvider({
  envelope,
  onSetSpec,
  children,
}: {
  envelope: AppSpecEnvelope;
  onSetSpec: (spec: AppSpec) => void;
  children: React.ReactNode;
}) {
  const setSpec = React.useCallback(
    (spec: AppSpec) => onSetSpec(spec),
    [onSetSpec],
  );

  return (
    <AppRuntimeContext.Provider value={{ envelope, setSpec }}>
      {children}
    </AppRuntimeContext.Provider>
  );
}

export function useAppRuntime() {
  const ctx = React.useContext(AppRuntimeContext);
  if (!ctx) {
    throw new Error("useAppRuntime must be used within AppRuntimeProvider");
  }
  return ctx;
}

