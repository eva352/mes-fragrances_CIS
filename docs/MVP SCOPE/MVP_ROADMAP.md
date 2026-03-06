# CIS — MVP Roadmap (Website Builder + Max UI + LLM Orchestrateur)

Ce document définit **le scope MVP** et **les étapes restantes** pour atteindre une expérience “prompt → site multi-pages → handoff pack” en combinant :
- **CIS** (builders + drag&drop + blocks shadcn)
- **Max UI** (base de connaissance + design system déterministe)
- **LLM orchestrateur** (OpenRouter) qui propose *structure + configuration*, sans générer de TSX arbitraire

> Note : ce roadmap se concentre sur **le builder Website** (pas Webapp). La Webapp viendra en V1 après la MVP.

---

## 0) Définition du MVP (User Journey End-to-End)

### Objectif MVP
Permettre à un utilisateur de :
1) **décrire son projet** (brief guidé, avec **STT**),
2) **générer automatiquement un website multi-pages minimal** (Home + pages pertinentes),
3) pour chaque page : **proposer une structure ET personnaliser les blocks** (contenu + variantes) en s’appuyant sur Max UI + thèmes CIS,
4) itérer visuellement (drag&drop, insertion/suppression),
5) **exporter un pack** pour un LLM codeur (PRD/archi/specs/prompts + design system + pages).

### Non-objectifs MVP
- Ne pas “finir” un site complet (copy parfaite, images finales, tracking, paiements, etc.).
- Ne pas générer/committer du code TSX arbitraire via l’IA (on reste dans une logique “builder + blocks”).
- Pas de Webapp builder amélioré (reporté V1).

---

## 1) État actuel (déjà en place)

- OpenRouter BYOK configuré dans l’UI + modèle sélectionnable.
- Endpoint “Proposer une structure” présent pour Website (sélection de blocks) avec :
  - design system Max UI **déterministe (CSV + BM25)**,
  - appel OpenRouter orchestrateur (JSON strict),
  - fallback déterministe si sortie invalide.
- Côté UI : bouton “Proposer une structure” + dialog preview.

Limite actuelle : **un block CIS n’a pas de props/content configurables** (il est rendu en `<Component />`), donc la proposition ne peut pas “adapter” les blocks (texte/variantes) — seulement choisir l’ordre.

---

## 2) Principe d’intégration (fusion CIS x Max UI)

### Règle #1 — Max UI ne “code” pas, il “guide”
Max UI produit :
- un **design system** (style, typo, effets, anti-patterns),
- un **pattern** (ordre de sections),
- des guidelines (a11y, perf, etc.).

Le code/render final se fait via :
- blocks CIS existants,
- paramètres *data-driven* (content/props),
- validation serveur (anti-hallucination).

### Règle #2 — Thèmes CIS = source de vérité couleur
Pour la MVP :
- l’IA **choisit un thème CIS** (palette) parmi une liste autorisée,
- on n’applique pas d’hex “hors thème” dans le rendu.

---

## 3) Workstreams (travail à faire) jusqu’à la MVP

### WS-A — “Blocks configurables” (débloque la personnalisation)
**But** : passer de `blocks: [{id, category, slug, title}]` à un block instance paramétrable :

- `content`: textes structurés (headline, bullets, CTA…)
- `props`: variantes & options (layout, density, media…)
- (optionnel) `styleHints`: indicateurs non-couleur (motion, glass, contraste)

#### Étapes
1) **Étendre le modèle BlockInstance**
   - Backend : schéma Pydantic
   - Frontend : types TS + API client
   - DB : `site_pages.blocks` est JSONB → on peut étendre la forme sans migration SQL, mais il faut accepter/valider.

2) **Faire passer les props au renderer**
   - `SitePageRenderer` doit appeler : `<Component {...props} />` (et/ou `<Component content={...} />`)
   - Tous les blocks doivent accepter des props optionnelles sans casser (defaults).

3) **Choisir 3 blocks pilotes (MVP)**
   - Hero (headline/subheadline/cta)
   - Features (liste de features)
   - Pricing (plans simples)

4) **Créer une “block schema” (meta)**
   - Décrire les champs éditables par block (type, label, validation simple)
   - Recommandé : s’appuyer sur `shared/blocks/**/meta.json` et l’étendre.

5) **UI d’édition block (builder website)**
   - Sélection d’un block dans la liste → panneau latéral “Éditer”
   - Form shadcn : champs issus du meta
   - Autosave / undo minimal (au moins “Annuler modifications” sur le panneau).

**Définition of Done**
- L’utilisateur peut appliquer une proposition et modifier texte/variantes block par block.

---

### WS-B — “Max UI CIS-ized” (données adaptées à CIS)
**But** : adapter et enrichir Max UI pour qu’il parle “CIS” :
- thèmes CIS,
- blocks CIS,
- contraintes stack (Next + Tailwind + shadcn + tokens).

#### Étapes
1) **Domaine Themes CIS**
   - Source : liste des thèmes existants (palettes CIS).
   - Stockage : un fichier “catalogue themes” (ex: `shared/specs/themes.json`) ou DB.
   - Mapping : tags (mood, industry, contrast level, dark-friendly).

2) **Domaine Blocks CIS**
   - Créer une base de mapping “section → blocks” + tags par block :
     - sectionType (hero/features/pricing/about/process/faq…)
     - styleFit (minimal / glass / bento / editorial…)
     - density (low/med/high), a11y notes
   - Objectif : que l’orchestrateur ne “devine” pas, il choisit des blocks avec un scoring.

