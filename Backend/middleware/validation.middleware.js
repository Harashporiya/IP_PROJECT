const validateChatRequest = (req, res, next) => {
  const { question } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({
      error: "Bad Request",
      message: "Question is required and must be a string",
    });
  }

  if (question.trim().length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Question cannot be empty",
    });
  }

  next();
};

const validateBatchRequest = (req, res, next) => {
  const { questions } = req.body;

  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "questions must be a non-empty array",
    });
  }

  if (questions.some((q) => typeof q !== "string" || q.trim().length === 0)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "All questions must be non-empty strings",
    });
  }

  next();
};

module.exports = {
  validateChatRequest,
  validateBatchRequest,
};
