module.exports = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      description: "ID de l'inscription",
    },
    event: {
      type: "string",
      description: "ID de l'événement",
    },
    user: {
      type: "string",
      description: "ID de l'utilisateur",
    },
    status: {
      type: "string",
      description: "Statut de l'inscription",
      enum: ["en attente", "confirmée", "annulée"],
    },
    paymentStatus: {
      type: "string",
      description: "Statut de paiement",
      enum: ["non payé", "payé"],
    },
    registeredAt: {
      type: "string",
      format: "date-time",
      description: "Date d'inscription",
    },
  },
};
