const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

router.get("/", eventController.getEvents);
router.post("/", eventController.create);
router.get("/:id", eventController.getEvent);
router.put("/:id", eventController.update);
router.delete("/:id", eventController.delete);

module.exports = router;
