const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/)
    .required()
    .messages({
      "string.base": "Le prénom doit être une chaîne de caractères.",
      "string.min": "Le prénom doit contenir au moins 2 caractères.",
      "string.max": "Le prénom doit contenir au maximum 50 caractères.",
      "string.pattern.base":
        "Le prénom ne doit contenir que des lettres, espaces et tirets.",
      "any.required": "Le prénom est requis.",
    }),
  lastName: Joi.string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/)
    .required()
    .messages({
      "string.base": "Le nom de famille doit être une chaîne de caractères.",
      "string.min": "Le nom de famille doit contenir au moins 2 caractères.",
      "string.max": "Le nom de famille doit contenir au maximum 50 caractères.",
      "string.pattern.base":
        "Le nom de famille ne doit contenir que des lettres, espaces et tirets.",
      "any.required": "Le nom de famille est requis.",
    }),
  gender: Joi.string().valid("homme", "femme", "autres").messages({
    "any.only": "Le genre doit être 'homme', 'femme', 'autres'. ",
  }),
  birthday: Joi.date()
    .less("now")
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
    .required()
    .messages({
      "date.base": "La date de naissance doit être une date valide",
      "date.less": "La date de naissance doit être antérieure à aujourd'hui",
      "date.max": "Vous devez avoir au moins 18 ans",
      "any.required": "La date de naissance est requise",
    }),
  phone: Joi.string()
    .regex(/^(?:\+33|0)[67]\d{8}$/)
    .required()
    .messages({
      "string.pattern.base": "Numéro de téléphone invalide.",
      "any.required": "Le numéro de téléphone est requis.",
    }),
  mail: Joi.string().email().required().messages({
    "string.email": "L'email fourni est invalide.",
    "any.required": "L'email est requis.",
  }),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .required()
    .messages({
      "string.min": "Le mot de passe doit contenir au moins 8 caractères.",
      "string.pattern.base":
        "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule et un chiffre.",
      "any.required": "Le mot de passe est requis.",
    }),
  role: Joi.string().valid("admin", "sportif", "organisateur").messages({
    "any.only": "Le rôle doit être 'admin', 'sportif' ou 'organisateur'.",
  }),
});
const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/)
    .allow("")
    .messages({
      "string.base": "Le prénom doit être une chaîne de caractères.",
      "string.min": "Le prénom doit contenir au moins 2 caractères.",
      "string.max": "Le prénom doit contenir au maximum 50 caractères.",
      "string.pattern.base":
        "Le prénom ne doit contenir que des lettres, espaces et tirets.",
    }),
  lastName: Joi.string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/)
    .allow("")
    .messages({
      "string.base": "Le nom de famille doit être une chaîne de caractères.",
      "string.min": "Le nom de famille doit contenir au moins 2 caractères.",
      "string.max": "Le nom de famille doit contenir au maximum 50 caractères.",
      "string.pattern.base":
        "Le nom de famille ne doit contenir que des lettres, espaces et tirets.",
    }),
  gender: Joi.string().valid("homme", "femme", "autres").messages({
    "any.only": "Le genre doit être 'homme', 'femme', 'autres'. ",
  }),
  birthday: Joi.date()
    .less("now")
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
    .messages({
      "date.base": "La date de naissance doit être une date valide",
      "date.less": "La date de naissance doit être antérieure à aujourd'hui",
      "date.max": "Vous devez avoir au moins 18 ans",
      "any.required": "La date de naissance est requise",
    }),
  phone: Joi.string()
    .regex(/^(?:\+33|0)[67]\d{8}$/)
    .allow("")
    .messages({
      "string.pattern.base": "Numéro de téléphone invalide.",
    }),
  mail: Joi.string().email().allow("").messages({
    "string.email": "L'email fourni est invalide.",
  }),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .allow("")
    .messages({
      "string.min": "Le mot de passe doit contenir au moins 8 caractères.",
      "string.pattern.base":
        "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule et un chiffre.",
    }),
  role: Joi.string().valid("admin", "sportif", "organisateur").messages({
    "any.only": "Le rôle doit être 'admin', 'sportif' ou 'organisateur'.",
  }),
})
  .min(1)
  .messages({
    "object.min": "Vous devez fournir au moins un champ à mettre à jour.",
  });
module.exports = {
  userSchema,
  updateUserSchema,
};
