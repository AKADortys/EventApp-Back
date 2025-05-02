index.js doc

## Documentation du fichier principal

Ce fichier est le point d'entrée principal de l'application Node.js utilisant le framework Express. Il configure le serveur, connecte à la base de données, met en place les middlewares et définit les routes principales de l'API.

**Imports :**

- `express`: Importe la librairie Express pour créer et gérer l'application web et l'API.
- `app`: Instance de l'application Express créée.
- `cookieParser`: Middleware pour analyser les cookies attachés aux requêtes HTTP.
- `cors`: Middleware pour gérer les Cross-Origin Resource Sharing (partage de ressources entre origines différentes), permettant de spécifier les domaines autorisés à accéder à l'API.
- `dotenv`: Librairie pour charger les variables d'environnement à partir d'un fichier `.env`.
- `connect`: Fonction (importée depuis `./src/config/database`) responsable de l'établissement de la connexion à la base de données. [configs/db.config.md](./configs/db.config.md)

**Fonctions et Middleware :**

- `connect()`: Appel de la fonction pour se connecter à la base de données
- `app.use(cookieParser())`: Utilisation du middleware `cookieParser` pour rendre les cookies disponibles dans les objets `request`.
- `app.use(cors())`: Utilisation du middleware `cors` pour configurer les options de partage de ressources entre origines. Sans configuration spécifique ici, il autorise potentiellement toutes les origines.
- `app.use(express.json())`: Middleware intégré à Express pour analyser le corps des requêtes HTTP au format JSON. Les données JSON envoyées par le client seront disponibles dans `req.body`.

**Routes :**

- `app.use("/users", require("./src/routes/user.route"))`: Monte le routeur défini dans `./src/routes/user.route` sous le préfixe `/users`. Toutes les routes définies dans ce fichier seront accessibles via des URLs commençant par `/users`. Ce routeur gère les opérations liées aux utilisateurs (création, lecture, mise à jour, suppression).
- `app.use("/events", require("./src/routes/event.route"))`: Monte le routeur défini dans `./src/routes/event.route` sous le préfixe `/events`. Ce routeur gère les opérations liées aux événements.
- `app.use("/auth", require("./src/routes/auth.route"))`: Monte le routeur défini dans `./src/routes/auth.route` sous le préfixe `/auth`. Ce routeur gère les opérations d'authentification (connexion, inscription).
- `app.use("/registrations", require("./src/routes/registration.route"))`: Monte le routeur défini dans `./src/routes/registration.route` sous le préfixe `/registrations`. Ce routeur gère les opérations liées aux inscriptions à des événements.

**Démarrage du serveur :**

- `app.listen(process.env.APP_PORT, () => { console.log(\`app listening on port ${process.env.APP_PORT}\`); })`: Démarre le serveur Express et le fait écouter les connexions sur le port spécifié dans la variable d'environnement `APP_PORT`. Un message de confirmation est affiché dans la console lorsque le serveur est en cours d'exécution.
