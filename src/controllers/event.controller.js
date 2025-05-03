const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const eventService = require("../services/event.service");
const { createEventSchema, updateEventSchema } = require("../dto/event.dto");

module.exports = {
  //renvoie tout les events avec filter + pagination
  getEvents: async (req, res) => {
    try {
      const search = req.query.search || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await eventService.getEvents(page, limit, search);

      res.status(200).json({
        data: result.events,
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //renvoie un event par son id
  getEvent: async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID invalide" });
      }

      const result = await eventService.getEvent(id);
      if (!result) {
        return res.status(404).json({ message: "Event inexistant" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //création event
  create: async (req, res) => {
    try {
      const { error, value } = createEventSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((d) => d.message);
        return res.status(400).json({ errors });
      }

      const event = await eventService.create(value);

      return res.status(201).json({
        message: "Event créé !",
        data: event,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //MàJ event
  update: async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID invalide" });
      }

      const event = await eventService.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event inexistant" });
      }
      const userId = new ObjectId(req.user.id);
      const organizerId = new ObjectId(event.organizer._id);

      if (!organizerId.equals(userId)) {
        return res
          .status(403)
          .json({ message: "Vous n'avez pas les permissions sur cet event" });
      }

      const { error, value } = updateEventSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((d) => d.message);
        return res.status(400).json({ errors });
      }

      const updatedEvent = await eventService.update(id, value);

      res.status(200).json({
        message: "Event modifié !",
        data: updatedEvent,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //suppr envent
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID invalide" });
      }

      const event = await eventService.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event inexistant !" });
      }
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
      res.status(500).json({ message: error.message });
    }
  },
};
