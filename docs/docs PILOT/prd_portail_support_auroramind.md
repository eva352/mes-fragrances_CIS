# PRD — Portail Support unifié Auroramind

## 1. Résumé produit

Auroramind a besoin d’un portail support unifié, intégré à `pilot.auroramind.fr`, pour centraliser la déclaration, le suivi et le traitement des tickets issus de ses différentes applications SaaS.

Le produit doit couvrir deux besoins simultanés :

- **côté utilisateur final** : signaler simplement un bug, une demande de fonctionnalité ou une amélioration, puis suivre l’avancement
- **côté interne** : trier, prioriser, planifier, commenter et piloter les tickets dans une interface moderne avec vues liste, kanban et calendrier

Le portail support sera exposé sous :

- `https://pilot.auroramind.fr/support`
- API : `https://pilot.auroramind.fr/support/api`

Le système s’appuie sur la stack Auroramind existante : **Next.js + shadcn/ui + FastAPI + PostgreSQL + Docker + Caddy**.

---

## 2. Problème à résoudre

Aujourd’hui, le support produit n’est pas structuré autour d’un portail transverse simple, rapide à déployer et cohérent avec les applications Auroramind.

Les limites à corriger sont :

- pas de point d’entrée unique pour le support
- pas de séparation claire entre vue client et vue interne
- difficulté à suivre les demandes par application
- manque de visibilité sur le cycle de traitement
- risque de bricolage avec des outils tiers trop lourds ou trop rigides
- absence de base propre pour industrialiser la relation support/produit

---

## 3. Vision produit

Créer un **module support natif du pilot** permettant :

- une expérience homogène dans toutes les apps Auroramind
- une logique multi-applications
- un suivi lisible pour les utilisateurs
- un vrai backoffice produit pour Auroramind
- une base solide pour faire évoluer plus tard vers :
  - analytics support
  - SLA
  - roadmap publique
  - notifications avancées
  - intégration RAG / recherche sémantique
  - priorisation assistée par IA

---

## 4. Objectifs

### Objectifs business
- professionnaliser le support produit
- améliorer la perception client
- réduire le temps de traitement des demandes
- créer un socle réutilisable pour toutes les applications Auroramind
- éviter la dépendance à des outils externes lourds

### Objectifs produit
- permettre la création rapide de tickets
- permettre le suivi clair des tickets
- permettre au staff de piloter les tickets dans une interface moderne
- distinguer clairement le workflow interne et la vue publique
- exploiter une vue calendrier pour les dates cibles de livraison

### Objectifs techniques
- réutiliser la stack Context Intelligence Studio
- déployer sur le serveur OVH existant
- utiliser PostgreSQL déjà disponible
- exposer le tout derrière Caddy via routing par préfixe
- rester dockerisable, modulaire et maintenable

---

## 5. Utilisateurs cibles

### 5.1 Utilisateur final
Personne connectée à une application Auroramind qui souhaite :

- signaler un bug
- proposer une amélioration
- demander une fonctionnalité
- suivre ses tickets
- lire les réponses du support

### 5.2 Staff Auroramind
Profil support / produit / technique qui souhaite :

- voir tous les tickets
- qualifier les demandes
- les prioriser
- répondre au client
- les assigner
- les déplacer dans le workflow
- poser une date cible

### 5.3 Administrateur
Profil interne avec droits avancés :

- gérer les applications supportées
- superviser les droits
- administrer les référentiels
- supprimer ou archiver si besoin

---

## 6. Périmètre produit

## 6.1 In scope

### Côté utilisateur
- menu “Aide” dans les applications
- formulaire de création de ticket
- sélection de l’application concernée
- type de demande :
  - bug
  - fonctionnalité
  - amélioration
- criticité pour les bugs
- titre
- description
- URL de la page concernée
- pièce jointe
- suivi des tickets
- lecture des commentaires publics
- consultation en lecture seule du workflow

### Côté staff
- liste des tickets
- détail d’un ticket
- modification des statuts
- assignation
- commentaires publics et internes
- gestion des pièces jointes
- vue kanban
- vue grille/liste
- vue calendrier
- filtrage par application, type, statut, criticité

### Côté plateforme
- API FastAPI
- stockage PostgreSQL
- stockage des pièces jointes
- authentification via token/session existante
- routage derrière Caddy sous `/support` et `/support/api`

