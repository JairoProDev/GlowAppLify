
import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { supabase } from '@/lib/supabase';
import { ExecutionBoard } from '@/lib/types';

// export const runtime = 'edge'; // Removed for stability until edge compatibility is verified

export async function POST(req: Request) {
    try {
        const { board, progressReport } = await req.json();

        if (!board || !progressReport) {
            return NextResponse.json(
                { error: 'Board and progress report are required' },
                { status: 400 }
            );
        }

        // Prompt for Evolution
        const prompt = `
You are Bloom AI, an expert execution coach.
The user has an existing Execution Board. Based on their Weekly Progress Report, you must EVOLVE their plan for the upcoming week.

CURRENT GOAL: ${board.goal_layer.smartGoal}
CURRENT PHASE: Week ${progressReport.weekNumber} of 12

PROGRESS REPORT:
- Completed Actions: ${progressReport.completedActions}/${progressReport.totalActions}
- Key Wins: ${progressReport.wins}
- Obstacles Encountered: ${progressReport.obstacles}
- Energy Level: ${progressReport.energy}

TASK:
1. Analyze the progress.
2. Update the "Execution Layer" for the NEXT week (Week ${progressReport.weekNumber + 1}).
3. Adjust the "Habits Layer" if energy was low or obstacles were high.
4. Keep the Vision and Goal layers stable unless failure is catastrophic.

OUTPUT FORMAT:
Return a partial JSON object containing ONLY the layers that need updates (e.g., "execution_layer" and "habits_layer").
The structure must match the ExecutionBoard TypeScript interface.
    `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
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

        const updates = JSON.parse(content);

        // Merge updates into the board
        const updatedBoard: ExecutionBoard = {
            ...board,
            ...updates,
            updatedAt: new Date().toISOString(),
        };

        // Save to Supabase (Mock save for now as we might need session handling)
        // In a real app, we'd update the row by ID
        // const { error } = await supabase.from('execution_boards').update(updatedBoard).eq('id', board.id);

        return NextResponse.json({ success: true, board: updatedBoard, updates });

    } catch (error) {
        console.error('Board evolution error:', error);
        return NextResponse.json(
            { error: 'Failed to evolve board', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
