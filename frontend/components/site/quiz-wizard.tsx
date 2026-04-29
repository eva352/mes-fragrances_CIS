"use client";

import { startTransition, useState } from "react";
import Link from "next/link";

import type { QuizAnswers, QuizResult } from "@/lib/api/public-perfumes";
import { getQuizRecommendations } from "@/lib/api/public-perfumes";
import { PerfumeCard } from "@/components/site/perfume-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type QuizOption = {
  value: string;
  label: string;
  hint: string;
};

type SingleQuizKey = Exclude<keyof QuizAnswers, "sensations">;

type SingleQuizStep = {
  kind: "single";
  key: SingleQuizKey;
  title: string;
  description: string;
  showHints?: boolean;
  options: QuizOption[];
};

type MultiQuizStep = {
  kind: "multi";
  key: "sensations";
  title: string;
  description: string;
  helper: string;
  showHints?: boolean;
  options: QuizOption[];
};

type QuizStep = SingleQuizStep | MultiQuizStep;

const PROFILE_TITLES: Record<string, string> = {
  "romantic-soft": "Romantique douce",
  "elegant-classic": "Élégante classique",
  "sunny-sparkling": "Solaire pétillante",
  "mysterious-intense": "Mystérieuse intense",
  "bold-sensual": "Audacieuse sensuelle",
  "natural-soothing": "Naturelle apaisante",
  "creative-original": "Créative originale",
  "minimalist-chic": "Minimaliste chic",
};

