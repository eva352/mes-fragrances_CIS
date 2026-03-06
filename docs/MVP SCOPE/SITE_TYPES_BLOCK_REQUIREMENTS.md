# CIS — “Types de site” → sections/blocs attendus (référence)

But : identifier rapidement **ce qui manque dans la librairie CIS** selon le type de site, et guider Max UI / l’orchestrateur pour proposer une structure cohérente.

Ce document est **volontairement orienté “sections”** (Hero, Galerie, Services, etc.) plutôt que “composants précis”, car :
- Max UI raisonne en patterns/sections (landing patterns),
- CIS rend des **blocs shadcn** par *catégorie*,
- et la couverture en blocs évolue (tu peux en ajouter 1000+).

---

## 1) Ce que CIS a *aujourd’hui* (catégories de blocs)

Catégories visibles dans `frontend/blocks/manifest.ts` :
- `hero`
- `features`
- `about`
- `process`
- `pricing`
- `compare`
- `tabs` (souvent utilisé comme FAQ/accordéon/tabs)
- `timeline` (souvent utilisé comme social proof “témoignages”, faute de mieux)
- `modal` (offer modal)

Ce qui manque souvent pour un site vitrine “réaliste” (à ajouter via blocs) :
- `gallery` / portfolio (grille + lightbox)
- `testimonials` (carrousel + avatars + notes)
- `contact` (formulaire + infos + map)
- `footer` / `navbar` / `cta` dédiés
- `faq` (accordéon dédié, même si `tabs` peut dépanner)
- `logos` (logo cloud / partenaires)
- `before-after` (très utile pour Architecture/Interior, beauté, fitness, etc.)
- `services` (cartes service + détails)
- `team` (équipe, bios, photos)

---

## 2) Taxonomie “sections” recommandée (langage commun CIS × Max UI)

On se base sur une liste de sections “universelles” :
- **Hero** (promesse + CTA)
- **Trust / Social proof** (logos, chiffres, avis, études de cas)
- **Services / Offer** (ce que tu fais)
- **Portfolio / Gallery** (preuves visuelles)
- **Process** (comment ça se passe)
- **Pricing / Packages** (ou “à partir de…”)
- **FAQ** (objections)
- **About / Story** (qui, pourquoi)
- **Contact / Booking** (conversion finale)
- **Footer**

Chaque “type de site” est juste un sous-ensemble + une priorité.

---

## 3) Matrice par “type de site” (Max UI Product Type → sections)

### A) Architecture / Interior (Décoration intérieure, architecte)
**Priorités :** preuve visuelle + crédibilité + prise de contact.

Sections attendues :
1) Hero (promesse + CTA devis)
2) Portfolio / Gallery (réalisations)
3) Before/After (si possible)
4) Services (offres / prestations)
5) Process (brief → concept → livraison)
6) Testimonials / avis (ou preuves)
7) Pricing “à partir de…” / packs
8) FAQ (délais, budget, zone)
9) Contact (formulaire + zone)

Mapping CIS (actuel) :
- ✅ Hero → `hero/*` (préférer un hero “visuel”)
- ✅ Services → `features/*` (en mode “prestations”)
- ✅ Process → `process/*`
- ✅ About → `about/*`
- ✅ Pricing → `pricing/*`
- ⚠️ Testimonials → `timeline/*` en MVP (ou bloc dédié à créer)
- ⚠️ FAQ → `tabs/*` en MVP (ou bloc dédié à créer)
- ❌ Portfolio/Gallery → **bloc manquant** (`gallery`)
- ❌ Before/After → **bloc manquant** (`before-after`)
- ❌ Contact (form) → **bloc manquant** (`contact`)

Blocs à prévoir (recommandation) :
- `gallery`: grid 2/3 colonnes + filtres (pièces) + lightbox
- `before-after`: slider image + 3–6 cas
- `testimonials`: cartes + photo + note (option)
- `contact`: form + coordonnées + map (option)

---

### B) Bakery/Cafe (Boulangerie / café)
**Priorités :** envie + horaires/adresse + commande.

Sections attendues :
1) Hero (produits + CTA commande/itinéraire)
2) Menu / produits phares
3) Horaires + localisation
4) Social proof (avis, presse)
5) “À propos” (fait maison, histoire)
6) CTA commande / click&collect

Mapping CIS :
- ✅ Hero → `hero/*`
- ✅ Menu/produits phares → `features/*` (cartes)
- ✅ About → `about/*`
- ⚠️ Social proof → `timeline/*`
- ❌ Horaires + map → **bloc manquant** (`location`)
- ❌ CTA “commande” dédié → **bloc manquant** (`cta`)

---

### C) B2B Service (cabinet / freelance / agence)
**Priorités :** proposition de valeur claire + preuves + RDV.

