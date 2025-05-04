const registrationService = require("../services/registration.service");
const {
  createRegistrationSchema,
  updateRegistrationSchema,
} = require("../dto/registration.dto");
const {
  isValidObjectId,
  validateSchema,
  paginateQuery,
  handleServerError,
  checkPermissions,
} = require("../utils/controller.helper");

module.exports = {
  getRegistrations: async (req, res) => {
    try {
      const { search, page, limit } = paginateQuery(req.query);
      const result = await registrationService.getRegistrations(
        page,
        limit,
        search
      );
      res.status(200).json({
        data: result.registrations,
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  getRegistration: async (req, res) => {
    try {
      const id = req.params.id;
      if (!isValidObjectId(id))
        return res.status(400).json({ message: "ID invalide" });

      const result = await registrationService.getRegistration(id);
      if (!result)
        return res.status(404).json({ message: "Inscription inexistante" });
      if (!checkPermissions(req, res, result.user._id)) return;

      res.status(200).json(result);
    } catch (error) {
      handleServerError(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { errors, value } = validateSchema(
        createRegistrationSchema,
        req.body
      );
      if (errors) return res.status(400).json({ errors });

      const registration = await registrationService.create(value);
      res
        .status(201)
        .json({ message: "Inscription créée !", data: registration });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      if (!isValidObjectId(id))
        return res.status(400).json({ message: "ID invalide" });

      const registration = await registrationService.getRegistration(id);
      if (!registration)
        return res.status(404).json({ message: "Inscription inexistante" });
      if (!checkPermissions(req, res, registration.user._id)) return;

      const { errors, value } = validateSchema(
        updateRegistrationSchema,
        req.body
      );
      if (errors) return res.status(400).json({ errors });

      const updated = await registrationService.update(id, value);
      res
        .status(200)
        .json({ message: "Inscription modifiée !", data: updated });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      if (!isValidObjectId(id))
        return res.status(400).json({ message: "ID invalide" });

      const registration = await registrationService.getRegistration(id);
      if (!registration)
        return res.status(404).json({ message: "Inscription inexistante !" });
      if (!checkPermissions(req, res, registration.user._id)) return;

      await registrationService.delete(id);
      res.status(200).json({ message: "Inscription supprimée !" });
    } catch (error) {
      handleServerError(res, error);
    }
  },
};
