import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.warn("Missing OPENAI_API_KEY in environment variables");
}

export const openai = new OpenAI({
    apiKey: apiKey || 'dummy-key', // Prevent crash on build if missing, but will fail runtime
});
