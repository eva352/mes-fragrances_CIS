import type { Metadata } from "next";

import { getPublicProjectInfo } from "@/lib/site/project";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default async function MentionsLegalesPage() {
  const project = await getPublicProjectInfo();

  return (
    <div className="container py-10 md:py-14">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_60px_rgba(120,83,98,0.10)] backdrop-blur md:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Mentions légales</p>
        <h1 className="mt-3 font-serif text-4xl text-zinc-900">Informations éditoriales</h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-zinc-600">
          <p>
            Les informations légales complètes de l’éditeur de {project.title} doivent être ajoutées avant la mise en ligne finale.
          </p>
          <p>
            À compléter : raison sociale, adresse, contact, directeur de publication, hébergeur et toute mention obligatoire selon le contexte réel du projet.
          </p>
          <p>
            Cette page existe déjà dans le MVP pour réserver la structure, les liens de footer et les emplacements nécessaires.
          </p>
        </div>
      </div>
    </div>
  );
}
