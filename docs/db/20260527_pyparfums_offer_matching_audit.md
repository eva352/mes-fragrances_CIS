# Audit PostgreSQL: matching `perfumes` / `offers` / `product_match_candidates`

Date de l'audit: 2026-05-27  
Base auditée: PostgreSQL `pilot` sur `mes-fragrances_cis-db-1`  
Périmètre: lecture seule, aucune écriture DB effectuée

## Objectif

Améliorer le matching entre:

- `public.perfumes`: catalogue connu par le site
- `public.offers`: offres affiliate importées depuis les feeds
- `public.product_match_candidates`: produits non matchés automatiquement ou matchés avec incertitude

## Résumé exécutif

Le point bloquant principal n'est pas un problème de volume ou d'index sur `offers`: c'est un problème de granularité et d'identifiants dans `perfumes`.

Constats structurants:

1. `perfumes` ne possède pas encore les colonnes que le moteur de matching sait déjà exploiter:
   - `concentration`
   - `volume_ml`
   - `ean`
   - `gtin`
   - `upc`
   - `mpn`
2. `offers` est déjà très propre pour le matching:
   - `493/493` offres ont `perfume_id`
   - `493/493` offres ont `affiliate_url`
   - `493/493` offres ont `ean`
   - `493/493` offres ont `mpn`
3. `product_match_candidates` confirme que la granularité produit manque dans `perfumes`:
   - `1516/2073` candidats ont une concentration
   - `1183/2073` candidats ont un volume
   - `76/2073` candidats ont déjà un `proposed_perfume_id`
   - parmi ces 76, `70` ont une concentration renseignée
4. Le catalogue `perfumes` est encore pauvre sur des champs utiles:
   - `image_url`: `0/1527`
   - `budget_tier`: `0/1527`
   - `top_notes`, `heart_notes`, `base_notes`: `0/1527`
5. Les identifiants exacts sont un levier immédiat:
   - `offers.raw_payload->>'ean'`: `493/493` remplis, `493` distincts
   - `offers.raw_payload->>'mpn'`: `493/493` remplis, `493` distincts
   - la DB a déjà `alembic_version = 202605201650`, donc la migration proposée doit être additive et séparée

## État actuel des tables

### `public.perfumes`

Volume:

- `1527` lignes
- `1527` publiées

Taux de remplissage:

| Champ | Rempli | Taux |
|---|---:|---:|
| `slug` | 1527 | 100% |
| `name` | 1527 | 100% |
| `brand` | 1527 | 100% |
| `image_url` | 0 | 0% |
| `short_description` | 1527 | 100% |
| `description` | 1527 | 100% |
| `gender` | 1523 | 99.74% |
| `source_price` | 1527 | 100% |
| `olfactive_family` | 1498 | 98.10% |
| `budget_tier` | 0 | 0% |
| `top_notes` non vides | 0 | 0% |
| `heart_notes` non vides | 0 | 0% |
| `base_notes` non vides | 0 | 0% |
| `quiz_tags` non vides | 1527 | 100% |

Colonnes manquantes pour améliorer le matching:

- `concentration`
- `volume_ml`
- `ean`
- `gtin`
- `upc`
- `mpn`

Conclusion:

- la table est exploitable pour le catalogue public
- elle n'est pas assez structurée pour un matching robuste au niveau variante/SKU

### `public.offers`

Volume:

- `493` lignes
- `493` actives

Qualité de données:

| Champ | Rempli | Taux |
|---|---:|---:|
| `perfume_id` | 493 | 100% |
| `affiliate_url` | 493 | 100% |
| `image_url` | 493 | 100% |
| `total_price` | 493 | 100% |
| `delivery_cost` | 47 | 9.53% |
| `merchant_product_id` | 493 | 100% |
| `network_product_id` | 493 | 100% |
| `in_stock = true` | 493 | 100% |

Matching actuel:

| Champ | Valeur |
|---|---:|
| `matched_deterministic_key` | 459 |
| `matched_fuzzy` | 34 |

Identifiants utiles:

