const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const tokenMdw = require("../middlewares/token.middleware");

router.post("/login", authController.login);
router.post("/logout", tokenMdw, authController.logout);

module.exports = router;
