
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("Missing GEMINI_API_KEY in environment variables");
}

export const genAI = new GoogleGenAI({
    apiKey: apiKey || 'dummy-key',
});

// Default model to use - Gemini 1.5 Flash is the best balance of speed, cost and performance.
export const GEMINI_MODEL = 'gemini-1.5-flash';
