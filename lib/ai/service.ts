
import { geminiClient, GEMINI_MODEL } from './gemini';
import { Action, Week } from '@/lib/types'; // Existing types

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
        if (!process.env.GEMINI_API_KEY) {
            console.warn("AI Service running in MOCK mode (No Gemini API Key)");
            return {
                title: "Complete the most urgent pending task",
                reasoning: "Focus on your most impactful pending action to maintain momentum."
            };
        }

        try {
            const response = await geminiClient.models.generateContent({
                model: GEMINI_MODEL,
                contents: [
                    {
                        role: "user",
                        parts: [{
                            text: `Analyze the user's unfinished tasks and goal. Identify the SINGLE most high-impact action for tomorrow. 
                            
                            CONTEXT:
                            Goal: ${context.goal}
                            Pending Tasks: ${context.incompleteTasks.map(t => t.title).join(', ')}
                            Mood Trend (Last 7 days): ${context.moodTrend.join(', ')}
                            
                            Return a JSON object with "title" and "reasoning".`
                        }]
                    }
                ],
                config: {
                    systemInstruction: "You are an elite productivity coach.",
                    responseMimeType: 'application/json',
                    temperature: 0.7
                }
            });

            const content = response.text;
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
        if (!process.env.GEMINI_API_KEY) {
            return {
                title: mood > 2 ? "Great Momentum!" : "Solid Effort",
                pattern: "You are consistent with your logging.",
                reason: "You completed " + completedCount + " tasks today.",
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
            const response = await geminiClient.models.generateContent({
                model: GEMINI_MODEL,
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                config: {
                    systemInstruction: "You are an empathetic, sharp productivity data analyst.",
                    responseMimeType: 'application/json',
                    temperature: 0.7
                }
            });

            return JSON.parse(response.text || "{}");
        } catch (error) {
            console.error("Gemini Insight Error:", error);
            return null;
        }
    }

    /**
     * Analyzes weekly progress to generate the "Story of the Week".
     */
    static async generateWeeklyStory(weeksData: any): Promise<any> {
        if (!process.env.GEMINI_API_KEY) {
            return {
                title: "Keep Building",
                content: ["You are making steady progress. Persistence is key."],
                sentiment: "neutral"
            };
        }

        try {
            const response = await geminiClient.models.generateContent({
                model: GEMINI_MODEL,
                contents: [
                    {
                        role: "user",
                        parts: [{
                            text: `Write a 3-sentence narrative summary of this user's week based on the data. Be encouraging but real. Return JSON with "title", "content" (array of strings), and "sentiment".
                            
                            WEEK DATA:
                            ${JSON.stringify(weeksData)}`
                        }]
                    }
                ],
                config: {
                    responseMimeType: 'application/json',
                    temperature: 0.7
                }
            });

            return JSON.parse(response.text || "{}");
        } catch (error) {
            console.error("Gemini Weekly Story Error:", error);
            return null;
        }
    }
}
