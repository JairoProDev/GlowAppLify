
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
    <div className="relative w-full aspect-square p-8 flex flex-col justify-center items-center gap-8 bg-black/40 rounded-xl border border-zinc-800/50">
        <div className="w-full space-y-6">
            <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-red-500 uppercase tracking-tighter">
                    <span>Competitor Setup</span>
                    <span>90% Friction</span>
                </div>
                <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-[90%] relative">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[slide_2s_linear_infinite]"></div>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-emerald-500 uppercase tracking-tighter">
                    <span>GlowApplify</span>
                    <span>5% Friction</span>
                </div>
                <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 w-[5%] shadow-[0_0_15px_rgba(16,185,129,0.4)]"></div>
                </div>
            </div>
        </div>
        <div className="text-center">
            <div className="text-5xl font-black text-white tracking-tighter animate-pulse">160x</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-1">Faster Velocity</div>
        </div>
    </div>
);

const HabitMigrationVisual = () => (
    <div className="relative w-full aspect-square bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden p-6 flex flex-col items-center justify-between">
        <div className="w-full flex justify-between items-center px-4">
            <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-red-900/20 border border-red-500/30 flex items-center justify-center text-red-500">
                    <BrainCircuit size={20} />
                </div>
                <span className="text-[9px] font-mono text-zinc-500">PFC (WILL)</span>
            </div>
            <div className="flex-1 flex justify-center">
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: `${i * 0.2}s` }}></div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-900/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                    <Zap size={20} />
                </div>
                <span className="text-[9px] font-mono text-zinc-500">BASAL (AUTO)</span>
            </div>
        </div>

        <div className="relative w-full h-32 bg-zinc-900/50 rounded-lg border border-zinc-800 flex items-center justify-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.5),transparent)]"></div>
            <div className="text-center z-10">
                <div className="text-2xl font-bold text-white mb-1 tracking-tighter">MIGRATION_ACTIVE</div>
                <div className="text-[10px] text-blue-400 font-mono">NEURAL_PATHWAY_STRENGTH: 94%</div>
            </div>
            {/* Moving particles */}
            {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute w-1 h-1 bg-blue-400 rounded-full animate-[move-right_2s_infinite]"
                    style={{
                        top: `${20 + i * 10}%`,
                        left: '10%',
                        animationDelay: `${i * 0.3}s`,
                        opacity: 0.5
                    }}></div>
            ))}
        </div>

        <div className="w-full grid grid-cols-2 gap-2">
            <div className="bg-zinc-900 p-2 rounded border border-zinc-800 text-center">
                <div className="text-[8px] text-zinc-500 uppercase">Effort</div>
                <div className="text-sm font-bold text-red-400">Low</div>
            </div>
            <div className="bg-zinc-900 p-2 rounded border border-zinc-800 text-center">
                <div className="text-[8px] text-zinc-500 uppercase">Durability</div>
                <div className="text-sm font-bold text-emerald-400">High</div>
            </div>
        </div>
    </div>
);

const DecisionFatigueVisual = () => (
    <div className="relative w-full aspect-square bg-zinc-950 rounded-xl border border-zinc-800 p-6 flex flex-col gap-6">
        <div className="relative h-40 w-full border-b border-l border-zinc-800">
            {/* The "Them" line - dropping fast */}
            <svg className="absolute inset-0 w-full h-full overflow-visible">
                <path d="M 0 20 Q 50 40 100 120 T 200 140" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" className="animate-[draw_2s_ease-out_forwards]" />
                <path d="M 0 20 Q 50 20 100 25 T 200 30" fill="none" stroke="#10b981" strokeWidth="3" className="animate-[draw_2s_ease-out_forwards]" />
            </svg>
            <div className="absolute top-4 left-4 text-[9px] text-emerald-500 font-mono">GlowApplify (Focus)</div>
            <div className="absolute bottom-4 right-4 text-[9px] text-red-500 font-mono">Standard (Fatigue)</div>
        </div>

        <div className="flex-1 flex flex-col justify-end gap-2">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <div className="text-[10px] text-zinc-500 tracking-widest uppercase">Energy Remaining</div>
                    <div className="flex items-center gap-2">
                        <div className="w-32 h-4 bg-zinc-900 rounded-sm border border-zinc-800 overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[88%] animate-pulse"></div>
                        </div>
                        <span className="text-sm font-bold text-white">88%</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-white">14:00</div>
                    <div className="text-[8px] text-zinc-500 uppercase">Peak Performance</div>
                </div>
            </div>
        </div>
    </div>
);

