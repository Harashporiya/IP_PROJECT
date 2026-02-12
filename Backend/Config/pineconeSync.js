const { Pinecone } = require("@pinecone-database/pinecone");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.index(process.env.PINECONE_INDEX_NAME);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateEmbedding(text) {
  const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
  const result = await model.embedContent(text);
  return result.embedding.values;
}


async function syncProductToPinecone(product) {
  const vectorText = `
    Name: ${product.name}
    Brand: ${product.brand}
    Category: ${product.category}
    Description: ${product.description}
    Prev Price: ${product.prevAmount}
    New Price: ${product.newAmount}
    Hostel: ${product.hostleName}
    Select Hostel: ${product.selectHostel}
    Room: ${product.roomNumber}
  `;

  const embedding = await generateEmbedding(vectorText);

  await index.upsert([
    {
      id: `product-${product._id}`,
      values: embedding,
      metadata: {
        _id: product._id,
        cloudinaryPublicId: product.cloudinaryPublicId,
        name: product.name,
        brand: product.brand,
        category: product.category,
        selectHostel: product.selectHostel,
        hostleName: product.hostleName,
        roomNumber: product.roomNumber,
        dayScholarContectNumber: product.dayScholarContectNumber,
        prevAmount: product.prevAmount,
        newAmount: product.newAmount,
        image: product.image,
        description: product.description,
      },
    },
  ]);
}


async function deleteProductFromPinecone(productId) {
  await index.deleteOne(`product-${productId}`);
}

module.exports = {
  syncProductToPinecone,
  deleteProductFromPinecone,
};
