const Registration = require("../models/Registration");
const validator = require("validator");

module.exports = {
  getRegistrations: async (page, limit, search) => {
    try {
      const skip = (page - 1) * limit;
      if (search && !validator.isLength(search, { min: 3, max: 30 })) {
        throw new Error(
          "La recherche est invalide (doit faire entre 3 et 30 caractères)"
        );
      }
      const searchQuery = search
        ? {
            $or: [
              { event: { $regex: searchQuery, $options: "i" } },
              { user: { $regex: searchQuery, $options: "i" } },
            ],
          }
        : {};
      // Requête avec filtre + pagination
      const [registration, total] = await Promise.all([
        Registration.find(searchQuery)
          .skip(skip)
          .limit(limit)
          .populate("organizer", "name lastName mail")
          .populate("participants", "name lastName mail"),
        Registration.countDocuments(searchQuery),
      ]);
      return {
        registration,
        total,
        totalPages: Math.ceil(total / limit),
        page,
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
        .populate("organizer", "name lastName mail")
        .populate("participants", "name lastName mail");

      return registration || null;
    } catch (error) {
      console.error("Erreur registration.services getRegistration()\n" + error);
      throw new Error("Erreur lors de la récupération de l'event");
    }
  },
};
