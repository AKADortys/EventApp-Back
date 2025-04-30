const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registration.controller");
const tokenMdw = require("../middlewares/token.middleware");

router.get("/", tokenMdw, registrationController.getRegistrations);
router.get("/:id", tokenMdw, registrationController.getRegistration);
router.post("/", tokenMdw, registrationController.create);
router.put("/:id", tokenMdw, registrationController.update);
router.delete("/:id", tokenMdw, registrationController.delete);

module.exports = router;
