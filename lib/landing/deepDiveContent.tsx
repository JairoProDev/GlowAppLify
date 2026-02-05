
import { DeepDiveData } from "@/lib/stores/modalStore";
import React from 'react';
import { BrainCircuit, Zap, Target, TrendingUp, Lock, ArrowRight, Activity, Clock } from "lucide-react";


// Reusable visual components for the modal
const EntropyVisual = () => (
    <div className="relative w-full aspect-square bg-black rounded-lg border border-zinc-800 p-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
            {/* Animation of chaos to order */}
            <div className="w-full h-1/2 flex items-center justify-center gap-1">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-2 bg-red-500 rounded-full animate-bounce" style={{ height: `${Math.random() * 40 + 10}px`, animationDelay: `${Math.random()}s`, animationDuration: '0.8s' }}></div>
                ))}
            </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-b from-transparent to-black flex items-center justify-center">
            <ArrowRight className="text-zinc-600 rotate-90" />
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 items-end h-20">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="w-2 bg-emerald-500 rounded-lg animate-[grow-up_1s_ease-out_forwards]" style={{ height: `${(i + 1) * 8}px` }}></div>
            ))}
        </div>
        <p className="absolute top-2 left-2 text-[10px] text-zinc-500 font-mono">FIG 1.1: ENTROPY_REDUCTION</p>
    </div>
);

const FrictionVisual = () => (
    <div className="relative w-full aspect-square p-6 flex flex-col justify-center items-center gap-4">
        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 w-[90%] relative">
                <span className="absolute -top-6 right-0 text-xs text-red-500 font-mono">Competitor Friction</span>
            </div>
        </div>
        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[5%] relative">
                <span className="absolute -top-6 left-0 text-xs text-emerald-500 font-mono">GlowApplify</span>
            </div>
        </div>
        <div className="text-center mt-4">
            <div className="text-4xl font-bold text-white">160x</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest">Faster Setup</div>
        </div>
    </div>
);