const QUIZ_STEPS: QuizStep[] = [
  {
    kind: "single",
    key: "target",
    title: "Pour qui recherchez-vous un parfum ?",
    description: "On commence par le contexte le plus simple.",
    options: [
      { value: "women", label: "Femme", hint: "Une sélection pensée d'abord pour un univers féminin" },
      { value: "men", label: "Homme", hint: "Une recherche orientée vers un univers masculin" },
      { value: "all", label: "Les deux / indifférent", hint: "On garde l'esprit ouvert" },
    ],
  },
  {
    kind: "single",
    key: "frequency",
    title: "À quelle fréquence portez-vous du parfum ?",
    description: "Cette habitude aide à comprendre la place du parfum dans votre quotidien.",
    options: [
      { value: "daily", label: "Quotidiennement", hint: "Vous aimez le porter presque tous les jours" },
      { value: "occasionally", label: "Occasionnellement", hint: "Plutôt pour certains moments" },
      { value: "rarely", label: "Rarement", hint: "Vous en portez peu" },
      { value: "first-time", label: "C'est une première", hint: "Vous cherchez un repère simple pour commencer" },
    ],
  },
  {
    kind: "single",
    key: "occasion",
    title: "Pour quelle occasion aimeriez-vous porter ce parfum ?",
    description: "Le moment d'usage change beaucoup le type de sillage à recommander.",
    options: [
      { value: "daily", label: "Quotidien", hint: "Facile à porter tous les jours" },
      { value: "formal", label: "Formelle / professionnelle", hint: "Sobre, nette et bien tenue" },
      { value: "festive", label: "Festive", hint: "Plus vivant, plus lumineux" },
      { value: "special", label: "Grande occasion", hint: "Quelque chose de plus marquant" },
      { value: "date-night", label: "Rendez-vous / soirée", hint: "Une présence plus enveloppante" },
      { value: "other", label: "Autre / sans préférence", hint: "On garde ce critère ouvert" },
    ],
  },
  {
    kind: "single",
    key: "seasonality",
    title: "Souhaitez-vous l'associer à une saison ou à un moment particulier ?",
    description: "Ce filtre reste optionnel dans l'esprit, mais il affine bien les résultats.",
    options: [
      { value: "spring", label: "Printemps", hint: "Fraîcheur, fleurs et douceur" },
      { value: "summer", label: "Été", hint: "Lumière, air et spontanéité" },
      { value: "autumn", label: "Automne", hint: "Plus de texture et de chaleur" },
      { value: "winter", label: "Hiver", hint: "Un sillage plus enveloppant" },
      { value: "all-seasons", label: "Toutes saisons", hint: "Une vraie option signature" },
      { value: "holidays", label: "Fêtes de fin d'année", hint: "Plus habillé et marquant" },
      { value: "romantic", label: "Moments romantiques", hint: "Plus intime et enveloppant" },
      { value: "no-preference", label: "Sans préférence", hint: "Aucune contrainte saisonnière" },
    ],
  },
  {
    kind: "single",
    key: "desiredEffect",
    title: "Quel rendu recherchez-vous en priorité ?",
    description: "Choisissez l'effet que vous voulez ressentir ou faire passer d'abord.",
    options: [
      { value: "discreet", label: "Discret", hint: "Présent sans être envahissant" },
      { value: "elegant", label: "Élégant", hint: "Raffiné, posé, bien construit" },
      { value: "comforting", label: "Réconfortant", hint: "Doux, enveloppant, apaisant" },
      { value: "fresh", label: "Frais", hint: "Net, lumineux, léger" },
      { value: "sensual", label: "Sensuel", hint: "Plus charnel, plus intense" },
      { value: "original", label: "Original", hint: "Singulier, moins attendu" },
      { value: "powerful", label: "Puissant", hint: "Un sillage qui marque" },
      { value: "clean", label: "Propre / minimaliste", hint: "Sobre, net et moderne" },
    ],
  },
  {
    kind: "single",
    key: "instinctiveFamily",
    title: "Quel type de parfum vous attire le plus instinctivement ?",
    description: "Même si vous hésitez, votre instinct donne souvent une bonne direction.",
    options: [
      { value: "fruity", label: "Fruité", hint: "Juteux, pétillant, lumineux" },
      { value: "floral", label: "Floral", hint: "Féminin, élégant, classique" },
      { value: "gourmand", label: "Sucré / gourmand", hint: "Doux, addictif, enveloppant" },
      { value: "woody", label: "Boisé", hint: "Texturé, plus construit, plus profond" },
      { value: "fresh", label: "Frais", hint: "Clair, propre, aérien" },
      { value: "amber", label: "Ambré / oriental", hint: "Chaleureux, sensuel, intense" },
      { value: "unknown", label: "Je ne sais pas encore", hint: "On se repose davantage sur la personnalité" },
    ],
  },
  {
    kind: "multi",
    key: "sensations",
    title: "Quelles sensations vous attirent le plus ?",
    description: "Vous pouvez sélectionner plusieurs réponses. Ce sont souvent ces nuances qui affinent vraiment le profil.",
    helper: "Plusieurs réponses possibles",
    options: [
      { value: "freshness", label: "Fraîcheur", hint: "Quelque chose de clair et vivant" },
      { value: "softness", label: "Douceur", hint: "Un rendu tendre et apaisant" },
      { value: "warmth", label: "Chaleur", hint: "Plus enveloppant et texturé" },
      { value: "cleanliness", label: "Propreté", hint: "Net, propre, facile à vivre" },
      { value: "elegance", label: "Élégance", hint: "Sensation de raffinement" },
      { value: "mystery", label: "Mystère", hint: "Une dimension plus intrigante" },
      { value: "sensuality", label: "Sensualité", hint: "Un sillage plus charnel" },
      { value: "energy", label: "Énergie", hint: "Quelque chose de plus spontané" },
      { value: "comfort", label: "Confort", hint: "Une impression cocooning" },
      { value: "refinement", label: "Raffinement", hint: "Un rendu subtil mais travaillé" },
      { value: "originality", label: "Originalité", hint: "Une vraie touche de singularité" },
    ],
  },
  {
    kind: "single",
    key: "trail",
    title: "Quel type de sillage préférez-vous ?",
    description: "Le niveau de présence change beaucoup l'expérience au porté.",
    options: [
      { value: "skin", label: "Très discret", hint: "Proche de la peau" },
      { value: "moderate", label: "Modéré", hint: "Élégant et juste" },
      { value: "present", label: "Présent", hint: "Visible sans être envahissant" },
      { value: "powerful", label: "Puissant", hint: "Marquant et assumé" },
    ],
  },
  {
    kind: "single",
    key: "socialStyle",
    title: "Vos proches vous décriraient plutôt comme une personne...",
    description: "Cette partie aide à faire ressortir le profil principal.",
    showHints: false,
    options: [
      { value: "romantic-soft", label: "Douce et rassurante", hint: PROFILE_TITLES["romantic-soft"] },
      { value: "elegant-classic", label: "Élégante et posée", hint: PROFILE_TITLES["elegant-classic"] },
      { value: "sunny-sparkling", label: "Pétillante et pleine de vie", hint: PROFILE_TITLES["sunny-sparkling"] },
      { value: "mysterious-intense", label: "Mystérieuse et captivante", hint: PROFILE_TITLES["mysterious-intense"] },
      { value: "creative-original", label: "Créative et originale", hint: PROFILE_TITLES["creative-original"] },
      { value: "natural-soothing", label: "Naturelle et simple", hint: PROFILE_TITLES["natural-soothing"] },
      { value: "bold-sensual", label: "Charismatique et sûre de vous", hint: PROFILE_TITLES["bold-sensual"] },
      { value: "minimalist-chic", label: "Discrète mais raffinée", hint: PROFILE_TITLES["minimalist-chic"] },
    ],
  },
  {
    kind: "single",
    key: "atmosphere",
    title: "Quelle ambiance vous ressemble le plus ?",
    description: "On cherche ici un imaginaire, pas une règle stricte.",
    showHints: false,
    options: [
      { value: "romantic-soft", label: "Un jardin fleuri au printemps", hint: PROFILE_TITLES["romantic-soft"] },
      { value: "elegant-classic", label: "Un hôtel chic et raffiné", hint: PROFILE_TITLES["elegant-classic"] },
      { value: "sunny-sparkling", label: "Une plage ensoleillée en été", hint: PROFILE_TITLES["sunny-sparkling"] },
      { value: "mysterious-intense", label: "Une soirée à la lumière des bougies", hint: PROFILE_TITLES["mysterious-intense"] },
      { value: "creative-original", label: "Un atelier d'artiste ou un lieu insolite", hint: PROFILE_TITLES["creative-original"] },
      { value: "natural-soothing", label: "Une balade en forêt ou à la campagne", hint: PROFILE_TITLES["natural-soothing"] },
      { value: "bold-sensual", label: "Un rooftop glamour en ville", hint: PROFILE_TITLES["bold-sensual"] },
      { value: "minimalist-chic", label: "Un intérieur épuré et calme", hint: PROFILE_TITLES["minimalist-chic"] },
    ],
  },
  {
    kind: "single",
    key: "roomPresence",
    title: "Quand vous entrez dans une pièce, vous préférez…",
    description: "Cette question aide à calibrer la présence que vous voulez renvoyer.",
    showHints: false,
    options: [
      { value: "romantic-soft", label: "Dégager de la douceur", hint: PROFILE_TITLES["romantic-soft"] },
      { value: "elegant-classic", label: "Inspirer le respect et l'élégance", hint: PROFILE_TITLES["elegant-classic"] },
      { value: "sunny-sparkling", label: "Apporter de la bonne humeur", hint: PROFILE_TITLES["sunny-sparkling"] },
      { value: "mysterious-intense", label: "Intriguer un peu", hint: PROFILE_TITLES["mysterious-intense"] },
      { value: "creative-original", label: "Montrer votre singularité", hint: PROFILE_TITLES["creative-original"] },
      { value: "natural-soothing", label: "Rester vous-même sans en faire trop", hint: PROFILE_TITLES["natural-soothing"] },
      { value: "bold-sensual", label: "Marquer les esprits", hint: PROFILE_TITLES["bold-sensual"] },
      { value: "minimalist-chic", label: "Donner une impression nette et classe", hint: PROFILE_TITLES["minimalist-chic"] },
    ],
  },
  {
    kind: "single",
    key: "idealWeekend",
    title: "Votre week-end idéal ressemble plutôt à…",
    description: "Un détour par votre rythme de vie aide souvent à mieux cibler un parfum signature.",
    showHints: false,
    options: [
      { value: "romantic-soft", label: "Un brunch ou un moment cocooning", hint: PROFILE_TITLES["romantic-soft"] },
      { value: "elegant-classic", label: "Un dîner raffiné ou une sortie élégante", hint: PROFILE_TITLES["elegant-classic"] },
      { value: "sunny-sparkling", label: "Une sortie entre amis ou une escapade joyeuse", hint: PROFILE_TITLES["sunny-sparkling"] },
      { value: "mysterious-intense", label: "Une soirée chic ou intime", hint: PROFILE_TITLES["mysterious-intense"] },
      { value: "creative-original", label: "Une expo ou un voyage spontané", hint: PROFILE_TITLES["creative-original"] },
      { value: "natural-soothing", label: "Une promenade, du calme, du bien-être", hint: PROFILE_TITLES["natural-soothing"] },
      { value: "bold-sensual", label: "Un événement où vous pouvez vous mettre en valeur", hint: PROFILE_TITLES["bold-sensual"] },
      { value: "minimalist-chic", label: "Un moment simple, beau et reposant", hint: PROFILE_TITLES["minimalist-chic"] },
    ],
  },
  {
    kind: "single",
    key: "coreQuality",
    title: "Quelle qualité vous correspond le plus ?",
    description: "On affine ici la tonalité émotionnelle du profil.",
    showHints: false,
    options: [
      { value: "romantic-soft", label: "La tendresse", hint: PROFILE_TITLES["romantic-soft"] },
      { value: "elegant-classic", label: "Le raffinement", hint: PROFILE_TITLES["elegant-classic"] },
      { value: "sunny-sparkling", label: "La spontanéité", hint: PROFILE_TITLES["sunny-sparkling"] },
      { value: "mysterious-intense", label: "La profondeur", hint: PROFILE_TITLES["mysterious-intense"] },
      { value: "creative-original", label: "L'imagination", hint: PROFILE_TITLES["creative-original"] },
      { value: "natural-soothing", label: "L'authenticité", hint: PROFILE_TITLES["natural-soothing"] },
      { value: "bold-sensual", label: "L'assurance", hint: PROFILE_TITLES["bold-sensual"] },
      { value: "minimalist-chic", label: "La maîtrise", hint: PROFILE_TITLES["minimalist-chic"] },
    ],
  },
  {
    kind: "single",
    key: "desiredFragrance",
    title: "Dans un parfum, vous aimeriez surtout retrouver quelque chose de...",
    description: "On relie maintenant votre personnalité au type d'impression olfactive recherchée.",
    showHints: false,
    options: [
      { value: "romantic-soft", label: "tendre et réconfortant", hint: PROFILE_TITLES["romantic-soft"] },
      { value: "elegant-classic", label: "chic et intemporel", hint: PROFILE_TITLES["elegant-classic"] },
      { value: "sunny-sparkling", label: "frais et joyeux", hint: PROFILE_TITLES["sunny-sparkling"] },
      { value: "mysterious-intense", label: "sensuel et envoûtant", hint: PROFILE_TITLES["mysterious-intense"] },
      { value: "creative-original", label: "unique et surprenant", hint: PROFILE_TITLES["creative-original"] },
      { value: "natural-soothing", label: "propre et naturel", hint: PROFILE_TITLES["natural-soothing"] },
      { value: "bold-sensual", label: "puissant et affirmé", hint: PROFILE_TITLES["bold-sensual"] },
      { value: "minimalist-chic", label: "subtil mais très travaillé", hint: PROFILE_TITLES["minimalist-chic"] },
    ],
  },
  {
    kind: "single",
    key: "desiredImage",
    title: "Avec votre parfum, vous voulez renvoyer l'image d'une personne...",
    description: "Dernière question avant votre profil et vos recommandations.",
    showHints: false,
    options: [
      { value: "romantic-soft", label: "douce et attachante", hint: PROFILE_TITLES["romantic-soft"] },
      { value: "elegant-classic", label: "élégante et distinguée", hint: PROFILE_TITLES["elegant-classic"] },
      { value: "sunny-sparkling", label: "lumineuse et positive", hint: PROFILE_TITLES["sunny-sparkling"] },
      { value: "mysterious-intense", label: "fascinante et intense", hint: PROFILE_TITLES["mysterious-intense"] },
      { value: "creative-original", label: "différente et créative", hint: PROFILE_TITLES["creative-original"] },
      { value: "natural-soothing", label: "vraie et apaisante", hint: PROFILE_TITLES["natural-soothing"] },
      { value: "bold-sensual", label: "confiante et séduisante", hint: PROFILE_TITLES["bold-sensual"] },
      { value: "minimalist-chic", label: "sobre et haut de gamme", hint: PROFILE_TITLES["minimalist-chic"] },
    ],
  },
];

