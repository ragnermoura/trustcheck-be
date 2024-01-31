require("dotenv").config();
const express = require("express");
const router = express.Router();
const authController = require("../controllers/loginController");

router.post("/", authController.autenticarUsuario);

module.exports = router;