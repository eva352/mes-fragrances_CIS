import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies",
};

export default function CookiesPage() {
  return (
    <div className="container py-10 md:py-14">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_60px_rgba(120,83,98,0.10)] backdrop-blur md:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Cookies</p>
        <h1 className="mt-3 font-serif text-4xl text-zinc-900">Information cookies</h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-zinc-600">
          <p>
            Cette page est prête pour le MVP si un bandeau cookies ou des scripts de mesure sont ajoutés plus tard.
          </p>
          <p>
            Si aucun cookie non essentiel n’est activé au lancement, la page peut rester simple et être enrichie seulement au moment où des outils de mesure ou de publicité seront branchés.
          </p>
        </div>
      </div>
    </div>
  );
}
