const { Router } = require("express");
const { registerUser } = require("../controllers/register.controller");

const router = Router();

// Ruta para registrar usuarios
router.post("/", registerUser); // POST /register

module.exports = router;
