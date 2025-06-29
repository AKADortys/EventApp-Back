const Event = require("../models/Event");
const validator = require("validator");
const { getPagination, getSearchQuery } = require("../utils/service.helper");

module.exports = {
  getEvents: async (page, limit, search) => {
    try {
      const {
        skip,
        page: parsedPage,
        limit: parsedLimit,
      } = getPagination(page, limit);

      const searchQuery = getSearchQuery(search, [
        "title",
        "location",
        "sportType",
      ]);

      searchQuery.date = { $gte: new Date() };

      // Requête avec filtre + pagination
      const [events, total] = await Promise.all([
        Event.find(searchQuery)
          .sort({ date: 1 })
          .skip(skip)
          .limit(parsedLimit)
          .populate("organizer", "name lastName mail")
          .populate("participants", "name lastName mail"),
        Event.countDocuments(searchQuery),
      ]);
      return {
        events,
        total,
        totalPages: Math.ceil(total / parsedLimit),
        page: parsedPage,
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
        .populate("participants", "name lastName gender");

      return event || null;
    } catch (error) {
      console.error("Erreur event.services getEvent()\n" + error);
      throw new Error("Erreur lors de la récupération de l'event");
    }
  },

  getEventsByOrga: async (idOrga, page, limit, search) => {
    try {
      const {
        skip,
        page: parsedPage,
        limit: parsedLimit,
      } = getPagination(page, limit);
      const searchQuery = getSearchQuery(search, [
        "title",
        "location",
        "sportType",
      ]);

      const [events, total] = await Promise.all([
        Event.find({ organizer: idOrga }, searchQuery)
          .sort({ date: 1 })
          .skip(skip)
          .limit(parsedLimit)
          .populate("organizer", "name lastName mail")
          .populate("participants", "name lastName mail"),
        Event.countDocuments({ organizer: idOrga }, searchQuery),
      ]);
      return {
        events,
        total,
        totalPages: Math.ceil(total / parsedLimit),
        page: parsedPage,
      };
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
      return event ? event : null;
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

  addParticipant: async (eventId, userId) => {
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        throw new Error("Événement introuvable");
      }

      // Vérifie la capacité max
      if (event.participants.length >= event.maxParticipants) {
        throw new Error("Événement complet!");
      }

      // Ajout du participant
      await Event.findByIdAndUpdate(eventId, {
        $addToSet: { participants: userId },
      });
      return true;
    } catch (error) {
      console.error("Erreur dans addParticipant\n" + error);
      throw error;
    }
  },

  removeParticipant: async (eventId, userId) => {
    try {
      await Event.findByIdAndUpdate(eventId, {
        $pull: { participants: userId },
      });
    } catch (error) {
      console.error("Erreur dans removeParticipant\n" + error);
      throw error;
    }
  },
};
