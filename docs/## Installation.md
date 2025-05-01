## Installation

Ce projet de gestion d'événements sportifs nécessite Node.js et une instance de MongoDB pour fonctionner correctement.

### Prérequis

- **Node.js** (version 18 ou supérieure recommandée) : Vous pouvez le télécharger depuis le site officiel de [Node.js](https://nodejs.org/).
- **MongoDB** : Assurez-vous d'avoir une instance de MongoDB en cours d'exécution. Vous pouvez l'installer localement ou utiliser un service cloud comme MongoDB Atlas.

### Étapes d'Installation

1.  **Cloner le Répertoire :**

    ```bash
    git clone [URL_DE_VOTRE_REPO]
    cd [NOM_DE_VOTRE_REPO]
    ```

    Remplacez `[URL_DE_VOTRE_REPO]` par l'URL du dépôt GitHub et `[NOM_DE_VOTRE_REPO]` par le nom du dossier créé lors du clonage.

2.  **Configuration de l'Environnement :**

    - À la racine du projet, vous trouverez un fichier `.env.example`.
    - Créez une copie de ce fichier et renommez-la `.env`.
    - Ouvrez le fichier `.env` et renseignez les informations de connexion à votre base de données MongoDB ainsi que toute autre variable d'environnement nécessaire (par exemple, le port de l'application, les clés secrètes JWT, etc.). Reportez-vous au contenu de `.env.example` pour connaître les clés à configurer.

3.  **Installation des Dépendances :**
    Exécutez la commande suivante dans le répertoire du projet pour installer toutes les librairies et dépendances nécessaires listées dans le fichier `package.json` :

    ```bash
    npm install
    ```

4.  **Démarrage de l'Application :**
    Vous pouvez démarrer l'application de deux manières :

    - **Mode Développement (avec redémarrage automatique) :**

      ```bash
      npm run dev
      ```

    - **Mode Production :**
      ```bash
      npm run start
      ```
      Cette commande démarre l'application en mode production.

    L'application sera accessible par défaut à l'adresse `http://localhost:3300`.
