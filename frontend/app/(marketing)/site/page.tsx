import type { Metadata } from "next";
import Link from "next/link";

import { PerfumeCard } from "@/components/site/perfume-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { loadCatalogPerfumes } from "@/lib/site/featured";
import { PUBLIC_PATHS } from "@/lib/site/public-paths";
import { getPublicProjectInfo } from "@/lib/site/project";

export const dynamic = "force-dynamic";

const FRAGRANCE_UNIVERSES = [
  {
    title: "Floral poudré",
    description: "Des sillages délicats, romantiques et lumineux pour une féminité douce.",
    query: "floral poudre",
    highlights: ["doux", "romantique", "lumineux"],
  },
  {
    title: "Musqué propre",
    description: "Une sensation de peau élégante, moderne et rassurante au quotidien.",
    query: "musque propre",
    highlights: ["propre", "moderne", "quotidien"],
  },
  {
    title: "Boisé velours",
    description: "Des signatures plus profondes, raffinées et sensuelles sans lourdeur.",
    query: "boise ambre",
    highlights: ["profond", "sensuel", "raffiné"],
  },
  {
    title: "Fruité chic",
    description: "Un éclat plus vivant, féminin et joyeux avec une gourmandise maîtrisée.",
    query: "fruite floral",
    highlights: ["petillant", "feminin", "joyeux"],
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const project = await getPublicProjectInfo();
  return {
    title: `${project.title} | Trouver le parfum qui vous ressemble`,
    description:
      project.oneLiner ||
      `${project.title} aide à découvrir son profil olfactif, trouver des parfums cohérents et explorer ensuite les offres partenaires disponibles.`,
    alternates: {
      canonical: PUBLIC_PATHS.home,
    },
  };
}

export default async function SiteHomePage() {
  const [project, catalogPreview] = await Promise.all([
    getPublicProjectInfo(),
    loadCatalogPerfumes(8, { withOffersOnly: true }),
  ]);

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
              <div className="space-y-4">
                <h1 className="font-serif text-5xl leading-[0.92] tracking-[-0.04em] text-[hsl(var(--mf-ink))] sm:text-6xl lg:text-[5.4rem]">
                  Trouvez le
                  <span className="block text-[hsl(var(--mf-rose-strong))]">parfum qui vous ressemble</span>
                </h1>
                <p className="max-w-xl text-lg leading-8 text-[hsl(var(--mf-ink-soft))]">
                  Répondez à notre test de personnalité olfactive pour découvrir les familles de parfums qui vous correspondent et trouver plus facilement votre prochain parfum.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="rounded-full border border-white/70 !bg-[linear-gradient(135deg,hsl(var(--mf-rose-strong))_0%,hsl(var(--mf-rose))_100%)] px-8 py-6 text-base font-semibold tracking-[0.01em] text-white shadow-[0_22px_48px_rgba(180,116,135,0.34)] ring-1 ring-white/55 transition-all duration-200 hover:-translate-y-0.5 hover:!bg-[linear-gradient(135deg,hsl(var(--mf-rose-strong))_0%,hsl(var(--mf-rose))_100%)] hover:shadow-[0_28px_60px_rgba(180,116,135,0.42)]"
                >
                  <Link href={PUBLIC_PATHS.quiz}>Faire le test</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-[hsla(var(--mf-petal),0.5)] bg-[hsla(var(--mf-cream),0.7)] px-8 py-6 text-base text-[hsl(var(--mf-ink))] backdrop-blur hover:bg-[hsla(var(--mf-blush),0.46)]"
                >
                  <Link href={PUBLIC_PATHS.catalog}>Explorer nos parfums</Link>
                </Button>
              </div>

              <p className="max-w-xl text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
                Un test simple pour mieux comprendre vos préférences olfactives et découvrir des parfums adaptés à votre profil.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="nos-parfums" className="container py-12 md:py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--mf-ink-soft))]">Nos parfums</p>
            <h2 className="mt-3 font-serif text-4xl text-[hsl(var(--mf-ink))] md:text-5xl">
              Une sélection à explorer selon vos envies
            </h2>
            <p className="mt-4 text-sm leading-7 text-[hsl(var(--mf-ink-soft))] md:text-base">
              Explorez librement notre sélection par genre, famille olfactive et univers. Une autre façon de découvrir des fragrances si vous préférez chercher par vous-même.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="rounded-full border-[hsl(var(--mf-rose))] bg-[hsla(var(--mf-cream),0.74)] px-6 text-[hsl(var(--mf-ink))] hover:bg-[hsla(var(--mf-blush),0.46)]"
          >
            <Link href={PUBLIC_PATHS.catalog}>Voir tout le catalogue</Link>
          </Button>
        </div>

        {catalogPreview.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {catalogPreview.map((perfume) => (
              <PerfumeCard key={perfume.slug} perfume={perfume} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2.2rem] border border-dashed border-[rgba(154,78,99,0.22)] bg-[rgba(255,255,255,0.62)] p-8 text-sm leading-7 text-[hsl(var(--mf-ink-soft))] backdrop-blur-[6px]">
            Aucune sélection avec offre partenaire n&apos;est disponible pour le moment.
          </div>
        )}
      </section>

      <section className="container py-4 md:py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {FRAGRANCE_UNIVERSES.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-[rgba(154,78,99,0.22)] bg-[rgba(255,255,255,0.62)] px-5 py-6 shadow-[0_18px_42px_rgba(116,54,71,0.08)] backdrop-blur-[6px]"
            >
              <p className="text-xs uppercase tracking-[0.26em] text-[hsl(var(--mf-ink-soft))]">Univers</p>
              <h3 className="mt-3 font-serif text-[1.95rem] leading-tight text-[hsl(var(--mf-ink))]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <span
                    key={`${item.title}-${highlight}`}
                    className="rounded-full bg-[hsla(var(--mf-blush),0.72)] px-3 py-1 text-xs uppercase tracking-[0.14em] text-[hsl(var(--mf-ink-soft))]"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
              <Button
                asChild
                variant="ghost"
                className="mt-5 rounded-full px-0 text-[hsl(var(--mf-rose-strong))] hover:bg-transparent hover:text-[hsl(var(--mf-rose-strong))]"
              >
                <Link href={`${PUBLIC_PATHS.search}?q=${encodeURIComponent(item.query)}`}>Explorer cet univers</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="overflow-hidden rounded-[3rem] border border-[rgba(154,78,99,0.2)] bg-[rgba(255,255,255,0.44)] px-6 py-8 shadow-[0_28px_72px_rgba(116,54,71,0.10)] backdrop-blur-[6px] md:px-10 md:py-10">
          <div className="grid gap-8 xl:grid-cols-[1fr_0.88fr] xl:items-center">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--mf-ink-soft))]">Test de personnalité olfactif</p>
              <h2 className="font-serif text-4xl leading-tight text-[hsl(var(--mf-ink))] md:text-5xl">
                Une façon plus simple de choisir son parfum
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[hsl(var(--mf-ink-soft))] md:text-base">
                En quelques questions, le test fait émerger un profil olfactif, aide à mieux comprendre vos goûts et propose ensuite des parfums cohérents avec votre sensibilité.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-6 shadow-[0_18px_30px_rgba(197,149,161,0.22)]">
                  <Link href={PUBLIC_PATHS.quiz}>Faire le test</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="rounded-full px-5 text-[hsl(var(--mf-ink-soft))] hover:bg-[hsla(var(--mf-cream),0.62)] hover:text-[hsl(var(--mf-ink))]"
                >
                  <Link href={PUBLIC_PATHS.quiz}>Découvrir mon profil</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
              {[
                ["01", "Répondre", "Un parcours simple pour faire ressortir vos goûts et votre sensibilité."],
                ["02", "Comprendre", "Un profil olfactif pour mieux lire les familles qui vous correspondent."],
                ["03", "Explorer", "Jusqu'à 3 suggestions cohérentes, puis les offres partenaires quand elles sont disponibles."],
              ].map(([step, title, description]) => (
                <div
                  key={step}
                  className="rounded-[1.9rem] border border-[rgba(154,78,99,0.22)] bg-[rgba(255,255,255,0.62)] px-5 py-5 backdrop-blur-[6px]"
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


      <section className="container py-12 md:py-16">
        <div className="rounded-[3rem] border border-[rgba(154,78,99,0.2)] bg-[rgba(255,255,255,0.44)] px-6 py-8 shadow-[0_30px_76px_rgba(116,54,71,0.10)] backdrop-blur-[6px] md:px-10 md:py-10">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--mf-ink-soft))]">FAQ</p>
            <h2 className="mt-2 font-serif text-4xl text-[hsl(var(--mf-ink))] md:text-5xl">Questions fréquentes</h2>
          </div>
          <Accordion
            type="single"
            collapsible
            className="rounded-[2.5rem] border border-[rgba(154,78,99,0.22)] bg-[rgba(255,255,255,0.66)] px-6 shadow-[0_24px_56px_rgba(116,54,71,0.1)] backdrop-blur-[6px]"
          >
            <AccordionItem value="quiz">
              <AccordionTrigger className="text-left text-base font-medium text-[hsl(var(--mf-ink))]">
                À quoi sert le test de personnalité olfactif ?
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
                Il aide à faire ressortir un profil à partir de vos goûts, de votre personnalité et de votre usage, puis propose jusqu&apos;à trois parfums cohérents avec votre univers olfactif.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="search">
              <AccordionTrigger className="text-left text-base font-medium text-[hsl(var(--mf-ink))]">
                Comment fonctionne la recherche ?
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-7 text-[hsl(var(--mf-ink-soft))]">
                La recherche et le catalogue permettent maintenant de filtrer par mot-clé, genre, famille olfactive et budget pour aller plus vite vers le bon parfum.
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
                Parce que le but est d&apos;aider à choisir avec plus d&apos;inspiration et moins de friction, sans transformer l&apos;expérience en faux tunnel e-commerce.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
