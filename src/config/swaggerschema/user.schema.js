const outputUser = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      description: "ID de l'utilisateur",
    },
    name: {
      type: "string",
      description: "Prénom de l'utilisateur",
    },
    lastName: {
      type: "string",
      description: "Nom de famille de l'utilisateur",
    },
    phone: {
      type: "string",
      description: "Numéro de téléphone format FR ex. 06******** 07********",
    },
    mail: {
      type: "string",
      description: "Email de l'utilisateur",
    },
    role: {
      type: "string",
      description: "Rôle de l'utilisateur",
      enum: ["admin", "sportif", "organisateur"],
    },
  },
};
const inputUser = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Prénom de l'utilisateur",
    },
    lastName: {
      type: "string",
      description: "Nom de famille de l'utilisateur",
    },
    password: {
      type: "string",
      description: "Min 1 majuscule 1 chiffre et 8 charac.",
    },
    phone: {
      type: "string",
      description: "Numéro de téléphone format FR ex. 06******** 07********",
    },
    mail: {
      type: "string",
      description: "Email de l'utilisateur",
    },
    role: {
      type: "string",
      description: "Rôle de l'utilisateur",
      enum: ["admin", "sportif", "organisateur"],
    },
  },
};

module.exports = { inputUser, outputUser };
