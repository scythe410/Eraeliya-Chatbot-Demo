import { GoogleGenerativeAI } from '@google/generative-ai';
import { knowledgeBase } from '../src/data/knowledgeBase.js';

export default async function handler(req, res) {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'GEMINI_API_KEY is not set' });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-2.5-flash as verified
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

        res.status(200).json({ reply: text });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
}
