# Portail Support Auroramind — Contrat d’API détaillé

## Objet

Ce document définit le contrat d’API du portail support Auroramind.  
Il complète la spécification fonctionnelle générale et sert de base de travail pour le développement backend FastAPI et l’intégration frontend Next.js / shadcn-data-views.

Le périmètre couvre :

- la création et le suivi des tickets
- les commentaires
- les pièces jointes
- les statuts internes et publics
- la sécurité et les droits
- les modèles de données attendus
- les codes de retour
- les conventions d’intégration avec `shadcn-data-views`

---

## Principes généraux

### Base URL

Exemple de base URL derrière Caddy :

```txt
https://support.auroramind.fr/api
```

En environnement local :

```txt
http://localhost:8000/api
```

### Format des échanges

- API JSON UTF-8
- Dates au format ISO 8601
- Authentification par Bearer token
- Pagination par `limit` et `offset`
- Réponses d’erreur homogènes

### Authentification

Toutes les routes métier nécessitent un token JWT ou un token issu du SSO Auroramind.

Header attendu :

```http
Authorization: Bearer <token>
```

### Rôles

Trois rôles minimum :

- `user` : crée et consulte ses tickets, lecture seule sur le suivi
- `staff` : consulte et modifie les tickets autorisés
- `admin` : mêmes droits que staff + paramétrage + suppression + gestion des applications

### Droits attendus

#### Utilisateur final
- créer un ticket
- voir ses tickets
- voir les commentaires publics
- poster un commentaire public sur ses tickets
- téléverser une pièce jointe sur ses tickets
- ne peut pas changer les statuts internes
- ne peut pas déplacer les cartes
- ne peut pas supprimer un ticket

#### Staff
- voir tous les tickets autorisés
- modifier statuts, priorité, date cible, assignation
- commenter publiquement ou en interne
- supprimer une pièce jointe
- déplacer les cartes dans le kanban
- clôturer ou refuser un ticket

#### Admin
- tous les droits staff
- gestion des applications
- gestion de certains référentiels
- suppression définitive de tickets si nécessaire

---

## Référentiel métier

## Types de ticket

```txt
bug
feature
improvement
```

## Criticité

Applicable surtout aux bugs :

```txt
low
medium
high
critical
```

## Statuts internes

```txt
new
triage
todo
in_progress
testing
done
rejected
```

## Statuts publics

```txt
received
under_review
planned
in_progress
resolved
rejected
```

## Mapping recommandé

| Statut interne | Statut public |
|---|---|
| `new` | `received` |
| `triage` | `under_review` |
| `todo` | `planned` |
| `in_progress` | `in_progress` |
| `testing` | `in_progress` |
| `done` | `resolved` |
| `rejected` | `rejected` |

---

## Modèles de données

## Ticket

### TicketCreate

```json
{
  "app_id": "context-intelligence-studio",
  "type": "bug",
  "severity": "high",
  "title": "Erreur lors de la génération de réponse",
  "description": "Le bouton reste bloqué après soumission.",
  "page_url": "https://app.auroramind.fr/chat",
  "browser_context": {
    "user_agent": "Mozilla/5.0 ...",
    "viewport": "1440x900"
  },
  "metadata": {
    "environment": "production"
  }
}
```

### TicketUpdate

```json
{
  "type": "improvement",
  "severity": "medium",
  "title": "Nouveau titre",
  "description": "Description mise à jour",
  "status_internal": "todo",
  "status_public": "planned",
  "due_date": "2026-03-28T09:00:00Z",
  "assigned_to": "user_tech_001"
}
```

### TicketResponse

```json
{
  "id": "tck_01HXYZABC",
  "app_id": "context-intelligence-studio",
  "user_id": "usr_001",
  "reporter_email": "client@example.com",
  "type": "bug",
  "severity": "high",
  "title": "Erreur lors de la génération de réponse",
  "description": "Le bouton reste bloqué après soumission.",
  "page_url": "https://app.auroramind.fr/chat",
  "status_internal": "triage",
  "status_public": "under_review",
  "assigned_to": null,
  "due_date": null,
  "created_at": "2026-03-21T10:12:43Z",
  "updated_at": "2026-03-21T11:03:10Z",
  "closed_at": null,
  "attachments_count": 1,
  "public_comments_count": 2
}
```

