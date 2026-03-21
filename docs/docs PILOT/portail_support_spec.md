# Portail Support Auroramind – Spécification fonctionnelle et architecture

## Objectif
Mettre en place un **portail support transversal** pour l’ensemble des applications développées par Auroramind (Context‑Intelligence Studio, Silio, SocialGenie, etc.). Ce portail doit permettre :

* aux **utilisateurs finaux** de signaler facilement des bugs, demandes d’amélioration ou nouvelles fonctionnalités, et de suivre l’avancement de leurs tickets ;
* à l’équipe interne (dirigeant, support, développeurs) de trier, prioriser et planifier les demandes dans un **workflow Kanban** enrichi (calendrier, listes filtrables), avec possibilité de répondre au client.

La solution doit s’intégrer dans la stack actuelle (FastAPI + Next.js + shadcn/ui) et être **auto‑hébergeable sur le serveur OVH** déjà équipé de Docker et PostgreSQL, en conservant l’autonomie et la portabilité chères à Auroramind.

---

## Périmètre fonctionnel complet

### Entités principales

1. **Application (App)** : référence l’application d’où provient la demande (Context‑Intelligence Studio, Silio, SocialGenie, etc.).
2. **Utilisateur** : personne connectée à l’application. L’ID de l’utilisateur, son email et ses droits sont transmis au portail support.
3. **Ticket** : élément central du système. Il contient :
   - **ID** unique
   - **Application** liée
   - **Type** : bug / demande de fonctionnalité / amélioration
   - **Criticité** (pour les bugs) : mineure / majeure / critique
   - **Titre**
   - **Description**
   - **URL de la page** où le problème a été rencontré
   - **Statut interne** (voir plus bas)
   - **Statut public** (simplifié pour le client)
   - **Créateur** (utilisateur)
   - **Date de création / mise à jour / clôture**
4. **Pièce jointe** : fichier ou capture d’écran lié à un ticket. Stockage en S3/MinIO ou sur disque avec lien en base.
5. **Message/Commentaire** : échanges entre l’équipe interne et le client. Chaque message a un auteur (utilisateur ou staff), une date et un contenu.
6. **Évènement** : historique des actions (changement de statut, assignation, etc.) pour audit.

### Processus côté utilisateur

1. **Accès au menu “Aide”** depuis chaque application : ouverture d’une page ou d’un modal vers le portail support.
2. **Formulaire de déclaration** :
   - Préremplit l’application, l’ID de l’utilisateur et l’URL courante.
   - Sélectionne le type (bug, fonctionnalité, amélioration).
   - Si bug : choix de la criticité.
   - Saisit un titre et une description.
   - Pièce jointe facultative (upload ou capture automatique via `html2canvas`/API `getDisplayMedia`).
   - Validation des champs (Zod côté front).
   - Envoi via l’API FastAPI `/api/tickets` (méthode POST).
3. **Vue de suivi (Lecture seule)** :
   - Liste ou tableau Kanban simplifié. Les colonnes représentent les statuts **Reçu**, **À l’étude**, **Planifié**, **En cours**, **Résolu**, **Refusé**.
   - L’utilisateur ne peut ni créer, ni éditer, ni déplacer les cartes ; le composant est en **lecture seule**. La possibilité de commenter reste optionnelle.
   - Filtre par application ou par type pour les utilisateurs ayant accès à plusieurs apps.
4. **Notifications** : e‑mail ou notification in‑app lorsqu’un ticket évolue (nouveau message, statut changé, ticket clôturé).

### Processus côté équipe interne

1. **Tableau de triage** :
   - Regroupe tous les nouveaux tickets (statut interne : `new`).
   - Permet de lire la description et la pièce jointe, de répondre au client et d’assigner un statut interne : `rejected`, `triage`, `todo`.
2. **Board Kanban interne** : colonnes **Nouveau**, **À qualifier**, **À faire**, **En cours**, **Validation**, **Terminé**, **Rejeté**. Le staff déplace les tickets par **drag‑and‑drop** (la bibliothèque front propose ces fonctionnalités【984825968037781†L186-L214】).
3. **Détails du ticket** : page ou modal avec le fil de commentaires, l’historique des changements et la possibilité d’éditer les champs. Les actions internes appellent les méthodes `updateRecord` et `deleteRecord` du `dbClient`【231746278643239†L6-L10】.
4. **Planification** : ajout d’une date de livraison ou “dueDate” dans les champs du ticket. Cette date alimente la **vue Calendrier** pour visualiser la charge et les jalons【439217979476700†L13-L23】.
5. **Lien vers tâches internes** : optionnellement, transformation d’un ticket en “work item” dans l’outil interne (Kanboard ou GitHub issues) sans exposer cette tâche au client.

