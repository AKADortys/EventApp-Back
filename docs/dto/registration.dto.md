## Documentation du fichier de validation des inscriptions (`registration.validation.js` ou similaire)

Ce fichier utilise la librairie `Joi` pour définir des schémas de validation pour les données relatives aux inscriptions. Il inclut des schémas pour la création et la mise à jour des inscriptions, assurant la validité des données avant qu'elles n'atteignent la base de données.

**Imports :**

* `Joi`: Importe la librairie `Joi`, utilisée pour la validation de schémas.
* `mongoose`: Importe la librairie `mongoose`, nécessaire ici pour valider le format des ObjectIds.

**Validateur Custom pour ObjectId :**

* `objectIdValidator`: Une fonction de validation personnalisée pour Joi. Elle prend une `value` (la chaîne à valider) et un objet `helpers` fourni par Joi.
    * `mongoose.Types.ObjectId.isValid(value)`: Vérifie si la `value` est un ObjectId Mongoose valide.
    * Si la validation échoue, `helpers.error("any.invalid")` est appelé pour retourner une erreur Joi avec le type `any.invalid`.
    * Si la validation réussit, la `value` est retournée.

**Schéma de Validation `createRegistrationSchema` (pour la création d'une inscription) :**

Ce schéma définit les règles de validation pour les champs requis lors de la création d'une nouvelle inscription.

* `event`:
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.custom(objectIdValidator)`: Applique le validateur personnalisé `objectIdValidator` pour s'assurer que la chaîne est un ObjectId Mongoose valide.
    * `.required()`: Ce champ est obligatoire.
    * `.messages({...})`: Définit des messages d'erreur personnalisés.
        * `"any.required"`: Message si le champ est manquant.
        * `"any.invalid"`: Message si l'ID de l'événement n'est pas un ObjectId valide.
* `user`:
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.custom(objectIdValidator)`: Applique le validateur personnalisé `objectIdValidator`.
    * `.required()`: Ce champ est obligatoire.
    * `.messages({...})`: Définit des messages d'erreur personnalisés.
        * `"any.required"`: Message si le champ est manquant.
        * `"any.invalid"`: Message si l'ID de l'utilisateur n'est pas un ObjectId valide.
* `status`:
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.valid("en attente", "confirmée", "annulée")`: La valeur doit être l'une des chaînes spécifiées.
    * `.default("en attente")`: Définit la valeur par défaut à "en attente" si aucune valeur n'est fournie lors de la création.
    * `.messages({...})`: Définit un message d'erreur personnalisé.
        * `"any.only"`: Message si la valeur ne correspond à aucune des options valides.
* `paymentStatus`:
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.valid("non payé", "payé")`: La valeur doit être l'une des chaînes spécifiées.
    * `.default("non payé")`: Définit la valeur par défaut à "non payé".
    * `.messages({...})`: Définit un message d'erreur personnalisé.
        * `"any.only"`: Message si la valeur ne correspond à aucune des options valides.

**Schéma de Validation `updateRegistrationSchema` (pour la mise à jour d'une inscription) :**

Ce schéma définit les règles de validation pour les champs qui peuvent être mis à jour lors de la modification d'une inscription. Les règles pour les champs individuels sont similaires à `createRegistrationSchema` (avec le validateur `objectIdValidator` pour `event` et `user`, et la validation `valid` pour `status` et `paymentStatus`), mais les champs ne sont pas obligatoires par défaut.

* `event`:
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.custom(objectIdValidator)`: Applique le validateur personnalisé.
    * `.messages({...})`: Définit un message d'erreur personnalisé pour un ID invalide.
* `user`:
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.custom(objectIdValidator)`: Applique le validateur personnalisé.
    * `.messages({...})`: Définit un message d'erreur personnalisé pour un ID invalide.
* `status`:
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.valid("en attente", "confirmée", "annulée")`: La valeur doit être l'une des chaînes spécifiées.
    * `.messages({...})`: Définit un message d'erreur personnalisé.
* `paymentStatus`:
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.valid("non payé", "payé")`: La valeur doit être l'une des chaînes spécifiées.
    * `.messages({...})`: Définit un message d'erreur personnalisé.
* `.min(1)`: Appliqué à l'objet lui-même, cela signifie qu'au moins un champ doit être présent dans l'objet de mise à jour.
* `.messages({...})`: Définit un message d'erreur personnalisé pour la règle `.min(1)` sur l'objet.
    * `"object.min"`: Message si aucun champ n'est fourni pour la mise à jour.

**Exportation des Schémas :**

* `module.exports = { createRegistrationSchema, updateRegistrationSchema };`: Exporte les deux schémas de validation pour qu'ils puissent être utilisés dans les contrôleurs ou les middlewares pour valider les données d'inscription entrantes.

**En résumé, ce fichier assure que les données d'inscription sont valides et bien formatées, en particulier en vérifiant que les identifiants d'événement et d'utilisateur sont des ObjectIds Mongoose valides et que les statuts respectent les valeurs autorisées.**