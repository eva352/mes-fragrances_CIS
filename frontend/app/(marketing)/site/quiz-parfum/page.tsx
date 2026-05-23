import type { Metadata } from "next";

import { QuizWizard } from "@/components/site/quiz-wizard";
import { getPublicProjectInfo } from "@/lib/site/project";

export async function generateMetadata(): Promise<Metadata> {
  const project = await getPublicProjectInfo();
  return {
    title: `Test de personnalité olfactive | ${project.title}`,
    description: `Un test de personnalité olfactive pour découvrir son profil, comprendre ses goûts et trouver jusqu'à 3 parfums cohérents sur ${project.title}.`,
  };
}

export default async function QuizPage() {
  return (
    <div className="container py-10 md:py-14">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Test de personnalité olfactive</p>
          <h1 className="font-serif text-4xl text-zinc-900 md:text-5xl">
            Découvre le profil olfactif qui te ressemble.
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-zinc-600 md:text-base">
            Le parcours prend le temps de comprendre tes goûts, ton usage et ta personnalité, puis fait ressortir un profil principal avant de proposer jusqu&apos;à 3 parfums cohérents avec ton univers.
          </p>
        </div>

        <QuizWizard />
      </div>
    </div>
  );
}
