const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const tokenMdw = require("../middlewares/token.middleware");
const adminMdw = require("../middlewares/permission.middleware");

router.post("/", userController.createUser);
router.use(tokenMdw);
router.get("/", adminMdw, userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", adminMdw, userController.deleteUser);

module.exports = router;
