const express = require("express");
const { 
  agentCreateInput, 
  clearChatHistory,
  getConversationStats 
} = require("../Controllers/agent");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/agent", isAuthenticated, agentCreateInput);
router.post("/agent/clear-history", isAuthenticated, clearChatHistory);
// router.post("/agent/stats", isAuthenticated, getConversationStats); // Changed to POST

module.exports = router;

