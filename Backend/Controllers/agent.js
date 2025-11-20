const ragService = require("../services/rag.service");

class ChatController {
  async chat(req, res) {
    try {
      const { question, chatHistory } = req.body;
      const result = await ragService.chat(question, chatHistory);
      return res.json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async batchChat(req, res) {
    try {
      const { questions } = req.body;
      const result = await ragService.batchChat(questions);
      return res.json(result);
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async healthCheck(req, res) {
    res.json({ status: "OK", service: "College Cart", time: new Date() });
  }
}

module.exports = new ChatController();
