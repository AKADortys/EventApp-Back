## Routes de l'API

Cette API RESTful permet de gérer les inscriptions, les événements et les utilisateurs de la plateforme de gestion d'événements sportifs. Toutes les routes sont préfixées par `http://localhost:3300/`.

### Inscriptions (`/registrations`)

- **`GET /registrations/`** : Récupère la liste de toutes les inscriptions avec pagination `(page : number, limit : number)`.
- **`GET /registrations/:id`** : Récupère une inscription spécifique par son ID.
- **`POST /registrations/`** : Crée une nouvelle inscription. Le corps de la requête doit contenir les informations nécessaires (événement, utilisateur, statut, statut du paiement).
- **`PUT /registrations/:id`** : Met à jour une inscription existante par son ID. Le corps de la requête doit contenir les champs à modifier.
- **`DELETE /registrations/:id`** : Supprime une inscription spécifique par son ID.

_(Une documentation des schémas de validation (dto) pour connaître la structure exacte du corps de la requête attendu est disponible dans le fichier [/dto/registration.dto.md](./dto/registration.dto.md))_

### Événements (`/events`)

- **`GET /events/`** : Récupère la liste de tous les événements avec pagination `(page : number, limit : number)`.
- **`GET /events/:id`** : Récupère un événement spécifique par son ID.
- **`GET /events/:id/registrations`**: Récupère les inscriptions à un événement par l'ID de ce dernier avec pagination `(page : number, limit : number)`
- **`POST /events/`** : Crée un nouvel événement. Le corps de la requête doit contenir les informations nécessaires (titre, description, date, lieu, type de sport, nombre maximum de participants, organisateur).
- **`PUT /events/:id`** : Met à jour un événement existant par son ID. Le corps de la requête doit contenir les champs à modifier.
- **`DELETE /events/:id`** : Supprime un événement spécifique par son ID.

_(Une documentation des schémas de validation (dto) pour connaître la structure exacte du corps de la requête attendu est disponible dans le fichier [/dto/event.dto.md](./dto/event.dto.md))_

### Utilisateurs (`/users`)

- **`GET /users/`** : Récupère la liste de tous les utilisateurs avec pagination `(page : number, limit : number)`.
- **`GET /users/:id`** : Récupère un utilisateur spécifique par son ID.
- **`POST /users/`** : Crée un nouvel utilisateur. Le corps de la requête doit contenir les informations nécessaires (prénom, nom, email, téléphone, mot de passe, rôle).
- **`PUT /users/:id`** : Met à jour un utilisateur existant par son ID. Le corps de la requête doit contenir les champs à modifier.
- **`DELETE /users/:id`** : Supprime un utilisateur spécifique par son ID.

_(Une documentation des schémas de validation (dto) pour connaître la structure exacte du corps de la requête attendu est disponible dans le fichier [/dto/user.dto.md](./dto/user.dto.md))_

### Authentification (`/auth`)

- **`POST /auth/login`** : Authentifie un utilisateur existant. Le corps de la requête doit contenir l'email et le mot de passe. Renvoie un token d'accès et potentiellement un token de rafraîchissement.
- **`POST /auth/logout`** : Déconnecte l'utilisateur (invalide le token).
