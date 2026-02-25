
import { NextResponse } from 'next/server';
import { genAI, GEMINI_MODEL } from '@/lib/ai/gemini';

export const runtime = 'nodejs'; // Use nodejs runtime for Gemini SDK if edge has issues, but either should work


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name,
            goal,
            goalCategory,
            timePerDay,
            energyPeak,
            scheduleConstraints,
            obstacles,
            futureSelfVision,
            language = 'es'
        } = body;

        // Construct a rich prompt based on user inputs
        const prompt = `
      Act as "Bloom", a world-class elite performance and execution coach. 
      Your mission is to transform a user's raw ambition into a military-grade execution system.
      
      USER DOSSIER:
      - Name: "${name}"
      - Primary Objective: "${goal}"
      - Area of Life: "${goalCategory}"
      - Daily Allocation: "${timePerDay}"
      - Circadian Peak (Energy): "${energyPeak}"
      - Grid Constraints: "${scheduleConstraints}"
      - Recorded Friction (Past Obstacles): "${obstacles.join(', ')}"
      - Projected Identity (Future Vision): "${futureSelfVision || 'N/A'}"
      
      CRITICAL OPERATIONAL RULES:
      1. LANGUAGE: Respond EXCLUSIVELY in ${language === 'es' ? 'SPANISH (Español)' : 'English'}.
      2. TONE: Elite, analytical, high-stakes, yet deeply encouraging. No corporate fluff.
      3. ARCHITECTURE: The system must be tactical and realistic. No generic advice.
      
      REQUIRED OUTPUT (JSON ONLY):
      {
        "vision": {
           "title": "A brief, powerful title for the 90-day mission",
           "motivation": "A 2-sentence emotional fuel injection based on the user's 'why'",
           "identity": "A 5-word mantra for their new identity (e.g., 'The Relentless Founder')"
        },
        "strategy": {
           "phases": [
              "Phase 1: Foundation (Days 1-30) - [Specific focus]",
              "Phase 2: Aggression (Days 31-60) - [Specific focus]",
              "Phase 3: Conquest (Days 61-90) - [Specific focus]"
           ],
           "focus": "The SINGLE most important lever to pull for 10x ROI"
        },
        "executionBoard": {
           "tasks": [
              {"id": "t1", "title": "[Most leveraged action]", "tag": "Strategic", "priority": "urgent-important"},
              {"id": "t2", "title": "[Critical infrastructure setup]", "tag": "Tactical", "priority": "important"},
              {"id": "t3", "title": "[Key relationship or outreach]", "tag": "Networking", "priority": "important"},
              {"id": "t4", "title": "[Systematization or learning]", "tag": "Growth", "priority": "low"}
           ]
        },
        "habits": {
           "morning": [
              {"title": "[Action for clarity]", "duration": 5},
              {"title": "[Action for momentum]", "duration": 15}
           ],
           "evening": [
              {"title": "[Action for closure/review]", "duration": 10},
              {"title": "[Digital wind down]", "duration": 20}
           ]
        },
        "calendar": {
           "blocks": [
              {"title": "Elite Focus: [Goal focus]", "start": "${energyPeak === 'morning' ? '08:00' : '14:00'}", "end": "${energyPeak === 'morning' ? '10:00' : '16:00'}", "type": "DEEP_WORK_CREATIVE"},
              {"title": "Tactical Logistics", "start": "13:00", "end": "14:00", "type": "ADMIN_SHALLOW"}
           ]
        }
      }
    `;

        // Check for API Key
        if (!process.env.GEMINI_API_KEY) {
            console.warn("No GEMINI_API_KEY found. using mock response.");
            return NextResponse.json(getMockResponse(language, goal));
        }

        // Call Gemini
        const response = await genAI.models.generateContent({
            model: GEMINI_MODEL,
            contents: [{ role: 'user', parts: [{ text: "Please generate my personalized execution system based on the provided inputs." }] }],
            config: {
                systemInstruction: prompt,
                responseMimeType: 'application/json',
                temperature: 0.7
            }
        });

        const result = JSON.parse(response.text || "{}");
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
