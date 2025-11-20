const { HumanMessage, SystemMessage } = require("@langchain/core/messages");
const { RunnableSequence } = require("@langchain/core/runnables");
const { vectorStore, model, SYSTEM_PROMPT } = require("../Config/langchain.config");

class RAGService {
  constructor() {
    this.retriever = vectorStore.asRetriever({ k: 5 });
    this.chain = this.createChain();
  }

  // ---------------------------------------
  // 🔥 IMPROVED QUERY TYPE DETECTION
  // ---------------------------------------
  detectQueryType(q) {
    q = q.toLowerCase();

    if (["dikhao","details","detail","show","display","product card","full details","details do"].some(w => q.includes(w)))
      return "display";

    if (["price","kitna","kitne","cost","amount","rupay","keemat"].some(w => q.includes(w)))
      return "price";

    if (["available","hai kya","milega","stock"].some(w => q.includes(w)))
      return "availability";

    if (["brand","hostel","room","seller","category","color","kahan"].some(w => q.includes(w)))
      return "general";

    return "general";
  }

  // -----------------------------------------
  // 🔥 MAIN RAG CHAIN
  // -----------------------------------------
  createChain() {
    return RunnableSequence.from([
      // (1) Retrieve documents
      async (input) => {
        const docs = await this.retriever.invoke(input.question);
        const queryType = this.detectQueryType(input.question);

        return { ...input, docs, queryType };
      },

      // (2) Prepare messages
      async (input) => {
        const contextText = input.docs
          .map((d) => JSON.stringify(d.metadata, null, 2))
          .join("\n\n");

        const messages = [
          new SystemMessage(SYSTEM_PROMPT),
          new HumanMessage(
            `User Query: ${input.question}\n\nRelevant Products:\n${contextText}`
          )
        ];

        return { messages, queryType: input.queryType, docs: input.docs };
      },

      // (3) LLM
      async (input) => {
        const resp = await model.invoke(input.messages);
        return { text: resp.content, queryType: input.queryType };
      }
    ]);
  }

  // ----------------------------------------------------
  // CHAT
  // ----------------------------------------------------
  async chat(question, chatHistory = []) {
    const result = await this.chain.invoke({ question, chatHistory });

    // JSON CLEAN FIX:
    const cleaned = result.text.trim();
    let parsed = null;

    if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
      try {
        parsed = JSON.parse(cleaned);
        return { success: true, response: parsed, isStructured: true };
      } catch { }
    }

    return { success: true, response: cleaned, isStructured: false };
  }

  // MULTI QUERY
  async batchChat(questions) {
    const result = await Promise.all(questions.map((q) =>
      this.chain.invoke({ question: q, chatHistory: [] })
    ));

    return { success: true, responses: result };
  }
}

module.exports = new RAGService();
