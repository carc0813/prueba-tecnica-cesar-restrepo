const { Router } = require("express");
const { getMessages, createMessage,chatWithBot} = require("../controllers/messages.controller");

const router = Router();

// Rutas
router.get("/", getMessages); // GET /messages
router.post("/", createMessage); // POST /messages
router.post('/chat', chatWithBot); // POST /chat
module.exports = router;