## Commentaire

### CommentCreate

```json
{
  "message": "Nous avons bien pris en compte votre demande.",
  "is_public": true
}
```

### CommentResponse

```json
{
  "id": "msg_001",
  "ticket_id": "tck_01HXYZABC",
  "author_id": "staff_001",
  "author_role": "staff",
  "message": "Nous avons bien pris en compte votre demande.",
  "is_public": true,
  "created_at": "2026-03-21T11:05:00Z"
}
```

## Pièce jointe

### AttachmentResponse

```json
{
  "id": "att_001",
  "ticket_id": "tck_01HXYZABC",
  "filename": "capture-erreur.png",
  "content_type": "image/png",
  "file_size": 483920,
  "url": "https://files.auroramind.fr/support/att_001.png",
  "created_at": "2026-03-21T10:13:20Z"
}
```

## Application

### ApplicationResponse

```json
{
  "id": "context-intelligence-studio",
  "name": "Context Intelligence Studio",
  "description": "Plateforme centrale Auroramind",
  "is_active": true
}
```

---

## Structure recommandée des tables

## `applications`

```txt
id PK
name
description
is_active
created_at
updated_at
```

## `tickets`

```txt
id PK
app_id FK -> applications.id
user_id
reporter_email
type
severity
title
description
page_url
status_internal
status_public
assigned_to
due_date
browser_context_json
metadata_json
created_at
updated_at
closed_at
```

## `ticket_messages`

```txt
id PK
ticket_id FK -> tickets.id
author_id
author_role
message_text
is_public
created_at
```

## `ticket_attachments`

```txt
id PK
ticket_id FK -> tickets.id
filename
storage_path
content_type
file_size
created_at
```

## `ticket_events`

```txt
id PK
ticket_id FK -> tickets.id
event_type
payload_json
created_at
```

### Index recommandés

- `tickets(app_id)`
- `tickets(user_id)`
- `tickets(status_internal)`
- `tickets(status_public)`
- `tickets(created_at desc)`
- `ticket_messages(ticket_id, created_at)`
- `ticket_attachments(ticket_id)`

---

## Contrat des endpoints

## 1) Lister les applications supportées

### `GET /applications`

### Réponse 200

```json
[
  {
    "id": "context-intelligence-studio",
    "name": "Context Intelligence Studio",
    "description": "Plateforme centrale Auroramind",
    "is_active": true
  },
  {
    "id": "socialgenie",
    "name": "SocialGenie",
    "description": "Automatisation de publication",
    "is_active": true
  }
]
```

### Règles
- accessible aux utilisateurs authentifiés
- permet d’alimenter le sélecteur “application concernée”

---

## 2) Créer un ticket

### `POST /tickets`

### Body

```json
{
  "app_id": "context-intelligence-studio",
  "type": "bug",
  "severity": "critical",
  "title": "Blocage après soumission",
  "description": "Le formulaire reste en chargement infini.",
  "page_url": "https://app.auroramind.fr/support/new",
  "browser_context": {
    "user_agent": "Mozilla/5.0 ...",
    "viewport": "1920x1080"
  },
  "metadata": {
    "environment": "production"
  }
}
```

### Règles
- `app_id` obligatoire
- `type` obligatoire
- `severity` obligatoire si `type = bug`
- `title` obligatoire
- `description` obligatoire
- `page_url` recommandé
- `user_id` et `reporter_email` injectés côté serveur depuis le token
- `status_internal` initial = `new`
- `status_public` initial = `received`

### Réponse 201

```json
{
  "id": "tck_01HXYZABC",
  "app_id": "context-intelligence-studio",
  "user_id": "usr_001",
  "reporter_email": "client@example.com",
  "type": "bug",
  "severity": "critical",
  "title": "Blocage après soumission",
  "description": "Le formulaire reste en chargement infini.",
  "page_url": "https://app.auroramind.fr/support/new",
  "status_internal": "new",
  "status_public": "received",
  "assigned_to": null,
  "due_date": null,
  "created_at": "2026-03-21T10:12:43Z",
  "updated_at": "2026-03-21T10:12:43Z",
  "closed_at": null,
  "attachments_count": 0,
  "public_comments_count": 0
}
```