| Identifiant | Rempli | Distinct | Commentaire |
|---|---:|---:|---|
| `ean` | 493 | 493 | excellent candidat au matching exact |
| `mpn` | 493 | 493 | excellent candidat au matching exact |
| `product_GTIN` | 493 | 1 | inutilisable en l'état sur ce feed |
| `upc` | 0 | 0 | pas exploitable actuellement |

### `public.product_match_candidates`

Volume:

- `2073` lignes

Répartition par statut:

| Statut | Volume |
|---|---:|
| `pending` | 1866 |
| `needs_review` | 207 |

Taux de remplissage utiles:

| Champ | Rempli | Taux |
|---|---:|---:|
| `candidate_brand` | 2071 | 99.90% |
| `candidate_concentration` | 1516 | 73.13% |
| `candidate_volume_ml` | 1183 | 57.07% |
| `candidate_image_url` | 2073 | 100% |
| `candidate_url` | 2073 | 100% |
| `proposed_perfume_id` | 76 | 3.67% |
| `dedupe_key` | 2073 | 100% |

Concentrations observées:

| Valeur | Volume |
|---|---:|
| `parfum` | 869 |
| `edp` | 420 |
| `edt` | 125 |
| `extrait` | 92 |
| `eau_fraiche` | 7 |
| `edc` | 3 |

Volumes observés:

- `5 ml` à `900 ml`
- concentration forte sur `100 ml` (`612` lignes)

Répartition des causes:

- `995/2073` (`48.00%`) n'ont **aucune marque compatible** dans `perfumes`
- `1078/2073` (`52.00%`) ont une marque potentiellement trouvable mais échouent ensuite sur le nom, la variante ou l'ambiguïté

Principales raisons:

| Raison | Volume |
|---|---:|
| `No catalog perfume with a compatible brand was found.` | 995 |
| `Multiple brand-compatible catalog perfumes share the same fuzzy score.` | 65 |
| `excluded_set_or_bundle` | 37 |
| `excluded_refill` | 29 |
| scores fuzzy sous seuil | reste principal |

## Anomalies et limites de matching

### 1. `perfumes` ne modélise pas la variante produit

Le worker sait déjà comparer:

- `brand`
- `normalized name`
- `concentration`
- `volume_ml`
- `ean`
- `gtin`
- `upc`
- `mpn`

Mais `perfumes` ne fournit aujourd'hui que:

- `brand`
- `name`
- `slug`

Conséquence:

- les variantes `EDT` / `EDP` / `Parfum`
- les variantes `30ml` / `50ml` / `100ml`
- les matches exacts par `EAN` / `MPN`

ne peuvent pas être validés automatiquement côté catalogue.

### 2. Les offres montrent déjà des variantes non modélisées

Parmi les `208` parfums qui ont des offres:

- `119` ont plusieurs offres
- `24` ont plusieurs titres d'offre distincts

Exemples:

- `Acqua di Giò`: `Acqua Di Gio 100 ml`, `Acqua Di Gio Parfum 200 ml`, `Acqua di Giò`
- `Olympea`: `Olympéa`, `Olympéa 150 ml`, `Olympéa Parfum`
- `Polo Red`: `Polo Red`, `Polo Red 75 ml`, `Polo Red Parfum`

Conclusion:

- le modèle `1 parfum = 1 nom sans variante` est déjà trop faible pour le matching affiliate

### 3. Le catalogue a un déficit de données média et attributaires

`perfumes.image_url` est vide pour `1527/1527` lignes alors que:

- `493/493` offres ont une image
- `175/208` parfums liés à des offres ont une **image d'offre cohérente et stable** utilisable en backfill

Ce point n'améliore pas directement le matching, mais il améliore:

- la qualité d'affichage
- la revue manuelle des candidats
- la maintenance du catalogue

## Champs manquants recommandés dans `perfumes`

### Priorité 1: matching robuste

- `concentration text`
- `volume_ml numeric(10,2)`
- `ean text`
- `gtin text`
- `upc text`
- `mpn text`

### Priorité 2: qualité catalogue

Le schéma ne manque pas `image_url`, mais la donnée est absente.  
Un backfill contrôlé depuis `offers.image_url` est recommandé.

## Proposition de migration

Migration additive proposée:

