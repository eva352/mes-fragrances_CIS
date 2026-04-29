import type { Metadata } from "next";
import Link from "next/link";

import { PerfumeCard } from "@/components/site/perfume-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getFeaturedPerfumes, type FeaturedPerfumes } from "@/lib/api/public-perfumes";
import { getPublicProjectInfo } from "@/lib/site/project";

export const dynamic = "force-dynamic";

const FRAGRANCE_UNIVERSES = [
  {
    title: "Floral poudré",
    description: "Des sillages délicats, romantiques et lumineux pour une féminité douce.",
  },
  {
    title: "Musqué propre",
    description: "Une sensation de peau élégante, moderne et rassurante au quotidien.",
  },
  {
    title: "Boisé velours",
    description: "Des signatures plus profondes, raffinées et sensuelles sans lourdeur.",
  },
  {
    title: "Fruité chic",
    description: "Un éclat plus vivant, féminin et joyeux avec une gourmandise maîtrisée.",
  },
];

async function loadFeatured(): Promise<FeaturedPerfumes> {
  try {
    return await getFeaturedPerfumes();
  } catch {
    return { newArrivals: [], bestSellers: [] };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const project = await getPublicProjectInfo();
  return {
    title: `${project.title} | Trouver un parfum et comparer les offres`,
    description:
      project.oneLiner ||
      `${project.title} aide à découvrir des parfums, faire un test de personnalité olfactif et comparer simplement les offres partenaires.`,
  };
}

export default async function SiteHomePage() {
  const [project, featured] = await Promise.all([getPublicProjectInfo(), loadFeatured()]);
  const newArrivals = featured.newArrivals.slice(0, 4);
  const bestSellers = featured.bestSellers.slice(0, 4);

  return (
    <div className="pb-20">
      <section className="relative">
        <div
          className="relative min-h-[78vh] overflow-hidden border-b border-[hsla(var(--mf-line),0.72)] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/branding/fleur-hero.png')" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,251,248,0.96)_0%,rgba(255,247,244,0.86)_26%,rgba(255,244,243,0.54)_44%,rgba(255,244,243,0.14)_66%,rgba(255,244,243,0.12)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(255,255,255,0.56),transparent_42%)]" />

          <div className="container relative flex min-h-[78vh] items-center py-16 md:py-20">
            <div className="max-w-2xl space-y-6 md:space-y-8">
              <p className="text-sm uppercase tracking-[0.32em] text-[hsl(var(--mf-ink-soft))]">
                Univers parfum · féminin · premium
              </p>

              <div className="space-y-4">
                <h1 className="font-serif text-5xl leading-[0.92] tracking-[-0.04em] text-[hsl(var(--mf-ink))] sm:text-6xl lg:text-[5.4rem]">
                  Trouvez votre
                  <span className="block text-[hsl(var(--mf-rose-strong))]">parfum idéal</span>
                </h1>
                <p className="max-w-xl text-lg leading-8 text-[hsl(var(--mf-ink-soft))]">
                  Découvrez une sélection de fragrances pensées pour révéler votre personnalité, affiner vos envies et comparer les meilleures offres avec plus de douceur et plus d'inspiration.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="rounded-full px-8 py-6 text-base shadow-[0_18px_36px_rgba(197,149,161,0.26)]"
                >
                  <Link href="/site/quiz-parfum">Commencer le test</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/80 bg-white/58 px-8 py-6 text-base text-[hsl(var(--mf-ink))] backdrop-blur hover:bg-white/72"
                >
                  <Link href="/site#nouveautes">Découvrir les nouveautés</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="nouveautes" className="container py-12 md:py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--mf-ink-soft))]">Nouveautés</p>
            <h2 className="mt-3 font-serif text-4xl text-[hsl(var(--mf-ink))] md:text-5xl">
              Les nouveautés à découvrir en ce moment
            </h2>
            <p className="mt-4 text-sm leading-7 text-[hsl(var(--mf-ink-soft))] md:text-base">
              Une sélection de fragrances à explorer dans un univers plus inspirant que marchand, avec une lecture claire des parfums et de leurs offres.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="rounded-full border-[hsl(var(--mf-rose))] bg-white/72 px-6 text-[hsl(var(--mf-ink))] hover:bg-white"
          >
            <Link href="/site/recherche">Explorer tous les parfums</Link>
          </Button>
        </div>

        {newArrivals.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {newArrivals.map((perfume) => (
              <PerfumeCard key={perfume.slug} perfume={perfume} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2.2rem] border border-dashed border-[hsl(var(--mf-line))] bg-white/58 p-8 text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
            Les nouveautés apparaîtront ici à mesure que le catalogue sera enrichi.
          </div>
        )}
      </section>

      <section className="container py-4 md:py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {FRAGRANCE_UNIVERSES.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-[hsla(var(--mf-line),0.72)] bg-white/62 px-5 py-6 shadow-[0_18px_42px_rgba(176,138,139,0.08)] backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.26em] text-[hsl(var(--mf-ink-soft))]">Univers</p>
              <h3 className="mt-3 font-serif text-[1.95rem] leading-tight text-[hsl(var(--mf-ink))]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="overflow-hidden rounded-[3rem] border border-[hsla(var(--mf-line),0.75)] bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,243,244,0.8)_52%,rgba(255,236,240,0.72)_100%)] px-6 py-8 shadow-[0_28px_72px_rgba(176,138,139,0.12)] md:px-10 md:py-10">
          <div className="grid gap-8 xl:grid-cols-[1fr_0.88fr] xl:items-center">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--mf-ink-soft))]">Test de personnalité olfactif</p>
              <h2 className="font-serif text-4xl leading-tight text-[hsl(var(--mf-ink))] md:text-5xl">
                Un test pensé pour révéler votre univers olfactif
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[hsl(var(--mf-ink-soft))] md:text-base">
                En quelques questions, le site fait émerger un profil, suggère jusqu'à trois parfums cohérents et vous aide ensuite à comparer les offres disponibles.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-6 shadow-[0_18px_30px_rgba(197,149,161,0.22)]">
                  <Link href="/site/quiz-parfum">Faire le test</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="rounded-full px-5 text-[hsl(var(--mf-ink-soft))] hover:bg-white/55 hover:text-[hsl(var(--mf-ink))]"
                >
                  <Link href="/site/quiz-parfum">Voir le parcours</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
              {[
                ["01", "Répondre", "15 questions simples et mobiles pour mieux capter vos goûts."],
                ["02", "Comprendre", "Un profil pour donner du sens à la recommandation finale."],
                ["03", "Comparer", "Jusqu'à 3 suggestions puis les offres quand elles sont disponibles."],
              ].map(([step, title, description]) => (
                <div
                  key={step}
                  className="rounded-[1.9rem] border border-[hsla(var(--mf-line),0.72)] bg-white/56 px-5 py-5 backdrop-blur"
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--mf-ink-soft))]">{step}</p>
                  <h3 className="mt-3 font-serif text-2xl text-[hsl(var(--mf-ink))]">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="meilleures-ventes" className="container py-12 md:py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--mf-ink-soft))]">Meilleures ventes</p>
            <h2 className="mt-3 font-serif text-4xl text-[hsl(var(--mf-ink))] md:text-5xl">
              Les signatures les plus désirées
            </h2>
            <p className="mt-4 text-sm leading-7 text-[hsl(var(--mf-ink-soft))] md:text-base">
              Une sélection des références les plus recherchées, présentées dans une logique élégante, lisible et toujours centrée sur le parfum.
            </p>
          </div>
        </div>

        {bestSellers.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {bestSellers.map((perfume) => (
              <PerfumeCard key={perfume.slug} perfume={perfume} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2.2rem] border border-dashed border-[hsl(var(--mf-line))] bg-white/58 p-8 text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
            Les meilleures ventes apparaîtront ici lorsque les références et les données d'offres seront complétées.
          </div>
        )}
      </section>

      <section className="container py-12 md:py-16">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--mf-ink-soft))]">FAQ</p>
          <h2 className="mt-2 font-serif text-4xl text-[hsl(var(--mf-ink))] md:text-5xl">Questions fréquentes</h2>
        </div>
        <Accordion
          type="single"
          collapsible
          className="rounded-[2.5rem] border border-[hsla(var(--mf-line),0.82)] bg-white/72 px-6 shadow-[0_28px_72px_rgba(176,138,139,0.10)] backdrop-blur"
        >
          <AccordionItem value="quiz">
            <AccordionTrigger className="text-left text-base font-medium text-[hsl(var(--mf-ink))]">
              À quoi sert le test de personnalité olfactif ?
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
              Il aide à faire ressortir un profil à partir de vos goûts, de votre personnalité et de votre usage, puis propose jusqu'à trois parfums cohérents.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="search">
            <AccordionTrigger className="text-left text-base font-medium text-[hsl(var(--mf-ink))]">
              Comment fonctionne la recherche ?
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
              La recherche du MVP reste volontairement simple : nom, marque, famille olfactive ou notes principales pour aller vite à l'essentiel.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="partners">
            <AccordionTrigger className="text-left text-base font-medium text-[hsl(var(--mf-ink))]">
              Comment fonctionnent les liens partenaires ?
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
              Quand vous cliquez sur une offre, vous quittez le site pour rejoindre une boutique partenaire. {project.title} ne gère ni panier ni paiement.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="editorial">
            <AccordionTrigger className="text-left text-base font-medium text-[hsl(var(--mf-ink))]">
              Pourquoi garder une approche éditoriale et légère ?
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
              Parce que le but est d'aider à choisir avec plus d'inspiration et moins de friction, sans transformer l'expérience en faux tunnel e-commerce.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
