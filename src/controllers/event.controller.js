const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const eventService = require("../services/event.service");
const { createEventSchema, updateEventSchema } = require("../dto/event.dto");
const {
  isValidObjectId,
  validateSchema,
  paginateQuery,
  handleServerError,
} = require("../utils/controller.helper");

module.exports = {
  getEvents: async (req, res) => {
    try {
      const { search, page, limit } = paginateQuery(req.query);
      const result = await eventService.getEvents(page, limit, search);
      res.status(200).json({
        data: result.events,
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  getEvent: async (req, res) => {
    try {
      const id = req.params.id;
      if (!isValidObjectId(id))
        return res.status(400).json({ message: "ID invalide" });

      const result = await eventService.getEvent(id);
      if (!result) return res.status(404).json({ message: "Event inexistant" });

      let eventResponse = result.toObject();

      // Supprimer la liste des participants si l'utilisateur est un sportif
      if (req.user && req.user.role === "sportif") {
        delete eventResponse.participants;
      }

      res.status(200).json(eventResponse);
    } catch (error) {
      handleServerError(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { errors, value } = validateSchema(createEventSchema, req.body);
      if (errors) return res.status(400).json({ errors });

      const event = await eventService.create(value);
      res.status(201).json({ message: "Event créé !", data: event });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      if (!isValidObjectId(id))
        return res.status(400).json({ message: "ID invalide" });

      const event = await eventService.getEvent(id);
      if (!event) return res.status(404).json({ message: "Event inexistant" });

      const userId = new ObjectId(req.user.id);
      const organizerId = new ObjectId(event.organizer._id);
      if (!organizerId.equals(userId)) {
        return res
          .status(403)
          .json({ message: "Vous n'avez pas les permissions sur cet event" });
      }

      const { errors, value } = validateSchema(updateEventSchema, req.body);
      if (errors) return res.status(400).json({ errors });

      const updated = await eventService.update(id, value);
      res.status(200).json({ message: "Event modifié !", data: updated });
    } catch (error) {
      handleServerError(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      if (!isValidObjectId(id))
        return res.status(400).json({ message: "ID invalide" });

      const event = await eventService.getEvent(id);
      if (!event)
        return res.status(404).json({ message: "Event inexistant !" });

      const userId = new ObjectId(req.user.id);
      const organizerId = new ObjectId(event.organizer._id);
      if (!organizerId.equals(userId)) {
        return res
          .status(403)
          .json({ message: "Vous n'avez pas les permissions sur cet event" });
      }

      await eventService.delete(id);
      res.status(200).json({ message: "Event supprimé !" });
    } catch (error) {
      handleServerError(res, error);
    }
  },
};
