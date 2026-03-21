# Portail Support Auroramind — Plan de développement par lots

## Objet

Ce document découpe le développement du portail support Auroramind en lots successifs, afin de permettre une livraison rapide du MVP puis une montée en puissance progressive.

L’objectif est de donner au développeur :

- un ordre clair d’implémentation
- les dépendances entre briques
- les priorités MVP / post-MVP
- les critères de validation par lot
- une vision réaliste de la première mise en production

---

## Principes de pilotage

## Contrainte d’exposition validée

Le déploiement cible doit considérer dès le départ :

- domaine public : `pilot.auroramind.fr`
- frontend support exposé sous `/support`
- API support exposée sous `/support/api`

Cela implique que le lot de déploiement et le câblage frontend doivent être pensés en **path-based routing Caddy**, et non sur un sous-domaine séparé.


### Ligne directrice

Le produit doit être développé avec une logique simple :

1. **source de vérité = backend FastAPI + PostgreSQL**
2. **UI = Next.js + shadcn/ui**
3. **vues avancées = shadcn-data-views côté backoffice**
4. **lecture seule côté client**
5. **déploiement Docker natif sur OVH**

### Règles de priorisation

Toujours implémenter dans cet ordre :

1. données et sécurité
2. flux minimum utilisateur
3. flux minimum staff
4. confort d’usage
5. enrichissements

### Objectif MVP

Le MVP est atteint lorsque :

- un utilisateur peut créer un ticket depuis une application
- il peut voir l’état de ses tickets
- le staff peut voir les tickets
- le staff peut les déplacer dans un board
- le staff peut répondre
- une date cible peut être posée
- le tout tourne sur le serveur OVH via Docker

---

## Vision des lots

## Lot 0 — cadrage technique et setup projet

### Objectif
Préparer la base de travail propre avant de coder le fonctionnel.

### Contenu
- créer le module `support` dans le repo
- valider l’arborescence frontend/backend
- créer les variables d’environnement
- définir les noms de services Docker
- créer la base PostgreSQL ou le schéma dédié
- valider le mécanisme d’authentification réutilisé
- installer les dépendances frontend/backend

### Dépendances frontend
- `shadcn/ui`
- `react-hook-form`
- `zod`
- `@hookform/resolvers`
- `next-themes`
- `shadcn-data-views`

### Dépendances backend
- `fastapi`
- `sqlalchemy`
- `alembic`
- `psycopg` ou `asyncpg`
- `pydantic`
- bibliothèque de stockage fichier selon choix

### Livrables
- structure de dossiers en place
- compose prêt
- `.env.example`
- migrations Alembic initialisées

### Critère de validation
- le projet démarre localement
- frontend et backend se lancent sans erreur
- connexion à PostgreSQL fonctionnelle

---

## Lot 1 — modèle de données et API minimale tickets

### Objectif
Mettre en place le cœur métier.

### Contenu
- tables :
  - `applications`
  - `tickets`
  - `ticket_messages`
  - `ticket_attachments`
  - `ticket_events`
- modèles SQLAlchemy
- schémas Pydantic
- routes :
  - `GET /applications`
  - `POST /tickets`
  - `GET /tickets`
  - `GET /tickets/{id}`
  - `PATCH /tickets/{id}`

### Règles à intégrer
- statuts internes/publics
- injection `user_id` et `reporter_email` depuis le token
- filtres par utilisateur
- filtres par application
- transitions de statuts de base
- création d’évènements lors des changements de statut

### Livrables
- migrations SQL
- routes FastAPI fonctionnelles
- tests API unitaires de base

### Critère de validation
- création ticket OK
- listing user restreint OK
- listing staff OK
- update ticket staff OK
- sécurité minimale OK

---

## Lot 2 — formulaire utilisateur dans le menu Aide

### Objectif
Permettre à un utilisateur final de déclarer un ticket depuis une application.

### Contenu
- composant `SupportWidget`
- entrée menu “Aide”
- formulaire `TicketForm`
- champs :
  - application
  - type
  - criticité
  - titre
  - description
  - URL courante
- validation Zod
- appel API `POST /tickets`
- écran de confirmation

### Préremplissage attendu
- `app_id`
- `page_url`
- `user_id` indirectement via token

### UX cible
- très simple
- très rapide
- pas de jargon technique inutile
- aucun champ superflu au MVP

