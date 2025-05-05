const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registration.controller");
const tokenMdw = require("../middlewares/token.middleware");
const {
  athletesMdw,
  adminMdw,
} = require("../middlewares/permission.middleware");

router.use(tokenMdw);
router.get("/", adminMdw, registrationController.getRegistrations);
router.use(athletesMdw);
router.get("/:id", registrationController.getRegistration);
router.post("/", registrationController.create);
router.put("/:id", registrationController.update);
router.delete("/:id", registrationController.delete);

module.exports = router;
