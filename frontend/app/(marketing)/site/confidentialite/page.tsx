import type { Metadata } from "next";

import { getPublicProjectInfo } from "@/lib/site/project";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default async function ConfidentialitePage() {
  const project = await getPublicProjectInfo();

  return (
    <div className="container py-10 md:py-14">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_60px_rgba(120,83,98,0.10)] backdrop-blur md:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Confidentialité</p>
        <h1 className="mt-3 font-serif text-4xl text-zinc-900">Protection des données</h1>
        <p className="mt-4 text-sm leading-7 text-zinc-600 md:text-base">
          Cette politique de confidentialité décrit la manière dont {project.title} traite les données personnelles dans sa
          version actuelle de pré-lancement. Elle a vocation à être mise à jour en cas d'évolution du projet, notamment lors
          de l'ajout d'un formulaire de contact complet, d'outils de mesure d'audience, de pixels publicitaires ou d'un
          dispositif d'affiliation actif à grande échelle.
        </p>

        <div className="mt-8 space-y-8 text-sm leading-7 text-zinc-600">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Responsable du traitement</h2>
            <ul className="space-y-2">
              <li>
                <span className="font-medium text-zinc-900">Responsable :</span> Eva Rey
              </li>
              <li>
                <span className="font-medium text-zinc-900">Statut :</span> particulier, projet en cours de création
              </li>
              <li>
                <span className="font-medium text-zinc-900">Contact :</span> contact@mes-fragrances.com
              </li>
              <li>
                <span className="font-medium text-zinc-900">Adresse postale :</span> à compléter avant ouverture commerciale
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Données susceptibles d'être traitées</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>les données techniques de navigation et de sécurité nécessaires au bon fonctionnement du site ;</li>
              <li>les requêtes de recherche effectuées par l'utilisateur dans le moteur de recherche interne ;</li>
              <li>
                les réponses fournies au quiz parfum, utilisées pour calculer et afficher une recommandation personnalisée ;
              </li>
              <li>
                à terme, les données qu'un visiteur choisira volontairement de transmettre via un formulaire de contact,
                lorsque celui-ci sera effectivement mis en place.
              </li>
            </ul>
            <p>
              À ce stade, le site ne prévoit pas de compte utilisateur et ne propose pas de newsletter dans le périmètre du
              MVP.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Finalités et bases légales</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>fournir les fonctionnalités demandées par l'utilisateur, comme la recherche et le quiz parfum ;</li>
              <li>répondre aux demandes adressées via les moyens de contact lorsqu'ils seront activés ;</li>
              <li>assurer la sécurité du site, prévenir les abus et maintenir son bon fonctionnement technique ;</li>
              <li>garantir la transparence éditoriale et, le cas échéant, la bonne attribution de certains liens affiliés.</li>
            </ul>
            <p>
              Les traitements reposent, selon les cas, sur votre demande explicite d'utiliser un service du site, sur votre
              consentement lorsque vous transmettez volontairement des informations, ou sur l'intérêt légitime de l'éditrice
              à sécuriser et administrer le service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Destinataires des données</h2>
            <p>
              Les données sont destinées uniquement à l'éditrice du site et, dans la limite de leurs besoins respectifs, aux
              prestataires techniques indispensables à l'hébergement, à la maintenance et à la sécurité de {project.title}.
            </p>
            <p>
              Les données personnelles ne sont pas vendues ni louées. Lorsque vous quittez le site via un lien partenaire ou
              un lien affilié, le site tiers ou le réseau d'affiliation concerné agit ensuite selon sa propre politique de
              confidentialité.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Durées de conservation</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                les réponses au quiz n'ont pas vocation, dans la version actuelle du site, à être rattachées à un compte
                utilisateur ni conservées au-delà du temps technique nécessaire à la génération de la recommandation ;
              </li>
              <li>
                les requêtes et données techniques de navigation peuvent être conservées pour la durée nécessaire à
                l'exploitation, à la sécurité et au diagnostic technique du site ;
              </li>
              <li>
                les futures demandes de contact, lorsqu'un formulaire sera mis en place, auront vocation à être conservées
                pendant la durée nécessaire au traitement de la demande puis, au maximum, pendant douze mois après le dernier
                échange, sauf obligation légale contraire.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Affiliation et liens vers des sites tiers</h2>
            <p>
              {project.title} pourra intégrer des liens d'affiliation, notamment via des plateformes comme Awin. Le clic sur
              ces liens peut permettre l'attribution d'une visite ou d'une vente à un partenaire affilié. Les traitements mis
              en œuvre après votre arrivée sur un site partenaire relèvent de ce partenaire ou du réseau concerné, et non de
              {project.title}.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Vos droits</h2>
            <p>
              Conformément à la réglementation applicable, vous pouvez demander l'accès à vos données, leur rectification,
              leur effacement, la limitation de leur traitement, ou vous opposer à certains traitements lorsque cela est
              possible.
            </p>
            <p>
              Pour exercer vos droits ou poser une question relative à la confidentialité, vous pouvez écrire à :
              <span className="font-medium text-zinc-900"> contact@mes-fragrances.com</span>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Évolutions de la présente politique</h2>
            <p>
              Cette politique sera mise à jour avant le lancement commercial du site et à chaque évolution significative des
              traitements, notamment en cas d'ajout d'un formulaire de contact complet, d'outils d'analyse d'audience, de
              pixels publicitaires ou d'un espace utilisateur.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
