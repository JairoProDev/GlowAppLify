import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ExecutionBoard } from '@/lib/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { goal, context, timeAvailable, obstacles } = body;

    if (!goal || goal.trim().length === 0) {
      return NextResponse.json(
        { error: 'Goal is required' },
        { status: 400 }
      );
    }

    // Create the prompt for ChatGPT
    const prompt = createBoardGenerationPrompt(goal, context, timeAvailable, obstacles);

    // Call ChatGPT API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using gpt-4o-mini to save costs ($5 budget)
      messages: [
        {
          role: 'system',
          content: 'You are an expert execution coach that helps people achieve their goals using a science-backed 5-layer framework. You create detailed, actionable execution boards that break down goals into daily micro-actions. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const boardData = JSON.parse(completion.choices[0].message.content || '{}');

    // Validate and structure the response
    const executionBoard: ExecutionBoard = {
      ...boardData,
      status: 'active',
      currentWeek: 1,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(executionBoard);
  } catch (error: any) {
    console.error('Error generating board:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate board' },
      { status: 500 }
    );
  }
}

function createBoardGenerationPrompt(
  goal: string,
  context?: string,
  timeAvailable?: string,
  obstacles?: string[]
): string {
  return `Generate a complete 90-day execution board for this goal: "${goal}"

Context: ${context || 'general'}
Time available per day: ${timeAvailable || '15-30 minutes'}
Previous obstacles: ${obstacles?.join(', ') || 'none mentioned'}

Create a JSON response with this EXACT structure (no additional text):

{
  "vision": {
    "identity": "I am a [future identity statement based on achieving this goal]",
    "mantra": "[3-5 word motivational phrase]",
    "futureImage": "[2-3 sentence vivid description of their future self after achieving this goal]"
  },
  "goal": {
    "statement": "[Rewrite their goal as a SMART goal - Specific, Measurable, Achievable, Relevant, Time-bound - with 90-day deadline]",
    "type": "[Choose ONE: Biology, Capital, Intellect, Legacy, Social, Spirit]",
    "kpis": [
      {
        "metric": "[measurable indicator]",
        "target": [numeric target],
        "unit": "[unit of measurement]"
      }
    ],
    "deadline": "[ISO date string 90 days from today]"
  },
  "execution": [
    {
      "weekNumber": 1,
      "focus": "[Theme/focus for week 1]",
      "days": {
        "Monday": [
          {
            "id": "w1-mon-1",
            "description": "[5-15 min micro-action]",
            "duration": "10 min",
            "isOneThingAction": true
          },
          {
            "id": "w1-mon-2",
            "description": "[another action]",
            "duration": "5 min",
            "isOneThingAction": false
          }
        ],
        "Tuesday": [...],
        "Wednesday": [...],
        "Thursday": [...],
        "Friday": [...],
        "Saturday": [...],
        "Sunday": [...]
      }
    }
  ],
  "obstacles": [
    {
      "description": "[Common obstacle for this type of goal]",
      "ifThenPlan": "IF [obstacle occurs], THEN I will [specific action]"
    }
  ],
  "habits": [
    {
      "type": "morning",
      "time": "7:00 AM",
      "description": "[Morning ritual to set up for success]"
    },
    {
      "type": "deepwork",
      "time": "9:00 AM",
      "description": "[Focused work block description]"
    },
    {
      "type": "evening",
      "time": "9:00 PM",
      "description": "[Evening reflection ritual]"
    }
  ]
}

Important guidelines:
1. Create ONLY the first 2 weeks of execution with daily actions (weeks 1-2)
2. Each day should have 3-5 micro-actions (5-15 minutes each)
3. Mark ONE action per day as "isOneThingAction": true (the highest impact)
4. Actions should be concrete, specific, and immediately actionable
5. Build progressive difficulty - week 1 easier than week 2
6. Create 3-5 obstacles with specific if-then plans
7. Make the vision inspiring and personal
8. Ensure the goal is actually achievable in 90 days
9. Return ONLY valid JSON, no markdown, no code blocks, no explanations`;
}
