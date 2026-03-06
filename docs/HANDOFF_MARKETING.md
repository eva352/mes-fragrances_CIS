# Handoff — Mode “Marketing / Landing pages” pour AuroraStack (à faire demain)

Objectif : permettre de générer des **landing pages / sites vitrines** à partir d’AuroraStack, **sans impacter** le backoffice existant (`(dashboard)`), et en restant 100% compatible avec :
- le **mode** `light/dark` (classe `dark`, `next-themes`, clé `aurora_stack_color_mode`)
- la **palette** multi‑thèmes (attribut `data-aurora-theme`, cookie `aurora_stack_theme` + `localStorage` `aurora-theme`)

---

## 1) Décisions d’architecture (à valider)
### 1.1 Route groups Next.js
- Conserver l’admin/backoffice : `frontend/app/(dashboard)/...` (inchangé)
- Ajouter un groupe public : `frontend/app/(marketing)/...`
  - Exemple : `frontend/app/(marketing)/page.tsx` (Home publique)
  - Autres pages : `frontend/app/(marketing)/pricing/page.tsx`, `.../contact/page.tsx`, `.../legal/page.tsx`

### 1.2 Layouts séparés
- Layout public : `frontend/app/(marketing)/layout.tsx`
  - Navbar publique + footer, largeur max (container), fond `bg-background`, etc.
- Layout dashboard : inchangé (`frontend/app/(dashboard)/layout.tsx`)

### 1.3 Bibliothèque de blocs
- Créer `frontend/components/blocks/`
- Chaque bloc = composant autonome, typé, sans `any`.
- Aucune couleur hardcodée : uniquement tokens (`bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`, etc.).
- Prévoir des variantes via props (ex : `variant="split" | "centered"`).

---

## 2) Pages et blocs à livrer (MVP)
### 2.1 Pages marketing
1) Home (landing) : sections enchaînées (Hero → Logos → Features → Testimonials → Pricing → FAQ → CTA → Footer)
2) Pricing (dédiée)
3) Docs / Aide (public) *optionnel* (si tu veux une page “comment démarrer ce template”)

### 2.2 Blocs (shadcn-friendly)
Créer au minimum :
- `Hero`
- `Logos`
- `FeatureGrid` (icônes + cards)
- `Testimonials`
- `PricingTable`
- `FAQAccordion`
- `CTA`
- `Footer`

Optionnels (si temps) :
- `Stats/KPIs` (3–4 stats)
- `Timeline`
- `ContactForm` (frontend only)
- `NewsletterSignup` (frontend only)

---

## 3) Tester les thèmes (important)
But : évaluer rapidement un thème sans naviguer partout.

Dans le MVP :
- **Backoffice** : utiliser `/ui/components` (showroom composants) pour vérifier rapidement l’apparence.
- **Website** : vérifier directement dans `/builder/landing` (aperçu + blocs) et `/site` (site public).

---

## 4) Navigation / UX
### 4.1 Navbar publique
Dans `frontend/app/(marketing)/layout.tsx` :
- Logo “AuroraStack”
- Liens : pages publiques (issues du builder), Backoffice, Connexion (`/login`)
- CTA bouton (ex : “Démarrer” → `/login` ou `/settings` selon choix)

### 4.2 Footer
Liens : Docs, Support, GitHub (placeholder), Mentions légales (placeholder).

---

## 5) SEO & metadata (MVP)
Pour chaque page marketing :
- `export const metadata` (title + description)
- `robots` (par défaut indexable ; option : noindex sur serveur staging)
Optionnel :
- `sitemap.xml` / `robots.txt` (plus tard)

---

## 6) Contenu & configuration (sans backend)
Pour rester “starter” :
- Mettre le contenu dans `frontend/lib/marketing/content.ts` (objets/arrays)
  - texts, pricing plans, faqs, testimonials, etc.
- Pas de DB pour le marketing MVP.
Option plus tard :
- Brancher sur CMS/MDX, ou tables “pages” en DB.

---

## 7) Validation / critères d’acceptation
### Fonctionnel
- `http://localhost:<AURORA_FRONTEND_PORT>/` affiche la landing
- `/showroom` existe et permet de juger les thèmes (visuel clair)
- `/login` et `/dashboard` inchangés

### Thèmes
- Changer la palette (Paramètres) : impact visible sur marketing + dashboard
- Changer light/dark : impact visible sur marketing + dashboard
- Persistance OK : nouvel onglet conserve le thème choisi

### Responsive
- Mobile : navbar compacte, sections stackées, pas de débordement horizontal.

---

## 8) Étapes d’implémentation (ordre recommandé)
1) Ajouter le route group `(marketing)` + layout + page home minimale.
2) Créer les blocs dans `frontend/components/blocks/` (Hero + 2–3 blocs).
3) Ajouter la page `/showroom` (priorité pour tester les thèmes).
4) Compléter les blocs (Testimonials, Pricing, FAQ, Footer).
5) Ajouter une page `/pricing` dédiée (réutiliser `PricingTable`).
6) Repasser tous les blocs pour remplacer toute couleur hardcodée par tokens.
7) Rebuild Docker et smoke test.

---

## 9) Commandes de test
```bash
docker compose up -d --build
docker compose exec -T backend python -m alembic upgrade head
```
Puis ouvrir :
- `http://localhost:${AURORA_FRONTEND_PORT}/` (marketing)
- `http://localhost:${AURORA_FRONTEND_PORT}/showroom`
- `http://localhost:${AURORA_FRONTEND_PORT}/login`

---

## 10) Notes / risques
- Garder `(dashboard)` stable : pas de refactor global du layout.
- Ne pas introduire de dépendances lourdes (préférer shadcn + Tailwind).
- Penser “tokens d’abord” pour que les thèmes TweakUI CN restent fiables.