### Statuts

| Statut interne      | Statut public associé | Description                                                |
|---------------------|-----------------------|------------------------------------------------------------|
| `new`               | Reçu                  | Ticket déposé, non traité.                                 |
| `triage`            | À l’étude             | En cours d’analyse par l’équipe.                           |
| `rejected`          | Refusé                | Demande rejetée ; message explicatif envoyé au client.     |
| `todo`              | Planifié              | Ticket accepté et intégré au backlog.                      |
| `in_progress`       | En cours              | Traitement en cours.                                       |
| `testing`/`review`  | En cours              | Développement terminé, phase de tests internes.            |
| `done`              | Résolu                | Ticket terminé et livré.                                   |

Seul le **statut public** est affiché aux utilisateurs pour simplifier la communication.

---

## Interfaces et design UX

### API FastAPI

L’API se charge des opérations CRUD. Les routes principales :

* **`POST /api/tickets`** – créer un ticket. Reçoit un JSON avec les champs saisis, enregistre en base, associe l’utilisateur et l’application. Retourne le ticket.
* **`GET /api/tickets`** – lister les tickets. Possibilité de filtrer par `app_id`, `user_id`, `status` et paginer. Les droits déterminent si l’on renvoie tous les tickets (staff) ou seulement ceux de l’utilisateur (client).
* **`GET /api/tickets/{id}`** – détail d’un ticket avec commentaires et pièces jointes.
* **`PATCH /api/tickets/{id}`** – mise à jour (statut interne, assignation, champ date, etc.). Utilisé par le staff via le Kanban.
* **`POST /api/tickets/{id}/comments`** – ajouter un commentaire (staff ou client).
* **`POST /api/tickets/{id}/attachments`** – envoyer un fichier. Les fichiers sont stockés et indexés.
* **`DELETE /api/tickets/{id}`** – suppression éventuelle (fonction interne).

Le schéma Pydantic reflète le modèle `Ticket` et contrôle la validation côté serveur. Les méthodes du `dbClient` (getRecords, createRecord, updateRecord, deleteRecord【231746278643239†L6-L10】) s’implémentent en interrogeant ces endpoints.

### Front‑end Next.js

* **Composant formulaire** :
  - Utilise les composants **shadcn/ui** (Select, Input, Textarea, FileInput). Validation avec **react‑hook‑form** + **Zod**.
  - Préremplissage des champs **app_id** et **page_url** depuis le contexte de l’application.
  - Intègre la capture d’écran. V1 : upload classique ; V2 : capture via `html2canvas` ; V3 : API de capture d’écran du navigateur.
* **Composant DataViews** ou Kanban personnalisé :
  - Pour le staff : utilisation du composant **shadcn‑data‑views** qui génère automatiquement un tableau, un kanban, un calendrier et un formulaire à partir du même schéma【439217979476700†L13-L23】. Ce composant est **backend agnostique** et requiert simplement un `dbClient` qui appelle l’API REST【746183326236942†L59-L60】. Il fournit un tableau Kanban avec drag‑and‑drop et menus d’édition (ajouter/éditer/supprimer)【984825968037781†L186-L214】.
  - Pour les utilisateurs : dériver ou copier les vues Kanban/Table afin de **masquer les actions d’édition**. Seules les fonctionnalités de lecture et de commentaire restent accessibles (implémentation d’un wrapper `readOnly=true`).
  - Vue calendrier alimentée par le champ `dueDate`, permettant de visualiser la planification.

#### Procédure d’installation et d’intégration de `shadcn-data-views`

Le composant `shadcn-data-views` **n’est pas un block shadcn à installer via `npx shadcn add ...`**. C’est une **librairie NPM** à intégrer dans le frontend Next.js.

1. **Installer la dépendance dans le frontend**

```bash
cd frontend
pnpm add shadcn-data-views next-themes
```

Ou avec npm :

```bash
cd frontend
npm install shadcn-data-views next-themes
```

2. **Activer le ThemeProvider**

Le package repose sur `next-themes` pour la gestion du thème. Il faut donc encapsuler l’application ou la zone concernée dans un provider.