### Livrables
- widget intégré dans une première app
- formulaire stylé shadcn/ui
- gestion d’erreurs utilisateur

### Critère de validation
- un utilisateur connecté crée un ticket en moins de 30 secondes
- le ticket apparaît en base
- le ticket apparaît côté staff

---

## Lot 3 — backoffice staff minimal en liste

### Objectif
Donner une première interface d’exploitation interne, même sans kanban.

### Contenu
- page interne `/support/tickets`
- tableau simple des tickets
- filtres :
  - application
  - type
  - statut
  - criticité
- consultation détail ticket
- modification manuelle du statut
- assignation simple
- champ date cible

### Pourquoi cette étape avant le kanban
Parce qu’elle permet :
- de valider les données
- de valider les droits
- de corriger le backend
- de débloquer très vite l’usage interne

### Livrables
- écran staff fonctionnel
- fiche détail ticket
- édition des champs essentiels

### Critère de validation
- le staff peut traiter un ticket sans accès base de données
- la fiche ticket est complète et exploitable

---

## Lot 4 — commentaires et échanges

### Objectif
Installer la boucle de communication avec le client.

### Contenu
- `POST /tickets/{id}/comments`
- `GET /tickets/{id}/comments`
- affichage timeline des commentaires
- commentaires publics
- commentaires internes
- filtrage automatique :
  - user voit seulement les publics
  - staff voit tous les commentaires autorisés

### UI
- composant `TicketComments`
- zone de saisie
- distinction visuelle public / interne
- auteur + date + rôle

### Livrables
- échange staff/client depuis le ticket
- séparation nette commentaires publics / internes

### Critère de validation
- un utilisateur reçoit et lit une réponse publique
- le staff peut documenter des notes internes sans les exposer

---

## Lot 5 — pièces jointes et capture

### Objectif
Permettre d’envoyer une preuve visuelle ou documentaire.

### Contenu
- `POST /tickets/{id}/attachments`
- `DELETE /tickets/{id}/attachments/{attachment_id}`
- stockage local ou MinIO
- contrôle type et taille
- rendu des pièces jointes dans le détail ticket

### MVP conseillé
- upload classique de fichier
- types autorisés :
  - png
  - jpg
  - jpeg
  - pdf

### Post-MVP proche
- bouton “capturer l’écran”
- génération automatique d’image depuis l’app

### Livrables
- upload fonctionnel
- affichage des fichiers
- suppression côté staff

### Critère de validation
- un utilisateur ajoute une capture
- le staff l’ouvre depuis la fiche ticket

---

## Lot 6 — backoffice kanban avec shadcn-data-views

### Objectif
Passer d’une simple liste à un vrai pilotage visuel.

### Contenu
- installation et intégration de `shadcn-data-views`
- définition du `ticketSchema`
- implémentation du `SupportDbClient`
- vue Kanban
- vue Grid
- vue Calendar
- édition via modale
- drag and drop des cartes

### Ce que doit permettre ce lot
- déplacer un ticket de `new` à `triage`
- planifier un ticket en `todo`
- visualiser les échéances
- exploiter les filtres et vues multiples

### Livrables
- page backoffice fondée sur `DataViews`
- schéma ticket version stable
- mapping correct API <-> vues

### Critère de validation
- un ticket déplacé dans le board met bien à jour PostgreSQL
- la vue calendrier reflète `due_date`
- les cartes sont cohérentes avec la base

---

## Lot 7 — portail utilisateur lecture seule

### Objectif
Donner au client une vraie interface de suivi, sans pouvoir casser le workflow.

### Contenu
- vue liste ou kanban simplifié côté user
- lecture seule stricte
- statuts publics seulement
- détail ticket
- commentaires publics
- éventuelle vue calendrier des dates prévues

### Stratégie technique
Ne pas utiliser tel quel le composant staff.

Deux options :
1. wrapper qui masque les actions
2. composant dédié `ticket-kanban-readonly.tsx`

### Recommandation
Pour le MVP, faire un composant dédié plus simple.

### Livrables
- page `/support/my-tickets`
- consultation claire pour l’utilisateur
- aucun bouton d’édition

### Critère de validation
- l’utilisateur suit ses tickets
- il ne peut pas déplacer ni modifier les cartes
- les informations restent lisibles et rassurantes

---

## Lot 8 — notifications

### Objectif
Fermer la boucle de communication sans demander au client de revenir vérifier en permanence.

