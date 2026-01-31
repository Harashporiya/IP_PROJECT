const { HumanMessage, SystemMessage } = require("@langchain/core/messages");
const { vectorStore, model, SYSTEM_PROMPT } = require("../Config/langchain.config");


function detectQueryType(query) {
  const q = query.toLowerCase();

  if (["dikhao", "details", "detail", "show", "display", "product card", "full details", "complete details", "poora details", "sab kuch batao"].some(w => q.includes(w)))
    return "display";

  if (["price", "kitna", "kitne", "cost", "amount", "rupay", "keemat", "how much"].some(w => q.includes(w)))
    return "price";

  if (["available", "hai kya", "milega", "stock", "exist", "do you have"].some(w => q.includes(w)))
    return "availability";

  if (["kahan", "hostel", "room", "location", "where"].some(w => q.includes(w)))
    return "location";

  if (["brand", "kaun sa brand", "which brand"].some(w => q.includes(w)))
    return "brand";

  if (["category", "type", "kis category"].some(w => q.includes(w)))
    return "category";

  if (["contact", "number", "kaise contact", "how to contact"].some(w => q.includes(w)))
    return "contact";

  if (["kya kya information", "details kya hai", "fields", "data available", "what information"].some(w => q.includes(w)))
    return "field_info";

  return "general";
}


async function retrieveProducts(question, k = 5) {
  try {
    const docs = await vectorStore.similaritySearch(question, k);
    return docs;
  } catch (error) {
    console.error("Error retrieving products:", error);
    return [];
  }
}

function prepareContext(docs) {
  if (!docs || docs.length === 0) {
    return "No products found in the database.";
  }
  const contextText = docs
    .map((doc, index) => {
          const meta = doc.metadata;
          return `Product ${index + 1}:
    ${JSON.stringify(meta, null, 2)}`;
        })
        .join("\n\n");

  return contextText;
}


async function invokeLLM(question, context, queryType) {
  try {
    const messages = [
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(
        `Query Type: ${queryType}
        User Query: ${question}

        Relevant Products:
        ${context}`
              )
            ];

    const response = await model.invoke(messages);
    return response.content;
  } catch (error) {
    console.error("Error invoking LLM:", error);
    throw error;
  }
}

function parseLLMResponse(text) {
  const cleaned = text.trim();
  
  let jsonText = cleaned;
  if (cleaned.startsWith("```json")) {
    jsonText = cleaned.replace(/```json\n?/g, "").replace(/```\n?$/g, "").trim();
  } else if (cleaned.startsWith("```")) {
    jsonText = cleaned.replace(/```\n?/g, "").trim();
  }

  if (jsonText.startsWith("{") && jsonText.endsWith("}")) {
    try {
      const parsed = JSON.parse(jsonText);
      
     
      if (parsed.type === "product_card" && Array.isArray(parsed.products)) {
        return { success: true, response: parsed, isStructured: true };
      }
      
      return { success: true, response: parsed, isStructured: true };
    } catch (error) {
      console.error("JSON parse error:", error);
      return { success: true, response: jsonText, isStructured: false };
    }
  }

  return { success: true, response: jsonText, isStructured: false };
}

async function chat(question) {
  try {
    const queryType = detectQueryType(question);

    const docs = await retrieveProducts(question);

    if (docs.length === 0) {
      return {
        success: true,
        response: "Sorry, I couldn't find any products matching your query. Please try a different search term.",
        isStructured: false
      };
    }

    const context = prepareContext(docs);

    const llmResponse = await invokeLLM(question, context, queryType);
    const result = parseLLMResponse(llmResponse);
    return result;

  } catch (error) {
    console.error("Chat function error:", error);
    return {
      success: false,
      error: error.message || "Internal server error",
      isStructured: false
    };
  }
}

module.exports = {
  chat
};