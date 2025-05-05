module.exports = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      description: "ID de l'événement",
    },
    title: {
      type: "string",
      description: "Titre de l'événement",
    },
    description: {
      type: "string",
      description: "Description de l'événement",
    },
    date: {
      type: "string",
      format: "date-time",
      description: "Date de l'événement",
    },
    location: {
      type: "string",
      description: "Lieu de l'événement",
    },
    sportType: {
      type: "string",
      description: "Type de sport",
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
    },
    maxParticipants: {
      type: "integer",
      description: "Nombre maximum de participants",
    },
    organizer: {
      type: "string",
      description: "ID de l'organisateur",
    },
    participants: {
      type: "array",
      items: {
        type: "string",
      },
      description: "Liste des IDs des participants",
    },
  },
};
