"use client";

import { useState } from "react";
import { Login04 } from "@/components/login-04";
import { useAuth } from "@/lib/auth/context";
import { APP_NAME } from "@/lib/brand";

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Chargement...
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    try {
      await login({ email, password });
    } catch (e) {
      console.error(e);
      setError("Identifiants invalides ou erreur de connexion.");
    }
  };

  return (
    <div className="login-gradient flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6 rounded-3xl border border-border bg-card/90 p-10 shadow-2xl backdrop-blur">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary-foreground">
            {APP_NAME}
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Connexion</h1>
          <p className="text-sm text-muted-foreground">
            Acces simple via e-mail et mot de passe pour entrer dans le dashboard.
          </p>
        </div>
        <Login04 onLogin={handleLogin} error={error} />
      </div>
    </div>
  );
}
