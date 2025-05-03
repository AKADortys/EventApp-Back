const userService = require("../services/user.service");
const { userSchema, updateUserSchema } = require("../dto/user.dto");
const {
  isValidObjectId,
  validateSchema,
  paginateQuery,
  handleServerError,
} = require("../utils/controller.helper");

const userController = {
  // Récupération de tous les utilisateurs
  getUsers: async (req, res) => {
    try {
      const { search, page, limit } = paginateQuery(req.query);
      const result = await userService.getUsers(page, limit, search);

      res.status(200).json({
        data: result.users,
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  // Récupération d'un utilisateur par ID
  getUserById: async (req, res) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    try {
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.json(user);
    } catch (error) {
      handleServerError(res, error);
    }
  },

  // Création d'un utilisateur
  createUser: async (req, res) => {
    const { errors, value } = validateSchema(userSchema, req.body);
    if (errors) {
      return res.status(400).json({ errors });
    }

    try {
      const existingUser = await userService.getUserByMail(value.mail);
      if (existingUser) {
        return res.status(400).json({ message: "Email déjà utilisé !" });
      }

      const newUser = await userService.createUser(value);
      const { password, ...sanitizedUser } = newUser;

      res.status(201).json({
        message: "Utilisateur créé avec succès",
        user: sanitizedUser,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  // Modification d'un utilisateur
  updateUser: async (req, res) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    try {
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable !" });
      }

      const { errors, value } = validateSchema(updateUserSchema, req.body);
      if (errors) {
        return res.status(400).json({ errors });
      }

      const updatedUser = await userService.updateUser(id, value);
      if (!updatedUser) {
        return res.status(400).json({
          message: "Échec de la mise à jour de l'utilisateur",
        });
      }

      res.json({
        message: "Utilisateur modifié avec succès !",
        user: updatedUser,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  // Suppression d'un utilisateur
  deleteUser: async (req, res) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    try {
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      await userService.deleteUser(id);
      res.status(200).json({ message: "Utilisateur supprimé avec succès !" });
    } catch (error) {
      handleServerError(res, error);
    }
  },
};

module.exports = userController;
