const { Router } = require("express");
const { getMessages, createMessage, chatWithBot } = require("../controllers/messages.controller");

const router = Router();

// Rutas relacionadas con mensajes
router.get("/", getMessages); // GET /messages
router.post("/", createMessage); // POST /messages
router.post("/chatbot", chatWithBot); // POST /messages/chatbot

module.exports = router;

