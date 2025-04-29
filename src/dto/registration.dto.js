const Joi = require("joi");
const mongoose = require("mongoose");

// Custom validator pour ObjectId
const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

// DTO pour la création
const createRegistrationSchema = Joi.object({
  event: Joi.string().custom(objectIdValidator).required().messages({
    "any.required": "L'événement est requis pour une inscription",
    "any.invalid": "L'ID de l'événement est invalide",
  }),

  user: Joi.string().custom(objectIdValidator).required().messages({
    "any.required": "L'utilisateur est requis pour une inscription",
    "any.invalid": "L'ID de l'utilisateur est invalide",
  }),

  status: Joi.string()
    .valid("en attente", "confirmée", "annulée")
    .default("en attente")
    .messages({
      "any.only": "Le statut doit être 'en attente', 'confirmée' ou 'annulée'",
    }),

  registrationDate: Joi.date().default(() => new Date(), "date par défaut"),

  paymentStatus: Joi.string()
    .valid("non payé", "payé")
    .default("non payé")
    .messages({
      "any.only": "Le statut de paiement doit être 'non payé' ou 'payé'",
    }),
});

// DTO pour la mise à jour (au moins un champ requis)
const updateRegistrationSchema = Joi.object({
  event: Joi.string().custom(objectIdValidator).messages({
    "any.invalid": "L'ID de l'événement est invalide",
  }),

  user: Joi.string().custom(objectIdValidator).messages({
    "any.invalid": "L'ID de l'utilisateur est invalide",
  }),

  status: Joi.string().valid("en attente", "confirmée", "annulée").messages({
    "any.only": "Le statut doit être 'en attente', 'confirmée' ou 'annulée'",
  }),

  registrationDate: Joi.date(),

  paymentStatus: Joi.string().valid("non payé", "payé").messages({
    "any.only": "Le statut de paiement doit être 'non payé' ou 'payé'",
  }),
})
  .min(1)
  .messages({
    "object.min": "Au moins un champ doit être fourni pour la mise à jour",
  });

module.exports = {
  createRegistrationSchema,
  updateRegistrationSchema,
};
