
import { NextResponse } from 'next/server';
import { genAI, GEMINI_MODEL } from '@/lib/ai/gemini';
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

        const response = await genAI.models.generateContent({
            model: GEMINI_MODEL,
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: {
                responseMimeType: 'application/json',
                temperature: 0.7
            }
        });

        const content = response.text;
        if (!content) {
            throw new Error('No content from Gemini');
        }

        const updates = JSON.parse(content);

        // Merge updates into the board
        const updatedBoard: ExecutionBoard = {
            ...board,
            ...updates,
            updatedAt: new Date().toISOString(),
        };

        return NextResponse.json({ success: true, board: updatedBoard, updates });

    } catch (error) {
        console.error('Board evolution error:', error);
        return NextResponse.json(
            { error: 'Failed to evolve board', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
