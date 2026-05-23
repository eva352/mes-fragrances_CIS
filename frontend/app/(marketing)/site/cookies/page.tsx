import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies",
};

export default function CookiesPage() {
  return (
    <div className="container py-10 md:py-14">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_60px_rgba(120,83,98,0.10)] backdrop-blur md:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Cookies</p>
        <h1 className="mt-3 font-serif text-4xl text-zinc-900">Cookies et autres traceurs</h1>
        <p className="mt-4 text-sm leading-7 text-zinc-600 md:text-base">
          Cette page décrit l'utilisation actuelle des cookies, du stockage local et des traceurs sur le site dans sa version
          de pré-lancement. Elle sera mise à jour si de nouveaux outils sont activés.
        </p>

        <div className="mt-8 space-y-8 text-sm leading-7 text-zinc-600">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">État actuel du site</h2>
            <p>
              À ce jour, {`mes-fragrances`} est conçu pour fonctionner sans dispositif publicitaire, sans newsletter et sans
              compte utilisateur. Aucun outil de mesure d'audience ou pixel marketing n'est prévu comme actif par défaut dans
              la version actuelle du MVP.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Traceurs fonctionnels actuellement utilisés</h2>
            <p>
              Le site peut utiliser des cookies ou éléments de stockage strictement nécessaires à son fonctionnement, à
              l'affichage et à la mémorisation de certaines préférences d'interface.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="font-medium text-zinc-900">pilot_theme</span> : mémorisation de la préférence de thème ou
                d'ambiance visuelle du site ;
              </li>
              <li>
                <span className="font-medium text-zinc-900">aurora_stack_color_mode</span> et éléments de stockage local
                associés : conservation de certaines préférences d'affichage lorsque cela est nécessaire au confort de
                navigation.
              </li>
            </ul>
            <p>
              Ces traceurs n'ont pas pour objet de profiler l'utilisateur à des fins publicitaires.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Aucun traceur publicitaire activé à ce stade</h2>
            <p>
              Dans la version actuelle du site, Google Analytics, Meta Pixel et autres outils comparables ne sont pas
              activés. Si un outil de mesure d'audience, de retargeting ou de publicité est ajouté plus tard, la présente
              page sera mise à jour et un mécanisme de consentement sera mis en place lorsque la réglementation l'exigera.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Liens partenaires et sites tiers</h2>
            <p>
              Le site pourra contenir des liens vers des partenaires marchands ou vers des réseaux d'affiliation. Lorsque
              vous cliquez sur un lien sortant, le site tiers que vous rejoignez peut déposer ses propres cookies ou traceurs.
              Ces traitements relèvent alors de la politique de confidentialité et de la politique cookies du site tiers
              concerné.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-zinc-900">Mise à jour</h2>
            <p>
              Cette page est volontairement modulaire afin de pouvoir être complétée rapidement lors de l'ajout d'un outil
              d'analyse d'audience, d'un pixel publicitaire ou d'un dispositif d'affiliation plus avancé.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
