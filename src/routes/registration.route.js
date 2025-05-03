const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registration.controller");
const tokenMdw = require("../middlewares/token.middleware");
const {
  adminMdw,
  athletesMdw,
} = require("../middlewares/permission.middleware");

router.use(tokenMdw);
router.get("/", adminMdw, registrationController.getRegistrations);
router.get("/:id", registrationController.getRegistration);
router.post("/", athletesMdw, registrationController.create);
router.put("/:id", athletesMdw, registrationController.update);
router.delete("/:id", athletesMdw, registrationController.delete);

module.exports = router;