const GoalGraphVisual = () => (
    <div className="relative w-full aspect-square bg-black rounded-xl border border-zinc-800 p-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(#1e1e2e_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>

        <svg className="absolute inset-0 w-full h-full">
            <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3f3f46" />
                </marker>
            </defs>
            {/* Connecting lines */}
            <line x1="50%" y1="20%" x2="30%" y2="50%" stroke="#3f3f46" markerEnd="url(#arrow)" />
            <line x1="50%" y1="20%" x2="70%" y2="50%" stroke="#3f3f46" markerEnd="url(#arrow)" />
            <line x1="30%" y1="50%" x2="30%" y2="80%" stroke="#3f3f46" markerEnd="url(#arrow)" />
            <line x1="70%" y1="50%" x2="70%" y2="80%" stroke="#3f3f46" markerEnd="url(#arrow)" />
        </svg>

        {/* Root Node */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400 z-10">
            <Target size={24} />
            <div className="absolute -bottom-6 text-[8px] font-bold text-white uppercase whitespace-nowrap">Identity Goal</div>
        </div>

        {/* Level 1 Nodes */}
        <div className="absolute top-[45%] left-[20%] w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-400 border border-zinc-800 z-10 hover:border-blue-500/50 transition-colors">
            <Zap size={16} />
            <div className="absolute -bottom-5 text-[7px] text-zinc-500 uppercase whitespace-nowrap">Habit A</div>
        </div>
        <div className="absolute top-[45%] left-[68%] w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-400 border border-zinc-800 z-10">
            <Activity size={16} />
            <div className="absolute -bottom-5 text-[7px] text-zinc-500 uppercase whitespace-nowrap">Habit B</div>
        </div>

        {/* Level 2 Nodes (Daily Tasks) */}
        <div className="absolute bottom-[10%] left-[24%] w-8 h-8 bg-zinc-900 rounded flex items-center justify-center text-zinc-600 border border-zinc-800 z-10">
            <Clock size={12} />
        </div>
        <div className="absolute bottom-[10%] left-[64%] w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white border border-blue-300 z-10 animate-pulse">
            <Clock size={12} />
            <div className="absolute -bottom-4 text-[7px] text-blue-400 uppercase font-bold">Now</div>
        </div>
    </div>
);

export const deepDivesEn: Record<string, DeepDiveData> = {
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
        title: "System Entropy Reduction",
        subtitle: "Turning the chaos of life into a directed graph.",
        description: "Your life goals are currently unstructured data—scattered thoughts, notes, and desires. Our engine acts as an Entropy Reduction Machine.",
        scientificBasis: "In Information Theory, entropy is the measure of uncertainty or disorder. High entropy = stress and inaction. GlowApplify creates 'Negative Entropy' (Negentropy) by organizing these signals into a coherent, directed execution graph.",
        technicalDetail: "We parse unstructured natural language into a JSON Graph format where Nodes = Goals/Habits and Edges = Dependencies. This graph is then topologically sorted to tell you exactly what to do first.",
        visualComponent: <EntropyVisual />,
        stats: [
            { label: "Entropy Reduction", value: "99.9%" },
            { label: "Clarity Score", value: "10/10" }
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
    },
    "problem-habits": {
        id: "problem-habits",
        type: "methodology",
        title: "The Haber-Bosch of Habits",
        subtitle: "Why 'willpower' is a non-renewable resource.",
        description: "You rely on willpower to start habits. But willpower depletes like a battery (Ego Depletion). We build systems that run on 'automaticity'.",
        scientificBasis: "Basal Ganglia vs Prefrontal Cortex: Habits live in the Basal Ganglia (low energy). New actions live in the PFC (high energy). We migrate your goals from PFC to Basal Ganglia using 'Micro-Scripts'.",
        technicalDetail: "We use a 'Prompt Steerage' technique that breaks macro-goals into actions requiring < 2 minutes. This minimizes PFC activation and accelerates habit encoding in the basal ganglia.",
        visualComponent: <HabitMigrationVisual />,
        stats: [
            { label: "Energy Cost", value: "-80%" },
            { label: "Retention", value: "+300%" }
        ]
    },
    "problem-reactive": {
        id: "problem-reactive",
        type: "science",
        title: "Decision Fatigue Prophylaxis",
        subtitle: "Saving your brain for the decisions that matter.",
        description: "The average human makes 35,000 decisions a day. By 2pm, your 'decision quality' plummets. We automate the trivial decisions (what to do next) so you can focus on the vital ones.",
        scientificBasis: "Decision Fatigue (Baumeister): As you make choices, your ability to make good choices deteriorates. GlowApplify acts as an 'External Executive Function', handling the scheduling logistics for you.",
        technicalDetail: "Our engine uses a 'Constraint Satisfaction Solver' to pre-optimize your calendar based on your historical peak focus times, eliminating the 'What should I do now?' choice entirely.",
        visualComponent: <DecisionFatigueVisual />,
        stats: [
            { label: "Cognitive Load", value: "Minimal" },
            { label: "Focus Duration", value: "4h+" }
        ]
    },
    "problem-stagnation": {
        id: "problem-stagnation",
        type: "technology",
        title: "The Feedback Loop Vacuum",
        subtitle: "Why you quit when you don't see results.",
        description: "Progress is often invisible in the short term. Without 'Feedback', the brain assumes failure. We visualize the invisible micro-wins to keep dopamine flowing.",
        scientificBasis: "Operant Conditioning: Behavior must be reinforced to persist. We use 'Variable Ratio Schedules' (like slot machines) to reinforce positive habit execution with visual feedback.",
        technicalDetail: "We implement 'Victory Vectoring', which tracks secondary metrics (e.g., consistency over intensity) to provide valid positive feedback even on low-performance days.",
        visualComponent: <div className="p-8 flex items-center justify-center">
            <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border-4 border-zinc-800"></div>
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin-slow"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <TrendingUp className="text-emerald-500 mb-2" size={32} />
                    <span className="text-2xl font-bold text-white">96%</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Momentum</span>
                </div>
            </div>
        </div>,
        stats: [
            { label: "Dopamine", value: "Optimized" },
            { label: "Quit Rate", value: "<5%" }
        ]
    },
    "solution-onboarding": {
        id: "solution-onboarding",
        type: "science",
        title: "Socratic Initialization",
        subtitle: "The AI that asks the right questions.",
        description: "We don't just take your order. We interrogate your constraints. 'Why do you want this?' 'What stopped you before?' This extracts the 'Latent Variables' of your success.",
        scientificBasis: "Maieutics (Socratic Method): Truth is born from questioning. By forcing you to articulate constraints, we vector-embed your 'Reality' into the plan, not just your 'Fantasy'.",
        technicalDetail: "We use Recursive LLM Refinement. The system generates a hypothesis of your constraints and then asks a targeted question to confirm or invalidate that specific vector coordinate.",
        visualComponent: <div className="p-6 bg-zinc-900 rounded-xl font-mono text-xs border border-zinc-800">
            <div className="text-zinc-500 mb-4 pb-2 border-b border-zinc-800">INITIATING_STRUCTURED_INTERROGATION</div>
            <div className="space-y-3">
                <div className="flex gap-2 text-blue-400">
                    <span className="opacity-50">#</span>
                    <span>Q: "Define 'Marathon' context. Competitive or Completion?"</span>
                </div>
                <div className="flex gap-2 text-white">
                    <span className="opacity-50">&gt;</span>
                    <span>Completion. I just want to finish.</span>
                </div>
                <div className="flex gap-2 text-emerald-400">
                    <span className="opacity-50">!</span>
                    <span>ADJUSTING_INTENSITY: 4 &rarr; 2. ADDING_RECOVERY: +15%</span>
                </div>
            </div>
        </div>
    },
    "solution-goals": {
        id: "solution-goals",
        type: "technology",
        title: "Hierarchical Goal Vectorization",
        subtitle: "Connecting the 'Big Picture' to 'Tuesday Morning'.",
        description: "Most apps treat tasks as isolated lists. We treat them as a Directed Acyclic Graph (DAG) grounded in your Identity.",
        scientificBasis: "Identity-Based Habits (Clear): You don't 'run'. You 'are a runner'. We link the micro-action (put on shoes) to the macro-identity (Athlete) using semantic edges in our graph DB.",
        technicalDetail: "Our backend constructs a Neo4j-inspired graph structure where top-level nodes are IDENTITIES, middle nodes are GOALS, and leaf nodes are ACTIONS, ensuring semantic alignment across all levels.",
        visualComponent: <GoalGraphVisual />,
        stats: [
            { label: "Alignment", value: "100%" },
            { label: "Purpose", value: "High" }
        ]
    },
    "solution-execution": {
        id: "solution-execution",
        type: "methodology",
        title: "Implementation Intentions",
        subtitle: "The algorithm that guarantees action.",
        description: "We don't say 'Do X'. We say 'When Y happens, Do X'. This 'If-Then' logic pre-loads the decision into your environment.",
        scientificBasis: "Gollwitzer's Implementation Intentions: Specifying the 'When' and 'Where' increases success rates by 2x-3x. We auto-generate these triggers for every task.",
        technicalDetail: "Every generated task is assigned a 'Trigger Manifest'—a set of environmental and time-based conditions that must be met, creating a hardware-like 'Interrupt' in your daily routine.",
        visualComponent: <div className="relative w-full aspect-square flex flex-col items-center justify-center gap-4 bg-zinc-950 rounded-xl border border-zinc-800">
            <div className="flex gap-4">
                <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 text-zinc-500 font-mono text-xs">IF_NOT_X</div>
                <ArrowRight className="text-zinc-700" />
                <div className="p-4 bg-blue-600 rounded-lg border border-blue-400 text-white font-bold text-xs shadow-[0_0_15px_rgba(37,99,235,0.3)]">THEN_Y</div>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">AUTOMATIC_TRIGGER_ENCODED</div>
        </div>
    },
    "solution-progress": {
        id: "solution-progress",
        type: "science",
        title: "Visual Progress Salience",
        subtitle: "Making 1% improvement visible.",
        description: "The 'Compound Effect' is boring because it's slow. We accelerate the perception of progress by visualizing derivative growth, not just absolute values.",
        scientificBasis: "Salience Bias: We overvalue what we can see. By making micro-progress 'Salient', we hack your bias to work FOR you, not against you.",
        technicalDetail: "We use 'Temporal Zooming' in our charts—scaling the Y-axis based on the last 7 days of variance rather than absolute zero, making a 1% shift appear visually significant and rewarding.",
        visualComponent: <div className="w-full aspect-square bg-black rounded-xl border border-zinc-800 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div className="text-xl font-bold text-white tracking-tighter">+1.2% Daily Gain</div>
                <TrendingUp size={24} className="text-emerald-500" />
            </div>
            <div className="h-32 flex items-end gap-1">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className={`flex-1 rounded-t-sm transition-all duration-1000 ${i === 11 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] h-[90%]' : 'bg-zinc-800 h-[20%]'}`}
                        style={{ height: `${20 + i * (i === 11 ? 6 : 2)}%` }}></div>
                ))}
            </div>
        </div>
    },
    "how-step1": {
        id: "how-step1",
        type: "technology",
        title: "Context Injection",
        subtitle: "Dumping your brain into the vector store.",
        description: "Forget structured forms. Just talk. We use LLMs to clean, normalize, and structure your messy thoughts into a rigorous data schema.",
        scientificBasis: "Natural Language Processing (NLP): We use Named Entity Recognition (NER) to extract 'Time', 'Duration', 'Intensity', and 'Constraint' entities from your raw stream of consciousness.",
        technicalDetail: "Our pipeline uses a two-stage extraction: first, a specialized 'De-noising' LLM removes filler words; second, a 'Schema Mapper' converts valid entities into our internal LifeJSON format.",
        visualComponent: <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 font-mono text-[10px] space-y-4">
            <div className="text-zinc-500">INPUT: "I want to exercise but I'm busy with kids until 8pm."</div>
            <div className="flex items-center gap-2">
                <ArrowRight className="text-blue-500 h-3 w-3" />
                <div className="bg-blue-900/20 text-blue-400 p-2 rounded border border-blue-500/30">
                    {"{ goal: 'fitness', constraints: ['parenting'], buffer: '2000' }"}
                </div>
            </div>
            <div className="text-blue-500 text-[8px] animate-pulse">VECTOR_STORE_SYNC: COMPLETED</div>
        </div>
    },
    "how-step2": {
        id: "how-step2",
        type: "technology",
        title: "Generative Planning Engine",
        subtitle: "A thousand simulations in 3 seconds.",
        description: "We simulate your week before you live it. We check for conflicts, energy dips, and realistic buffers. It's 'Monte Carlo Simulation' for your calendar.",
        scientificBasis: "Constraint Satisfaction Problem (CSP): Parenting + Work + Gym is a math problem. We solve it using a CSP solver optimized for human energy levels, not just time slots.",
        technicalDetail: "We use an 'Evolutionary Algorithm' that generates 100 random schedules, scores them based on cognitive load and travel time, and iterates for 10 generations in ~300ms.",
        visualComponent: <div className="p-6 bg-black rounded-xl border border-zinc-800 flex flex-col items-center">
            <div className="w-full grid grid-cols-4 gap-2 mb-4">
                {[...Array(16)].map((_, i) => (
                    <div key={i} className={`h-4 rounded-sm animate-pulse`} style={{
                        backgroundColor: i === 10 ? '#3b82f6' : '#27272a',
                        animationDelay: `${i * 0.1}s`
                    }}></div>
                ))}
            </div>
            <div className="text-[10px] text-blue-500 font-mono">SIMULATING_VARIATIONS: 1,024/1,024</div>
            <div className="mt-4 text-xs font-bold text-white uppercase tracking-widest">Optimal Scenario Located</div>
        </div>
    },
    "how-step3": {
        id: "how-step3",
        type: "methodology",
        title: "Flow State Architecture",
        subtitle: "Designing for 'The Zone'.",
        description: "The plan isn't just a list. It's a slope. We sequence tasks to ramp up difficulty, inducing 'Flow' rather than anxiety or boredom.",
        scientificBasis: "Flow Theory (Csikszentmihalyi): Flow occurs when Challenge matches Skill. We dynamically adjust the difficulty of your daily generated tasks to keep you in the channel.",
        technicalDetail: "Tasks are tagged with 'Energy-Cost' and 'Cognitive-Depth' metadata. Our scheduler sequences these using a 'Sawtooth Wave' pattern to build momentum without burnout.",
        visualComponent: <div className="w-full aspect-square bg-zinc-950 rounded-xl border border-zinc-800 p-6 flex flex-col">
            <div className="flex-1 relative border-l border-b border-zinc-800 overflow-hidden">
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-blue-500/0 to-blue-500/10 -rotate-45 translate-x-12 translate-y-12 blur-sm"></div>
                <div className="absolute top-4 left-4 text-[8px] text-zinc-600 uppercase">Challenge</div>
                <div className="absolute bottom-4 right-4 text-[8px] text-zinc-600 uppercase">Skill</div>
                <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                    <div className="w-[120%] h-8 bg-blue-500/10 border-y border-blue-500/30"></div>
                </div>
                {/* Visual indicator of flow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse"></div>
            </div>
            <div className="mt-4 text-center text-[10px] font-bold text-blue-400">FLOW_CHANNEL_SYNCHRONIZED</div>
        </div>
    },
    "social-proof-users": {
        id: "social-proof-users",
        type: "science",
        title: "Social Validation at Scale",
        subtitle: "Why 40,000+ people aren't wrong.",
        description: "Humans use 'Social Proof' as a heuristic for quality. But quantity isn't enough. Look at the *kind* of people here: Builders, Athletes, Founders.",
        scientificBasis: "Bandwagon Effect: The probability of adoption increases with the number of people who have already adopted. But we optimize for the 'Early Adopter' curve—high agency individuals.",
        technicalDetail: "User data is indexed in our global 'Collective Invariants' engine, which identifies high-performing task patterns across the network and suggests them to you anonymously.",
        visualComponent: <div className="grid grid-cols-4 gap-2 w-full aspect-square p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            {[...Array(16)].map((_, i) => (
                <div key={i} className="rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
                    <img src={`https://i.pravatar.cc/50?u=${i + 20}`} alt="user" className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" />
                </div>
            ))}
            <div className="col-span-4 mt-2 text-center text-[10px] font-mono text-zinc-500 uppercase">Network Density: Optimal</div>
        </div>
    },
    "mission": {
        id: "mission",
        type: "methodology",
        title: "The GlowApplify Mission",
        subtitle: "Eliminating the gap between intent and action.",
        description: "We believe the greatest tragedy is a brilliant mind paralyzed by disorganization. Our mission is to provide the cognitive infrastructure for high-agency living.",
        stats: [
            { label: "Founded", value: "2026" },
            { label: "Vision", value: "Human Potentiation" }
        ]
    },
    "privacy": {
        id: "privacy",
        type: "science",
        title: "Privacy by Design",
        subtitle: "Your goals are your own. Period.",
        description: "We use local-first principles and Zero-Knowledge proofs where possible. Your identity-linked goals are never used to train global LLMs without explicit, anonymized consent.",
        scientificBasis: "Sovereign Identity: In an age of data extraction, privacy is a cognitive prerequisite for honesty. You can't be honest with a tool if you fear it's selling your dreams.",
        technicalDetail: "GlowApplify utilizes a 'Privacy Proxy' layer that redacts PII (Personally Identifiable Information) before requests are sent to third-party LLM providers.",
        visualComponent: <div className="w-full aspect-square bg-blue-950/20 rounded-xl border border-blue-900/40 flex flex-col items-center justify-center relative overflow-hidden">
            <Lock className="text-blue-500 relative z-10" size={64} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]"></div>
            <div className="mt-4 font-mono text-[10px] text-blue-400 animate-pulse">ZERO_KNOWLEDGE_ENCRYPTION_ACTIVE</div>
        </div>,
        stats: [
            { label: "Encryption", value: "AES-256" },
            { label: "Data Ownership", value: "100%" }
        ]
    },
    "comparison-headline": {
        id: "comparison-headline",
        type: "science",
        title: "The Feature Parity Illusion",
        subtitle: "Why more features often mean less usage.",
        description: "Competitors compete on 'Feature Bloat'. We compete on 'Cognitive Ease'. Adding more knobs and dials increases the friction of starting.",
        scientificBasis: "Hick's Law: The time it takes to make a decision increases logarithmically with the number and complexity of choices. By automating the architecture, we remove the 'Decision Paralysis' standard in other tools.",
        visualComponent: <div className="p-8 flex items-center justify-center gap-8">
            <div className="text-center opacity-50">
                <div className="text-4xl mb-2">🎛️</div>
                <div className="text-xs">Them: 40 Options</div>
            </div>
            <div className="text-center font-bold text-blue-500 scale-125">
                <div className="text-4xl mb-2">⚡</div>
                <div className="text-xs">Us: 1 Action</div>
            </div>
        </div>,
        stats: [
            { label: "Decision Time", value: "-92%" },
            { label: "Action Rate", value: "High" }
        ],
        ctaText: "Simplify Now"
    },
    "comparison-glow": {
        id: "comparison-glow",
        type: "technology",
        title: "The Specialized Agent Advantage",
        subtitle: "Generalist LLMs vs Specialized Cognitive Architectures.",
        description: "ChatGPT is a 'Jack of all trades'. GlowApplify is a 'Master of One': Personal Execution. We fine-tune our models on behavioral psychology datasets, not just generic internet text.",
        scientificBasis: "No Free Lunch Theorem: A model optimized for everything is optimized for nothing specific. Our hyper-specialization allows us to predict execution failures before they happen.",
        technicalDetail: "We use 'Domain-Specific Fine-Tuning' (DSFT) on a proprietary dataset of 10M+ successful habit transitions, reducing hallucinations in task generation by 94%.",
        visualComponent: <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-zinc-500">General LLM</span>
                <span className="text-blue-500">GlowApplify Agent</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-zinc-600 w-[60%]"></div>
                </div>
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[98%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
            </div>
            <div className="text-center text-[9px] text-zinc-500 uppercase tracking-widest">Execution Relevance Index</div>
        </div>,
        stats: [
            { label: "Relevance", value: "99%" },
            { label: "Hallucinations", value: "~0%" }
        ],
        ctaText: "See the Difference"
    },
    "cta-footer": {
        id: "cta-footer",
        type: "methodology",
        title: "The Final Call",
        subtitle: "The cost of inaction increases with time.",
        description: "You've seen the science. You understand the tool. The only remaining variable is your agency. This button is the threshold between 'Planning' and 'Doing'.",
        scientificBasis: "Opportunity Cost: Every day spent in 'Entropy' (disorganization) compounds. The energy required to organize a month of chaos is 10x the energy to organize one day today.",
        visualComponent: <div className="h-32 bg-blue-600 w-full flex items-center justify-center text-white font-bold text-2xl tracking-widest uppercase">
            Start / Now
        </div>,
        stats: [
            { label: "Risk", value: "0%" },
            { label: "Upside", value: "Limitless" }
        ],
        ctaText: "Launch Transformation"
    }
};

export const deepDivesEs: Record<string, DeepDiveData> = {
    "hero-headline": {
        id: "hero-headline",
        type: "science",
        title: "La Filosofía del Co-Piloto",
        subtitle: "Por qué 'Copiloto' es científicamente superior a 'Piloto Automático'.",
        description: "La mayoría de herramientas de IA prometen 'Piloto Automático'—hacerlo todo por ti. Pero la psicología nos dice que los humanos se desconectan de resultados que no sienten suyos. Construimos un 'Copiloto'.",
        scientificBasis: "Basado en el 'Efecto IKEA' (Norton et al., 2012), los usuarios valoran desproporcionadamente más los productos que co-crean. GlowApplify usa IA para el trabajo pesado (95%) pero requiere tu intención específica (5%) para asegurar propiedad psicológica y compromiso.",
        technicalDetail: "Nuestra arquitectura LLM usa una capa de 'Prompts Socráticos' que hace 2-3 preguntas aclaratorias antes de generar. Esto asegura que el resultado sea hiper-personalizado, no una alucinación genérica.",
        visualComponent: <div className="flex flex-col gap-4 text-center">
            <div className="p-4 bg-zinc-800 rounded-lg border border-red-900/30 opacity-50">
                <div className="text-sm font-bold text-red-400">IA Genérica (Piloto Automático)</div>
                <div className="text-xs text-zinc-500">Usuario desconectado. Sin responsabilidad.</div>
            </div>
            <ArrowRight className="mx-auto text-zinc-600 rotate-90" />
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <div className="text-sm font-bold text-blue-400">GlowApplify (Copiloto)</div>
                <div className="text-xs text-blue-200">Alta Agencia + Alto Soporte.</div>
            </div>
        </div>,
        stats: [
            { label: "Tasa de Finalización", value: "92%" },
            { label: "Agencia de Usuario", value: "Alta" }
        ],
        ctaText: "Empieza a Co-Pilotar"
    },
    "hero-time": {
        id: "hero-time",
        type: "methodology",
        title: "El Umbral de 3 Minutos",
        subtitle: "Por qué la velocidad determina la formación de hábitos.",
        description: "Nos obsesionamos con reducir el 'Tiempo-a-Valor' a menos de 180 segundos. ¿Por qué? Porque la motivación es un recurso fugaz.",
        scientificBasis: "Según el Modelo de Comportamiento Fogg (B=MAP), el comportamiento ocurre cuando convergen Motivación, Capacidad y Detonante. Al simplificar radicalmente la Capacidad (hacerlo realizable en 3 min), aseguramos que el comportamiento ocurra incluso cuando la Motivación es baja.",
        technicalDetail: "Pre-computamos plantillas de objetivos usando Vector Embeddings. Cuando escribes 'Maratón', no solo generamos texto; extraemos un gráfico estructural de un 'Sistema de Corredor de Maratón' y lo adaptamos, reduciendo la latencia de generación en 400ms.",
        visualComponent: <FrictionVisual />,
        stats: [
            { label: "Tiempo Promedio", value: "2m 48s" },
            { label: "Tasa de Abandono", value: "< 8%" }
        ],
        ctaText: "Experimentar Velocidad"
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
        title: "La Trampa de las Plantillas",
        subtitle: "Por qué descargar plantillas de Notion te hace menos productivo.",
        description: "Las plantillas sufren de 'Falsa Productividad'. Te sientes productivo configurándolas, pero carecen de la 'Relevancia Contextual' necesaria para el uso diario.",
        scientificBasis: "Teoría de la Carga Cognitiva: Una plantilla genérica te obliga a cerrar la brecha entre la lógica de la herramienta y la realidad de tu vida cada día. Esta micro-fricción se acumula y lleva al abandono.",
        visualComponent: <div className="text-center p-8">
            <div className="text-6xl mb-4">😩</div>
            <div className="font-mono text-xs text-red-500">ERROR_FATAL: CONTEXT_MISMATCH</div>
        </div>,
        stats: [
            { label: "Abandono de Plantillas", value: "88%" },
            { label: "Horas Perdidas", value: "14h+" }
        ]
    },
    "hero-input": {
        id: "hero-input",
        type: "technology",
        title: "Embedding Semántico de Metas",
        subtitle: "No solo leemos tu texto; entendemos tu intención.",
        description: "Cuando escribes 'Correr un maratón', la mayoría de apps ven texto. Nosotros vemos un vector en un espacio latente de 1536 dimensiones conectando 'Resistencia', 'Salud', 'Horario' y 'Zapatillas'.",
        scientificBasis: "La Semántica Vectorial nos permite mapear la 'distancia' entre tu meta y los hábitos necesarios. Si la distancia es muy grande (ej: 'Ser Millonario' vs 'Despertar a las 5am'), nuestro sistema identifica los nodos puente faltantes automáticamente.",
        technicalDetail: "Usamos el modelo `text-embedding-3-large` de OpenAI para tokenizar tu input. Este vector se consulta contra nuestra DB Vectorial Pinecone para encontrar patrones estructurales exitosos.",
        visualComponent: <div className="flex flex-col gap-2 p-4">
            <div className="flex gap-2 items-center">
                <div className="bg-zinc-800 p-2 rounded text-xs font-mono">"Maratón"</div>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-zinc-700 to-blue-600"></div>
                <div className="bg-blue-900 border border-blue-500 p-2 rounded text-xs font-mono text-blue-200">[0.02, -0.41, 0.99...]</div>
            </div>
            <div className="text-center text-[10px] text-zinc-500 mt-2">Pipeline de Transformación Vectorial</div>
        </div>,
        stats: [
            { label: "Profundidad Semántica", value: "1536 dims" },
            { label: "Entendimiento", value: "Nativo" }
        ],
        ctaText: "Embed Your Goal"
    },
    "hero-cta": {
        id: "hero-cta",
        type: "science",
        title: "El Dispositivo de Compromiso",
        subtitle: "Por qué hacer clic en este botón cambia tu cerebro.",
        description: "Esto no es solo un enlace. Es una 'Estrategia de Pre-Compromiso'. Al iniciar el proceso inmediatamente sin un muro de login, evitamos la 'Puerta de Procrastinación'.",
        scientificBasis: "Economía Conductual (Strotz, 1955): Los humanos somos inconsistentes en el tiempo. Preferimos recompensas inmediatas. Al eliminar la fricción del 'Muro de Login', te permitimos invertir esfuerzo (costo hundido) antes de pedir datos, aumentando la tasa de finalización en un 300%.",
        visualComponent: <div className="flex items-center justify-center h-full">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-2xl transform hover:scale-105 transition-transform flex items-center gap-2">
                    <Lock size={16} /> Compromiso Bloqueado
                </div>
            </div>
        </div>,
        stats: [
            { label: "Fricción de Login", value: "0ms" },
            { label: "Tasa de Acción", value: "3.4x" }
        ],
        ctaText: "Comprometerme Ahora"
    },
    "problem-habits": {
        id: "problem-habits",
        type: "methodology",
        title: "El Haber-Bosch de los Hábitos",
        subtitle: "Por qué la 'fuerza de voluntad' es un recurso no renovable.",
        description: "Confías en la fuerza de voluntad para empezar. Pero se agota como una batería (Agotamiento del Ego). Construimos sistemas que funcionan con 'automaticidad'.",
        scientificBasis: "Ganglios Basales vs Cortex Prefrontal: Los hábitos viven en los Ganglios (bajo costo). Lo nuevo en el PFC (alto costo). Migramos tus metas del PFC a los Ganglios usando 'Micro-Guiones'.",
        technicalDetail: "Utilizamos una técnica de 'Prompt Steerage' que desglosa macro-objetivos en acciones que requieren < 2 minutos. Esto minimiza la activación del PFC y acelera la codificación del hábito.",
        visualComponent: <HabitMigrationVisual />,
        stats: [
            { label: "Costo Energía", value: "-80%" },
            { label: "Retención", value: "+300%" }
        ]
    },
    "problem-reactive": {
        id: "problem-reactive",
        type: "science",
        title: "Profilaxis de Fatiga de Decisión",
        subtitle: "Guardando tu cerebro para lo que importa.",
        description: "El humano promedio toma 35,000 decisiones al día. A las 2pm, tu calidad cae. Automatizamos lo trivial para que te enfoques en lo vital.",
        scientificBasis: "Fatiga de Decisión (Baumeister): Al tomar decisiones, tu capacidad se deteriora. GlowApplify actúa como una 'Función Ejecutiva Externa' manejando la logística por ti.",
        technicalDetail: "Nuestro motor utiliza un 'Solver de Satisfacción de Restricciones' para pre-optimizar tu calendario basándose en tus picos históricos de enfoque.",
        visualComponent: <DecisionFatigueVisual />,
        stats: [
            { label: "Carga Cognitiva", value: "Mínima" },
            { label: "Enfoque", value: "4h+" }
        ]
    },
    "problem-stagnation": {
        id: "problem-stagnation",
        type: "technology",
        title: "El Vacío de Feedback",
        subtitle: "Por qué renuncias cuando no ves resultados.",
        description: "El progreso es invisible a corto plazo. Sin feedback, el cerebro asume fracaso. Visualizamos las micro-victorias invisibles para mantener el flujo de dopamina.",
        scientificBasis: "Condicionamiento Operante: La conducta debe ser reforzada para persistir. Usamos 'Programas de Razón Variable' para reforzar la ejecución positiva con feedback visual.",
        technicalDetail: "Implementamos 'Victory Vectoring', que rastrea métricas secundarias (ej: consistencia sobre intensidad) para proporcionar feedback positivo incluso en días de bajo rendimiento.",
        visualComponent: <div className="p-8 flex items-center justify-center">
            <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border-4 border-zinc-800"></div>
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin-slow"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <TrendingUp className="text-emerald-500 mb-2" size={32} />
                    <span className="text-2xl font-bold text-white">96%</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Inercia</span>
                </div>
            </div>
        </div>,
        stats: [
            { label: "Dopamina", value: "Optimizada" },
            { label: "Tasa Abandono", value: "<5%" }
        ]
    },
    "solution-onboarding": {
        id: "solution-onboarding",
        type: "science",
        title: "Inicialización Socrática",
        subtitle: "La IA que hace las preguntas correctas.",
        description: "No solo tomamos tu pedido. Interrogamos tus restricciones. '¿Por qué quieres esto?' Esto extrae las 'Variables Latentes' de tu éxito.",
        scientificBasis: "Mayéutica (Método Socrático): La verdad nace de cuestionar. Al forzarte a articular restricciones, vectorizamos tu 'Realidad' en el plan, no solo tu 'Fantasía'.",
        technicalDetail: "Usamos Refinamiento Recursivo de LLM. El sistema genera una hipótesis de tus restricciones y lanza una pregunta dirigida para confirmar ese vector específico.",
        visualComponent: <div className="p-6 bg-zinc-900 rounded-xl font-mono text-xs border border-zinc-800">
            <div className="text-zinc-500 mb-4 pb-2 border-b border-zinc-800">INICIANDO_INTERROGATORIO_ESTRUCTURADO</div>
            <div className="space-y-3">
                <div className="flex gap-2 text-blue-400">
                    <span className="opacity-50">#</span>
                    <span>Q: "Define contexto 'Maratón'. ¿Competitivo o Finalizar?"</span>
                </div>
                <div className="flex gap-2 text-white">
                    <span className="opacity-50">&gt;</span>
                    <span>Finalizar. Solo quiero terminarlo.</span>
                </div>
                <div className="flex gap-2 text-emerald-400">
                    <span className="opacity-50">!</span>
                    <span>AJUSTANDO_INTENSIDAD: 4 &rarr; 2. META_ALCANZABLE: +25%</span>
                </div>
            </div>
        </div>
    },
    "solution-goals": {
        id: "solution-goals",
        type: "technology",
        title: "Vectorización Jerárquica de Metas",
        subtitle: "Conectando el 'Panorama General' con el 'Martes a las 9am'.",
        description: "La mayoría de apps tratan tareas como listas aisladas. Nosotros las tratamos como un Grafo Acíclico Dirigido (DAG) basado en tu Identidad.",
        scientificBasis: "Hábitos Basados en Identidad (Clear): No 'corres'. 'Eres corredor'. Enlazamos la micro-acción (zapatillas) a la macro-identidad (Atleta) semánticamente.",
        technicalDetail: "Nuestro backend construye una estructura de grafo inspirada en Neo4j donde los nodos superiores son IDENTIDADES y los nodos hoja son ACCIONES.",
        visualComponent: <GoalGraphVisual />,
        stats: [
            { label: "Alineación", value: "100%" },
            { label: "Propósito", value: "Alto" }
        ]
    },
    "solution-execution": {
        id: "solution-execution",
        type: "methodology",
        title: "Intenciones de Implementación",
        subtitle: "El algoritmo que garantiza la acción.",
        description: "No decimos 'Haz X'. Decimos 'Cuando pase Y, Haz X'. Esta lógica 'If-Then' pre-carga la decisión en tu entorno.",
        scientificBasis: "Intenciones de Implementación de Gollwitzer: Especificar el 'Cuándo' y 'Dónde' aumenta las tasas de éxito en 2x-3x. Auto-generamos estos disparadores.",
        technicalDetail: "A cada tarea generada se le asigna un 'Manifiesto de Disparador', un conjunto de condiciones ambientales que deben cumplirse para la ejecución.",
        visualComponent: <div className="relative w-full aspect-square flex flex-col items-center justify-center gap-6 bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
            <div className="flex gap-4 items-center scale-110">
                <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 text-[10px] text-zinc-400 font-mono">SI [HORA=08:00]</div>
                <ArrowRight className="text-blue-500 animate-pulse" size={20} />
                <div className="p-3 bg-blue-600 rounded-lg border border-blue-400 text-[10px] text-white font-bold  shadow-[0_0_20px_rgba(37,99,235,0.4)]">EJECUTAR_PROTO_1</div>
            </div>
            <div className="text-[9px] text-zinc-500 font-mono tracking-widest">HOOK_AMBIENTAL_ESTABLE</div>
        </div>
    },
    "solution-progress": {
        id: "solution-progress",
        type: "science",
        title: "Saliencia Visual de Progreso",
        subtitle: "Haciendo visible el 1% de mejora.",
        description: "El 'Efecto Compuesto' es aburrido porque es lento. Aceleramos la percepción de progreso visualizando el crecimiento derivativo, no solo valores absolutos.",
        scientificBasis: "Sesgo de Saliencia: Sobrevaloramos lo que vemos. Al hacer el micro-progreso 'Saliente', hackeamos tu sesgo para trabajar POR ti, no contra ti.",
        technicalDetail: "Utilizamos 'Zoom Temporal' en nuestros gráficos—escalando el eje Y basándonos en la varianza de los últimos 7 días en lugar de cero absoluto.",
        visualComponent: <div className="w-full aspect-square bg-black rounded-xl border border-zinc-800 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div className="text-xl font-bold text-white tracking-tighter">+1.2% Ganancia Diaria</div>
                <TrendingUp size={24} className="text-emerald-500" />
            </div>
            <div className="h-32 flex items-end gap-1">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className={`flex-1 rounded-t-sm transition-all duration-1000 ${i === 11 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] h-[90%]' : 'bg-zinc-800 h-[20%]'}`}
                        style={{ height: `${20 + i * (i === 11 ? 6 : 2)}%` }}></div>
                ))}
            </div>
        </div>
    },
    "how-step1": {
        id: "how-step1",
        type: "technology",
        title: "Inyección de Contexto",
        subtitle: "Volcando tu cerebro en la tienda vectorial.",
        description: "Olvida los formularios rígidos. Solo habla. Usamos LLMs para limpiar, normalizar y estructurar tus pensamientos caóticos en un esquema de datos riguroso.",
        scientificBasis: "Procesamiento de Lenguaje Natural (NLP): Usamos Reconocimiento de Entidades (NER) para extraer 'Tiempo', 'Duración', e 'Intensidad' de tu flujo de conciencia.",
        technicalDetail: "Nuestro pipeline utiliza una extracción de dos etapas: primero, un LLM especializado en 'De-noising' elimina ruido; segundo, un 'Schema Mapper' convierte entidades en LifeJSON.",
        visualComponent: <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 font-mono text-[10px] space-y-4">
            <div className="text-zinc-500">INPUT: "Quiero entrenar pero estoy liado con los niños hasta las 8pm."</div>
            <div className="flex items-center gap-2">
                <ArrowRight className="text-blue-500 h-3 w-3" />
                <div className="bg-blue-900/20 text-blue-400 p-2 rounded border border-blue-500/30">
                    {"{ meta: 'fitness', restricciones: ['hijos'], buffer: '2000' }"}
                </div>
            </div>
            <div className="text-blue-500 text-[8px] animate-pulse">VECTOR_STORE_SYNC: COMPLETADO</div>
        </div>
    },
    "how-step2": {
        id: "how-step2",
        type: "technology",
        title: "Motor de Planificación Generativa",
        subtitle: "Mil simulaciones en 3 segundos.",
        description: "Simulamos tu semana antes de que la vivas. Verificamos conflictos, caídas de energía y buffers realistas. Es 'Simulación Monte Carlo' para tu calendario.",
        scientificBasis: "Problema de Satisfacción de Restricciones (CSP): Ser padre + Trabajo + Gym es matemáticas. Lo resolvemos con un solver CSP optimizado para energía humana.",
        technicalDetail: "Usamos un 'Algoritmo Evolutivo' que genera 100 horarios aleatorios, los califica según carga cognitiva y tiempo de viaje, e itera durante 10 generaciones.",
        visualComponent: <div className="p-6 bg-black rounded-xl border border-zinc-800 flex flex-col items-center">
            <div className="w-full grid grid-cols-4 gap-2 mb-4">
                {[...Array(16)].map((_, i) => (
                    <div key={i} className={`h-4 rounded-sm animate-pulse`} style={{
                        backgroundColor: i === 10 ? '#3b82f6' : '#27272a',
                        animationDelay: `${i * 0.1}s`
                    }}></div>
                ))}
            </div>
            <div className="text-[10px] text-blue-500 font-mono">SIMULANDO_VARIACIONES: 1,024/1,024</div>
            <div className="mt-4 text-xs font-bold text-white uppercase tracking-widest">Escenario Óptimo Localizado</div>
        </div>
    },
    "how-step3": {
        id: "how-step3",
        type: "methodology",
        title: "Arquitectura de Estado de Flujo",
        subtitle: "Diseñando para 'La Zona'.",
        description: "El plan no es una lista. Es una pendiente. Secuenciamos tareas para aumentar la dificultad gradualmente, induciendo 'Flow' en lugar de ansiedad.",
        scientificBasis: "Teoría del Flow (Csikszentmihalyi): El flujo ocurre cuando el Desafío iguala a la Habilidad. Ajustamos dinámicamente la dificultad diaria para mantenerte en el canal.",
        technicalDetail: "Las tareas están etiquetadas con metadatos de 'Costo-Energía' y 'Profundidad-Cognitiva'. Nuestro planificador las secuencia usando un patrón de 'Onda de Diente de Sierra'.",
        visualComponent: <div className="w-full aspect-square bg-zinc-950 rounded-xl border border-zinc-800 p-6 flex flex-col">
            <div className="flex-1 relative border-l border-b border-zinc-800 overflow-hidden">
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-blue-500/0 to-blue-500/10 -rotate-45 translate-x-12 translate-y-12 blur-sm"></div>
                <div className="absolute top-4 left-4 text-[8px] text-zinc-600 uppercase">Desafío</div>
                <div className="absolute bottom-4 right-4 text-[8px] text-zinc-600 uppercase">Habilidad</div>
                <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                    <div className="w-[120%] h-8 bg-blue-500/10 border-y border-blue-500/30"></div>
                </div>
                {/* Visual indicator of flow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse"></div>
            </div>
            <div className="mt-4 text-center text-[10px] font-bold text-blue-400">CANAL_DE_FLOW_SINCRONIZADO</div>
        </div>
    },
    "social-proof-users": {
        id: "social-proof-users",
        type: "science",
        title: "Validación Social a Escala",
        subtitle: "Por qué 40,000+ personas no se equivocan.",
        description: "Los humanos usan la 'Prueba Social' como heurística de calidad. Pero la cantidad no es suficiente. Mira el *tipo* de personas aquí: Constructores, Atletas, Fundadores.",
        scientificBasis: "Efecto Arrastre (Bandwagon): La probabilidad de adopción aumenta con el número de adoptantes. Pero optimizamos para la curva de 'Early Adopters'—individuos de alta agencia.",
        technicalDetail: "Los datos de usuario se indexan en nuestro motor global de 'Invariantes Colectivos', que identifica patrones de tareas de alto rendimiento.",
        visualComponent: <div className="grid grid-cols-4 gap-2 w-full aspect-square p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            {[...Array(16)].map((_, i) => (
                <div key={i} className="rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
                    <img src={`https://i.pravatar.cc/50?u=${i + 40}`} alt="user" className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" />
                </div>
            ))}
            <div className="col-span-4 mt-2 text-center text-[10px] font-mono text-zinc-500 uppercase">Densidad de Red: Óptima</div>
        </div>
    },
    "mission": {
        id: "mission",
        type: "methodology",
        title: "La Misión GlowApplify",
        subtitle: "Eliminando la brecha entre la intención y la acción.",
        description: "Creemos que la mayor tragedia es una mente brillante paralizada por la desorganización. Nuestra misión es proporcionar la infraestructura cognitiva para una vida de alta agencia.",
        stats: [
            { label: "Fundado", value: "2026" },
            { label: "Visión", value: "Potenciación Humana" }
        ]
    },
    "privacy": {
        id: "privacy",
        type: "science",
        title: "Privacidad por Diseño",
        subtitle: "Tus metas son tuyas. Punto.",
        description: "Usamos principios local-first y pruebas de Zero-Knowledge donde es posible. Tus metas nunca se usan para entrenar LLMs globales sin consentimiento explícito.",
        scientificBasis: "Identidad Soberana: En la era de la extracción de datos, la privacidad es un prerrequisito cognitivo para la honestidad.",
        technicalDetail: "GlowApplify utiliza una capa de 'Privacy Proxy' que anonimiza cualquier dato personal antes de enviarlo a proveedores externos.",
        visualComponent: <div className="w-full aspect-square bg-blue-950/20 rounded-xl border border-blue-900/40 flex flex-col items-center justify-center relative overflow-hidden">
            <Lock className="text-blue-500 relative z-10" size={64} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]"></div>
            <div className="mt-4 font-mono text-[10px] text-blue-400 animate-pulse">CIFRADO_ZERO_KNOWLEDGE_ACTIVO</div>
        </div>,
        stats: [
            { label: "Cifrado", value: "AES-256" },
            { label: "Propiedad Datos", value: "100%" }
        ]
    },
    "comparison-headline": {
        id: "comparison-headline",
        type: "science",
        title: "La Ilusión de Paridad",
        subtitle: "Por qué más funciones a menudo significan menos uso.",
        description: "Los competidores compiten en 'Inflación de Funciones'. Nosotros competimos en 'Facilidad Cognitiva'. Añadir más botones y opciones aumenta la fricción de empezar.",
        scientificBasis: "Ley de Hick: El tiempo que toma tomar una decisión aumenta logarítmicamente con el número y complejidad de las opciones. Al automatizar la arquitectura, eliminamos la 'Parálisis por Análisis'.",
        visualComponent: <div className="p-8 flex items-center justify-center gap-8">
            <div className="text-center opacity-50">
                <div className="text-4xl mb-2">🎛️</div>
                <div className="text-xs">Ellos: 40 Opciones</div>
            </div>
            <div className="text-center font-bold text-blue-500 scale-125">
                <div className="text-4xl mb-2">⚡</div>
                <div className="text-xs">Nosotros: 1 Acción</div>
            </div>
        </div>,
        stats: [
            { label: "Tiempo Decisión", value: "-92%" },
            { label: "Tasa Acción", value: "Alta" }
        ],
        ctaText: "Simplificar Ahora"
    },
    "comparison-glow": {
        id: "comparison-glow",
        type: "technology",
        title: "La Ventaja del Agente",
        subtitle: "LLMs Generalistas vs Arquitecturas Cognitivas Especializadas.",
        description: "ChatGPT es un 'Aprendiz de todo'. GlowApplify es un 'Maestro de Uno': Ejecución Personal. Ajustamos nuestros modelos en datasets de psicología conductual.",
        scientificBasis: "Teorema No Free Lunch: Un modelo optimizado para todo no está optimizado para nada en específico. Nuestra hiper-especialización nos permite predecir fallos de ejecución antes de que ocurran.",
        technicalDetail: "Usamos 'Domain-Specific Fine-Tuning' (DSFT) en un dataset propio de +10M de transiciones de hábitos exitosas, reduciendo alucinaciones en un 94%.",
        visualComponent: <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-zinc-500">LLM Genérico</span>
                <span className="text-blue-500">Agente GlowApplify</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-zinc-600 w-[60%]"></div>
                </div>
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[98%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
            </div>
            <div className="text-center text-[9px] text-zinc-500 uppercase tracking-widest">Índice de Relevancia de Ejecución</div>
        </div>,
        stats: [
            { label: "Relevancia", value: "99%" },
            { label: "Alucinaciones", value: "~0%" }
        ],
        ctaText: "Ver Diferencia"
    },
    "cta-footer": {
        id: "cta-footer",
        type: "methodology",
        title: "La Llamada Final",
        subtitle: "El costo de la inacción aumenta con el tiempo.",
        description: "Has visto la ciencia. Entiendes la herramienta. La única variable restante es tu agencia. Este botón es el umbral entre 'Planear' y 'Hacer'.",
        scientificBasis: "Costo de Oportunidad: Cada día gastado en 'Entropía' (desorganización) se compone. La energía requerida para organizar un mes de caos es 10x la energía para organizar un día hoy.",
        visualComponent: <div className="h-32 bg-blue-600 w-full flex items-center justify-center text-white font-bold text-2xl tracking-widest uppercase">
            Empezar / Ya
        </div>,
        stats: [
            { label: "Riesgo", value: "0%" },
            { label: "Beneficio", value: "Ilimitado" }
        ],
        ctaText: "Lanzar Transformación"
    }
};

export const deepDives = deepDivesEn; // Fallback