const INITIAL_ANSWERS: QuizAnswers = {
  target: "",
  frequency: "",
  occasion: "",
  seasonality: "",
  desiredEffect: "",
  instinctiveFamily: "",
  sensations: [],
  trail: "",
  socialStyle: "",
  atmosphere: "",
  roomPresence: "",
  idealWeekend: "",
  coreQuality: "",
  desiredFragrance: "",
  desiredImage: "",
};

function isStepComplete(step: QuizStep, answers: QuizAnswers) {
  if (step.kind === "multi") {
    return answers[step.key].length > 0;
  }

  return Boolean(answers[step.key]);
}

export function QuizWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_ANSWERS);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const step = QUIZ_STEPS[stepIndex];
  const isLastStep = stepIndex === QUIZ_STEPS.length - 1;
  const progress = Math.round(((stepIndex + 1) / QUIZ_STEPS.length) * 100);
  const stepReady = isStepComplete(step, answers);

  async function submitQuiz() {
    setIsSubmitting(true);
    setError(null);

    try {
      const next = await getQuizRecommendations(answers);
      startTransition(() => {
        setResult(next);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de charger le résultat du test.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetQuiz() {
    setResult(null);
    setStepIndex(0);
    setAnswers(INITIAL_ANSWERS);
    setError(null);
  }

  function toggleSensation(value: string, checked: boolean) {
    setAnswers((current) => {
      const nextValues = checked
        ? Array.from(new Set([...current.sensations, value]))
        : current.sensations.filter((item) => item !== value);

      return { ...current, sensations: nextValues };
    });
    setError(null);
  }

  if (result) {
    return (
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_60px_rgba(120,83,98,0.12)] backdrop-blur md:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Profil trouvé</p>
          <h2 className="mt-3 font-serif text-3xl text-zinc-900 md:text-4xl">{result.profile.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600 md:text-base">{result.profile.subtitle}</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 md:text-base">{result.profile.description}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-zinc-200 bg-white px-5 py-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Familles conseillées</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.profile.olfactiveFamilies.map((family) => (
                  <span key={family} className="rounded-full bg-rose-50 px-3 py-1 text-sm text-zinc-700">
                    {family}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-zinc-200 bg-white px-5 py-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Mots-clés</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.profile.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-full" onClick={resetQuiz}>
              Refaire le test
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/site/recherche">Explorer aussi la recherche</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Sélection parfum</p>
            <h3 className="font-serif text-3xl text-zinc-900">3 pistes cohérentes avec votre profil</h3>
            <p className="max-w-2xl text-sm leading-7 text-zinc-600">
              On garde volontairement une sélection courte et lisible, pour comparer vite et sans vous perdre.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {result.recommendations.map((item) => (
              <div key={item.perfume.slug} className="space-y-3">
                <PerfumeCard perfume={item.perfume} />
                <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4 text-sm leading-7 text-zinc-600 shadow-[0_16px_40px_rgba(120,83,98,0.10)]">
                  {item.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_60px_rgba(120,83,98,0.12)] backdrop-blur md:p-8">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
            Question {stepIndex + 1} / {QUIZ_STEPS.length}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{progress}%</p>
        </div>
        <div className="h-2 rounded-full bg-rose-100">
          <div className="h-2 rounded-full bg-zinc-900 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-serif text-3xl text-zinc-900">{step.title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-zinc-600">{step.description}</p>
        {step.kind === "multi" ? (
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">{step.helper}</p>
        ) : null}
      </div>

      {step.kind === "single" ? (
        <RadioGroup
          value={answers[step.key]}
          onValueChange={(value) => {
            setAnswers((current) => ({ ...current, [step.key]: value }));
            setError(null);
          }}
          className="grid gap-3"
        >
          {step.options.map((option) => (
            <Label
              key={option.value}
              htmlFor={`${step.key}-${option.value}`}
              className="flex cursor-pointer items-start gap-3 rounded-[1.5rem] border border-zinc-200 bg-white px-4 py-4 text-left transition hover:border-zinc-900/20 hover:bg-rose-50"
            >
              <RadioGroupItem id={`${step.key}-${option.value}`} value={option.value} className="mt-1" />
              <span className="space-y-1">
                <span className="block text-sm font-medium text-zinc-900">{option.label}</span>
                {step.showHints !== false && option.hint ? (
                  <span className="block text-sm leading-6 text-zinc-600">{option.hint}</span>
                ) : null}
              </span>
            </Label>
          ))}
        </RadioGroup>
      ) : (
        <div className="grid gap-3">
          {step.options.map((option) => {
            const checked = answers.sensations.includes(option.value);

            return (
              <Label
                key={option.value}
                htmlFor={`${step.key}-${option.value}`}
                className="flex cursor-pointer items-start gap-3 rounded-[1.5rem] border border-zinc-200 bg-white px-4 py-4 text-left transition hover:border-zinc-900/20 hover:bg-rose-50"
              >
                <Checkbox
                  id={`${step.key}-${option.value}`}
                  checked={checked}
                  onCheckedChange={(nextChecked) => toggleSensation(option.value, nextChecked === true)}
                  className="mt-1 rounded border-zinc-400"
                />
                <span className="space-y-1">
                  <span className="block text-sm font-medium text-zinc-900">{option.label}</span>
                  {step.showHints !== false && option.hint ? (
                    <span className="block text-sm leading-6 text-zinc-600">{option.hint}</span>
                  ) : null}
                </span>
              </Label>
            );
          })}
        </div>
      )}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
          disabled={stepIndex === 0}
        >
          Retour
        </Button>
        {isLastStep ? (
          <Button
            type="button"
            className="rounded-full px-6"
            disabled={!stepReady || isSubmitting}
            onClick={submitQuiz}
          >
            {isSubmitting ? "Analyse en cours..." : "Voir votre profil olfactif"}
          </Button>
        ) : (
          <Button
            type="button"
            className="rounded-full px-6"
            disabled={!stepReady}
            onClick={() => setStepIndex((current) => Math.min(QUIZ_STEPS.length - 1, current + 1))}
          >
            Continuer
          </Button>
        )}
      </div>
    </div>
  );
}
