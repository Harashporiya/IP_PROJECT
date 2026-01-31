const express = require("express");
const router = express.Router();
const chatController = require("../Controllers/agent");
const { validateChatRequest} = require("../middleware/validation.middleware");

router.post("/chat", validateChatRequest, chatController.chat);

module.exports = router;
