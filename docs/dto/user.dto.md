## Documentation du fichier de validation utilisateur (`user.validation.js` ou similaire)

Ce fichier utilise la librairie `Joi` pour définir des schémas de validation pour les données utilisateur. Ces schémas sont utilisés pour s'assurer que les données reçues lors de la création ou de la mise à jour d'un utilisateur respectent des règles spécifiques, garantissant ainsi l'intégrité des données.

**Imports :**

* `Joi`: Importe la librairie `Joi`, un puissant validateur de schémas pour JavaScript.

**Schéma de Validation `userSchema` (pour la création d'un utilisateur) :**

Ce schéma définit les règles de validation pour les champs requis lors de la création d'un nouvel utilisateur.

* `name` (Prénom) :
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.min(2)`: La chaîne doit avoir au moins 2 caractères.
    * `.max(50)`: La chaîne ne doit pas dépasser 50 caractères.
    * `.regex(/^[a-zA-ZÀ-ÿ\s-]+$/)`: La chaîne doit correspondre à l'expression régulière, autorisant les lettres (majuscules et minuscules, y compris les caractères accentués français), les espaces et les tirets.
    * `.required()`: Ce champ est obligatoire.
    * `.messages({...})`: Définit des messages d'erreur personnalisés pour chaque règle de validation.
        * `"string.base"`: Message si la valeur n'est pas une chaîne de caractères.
        * `"string.min"`: Message si la longueur est inférieure à 2.
        * `"string.max"`: Message si la longueur est supérieure à 50.
        * `"string.pattern.base"`: Message si la chaîne ne correspond pas au regex.
        * `"any.required"`: Message si le champ est manquant.
* `lastName` (Nom de famille) : Similaire à `name` avec des messages appropriés.
* `phone` (Numéro de téléphone) :
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.regex(/^(?:\+33|0)[67]\d{8}$/)`: La chaîne doit correspondre à l'expression régulière pour un numéro de téléphone mobile français (commençant par +336, +337, 06 ou 07 suivi de 8 chiffres).
    * `.required()`: Ce champ est obligatoire.
    * `.messages({...})`: Définit des messages d'erreur personnalisés.
        * `"string.pattern.base"`: Message si le format du numéro de téléphone est invalide.
        * `"any.required"`: Message si le champ est manquant.
* `mail` (Email) :
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.email()`: La chaîne doit être une adresse email valide.
    * `.required()`: Ce champ est obligatoire.
    * `.messages({...})`: Définit des messages d'erreur personnalisés.
        * `"string.email"`: Message si l'email n'est pas valide.
        * `"any.required"`: Message si le champ est manquant.
* `password` (Mot de passe) :
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.min(8)`: La chaîne doit avoir au moins 8 caractères.
    * `.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)`: La chaîne doit contenir au moins une lettre minuscule, une lettre majuscule et un chiffre.
    * `.required()`: Ce champ est obligatoire.
    * `.messages({...})`: Définit des messages d'erreur personnalisés.
        * `"string.min"`: Message si la longueur est inférieure à 8.
        * `"string.pattern.base"`: Message si le mot de passe ne respecte pas les critères de complexité.
        * `"any.required"`: Message si le champ est manquant.
* `role` (Rôle) :
    * `Joi.string()`: Définit le champ comme une chaîne de caractères.
    * `.valid("admin", "sportif", "organisateur")`: La valeur de ce champ doit être l'une des chaînes spécifiées.
    * `.messages({...})`: Définit un message d'erreur personnalisé.
        * `"any.only"`: Message si la valeur ne correspond à aucune des options valides.

**Schéma de Validation `updateUserSchema` (pour la mise à jour d'un utilisateur) :**

Ce schéma définit les règles de validation pour les champs qui peuvent être mis à jour lors de la modification d'un utilisateur. La plupart des règles sont similaires à `userSchema`, mais avec `.allow("")` ajouté pour permettre de ne pas fournir une valeur lors de la mise à jour (le champ devient optionnel).

* `name`, `lastName`, `phone`, `mail`, `password`, `role`: Les mêmes règles de validation que dans `userSchema`, mais avec `.allow("")` ajouté pour rendre ces champs optionnels lors de la mise à jour. Les messages d'erreur restent les mêmes.
* `.min(1)`: Appliqué à l'objet lui-même, cela signifie qu'au moins un champ doit être présent dans l'objet de mise à jour.
* `.messages({...})`: Définit un message d'erreur personnalisé pour la règle `.min(1)` sur l'objet.
    * `"object.min"`: Message si aucun champ n'est fourni pour la mise à jour.

**Exportation des Schémas :**

* `module.exports = { userSchema, updateUserSchema };`: Exporte les deux schémas de validation (`userSchema` pour la création et `updateUserSchema` pour la mise à jour) afin qu'ils puissent être utilisés dans les contrôleurs ou les middlewares pour valider les données utilisateur entrantes.

**En résumé, ce fichier fournit des outils robustes pour valider les données relatives aux utilisateurs, assurant ainsi la qualité et la conformité des informations stockées et manipulées par l'application.**