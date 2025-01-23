const { Router } = require("express");
const express = require("express");

const router = Router();

const messagesRoutes = require("../routes/messages.routes"); // Importa las rutas de mensajes
const app = express();

// Configuración de rutas
router.use("/messages", messagesRoutes); // Rutas relacionadas con mensajes

module.exports = router;
