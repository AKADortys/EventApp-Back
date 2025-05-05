const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const tokenMdw = require("../middlewares/token.middleware");
const { organizerMdw } = require("../middlewares/permission.middleware");

router.use(tokenMdw);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEvent);
router.use(organizerMdw);
router.get("/:id/registrations", eventController.getRegistrationByEvent);
router.post("/", eventController.create);
router.put("/:id", eventController.update);
router.delete("/:id", eventController.delete);

module.exports = router;
