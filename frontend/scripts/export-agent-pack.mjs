import fs from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";

const FRONTEND_ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");
const REPO_ROOT = path.resolve(FRONTEND_ROOT, "..");

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(
    d.getMinutes(),
  )}${pad(d.getSeconds())}`;
}

async function readText(filePath) {
  return fs.readFile(filePath, "utf8");
}

async function readJson(filePath) {
  return JSON.parse(await readText(filePath));
}

async function readTextIfExists(filePath) {
  return fs
    .readFile(filePath, "utf8")
    .then((x) => x)
    .catch(() => null);
}

function parseDotEnv(text) {
  const out = {};
  for (const rawLine of text.split(/\r?\n/g)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

async function apiJson(url, { method = "GET", token, body } = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${method} ${url} -> ${res.status}: ${text}`);
  }
  return JSON.parse(text);
}

async function main() {
  const envLocal = path.join(REPO_ROOT, ".env.local");
  const envDefault = path.join(REPO_ROOT, ".env");
  const envPath = (await fs
    .access(envLocal)
    .then(() => envLocal)
    .catch(() => envDefault));
  const envRaw = await readText(envPath);
  const env = parseDotEnv(envRaw);

  const host = env.AURORA_BIND_HOST || "127.0.0.1";
  const backendPort = env.AURORA_BACKEND_PORT || "19101";
  const backendOrigin = `http://${host}:${backendPort}`;
  const baseUrl = `http://${host}:${backendPort}/api/v1`;

  const adminEmail = env.ADMIN_EMAIL;
  const adminPassword = env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error("Missing ADMIN_EMAIL/ADMIN_PASSWORD in env file (required for export).");
  }

  const login = await apiJson(`${baseUrl}/auth/login`, {
    method: "POST",
    body: { email: adminEmail, password: adminPassword },
  });

  const token = login.token;
  if (!token) {
    throw new Error("Login succeeded but no token returned.");
  }

  const [appEnvelope, siteLanding, uiLibrary] = await Promise.all([
    apiJson(`${baseUrl}/app/spec`, { token }),
    apiJson(`${baseUrl}/site/pages`, { token }),
    apiJson(`${baseUrl}/ui/library`, { token }),
  ]);
  const projectBrief = await apiJson(`${baseUrl}/project/brief`, { token });
  const openapi = await apiJson(`${backendOrigin}/openapi.json`);

  const sitePages = Array.isArray(siteLanding) ? siteLanding : [];
  const homePage = sitePages.find((p) => p.is_home) ?? sitePages[0] ?? null;

  const specsDir = path.join(REPO_ROOT, "shared/specs");
  const uiManifest = await readJson(path.join(specsDir, "ui-manifest.json"));
  const theme = await readJson(path.join(specsDir, "theme.json"));
  const schemaDir = path.join(specsDir, "schema");
  const schemaFiles = await fs.readdir(schemaDir);

  const prompts = await readText(path.join(REPO_ROOT, "docs/PROMPTS.md"));
  const projectRules = await readText(path.join(REPO_ROOT, "docs/PROJECT_RULES.md"));

  const stamp = nowStamp();
  const outDir = path.join(REPO_ROOT, "dist");
  await fs.mkdir(outDir, { recursive: true });
  const outZipPath = path.join(outDir, `aurora-agent-pack-${stamp}.zip`);

  const zip = new JSZip();

  const specsRoot = path.join(REPO_ROOT, "llm_specs");
  const generatedDir = path.join(specsRoot, "generated");
  const generatedPrd = await readTextIfExists(path.join(generatedDir, "PRD.md"));
  const generatedQuestions = await readTextIfExists(path.join(generatedDir, "QUESTIONS_RECOMMENDATIONS.md"));
  const generatedSeo = await readTextIfExists(path.join(generatedDir, "SEO_GEO.md"));

  const prompt00 = [
    "Tu es un LLM codeur (type Codex CLI). Tu travailles sur AuroraStack (FastAPI + Next.js + Tailwind + composants shadcn).",
    "",
    "Objectif (Étape 1/3) : analyser le projet de l’utilisateur et la stack, puis produire une compréhension claire + des pistes d’amélioration, sans poser toutes les questions ni faire le plan (ces étapes viennent après).",
    "",
    "Important : quand tu parles du produit/site/app de l’utilisateur, utilise toujours le nom du projet indiqué dans `specs/project-brief.json` (`title`).",
    "",
    "Règles impératives :",
    "- Réponds en français simple (débutant).",
    "- Pas de surenchère technologique.",
    "- Responsive d’abord (mobile-first). Pas “application mobile”.",
    "- Ne modifie aucun fichier tant que je n’ai pas écrit exactement : “Je valide”.",
    "- Ne propose pas d’intégrations externes non demandées explicitement.",
    "",
    "À lire en priorité (dans le pack) :",
    "- `prompts/README.md` (ordre des étapes)",
    "- `specs/project-brief.json`",
    "- `specs/app-spec.json` (si présent)",
    "- `specs/site-pages.json` (si présent)",
    "- `api/openapi.json`",
    "- `docs/PRD.md`",
    "- `docs/ARCHITECTURE_STACK.md`",
    "- `docs/SEO_GEO.md` (si présent)",
    "- `docs/QUESTIONS_RECOMMENDATIONS.md` (si présent)",
    "",
    "Ensuite, analyse le codebase du repo pour comprendre l’architecture (frontend / backend / API / DB / migrations) et repérer où se feront les modifications quand ce sera validé.",
    "",
    "Output attendu maintenant (sans proposer de code, sans patch) :",
    "1) “Voici ce que j’ai compris”",
    "   - Résume le type de projet (site ou webapp), le public, l’objectif, le ton/style, et la liste des pages.",
    "2) “Où je vais travailler dans le repo”",
    "   - Liste les dossiers/fichiers pertinents (frontend, backend, DB/migrations) que tu utiliseras plus tard.",
    "3) “Voici ce que je pense qu’on pourrait améliorer” (recommandations)",
    "   - Propose des améliorations recommandées, priorisées, qui privilégient simplicité/rapidité/robustesse.",
    "   - Pour un site : structure des pages, cohérence du contenu, blocs manquants possibles (en priorité via blocs existants), responsive, SEO/GEO.",
    "   - Pour une webapp : cohérence des pages, données/écrans à prévoir, points d’attention UX, endpoints probables à créer (sans les coder).",
    "4) “Ce qui manque pour être certain”",
    "   - Liste courte (max 5–10) de points ambigus/absents que tu devras clarifier ensuite.",
    "",
    "Important :",
    "- Ne pas enchaîner sur l’étape 2/3 ni 3/3 dans cette réponse.",
    "- Ne demande pas “Je valide” ici.",
    "",
    "(Étape 1/3 — n’exécute pas les étapes 2/3 et 3/3.)",
    "",
  ].join("\n");

  const prompt10 = [
    "Tu es un LLM codeur (type Codex CLI). Étape 2/3 : poser les questions à trancher AVANT plan, avec recommandations.",
    "",
    "Important : utilise toujours le nom du projet indiqué dans `specs/project-brief.json` (`title`) quand tu parles du produit/site/app de l’utilisateur.",
    "",
    "Règles impératives :",
    "- Réponds en français simple (débutant).",
    "- Pas de surenchère technologique.",
    "- Responsive d’abord (mobile-first). Pas “application mobile”.",
    "- Ne modifie aucun fichier tant que je n’ai pas écrit exactement : “Je valide”.",
    "- Ne propose pas d’intégrations externes non demandées explicitement.",
    "",
    "Contexte à lire en priorité (dans le pack) :",
    "- `specs/project-brief.json`",
    "- `specs/app-spec.json` (si présent)",
    "- `specs/site-pages.json` (si présent)",
    "- `docs/PRD.md`",
    "- `docs/QUESTIONS_RECOMMENDATIONS.md` (si présent) → utilise-le comme base, complète si nécessaire",
    "- `docs/SEO_GEO.md` (si présent)",
    "",
    "Tâche :",
    "1) Écris “Voici ce que j’ai compris” (max ~10 bullets).",
    "",
    "2) Liste ensuite les questions à trancher avec des recommandations optimisées privilégiant la simplicité, la rapidité et la robustesse, AVANT plan, en 3 sections :",
    "- A. Questions globales",
    "- B. Questions par page",
    "- C. Questions SEO / GEO",
    "",
    "Format obligatoire pour CHAQUE question :",
    "- Question",
    "- Recommandation (conseillée)",
    "- Alternative",
    "- Pourquoi (2–4 lignes max)",
    "",
    "Consignes :",
    "- WEBAPP : base-toi sur Objectif / Description / Critères par page. Pose des questions pratiques (données, actions, règles, droits, validations, états UI). Donne une recommandation MVP si l’utilisateur ne sait pas.",
    "- SITE WEB : base-toi sur les blocs existants. Tu peux recommander des blocs/pages si utile, en priorité via les blocs déjà présents. Si un bloc externe est nécessaire, demander le format `docs/bloc-externe-format.md`.",
    "- SEO/GEO : poser les questions nécessaires (titles/descriptions, OG, canonical, sitemap/robots, JSON-LD, Hn, alt, maillage, pages légales, FAQ). Proposer une recommandation par défaut si info manquante.",
    "",
    "Fin obligatoire :",
    "“Réponds à ces questions, puis je prépare un plan. Je ne modifierai aucun fichier avant ‘Je valide’.”",
    "Ne pas enchaîner sur l’étape 3/3.",
    "",
  ].join("\n");

  const prompt20 = [
    "Tu es un LLM codeur (type Codex CLI). Étape 3/3 : produire un plan détaillé, puis demander “Je valide” et s’arrêter.",
    "",
    "Important : utilise toujours le nom du projet indiqué dans `specs/project-brief.json` (`title`) quand tu parles du produit/site/app de l’utilisateur.",
    "",
    "Règles impératives :",
    "- Réponds en français simple (débutant).",
    "- Pas de surenchère technologique.",
    "- Responsive d’abord (mobile-first). Pas “application mobile”.",
    "- Ne modifie aucun fichier tant que je n’ai pas écrit exactement : “Je valide”.",
    "",
    "Tâche :",
    "- Produis un plan de développement détaillé en phases :",
    "  1) Frontend (pages, composants, branchements API, états UI)",
    "  2) Backend (routes `/api/v1`, logique métier, auth si nécessaire)",
    "  3) Base de données (tables + migrations Alembic si nécessaire)",
    "  4) Contrats API (OpenAPI + payloads + erreurs)",
    "  5) SEO/GEO (metadata, OG, canonical, sitemap, robots, JSON-LD, Hn, alt, maillage, pages légales, FAQ)",
    "  6) Tests (commandes Docker + scénario de vérification)",
    "",
    "Contraintes :",
    "- Plan concret : mentionne les dossiers/fichiers à toucher, endpoints, commandes de test.",
    "- Pas de code, pas de patch dans cette étape.",
    "",
    "Fin obligatoire :",
    "Demande à l’utilisateur d’écrire exactement : Je valide",
    "Puis écris : “J’attends ‘Je valide’ pour commencer à modifier le code.” et STOP.",
    "",
  ].join("\n");

  const promptsRunbook = [
    "# RUNBOOK (ordre d’exécution des prompts)",
    "",
    "Objectif : exécuter le LLM codeur en 3 étapes, sans qu’il enchaîne tout seul.",
    "",
    "1) Étape 1/3 — Compréhension",
    "- Envoie exactement `prompts/00_prompt_general.md`.",
    "",
    "2) Étape 2/3 — Questions + recommandations",
    "- Envoie exactement `prompts/10_prompt_questions.md`.",
    "",
    "3) Tu réponds aux questions",
    "",
    "4) Étape 3/3 — Plan + STOP",
    "- Envoie exactement `prompts/20_prompt_plan_gate.md`.",
    "- Le LLM doit demander “Je valide” puis s’arrêter.",
    "",
    "Après “Je valide” seulement : tu peux lancer l’implémentation (hors de ces prompts).",
    "",
  ].join("\n");

  const agentsAppend = [
    "# Ajout recommandé dans AGENTS.md (après accord explicite)",
    "",
    "- Aucune modification de code sans validation explicite de l’utilisateur.",
    "- Répondre en français simple (débutant).",
    "- Pas de surenchère technologique : privilégier simplicité/rapidité/robustesse.",
    "- Workflow : compréhension → questions → plan → attendre “Je valide” → implémentation.",
    "- Responsive d’abord (mobile-first). Pas “application mobile”.",
    "- Backend : routes sous `/api/v1`, migrations Alembic pour toute évolution DB.",
    "",
  ].join("\n");

  const blocExterneFormat = [
    "# Format attendu pour fournir un bloc externe (shadcn)",
    "",
    "Si aucun bloc existant ne convient, tu peux fournir un bloc externe au LLM codeur au format ci-dessous.",
    "",
    "## 1) Source",
    "- Lien : <URL du bloc>",
    "",
    "## 2) Installation (si disponible)",
    "- Commande : `npx ...`",
    "",
    "## 3) Dépendances",
    "- Liste des dépendances + commandes d’installation",
    "",
    "## 4) Code",
    "- Colle le composant TSX complet (et les fichiers annexes si nécessaires).",
    "",
    "## 5) Notes",
    "- Images/ressources nécessaires, variantes, contraintes d’utilisation.",
    "",
    "Note : inspire-toi du format des fichiers dans `shared/blocks/*.txt`.",
    "",
  ].join("\n");

  const archStack = [
    "# Architecture AuroraStack (résumé)",
    "",
    "AuroraStack = FastAPI + Postgres + Next.js App Router + Tailwind + shadcn/ui.",
    "",
    "## Backend",
    "- Entrée : `backend/app/main.py`",
    "- API : `backend/app/api/v1/*` (préfixe `/api/v1/...`)",
    "- DB : SQLAlchemy + Alembic (`backend/alembic/`)",
    "",
    "## Frontend",
    "- App Router : `frontend/app/`",
    "- Dashboard/admin : `frontend/app/(dashboard)/...`",
    "- Website public : `frontend/app/(marketing)/site/...`",
    "- Proxy API : `/api/v1/*` via `frontend/next.config.js` (rewrites)",
    "",
    "## Source de vérité",
    "- Webapp : `llm_specs/app.json` (API `/api/v1/app/spec`)",
    "- Brief projet : `llm_specs/project-brief.json` (API `/api/v1/project/brief`)",
    "- Website : pages en DB via `/api/v1/site/pages` (builder `/builder/landing`)",
    "",
  ].join("\n");

  const prdFallback = (() => {
    const b = projectBrief.brief ?? projectBrief;
    const title = b.title || "Projet";
    const type = b.projectType === "webapp" ? "WebApp (admin/backoffice)" : "Site web (public)";
    const oneLiner = b.oneLiner || "";
    const target = b.targetUsers || "";
    const goal = b.primaryGoal || "";
    const tone = b.tone || "";
    const facts = b.facts || "";
    const pages = sitePages.map((p) => `- ${p.title} (${p.slug})`).join("\n");
    return [
      `# PRD — ${title}`,
      "",
      "## Type",
      type,
      "",
      "## Résumé (1 phrase)",
      oneLiner || "À confirmer",
      "",
      "## Public / utilisateurs",
      target || "À confirmer",
      "",
      "## But principal",
      goal || "À confirmer",
      "",
      "## Ton / style",
      tone || "À confirmer",
      "",
      "## Infos factuelles",
      facts || "À confirmer",
      "",
      "## Pages",
      pages || "- À confirmer",
      "",
      "## À confirmer",
      "- Points manquants à préciser avant plan (voir QUESTIONS_RECOMMENDATIONS).",
      "",
    ].join("\n");
  })();

  zip.file(
    "README.md",
    [
      "# Aurora agent pack",
      "",
      "Ce ZIP contient les specs et références nécessaires pour qu’un agent LLM puisse adapter le projet.",
      "",
      "## Contenu",
      "- `specs/app-spec.json` : spec webapp (runtime).",
      "- `specs/site-pages.json` : pages website (runtime DB).",
      "- `specs/site-landing.json` : page home (runtime DB, si dispo).",
      "- `specs/ui-library.json` : bibliothèque composants choisie.",
      "- `specs/project-brief.json` : brief projet (wizard) pour guider un LLM.",
      "- `specs/ui-manifest.json` + `specs/theme.json` : source de vérité (fichiers).",
      "- `api/openapi.json` : OpenAPI du backend.",
      "- `docs/` : PRD + docs d’architecture + SEO/GEO.",
      "- `prompts/` : prompts pour LLM codeur (runbook + étapes 1/2/3).",
      "- `prompts/` : modèles de prompts et règles projet.",
      "- `repo/` : références de chemins utiles (pas de code embarqué).",
      "",
      "## Usage (agent CLI)",
      "1) Dézipper.",
      "2) Lire `prompts/project-rules.md` puis les specs.",
      "3) Appliquer les modifications dans le repo en respectant les tokens UI.",
      "",
    ].join("\n"),
  );

  zip.file("specs/ui-manifest.json", `${JSON.stringify(uiManifest, null, 2)}\n`);
  zip.file("specs/theme.json", `${JSON.stringify(theme, null, 2)}\n`);
  zip.file("specs/app-spec.json", `${JSON.stringify(appEnvelope.spec, null, 2)}\n`);
  zip.file("specs/site-pages.json", `${JSON.stringify(sitePages, null, 2)}\n`);
  zip.file("specs/site-landing.json", `${JSON.stringify(homePage, null, 2)}\n`);
  zip.file("specs/project-brief.json", `${JSON.stringify(projectBrief.brief ?? projectBrief, null, 2)}\n`);
  zip.file("api/openapi.json", `${JSON.stringify(openapi, null, 2)}\n`);
  zip.file(
    "specs/ui-library.json",
    `${JSON.stringify({ component_keys: uiLibrary.component_keys ?? [] }, null, 2)}\n`,
  );

  for (const name of schemaFiles) {
    if (!name.endsWith(".json")) continue;
    const data = await readJson(path.join(schemaDir, name));
    zip.file(`specs/schema/${name}`, `${JSON.stringify(data, null, 2)}\n`);
  }

  zip.file("prompts/prompts.md", prompts);
  zip.file("prompts/project-rules.md", projectRules);
  zip.file("prompts/README.md", promptsRunbook);
  zip.file("prompts/00_prompt_general.md", prompt00);
  zip.file("prompts/10_prompt_questions.md", prompt10);
  zip.file("prompts/20_prompt_plan_gate.md", prompt20);
  zip.file("templates/agents_append.md", agentsAppend);

  zip.file("docs/ARCHITECTURE_STACK.md", archStack);
  zip.file("docs/bloc-externe-format.md", blocExterneFormat);
  zip.file("docs/PRD.md", generatedPrd ?? prdFallback);
  if (generatedQuestions) zip.file("docs/QUESTIONS_RECOMMENDATIONS.md", generatedQuestions);
  if (generatedSeo) zip.file("docs/SEO_GEO.md", generatedSeo);
  zip.file(
    "prompts/how-to-use.md",
    [
      "# Comment utiliser ce pack (workflow simple)",
      "",
      "## Objectif",
      "Donner assez de contexte à un LLM instructeur puis à un LLM codeur (Codex CLI) pour implémenter ton projet dans AuroraStack.",
      "",
      "## Étape 1 — Compléter le brief",
      "- Ouvre `specs/project-brief.json` et vérifie que le contenu est correct.",
      "- Ne mets aucun secret (clés API, mots de passe).",
      "",
      "## Étape 2 — LLM instructeur (spécifications)",
      "Demande au LLM instructeur de :",
      "- lire `specs/project-brief.json`, `specs/app-spec.json`, `specs/site-pages.json` ;",
      "- lister les questions ouvertes à trancher ;",
      "- produire un PRD + specs API/DB + checklist de tâches.",
      "",
      "## Étape 3 — LLM codeur (implémentation)",
      "Demande au LLM codeur (Codex/Claude/Gemini) de :",
      "- appliquer les migrations (Alembic) si DB ;",
      "- créer les endpoints FastAPI sous `/api/v1/...` ;",
      "- brancher le frontend via `/api/v1/...` (proxy Next.js) ;",
      "- tester via Docker Compose.",
      "",
    ].join("\n"),
  );

  zip.file(
    "repo/references.json",
    `${JSON.stringify(
      {
        repoRoot: "Aurora_stack",
        generatedAt: new Date().toISOString(),
        importantPaths: [
          "docs/PROJECT_RULES.md",
          "docs/PROMPTS.md",
          "shared/specs/ui-manifest.json",
          "shared/specs/theme.json",
          "llm_specs/project-brief.json",
          "llm_specs/generated/PRD.md",
          "llm_specs/generated/QUESTIONS_RECOMMENDATIONS.md",
          "llm_specs/generated/SEO_GEO.md",
          "frontend/components/ui/",
          "frontend/app/(dashboard)/builder/app/page.tsx",
          "frontend/app/(dashboard)/builder/landing/page.tsx",
          "frontend/app/(dashboard)/builder/brief/page.tsx",
          "frontend/app/(dashboard)/ui/components/page.tsx",
          "frontend/blocks/manifest.ts",
          "shared/blocks/",
          "backend/app/api/v1/app_spec.py",
          "backend/app/api/v1/site_pages.py",
          "backend/app/api/v1/ui_library.py",
          "backend/app/api/v1/project_brief.py",
          "backend/app/api/v1/llm.py",
          "backend/app/core/openrouter.py",
          "backend/app/core/crypto.py",
          "api/openapi.json",
          "frontend/app/(dashboard)/builder/brief/page.tsx",
        ],
        notes: [
          "Website : les pages (blocs + objectifs) sont en DB (`site_pages`) et exportées dans le pack.",
          "Webapp : la spec est persistée en fichier (`llm_specs/app.json`).",
          "Les fichiers sous `shared/specs/` sont la source de vérité pour les schémas/manifests.",
          "Le builder webapp travaille sur une spec; l'agent IA doit créer/adapter le code (pages, API) à partir de cette spec.",
          "Le wizard brief produit `project-brief.json` (sans secrets) pour guider un LLM instructeur/codeur.",
          "Les docs `llm_specs/generated/*` sont générées via OpenRouter (aperçu → appliquer) et incluses dans le pack.",
        ],
      },
      null,
      2,
    )}\n`,
  );

  const buffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  await fs.writeFile(outZipPath, buffer);

  // eslint-disable-next-line no-console
  console.log(`Wrote ${path.relative(REPO_ROOT, outZipPath)}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
