# Test Technique - FAQ Manager

## Contexte

L'entreprise souhaite une application de **FAQ interne** où les employés peuvent consulter des questions/réponses
organisées par catégories.

Vous disposez d'un squelette d'application avec un **frontend React** et un **backend Spring Boot**. Le projet est
précâblé (Docker, config, dépendances) mais **ne contient aucun code métier**. C'est à vous de tout implémenter.

Un **jeu de données par défaut** est fourni dans `backend/src/main/resources/data.sql`. Il sera automatiquement injecté
au démarrage de l'application une fois vos entités JPA correctement définies.

---

## Pour démarrer

### Avec Docker

```bash
docker compose up --build
```

- Frontend : http://localhost:3000
- Backend : http://localhost:8080
- Console H2 : http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:faqdb`, user: `sa`, pas de mot de passe)

### Sans Docker (développement local)

**Backend :**

```bash
cd backend
./mvnw spring-boot:run
```

**Frontend :**

```bash
cd frontend
npm install
npm run dev
```

> Note : en local, modifier le proxy dans `vite.config.ts` pour pointer vers `localhost:8080` au lieu de `backend:8080`.

---

## Ce qui est fourni

| Élément                           | Description                                            |
|-----------------------------------|--------------------------------------------------------|
| `docker-compose.yml`              | Orchestration des services frontend + backend          |
| `backend/Dockerfile`              | Build multi-stage Maven → JRE                          |
| `backend/pom.xml`                 | Spring Boot 3, JPA, H2, Lombok                         |
| `backend/application.properties`  | Config BDD H2 en mémoire, JPA, console H2              |
| `backend/data.sql`                | Jeu de données par défaut (3 catégories, 10 questions) |
| `backend/HealthController.java`   | Endpoint `GET /api/health` (health check)              |
| `backend/BackendApplication.java` | Point d'entrée Spring Boot                             |
| `frontend/Dockerfile`             | Build multi-stage Node → Nginx                         |
| `frontend/nginx.conf`             | Config Nginx (SPA + proxy API)                         |
| `frontend/package.json`           | React 19, Vite 6, TypeScript                           |
| `frontend/vite.config.ts`         | Proxy `/api` vers le backend                           |
| `frontend/HomePage.tsx`           | Composant racine (vide, à implémenter)                 |

---

## Jeu de données par défaut

Le fichier `data.sql` chargera automatiquement ces données au démarrage, **à condition que vos entités JPA créent les
bonnes tables** (`categories` et `questions`).

### Catégories

| ID | Nom       | Description                           |
|----|-----------|---------------------------------------|
| 1  | Général   | Questions générales sur l'entreprise  |
| 2  | Technique | Questions techniques et IT            |
| 3  | RH        | Ressources humaines et vie au travail |

### Questions

| ID | Catégorie | Question                                     | Réponse                                                                                          |
|----|-----------|----------------------------------------------|--------------------------------------------------------------------------------------------------|
| 1  | Général   | Quels sont les horaires d'ouverture ?        | Les bureaux sont ouverts de 9h à 18h, du lundi au vendredi.                                      |
| 2  | Général   | Comment accéder au parking ?                 | Le parking est accessible avec votre badge employé au niveau -1.                                 |
| 3  | Général   | Où se trouve la cafétéria ?                  | La cafétéria est située au 2ème étage, ouverte de 11h30 à 14h.                                   |
| 4  | Technique | Comment me connecter au VPN ?                | Téléchargez le client VPN depuis l'intranet et utilisez vos identifiants Active Directory.       |
| 5  | Technique | Qui contacter en cas de panne informatique ? | Envoyez un mail à support@entreprise.com ou appelez le poste 1234.                               |
| 6  | Technique | Comment demander un nouvel équipement ?      | Faites une demande sur le portail IT en précisant vos besoins et la validation de votre manager. |
| 7  | Technique | Comment accéder au GitLab interne ?          | Rendez-vous sur gitlab.entreprise.com et connectez-vous avec votre SSO.                          |
| 8  | RH        | Comment poser des congés ?                   | Utilisez l'application RH en ligne. Les demandes doivent être soumises 2 semaines à l'avance.    |
| 9  | RH        | Quelle est la politique de télétravail ?     | Jusqu'à 3 jours par semaine en télétravail, à valider avec votre manager.                        |
| 10 | RH        | Comment fonctionne la mutuelle ?             | La mutuelle entreprise couvre 80% des frais. Les détails sont sur l'intranet RH.                 |

---

## Endpoints attendus

| Méthode | Route                            | Description                                      |
|---------|----------------------------------|--------------------------------------------------|
| `GET`   | `/api/health`                    | Health check (déjà implémenté)                   |
| `GET`   | `/api/categories`                | Liste toutes les catégories avec leurs questions |
| `GET`   | `/api/categories/{id}`           | Détail d'une catégorie                           |
| `POST`  | `/api/categories`                | Créer une catégorie                              |
| `POST`  | `/api/categories/{id}/questions` | Ajouter une question à une catégorie             |
| `GET`   | `/api/questions/search?q=xxx`    | Rechercher dans les questions                    |

---

## Ce qui est attendu

- Implémenter le backend permettant d'exposer les endpoints listés ci-dessus
- Créer une interface frontend qui consomme ces endpoints
- L'utilisation de librairies UI est autorisée pour gagner du temps
- Le design n'a pas besoin d'être parfait, mais l'interface doit être fonctionnelle
- Le plus important est de démontrer votre capacité à construire une application full-stack complète, avec un code
  propre et maintenable

---

## Structure du projet

```
├── docker-compose.yml
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/testtech/backend/
│       │   ├── BackendApplication.java
│       │   └── controller/
│       │       └── HealthController.java
│       └── resources/
│           ├── application.properties
│           └── data.sql                     ← Jeu de données par défaut
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── HomePage.tsx                          ← Point d'entrée (vide)
        ├── HomePage.css
        └── main.tsx
```

**Tout le reste est à créer par le candidat.**

---

**Durée estimée : 2 à 3 heures**

Bonne chance !
