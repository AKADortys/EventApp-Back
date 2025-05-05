module.exports = {
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
      description: "Numéro de téléphone de l'utilisateur",
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