### Erreurs
- `400` payload invalide
- `401` non authentifié
- `403` application interdite
- `422` validation métier

---

## 3) Lister les tickets

### `GET /tickets`

### Query params

```txt
app_id
type
status_internal
status_public
assigned_to
mine=true|false
limit
offset
sort_by
sort_order
```

### Exemples

```txt
GET /tickets?mine=true&limit=20&offset=0
GET /tickets?app_id=context-intelligence-studio&status_internal=todo
GET /tickets?status_public=resolved
```

### Règles
- utilisateur final : ne reçoit que ses tickets
- staff/admin : peut filtrer globalement selon ses droits
- tri par `created_at desc` par défaut

### Réponse 200

```json
{
  "items": [
    {
      "id": "tck_01",
      "app_id": "context-intelligence-studio",
      "user_id": "usr_001",
      "reporter_email": "client@example.com",
      "type": "bug",
      "severity": "high",
      "title": "Erreur export",
      "description": "L’export CSV échoue",
      "page_url": "https://app.auroramind.fr/reports",
      "status_internal": "triage",
      "status_public": "under_review",
      "assigned_to": "staff_01",
      "due_date": "2026-03-25T09:00:00Z",
      "created_at": "2026-03-21T09:00:00Z",
      "updated_at": "2026-03-21T10:00:00Z",
      "closed_at": null,
      "attachments_count": 2,
      "public_comments_count": 1
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

---

## 4) Obtenir le détail d’un ticket

### `GET /tickets/{ticket_id}`

### Réponse 200

```json
{
  "ticket": {
    "id": "tck_01",
    "app_id": "context-intelligence-studio",
    "user_id": "usr_001",
    "reporter_email": "client@example.com",
    "type": "bug",
    "severity": "high",
    "title": "Erreur export",
    "description": "L’export CSV échoue",
    "page_url": "https://app.auroramind.fr/reports",
    "status_internal": "triage",
    "status_public": "under_review",
    "assigned_to": "staff_01",
    "due_date": "2026-03-25T09:00:00Z",
    "created_at": "2026-03-21T09:00:00Z",
    "updated_at": "2026-03-21T10:00:00Z",
    "closed_at": null
  },
  "attachments": [
    {
      "id": "att_001",
      "filename": "capture.png",
      "content_type": "image/png",
      "file_size": 483920,
      "url": "https://files.auroramind.fr/support/att_001.png",
      "created_at": "2026-03-21T09:05:00Z"
    }
  ],
  "comments": [
    {
      "id": "msg_001",
      "ticket_id": "tck_01",
      "author_id": "staff_01",
      "author_role": "staff",
      "message": "Bien reçu.",
      "is_public": true,
      "created_at": "2026-03-21T09:15:00Z"
    }
  ]
}
```

### Règles
- l’utilisateur final ne peut accéder qu’à ses tickets
- les commentaires internes ne doivent pas être renvoyés au rôle `user`

---

## 5) Modifier un ticket

### `PATCH /tickets/{ticket_id}`

### Body possible côté staff

```json
{
  "status_internal": "in_progress",
  "status_public": "in_progress",
  "assigned_to": "staff_02",
  "due_date": "2026-03-29T15:00:00Z"
}
```

### Body possible côté user
Très limité. En pratique, recommandé : ne pas autoriser l’édition générale du ticket par l’utilisateur après création, sauf éventuellement certains champs complémentaires.

### Réponse 200

```json
{
  "id": "tck_01",
  "status_internal": "in_progress",
  "status_public": "in_progress",
  "assigned_to": "staff_02",
  "due_date": "2026-03-29T15:00:00Z",
  "updated_at": "2026-03-21T12:00:00Z"
}
```

### Règles métier
- si `status_internal = done`, alors `status_public = resolved`
- si `status_internal = rejected`, alors `status_public = rejected`
- si ticket clôturé, renseigner `closed_at`
- toute mise à jour de statut crée un enregistrement dans `ticket_events`

---

## 6) Déplacer une carte dans le kanban

### Cas frontend
Le drag and drop dans `shadcn-data-views` déclenche en pratique un `updateRecord()` côté client.  
Le backend, lui, ne connaît qu’un `PATCH /tickets/{id}`.

### Payload recommandé

```json
{
  "status_internal": "todo",
  "status_public": "planned"
}
```

### Règles
- réservé au staff/admin
- journaliser l’ancien et le nouveau statut dans `ticket_events`

---

## 7) Ajouter un commentaire

### `POST /tickets/{ticket_id}/comments`

### Body

```json
{
  "message": "Le correctif est planifié pour la prochaine mise en production.",
  "is_public": true
}
```

### Réponse 201

```json
{
  "id": "msg_002",
  "ticket_id": "tck_01",
  "author_id": "staff_02",
  "author_role": "staff",
  "message": "Le correctif est planifié pour la prochaine mise en production.",
  "is_public": true,
  "created_at": "2026-03-21T12:30:00Z"
}
```

### Règles
- `user` ne peut créer que des commentaires publics
- `staff/admin` peut créer public ou interne
- commentaire interne jamais renvoyé à l’utilisateur final

---

## 8) Lister les commentaires

### `GET /tickets/{ticket_id}/comments`

### Réponse 200

```json
{
  "items": [
    {
      "id": "msg_001",
      "ticket_id": "tck_01",
      "author_id": "staff_01",
      "author_role": "staff",
      "message": "Bien reçu.",
      "is_public": true,
      "created_at": "2026-03-21T09:15:00Z"
    }
  ]
}
```

---

## 9) Téléverser une pièce jointe

### `POST /tickets/{ticket_id}/attachments`

### Content-Type
`multipart/form-data`

### Champs attendus
- `file`
- éventuellement `label`

### Réponse 201

```json
{
  "id": "att_001",
  "ticket_id": "tck_01",
  "filename": "capture-erreur.png",
  "content_type": "image/png",
  "file_size": 483920,
  "url": "https://files.auroramind.fr/support/att_001.png",
  "created_at": "2026-03-21T09:05:00Z"
}
```

### Règles
- taille max à définir, par exemple 10 Mo
- types autorisés : png, jpg, jpeg, pdf, txt, zip
- antivirus ou validation MIME recommandé
- stocker le chemin réel côté backend, jamais confiance au nom de fichier envoyé

---

## 10) Supprimer une pièce jointe

### `DELETE /tickets/{ticket_id}/attachments/{attachment_id}`

### Réponse 204

Aucun body.

### Règles
- user : éventuellement autorisé seulement avant prise en charge
- staff/admin : autorisé
- suppression logique ou physique selon politique choisie

---

## 11) Lister les évènements d’un ticket

### `GET /tickets/{ticket_id}/events`

### Réponse 200

```json
{
  "items": [
    {
      "id": "evt_001",
      "ticket_id": "tck_01",
      "event_type": "status_changed",
      "payload": {
        "from": "new",
        "to": "triage"
      },
      "created_at": "2026-03-21T09:10:00Z"
    }
  ]
}
```

### Usage
- audit
- timeline interne
- debugging support

---

## 12) Supprimer un ticket

### `DELETE /tickets/{ticket_id}`

### Réponse 204

### Règles
- réservé à `admin`
- recommandé : suppression logique plutôt que physique
- journaliser l’opération

---

## Format d’erreur standard

### Exemple

```json
{
  "error": {
    "code": "ticket_not_found",
    "message": "Le ticket demandé est introuvable.",
    "details": null
  }
}
```

### Codes recommandés

```txt
unauthorized
forbidden
validation_error
ticket_not_found
application_not_found
attachment_not_found
comment_not_found
invalid_status_transition
file_too_large
unsupported_file_type
```

---

## Transitions de statut recommandées

## Transitions autorisées

```txt
new -> triage
new -> rejected