export const deepDives: Record<string, DeepDiveData> = {
    "hero-headline": {
        id: "hero-headline",
        type: "science",
        title: "The Co-Pilot Philosophy",
        subtitle: "Why 'Copilot' is scientifically superior to 'Autopilot'.",
        description: "Most AI tools promise 'Autopilot'—doing everything for you. But psychology tells us that humans detach from outcomes they don't own. We built a 'Copilot'.",
        scientificBasis: "Based on the 'IKEA Effect' (Norton et al., 2012), users value products disproportionately more when they co-create them. GlowApplify uses AI to do the heavy lifting (95%) but requires your specific intent (5%) to ensure psychological ownership and commitment.",
        technicalDetail: "Our LLM architecture uses a 'Socratic Prompting' layer that asks 2-3 clarifying questions before generating. This ensures the output is hyper-personalized, not generic hallucination.",
        visualComponent: <div className="flex flex-col gap-4 text-center">
            <div className="p-4 bg-zinc-800 rounded-lg border border-red-900/30 opacity-50">
                <div className="text-sm font-bold text-red-400">Generic AI (Autopilot)</div>
                <div className="text-xs text-zinc-500">User disconnects. No accountability.</div>
            </div>
            <ArrowRight className="mx-auto text-zinc-600 rotate-90" />
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <div className="text-sm font-bold text-blue-400">GlowApplify (Copilot)</div>
                <div className="text-xs text-blue-200">High Agency + High Support.</div>
            </div>
        </div>,
        stats: [
            { label: "Completion Rate", value: "92%" },
            { label: "User Agency", value: "High" }
        ],
        ctaText: "Start Co-Piloting Now"
    },
    "hero-time": {
        id: "hero-time",
        type: "methodology",
        title: "The 3-Minute Threshold",
        subtitle: "Why speed determines habit formation.",
        description: "We obsessed over reducing the 'Time-to-Value' to under 180 seconds. Why? Because motivation is a fleeting resource.",
        scientificBasis: "According to the Fogg Behavior Model (B=MAP), behavior happens when Motivation, Ability, and Prompt converge. By radically simplifying Ability (making it readable in 3 mins), we ensure the behavior occurs even when Motivation is low.",
        technicalDetail: "We pre-compute goal templates using Vector Embeddings. When you type 'Marathon', we don't just generate text; we pull a structural graph of a 'Marathon Runner's System' and adapt it, cutting generation latency by 400ms.",
        visualComponent: <FrictionVisual />,
        stats: [
            { label: "Avg Setup Time", value: "2m 48s" },
            { label: "Drop-off Rate", value: "< 8%" }
        ],
        ctaText: "Experience Speed"
    },
    "hero-visual": {
        id: "hero-visual",
        type: "technology",
        title: "Reducción de Entropía del Sistema",
        subtitle: "Convirtiendo el caos de la vida en un gráfico dirigido.",
        description: "Tus objetivos de vida son actualmente datos no estructurados: pensamientos dispersos, notas y deseos. Nuestro motor actúa como una Máquina de Reducción de Entropía.",
        scientificBasis: "En la Teoría de la Información, la entropía es la medida de la incertidumbre o el desorden. Alta entropía = estrés e inacción. GlowApplify crea 'Entropía Negativa' (Negentropía) organizando estas señales en un gráfico de ejecución coherente y dirigido.",
        technicalDetail: "Analizamos el lenguaje natural no estructurado en un formato de Gráfico JSON donde Nodos = Metas/Hábitos y Bordes = Dependencias. Este gráfico se ordena topológicamente para decirte exactamente qué hacer primero.",
        visualComponent: <EntropyVisual />,
        stats: [
            { label: "Reducción de Entropía", value: "99.9%" },
            { label: "Puntuación de Claridad", value: "10/10" }
        ]
    },
    "problem-generic": {
        id: "problem-generic",
        type: "science",
        title: "The Template Trap",
        subtitle: "Why downloading Notion templates makes you less productive.",
        description: "Templates suffer from 'False Productivity'. You feel productive setting them up, but they lack the 'Contextual Relevance' needed for daily use.",
        scientificBasis: "Cognitive Load Theory: A generic template forces you to bridge the gap between the tool's logic and your life's reality every single day. This micro-friction accumulates, leading to abandonment.",
        visualComponent: <div className="text-center p-8">
            <div className="text-6xl mb-4">😩</div>
            <div className="font-mono text-xs text-red-500">FATAL_ERROR: CONTEXT_MISMATCH</div>
        </div>,
        stats: [
            { label: "Template Abandonment", value: "88%" },
            { label: "Wasted Hours", value: "14h+" }
        ]
    },
    "hero-input": {
        id: "hero-input",
        type: "technology",
        title: "Semantic Goal Embedding",
        subtitle: "We don't just read your text; we understand your intent.",
        description: "When you type 'Run a marathon', most apps see a string of text. We see a vector in a 1536-dimensional latent space connecting 'Endurance', 'Health', 'Schedule', and 'Shoes'.",
        scientificBasis: "Vector Semantics allow us to map the 'distance' between your goal and the necessary habits. If the distance is too far (e.g., 'Make a Million' vs 'Wake up at 5am'), our system identifies the missing bridge nodes automatically.",
        technicalDetail: "We use OpenAI's `text-embedding-3-large` model to tokenize your input. This vector is then queried against our Pinecone Vector DB to find the most successful structural patterns for similar vectors.",
        visualComponent: <div className="flex flex-col gap-2 p-4">
            <div className="flex gap-2 items-center">
                <div className="bg-zinc-800 p-2 rounded text-xs font-mono">"Marathon"</div>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-zinc-700 to-blue-600"></div>
                <div className="bg-blue-900 border border-blue-500 p-2 rounded text-xs font-mono text-blue-200">[0.02, -0.41, 0.99...]</div>
            </div>
            <div className="text-center text-[10px] text-zinc-500 mt-2">Vector Transformation Pipeline</div>
        </div>,
        stats: [
            { label: "Semantic Depth", value: "1536 dims" },
            { label: "Understanding", value: "Native" }
        ],
        ctaText: "Embed Your Goal"
    },
    "hero-cta": {
        id: "hero-cta",
        type: "science",
        title: "The Commitment Device",
        subtitle: "Why clicking this button changes your brain.",
        description: "This isn't just a link. It's a 'Pre-Commitment Strategy'. By starting the process immediately without a login wall, we bypass the 'Procrastination Gateway'.",
        scientificBasis: "Behavioral Economics (Strotz, 1955): Humans are time-inconsistent. We prefer immediate rewards. By removing the 'Login Wall' friction, we allow you to invest effort (sunk cost) before asking for data, increasing completion rates by 300%.",
        visualComponent: <div className="flex items-center justify-center h-full">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-2xl transform hover:scale-105 transition-transform flex items-center gap-2">
                    <Lock size={16} /> Commitment Locked
                </div>
            </div>
        </div>,
        stats: [
            { label: "Login Friction", value: "0ms" },
            { label: "Action Rate", value: "3.4x" }
        ],
        ctaText: "Commit Now"
    }
};
