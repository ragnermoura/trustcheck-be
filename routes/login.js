require("dotenv").config();
const express = require("express");
const router = express.Router();
const authController = require("../controllers/loginController");

router.post("/login", authController.autenticarUsuario);
router.patch('/logout/:id_user', authController.logoutUsuario);

module.exports = router;