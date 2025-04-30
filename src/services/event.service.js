const Event = require("../models/Event");
const validator = require("validator");

module.exports = {
  getEvents: async (page, limit, search) => {
    try {
      const skip = (page - 1) * limit;
      if (search && !validator.isLength(search, { min: 3, max: 30 })) {
        throw new Error(
          "La recherche est invalide (doit faire entre 3 et 30 caractères)"
        );
      }
      // Construction de la condition de recherche
      const searchQuery = search
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
              { location: { $regex: search, $options: "i" } },
              { sportType: { $regex: search, $options: "i" } },
            ],
          }
        : {};
      // Requête avec filtre + pagination
      const [events, total] = await Promise.all([
        Event.find(searchQuery)
          .skip(skip)
          .limit(limit)
          .populate("organizer", "name lastName mail")
          .populate("participants", "name lastName mail"),
        Event.countDocuments(searchQuery),
      ]);
      return {
        events,
        total,
        totalPages: Math.ceil(total / limit),
        page,
      };
    } catch (error) {
      console.error("Erreur event.services getEvents()\n" + error);
      throw new Error("Erreur lors de la récupération des events");
    }
  },

  getEvent: async (id) => {
    try {
      const event = await Event.findById(id)
        .populate("organizer", "name lastName mail")
        .populate("participants", "name lastName mail");

      return event || null;
    } catch (error) {
      console.error("Erreur event.services getEvent()\n" + error);
      throw new Error("Erreur lors de la récupération de l'event");
    }
  },

  getEventsByOrga: async (idOrga) => {
    try {
      const event = await Event.find({ organizer: idOrga })
        .populate("organizer", "name lastName mail")
        .populate("participants", "name lastName mail");
      return event || null;
    } catch (error) {
      console.error("Erreur event.service getEventsByOrga()\n" + error);
      throw new Error(
        "Erreur lors de la récupération des events de l'utilisateur"
      );
    }
  },

  create: async (data) => {
    try {
      const event = new Event(data);
      await event.save();
      return event;
    } catch (error) {
      console.error("Erreur event.services create()\n" + error);
      throw new Error("Erreur lors de la création de l'event");
    }
  },

  update: async (id, updateFields) => {
    try {
      const event = await Event.findByIdAndUpdate(id, updateFields, {
        new: true,
        runValidators: true,
      });
      return event ? event.toObject() : null;
    } catch (error) {
      console.error("Erreur event.services update()\n" + error);
      throw new Error("Erreur lors de la mise à jour de l'évenement");
    }
  },

  delete: async (id) => {
    try {
      const event = await Event.findByIdAndDelete(id);
      return event || null;
    } catch (error) {
      console.error("Erreur event.services");
      throw new Error("Erreur lors de la suppresion de l'event");
    }
  },
};
