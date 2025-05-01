## Documentation du fichier de validation des événements (`event.validation.js` ou similaire)

Ce fichier utilise la librairie `Joi` pour définir des schémas de validation pour les données relatives aux événements. Il inclut des schémas pour la création et la mise à jour des événements, assurant la validité des données avant qu'elles ne soient utilisées par l'application.

**Imports :**

* `Joi`: Importe la librairie `Joi` pour la validation de schémas.
* `mongoose`: Importe la librairie `mongoose` pour accéder à `mongoose.Types.ObjectId` afin de valider le format des IDs MongoDB.
* `ObjectId`: Alias de `mongoose.Types.ObjectId` pour une utilisation plus concise.

**Schéma de Validation `createEventSchema` (pour la création d'un événement) :**

Ce schéma définit les règles de validation pour les champs requis lors de la création d'un nouvel événement.

* `title` (Titre) :
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.trim()`: Supprime les espaces blancs au début et à la fin de la chaîne.
    * `.min(5)`: La chaîne doit avoir au moins 5 caractères.
    * `.max(100)`: La chaîne ne doit pas dépasser 100 caractères.
    * `.required()`: Ce champ est obligatoire.
    * `.messages({...})`: Définit des messages d'erreur personnalisés pour chaque règle.
        * `"string.base"`: Message si la valeur n'est pas une chaîne.
        * `"string.empty"`: Message si le champ est vide et requis.
        * `"string.min"`: Message si la longueur est inférieure à 5.
        * `"string.max"`: Message si la longueur est supérieure à 100.
        * `"any.required"`: Message si le champ est manquant.
* `description` (Description) : Similaire à `title` avec des limites et messages appropriés.
* `date` (Date) :
    * `Joi.date()`: Définit le champ comme une date.
    * `.greater("now")`: La date doit être postérieure à la date et l'heure actuelles.
    * `.required()`: Ce champ est obligatoire.
    * `.messages({...})`: Définit des messages d'erreur personnalisés.
        * `"date.base"`: Message si la valeur n'est pas une date valide.
        * `"date.greater"`: Message si la date n'est pas dans le futur.
        * `"any.required"`: Message si le champ est manquant.
* `location` (Lieu) : Similaire à `title` (trim et required).
* `sportType` (Type de sport) :
    * `Joi.string()`: Définit le champ comme une chaîne.
    * `.valid(...)`: La valeur doit être l'une des chaînes spécifiées dans le tableau (football, basketball, etc.).
    * `.required()`: Ce champ est obligatoire.
    * `.messages({...})`: Définit des messages d'erreur personnalisés.
        * `"any.only"`: Message si la valeur n'est pas dans la liste autorisée.
        * `"any.required"`: Message si le champ est manquant.
* `maxParticipants` (Nombre maximum de participants) :
    * `Joi.number()`: Définit le champ comme un nombre.
    * `.integer()`: Le nombre doit être un entier.
    * `.min(1)`: Le nombre doit être au moins 1.
    * `.required()`: Ce champ est obligatoire.
    * `.messages({...})`: Définit des messages d'erreur personnalisés.
        * `"number.base"`: Message si la valeur n'est pas un nombre.
        * `"number.min"`: Message si le nombre est inférieur à 1.
        * `"any.required"`: Message si le champ est manquant.
* `organizer` (Organisateur) :
    * `Joi.string()`: Définit le champ comme une chaîne.
    * `.custom(...)`: Utilise une fonction de validation personnalisée.
        * La fonction vérifie si la `value` est un `ObjectId` Mongoose valide en utilisant `ObjectId.isValid(value)`.
        * Si ce n'est pas un ObjectId valide, elle retourne une erreur Joi (`helpers.error("any.invalid")`).
        * Sinon, elle retourne la `value`.
        * Le deuxième argument de `.custom()` est un nom pour cette validation.
    * `.required()`: Ce champ est obligatoire.
    * `.messages({...})`: Définit des messages d'erreur personnalisés.
        * `"any.required"`: Message si le champ est manquant.
        * `"any.invalid"`: Message si l'identifiant n'est pas un ObjectId valide.
* `participants` (Participants) :
    * `Joi.array()`: Définit le champ comme un tableau.
    * `.items(...)`: Définit le type des éléments du tableau. Chaque élément doit être une chaîne qui est un ObjectId Mongoose valide (validation personnalisée similaire à `organizer`).
    * `.optional()`: Ce champ est facultatif.
    * `.messages({...})`: Définit un message d'erreur personnalisé pour un ID invalide dans le tableau.

**Schéma de Validation `updateEventSchema` (pour la mise à jour d'un événement) :**

Ce schéma définit les règles de validation pour les champs qui peuvent être mis à jour lors de la modification d'un événement. La plupart des règles sont similaires à `createEventSchema`, mais les champs ne sont pas obligatoires par défaut.

* `title`, `description`, `date`, `location`, `sportType`, `maxParticipants`, `organizer`, `participants`: Les mêmes règles de validation que dans `createEventSchema`, mais sans `.required()`.
* `.min(1)`: Appliqué à l'objet lui-même, cela signifie qu'au moins un champ doit être présent dans l'objet de mise à jour.
* `.messages({...})`: Définit un message d'erreur personnalisé pour la règle `.min(1)` sur l'objet.
    * `"object.min"`: Message si aucun champ n'est renseigné pour la mise à jour.

**Exportation des Schémas :**

* `module.exports = { createEventSchema, updateEventSchema };`: Exporte les deux schémas de validation pour qu'ils puissent être utilisés dans les contrôleurs ou les middlewares pour valider les données d'événement entrantes.

**En résumé, ce fichier assure que les données d'événement sont valides et bien formatées, en particulier en vérifiant les types, les formats, les limites et les références aux ObjectIds Mongoose pour l'organisateur et les participants.**