import { NextRequest, NextResponse } from 'next/server';
import { genAI, GEMINI_MODEL } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
    try {
        const { tasks, goal, context } = await req.json();

        if (!tasks || tasks.length === 0) {
            return NextResponse.json({
                error: 'No tasks provided'
            }, { status: 400 });
        }

        const systemPrompt = `You are an elite productivity strategist specializing in task prioritization using the Eisenhower Matrix and GTD methodology.

Analyze the provided tasks and return a prioritization strategy with specific recommendations.

Consider:
- Urgency vs Importance (Eisenhower Matrix)
- Energy requirements and time of day
- Dependencies between tasks
- User's main goal alignment
- Momentum and psychological wins

Return JSON with:
{
  "prioritizedTasks": [
    {
      "taskId": "id",
      "newPriority": "urgent" | "important" | "secondary",
      "reasoning": "why this priority"
    }
  ],
  "recommendations": {
    "firstTask": "title of task to start with",
    "reasoning": "why this should be first",
    "schedule": ["morning task", "afternoon task", "evening task"]
  },
  "insights": "2-3 sentence strategic insight about their task list"
}`;

        const userPrompt = `User's Goal: ${goal || 'Not specified'}

Context: ${context || 'No additional context'}

Tasks to prioritize:
${tasks.map((t: any, i: number) => `${i + 1}. ${t.title}
   Current Priority: ${t.priority || 'none'}
   Status: ${t.status}
   Tags: ${t.tags?.join(', ') || 'none'}
   ${t.description ? `Description: ${t.description}` : ''}`).join('\n\n')}

Analyze and prioritize these tasks strategically.`;

        const response = await genAI.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { role: 'user', parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }
            ],
            config: {
                responseMimeType: 'application/json',
                temperature: 0.7
            }
        });

        const result = JSON.parse(response.text || '{}');

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Task prioritization error:', error);
        return NextResponse.json(
            {
                error: 'Failed to prioritize tasks',
                message: error.message
            },
            { status: 500 }
        );
    }
}
