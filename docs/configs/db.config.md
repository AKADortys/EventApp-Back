# Connexion à la base de données MongoDB

Ce fichier définit une fonction asynchrone (`connect`) pour établir une connexion à une base de données MongoDB en utilisant la librairie Mongoose.

## Fonctionnalités

* **Connexion via URI :** La connexion est établie en utilisant l'URI de la base de données MongoDB, récupérée depuis la variable d'environnement `MONGO_URI`.
* **Options de connexion personnalisées :** Des options de connexion spécifiques sont appliquées, notamment `authSource: "admin"` pour spécifier la base de données d'authentification.
* **Gestion des erreurs robuste :** En cas d'échec initial de la connexion, un message d'erreur informatif est affiché dans la console, et l'application est arrêtée pour prévenir tout comportement inattendu.
* **Reconnexion automatique :** Mongoose est configuré pour tenter automatiquement de rétablir la connexion si celle-ci est perdue en cours d'exécution, assurant ainsi une meilleure résilience de l'application.
* **Surveillance de l'état de la connexion :** Des écouteurs d'événements sont mis en place pour surveiller les changements d'état de la connexion Mongoose :
    * L'événement `disconnected` est écouté pour détecter les déconnexions.
    * L'événement `error` est écouté pour capturer toute erreur survenant au niveau de la connexion.
* **Export de la fonction `connect` :** La fonction `connect` est exportée, permettant à d'autres modules de l'application d'initier facilement la connexion à la base de données.

## Utilisation

Pour utiliser cette fonction dans votre application, importez-la et appelez-la au démarrage de votre application (par exemple, dans votre fichier principal `index.js` ou `app.js`) :
