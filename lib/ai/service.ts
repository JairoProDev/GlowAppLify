
import OpenAI from 'openai';
import { Action, Week } from '@/lib/types'; // Existing types
import { AnalyticsOverview } from '@/lib/types/analytics';

// Initialize OpenAI Client
// We use a singleton pattern or creating it per request in Next.js usually
// checking for key existence to prevent crash on init
const apiKey = process.env.OPENAI_API_KEY;

const openai = apiKey ? new OpenAI({
    apiKey: apiKey,
}) : null;

// Mock fallback for when API key is missing during dev
const MOCK_MODE = !apiKey;

export interface UserContext {
    name: string;
    goal: string;
    recentLogs: any[]; // Last 7 days
    incompleteTasks: Action[];
    moodTrend: number[];
}

export class AIService {

    /**
     * Generates a "One Thing" recommendation for tomorrow based on unfinished tasks and goals.
     */
    static async suggestOneThing(context: UserContext): Promise<{ title: string; reasoning: string }> {
        if (MOCK_MODE || !openai) {
            console.warn("AI Service running in MOCK mode (No API Key)");
            return {
                title: "Complete the most urgent pending task",
                reasoning: "Mock reasoning due to missing API key."
            };
        }

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o", // Using optimized model
                messages: [
                    {
                        role: "system",
                        content: "You are an elite productivity coach. Analyze the user's unfinished tasks and goal. Identify the SINGLE most high-impact action for tomorrow. Return JSON."
                    },
                    {
                        role: "user",
                        content: JSON.stringify({
                            goal: context.goal,
                            pending: context.incompleteTasks.map(t => t.title),
                            mood: context.moodTrend
                        })
                    }
                ],
                response_format: { type: "json_object" }
            });

            const content = response.choices[0].message.content;
            return content ? JSON.parse(content) : { title: "Focus on your goal", reasoning: "AI parsing failed." };

        } catch (error) {
            console.error("AI Service Error:", error);
            return { title: "Review your goals", reasoning: "AI service temporarily unavailable." };
        }
    }

    /**
     * Generates proactive insights for the Evening Check-in.
     */
    static async generateEveningInsights(
        mood: number,
        completedCount: number,
        totalCount: number,
        reflection: string
    ) {
        if (MOCK_MODE || !openai) {
            return {
                title: mood > 2 ? "Great Momentum!" : "Solid Effort",
                pattern: "You are consistent with your logging.",
                reason: "Mock data: You completed " + completedCount + " tasks.",
                suggestion: "Plan tomorrow morning to keep rolling.",
                actionLabel: "Plan Tomorrow"
            };
        }

        const prompt = `
            User just finished their day.
            Mood (1-3): ${mood}
            Tasks: ${completedCount}/${totalCount} completed.
            Reflection: "${reflection}"
            
            Generate a short, punchy insight card JSON with:
            - title (e.g. "Flow State Detected" or "Grind Mode")
            - pattern (observation)
            - reason (why)
            - suggestion (actionable for tomorrow)
            - actionLabel (button text)
        `;

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini", // Faster, cheaper for frequent low-latency calls
                messages: [
                    { role: "system", content: "You are an empathetic, sharp productivity data analyst." },
                    { role: "user", content: prompt }
                ],
                response_format: { type: "json_object" },
                temperature: 0.7
            });

            return JSON.parse(response.choices[0].message.content || "{}");
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Analyzes weekly progress to generate the "Story of the Week".
     */
    static async generateWeeklyStory(weeksData: any): Promise<any> {
        if (MOCK_MODE || !openai) {
            return {
                title: "Keep Building",
                content: ["You are making steady progress. Persistence is key."],
                sentiment: "neutral"
            };
        }

        // Implementation for weekly story generation...
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "Write a 3-sentence narrative summary of this user's week based on the data. Be encouraging but real." },
                { role: "user", content: JSON.stringify(weeksData) }
            ],
            response_format: { type: "json_object" }
        });

        return JSON.parse(response.choices[0].message.content || "{}");
    }
}
