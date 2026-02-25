/**
 * Cross-Area Synergy API — GlowApplify
 * Detects synergies and conflicts between life areas using AI.
 * Powers the "Life System Optimization" feature.
 */

import { NextRequest, NextResponse } from 'next/server';
import { geminiClient, GEMINI_MODEL } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
    try {
        const { areas, okrs, habits, weeklyActions } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ connections: getFallbackConnections() });
        }

        const contextSummary = areas.map((area: any) => ({
            name: area.name,
            type: area.type,
            status: area.status,
            objective: area.objective,
            healthScore: area.healthScore,
            weeklyCompletion: area.weeklyCompletion,
        }));

        const prompt = `You are analyzing a person's complete life system across 8 areas.

CURRENT STATE OF ALL AREAS:
${JSON.stringify(contextSummary, null, 2)}

Your task: Identify the 3-5 most important cross-area connections.

For each connection, specify:
- sourceArea: which area drives the effect
- targetArea: which area receives the effect
- type: "synergy" (positive) | "conflict" (tension) | "dependency" (A enables B)
- description: Specific, evidence-based explanation (1-2 sentences)
- actionable: The single most important action to leverage this connection

Return as JSON array:
[
  {
    "sourceArea": "health",
    "targetArea": "career",
    "type": "synergy",
    "description": "Your readiness score correlates with deep work capacity.",
    "actionable": "Schedule deep work blocks after exercise, not before."
  }
]

Focus on HIGH-IMPACT connections backed by science. No generic observations.`;

        const response = await geminiClient.models.generateContent({
            model: GEMINI_MODEL,
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: {
                systemInstruction: `You are Bloom, GlowApplify's AI, analyzing a person's life as an integrated system.
                You see patterns across areas that the user cannot see alone. Be specific and evidence-based.
                Return valid JSON only.`,
                temperature: 0.6,
                maxOutputTokens: 1000,
                responseMimeType: 'application/json',
            },
        });

        const text = response.text || '[]';
        try {
            const connections = JSON.parse(text);
            return NextResponse.json({ connections });
        } catch {
            return NextResponse.json({ connections: getFallbackConnections() });
        }

    } catch (error: any) {
        console.error('Synergy detection error:', error);
        return NextResponse.json({ connections: getFallbackConnections() }, { status: 500 });
    }
}

function getFallbackConnections() {
    return [
        {
            sourceArea: 'health',
            targetArea: 'career',
            type: 'synergy',
            description: 'Sleep quality directly predicts cognitive performance and creative output. 7-9 hours enables peak deep work.',
            actionable: 'Protect your sleep window before optimizing work hours.',
        },
        {
            sourceArea: 'finances',
            targetArea: 'wellness',
            type: 'synergy',
            description: 'Financial stress is the #1 source of chronic anxiety. A 6-month emergency fund reduces background stress by ~40%.',
            actionable: 'Building your runway directly improves mental wellness baseline.',
        },
        {
            sourceArea: 'relationships',
            targetArea: 'wellness',
            type: 'dependency',
            description: 'Social connection is as vital for mental health as sleep. Loneliness has the same mortality risk as smoking 15 cigarettes/day.',
            actionable: 'Schedule 1 meaningful social interaction per week minimum.',
        },
    ];
}