- ajouter à `public.perfumes`:
  - `concentration`
  - `volume_ml`
  - `ean`
  - `gtin`
  - `upc`
  - `mpn`
- ajouter des index compatibles avec le flux du worker:
  - `(lower(brand), lower(name))`
  - `(concentration, volume_ml)`
  - index partiels sur `ean`, `gtin`, `upc`, `mpn`

Pourquoi cette migration est utile immédiatement:

- le worker affiliate lit déjà ces colonnes **si elles existent**
- aucun changement applicatif supplémentaire n'est nécessaire pour commencer à les exploiter

## Proposition de backfill

### Source 1: `offers`

Backfill sûr si la valeur est **stable par `perfume_id`**:

- `ean`
- `mpn`
- `image_url`

Mesures actuelles:

| Champ backfillable depuis `offers` | Parfums cohérents | Taux sur parfums avec offres |
|---|---:|---:|
| `ean` | 89 | 42.79% |
| `mpn` | 89 | 42.79% |
| `image_url` | 175 | 84.13% |

### Source 2: `product_match_candidates`

Backfill sûr uniquement si:

- `proposed_perfume_id is not null`
- la valeur est cohérente pour le parfum cible
- la ligne n'est pas un cas `excluded_%`

Mesures actuelles:

| Champ backfillable depuis `product_match_candidates` | Parfums cohérents |
|---|---:|
| `concentration` | 19 |
| `volume_ml` | 6 |
| les deux à la fois | 4 |

Exemples cohérents:

- `Azzaro Chrome Pure` → `edt`, `100 ml`
- `Si Passione Intense` → `parfum`, `50 ml`
- `Luna Rossa Black` → `edp`, `50 ml`
- `Luna Rossa Ocean` → `edp`, `50 ml`

## Recommandations d'index

### À ajouter

#### `perfumes`

1. `idx_perfumes_brand_name_ci`
   - `lower(brand), lower(name)`
   - utile pour les matches déterministes et les audits

2. `idx_perfumes_concentration_volume`
   - `concentration, volume_ml`
   - utile dès que les colonnes existent

3. index partiels sur identifiants exacts
   - `ean`
   - `gtin`
   - `upc`
   - `mpn`

### À envisager en phase 2

1. index trigram sur `lower(brand || ' ' || name)`
   - utile si le fuzzy matching migre un jour côté SQL
   - nécessite `pg_trgm`

2. index de triage sur `product_match_candidates`
   - par exemple `(status, lower(candidate_brand), lower(candidate_name))`
   - utile pour l'outillage de revue manuelle

### Index existants corrects

#### `offers`

- `idx_offers_perfume_active_total_price`
- `offers_advertiser_id_network_product_id_merchant_product_id_key`

#### `product_match_candidates`

- `idx_product_match_candidates_advertiser_dedupe`
- `idx_product_match_candidates_status`
- `idx_product_match_candidates_proposed_perfume`

## Risques

### Risque faible

- ajout de colonnes nullable
- ajout d'index

### Risque moyen

- backfill `ean` / `mpn` sur parfums qui reçoivent plusieurs offres futures divergentes
- backfill `concentration` / `volume_ml` basé sur trop peu de candidats si on relâche les critères

### Règle proposée

Ne backfiller que si:

- la valeur cible est actuellement `NULL`
- la source est non vide
- la source est stable par parfum
- la source ne provient pas d'un cas `excluded_%` pour `concentration` / `volume_ml`

## Conclusion

Conclusion retenue:

- `perfumes` est aujourd'hui trop pauvre pour absorber proprement le matching affiliate au niveau variante
- la meilleure évolution court terme est **d'enrichir `perfumes`**, pas de complexifier immédiatement le moteur
- le feed fournit déjà de bons identifiants (`ean`, `mpn`)
- `product_match_candidates` confirme que `concentration` et `volume_ml` sont les dimensions manquantes les plus utiles

Séquence recommandée:

1. ajouter les colonnes manquantes + index
2. backfill contrôlé depuis `offers` et `product_match_candidates`
3. relancer un audit read-only
4. seulement ensuite décider si un modèle de variantes dédié est nécessaire
