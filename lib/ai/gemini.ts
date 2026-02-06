
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("Missing GEMINI_API_KEY in environment variables");
}

export const geminiClient = new GoogleGenAI({
    apiKey: apiKey || 'dummy-key',
});

// Default model to use
export const GEMINI_MODEL = 'gemini-3-flash-preview'; 