3) **Normaliser les guidelines**
   - Charts : forcer ECharts (CIS) → guidelines Max UI “chart” deviennent “ECharts presets”
   - Icons : forcer Lucide → mapping catégories → icônes Lucide
   - Typography : décider si on autorise changement de fonts (MVP : optionnel, sinon garder typographie CIS et appliquer hiérarchie/tailles).

**Définition of Done**
- Max UI renvoie (a) un design system, (b) un thème CIS recommandé, (c) des préférences utilisables par l’orchestrateur pour configurer les blocks.

---

### WS-C — “LLM Orchestrateur V2” (structure + config, validé serveur)
**But** : l’IA doit renvoyer un **plan JSON strict** qui :
- choisit uniquement dans les blocks CIS autorisés,
- propose `content/props` conformes aux schémas,
- choisit un `themeId` CIS (pas d’hex arbitraire).

#### Étapes
1) Définir un JSON Schema “WebsitePlan”
   - `themeId`
   - `pages[]` (si multi-pages)
   - pour chaque page : `blocks[]` (ordered), et par block : `content/props`

2) Prompts orchestrateur
   - Input : brief + design system Max UI + catalogue themes + catalogue blocks + page objective
   - Output : JSON only

3) Validation serveur
   - Rejeter blocs inconnus, props invalides, pages inconnues
   - Sanitization : limites taille texte, listes, etc.

4) UI preview
   - Avant “Appliquer”, afficher :
     - thème choisi
     - structure par page
     - aperçu copy (headline/CTA) pour les blocks pilotes

**Définition of Done**
- “Proposer une structure” remplit aussi le contenu/props et permet d’appliquer sans casser le builder.

---

### WS-D — “Website multi-pages generator” (depuis le brief)
**But** : produire automatiquement les pages minimales et leur navigation.

#### Étapes (recommandées)
1) Ajouter un champ “site type” (ou “industry/product type”) dans le brief
   - Ex: SaaS / service / agence / portfolio / événement / newsletter…

2) Endpoint “proposer pages”
   - Output : `pages[]` avec slug/title/objective/expected_action/key_messages + priorité
   - UI : l’utilisateur valide la liste (ajouter/supprimer/renommer)

3) Appliquer : créer pages en DB
   - Home toujours présente
   - Contact, About, Pricing selon pertinence (pas “toujours” aveuglément)
   - Nav order cohérent

4) Génération structure+config par page (utilise WS-C)
   - Bouton global : “Générer le site (pages + blocks)”
   - Puis possibilité de régénérer page par page.

**Définition of Done**
- À partir du brief, CIS peut créer les pages principales et pré-remplir un premier draft complet.

---

### WS-E — STT (Speech-to-Text) pour le brief (MVP)
**But** : permettre à l’utilisateur de dicter son brief, sans streaming.

#### Étapes
1) Choix du provider STT (à décider)
   - Option cloud (clé séparée) vs option local (plus lourd).
   - Reco MVP : provider cloud, non-streaming, upload fichier audio.

2) Backend : endpoint `POST /stt/transcribe`
   - Upload audio (mp3/m4a/wav)
   - Retour : texte brut + (optionnel) segments
   - Sécurité : taille max, durée max, nettoyage, pas de stockage long terme par défaut.

3) Frontend : bouton micro / upload
   - Écrit la transcription dans un champ “notes de dictée”
   - Bouton “Remplir le brief” (LLM) : transforme notes → champs structurés.

**Définition of Done**
- L’utilisateur peut dicter, obtenir du texte, et remplir automatiquement le brief.

---

### WS-F — Pack handoff enrichi (MVP)
**But** : transmettre au LLM codeur un pack qui inclut ce qui a été décidé.

Inclure dans le pack :
- design system Max UI (markdown + JSON)
- thème CIS sélectionné
- pages website (DB export) avec blocks + content/props
- mapping blocks/meta (pour aider le LLM codeur à comprendre les variantes)

**Définition of Done**
- Le zip handoff permet à un LLM codeur de continuer proprement sans “deviner” le design.

---

## 4) Milestones (proposés)

### Milestone 1 — Blocks configurables (socle)
- WS-A (1 → 5) + mise à jour “Proposer une structure” pour remplir `content/props` sur 3 blocks pilotes.

### Milestone 2 — Multi-pages generator
- WS-D (pages proposées + création DB) + génération structure par page.

### Milestone 3 — STT brief
- WS-E complet + “Remplir le brief” cadré.

### Milestone 4 — Pack enrichi
- WS-F complet + doc d’usage.

---

## 5) Tests & Validation (minimum)

### Smoke tests manuels
1) Login
2) Brief : remplir ou dicter (STT), sauvegarde OK
3) Générer pages : créer/valider, nav OK
4) Pour Home : proposer structure, preview OK, appliquer, drag&drop OK
5) Éditer un block (Hero/Features/Pricing) : autosave OK
6) Export pack : zip OK, contient design system + pages + theme

### Contrôles sécurité (MVP)
- Aucune clé/API dans le pack
- Validation stricte JSON orchestrateur (anti-hallucination)
- Limites taille sur texte (brief + content blocks)

---

## 6) Décisions à prendre (avant implémentation WS-E & WS-D)

1) STT provider : cloud vs local, clé séparée ou mutualisée, limite durée.
2) “Pages minimum” : quelles pages sont obligatoires par défaut (Home oui, Contact presque toujours, le reste dépend du type).
3) Fonts : autorise-t-on Max UI à proposer une font pairing (et donc modifier le projet) ou seulement des règles typographiques ?

