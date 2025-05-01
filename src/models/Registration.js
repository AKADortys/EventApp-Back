const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "L'événement est requis pour une inscription"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "L'utilisateur est requis pour une inscription"],
    },
    status: {
      type: String,
      enum: ["en attente", "confirmée", "annulée"],
      default: "en attente",
    },
    paymentStatus: {
      type: String,
      enum: ["non payé", "payé"],
      default: "non payé",
    },
  },
  { timestamps: true }
);

registrationSchema.index({ event: 1, user: 1 }, { unique: true });

registrationSchema.pre("findOneAndDelete", async function (next) {
  try {
    const registration = await this.model.findOne(this.getFilter());
    if (!registration) return next();
    const eventId = registration.event;
    const userId = registration.user;
    const Event = require("./Event");

    await Event.findByIdAndUpdate(eventId, { $pull: { participants: userId } });
    next();
  } catch (error) {
    console.error(
      "Erreur dans pre('findOneAndDelete') de Registration :",
      error
    );
    next(error);
  }
});

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