Sections attendues :
1) Hero (promesse + CTA RDV)
2) Services (3–6 offres)
3) Méthode / Process
4) Cas clients / résultats (preuves)
5) Pricing (audit / pack)
6) FAQ (objections)
7) Contact / booking

Mapping CIS :
- ✅ Hero → `hero/*`
- ✅ Services → `features/*`
- ✅ Process → `process/*`
- ✅ Pricing → `pricing/*`
- ✅ Compare → `compare/*` (plans / comparatif)
- ⚠️ Cas clients / résultats → `features/*` ou `timeline/*` (MVP)
- ⚠️ FAQ → `tabs/*`
- ❌ Contact/booking → **bloc manquant** (`contact` / `booking`)

---

### D) Florist/Plant Shop (Fleuriste / plantes)
**Priorités :** collections + livraison + occasions.

Sections attendues :
1) Hero (saison + CTA)
2) Collections / occasions
3) Livraison (zone/délai/prix)
4) Abonnement (option)
5) Social proof
6) Contact / commande

Manquants fréquents :
- `gallery` (collections)
- `delivery` (zone + délais + CTA)
- `contact/ordering`

---

### E) Photography Studio (Photographe)
**Priorités :** portfolio + packs + demande de devis.

Sections attendues :
1) Hero (style + CTA)
2) Portfolio/Gallery (catégories)
3) Process (comment ça se passe)
4) Pricing / packs
5) Testimonials
6) Contact

Manquants fréquents :
- `gallery`
- `testimonials` (ou timeline en MVP)
- `contact`

---

### F) Beauty/Spa/Wellness Service (Institut, spa, bien-être)
**Priorités :** prestations + réservation + preuve (avant/après, avis).

Sections attendues :
1) Hero (booking)
2) Services / menu (prestations)
3) Before/After (ou résultats)
4) Testimonials
5) Pricing / packs (option)
6) FAQ (contre-indications, durée, tarifs)
7) Contact / booking (conversion)

Mapping CIS :
- ✅ Hero → `hero/*`
- ✅ Services → `features/*` (cartes)
- ✅ Pricing → `pricing/*` (option)
- ⚠️ FAQ → `tabs/*` (MVP)
- ⚠️ Testimonials → `timeline/*` (MVP)
- ❌ Before/After → **bloc manquant** (`before-after`)
- ❌ Booking/Contact → **bloc manquant** (`booking` / `contact`)

---

### G) Restaurant/Food Service (Restaurant, livraison, réservation)
**Priorités :** menu + photos + réservation/commande + localisation.

Sections attendues :
1) Hero (réserver / commander)
2) Menu (catégories + plats phares)
3) Photos / galerie (ambiance + plats)
4) Horaires + adresse + map
5) Avis (social proof)
6) CTA (réservation / livraison)

Mapping CIS :
- ✅ Hero → `hero/*`
- ✅ Menu → `features/*` (cartes) ou `tabs/*` (onglets)
- ⚠️ Avis → `timeline/*` (MVP)
- ❌ Galerie photos → **bloc manquant** (`gallery`)
- ❌ Horaires + map → **bloc manquant** (`location`)
- ❌ CTA réservation/commande dédié → **bloc manquant** (`cta` / `booking`)

---

### H) Real Estate/Property (Immobilier)
**Priorités :** listings + preuves + prise de contact + visites.

Sections attendues :
1) Hero (recherche / contact agent)
2) Listings (cartes biens + filtres)
3) Map / zones (option)
4) Services (achat, vente, estimation)
5) Agents / équipe
6) Testimonials / avis
7) Contact

Mapping CIS :
- ✅ Hero → `hero/*`
- ✅ Services → `features/*`
- ⚠️ Testimonials → `timeline/*` (MVP)
- ❌ Listings → **bloc manquant** (`listings`)
- ❌ Map → **bloc manquant** (`map`)
- ❌ Team/Agents → **bloc manquant** (`team`)
- ❌ Contact → **bloc manquant** (`contact`)

---

### I) Wedding/Event Planning (Mariage / évènementiel)
**Priorités :** portfolio + récit + confiance + prise de contact.

Sections attendues :
1) Hero (inspiration + CTA)
2) Portfolio / galerie
3) Services / packages
4) Process / timeline (déroulé)
5) Testimonials
6) FAQ
7) Contact

Mapping CIS :
- ✅ Hero → `hero/*`
- ✅ Services → `features/*`
- ✅ Process → `process/*` et/ou `timeline/*`
- ✅ Pricing → `pricing/*` (packages)
- ⚠️ FAQ → `tabs/*` (MVP)
- ❌ Galerie → **bloc manquant** (`gallery`)
- ❌ Testimonials (dédié) → **bloc manquant** (`testimonials`) (timeline en MVP)
- ❌ Contact → **bloc manquant** (`contact`)

---

### J) Legal Services / Consulting Firm (Cabinet avocat, conseil)
**Priorités :** crédibilité + domaines d’expertise + prise de RDV.