### Contenu
- e-mail sur création ticket
- e-mail sur réponse publique
- e-mail sur changement de statut important :
  - planifié
  - résolu
  - refusé
- éventuellement notification in-app

### Déclencheurs recommandés
- ticket créé
- commentaire public staff
- passage à `planned`
- passage à `resolved`
- passage à `rejected`

### Livrables
- service de notification backend
- templates e-mails basiques

### Critère de validation
- les événements importants génèrent bien une notification

---

## Lot 9 — administration et référentiels

### Objectif
Rendre le système maintenable sans toucher au code à chaque nouvelle app.

### Contenu
- gestion des applications supportées
- activation/désactivation d’une app
- paramétrage de certaines listes
- droits plus fins si besoin
- audit / évènements

### Livrables
- écran admin applications
- route CRUD applications si nécessaire
- historique exploitable

### Critère de validation
- ajout d’une nouvelle application sans redéploiement lourd du produit

---

## Lot 10 — finitions et durcissement

### Objectif
Stabiliser avant généralisation.

### Contenu
- gestion fine des erreurs
- logs structurés
- métriques
- tests e2e
- nettoyage UX
- responsive
- optimisation perf
- sauvegarde et restauration
- hardening fichiers

### Livrables
- version production stable
- monitoring
- checklist d’exploitation

### Critère de validation
- usage réel sans intervention manuelle permanente

---

## Ordre recommandé réel d’implémentation

## Phase 1 — MVP utilisable en interne
Développer dans cet ordre :

1. Lot 0
2. Lot 1
3. Lot 2
4. Lot 3
5. Lot 4

À ce stade, tu as déjà :
- dépôt de tickets
- traitement staff
- réponses client
- usage réel possible

## Phase 2 — MVP visuel propre
Ensuite :

6. Lot 5
7. Lot 6
8. Lot 7

À ce stade, tu obtiens :
- upload
- kanban
- calendrier
- portail client lisible

## Phase 3 — version production renforcée
Enfin :

9. Lot 8
10. Lot 9
11. Lot 10

---

## Répartition suggérée frontend / backend

## Backend d’abord
À implémenter en priorité :
- modèles
- migrations
- schémas Pydantic
- permissions
- routes CRUD
- commentaires
- pièces jointes

## Frontend ensuite
À brancher dans cet ordre :
- formulaire
- liste staff
- détail ticket
- commentaires
- data views
- portail user readonly

---

## Lot MVP strict minimum si tu veux aller très vite

Si l’objectif est de sortir un prototype rapidement, le plus court chemin est :

### MVP ultra-court
- Lot 0
- Lot 1
- Lot 2
- Lot 3
- Lot 4

### Ce que ça donne
- formulaire support utilisable
- tickets stockés en base
- page staff simple
- possibilité de changer un statut
- possibilité de répondre au client

### Ce qui est volontairement reporté
- drag and drop
- calendrier
- pièces jointes avancées
- notifications
- admin avancée

### Pourquoi c’est intéressant
Parce que tu peux mettre en service très vite, puis enrichir sans casser la structure.

---

## Dépendances critiques entre lots

| Lot | Dépend de |
|---|---|
| 1 | 0 |
| 2 | 1 |
| 3 | 1 |
| 4 | 1 |
| 5 | 1 |
| 6 | 1 |
| 7 | 1, 4 |
| 8 | 1, 4 |
| 9 | 1 |
| 10 | tous |

---

## Checklist de validation de fin de MVP

Le MVP peut être considéré comme prêt si :

- un utilisateur authentifié peut ouvrir un ticket
- le ticket est stocké dans PostgreSQL
- le staff voit le ticket dans le backoffice
- le staff change son statut
- le client voit l’évolution de son ticket
- le staff écrit une réponse publique
- le client voit la réponse
- le déploiement Docker fonctionne sur OVH
- les droits empêchent un utilisateur d’éditer le workflow interne

---

## Recommandation finale

La meilleure stratégie est de **ne pas commencer par le kanban**.

Le bon ordre est :

1. API + base
2. formulaire utilisateur
3. écran staff simple
4. commentaires
5. seulement ensuite `shadcn-data-views`

Cela permet :
- d’aller plus vite
- de réduire les bugs
- de valider le métier avant la surcouche UI
- de sortir un MVP réellement exploitable très tôt

Quand cette base est stable, `shadcn-data-views` devient un accélérateur de confort, pas une dépendance qui bloque le projet.
