const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registration.controller");
const tokenMdw = require("../middlewares/token.middleware");
const adminMdw = require("../middlewares/permission.middleware");

router.use(tokenMdw);
router.get("/", registrationController.getRegistrations);
router.get("/:id", registrationController.getRegistration);
router.post("/", registrationController.create);
router.put("/:id", registrationController.update);
router.delete("/:id", adminMdw, registrationController.delete);

module.exports = router;
