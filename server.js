import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { knowledgeBase } from './src/data/knowledgeBase.js';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        // Using gemini-2.5-flash as listed in API
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const knowledgeBaseString = JSON.stringify(knowledgeBase, null, 2);

        const systemPrompt = `
        You are a helpful and polite hotel concierge chatbot for Eraeliya Villas and Gardens in Weligama, Sri Lanka.
        Use the following knowledge base to answer the user's question. 
        
        Knowledge Base:
        ${knowledgeBaseString}

        Guidelines:
        - If the answer is not in the context, politely say you don't have that information and offer to contact the front desk.
        - Keep your answers concise, friendly, and luxurious in tone.
        - Use markdown formatting (bolding, lists) for clarity.
        - When asked about a specific villa, provide detailed features from the knowledge base.

        User: ${message}
        Bot:`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
