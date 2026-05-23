import type { Metadata } from "next";

import { getPublicProjectInfo } from "@/lib/site/project";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default async function MentionsLegalesPage() {
  const project = await getPublicProjectInfo();

  return (
    <div className="container py-10 md:py-14">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_60px_rgba(120,83,98,0.10)] backdrop-blur md:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Mentions légales</p>
        <h1 className="mt-3 font-serif text-4xl text-zinc-900">Informations légales provisoires</h1>
        <p className="mt-4 text-sm leading-7 text-zinc-600 md:text-base">
          Cette page correspond à la version provisoire de {project.title} pendant sa phase de développement et de pré-lancement.
          Les informations administratives qui ne sont pas encore applicables seront complétées avant toute ouverture
          commerciale effective.
        </p>

        <div className="mt-8 space-y-8 text-sm leading-7 text-zinc-600">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Éditeur du site</h2>
            <ul className="space-y-2">
              <li>
                <span className="font-medium text-zinc-900">Nom du site :</span> {project.title}
              </li>
              <li>
                <span className="font-medium text-zinc-900">Éditrice :</span> Eva Rey
              </li>
              <li>
                <span className="font-medium text-zinc-900">Statut actuel :</span> particulier, projet en cours de création
              </li>
              <li>
                <span className="font-medium text-zinc-900">Email de contact :</span> contact@mes-fragrances.com
              </li>
              <li>
                <span className="font-medium text-zinc-900">Directrice de la publication :</span> Eva Rey
              </li>
              <li>
                <span className="font-medium text-zinc-900">Adresse postale :</span> à compléter avant ouverture commerciale
              </li>
              <li>
                <span className="font-medium text-zinc-900">SIREN / SIRET :</span> non applicable à ce jour
              </li>
              <li>
                <span className="font-medium text-zinc-900">RCS / ville d&apos;immatriculation :</span> non applicable à ce jour
              </li>
              <li>
                <span className="font-medium text-zinc-900">TVA intracommunautaire :</span> non applicable à ce jour
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Hébergement</h2>
            <ul className="space-y-2">
              <li>
                <span className="font-medium text-zinc-900">Hébergeur :</span> OVH SAS
              </li>
              <li>
                <span className="font-medium text-zinc-900">Adresse :</span> 2 rue Kellermann, 59100 Roubaix, France
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Objet du site</h2>
            <p>
              {project.title} est un site éditorial consacré à l&apos;univers du parfum. Le site a vocation à proposer des contenus
              d&apos;information, des recommandations, un test de personnalité olfactive, des fiches produits et, le cas échéant,
              des liens vers des sites partenaires.
            </p>
            <p>
              {project.title} ne vend pas directement de produits et n&apos;encaisse pas de paiement pour le compte des marques ou
              boutiques partenaires.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Transparence éditoriale et affiliation</h2>
            <p>
              Certains liens présents sur le site peuvent être des liens affiliés. Cela signifie que {project.title} peut
              percevoir une commission si vous cliquez sur un lien partenaire puis réalisez un achat, sans surcoût pour vous.
            </p>
            <p>
              Le recours à l&apos;affiliation n&apos;a pas vocation à modifier le prix affiché au visiteur. Lorsqu&apos;une relation
              commerciale existe avec un partenaire, le site s&apos;efforce de le signaler de manière claire et compréhensible.
            </p>
            <p>
              Le dispositif d&apos;affiliation du site, notamment via des plateformes ou partenaires marchands tels qu&apos;Awin,
              pourra évoluer au fil du lancement et de l&apos;enrichissement du catalogue.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Propriété intellectuelle</h2>
            <p>
              Sauf mention contraire, les textes, éléments graphiques, visuels, logos, bases éditoriales et éléments de
              présentation présents sur {project.title} sont protégés par le droit de la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, adaptation, diffusion ou réutilisation, totale ou partielle, sans autorisation préalable,
              est interdite, à l&apos;exception des cas autorisés par la loi. Les marques, visuels et dénominations de tiers
              demeurent la propriété de leurs titulaires respectifs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Responsabilité</h2>
            <p>
              Les contenus publiés sur {project.title} sont fournis à titre informatif et éditorial. Malgré le soin apporté à
              leur rédaction, ils peuvent évoluer, comporter des imprécisions ou devenir obsolètes.
            </p>
            <p>
              Lorsqu&apos;un lien renvoie vers un site tiers, {project.title} n&apos;exerce aucun contrôle sur le contenu, les
              disponibilités, les conditions commerciales, les politiques de confidentialité ou les pratiques de ce site tiers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Mise à jour</h2>
            <p>
              La présente page est destinée à être complétée et mise à jour au fur et à mesure de la création et de la
              structuration juridique du projet.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
