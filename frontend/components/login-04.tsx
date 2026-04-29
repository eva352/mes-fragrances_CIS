"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APP_NAME } from "@/lib/brand";

type Login04Props = {
  onLogin: (email: string, password: string) => Promise<void>;
  error?: string | null;
};

export function Login04({ onLogin, error }: Login04Props) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const form = new FormData(event.currentTarget);
      const email = String(form.get("email") ?? "").trim();
      const password = String(form.get("password") ?? "");
      await onLogin(email, password);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border bg-card p-6 shadow-lg form-shell">
      <div className="mb-6 text-center space-y-1">
        <h2 className="text-xl font-semibold text-foreground">Connexion {APP_NAME}</h2>
        <p className="text-sm text-muted-foreground">
          Renseignez vos identifiants pour acceder au tableau de bord.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="vous@exemple.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            autoComplete="current-password"
            required
          />
        </div>

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {APP_NAME}. Tous droits reserves.
      </p>
    </div>
  );
}