triage -> todo
triage -> rejected

todo -> in_progress
todo -> rejected

in_progress -> testing
in_progress -> todo

testing -> done
testing -> in_progress

done -> in_progress   (optionnel, en cas de réouverture)
rejected -> triage    (optionnel, en cas de réexamen)
```

### Règles
- empêcher les sauts incohérents
- garder une logique métier lisible
- journaliser toutes les transitions

---

## Intégration avec shadcn-data-views

## Schéma minimal recommandé

```ts
const ticketSchema = {
  id: "tickets",
  name: "Tickets Support",
  icon: "🎫",
  fields: [
    { id: "title", name: "Titre", type: "text", isPrimary: true },
    { id: "description", name: "Description", type: "text" },
    {
      id: "status_internal",
      name: "Statut",
      type: "select",
      options: [
        { id: "new", name: "new", color: "gray" },
        { id: "triage", name: "triage", color: "yellow" },
        { id: "todo", name: "todo", color: "blue" },
        { id: "in_progress", name: "in_progress", color: "violet" },
        { id: "testing", name: "testing", color: "amber" },
        { id: "done", name: "done", color: "green" },
        { id: "rejected", name: "rejected", color: "red" }
      ]
    },
    {
      id: "type",
      name: "Type",
      type: "select",
      options: [
        { id: "bug", name: "bug", color: "red" },
        { id: "feature", name: "feature", color: "blue" },
        { id: "improvement", name: "improvement", color: "green" }
      ]
    },
    {
      id: "severity",
      name: "Criticité",
      type: "select",
      options: [
        { id: "low", name: "low", color: "gray" },
        { id: "medium", name: "medium", color: "yellow" },
        { id: "high", name: "high", color: "orange" },
        { id: "critical", name: "critical", color: "red" }
      ]
    },
    { id: "due_date", name: "Date cible", type: "date" }
  ]
}
```

## `dbClient` recommandé

Le `dbClient` agit comme adaptateur entre le composant et l’API FastAPI.

```ts
class SupportDbClient {
  async getRecords() {
    const res = await fetch("/api/tickets?limit=200", {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()

    return data.items.map((item: any) => ({
      id: item.id,
      createdAt: item.created_at,
      fields: {
        title: item.title,
        description: item.description,
        status_internal: item.status_internal,
        type: item.type,
        severity: item.severity,
        due_date: item.due_date
      }
    }))
  }

  async createRecord(record: any) {
    const payload = {
      app_id: currentAppId,
      type: record.fields.type,
      severity: record.fields.severity,
      title: record.fields.title,
      description: record.fields.description,
      page_url: window.location.href
    }

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    const item = await res.json()

    return {
      id: item.id,
      createdAt: item.created_at,
      fields: {
        title: item.title,
        description: item.description,
        status_internal: item.status_internal,
        type: item.type,
        severity: item.severity,
        due_date: item.due_date
      }
    }
  }

  async updateRecord(id: string, record: any) {
    const payload = {
      status_internal: record.fields?.status_internal,
      due_date: record.fields?.due_date,
      title: record.fields?.title,
      description: record.fields?.description
    }

    const res = await fetch(`/api/tickets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    const item = await res.json()

    return {
      id: item.id,
      createdAt: item.created_at ?? new Date().toISOString(),
      fields: {
        title: item.title,
        description: item.description,
        status_internal: item.status_internal,
        type: item.type,
        severity: item.severity,
        due_date: item.due_date
      }
    }
  }

  async deleteRecord(id: string) {
    await fetch(`/api/tickets/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
```

## Lecture seule côté utilisateur

`shadcn-data-views` ne propose pas nativement de mode read-only global.  
La stratégie recommandée :

- staff/admin : utiliser `DataViews` standard
- user : utiliser une version wrapper ou forkée
- masquer :
  - bouton d’ajout
  - menu éditer/supprimer
  - drag and drop
- conserver :
  - consultation
  - calendrier
  - ouverture détail
  - commentaires publics

---

## Contrats Pydantic recommandés

## `schemas/ticket.py`

```python
from datetime import datetime
from typing import Any, Optional, Literal
from pydantic import BaseModel, Field, EmailStr

TicketType = Literal["bug", "feature", "improvement"]
Severity = Literal["low", "medium", "high", "critical"]
StatusInternal = Literal["new", "triage", "todo", "in_progress", "testing", "done", "rejected"]
StatusPublic = Literal["received", "under_review", "planned", "in_progress", "resolved", "rejected"]

class TicketCreate(BaseModel):
    app_id: str
    type: TicketType
    severity: Optional[Severity] = None
    title: str = Field(min_length=3, max_length=255)
    description: str = Field(min_length=3)
    page_url: Optional[str] = None
    browser_context: Optional[dict[str, Any]] = None
    metadata: Optional[dict[str, Any]] = None

class TicketUpdate(BaseModel):
    type: Optional[TicketType] = None
    severity: Optional[Severity] = None
    title: Optional[str] = Field(default=None, min_length=3, max_length=255)
    description: Optional[str] = None
    status_internal: Optional[StatusInternal] = None
    status_public: Optional[StatusPublic] = None
    assigned_to: Optional[str] = None
    due_date: Optional[datetime] = None

class TicketOut(BaseModel):
    id: str
    app_id: str
    user_id: str
    reporter_email: EmailStr
    type: TicketType
    severity: Optional[Severity] = None
    title: str
    description: str
    page_url: Optional[str] = None
    status_internal: StatusInternal
    status_public: StatusPublic
    assigned_to: Optional[str] = None
    due_date: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    closed_at: Optional[datetime] = None
    attachments_count: int = 0
    public_comments_count: int = 0
```

## `schemas/comment.py`

```python
from datetime import datetime
from typing import Literal
from pydantic import BaseModel, Field

AuthorRole = Literal["user", "staff", "admin"]

class CommentCreate(BaseModel):
    message: str = Field(min_length=1)
    is_public: bool = True

class CommentOut(BaseModel):
    id: str
    ticket_id: str
    author_id: str
    author_role: AuthorRole
    message: str
    is_public: bool
    created_at: datetime
```

---

## Arborescence backend recommandée

```txt
backend/
  app/
    api/
      support/
        routes_tickets.py
        routes_comments.py
        routes_attachments.py
        routes_applications.py
    core/
      security.py
      permissions.py
    models/
      support_ticket.py
      support_comment.py
      support_attachment.py
      support_event.py
      support_application.py
    schemas/
      ticket.py
      comment.py
      attachment.py
      application.py
    services/
      support_ticket_service.py
      support_comment_service.py
      support_attachment_service.py
      support_event_service.py
    repositories/
      support_ticket_repository.py
      support_comment_repository.py
      support_attachment_repository.py
```

---

## Arborescence frontend recommandée

```txt
frontend/
  app/
    support/
      page.tsx
      tickets/
        page.tsx
        [id]/
          page.tsx
  features/
    support/
      api/
        support-client.ts
      components/
        support-widget.tsx
        ticket-form.tsx
        ticket-kanban-readonly.tsx
        ticket-comments.tsx
        ticket-detail-sheet.tsx
      config/
        ticket-schema.ts
      lib/
        support-db-client.ts
        support-permissions.ts
```

---

## Cas de tests minimum

## Backend
- création ticket valide
- refus création sans `title`
- refus création sans `severity` si `type=bug`
- listing restreint au user
- listing global staff
- patch statut staff ok
- patch statut user refusé
- commentaire public user ok
- commentaire interne user refusé
- upload pièce jointe ok
- type de fichier interdit refusé

## Frontend
- formulaire valide
- formulaire avec erreurs
- kanban staff drag and drop
- vue calendrier alimentée par `due_date`
- vue user sans actions d’édition
- affichage commentaire public uniquement pour user

---

## Décision recommandée

Le backend doit être la source de vérité.  
`shadcn-data-views` sert uniquement de couche de rendu et d’interaction.

Donc :

- **PostgreSQL** = stockage métier
- **FastAPI** = logique métier, droits, validation, sécurité
- **Next.js + shadcn-data-views** = expérience utilisateur
- **lecture seule user** = gérée par le frontend + les permissions API
- **édition staff** = gérée par le frontend + les routes protégées

Cette approche garde une architecture propre, extensible et totalement compatible avec le serveur OVH déjà équipé de Docker et PostgreSQL.