## 6.2 Out of scope au MVP
- centre d’aide / base de connaissances
- chatbot support
- SLA contractuels
- moteur de priorité intelligent
- roadmap publique votable
- multi-tenant complexe
- analytics avancées
- websocket temps réel

---

## 7. Flux utilisateurs

## 7.1 Flux utilisateur final

### Déclaration
1. L’utilisateur clique sur **Aide**
2. Il ouvre l’onglet **Déclarer**
3. Le système préremplit :
   - application
   - utilisateur
   - URL courante
4. Il choisit le type
5. Il renseigne le titre et la description
6. Il joint un fichier si besoin
7. Il envoie
8. Il reçoit une confirmation

### Suivi
1. L’utilisateur ouvre l’onglet **Suivi**
2. Il voit ses tickets
3. Il consulte leur statut public
4. Il ouvre le détail
5. Il lit les commentaires publics
6. Il voit, si renseignée, la date cible estimée

## 7.2 Flux staff

### Triage
1. Le staff ouvre le backoffice
2. Il voit les tickets entrants
3. Il lit le contenu et les pièces jointes
4. Il choisit :
   - refus
   - étude
   - planification
5. Il répond si nécessaire

### Pilotage
1. Le staff utilise le kanban
2. Il déplace les cartes entre colonnes
3. Il assigne un ticket
4. Il renseigne une date cible
5. Il ajoute des commentaires publics ou internes
6. Il clôture le ticket

---

## 8. Workflow métier

### Types de ticket
- `bug`
- `feature`
- `improvement`

### Criticité
- `low`
- `medium`
- `high`
- `critical`

### Statuts internes
- `new`
- `triage`
- `todo`
- `in_progress`
- `testing`
- `done`
- `rejected`

### Statuts publics
- `received`
- `under_review`
- `planned`
- `in_progress`
- `resolved`
- `rejected`

### Règle de lecture
L’utilisateur final ne voit jamais le workflow interne brut.  
Il voit une version simplifiée et compréhensible.

---

## 9. Expérience utilisateur attendue

## 9.1 UX côté client
Le portail doit être :

- simple
- rapide
- rassurant
- sans jargon
- lisible sur desktop en priorité
- cohérent avec les autres apps Auroramind

Le client ne doit jamais avoir l’impression d’entrer dans un outil de gestion interne.

## 9.2 UX côté staff
Le backoffice doit être :

- dense mais clair
- orienté action
- rapide à manipuler
- adapté au triage
- adapté au pilotage visuel

Le kanban ne doit pas être décoratif : il doit vraiment servir d’outil de gestion.

---

## 10. Exigences fonctionnelles

## 10.1 Gestion des tickets
Le système doit permettre :

- la création d’un ticket
- la lecture d’un ticket
- la mise à jour d’un ticket
- la liste filtrée des tickets
- la suppression réservée à l’admin si nécessaire

## 10.2 Gestion des commentaires
Le système doit permettre :

- l’ajout de commentaires publics
- l’ajout de commentaires internes
- la lecture filtrée selon le rôle
- l’historisation des échanges

## 10.3 Gestion des pièces jointes
Le système doit permettre :

- l’upload d’un fichier
- l’affichage d’un fichier lié à un ticket
- la suppression selon les droits
- un contrôle type/taille

## 10.4 Gestion du planning
Le système doit permettre :

- la définition d’une date cible
- l’exploitation de cette date en vue calendrier
- la mise à jour de cette date par le staff

## 10.5 Gestion des applications
Le système doit permettre :

- de référencer plusieurs applications Auroramind
- de rattacher chaque ticket à une application
- de filtrer par application

---

## 11. Exigences non fonctionnelles

### Sécurité
- authentification obligatoire
- contrôle des rôles
- validation stricte des payloads
- HTTPS obligatoire
- protection des uploads

### Performance
- temps de chargement acceptable sur liste/kanban
- pagination backend
- index PostgreSQL sur champs critiques

### Maintenabilité
- séparation claire frontend/backend
- composants support regroupés dans un module dédié
- schémas Pydantic propres
- migrations Alembic

### Déploiement
- déploiement par Docker Compose
- reverse proxy Caddy
- compatibilité avec le serveur OVH existant

---

## 12. Architecture produit retenue

## 12.1 Frontend
**Next.js** intégré au pilot.

