## Documentation du fichier `registration.model.js` (ou similaire)

Ce fichier définit le schéma Mongoose pour le modèle `Registration` (Inscription) dans la base de données MongoDB. Il décrit la structure des documents représentant les inscriptions des utilisateurs aux événements.

**Imports :**

* `mongoose`: Importe la librairie Mongoose, essentielle pour définir les schémas et interagir avec MongoDB.

**Définition du Schéma `registrationSchema` :**

Le schéma `registrationSchema` définit la structure des documents `Registration` dans la collection MongoDB. Il établit les relations avec les modèles `Event` et `User`, et inclut des informations sur le statut de l'inscription et du paiement.

* `event`:
    * `type: mongoose.Schema.Types.ObjectId`: Définit le type comme un ObjectId de Mongoose, qui est l'identifiant unique des documents dans MongoDB.
    * `ref: "Event"`: Établit une référence au modèle `Event`. Cela permet de peupler facilement les informations de l'événement associé lors de la récupération des inscriptions.
    * `required: [true, "L'événement est requis pour une inscription"]`: L'identifiant de l'événement est obligatoire pour créer une inscription.
* `user`:
    * `type: mongoose.Schema.Types.ObjectId`: Définit le type comme un ObjectId de Mongoose.
    * `ref: "User"`: Établit une référence au modèle `User`. Cela permet de peupler facilement les informations de l'utilisateur associé.
    * `required: [true, "L'utilisateur est requis pour une inscription"]`: L'identifiant de l'utilisateur est obligatoire pour créer une inscription.
* `status`:
    * `type: String`: Le statut de l'inscription est une chaîne de caractères.
    * `enum: ["en attente", "confirmée", "annulée"]`: Le statut ne peut prendre que l'une des valeurs définies dans l'énumération, assurant ainsi la cohérence des données.
    * `default: "en attente"`: La valeur par défaut du statut est "en attente" lors de la création d'une nouvelle inscription.
* `paymentStatus`:
    * `type: String`: Le statut du paiement est une chaîne de caractères.
    * `enum: ["non payé", "payé"]`: Le statut du paiement ne peut prendre que l'une des deux valeurs définies.
    * `default: "non payé"`: La valeur par défaut du statut de paiement est "non payé".
* `timestamps: true`: Option qui ajoute automatiquement les champs `createdAt` (date de création) et `updatedAt` (date de dernière mise à jour) à chaque document d'inscription.

**Index :**

* `registrationSchema.index({ event: 1, user: 1 }, { unique: true });`: Définit un index unique sur la combinaison des champs `event` et `user`. Cela garantit qu'un utilisateur ne peut pas s'inscrire plusieurs fois au même événement, évitant ainsi les doublons d'inscriptions.

**Middleware Mongoose :**

* `registrationSchema.pre("findOneAndDelete", async function (next) { ... })`: Ce middleware s'exécute *avant* qu'un document `Registration` ne soit supprimé en utilisant la méthode `findOneAndDelete`. Il a pour objectif de maintenir la cohérence des données en retirant l'utilisateur de la liste des participants de l'événement associé :
    * Récupère l'inscription à supprimer.
    * Récupère l'ID de l'événement (`eventId`) et de l'utilisateur (`userId`) à partir de l'inscription.
    * Importe dynamiquement le modèle `Event` pour éviter les dépendances circulaires.
    * Utilise `Event.findByIdAndUpdate` pour mettre à jour le document de l'événement correspondant en utilisant l'opérateur `$pull` afin de retirer l'`userId` du tableau `participants`.
    * Appelle `next()` pour passer au middleware suivant (la suppression réelle). En cas d'erreur, il appelle `next(error)` pour propager l'erreur.

**Création du Modèle `Registration` :**

* `const Registration = mongoose.model("Registration", registrationSchema);`: Crée un modèle Mongoose nommé `Registration` basé sur le schéma `registrationSchema`. Ce modèle est utilisé pour interagir avec la collection "registrations" dans la base de données.

**Exportation du Modèle :**

* `module.exports = Registration;`: Exporte le modèle `Registration` pour qu'il puisse être utilisé dans d'autres parties de l'application (par exemple, dans les contrôleurs pour gérer les inscriptions).