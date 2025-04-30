const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le prénom est requis"],
      minlength: [2, "Le prénom doit avoir au moins 2 caractères"],
      maxlength: [50, "Le prénom ne doit pas dépasser 50 caractères"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Le nom de famille est requis"],
      minlength: [2, "Le nom de famille doit avoir au moins 2 caractères"],
      maxlength: [50, "Le nom de famille ne doit pas dépasser 50 caractères"],
      trim: true,
    },
    mail: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "L'email fourni est invalide",
      },
    },
    phone: {
      type: String,
      required: [true, "Le numéro de téléphone est requis"],
      validate: {
        validator: (value) => validator.isMobilePhone(value, "fr-FR"),
        message: "Numéro de téléphone invalide",
      },
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
      minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
          }),
        message:
          "Le mot de passe doit contenir au moins une lettre et un chiffre",
      },
    },
    role: {
      type: String,
      enum: ["admin", "sportif", "organisateur"],
      default: "sportif",
    },
  },
  { timestamps: true }
);

userSchema.pre("findOneAndDelete", async function (next) {
  try {
    const user = await this.model.findOne(this.getFilter());
    if (!user) return next();

    const userId = user._id;
    const Event = require("./Event");
    const Registration = require("./Registration");

    // Supprimer les événements organisés par cet utilisateur
    const events = await Event.find({ organisateur: userId });
    await Promise.all(
      events.map((event) => Event.findByIdAndDelete(event._id))
    );

    // Récupérer toutes les inscriptions de cet utilisateur
    const registrations = await Registration.find({ user: userId });

    // Pour chaque inscription, retirer l'utilisateur du champ participants de l'event
    await Promise.all(
      registrations.map(async (registration) => {
        await Event.findByIdAndUpdate(registration.event, {
          $pull: { participants: userId },
        });
      })
    );

    next();
  } catch (err) {
    console.error("Erreur dans pre('findOneAndDelete') de User :", err);
    next(err);
  }
});

// Hashage du mot de passe avant enregistrement
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);
      this.setUpdate(update);
    } catch (error) {
      console.error("Erreur lors du hachage du mot de passe:", error);
      return next(error);
    }
  }
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
