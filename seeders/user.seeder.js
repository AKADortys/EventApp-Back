const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const User = require("../src/models/User");

// Fonction pour générer un mot de passe fort valide
const generateValidPassword = async () => {
  const rawPassword = "Password123";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);
  return { rawPassword, hashedPassword };
};

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // await User.deleteMany(); // Optionnel, vide la collection

    const roles = ["admin", "sportif", "organisateur"];
    const users = [];

    //augmenter le nombres d'itération pour augmenter le nombres d'utilisateurs créer
    for (let i = 0; i < 50; i++) {
      const { rawPassword, hashedPassword } = await generateValidPassword();
      const prefix = faker.helpers.arrayElement(["06", "07"]);
      const suffix = faker.string.numeric(8);
      const phone = `${prefix}${suffix}`;
      users.push({
        name: faker.person.firstName("male"),
        lastName: faker.person.lastName(),
        mail: faker.internet.email().toLowerCase(),
        phone,
        password: hashedPassword,
        role: faker.helpers.arrayElement(roles),
      });

      console.log(`Utilisateur ${i + 1} généré`);
    }

    await User.insertMany(users);
    console.log("Utilisateurs insérés avec succès !");
    process.exit();
  } catch (err) {
    console.error("Erreur de seed :", err);
    process.exit(1);
  }
};

seedUsers();
