# Backend Node.js pour Application de Gestion d'Événements Sportifs

[![Node.js](https://img.shields.io/badge/node.js-v18%2B-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.4%2B-orange.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/express-v4.17%2B-blueviolet.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ## Présentation du Projet

Ce dépôt contient le code source du backend Node.js développé dans le cadre d'un projet scolaire visant à créer une application web complète de gestion d'événements sportifs. Ce backend a été spécifiquement conçu pour interagir avec une application front-end Angular, fournissant l'API et la logique serveur nécessaires à la gestion des utilisateurs, des événements et des inscriptions.

## Nécessité et Utilité

Ce backend répond aux besoins fonctionnels d'une plateforme de gestion d'événements sportifs, permettant de :

- **Gérer les comptes utilisateurs :** Offrir la possibilité aux sportifs et aux organisateurs de créer des comptes sécurisés.
- **Authentifier les utilisateurs :** Permettre aux administrateurs (et potentiellement aux autres utilisateurs) de se connecter via une interface dédiée.
- **Faciliter la gestion des événements :** Fournir aux organisateurs les outils nécessaires pour créer, modifier et supprimer des événements sportifs.
- **Offrir une visibilité des événements :** Permettre à tous les utilisateurs de consulter la liste des événements disponibles.
- **Gérer les inscriptions :** Permettre aux sportifs de s'inscrire facilement aux événements de leur choix.
- **Consulter les détails des événements :** Offrir la possibilité de voir les informations complètes d'un événement et la liste des participants inscrits.
- **Consulter les profils utilisateurs :** Permettre la visualisation des informations des utilisateurs (selon les permissions).

En fournissant une API RESTful robuste et bien documentée, ce backend constitue la pierre angulaire de l'application Angular front-end, permettant une séparation claire des responsabilités et une architecture évolutive. Il assure la persistance des données (via MongoDB), la logique métier et la sécurité de l'application.

## Prérequis

- **Node.js** (version 18 ou supérieure recommandée) : [Télécharger Node.js](https://nodejs.org/)
- **MongoDB** (version 4.4 ou supérieure recommandée) : [Installer MongoDB](https://www.mongodb.com/docs/manual/installation/)

## Installation

1.  **Cloner le Répertoire :**

    ```bash
    git clone [URL_DE_VOTRE_REPO]
    cd [NOM_DE_VOTRE_REPO]
    ```

    _(Remplacez `[URL_DE_VOTRE_REPO]` par l'URL de votre dépôt GitHub et `[NOM_DE_VOTRE_REPO]` par le nom du dossier créé lors du clonage.)_

2.  **Configuration de l'Environnement :**

    - À la racine du projet, vous trouverez un fichier `.env.example`.
    - Créez une copie de ce fichier et renommez-la `.env`.
    - Ouvrez le fichier `.env` et renseignez les informations de connexion à votre base de données MongoDB ainsi que toute autre variable d'environnement nécessaire (par exemple, le port de l'application). Reportez-vous au contenu de `.env.example` pour connaître les clés à configurer.

3.  **Installation des Dépendances :**
    Exécutez la commande suivante dans le répertoire du projet :

    ```bash
    npm install
    ```

4.  **Démarrage de l'Application :**
    Vous pouvez démarrer l'application en mode développement (avec redémarrage automatique) :
    ```bash
    npm run dev
    ```
    Ou en mode production :
    ```bash
    npm run start
    ```
    L'application sera accessible par défaut à l'adresse `http://localhost:3300`.

## Routes de l'API

_(Une liste détaillée des routes de l'API est disponible dans le fichier [docs/API.md](/docs/API.md) ou ci-dessous)_

### Inscriptions (`/registrations`)

- `GET /registrations/`
- `GET /registrations/:id`
- `POST /registrations/`
- `PUT /registrations/:id`
- `DELETE /registrations/:id`

### Événements (`/events`)

- `GET /events/`
- `GET /events/:id`
- `POST /events/`
- `PUT /events/:id`
- `DELETE /events/:id`

### Utilisateurs (`/users`)

- `GET /users/`
- `GET /users/:id`
- `POST /users/`
- `PUT /users/:id`
- `DELETE /users/:id`

### Authentification (`/auth`)

- `POST /auth/login`
- `POST /auth/logout`

_Pour plus de détails sur les paramètres des requêtes, les corps de requête attendus et les réponses de l'API, veuillez consulter la [documentation de l'API](/docs/API.md)._

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez améliorer ce backend, veuillez consulter le fichier [CONTRIBUTING.md](/CONTRIBUTING.md) pour connaître les directives de contribution.
