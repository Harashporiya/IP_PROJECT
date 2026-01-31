const ragService = require("../services/rag.service");

exports.chat = async (req, res) => {
  try {
    const { question } = req.body;
    const result = await ragService.chat(question);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

