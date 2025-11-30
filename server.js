import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { knowledgeBase } from './src/data/knowledgeBase.js';


dotenv.config();

const app = express();
const port = 3001;

// In-memory storage for logs (resets on server restart)
const logs = [];

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const startTime = Date.now();
    const { message, sessionId } = req.body;
    const userAgent = req.headers['user-agent'] || 'Unknown';

    // Simple device detection
    let device = 'Desktop';
    if (/mobile/i.test(userAgent)) device = 'Mobile';
    if (/iphone|ipad/i.test(userAgent)) device = 'iOS';
    if (/android/i.test(userAgent)) device = 'Android';

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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

        // Calculate response time
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Save log
        logs.unshift({
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            sessionId: sessionId || 'anonymous',
            device,
            query: message,
            response: text,
            responseTime
        });

        // Keep logs size manageable (optional, e.g., last 1000)
        if (logs.length > 1000) logs.pop();

        res.json({ reply: text });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

app.get('/api/stats', (req, res) => {
    // Calculate aggregates
    const totalConversations = logs.length;
    const avgResponseTime = totalConversations > 0
        ? (logs.reduce((acc, log) => acc + log.responseTime, 0) / totalConversations).toFixed(0)
        : 0;

    // Group by device
    const deviceStats = logs.reduce((acc, log) => {
        acc[log.device] = (acc[log.device] || 0) + 1;
        return acc;
    }, {});

    // Group by hour (last 24h ideally, but here just all time for demo)
    const hourlyStats = logs.reduce((acc, log) => {
        const hour = new Date(log.timestamp).getHours();
        const label = `${hour}:00`;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {});

    res.json({
        logs,
        stats: {
            totalConversations,
            avgResponseTime,
            deviceStats,
            hourlyStats
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