```tsx
// app/providers.tsx
"use client"

import { ThemeProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

Puis l’utiliser dans le layout principal :

```tsx
// app/layout.tsx
import { Providers } from "./providers"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

3. **Définir le schéma fonctionnel des tickets**

```ts
import type { TableSchema } from "shadcn-data-views"

export const ticketsSchema: TableSchema = {
  id: "tickets",
  name: "Tickets support",
  icon: "🎫",
  fields: [
    { id: "title", name: "Titre", type: "text", isPrimary: true },
    { id: "description", name: "Description", type: "text" },
    {
      id: "status",
      name: "Statut",
      type: "select",
      options: [
        { id: "new", name: "Nouveau", color: "gray" },
        { id: "triage", name: "À qualifier", color: "yellow" },
        { id: "todo", name: "À faire", color: "blue" },
        { id: "in_progress", name: "En cours", color: "violet" },
        { id: "done", name: "Terminé", color: "green" },
        { id: "rejected", name: "Refusé", color: "red" }
      ]
    },
    {
      id: "type",
      name: "Type",
      type: "select",
      options: [
        { id: "bug", name: "Bug", color: "red" },
        { id: "feature", name: "Fonctionnalité", color: "blue" },
        { id: "improvement", name: "Amélioration", color: "yellow" }
      ]
    },
    { id: "priority", name: "Criticité", type: "select", options: [
      { id: "low", name: "Mineure", color: "gray" },
      { id: "medium", name: "Majeure", color: "yellow" },
      { id: "high", name: "Critique", color: "red" }
    ] },
    { id: "dueDate", name: "Date cible", type: "date" }
  ]
}
```

4. **Créer le client de données branché sur l’API FastAPI**

