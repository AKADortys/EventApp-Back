const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre de l'événement est requis"],
      minlength: [5, "Le titre doit contenir au moins 5 caractères"],
      maxlength: [100, "Le titre ne doit pas dépasser 100 caractères"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La description de l'événement est requise"],
      minlength: [10, "La description doit contenir au moins 10 caractères"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "La date de l'événement est requise"],
      validate: {
        validator: (value) => value > new Date(),
        message: "La date de l'événement doit être dans le futur",
      },
    },
    location: {
      type: String,
      required: [true, "Le lieu de l'événement est requis"],
      trim: true,
    },
    sportType: {
      type: String,
      required: [true, "Le type de sport est requis"],
      enum: [
        "football",
        "basketball",
        "tennis",
        "natation",
        "cyclisme",
        "course",
        "rugby",
        "autre",
      ],
      default: "autre",
    },
    maxParticipants: {
      type: Number,
      required: [true, "Le nombre maximum de participants est requis"],
      min: [1, "Il doit y avoir au moins 1 participant"],
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "L'organisateur est requis"],
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
