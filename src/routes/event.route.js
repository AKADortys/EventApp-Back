const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const tokenMdw = require("../middlewares/token.middleware");

router.get("/", eventController.getEvents);
router.post("/", tokenMdw, eventController.create);
router.get("/:id", tokenMdw, eventController.getEvent);
router.put("/:id", tokenMdw, eventController.update);
router.delete("/:id", tokenMdw, eventController.delete);

module.exports = router;
