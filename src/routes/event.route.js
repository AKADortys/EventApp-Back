const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const tokenMdw = require("../middlewares/token.middleware");
const {
  adminMdw,
  organizerMdw,
} = require("../middlewares/permission.middleware");

router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEvent);
router.use(tokenMdw);
router.post("/", organizerMdw, eventController.create);
router.put("/:id", organizerMdw, eventController.update);
router.delete("/:id", adminMdw, eventController.delete);

module.exports = router;
