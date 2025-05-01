## Routes de l'API

Cette API RESTful permet de gérer les inscriptions, les événements et les utilisateurs de la plateforme de gestion d'événements sportifs. Toutes les routes sont préfixées par `http://localhost:3300/`.

### Inscriptions (`/registrations`)

* **`GET /registrations/`** : Récupère la liste de toutes les inscriptions.
* **`GET /registrations/:id`** : Récupère une inscription spécifique par son ID.
* **`POST /registrations/`** : Crée une nouvelle inscription. Le corps de la requête doit contenir les informations nécessaires (événement, utilisateur, statut, statut du paiement).
* **`PUT /registrations/:id`** : Met à jour une inscription existante par son ID. Le corps de la requête doit contenir les champs à modifier.
* **`DELETE /registrations/:id`** : Supprime une inscription spécifique par son ID.

### Événements (`/events`)

* **`GET /events/`** : Récupère la liste de tous les événements.
* **`GET /events/:id`** : Récupère un événement spécifique par son ID.
* **`POST /events/`** : Crée un nouvel événement. Le corps de la requête doit contenir les informations nécessaires (titre, description, date, lieu, type de sport, nombre maximum de participants, organisateur).
* **`PUT /events/:id`** : Met à jour un événement existant par son ID. Le corps de la requête doit contenir les champs à modifier.
* **`DELETE /events/:id`** : Supprime un événement spécifique par son ID.

### Utilisateurs (`/users`)

* **`GET /users/`** : Récupère la liste de tous les utilisateurs.
* **`GET /users/:id`** : Récupère un utilisateur spécifique par son ID.
* **`POST /users/`** : Crée un nouvel utilisateur. Le corps de la requête doit contenir les informations nécessaires (prénom, nom, email, téléphone, mot de passe, rôle).
* **`PUT /users/:id`** : Met à jour un utilisateur existant par son ID. Le corps de la requête doit contenir les champs à modifier.
* **`DELETE /users/:id`** : Supprime un utilisateur spécifique par son ID.

### Authentification (`/auth`)

* **`POST /auth/login`** : Authentifie un utilisateur existant. Le corps de la requête doit contenir l'email et le mot de passe. Renvoie un token d'accès et potentiellement un token de rafraîchissement.
* **`POST /auth/logout`** : Déconnecte l'utilisateur (invalide le token).

**Note :** Pour les requêtes `POST` et `PUT`, veuillez vous référer à la documentation des schémas de validation (si disponible) pour connaître la structure exacte du corps de la requête attendu.