const eventService = require("../services/event.service");
const registrationService = require("../services/registration.service");
const { createEventSchema, updateEventSchema } = require("../dto/event.dto");
const {
  isValidObjectId,
  validateSchema,
  paginateQuery,
  handleServerError,
  checkPermissions,
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
  getRegistrationByEvent: async (req, res) => {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "ID invalide" });

    const event = await eventService.getEvent(id);
    if (!event) return res.status(404).json({ message: "Event inexistant" });
    if (!checkPermissions(req, res, event.organizer._id)) return;
    try {
      const { search, page, limit } = paginateQuery(req.query);
      const result = await registrationService.getRegistrationByEvent(
        id,
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

  gerEventByOrga: async (req, res) => {
    try {
      const id = req.params.id;
      const { search, page, limit } = paginateQuery(req.query);

      if (!isValidObjectId(id))
        return res.status(400).json({ message: "ID invalide" });

      const result = await eventService.getEventsByOrga(
        id,
        page,
        limit,
        search
      );
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
      if (!checkPermissions(req, res, event.organizer._id)) return;

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

      if (!checkPermissions(req, res, event.organizer._id)) return;

      await eventService.delete(id);
      res.status(200).json({ message: "Event supprimé !" });
    } catch (error) {
      handleServerError(res, error);
    }
  },
};
