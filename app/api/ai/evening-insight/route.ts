
import { NextResponse } from 'next/server';
import { AIService } from '@/lib/ai/service';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { mood, completedCount, totalCount, reflection } = body;

        // TODO: Verify user session here in a real app

        if (mood === undefined || completedCount === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const insights = await AIService.generateEveningInsights(
            mood,
            completedCount,
            totalCount || 0,
            reflection || ""
        );

        return NextResponse.json(insights);

    } catch (error) {
        console.error('Error in evening-insight API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
