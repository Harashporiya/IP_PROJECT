const express = require("express");
const router = express.Router();
const chatController = require("../Controllers/agent");
const { 
  validateChatRequest, 
  validateBatchRequest 
} = require("../middleware/validation.middleware");

// Health check
router.get("/health", chatController.healthCheck);

// Chat endpoint
router.post("/chat", validateChatRequest, chatController.chat);

// Batch chat endpoint
router.post("/chat/batch", validateBatchRequest, chatController.batchChat);

module.exports = router;
