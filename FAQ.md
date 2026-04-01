# 📘 FAQ Technique – Test Technique

## 🚀 Stack & Architecture

### Frontend

* ⚛️ React (TypeScript)
* 🎨 TailwindCSS (via plugin Vite)
* 🧩 Architecture **Atomic Design** :

    * `atoms`
    * `molecules`
    * `organisms`
    * `templates`
    * `pages`
* 🧠 Gestion des formulaires :

    * `react-hook-form`
    * `zod` (validation)
* 🔔 Notifications :

    * `react-toastify`
* 🌐 API :

    * `fetch` custom (`apiFetch`)
* ⚡ Build :

    * Vite

### Backend

* ☕ Java (Spring Boot)
* 🌐 API REST
* 📦 Structure en architecture hexagonale
* 🗄️ Base de données avec initialisation via `data.sql`

---

## 📦 Git

Le projet est disponible ici :
👉 **[Lien du repository Git](https://github.com/stevvnsy/lya_test-technique)** *(à remplacer)*

J’ai volontairement structuré mon travail avec des **commits progressifs et cohérents**, afin de permettre :

* de suivre l’évolution du projet étape par étape
* de comprendre les décisions techniques prises
* d’illustrer ma manière de travailler en conditions réelles

Les commits sont organisés par grandes étapes :

* mise en place de l’UI
* structuration en Atomic Design
* ajout des hooks métier
* intégration API
* amélioration UX (search, scroll, responsive, etc.)

👉 L’objectif est de donner une **lecture claire de mon raisonnement et de mon workflow**.

---

## 🧠 Choix techniques

### 🎯 Frontend

#### 🎨 TailwindCSS

* Rapidité de développement
* Cohérence visuelle
* Facilité de gestion du dark mode

#### 🧩 Architecture Atomic Design

* Séparation claire des responsabilités UI
* Réutilisabilité des composants
* Scalabilité du projet

#### 🧠 React Hook Form + Zod

* Validation performante et déclarative
* Synchronisation frontend / backend
* Gestion fine des erreurs (dont celles du backend)

#### 🌐 API avec `fetch` custom

* Évite une dépendance inutile (axios)
* Contrôle total (gestion erreurs, typage, parsing)
* Extensible (auth, interceptors, etc.)

#### 🔔 React-Toastify

* Feedback utilisateur rapide
* Gestion des états async (loading → success / error)

---

### 🧠 Architecture globale

Le projet suit une logique proche de l’**architecture hexagonale (ports & adapters)** :

* **Backend**

    * Controllers → adaptateurs HTTP
    * Services → logique métier (cœur)
    * Repositories → accès aux données

* **Frontend**

    * Hooks → logique métier (équivalent service)
    * API layer → adaptateur HTTP
    * UI → couche présentation

👉 Cela permet :

* une meilleure séparation des responsabilités
* une testabilité accrue
* une évolutivité facilitée

---

## 🏗️ Diagramme d’architecture (Hexagonale simplifiée)

```text
                ┌────────────────────────────┐
                │        Frontend (React)    │
                │                            │
                │   UI (Atomic Design)       │
                │   ────────────────         │
                │   Pages / Templates        │
                │   Organisms                │
                │   Molecules                │
                │   Atoms                    │
                │                            │
                │   Hooks (logique métier)   │
                │   ─────────────────────    │
                │   useCategories            │
                │   useSearch                │
                │   useCreateQuestion        │
                │                            │
                │   API Layer (adapter HTTP) │
                │   ─────────────────────    │
                │   apiFetch                 │
                └─────────────┬──────────────┘
                              │ HTTP (REST)
                              ▼
                ┌────────────────────────────┐
                │        Backend (Spring)    │
                │                            │
                │   Controllers (Adapter)    │
                │   ─────────────────────    │
                │   REST endpoints           │
                │                            │
                │   Services (Domain)        │
                │   ─────────────────────    │
                │   logique métier           │
                │                            │
                │   Repositories (Adapter)   │
                │   ─────────────────────    │
                │   accès base de données    │
                │                            │
                └─────────────┬──────────────┘
                              │
                              ▼
                      Base de données
```

---

## 💡 Pourquoi ce choix d’architecture ?

* 🔹 Séparation claire :

    * UI ≠ logique métier ≠ accès données
* 🔹 Testabilité améliorée
* 🔹 Facilité d’évolution (ex : ajouter auth, cache, etc.)
* 🔹 Alignement avec des standards professionnels (hexagonal / clean architecture)

---

## 🧪 Tests API (Postman)

Un dossier `postman/` est disponible à la racine du projet.

Il contient une **collection Postman au format `.yaml`**, permettant de tester facilement l’ensemble des endpoints de
l’API.

### 📦 Contenu

* Collection Postman (`.yaml`)
* Endpoints disponibles :

    * `GET /api/categories`
    * `GET /api/categories/{id}`
    * `POST /api/categories`
    * `POST /api/categories/{id}/questions`
    * `GET /api/questions/search?q=...`

---

### ⚠️ Pourquoi Postman ?

Le projet ne contient pas de documentation automatique type **Swagger / OpenAPI UI**.

👉 La collection Postman permet donc de :

* tester rapidement tous les endpoints
* comprendre les formats de requêtes / réponses
* simuler différents cas (validation, erreurs, etc.)

---

### 💡 Amélioration possible

* Ajouter **Swagger / OpenAPI** côté backend pour exposer une documentation interactive
* Générer automatiquement la collection Postman à partir du schéma OpenAPI

---

## 🧠 Fonctionnalités implémentées

### 📂 Catégories & Questions

* Liste des catégories (`GET /api/categories`)
* Détail d’une catégorie (`GET /api/categories/{id}`)
* Création de catégorie (`POST /api/categories`)
* Création de question liée à une catégorie (`POST /api/categories/{id}/questions`)

### 🔎 Recherche

* Recherche globale (`GET /api/questions/search?q=...`)
* Résultats groupés par catégorie
* Overlay UX moderne
* Scroll automatique vers la question sélectionnée

### 🧭 Navigation

* Sidebar (desktop + mobile avec burger)
* Vue :

    * Toutes les catégories
    * Détail d’une catégorie

### 🧾 Formulaires

* Validation frontend (`zod`)
* Validation backend affichée dans les champs
* Gestion des erreurs + toast

### 🔄 Synchronisation des données

* Reload des catégories après mutation
* Reload ciblé de la catégorie active
* Gestion des états async (loading, error)

### 🎨 UI / UX

* Light / Dark mode
* Scroll interne maîtrisé
* Overlay de recherche
* Toasts custom (Tailwind)
* Responsive design

---

## 🔔 Gestion des erreurs

* Toast global avec message backend
* Mapping des erreurs backend → champs formulaire
* Gestion des erreurs API typée (`ApiError`)

---

## 🐳 Docker & Environnement

### ❓ Problème rencontré

> Obligation de relancer en local avec IntelliJ ?

## 📦 Git

* Travail par étapes (commit logique recommandé)
* Structuration progressive :

    * UI
    * Hooks
    * API
    * UX

---

# 🚧 Axes d'améliorations

* Ajouter de nouvelles features comme la suppression d'une question, ou encore la suppression d'une catégorie et ses
  questions rattachées

## Backend

* 🔄 Mettre en place **Liquibase** :

    * gestion des migrations (changelog)
    * versionning du schéma BDD
* 🆔 Utiliser des `UUID` au lieu de `LONG`
* 🧪 Ajouter des tests :

    * JUnit / SpringBootTest
    * tests d’intégration API

## Frontend

* 🧪 Ajouter des tests :

    * E2E → **Playwright** ou **Cypress**
    * Unit → React Testing Library
* ⚡ Ajouter un cache API (type React Query)
* ♻️ Centraliser la gestion des données (state global)
* ✨ Optimisation UX :

    * focus automatique sur erreur
    * highlight question après recherche
* 📦 Lazy loading des pages
* ⚛️ Créer un Design System avec Storybook pour pouvoir docummenter tous les composants existants et réutilisables

---

## 🎉 Fun Facts

* J’ai préféré, grâce à ce test, écrire du **Java plutôt que du PHP** 🙂

* J’ai vraiment pris du plaisir à réaliser ce test, notamment sur la partie **architecture, UX et intégration front/back
  **.

* Je suis également totalement ouvert à la discussion autour de ce projet :

    * comprendre ce qui aurait pu être amélioré
    * challenger mes choix techniques
    * comparer avec d’autres approches possibles

👉 L’objectif pour moi est autant de livrer un projet propre que de pouvoir **échanger dessus et progresser**.

