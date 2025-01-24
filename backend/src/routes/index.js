const { Router } = require("express");

// Importar las rutas específicas
const messagesRoutes = require("./messages.routes"); // Rutas de mensajes
const registerRoutes = require("./register.routes"); // Rutas de registro

const router = Router();

// Configuración de rutas principales
router.use("/messages", messagesRoutes); // Prefijo /messages para mensajes
router.use("/register", registerRoutes); // Prefijo /register para registro

module.exports = router;