```ts
import type { IDataViewsClient, IRecord } from "shadcn-data-views"

export class SupportTicketsClient implements IDataViewsClient {
  async getRecords(): Promise<IRecord[]> {
    const res = await fetch("/support/api/tickets", { credentials: "include" })
    const data = await res.json()
    return data.items
  }

  async createRecord(record: Partial<IRecord>): Promise<IRecord> {
    const res = await fetch("/support/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(record),
    })
    return await res.json()
  }

  async updateRecord(id: string, record: Partial<IRecord>): Promise<IRecord> {
    const res = await fetch(`/support/api/tickets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(record),
    })
    return await res.json()
  }

  async deleteRecord(id: string): Promise<void> {
    await fetch(`/support/api/tickets/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
  }
}
```

5. **Monter la vue dans une page Next.js**

```tsx
"use client"

import { DataViews } from "shadcn-data-views"
import { ticketsSchema } from "@/features/support/tickets-schema"
import { SupportTicketsClient } from "@/features/support/tickets-client"

const dbClient = new SupportTicketsClient()

export default function SupportBackofficePage() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      <DataViews
        schema={ticketsSchema}
        dbClient={dbClient}
        config={{ defaultView: "kanban", language: "fr" }}
      />
    </div>
  )
}
```

6. **Version utilisateur en lecture seule**

Deux approches sont recommandées :

- **Approche rapide** : fournir un `dbClient` lecture seule côté portail client, sans `createRecord`, `updateRecord` ni `deleteRecord` réellement exploitables, puis masquer les actions d’édition dans un wrapper UI.
- **Approche propre** : copier/adapter les composants `KanbanView`, `GridView` et `CalendarView` pour retirer les boutons d’ajout, les menus d’édition/suppression et le drag-and-drop côté utilisateur.

7. **Déploiement Docker**

Il n’existe **pas** d’image Docker officielle `shadcn-data-views`. Le composant est packagé **dans l’image du frontend Next.js**. Il sera donc installé au `pnpm install`/`npm install` pendant le build du conteneur `support-frontend`.

Exemple de rappel dans le `Dockerfile` frontend :

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
```

* **Authentification / autorisation** :
  - S’appuie sur le SSO déjà existant (JWT ou session). Le portail support valide le token et récupère l’ID et l’e‑mail de l’utilisateur.
  - Attribution de rôles : `user` (lecture seule), `staff` (édition), `admin` (droits étendus).

### Base de données PostgreSQL

Une base `support` isolée dans votre cluster PostgreSQL héberge les tables suivantes :

- **tickets** (id, app_id, user_id, type, severity, title, description, page_url, status_internal, status_public, due_date, created_at, updated_at, closed_at).
- **ticket_attachments** (id, ticket_id, filename, filepath, file_size, content_type, created_at).
- **ticket_messages** (id, ticket_id, author_id, author_role, message_text, created_at, is_public).
- **ticket_events** (id, ticket_id, event_type, payload_json, created_at).
- **applications** (id, name, description) pour référencer les apps supportées.
- **users** (id, email, role) ou, si vous utilisez un SSO externe, stockage minimal des métadonnées.

Chaque table est indexée sur les champs de recherche (app_id, user_id, status) afin d’optimiser les requêtes.

### Gestion des fichiers

Deux options :

1. **Stockage local via Docker volume** : simple, mais nécessite la gestion des sauvegardes et de la montée en charge.
2. **MinIO / S3** : conteneur objet compatible AWS S3, déjà intégré dans certains projets Auroramind. Permet de stocker les captures et de générer des URL sécurisées.

---

## Architecture technique proposée

### Vue d’ensemble

```
[Applications clients]  --->  [Support Widget / Menu Aide]  --->  [Portail Support Frontend (Next.js + shadcn/ui)]
                                                                                 |
                                                                                 | REST API
                                                                                 v
                                                                  [Support API (FastAPI)]
                                                                                 |
                                                                                 | SQLAlchemy
                                                                                 v
                                                                  [PostgreSQL (base support)]
                                                                                 |
                                                                                 v
                                                           [Object Storage (MinIO) pour les pièces jointes]

                                   [Reverse Proxy Caddy]  --->  routes HTTPS vers Frontend et API
```

### Composants Docker

1. **support-frontend** : image Node/Next.js, construit à partir du repository “Context‑Intelligence Studio”. Le code comprend les pages “ticket form”, “tickets list/kanban”, “ticket details” avec DataViews ou un Kanban custom.
2. **support-api** : image Python/FastAPI. Contient les modèles Pydantic, routes API et connexion à PostgreSQL via SQLAlchemy. Utilise `uvicorn` comme serveur ASGI.
3. **postgres** : conteneur officiel PostgreSQL si vous ne souhaitez pas utiliser la base partagée. Dans votre cas, vous pouvez monter une base dédiée `support` dans le cluster existant.
4. **minio** (optionnel) : stockage objet local avec interface S3 pour les pièces jointes.
5. **caddy** : reverse proxy HTTPS terminant les certificats Let’s Encrypt et exposant `/support` (frontend) et `/support/api` (backend).
6. **network** : réseau Docker dédié reliant tous les conteneurs.

Chaque service est défini dans un fichier `docker-compose.yml` avec volumes persistants pour PostgreSQL et MinIO. Les variables d’environnement (URL base, clés JWT, credentials Postgres) sont définies dans un `.env` sécurisé.

### Sécurité et bonnes pratiques

- **HTTPS obligatoire** via Caddy.
- **Vérification du token** à chaque requête API.
- **Validation** systématique des entrées (FastAPI + Pydantic et Zod côté front).
- **Pagination/filtrage** pour éviter la surcharge réseau.
- **Sauvegardes** régulières de la base et des fichiers.
- **Logs et monitoring** (Prometheus/Grafana) pour suivre les temps de réponse et les erreurs.

---

## Flux utilisateurs et internes détaillés

### Flux utilisateur final

1. **Connexion à l’application** : l’utilisateur est authentifié via le SSO Auroramind.
2. **Accès au menu Aide** : un composant React ouvre un formulaire ou redirige vers `/support/new?app=APP_ID`.
3. **Saisie du ticket** : l’utilisateur remplit le formulaire, ajoute éventuellement une capture. Validation côté client ; message d’erreur en cas de champ manquant.
4. **Envoi** : le formulaire appelle `POST /api/tickets` avec l’ID de l’utilisateur et de l’app. L’API crée le ticket en statut `new`.
5. **Confirmation** : la page affiche un message “Ticket reçu” et propose de consulter la liste des tickets.
6. **Suivi** : l’utilisateur consulte la liste ou le Kanban en lecture seule. Il peut filtrer par statut public ou par date. Optionnellement, il peut commenter.
7. **Notification** : l’utilisateur reçoit un e‑mail quand un membre du staff répond ou ferme le ticket. Un système de websocket ou de polling peut afficher une badge de notification dans l’app.

### Flux staff / équipe technique

1. **Triage** : un dashboard montre les tickets `new`. Le staff lit la description et décide de les refuser (`rejected`), de les qualifier (`triage`) ou de les planifier (`todo`). Un message automatique peut être envoyé au client lors du refus avec la raison.
2. **Planification** : les tickets `todo` sont assignés à un développeur et déplacés dans la colonne `todo` du Kanban. On peut éditer le champ `due_date` pour alimenter la vue calendrier et la planification des sprints.
3. **Production** : le développeur passe le ticket en `in_progress` pendant qu’il travaille, puis en `testing`/`review`. Lorsque l’implémentation est validée et déployée, le ticket passe en `done`. Ce changement déclenche l’envoi d’un mail au client.
4. **Communication** : à tout moment, le staff peut envoyer un commentaire privé (visible uniquement en interne) ou public (visible par le client). Un historique complet est enregistré dans `ticket_events`.

### Flux administrateur / supervision

1. **Gestion des rôles** : l’administrateur peut ajouter des utilisateurs de l’équipe, définir leurs rôles (`staff`, `admin`), autoriser ou non la suppression de tickets.
2. **Paramétrage** : possibilité d’ajouter de nouvelles applications dans la table `applications`, de définir des valeurs par défaut (couleurs des tags, priorités), d’activer ou non la capture d’écran dans le formulaire.
3. **Statistiques** : export CSV ou visualisation du volume de tickets, temps moyen de résolution, nombre de tickets par type / application / utilisateur.

---

## Conclusion et prochaines étapes

La solution proposée s’appuie sur des technologies maîtrisées par Auroramind. Le composant **shadcn‑data‑views** permet de générer rapidement les vues Kanban, tableau et calendrier à partir d’un schéma JSON【439217979476700†L13-L23】. Sa nature **backend agnostique** facilite l’intégration avec votre API FastAPI【746183326236942†L59-L60】. Pour la partie lecture seule du portail client, il est conseillé de dériver ces composants et de masquer les actions d’édition, car la bibliothèque ne propose pas de mode read‑only intégré【173166428360589†L3-L6】; cela revient à créer un wrapper qui n’expose que la vue et les commentaires.

Cette documentation servira de base au développement. Un diagramme de flux détaillé et une spécification plus fine des endpoints, schémas Pydantic et composants React pourront être ajoutés lors de la phase de conception technique.


---

## Intégration de `shadcn-data-views`

### Objectif de ce composant dans le projet

`shadcn-data-views` est utilisé comme **moteur d’affichage multi-vues** pour le backoffice support :

- **vue tableau** pour filtrer, trier et rechercher les tickets ;
- **vue kanban** pour déplacer les tickets par glisser-déposer ;
- **vue calendrier** pour planifier les dates de livraison ou d’intervention ;
- **vue formulaire** pour créer et éditer rapidement un ticket.

Ce composant n’est **pas** utilisé tel quel pour l’espace client final. Pour la partie client, il est recommandé d’utiliser soit :

1. un wrapper en **lecture seule** dérivé de `DataViews`,
2. soit des vues dédiées plus simples, réutilisant seulement les données du portail support.

### Installation dans le frontend Next.js

Installer les dépendances dans le conteneur/frontend :

```bash
pnpm add shadcn-data-views next-themes
```

Si le projet utilise `npm` :

```bash
npm install shadcn-data-views next-themes
```

### Pré-requis thème

Le composant s’appuie sur `next-themes`. Il faut donc encapsuler l’application avec un `ThemeProvider`.

Exemple `frontend/app/providers.tsx` :

```tsx
"use client"

import { ThemeProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

Puis dans `frontend/app/layout.tsx` :

```tsx
import { Providers } from "./providers"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### Schéma `DataViews` recommandé pour les tickets

Exemple minimal de schéma pour les tickets support :

```tsx
import type { TableSchema } from "shadcn-data-views"

export const supportTicketsSchema: TableSchema = {
  id: "support_tickets",
  name: "Tickets support",
  icon: "🎫",
  fields: [
    { id: "title", name: "Titre", type: "text", isPrimary: true },
    { id: "description", name: "Description", type: "text" },
    {
      id: "ticket_type",
      name: "Type",
      type: "select",
      options: [
        { id: "bug", name: "Bug", color: "red" },
        { id: "feature", name: "Fonctionnalité", color: "blue" },
        { id: "improvement", name: "Amélioration", color: "yellow" },
      ],
    },
    {
      id: "status",
      name: "Statut",
      type: "select",
      options: [
        { id: "new", name: "Nouveau", color: "gray" },
        { id: "triage", name: "À qualifier", color: "yellow" },
        { id: "todo", name: "À faire", color: "blue" },
        { id: "in_progress", name: "En cours", color: "violet" },
        { id: "testing", name: "Validation", color: "orange" },
        { id: "done", name: "Terminé", color: "green" },
        { id: "rejected", name: "Refusé", color: "red" },
      ],
    },
    {
      id: "severity",
      name: "Criticité",
      type: "select",
      options: [
        { id: "low", name: "Mineure", color: "gray" },
        { id: "medium", name: "Majeure", color: "yellow" },
        { id: "critical", name: "Critique", color: "red" },
      ],
    },
    { id: "app_name", name: "Application", type: "text" },
    { id: "public_status", name: "Statut public", type: "text" },
    { id: "due_date", name: "Date cible", type: "date" },
  ],
}
```

### `dbClient` branché sur FastAPI

Le composant fonctionne en appelant un client CRUD. Il faut donc créer un adaptateur vers l’API support.

Exemple `frontend/features/support/lib/support-data-views-client.ts` :

```tsx
import type { IDataViewsClient, IRecord } from "shadcn-data-views"

export class SupportDataViewsClient implements IDataViewsClient {
  constructor(private readonly baseUrl: string) {}

  async getRecords(): Promise<IRecord[]> {
    const res = await fetch(`${this.baseUrl}/api/tickets?scope=staff`, {
      credentials: "include",
      cache: "no-store",
    })
    if (!res.ok) throw new Error("Impossible de charger les tickets")
    const data = await res.json()
    return data.items
  }

  async createRecord(record: Partial<IRecord>): Promise<IRecord> {
    const res = await fetch(`${this.baseUrl}/api/tickets`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record.fields ?? record),
    })
    if (!res.ok) throw new Error("Impossible de créer le ticket")
    return await res.json()
  }

  async updateRecord(id: string, record: Partial<IRecord>): Promise<IRecord> {
    const res = await fetch(`${this.baseUrl}/api/tickets/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record.fields ?? record),
    })
    if (!res.ok) throw new Error("Impossible de mettre à jour le ticket")
    return await res.json()
  }

  async deleteRecord(id: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/api/tickets/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
    if (!res.ok) throw new Error("Impossible de supprimer le ticket")
  }
}
```

### Exemple de page backoffice

Exemple `frontend/app/support/admin/page.tsx` :

```tsx
"use client"

import { DataViews } from "shadcn-data-views"
import { supportTicketsSchema } from "@/features/support/config/support-tickets-schema"
import { SupportDataViewsClient } from "@/features/support/lib/support-data-views-client"

const dbClient = new SupportDataViewsClient("")

export default function SupportAdminPage() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      <DataViews
        schema={supportTicketsSchema}
        dbClient={dbClient}
        config={{ defaultView: "kanban", language: "fr" }}
      />
    </div>
  )
}
```

### Stratégie lecture seule côté client

`shadcn-data-views` ne fournit pas de mode `readOnly` natif dans sa configuration. La séparation client/staff se fait donc dans l’application Auroramind :

- **Backoffice staff** : composant `DataViews` complet avec CRUD activé.
- **Portail client** : composant dérivé ou vues dédiées sans actions d’édition.

La stratégie recommandée est la suivante :

1. **ne pas exposer** `createRecord`, `updateRecord`, `deleteRecord` aux utilisateurs finaux ;
2. masquer les boutons “Ajouter”, “Éditer”, “Supprimer” dans les vues client ;
3. désactiver le drag-and-drop pour le client ;
4. ne laisser visibles que :
   - la consultation du ticket,
   - le statut public,
   - la date cible,
   - les commentaires publics.

### Compatibilité Docker

Le composant n’a pas d’image Docker autonome. Il est simplement embarqué dans le build du frontend Next.js.

Conséquence pratique :

- aucune stack Docker supplémentaire n’est requise pour `shadcn-data-views` ;
- il suffit de reconstruire l’image `support-frontend` après installation du package ;
- le rendu s’exécute dans le navigateur, les données venant de l’API FastAPI.

---

## Arborescence cible du code

### Objectif

Structurer le portail support comme une **feature transverse** claire, maintenable et industrialisable dans `Context-Intelligence-Studio`.

### Arborescence frontend cible

```text
frontend/
  app/
    support/
      page.tsx
      new/
        page.tsx
      tickets/
        page.tsx
      tickets/[ticketId]/
        page.tsx
      admin/
        page.tsx
      admin/calendar/
        page.tsx
  features/
    support/
      components/
        support-help-entry.tsx
        support-ticket-form.tsx
        support-ticket-list.tsx
        support-ticket-card.tsx
        support-ticket-detail.tsx
        support-ticket-comments.tsx
        support-ticket-attachments.tsx
        support-readonly-kanban.tsx
        support-admin-toolbar.tsx
      config/
        support-tickets-schema.ts
        support-status-mapping.ts
      hooks/
        use-support-tickets.ts
        use-support-ticket.ts
        use-support-create-ticket.ts
        use-support-comments.ts
      lib/
        support-api.ts
        support-data-views-client.ts
        support-permissions.ts
        support-upload.ts
      types/
        support-ticket.ts
        support-comment.ts
        support-attachment.ts
```

### Rôle de chaque bloc frontend

- `app/support/page.tsx` : point d’entrée générique du portail support.
- `app/support/new/page.tsx` : formulaire public de création de ticket.
- `app/support/tickets/page.tsx` : liste ou kanban lecture seule pour le client.
- `app/support/tickets/[ticketId]/page.tsx` : détail d’un ticket, commentaires, pièces jointes.
- `app/support/admin/page.tsx` : backoffice principal avec `DataViews`.
- `features/support/components/` : composants métier isolés.
- `features/support/config/` : schémas, mapping statuts, constantes.
- `features/support/lib/` : clients API, permissions, upload, logique transverse.
- `features/support/types/` : typage métier partagé.

### Arborescence backend cible

```text
backend/
  app/
    api/
      routes/
        support.py
        support_comments.py
        support_attachments.py
        support_admin.py
    core/
      security.py
      config.py
    db/
      base.py
      session.py
    models/
      support_ticket.py
      support_comment.py
      support_attachment.py
      support_event.py
      support_application.py
    schemas/
      support_ticket.py
      support_comment.py
      support_attachment.py
      support_filters.py
    services/
      support_service.py
      support_comment_service.py
      support_attachment_service.py
      support_notification_service.py
      support_permission_service.py
    repositories/
      support_ticket_repository.py
      support_comment_repository.py
      support_attachment_repository.py
    workers/
      support_notifications.py
```

### Rôle de chaque bloc backend

- `routes/` : endpoints FastAPI.
- `models/` : modèles SQLAlchemy.
- `schemas/` : schémas Pydantic entrée/sortie.
- `services/` : logique métier.
- `repositories/` : accès base de données.
- `workers/` : tâches asynchrones éventuelles (mails, notifications).

### Répartition recommandée des responsabilités

#### Frontend

Le frontend doit gérer :

- affichage des formulaires ;
- affichage Kanban / tableau / calendrier ;
- contrôle d’accès d’interface ;
- envoi des fichiers et appels API ;
- préremplissage depuis le contexte applicatif.

#### Backend

Le backend doit gérer :

- validation métier ;
- contrôle de permissions réel ;
- mapping statut interne / statut public ;
- persistance PostgreSQL ;
- historisation ;
- notifications ;
- sécurité d’accès aux pièces jointes.

### Widget “Aide” embarqué dans les apps Auroramind

Pour faciliter l’intégration dans plusieurs applications, prévoir un composant réutilisable.

Exemple d’emplacement :

```text
frontend/
  components/
    support/
      support-help-menu.tsx
      support-help-sheet.tsx
```

Ce widget doit pouvoir être injecté dans n’importe quelle app Auroramind avec les props suivantes :

- `appId`
- `appName`
- `currentUrl`
- `currentUser`
- `apiBaseUrl`

### Convention de nommage recommandée

- Préfixe `support-` pour tous les composants métier.
- Préfixe `Support` pour les classes/types exportés.
- Endpoints API regroupés sous `/api/support/...` ou `/api/tickets/...` de manière stable.

### Livrable attendu du développeur

Le développeur doit produire :

1. un frontend support autonome intégré à la stack Next.js existante ;
2. une API FastAPI complète pour tickets, commentaires, pièces jointes ;
3. une base PostgreSQL migrée ;
4. une configuration Docker Compose fonctionnelle sur le serveur OVH ;
5. une séparation claire entre espace client lecture seule et espace staff éditable.

