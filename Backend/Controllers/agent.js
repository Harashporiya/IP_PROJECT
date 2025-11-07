const Agent = require("../Model/agent");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const BACKEND_API_URL = process.env.BACKEND_API_URL;

const conversationHistory = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [userId, data] of conversationHistory.entries()) {
    if (now - data.lastActivity > 2 * 60 * 60 * 1000) {
      conversationHistory.delete(userId);
      console.log(`Cleaned up conversation for user: ${userId}`);
    }
  }
}, 30 * 60 * 1000);

async function userName(params) {
  
   const res = await axios.get(`${BACKEND_API_URL}//user-profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
}

async function productFetch(req) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error("No token provided");
  
  try {
    const res = await axios.get(`${BACKEND_API_URL}/all-product`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Fetch user details by userId
async function fetchUserDetails(userId, token) {
  try {
    const res = await axios.get(`${BACKEND_API_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data.user || res.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error.message);
    return null;
  }
}

exports.agentCreateInput = async (req, res) => {
  const { input, userId } = req.body;

  try {
    const token = req.headers.authorization?.split(' ')[1];
    const products = await productFetch(req);
    
    // Fetch user details for each unique userId in products
    const uniqueUserIds = [...new Set(products.map(p => p.userId))];
    const userDetailsPromises = uniqueUserIds.map(uid => 
      fetchUserDetails(uid, token)
    );
    const userDetailsArray = await Promise.all(userDetailsPromises);
    
    // Create a map of userId -> user details
    const userMap = {};
    uniqueUserIds.forEach((uid, index) => {
      if (userDetailsArray[index]) {
        userMap[uid] = userDetailsArray[index];
      }
    });

    // Format products with user details
    const formattedProducts = products.map(p => {
      const user = userMap[p.userId];
      const sellerName = user ? (user.name || user.username || user.email) : 'Unknown Seller';
      
      return {
        id: p._id?.toString(),
        name: p.name,
        brand: p.brand,
        description: p.description,
        price: p.newAmount || p.prevAmount,
        originalPrice: p.prevAmount,
        discount: p.prevAmount && p.newAmount ? Math.round(((p.prevAmount - p.newAmount) / p.prevAmount) * 100) : 0,
        image: p.image,
        category: p.category,
        quantity: p.quantity,
        stock: p.stock,
        seller: {
          id: p.userId,
          name: sellerName,
          type: p.selectHostel === 'Hostler' ? 'hosteler' : 'day_scholar',
          roomNumber: p.roomNumber,
          hostelName: p.hostleName,
          contact: p.dayScholarContectNumber,
          email: user?.email,
          avatar: user?.avatar || user?.profileImage
        },
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      };
    });

    // Create a simplified list for AI context
    const productListForAI = formattedProducts.map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      stock: p.stock,
      sellerName: p.seller.name,
      sellerType: p.seller.type
    }));

    const systemInstruction = `You are John, a helpful assistant managing College Cart.

Available Products Summary:
${JSON.stringify(productListForAI, null, 2)}

Response Rules:

1. For AVAILABILITY queries (e.g., "do you have", "is there", "available"):
   - Respond naturally: "Yes, [product] exists in our cart" or "No, [product] does not exist"
   - Be conversational and friendly

2. For PRODUCT DETAIL queries (e.g., "show me", "tell me about", "details of", "info about"):
   - Respond with ONLY a valid JSON object (no markdown, no backticks, no extra text)
   - Format:
{
  "type": "product_card",
  "products": ["PRODUCT_ID_1", "PRODUCT_ID_2"]
}
   - Use exact product IDs from the database
   - Can include multiple product IDs if query matches multiple products

3. For GENERAL conversation:
   - Be friendly and helpful
   - Guide users on how to search products
   - Mention seller names when relevant

4. Context awareness:
   - Remember previous queries in conversation
   - "tell me more" or "show details" should refer to last mentioned product

Examples:
- User: "Do you have iPhone?" → "I don't see iPhone in our current inventory, but we have smartphones from Samsung available."
- User: "Show me laptop details" → {"type":"product_card","products":["67c363b1004e887d58b0c8aa"]}
- User: "Who is selling this?" → "This is being sold by [seller name from last product]"

CRITICAL: When sending product_card response, use ONLY the JSON format with product IDs. I will fetch full details including seller information.`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      systemInstruction: systemInstruction,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1024,
        topP: 0.9,
      }
    });

    if (!conversationHistory.has(userId)) {
      conversationHistory.set(userId, {
        history: [],
        lastActivity: Date.now(),
        lastMentionedProducts: []
      });
    }
    
    const userData = conversationHistory.get(userId);
    userData.lastActivity = Date.now();

    const chat = model.startChat({
      history: userData.history
    });

    const result = await chat.sendMessageStream(input);

    let output = "";
    for await (const chunk of result.stream) {
      output += chunk.text();
    }

    userData.history.push(
      { role: "user", parts: [{ text: input }] },
      { role: "model", parts: [{ text: output }] }
    );

    if (userData.history.length > 20) {
      userData.history = userData.history.slice(-20);
    }

    let responseData = { output, type: 'text' };
    
    try {
      let cleanOutput = output.trim();
      cleanOutput = cleanOutput.replace(/``````\n?/g, '');
      
      const jsonMatch = cleanOutput.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        
        if (parsed.type === 'product_card' && parsed.products && Array.isArray(parsed.products)) {
          const fullProducts = parsed.products
            .map(productId => {
              const product = formattedProducts.find(p => p.id === productId);
              if (!product) {
                console.warn(`Product not found for ID: ${productId}`);
              }
              return product;
            })
            .filter(p => p !== undefined);
          
          if (fullProducts.length > 0) {
            responseData = { 
              type: 'product_card',
              products: fullProducts
            };
            
            userData.lastMentionedProducts = fullProducts.map(p => p.id);
            
            console.log('Product card response with seller names:', JSON.stringify({
              type: 'product_card',
              productCount: fullProducts.length,
              products: fullProducts.map(p => ({ 
                id: p.id, 
                name: p.name, 
                seller: p.seller.name,
                image: p.image 
              }))
            }, null, 2));
          } else {
            responseData = { 
              output: "I found those products in our system, but couldn't load their details. Please try again.",
              type: 'text' 
            };
          }
        }
      }
    } catch (e) {
      console.error('JSON Parse Error:', e);
      responseData = { output, type: 'text' };
    }

    return res.status(200).json({
      success: true,
      message: "Response generated",
      data: responseData
    });

  } catch (error) {
    console.error("Error:", error);
    
    if (error.message?.includes("429") || error.message?.includes("quota")) {
      return res.status(429).json({ 
        success: false,
        message: "Rate limit exceeded. Please wait a moment and try again." 
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Error processing request",
      error: error.message
    });
  }
};

exports.clearChatHistory = async (req, res) => {
  const { userId } = req.body;
  
  if (conversationHistory.has(userId)) {
    conversationHistory.delete(userId);
    return res.status(200).json({ 
      success: true,
      message: "Chat history cleared successfully" 
    });
  }
  
  return res.status(404).json({ 
    success: false,
    message: "No active conversation found" 
  });
};
