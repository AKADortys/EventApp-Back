const User = require("../models/User");
const { getPagination, getSearchQuery } = require("../utils/service.helper");
module.exports = {
  // Récupérer tous les utilisateurs
  getUsers: async (page, limit, searchTerm = "") => {
    try {
      const {
        skip,
        page: parsedPage,
        limit: parsedLimit,
      } = getPagination(page, limit);
      const searchQuery = getSearchQuery(searchTerm, [
        "name",
        "lastName",
        "mail",
        "phone",
      ]);

      // Requête avec filtre + pagination
      const [users, total] = await Promise.all([
        User.find(searchQuery).skip(skip).limit(parsedLimit),
        User.countDocuments(searchQuery),
      ]);

      return {
        users,
        total,
        totalPages: Math.ceil(total / parsedLimit),
        page: parsedPage,
      };
    } catch (error) {
      throw new Error("Erreur lors de la récupération des utilisateurs");
    }
  },

  // Récupérer un utilisateur par ID
  getUserById: async (id) => {
    try {
      const user = await User.findById(id);
      if (!user) return null;
      return user;
    } catch (error) {
      throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
  },
  // Récupérer un utilisateur par email
  getUserByMail: async (mail) => {
    try {
      const user = await User.findOne({ mail });
      if (!user) return null;
      return user;
    } catch (error) {
      console.error("Erreur lors de la récupération de user", error);
      throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
  },
  // Créer un nouvel utilisateur
  createUser: async (value) => {
    try {
      const user = new User(value);
      await user.save();
      return user._doc;
    } catch (error) {
      throw new Error("Erreur lors de la création de l'utilisateur");
    }
  },
  updateUser: async (id, updateFields) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) return null;

      const response = { ...updatedUser._doc };

      delete response.password;
      return response;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:");
      throw error;
    }
  },
  deleteUser: async (id) => {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) return false;
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      throw new Error("Erreur lors de la suppression de l'utilisateur");
    }
  },
};
