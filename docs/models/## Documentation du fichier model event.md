## Documentation du fichier `event.model.js` (ou similaire)

Ce fichier définit le schéma Mongoose pour le modèle `Event` (Événement) dans la base de données MongoDB. Il décrit la structure des documents représentant les événements sportifs.

**Imports :**

* `mongoose`: Importe la librairie Mongoose, nécessaire pour définir les schémas et interagir avec MongoDB.

**Définition du Schéma `eventSchema` :**

Le schéma `eventSchema` définit la structure des documents `Event` dans la collection MongoDB. Il inclut des informations telles que le titre, la description, la date, le lieu, le type de sport, le nombre maximum de participants, la liste des participants et l'organisateur.

* `title`:
    * `type: String`: Le titre de l'événement est une chaîne de caractères.
    * `required: [true, "Le titre de l'événement est requis"]`: Le titre est un champ obligatoire.
    * `minlength: [5, "Le titre doit contenir au moins 5 caractères"]`: Le titre doit avoir au moins 5 caractères.
    * `maxlength: [100, "Le titre ne doit pas dépasser 100 caractères"]`: Le titre ne doit pas dépasser 100 caractères.
    * `trim: true`: Supprime les espaces blancs au début et à la fin de la chaîne.
* `description`:
    * `type: String`: La description de l'événement est une chaîne de caractères.
    * `required: [true, "La description de l'événement est requise"]`: La description est un champ obligatoire.
    * `minlength: [10, "La description doit contenir au moins 10 caractères"]`: La description doit avoir au moins 10 caractères.
    * `trim: true`: Supprime les espaces blancs au début et à la fin de la chaîne.
* `date`:
    * `type: Date`: La date de l'événement est un objet Date JavaScript.
    * `required: [true, "La date de l'événement est requise"]`: La date est un champ obligatoire.
    * `validate`: Objet définissant une validation personnalisée pour la date.
        * `validator: (value) => value > new Date()`: Vérifie si la date de l'événement est postérieure à la date actuelle.
        * `message: "La date de l'événement doit être dans le futur"`: Message d'erreur si la validation échoue.
* `location`:
    * `type: String`: Le lieu de l'événement est une chaîne de caractères.
    * `required: [true, "Le lieu de l'événement est requis"]`: Le lieu est un champ obligatoire.
    * `trim: true`: Supprime les espaces blancs au début et à la fin de la chaîne.
* `sportType`:
    * `type: String`: Le type de sport est une chaîne de caractères.
    * `required: [true, "Le type de sport est requis"]`: Le type de sport est un champ obligatoire.
    * `enum`: Tableau de chaînes de caractères définissant les valeurs autorisées pour le type de sport. Cela assure la cohérence des données.
    * `default: "autre"`: La valeur par défaut du type de sport est "autre" si aucune autre valeur n'est spécifiée.
* `maxParticipants`:
    * `type: Number`: Le nombre maximum de participants est un nombre.
    * `required: [true, "Le nombre maximum de participants est requis"]`: Le nombre maximum de participants est un champ obligatoire.
    * `min: [1, "Il doit y avoir au moins 1 participant"]`: Le nombre minimum de participants autorisé est 1.
* `participants`:
    * `type: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ]`: Un tableau d'identifiants ObjectId qui référencent le modèle `User`. Cela représente les utilisateurs inscrits à l'événement.
* `organizer`:
    * `type: mongoose.Schema.Types.ObjectId`: Un ObjectId qui référence le modèle `User`, indiquant l'utilisateur qui a créé et organise l'événement.
    * `ref: "User"`: Établit une référence au modèle `User`.
    * `required: [true, "L'organisateur est requis"]`: L'identifiant de l'organisateur est obligatoire.
* `timestamps: true`: Option qui ajoute automatiquement les champs `createdAt` (date de création) et `updatedAt` (date de dernière mise à jour) à chaque document d'événement.

**Middleware Mongoose :**

* `eventSchema.pre("findOneAndDelete", async function (next) { ... })`: Ce middleware s'exécute *avant* qu'un document `Event` ne soit supprimé en utilisant la méthode `findOneAndDelete`. Il a pour but de gérer les dépendances en supprimant toutes les inscriptions associées à cet événement :
    * Récupère l'événement qui est sur le point d'être supprimé.
    * Récupère l'ID de l'événement (`eventId`).
    * Importe dynamiquement le modèle `Registration` pour éviter les dépendances circulaires.
    * Utilise `Registration.find` pour récupérer toutes les inscriptions dont le champ `event` correspond à l'`eventId` de l'événement en cours de suppression.
    * Utilise `Promise.all` et `Registration.findByIdAndDelete` pour supprimer toutes les inscriptions trouvées. Cela assure qu'aucune inscription orpheline ne reste dans la base de données après la suppression d'un événement.
    * Appelle `next()` pour passer au middleware suivant (la suppression réelle de l'événement). En cas d'erreur, il appelle `next(error)` pour propager l'erreur.

**Création du Modèle `Event` :**

* `const Event = mongoose.model("Event", eventSchema);`: Crée un modèle Mongoose nommé `Event` basé sur le schéma `eventSchema`. Ce modèle est utilisé pour interagir avec la collection "events" dans la base de données.

**Exportation du Modèle :**

* `module.exports = Event;`: Exporte le modèle `Event` pour qu'il puisse être utilisé dans d'autres parties de l'application (par exemple, dans les contrôleurs pour gérer les événements).