const {
  createRegistrationSchema,
  updateRegistrationSchema,
} = require("../dto/registration.dto");
const registrationService = require("../services/registration.service");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  getRegistrations: async (req, res) => {
    try {
      const search = req.query.search || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

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
      res.status(500).json({ message: error.message });
    }
  },

  getRegistration: async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID invalide" });
      }

      const result = await registrationService.getRegistration(id);
      if (!result) {
        return res.status(404).json({ message: "Inscription inexistante" });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { error, value } = createRegistrationSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((d) => d.message);
        return res.status(400).json({ errors });
      }

      const registration = await registrationService.create(value);

      return res.status(201).json({
        message: "inscription créé !",
        data: registration,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID invalide" });
      }

      const registration = await registrationService.getRegistration(id);
      if (!registration) {
        return res.status(404).json({ message: "Inscription inexistante" });
      }

      const { error, value } = updateRegistrationSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((d) => d.message);
        return res.status(400).json({ errors });
      }

      const updatedRegis = await registrationService.update(id, value);

      res.status(200).json({
        message: "Inscription modifié !",
        data: updatedRegis,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID invalide" });
      }

      const registration = await registrationService.getRegistration(id);
      if (!registration) {
        return res.status(404).json({ message: "Inscription inexistant !" });
      }

      await registrationService.delete(id);

      res.status(200).json({ message: "Inscription supprimé !" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
