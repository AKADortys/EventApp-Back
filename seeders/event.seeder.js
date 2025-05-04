const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const Event = require("../src/models/Event");
const User = require("../src/models/User");
const sportTypes = [
  "football",
  "basketball",
  "tennis",
  "natation",
  "cyclisme",
  "course",
  "rugby",
  "autre",
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find();

    if (users.length === 0) {
      throw new Error(
        "Aucun utilisateur trouvé. Veuillez d'abord exécuter le seed des utilisateurs."
      );
    }

    // await Event.deleteMany(); // Réinitialise la collection

    const events = [];

    for (let i = 0; i < 10; i++) {
      const organizer = faker.helpers.arrayElement(users);
      const maxParticipants = faker.number.int({ min: 5, max: 50 });

      // Exclure l'organisateur de la liste des participants potentiels
      const otherUsers = users.filter(
        (u) => u._id.toString() !== organizer._id.toString()
      );

      const shuffled = faker.helpers.shuffle(otherUsers);
      const selectedParticipants = shuffled.slice(
        0,
        faker.number.int({ min: 0, max: maxParticipants })
      );

      events.push({
        title: faker.lorem.words(4),
        description: faker.lorem.paragraph(),
        date: faker.date.future(),
        location: faker.location.city(),
        sportType: faker.helpers.arrayElement(sportTypes),
        maxParticipants,
        participants: selectedParticipants.map((p) => p._id),
        organizer: organizer._id,
      });
    }

    await Event.insertMany(events);
    console.log("Événements créés avec succès !");
    process.exit();
  } catch (err) {
    console.error("Erreur lors du seed des événements :", err);
    process.exit(1);
  }
};

seedEvents();
