/**
 * AI Area Insight API — GlowApplify
 * Generates contextual, proactive AI insights for each life area.
 * This is Bloom (the AI copilot) speaking — specific, evidence-based, actionable.
 */

import { NextRequest, NextResponse } from 'next/server';
import { geminiClient, GEMINI_MODEL } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            areaType,
            areaName,
            objective,
            keyResults,
            weeklyActions,
            habits,
            healthScore,
            recentInsights,
            moduleData,
            allAreas,
            userMessage,
            mode = 'insight', // 'insight' | 'chat' | 'plan' | 'synergy'
        } = body;

        const systemPrompt = buildSystemPrompt(areaType, areaName);
        const userPrompt = buildUserPrompt({
            mode,
            areaType,
            areaName,
            objective,
            keyResults,
            weeklyActions,
            habits,
            healthScore,
            recentInsights,
            moduleData,
            allAreas,
            userMessage,
        });

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({
                insight: getFallbackInsight(areaType, mode),
                type: 'insight',
            });
        }

        const response = await geminiClient.models.generateContent({
            model: GEMINI_MODEL,
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.7,
                maxOutputTokens: 800,
                responseMimeType: mode === 'plan' ? 'application/json' : 'text/plain',
            },
        });

        const text = response.text || '';

        if (mode === 'plan') {
            try {
                const parsed = JSON.parse(text);
                return NextResponse.json(parsed);
            } catch {
                return NextResponse.json({ actions: [], insight: text });
            }
        }

        return NextResponse.json({
            insight: text.trim(),
            type: detectInsightType(text),
        });

    } catch (error: any) {
        console.error('Area insight error:', error);
        return NextResponse.json(
            { insight: "I'm analyzing your data. Try again in a moment.", type: 'insight' },
            { status: 500 }
        );
    }
}

function buildSystemPrompt(areaType: string, areaName: string): string {
    const areaPersonality: Record<string, string> = {
        finances: `You are Bloom's financial intelligence module. You think like a CFO and wealth strategist.
        Your insights blend Profit First, FIRE movement principles, behavioral economics, and long-term wealth building.
        Reference frameworks: Profit First, Freedom Number (4% rule), 3-bucket system, compound interest.`,

        health: `You are Bloom's health optimization module. You think like a sports scientist + physician.
        Your insights blend periodization science, sleep research (Walker), nutrition science, and HRV/readiness tracking.
        Reference frameworks: Readiness-based training, Walker's sleep protocol, Functional Movement, Periodization blocks.`,

        career: `You are Bloom's career and impact module. You think like a startup advisor + executive coach.
        Your insights blend Deep Work (Newport), OKR methodology, EOS, and legacy-focused leadership.
        Reference frameworks: Deep Work protocol, Eisenhower Matrix, The One Thing, EOS Rocks.`,

        relationships: `You are Bloom's relationship intelligence module. You think like a therapist and social scientist.
        Your insights blend Gottman research, Dunbar's circles, love languages, and intentional relationship investment.
        Reference frameworks: Gottman's bid-response, 3-circles model, Love Languages, quality vs quantity time.`,

        learning: `You are Bloom's knowledge acceleration module. You think like a learning scientist.
        Your insights blend spaced repetition, Feynman technique, Zettelkasten, and deliberate practice theory.
        Reference frameworks: Spaced repetition, Feynman technique, Zettelkasten, Skill T-model, Ebbinghaus curve.`,

        wellness: `You are Bloom's mental wellness module. You think like a clinical psychologist + mindfulness teacher.
        Your insights blend ACT, CBT principles, positive psychology, and cognitive resilience research.
        Reference frameworks: ACT (Hayes), CBT, Positive Psychology (Seligman PERMA), Cognitive defusion.`,

        creativity: `You are Bloom's creativity and flow module. You think like a creativity researcher and artist.
        Your insights blend Flow theory (Csikszentmihalyi), rest science (Pang), neuroplasticity, and creative constraint principles.
        Reference frameworks: Flow conditions, Creative constraints, Active rest, Deep play.`,

        growth: `You are Bloom's personal growth module. You think like a philosopher-coach.
        Your insights blend ACT values clarification, Stoic practice, Ikigai, and Identity-Based Habits (Clear).
        Reference frameworks: Values clarification (ACT), Stoic daily examination, Ikigai, Identity-based change.`,
    };

    return `You are Bloom, GlowApplify's AI copilot — the personal development equivalent of Cursor or Claude Code, but for someone's life.

ABOUT BLOOM:
- You are proactive, not reactive. You surface insights BEFORE the user asks.
- You are direct and evidence-based. No fluffy motivational platitudes.
- You connect data points across the user's life system, seeing what they can't see alone.
- You speak briefly and powerfully. 1-3 sentences for standard insights.
- You celebrate real wins specifically, not generically.
- You are the user's strategic advisor for their ${areaName} life area.

${areaPersonality[areaType] || 'You are a strategic life coach with expertise in this area.'}

TONE: Intelligent, warm, direct. Like a brilliant friend who knows you well.
LANGUAGE: Respond in the same language the user used (Spanish or English).
LENGTH: Keep insights to 2-4 sentences unless generating a plan.`;
}

