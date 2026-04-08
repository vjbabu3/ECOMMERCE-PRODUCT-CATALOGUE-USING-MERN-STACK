import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";

// Load API
const apiKey = process.env.GEMINI_API_KEY || "MISSING_KEY";
const genAI = new GoogleGenerativeAI(apiKey);

// @desc    Chat with AI assistant
// @route   POST /api/ai/chat
// @access  Public
export const chatWithAI = expressAsyncHandler(async (req, res) => {
    const { message } = req.body;

    if (!message) {
        res.status(400);
        throw new Error("Message is required");
    }

    try {
        // 🔹 Fetch products from DB
        const products = await Product.find({})
            .populate("category", "name")
            .select("name price brand description category");

        // 🔹 Convert products to text
        const productContext = products
            .map(
                (p) =>
                    `- ${p.name} (${p.brand}) | ₹${p.price} | ${p.category?.name || "General"} | ${(p.description || "").substring(0, 50)}`
            )
            .join("\n");

        // 🔹 Prompt
        const prompt = `
You are a smart shopping assistant for ShopZone.

Rules:
- Answer ONLY using the product list
- If user asks cheapest → return lowest price product
- If user asks under budget → filter products
- If not found → say "No product found"
- CRITICAL: You must ALWAYS reply in English, regardless of the language the User uses.

Products:
${productContext}

User question:
${message}

Give short and clear answer with product name and price.
`;

        // ✅ The user's API key specifically enables gemini-2.5-flash and disables standard ones
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({
            message: "AI failed. Check API key / model.",
            errorDetails: error.message
        });
    }
});