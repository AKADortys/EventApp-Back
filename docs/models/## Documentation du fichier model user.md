## Documentation du fichier `user.model.js` (ou similaire)

Ce fichier définit le schéma Mongoose pour le modèle `User` (Utilisateur) dans la base de données MongoDB. Il inclut la définition des champs, les validations, et les middlewares pour la gestion du mot de passe et de la suppression des utilisateurs.

**Imports :**

* `mongoose`: Importe la librairie Mongoose, qui fournit une abstraction pour interagir avec MongoDB et définir des modèles de données.
* `bcrypt`: Importe la librairie `bcrypt` pour le hachage sécurisé des mots de passe.
* `validator`: Importe la librairie `validator` pour effectuer diverses validations de données, comme la vérification d'emails et de numéros de téléphone.

**Définition du Schéma `userSchema` :**

Le schéma `userSchema` définit la structure des documents `User` dans la collection MongoDB. Chaque champ est défini avec son type, ses validations (obligatoire, longueur minimale/maximale, format), et potentiellement des valeurs par défaut.

* `name` (Prénom) :
    * `type: String`: Le prénom est une chaîne de caractères.
    * `required: [true, "Le prénom est requis"]`: Le prénom est un champ obligatoire. Si non fourni, un message d'erreur est généré.
    * `minlength: [2, "Le prénom doit avoir au moins 2 caractères"]`: Le prénom doit avoir au moins 2 caractères.
    * `maxlength: [50, "Le prénom ne doit pas dépasser 50 caractères"]`: Le prénom ne doit pas dépasser 50 caractères.
    * `trim: true`: Supprime les espaces blancs au début et à la fin de la chaîne.
* `lastName` (Nom de famille) : Similaire à `name` avec des messages d'erreur appropriés.
* `mail` (Email) :
    * `type: String`: L'email est une chaîne de caractères.
    * `required: [true, "L'email est requis"]`: L'email est un champ obligatoire.
    * `unique: true`: Assure que chaque utilisateur a un email unique dans la base de données (une indexation unique sera créée dans MongoDB).
    * `lowercase: true`: Convertit l'email en minuscules avant de l'enregistrer.
    * `trim: true`: Supprime les espaces blancs au début et à la fin de la chaîne.
    * `validate`: Objet définissant une validation personnalisée pour l'email.
        * `validator: (value) => validator.isEmail(value)`: Utilise la fonction `isEmail` de la librairie `validator` pour vérifier le format de l'email.
        * `message: "L'email fourni est invalide"`: Message d'erreur si la validation échoue.
* `phone` (Numéro de téléphone) :
    * `type: String`: Le numéro de téléphone est une chaîne de caractères.
    * `required: [true, "Le numéro de téléphone est requis"]`: Le numéro de téléphone est un champ obligatoire.
    * `validate`: Objet définissant une validation personnalisée pour le numéro de téléphone.
        * `validator: (value) => validator.isMobilePhone(value, "fr-FR")`: Utilise la fonction `isMobilePhone` de la librairie `validator` pour vérifier si le numéro de téléphone est valide pour la locale française (`fr-FR`).
        * `message: "Numéro de téléphone invalide"`: Message d'erreur si la validation échoue.
* `password` (Mot de passe) :
    * `type: String`: Le mot de passe est une chaîne de caractères (qui sera hachée avant d'être enregistrée).
    * `required: [true, "Le mot de passe est requis"]`: Le mot de passe est un champ obligatoire.
    * `minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"]`: Le mot de passe doit contenir au moins 8 caractères.
    * `validate`: Objet définissant une validation personnalisée pour la complexité du mot de passe.
        * `validator`: Fonction qui utilise `validator.isStrongPassword` avec des options spécifiques pour exiger au moins une minuscule, une majuscule et un chiffre.
        * `message`: Message d'erreur si la validation échoue.
* `role` (Rôle) :
    * `type: String`: Le rôle est une chaîne de caractères.
    * `enum: ["admin", "sportif", "organisateur"]`: Le rôle ne peut prendre que l'une des valeurs définies dans l'énumération.
    * `default: "sportif"`: La valeur par défaut du rôle est "sportif" si aucune autre valeur n'est spécifiée lors de la création d'un utilisateur.
* `timestamps: true`: Option qui ajoute automatiquement deux champs horodatés au document : `createdAt` (date de création) et `updatedAt` (date de dernière mise à jour).

**Middlewares Mongoose :**

* `userSchema.pre("findOneAndDelete", async function (next) { ... })`: Ce middleware s'exécute *avant* qu'un document `User` ne soit supprimé en utilisant la méthode `findOneAndDelete`. Il a pour but de gérer les dépendances et d'éviter des données orphelines :
    * Récupère l'utilisateur à supprimer.
    * Importe dynamiquement les modèles `Event` et `Registration` pour éviter les dépendances circulaires au démarrage de l'application.
    * Supprime tous les événements organisés par cet utilisateur.
    * Récupère toutes les inscriptions de cet utilisateur.
    * Pour chaque inscription, retire l'utilisateur du tableau `participants` de l'événement correspondant.
    * Supprime toutes les inscriptions de cet utilisateur.
    * Appelle `next()` pour passer au middleware suivant (la suppression réelle). En cas d'erreur, il appelle `next(err)` pour propager l'erreur.
* `userSchema.pre("save", async function (next) { ... })`: Ce middleware s'exécute *avant* qu'un nouveau document `User` ne soit enregistré (ou lors d'une modification du mot de passe). Il hache le mot de passe avant de l'enregistrer dans la base de données :
    * Vérifie si le champ `password` a été modifié. Si non, il passe au middleware suivant.
    * Génère un "salt" (une chaîne de caractères aléatoire) en utilisant `bcrypt.genSalt(10)`.
    * Utilise `bcrypt.hash` pour hacher le mot de passe en utilisant le salt généré.
    * Met à jour la valeur du champ `password` avec le mot de passe haché.
    * Appelle `next()` pour passer au middleware suivant (l'enregistrement). En cas d'erreur, il appelle `next(error)`.
* `userSchema.pre("findOneAndUpdate", async function (next) { ... })`: Ce middleware s'exécute *avant* qu'un document `User` ne soit mis à jour en utilisant la méthode `findOneAndUpdate`. Il gère le rehachage du mot de passe si celui-ci est modifié lors de la mise à jour :
    * Récupère les mises à jour à appliquer (`this.getUpdate()`).
    * Vérifie si le champ `password` est présent dans les mises à jour.
    * Si oui, il génère un salt et hache le nouveau mot de passe, puis met à jour l'objet de mise à jour (`this.setUpdate(update)`).
    * Appelle `next()` pour passer au middleware suivant (la mise à jour). En cas d'erreur, il appelle `next(error)`.

**Création du Modèle `User` :**

* `const User = mongoose.model("User", userSchema);`: Crée un modèle Mongoose nommé `User` basé sur le schéma `userSchema`. Ce modèle est utilisé pour interagir avec la collection "users" dans la base de données.

**Exportation du Modèle :**

* `module.exports = User;`: Exporte le modèle `User` pour qu'il puisse être utilisé dans d'autres parties de l'application (par exemple, dans les contrôleurs pour effectuer des opérations sur les utilisateurs).