import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // For some reason the SDK doesn't expose listModels directly on genAI instance in all versions,
        // but let's try to use the model manager if available, or just try a known working model.
        // Actually, let's try to just run a simple generation with a very basic model name like 'gemini-pro' 
        // but log the full error object to see if it gives hints.

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash");
        console.log(result.response.text());
    } catch (error) {
        console.error("Error with gemini-1.5-flash:", error.message);

        try {
            const model2 = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result2 = await model2.generateContent("Hello");
            console.log("Success with gemini-pro");
        } catch (error2) {
            console.error("Error with gemini-pro:", error2.message);
        }
    }
}

listModels();
