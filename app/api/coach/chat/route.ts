import { NextRequest, NextResponse } from 'next/server';
import { geminiClient, GEMINI_MODEL } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
    try {
        const { messages, context } = await req.json();

        // Build system prompt with context
        const systemPrompt = `You are Glow Coach, an elite personal development AI coach with deep expertise in productivity, goal achievement, and behavioral psychology. You are:

- **Direct and action-oriented**: Give specific, practical advice
- **Supportive but challenging**: Push users to grow while being empathetic
- **Context-aware**: You have access to the user's goals, tasks, habits, and progress
- **Brief**: Keep responses concise (2-3 sentences usually)
- **Motivational**: Use evidence-based motivation strategies

Current User Context:
${context.goal ? `Goal: ${context.goal}` : ''}
${context.tasksPending ? `Pending tasks: ${context.tasksPending}` : ''}
${context.tasksCompleted ? `Completed today: ${context.tasksCompleted}` : ''}
${context.streak ? `Current streak: ${context.streak} days` : ''}
${context.lastCheckIn ? `Last check-in: ${context.lastCheckIn}` : ''}

Remember: You're not just a chatbot. You're an accountability partner and strategic advisor. Challenge users when needed, celebrate wins, and always tie conversations back to their specific goals and execution.`;

        // Map messages to Gemini format
        const geminiMessages = messages.map((m: any) => ({
            role: m.role === 'assistant' ? 'model' : m.role,
            parts: [{ text: m.content }]
        }));

        const response = await geminiClient.models.generateContent({
            model: GEMINI_MODEL,
            contents: geminiMessages,
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.7,
                maxOutputTokens: 500
            }
        });

        const assistantMessage = response.text;

        return NextResponse.json({
            message: assistantMessage
        });
    } catch (error: any) {
        console.error('Coach chat error:', error);

        // Provide graceful fallback
        return NextResponse.json(
            {
                message: "I'm having trouble connecting right now. Let's try again in a moment.",
                error: error.message
            },
            { status: 500 }
        );
    }
}