function buildUserPrompt(params: Record<string, any>): string {
    const {
        mode,
        areaType,
        areaName,
        objective,
        keyResults,
        weeklyActions,
        habits,
        healthScore,
        recentInsights,
        moduleData,
        allAreas,
        userMessage,
    } = params;

    // Build context string
    const context = `
AREA: ${areaName} (${areaType})
HEALTH SCORE: ${healthScore || 'N/A'}/100
OBJECTIVE (OKR): ${objective || 'Not set'}
KEY RESULTS: ${keyResults?.map((kr: any) => `${kr.title}: ${kr.currentValue}/${kr.targetValue} ${kr.unit} (${kr.progress}%)`).join('\n') || 'None'}
WEEKLY ACTIONS: ${weeklyActions?.map((a: any) => `[${a.status === 'done' ? '✓' : '○'}] ${a.title}`).join('\n') || 'None'}
DAILY HABITS: ${habits?.map((h: any) => `${h.title} | Streak: ${h.streak} days`).join('\n') || 'None'}
${moduleData ? `AREA DATA: ${JSON.stringify(moduleData, null, 2)}` : ''}
${allAreas ? `OTHER LIFE AREAS: ${allAreas.map((a: any) => `${a.name}: ${a.status}`).join(', ')}` : ''}
`;

    if (mode === 'insight') {
        return `${context}

Generate a proactive insight for this life area. Look at the data holistically:
- What pattern do you notice (positive or concerning)?
- What should the user focus on this week?
- Is there a cross-area connection worth highlighting?

Keep it to 2-3 sentences. Be specific to their actual data. No generic advice.`;
    }

    if (mode === 'chat') {
        return `${context}

USER MESSAGE: "${userMessage}"

Respond as Bloom, their AI copilot for ${areaName}. Be direct, specific, actionable.
If they ask for help planning something, generate concrete next steps.
Always tie your response back to their actual objective and data.`;
    }

    if (mode === 'plan') {
        return `${context}

Generate a smart weekly action plan for this area.
Return as JSON with this structure:
{
  "insight": "Brief analysis of current state",
  "actions": [
    {
      "title": "Action title",
      "description": "Why this action matters",
      "estimatedMinutes": 30,
      "priority": 1
    }
  ],
  "habitSuggestion": "Optional: suggest 1 habit if none exist"
}

Generate 3-5 actions that will meaningfully move the objective forward this week.
Be specific and realistic based on the user's current performance.`;
    }

    if (mode === 'synergy') {
        return `${context}

Analyze this area's data alongside the other life areas.
Identify:
1. Synergies: How could improvements in OTHER areas boost THIS area?
2. Conflicts: Are there tensions between this area's demands and other areas?
3. The highest-leverage cross-area action (1 thing that would benefit multiple areas)

Keep response to 3-4 sentences. Be specific.`;
    }

    return `${context}\n\nProvide a brief coaching insight for this area.`;
}

function detectInsightType(text: string): string {
    const lower = text.toLowerCase();
    if (lower.includes('congratulations') || lower.includes('excellent') || lower.includes('impressive') ||
        lower.includes('great job') || lower.includes('logro') || lower.includes('increíble')) {
        return 'celebration';
    }
    if (lower.includes('warning') || lower.includes('concern') || lower.includes('declining') ||
        lower.includes('alerta') || lower.includes('preocupante')) {
        return 'warning';
    }
    if (lower.includes('suggest') || lower.includes('consider') || lower.includes('recommend') ||
        lower.includes('sugiero') || lower.includes('considera') || lower.includes('deberías')) {
        return 'suggestion';
    }
    if (lower.includes('connection') || lower.includes('synergy') || lower.includes('interrelacionado') ||
        lower.includes('conecta') || lower.includes('sinergia')) {
        return 'synergy';
    }
    return 'insight';
}

function getFallbackInsight(areaType: string, mode: string): string {
    if (mode === 'plan') return '{"insight": "Focus on your top priority this week.", "actions": [], "habitSuggestion": null}';

    const fallbacks: Record<string, string> = {
        finances: 'Your financial trajectory depends on your savings rate more than your income. Track your burn rate this week.',
        health: 'Sleep quality is the most underrated performance lever. Prioritize your sleep window before optimizing training.',
        career: 'Deep work sessions are your competitive advantage. Block 2-4 hour windows for your most strategic work.',
        relationships: 'The Harvard happiness study shows relationships predict longevity more than exercise. Who have you not connected with this week?',
        learning: 'Information without application is entertainment. For every concept you learn, define one concrete experiment to apply it.',
        wellness: 'Cognitive reframing is a trainable skill. Notice your automatic thoughts today — are they serving your goals?',
        creativity: 'Creative energy is renewable but requires active recovery. Your best ideas come during mental rest, not during work.',
        growth: 'Character is revealed under pressure. What values did you demonstrate today in a challenging situation?',
    };
    return fallbacks[areaType] || 'Focus on your highest-leverage action for this area today.';
}
