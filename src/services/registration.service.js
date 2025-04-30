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
              { status: { $regex: search, $options: "i" } },
              { paymentStatus: { $regex: search, $options: "i" } },
            ],
          }
        : {};
      // Requête avec filtre + pagination
      const [registrations, total] = await Promise.all([
        Registration.find(searchQuery)
          .skip(skip)
          .limit(limit)
          .populate("event", "title date location sportType")
          .populate("user", "name lastName mail"),
        Registration.countDocuments(searchQuery),
      ]);
      return {
        registrations,
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
        .populate("event", "title date location sportType")
        .populate("user", "name lastName mail");

      return registration || null;
    } catch (error) {
      console.error("Erreur registration.services getRegistration()\n" + error);
      throw new Error("Erreur lors de la récupération de l'event");
    }
  },

  create: async (data) => {
    try {
      const registration = new Registration(data);
      await registration.save();
      return registration;
    } catch (error) {
      console.error("Erreur registration.service create()\n" + error);
      throw new Error("Erreur lors de la création de l'inscription");
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
};
