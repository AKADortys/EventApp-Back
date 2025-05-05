const Registration = require("../models/Registration");
const eventService = require("./event.service");
const { getPagination, getSearchQuery } = require("../utils/service.helper");

module.exports = {
  getRegistrations: async (page, limit, search) => {
    try {
      const {
        skip,
        limit: parsedLimit,
        page: parsedPage,
      } = getPagination(page, limit);
      const searchQuery = getSearchQuery(search, ["status", "paymentStatus"]);
      // Requête avec filtre + pagination
      const [registrations, total] = await Promise.all([
        Registration.find(searchQuery)
          .skip(skip)
          .limit(parsedLimit)
          .populate("event", "title date location sportType")
          .populate("user", "name lastName mail"),
        Registration.countDocuments(searchQuery),
      ]);
      return {
        registrations,
        total,
        totalPages: Math.ceil(total / parsedLimit),
        parsedPage,
      };
    } catch (error) {
      console.error(
        "Erreur registration.services getRegistrations()\n" + error
      );
      throw new Error("Erreur lors de la récupération des inscriptions");
    }
  },

  getRegistration: async (id) => {
    try {
      const registration = await Registration.findById(id)
        .populate("event", "title date location sportType")
        .populate("user", "name lastName mail");

      return registration || null;
    } catch (error) {
      console.error("Erreur registration.services getRegistration()\n" + error);
      throw new Error("Erreur lors de la récupération de l'event");
    }
  },

  getRegistrationByUser: async (userId, page, limit, search) => {
    try {
      const {
        skip,
        limit: parsedLimit,
        page: parsedPage,
      } = getPagination(page, limit);
      const searchQuery = getSearchQuery(search, ["status", "paymentStatus"]);
      const filter = { user: userId, ...searchQuery };

      const [registrations, total] = await Promise.all([
        Registration.find(filter)
          .skip(skip)
          .limit(parsedLimit)
          .populate("event", "title date location sportType")
          .populate("user", "name lastName mail"),
        Registration.countDocuments(filter),
      ]);

      return {
        registrations,
        total,
        totalPages: Math.ceil(total / parsedLimit),
        page: parsedPage,
      };
    } catch (error) {
      console.error(
        "Erreur registration.service getRegistrationByUser()\n" + error
      );
      throw new Error(
        "Erreur lors de la récupération des inscriptions de l'utilisateur"
      );
    }
  },

  getRegistrationByEvent: async (eventId, page, limit, search) => {
    try {
      const {
        skip,
        limit: parsedLimit,
        page: parsedPage,
      } = getPagination(page, limit);
      const searchQuery = getSearchQuery(search, ["status", "paymentStatus"]);
      const filter = { event: eventId, ...searchQuery };

      const [registrations, total] = await Promise.all([
        Registration.find(filter)
          .skip(skip)
          .limit(parsedLimit)
          .populate("event", "title date location sportType")
          .populate("user", "name lastName mail"),
        Registration.countDocuments(filter),
      ]);

      return {
        registrations,
        total,
        totalPages: Math.ceil(total / parsedLimit),
        page: parsedPage,
      };
    } catch (error) {
      console.error(
        "Erreur registration.service getRegistrationByEvent()\n" + error
      );
      throw new Error(
        "Erreur lors de la récupération des inscriptions de l'événement"
      );
    }
  },

  create: async (data) => {
    try {
      const registration = new Registration(data);
      const exist = await eventService.addParticipant(data.event, data.user);
      if (!exist) throw new Error("Vous êtes déjà inscrit à cet événement.");
      await registration.save();
      return registration;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Vous êtes déjà inscrit à cet événement.");
      }
      throw new Error(error.message);
    }
  },

  update: async (id, data) => {
    try {
      const registration = await Registration.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      return registration ? registration.toObject() : null;
    } catch (error) {
      console.error("Erreur registration.service update()\n" + error);
      throw new Error("Erreur lors de la mise à jour de l'inscription");
    }
  },

  delete: async (id) => {
    try {
      const registration = await Registration.findByIdAndDelete(id);
      return registration || null;
    } catch (error) {
      console.log("Erreur registration.service delete()\n" + error);
      throw new Error("Erreur lors de la suppresion de l'inscription");
    }
  },

  checkExist: async (userId, eventId) => {
    try {
      const registration = await Registration.findOne({
        event: eventId,
        user: userId,
      });
      if (registration) throw new Error("Vous êtes déjà inscrit !");
      return true;
    } catch (error) {
      console.error("Erreur registration.service checkExist()\n" + error);
      throw new Error(
        "Erreur lors de la vérification de l'existance de l'inscription "
      );
    }
  },
};
