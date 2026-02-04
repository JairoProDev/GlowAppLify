import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { supabase } from '@/lib/supabase';
import { ExecutionBoard } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { goal, context, pastAttempts, futureSelf } = body;

    if (!goal) {
      return NextResponse.json(
        { error: 'Goal is required' },
        { status: 400 }
      );
    }

    // Construct the prompt based on the revolutionary spec
    const prompt = `
You are Bloom AI, an expert execution coach trained in behavioral science.

CONTEXT:
Goal: ${goal}
Time Available: ${context?.timePerDay || '1 hour'} per day
Energy Level: ${context?.energyLevel || 'Medium'}
Past Obstacles: ${pastAttempts?.obstacles?.join(', ') || 'None specified'}
Future Vision: ${futureSelf?.vision || 'To achieve this goal successfully'}

TASK:
Generate a complete 5-layer Execution Board JSON.

CRITICAL RULES:
1. Everything must be SPECIFIC to this user's context.
2. Use their exact words from Future Self vision where appropriate.
3. Consider their time constraint.
4. Address their past obstacles in the Obstacle Layer.
5. Break goal into 12 realistic weekly themes.
6. Each action must be concrete (verb + deliverable + time).
7. If-then plans must be actionable.

RETURN ONLY VALID JSON matching this exact structure:
{
  "vision_layer": {
    "futureVision": "Expand their vision into 2-3 vivid sentences, present tense",
    "mantra": "Create 5-7 word mantra"
  },
  "goal_layer": {
    "smartGoal": "Make their goal SMART",
    "deadline": "90 days from today (YYYY-MM-DD)",
    "kpis": [
      { "metric": "Input metric", "target": "Number", "deadline": "30 days from now" },
      { "metric": "Process metric", "target": "Number", "deadline": "60 days from now" },
      { "metric": "Output metric", "target": "Number", "deadline": "90 days from now" }
    ]
  },
  "execution_layer": {
    "weeks": [
      {
        "weekNumber": 1,
        "theme": "Specific theme",
        "milestone": "Concrete deliverable",
        "actions": [
          {
            "day": 1,
            "action": "[Verb] [specific deliverable]",
            "time": "[realistic hours]",
            "timeOfDay": "morning" | "afternoon" | "evening"
          }
          // extensive list for the week (5-7 actions)
        ]
      }
      // Generate only first 4 weeks in detail for brevity, summarize others if needed or generate all 12
    ]
  },
  "obstacle_layer": {
    "plans": [
      {
        "if": "Specific obstacle from their past or generic ones",
        "then": ["Concrete action 1", "Concrete action 2"]
      }
    ]
  },
  "habits_layer": {
    "morning": { "time": "08:00", "duration": "15 min", "steps": ["Step 1", "Step 2"] },
    "deepWork": { "time": "10:00", "duration": "90 min", "steps": ["Step 1"], "rules": ["No phone"] },
    "evening": { "time": "20:00", "duration": "15 min", "steps": ["Step 1"] }
  }
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // Use a smart model regarding instruction following
      messages: [
        { role: "system", content: "You are a helpful assistant that outputs JSON only." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content from OpenAI');
    }

    const generatedBoard = JSON.parse(content);

    // Add metadata
    const board: ExecutionBoard = {
      ...generatedBoard,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      // Ensure weeks logic is sound (maybe generate full 12 weeks ideally, but for token limits we might do batches. 
      // For now, let's assume the prompt returns what fits. The prompt asked for "complete" but note about brevity.
      // If the prompt returns fewer weeks, UI should handle it.
    };

    // Attempt to save to Supabase
    try {
      const { error } = await supabase
        .from('execution_boards')
        .insert([board]); // This relies on table existing and matching columns or JSON column

      if (error) {
        console.error('Supabase save error (non-fatal):', error);
        // We continue to return the board even if save fails (for MVP/No-Auth flow)
      }
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
    }

    return NextResponse.json({ success: true, board });

  } catch (error) {
    console.error('Board generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate board', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