Le support n’est pas une application isolée avec un domaine séparé.  
C’est un module du pilot exposé sous `/support`.

Routes principales :

- `/support`
- `/support/new`
- `/support/my-tickets`
- `/support/admin`
- `/support/admin/tickets/[id]`

## 12.2 Backend
**FastAPI** dédié au support.

Responsabilités :

- logique métier
- validation
- permissions
- CRUD tickets
- commentaires
- pièces jointes
- événements
- filtres et pagination

Base publique :

- `/support/api`

## 12.3 Base de données
**PostgreSQL**

Tables principales :

- `applications`
- `tickets`
- `ticket_messages`
- `ticket_attachments`
- `ticket_events`

## 12.4 Stockage fichiers
Deux options :

- volume local Docker
- MinIO / S3 compatible

Pour le MVP, stockage local possible.  
Pour une version plus robuste, MinIO est préférable.

## 12.5 Reverse proxy
**Caddy** sur :

- `https://pilot.auroramind.fr`

Logique :

- `/support/api/*` → FastAPI
- le reste, y compris `/support/*` → frontend Next.js

---

## 13. Décision UI/stack front

### Côté backoffice
Utiliser **shadcn-data-views** pour accélérer :

- vue grille
- vue kanban
- vue calendrier
- vue formulaire

### Côté utilisateur
Ne pas exposer tel quel le composant backoffice.

Créer soit :
- un wrapper lecture seule
- soit un composant dédié plus simple

Décision recommandée :
- **staff** : `shadcn-data-views`
- **user** : composant support lecture seule dédié

---

## 14. Modèle de données métier

Chaque ticket doit contenir au minimum :

- identifiant
- application
- utilisateur créateur
- email reporter
- type
- criticité
- titre
- description
- URL de page
- statut interne
- statut public
- assignation
- date cible
- date création
- date mise à jour
- date clôture éventuelle

Chaque ticket peut contenir :

- plusieurs commentaires
- plusieurs pièces jointes
- plusieurs événements d’historique

---

## 15. MVP retenu

Le MVP doit inclure :

### Utilisateur
- formulaire de ticket
- suivi de ses tickets
- détail ticket
- commentaires publics

### Staff
- liste tickets
- détail ticket
- changement de statut
- commentaires publics/internes
- date cible
- vue kanban
- vue calendrier

### Plateforme
- API sécurisée
- PostgreSQL
- Docker
- Caddy
- exposition sous `/support`

---

## 16. Post-MVP envisagé

- capture d’écran intégrée dans l’app
- notifications e-mail
- notifications in-app
- admin des applications
- statistiques support
- réouverture ticket
- roadmap publique
- scoring/priorisation par IA
- recherche sémantique dans les tickets
- connexion à GitHub issues / Kanboard

---

## 17. Risques principaux

### Risque 1 — partir trop tôt sur une UI sophistiquée
Réponse :
commencer par la base métier et l’API

### Risque 2 — confusion entre vue staff et vue client
Réponse :
séparer strictement les composants et les permissions

### Risque 3 — suringénierie dès le départ
Réponse :
sortir d’abord un MVP exploitable

### Risque 4 — complexité de routing sous `/support`
Réponse :
intégrer le support directement dans le frontend du pilot

### Risque 5 — logique métier dispersée dans le frontend
Réponse :
garder FastAPI comme source de vérité

---

## 18. Critères de succès

Le produit est considéré comme réussi si :

- un utilisateur peut créer un ticket sans friction
- le ticket arrive correctement en base
- le staff peut le traiter sans accès manuel à la base
- le client suit l’évolution en lecture seule
- le staff pilote les tickets dans une interface claire
- la vue calendrier permet de visualiser les dates cibles
- le tout est déployé proprement sur OVH via Docker/Caddy/Postgres

---

## 19. Recommandation finale

La bonne stratégie est :

1. construire d’abord le **socle métier** :
   - PostgreSQL
   - FastAPI
   - schémas
   - permissions
2. livrer rapidement le **formulaire utilisateur**
3. livrer ensuite le **backoffice staff simple**
4. ajouter les **commentaires**
5. brancher ensuite **shadcn-data-views** pour le confort visuel
6. terminer par la **vue lecture seule utilisateur** propre

En une phrase :

**le portail support doit être pensé comme un module natif du pilot, avec un backend métier propre, une vue staff moderne et une vue client volontairement simple et rassurante.**
