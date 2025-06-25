const Joi = require("joi");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const createEventSchema = Joi.object({
  title: Joi.string().trim().min(5).max(100).required().messages({
    "string.base": "Le titre doit être une chaîne de caractères",
    "string.empty": "Le titre de l'événement est requis",
    "string.min": "Le titre doit contenir au moins 5 caractères",
    "string.max": "Le titre ne doit pas dépasser 100 caractères",
    "any.required": "Le titre de l'événement est requis",
  }),

  description: Joi.string().trim().min(10).required().messages({
    "string.base": "La description doit être une chaîne de caractères",
    "string.empty": "La description de l'événement est requise",
    "string.min": "La description doit contenir au moins 10 caractères",
    "any.required": "La description de l'événement est requise",
  }),

  date: Joi.date().greater("now").required().messages({
    "date.base": "La date doit être valide",
    "date.greater": "La date de l'événement doit être dans le futur",
    "any.required": "La date de l'événement est requise",
  }),

  location: Joi.string().trim().required().messages({
    "string.base": "Le lieu doit être une chaîne de caractères",
    "string.empty": "Le lieu de l'événement est requis",
    "any.required": "Le lieu de l'événement est requis",
  }),

  imageUrl: Joi.string().uri().allow("").messages({
    "string.uri": "L'URL de l'image n'est pas valide",
  }),

  sportType: Joi.string()
    .valid(
      "football",
      "basketball",
      "tennis",
      "natation",
      "cyclisme",
      "course",
      "rugby",
      "autre"
    )
    .required()
    .messages({
      "any.only": "Le type de sport doit être une des valeurs autorisées",
      "any.required": "Le type de sport est requis",
    }),

  maxParticipants: Joi.number().integer().min(1).required().messages({
    "number.base": "Le nombre maximum de participants doit être un nombre",
    "number.min": "Il doit y avoir au moins 1 participant",
    "any.required": "Le nombre maximum de participants est requis",
  }),

  organizer: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Validation de l'ObjectId")
    .required()
    .messages({
      "any.required": "L'organisateur est requis",
      "any.invalid": "L'identifiant est invalide",
    }),

  participants: Joi.array()
    .items(
      Joi.string()
        .custom((value, helpers) => {
          if (!ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
          }
          return value;
        }, "Validation de l'ObjectId")
        .messages({
          "any.invalid": "L'identifiant est invalide",
        })
    )
    .optional(),
});

const updateEventSchema = Joi.object({
  title: Joi.string().trim().min(5).max(100),
  description: Joi.string().trim().min(10),
  date: Joi.date(),
  location: Joi.string().trim(),
  sportType: Joi.string().valid(
    "football",
    "basketball",
    "tennis",
    "natation",
    "cyclisme",
    "course",
    "rugby",
    "autre"
  ),
  imageUrl: Joi.string().uri().allow("").messages({
    "string.uri": "L'URL de l'image n'est pas valide",
  }),
  maxParticipants: Joi.number().integer().min(1),
  organizer: Joi.string().custom((value, helpers) => {
    if (!ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "Validation de l'ObjectId"),
  participants: Joi.array().items(
    Joi.string().custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Validation de l'ObjectId")
  ),
})
  .min(1)
  .messages({
    "object.min":
      "Au moins un champ doit être renseigné pour mettre à jour l'événement",
  });

module.exports = {
  createEventSchema,
  updateEventSchema,
};
