const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const tokenMdw = require("../middlewares/token.middleware");
const { organizerMdw } = require("../middlewares/permission.middleware");

router.use(tokenMdw);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEvent);
router.post("/", organizerMdw, eventController.create);
router.put("/:id", organizerMdw, eventController.update);
router.delete("/:id", organizerMdw, eventController.delete);

module.exports = router;
