const userService = require("../services/user.service");
const registrationService = require("../services/registration.service");
const { userSchema, updateUserSchema } = require("../dto/user.dto");
const {
  paginateQuery,
  handleServerError,
  checkPermissions,
  checkUserExists,
  validateRequestSchema,
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
    try {
      const user = await userService.getUserById(id);
      if (!checkUserExists(res, user)) return;

      res.status(200).json({ message: "Utilisateur trouvé !", data: user });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  getUserRegistrations: async (req, res) => {
    try {
      const id = req.params.id;
      if (!checkPermissions(req, res, id)) return;
      const { search, page, limit } = paginateQuery(req.query);
      const result = await registrationService.getRegistrationByUser(
        id,
        page,
        limit,
        search
      );
      res.status(200).json({
        data: result.registrations,
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  // Création d'un utilisateur
  createUser: async (req, res) => {
    const value = validateRequestSchema(res, userSchema, req.body);
    if (!value) return;

    try {
      const existingUser = await userService.getUserByMail(value.mail);
      if (existingUser) {
        return res.status(400).json({ message: "Email déjà utilisé !" });
      }

      const newUser = await userService.createUser(value);
      const { password, ...sanitizedUser } = newUser;

      res.status(201).json({
        message: "Utilisateur créé avec succès",
        data: sanitizedUser,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  // Modification d'un utilisateur
  updateUser: async (req, res) => {
    const id = req.params.id;
    if (!checkPermissions(req, res, id)) return;

    try {
      const user = await userService.getUserById(id);
      if (!checkUserExists(res, user)) return;

      const value = validateRequestSchema(res, updateUserSchema, req.body);
      if (!value) return;

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
    if (!checkPermissions(req, res, id)) return;

    try {
      const user = await userService.getUserById(id);
      if (!checkUserExists(res, user)) return;

      await userService.deleteUser(id);
      console.log(
        `Suppression de l'utilisateur : ${user._id} par ${req.user.id}`
      );
      res.status(200).json({ message: "Utilisateur supprimé avec succès !" });
    } catch (error) {
      handleServerError(res, error);
    }
  },
};

module.exports = userController;