Sections attendues :
1) Hero (consultation)
2) Practice areas / services
3) Preuves (résultats, chiffres, cas)
4) Team (avocats, bios)
5) FAQ (honoraires, délais)
6) Contact

Mapping CIS :
- ✅ Hero → `hero/*`
- ✅ Services → `features/*`
- ✅ About → `about/*` (story/values)
- ⚠️ FAQ → `tabs/*` (MVP)
- ❌ Team → **bloc manquant** (`team`)
- ❌ Contact → **bloc manquant** (`contact`)

---

### K) Non-profit/Charity (Association, ONG)
**Priorités :** impact + confiance + don/engagement.

Sections attendues :
1) Hero (donner / s’engager)
2) Impact (chiffres, projets)
3) Stories (témoignages)
4) Transparence (finances, rapports)
5) CTA don + bénévolat
6) Contact

Mapping CIS :
- ✅ Hero → `hero/*`
- ✅ Impact → `features/*`
- ✅ About → `about/*`
- ⚠️ Stories/Proof → `timeline/*` (MVP)
- ❌ CTA don dédié → **bloc manquant** (`donation-cta`)
- ❌ Transparence / rapports → **bloc manquant** (`reports`)
- ❌ Contact → **bloc manquant** (`contact`)

---

## 4) Pourquoi “toujours le même hero” aujourd’hui ?

État actuel :
- CIS fournit `availableBlocks` **sans metadata** (juste category/slug/title).
- En plus, l’orchestrateur a une **préférence hardcodée** (MVP) pour `hero/hero-1`, `features/feature-51`, `pricing/pricing-9` afin de tester le rendu “contenu piloté”.
- Sans description “capabilities” (visuel, 1 CTA vs 2 CTA, galerie, etc.), l’orchestrateur a tendance à :
  - prendre le premier de la liste (ou la préférence hardcodée),
  - ou choisir au hasard (si température > 0).

**Solution recommandée : enrichir Max UI avec une base “CIS Blocks Catalog”** :
- un fichier (JSON/CSV) par bloc CIS avec :
  - `sectionType` (hero/features/gallery/…)
  - `bestForSiteTypes` (liste Max UI Product Types)
  - `styleFit` (minimal, premium, playful, editorial…)
  - `capabilities` (2 CTA, bullets, image grid, tabs, etc.)
  - `requiresAssets` (images, logos, etc.)
- puis un scoring simple côté serveur pour proposer des blocs adaptés.

Ça évite d’envoyer le code TSX complet au LLM (trop lourd/instable) :
on envoie **une fiche descriptive** par bloc.

---

## 5) Thèmes (palettes CIS) : ce que Max UI doit/peut utiliser

État actuel :
- Le builder preview est déjà thémé via Aurora (`data-aurora-theme`) + sync backend (`appSpec.project.theme.palette`).
- **“Proposer une structure” ne reçoit pas le thème** (ni l’id, ni les swatches), donc Max UI/LLM ne peut pas “choisir” une palette CIS.
- Max UI expose quand même des couleurs dans son markdown (CSV), mais on ne les applique pas (par design).

Recommandation MVP (sans casser la règle “pas d’hex arbitraire”) :
- Ajouter un champ `themeId` (liste fermée `AURORA_THEMES`) dans `Paramètres`.
- Envoyer au LLM : `themeId` + `label` + 3–4 swatches (background/primary/secondary/accent) **uniquement**.
- Laisser le LLM **choisir un themeId** (si l’utilisateur veut “auto”), ou respecter celui choisi.

Effet attendu :
- Copywriting + iconographie + visuels suggérés cohérents avec le thème (premium, pastel, tech, etc.)
- Et à terme : mapping `siteType → thèmes recommandés` côté serveur.

---

## 6) Langue FR/EN

État actuel :
- la plupart des blocs (hors 3 pilotes) ont du texte placeholder en anglais,
- l’orchestrateur peut générer du contenu FR, mais il n’est appliqué que sur les blocs configurables.

Recommandation MVP :
- ajouter un paramètre global `language` (`fr` / `en`) utilisé par l’orchestrateur,
- rendre configurables en priorité les blocs qui affichent du texte (About, Features, FAQ, Contact),
- puis faire respecter la langue dans `content`.

---

## 7) Pourquoi certains blocs ne sont pas “personnalisés” (ex: About)

État actuel :
- Seuls 3 blocs sont pilotés par `content` (hero-1, feature-51, pricing-9).
- Les autres blocs rendent leur texte “en dur” (placeholders).

Recommandation :
- Ajouter progressivement des “schemas `content`” par catégorie : `about/*`, `tabs/*` (FAQ), `timeline/*` (avis), puis `contact/*`, `gallery/*`.
- Garder une règle simple : **un schema par catégorie**, réutilisable par plusieurs variantes de blocs.
