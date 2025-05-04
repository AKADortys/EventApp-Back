const mongoose = require("mongoose");
require("dotenv").config();

const Event = require("../src/models/Event");
const Registration = require("../src/models/Registration");
const User = require("../src/models/User");

const seedRegistrations = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Registration.deleteMany();

    const events = await Event.find().populate("participants");

    const registrations = [];

    for (const event of events) {
      for (const user of event.participants) {
        registrations.push({
          event: event._id,
          user: user._id,
          status: Math.random() > 0.5 ? "confirmée" : "en attente",
          paymentStatus: Math.random() > 0.7 ? "payé" : "non payé",
        });
      }
    }

    if (registrations.length > 0) {
      await Registration.insertMany(registrations);
      console.log(`${registrations.length} inscriptions créées avec succès.`);
    } else {
      console.log("Aucune inscription à créer.");
    }

    process.exit();
  } catch (err) {
    console.error("Erreur lors du seed des inscriptions :", err);
    process.exit(1);
  }
};

seedRegistrations();
