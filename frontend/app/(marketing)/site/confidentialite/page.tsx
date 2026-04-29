import type { Metadata } from "next";

import { getPublicProjectInfo } from "@/lib/site/project";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default async function ConfidentialitePage() {
  const project = await getPublicProjectInfo();

  return (
    <div className="container py-10 md:py-14">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_60px_rgba(120,83,98,0.10)] backdrop-blur md:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Confidentialité</p>
        <h1 className="mt-3 font-serif text-4xl text-zinc-900">Protection des données</h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-zinc-600">
          <p>
            {project.title} devra afficher ici la politique de confidentialité complète avant publication finale, avec les traitements réels, la base légale, la durée de conservation et les droits des personnes.
          </p>
          <p>
            Dans le MVP actuel, la page sert de structure prête à compléter. Elle accompagne aussi la transparence sur l’éventuelle collecte minimale liée au formulaire de recherche, au quiz ou aux statistiques futures.
          </p>
        </div>
      </div>
    </div>
  );
}
