
import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Optional: Use edge for faster cold starts if supported

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { goal, constraint, timeframe, style, deepDive, language = 'es' } = body;

        // Construct a rich prompt based on user inputs
        const prompt = `
      Act as "Bloom", a world-class elite productivity coach.
      
      USER CONTEXT:
      - Goal: "${goal}"
      - Constraint: "${constraint}"
      - Timeframe: "${timeframe || '90 days'}"
      - Work Style: "${style || 'Flexible'}"
      - Deep Context: "${deepDive || 'N/A'}"
      
      YOUR TASK:
      Create a comprehensive, personalized execution system.
      
      CRITICAL RULES:
      1. LANGUAGE: You MUST response in ${language === 'es' ? 'SPANISH (Español)' : 'English'}. This is non-negotiable. Even the JSON keys should be compatible, but the CONTENT values must be Spanish.
      2. TONE: Encouraging, strategic, scientific, slightly gamified.
      3. OUTPUT FORMAT: valid JSON only.
      
      JSON STRUCTURE:
      {
        "vision": {
           "title": "Title of the goal",
           "motivation": "Why this matters (based on context)",
           "identity": "The new identity the user is building"
        },
        "strategy": {
           "phases": ["Phase 1 Name", "Phase 2 Name", "Phase 3 Name"],
           "focus": "The core lever to pull"
        },
        "executionBoard": {
           "columns": ["To Do", "In Progress", "Done"],
           "tasks": [
              {"id": "t1", "title": "Obtain your first customer", "tag": "Win", "priority": "urgent-important"},
              {"id": "t2", "title": "Define your offer", "tag": "Strategy", "priority": "important"},
              {"id": "t3", "title": "Setup landing page", "tag": "Tech", "priority": "low"}
           ]
        },
        "habits": {
           "morning": [
              {"title": "Meditation", "duration": 10},
              {"title": "Review Goals", "duration": 5}
           ],
           "evening": [
              {"title": "Plan Tomorrow", "duration": 5},
              {"title": "Reading", "duration": 30}
           ]
        },
        "calendar": {
           "blocks": [
              {"title": "Deep Work Block", "start": "09:00", "end": "11:00", "type": "DEEP_WORK_CREATIVE"},
              {"title": "Admin Block", "start": "13:00", "end": "14:00", "type": "ADMIN_SHALLOW"}
           ]
        }
      }
    `;

        // Check for API Key
        if (!process.env.OPENAI_API_KEY) {
            // Return mock data if no key (Dev mode fallback)
            console.warn("No OPENAI_API_KEY found. using mock response.");
            return NextResponse.json(getMockResponse(language, goal));
        }

        // Call OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: "system", content: "You are a helpful JSON API that outputs strictly in the requested language." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const result = JSON.parse(data.choices[0].message.content);

        return NextResponse.json(result);

    } catch (error) {
        console.error("Onboarding API Error:", error);
        return NextResponse.json({ error: "Failed to generate plan" }, { status: 500 });
    }
}

// Helper for Mock Data (Fast & Reliable testing)
function getMockResponse(lang: string, goal: string) {
    const isEs = lang === 'es';
    return {
        vision: {
            title: isEs ? `Plan Maestro para: ${goal}` : `Master Plan for: ${goal}`,
            motivation: isEs ? "Este plan está diseñado para superar tus obstáculos." : "This plan is designed to overcome your obstacles.",
            identity: isEs ? "Ejecutor de Alto Rendimiento" : "High Performance Executor"
        },
        strategy: {
            phases: isEs ? ["Fase 1: Fundación", "Fase 2: Aceleración", "Fase 3: Dominio"] : ["Phase 1: Foundation", "Phase 2: Acceleration", "Phase 3: Mastery"],
            focus: isEs ? "Consistencia Radical" : "Radical Consistency"
        },
        executionBoard: {
            columns: ["Backlog", "Doing", "Done"],
            tasks: [
                { id: "t1", title: isEs ? "Definir métricas de éxito" : "Define success metrics", tag: "Strategy" },
                { id: "t2", title: isEs ? "Primera sesión de trabajo profundo" : "First deep work session", tag: "Action" },
                { id: "t3", title: isEs ? "Crear cuenta de Stripe" : "Create Stripe account", tag: "Admin" }
            ]
        },
        habits: {
            morning: isEs
                ? [{ title: "Visualización", duration: 5 }, { title: "Revisar Tablero", duration: 5 }]
                : [{ title: "Visualization", duration: 5 }, { title: "Check Board", duration: 5 }],
            evening: isEs
                ? [{ title: "Desconexión digital", duration: 30 }, { title: "Planear mañana", duration: 5 }]
                : [{ title: "Digital disconnect", duration: 30 }, { title: "Plan tomorrow", duration: 5 }]
        },
        calendar: {
            blocks: [
                { title: isEs ? "Bloque de Trabajo Profundo" : "Deep Work Block", start: "08:00", end: "10:00", type: "DEEP_WORK_CREATIVE" }
            ]
        }
    };
}
