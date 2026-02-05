
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
        visualComponent: <div className="p-4 bg-zinc-900 rounded-lg font-mono text-xs text-green-400">
            &gt; Query: "I want to get fit"<br />
            &lt; Analysis: Vague Intent detected.<br />
            &gt; Clarification: "Define 'Fit'. Hypertrophy or Cardiovascular?"<br />
            &gt; User: "Muscle."<br />
            &lt; Optimization: Protocol set to Hypertrophy.
        </div>
    },
    "solution-goals": {
        id: "solution-goals",
        type: "technology",
        title: "Hierarchical Goal Vectorization",
        subtitle: "Connecting the 'Big Picture' to 'Tuesday Morning'.",
        description: "Most apps treat tasks as isolated lists. We treat them as a Directed Acyclic Graph (DAG) grounded in your Identity.",
        scientificBasis: "Identity-Based Habits (Clear): You don't 'run'. You 'are a runner'. We link the micro-action (put on shoes) to the macro-identity (Athlete) using semantic edges in our graph DB.",
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
    },
    "solution-progress": {
        id: "solution-progress",
        type: "science",
        title: "Visual Progress Salience",
        subtitle: "Making 1% improvement visible.",
        description: "The 'Compound Effect' is boring because it's slow. We accelerate the perception of progress by visualizing derivative growth, not just absolute values.",
        scientificBasis: "Salience Bias: We overvalue what we can see. By making micro-progress 'Salient', we hack your bias to work FOR you, not against you.",
    },
    "how-step1": {
        id: "how-step1",
        type: "technology",
        title: "Context Injection",
        subtitle: "Dumping your brain into the vector store.",
        description: "Forget structured forms. Just talk. We use LLMs to clean, normalize, and structure your messy thoughts into a rigorous data schema.",
        scientificBasis: "Natural Language Processing (NLP): We use Named Entity Recognition (NER) to extract 'Time', 'Duration', 'Intensity', and 'Constraint' entities from your raw stream of consciousness.",
    },
    "how-step2": {
        id: "how-step2",
        type: "technology",
        title: "Generative Planning Engine",
        subtitle: "A thousand simulations in 3 seconds.",
        description: "We simulate your week before you live it. We check for conflicts, energy dips, and realistic buffers. It's 'Monte Carlo Simulation' for your calendar.",
        scientificBasis: "Constraint Satisfaction Problem (CSP): Parenting + Work + Gym is a math problem. We solve it using a CSP solver optimized for human energy levels, not just time slots.",
    },
    "how-step3": {
        id: "how-step3",
        type: "methodology",
        title: "Flow State Architecture",
        subtitle: "Designing for 'The Zone'.",
        description: "The plan isn't just a list. It's a slope. We sequence tasks to ramp up difficulty, inducing 'Flow' rather than anxiety or boredom.",
        scientificBasis: "Flow Theory (Csikszentmihalyi): Flow occurs when Challenge matches Skill. We dynamically adjust the difficulty of your daily generated tasks to keep you in the channel.",
    },
    "social-proof-users": {
        id: "social-proof-users",
        type: "science",
        title: "Social Validation at Scale",
        subtitle: "Why 40,000+ people aren't wrong.",
        description: "Humans use 'Social Proof' as a heuristic for quality. But quantity isn't enough. Look at the *kind* of people here: Builders, Athletes, Founders.",
        scientificBasis: "Bandwagon Effect: The probability of adoption increases with the number of people who have already adopted. But we optimize for the 'Early Adopter' curve—high agency individuals.",
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
        visualComponent: <div className="p-4 bg-zinc-900 rounded-lg font-mono text-xs text-green-400">
            &gt; Query: "Quiero ponerme en forma"<br />
            &lt; Analysis: Intención vaga detectada.<br />
            &gt; Clarification: "¿Definir 'Forma'. Hipertrofia o Cardiovascular?"<br />
            &gt; User: "Músculo."<br />
            &lt; Optimization: Protocolo set a Hipertrofia.
        </div>
    },
    "solution-goals": {
        id: "solution-goals",
        type: "technology",
        title: "Vectorización Jerárquica de Metas",
        subtitle: "Conectando el 'Panorama General' con el 'Martes a las 9am'.",
        description: "La mayoría de apps tratan tareas como listas aisladas. Nosotros las tratamos como un Grafo Acíclico Dirigido (DAG) basado en tu Identidad.",
        scientificBasis: "Hábitos Basados en Identidad (Clear): No 'corres'. 'Eres corredor'. Enlazamos la micro-acción (zapatillas) a la macro-identidad (Atleta) semánticamente.",
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
    },
    "solution-progress": {
        id: "solution-progress",
        type: "science",
        title: "Saliencia Visual de Progreso",
        subtitle: "Haciendo visible el 1% de mejora.",
        description: "El 'Efecto Compuesto' es aburrido porque es lento. Aceleramos la percepción de progreso visualizando el crecimiento derivativo, no solo valores absolutos.",
        scientificBasis: "Sesgo de Saliencia: Sobrevaloramos lo que vemos. Al hacer el micro-progreso 'Saliente', hackeamos tu sesgo para trabajar POR ti, no contra ti.",
    },
    "how-step1": {
        id: "how-step1",
        type: "technology",
        title: "Inyección de Contexto",
        subtitle: "Volcando tu cerebro en la tienda vectorial.",
        description: "Olvida los formularios rígidos. Solo habla. Usamos LLMs para limpiar, normalizar y estructurar tus pensamientos caóticos en un esquema de datos riguroso.",
        scientificBasis: "Procesamiento de Lenguaje Natural (NLP): Usamos Reconocimiento de Entidades (NER) para extraer 'Tiempo', 'Duración', e 'Intensidad' de tu flujo de conciencia.",
    },
    "how-step2": {
        id: "how-step2",
        type: "technology",
        title: "Motor de Planificación Generativa",
        subtitle: "Mil simulaciones en 3 segundos.",
        description: "Simulamos tu semana antes de que la vivas. Verificamos conflictos, caídas de energía y buffers realistas. Es 'Simulación Monte Carlo' para tu calendario.",
        scientificBasis: "Problema de Satisfacción de Restricciones (CSP): Ser padre + Trabajo + Gym es matemáticas. Lo resolvemos con un solver CSP optimizado para energía humana.",
    },
    "how-step3": {
        id: "how-step3",
        type: "methodology",
        title: "Arquitectura de Estado de Flujo",
        subtitle: "Diseñando para 'La Zona'.",
        description: "El plan no es una lista. Es una pendiente. Secuenciamos tareas para aumentar la dificultad gradualmente, induciendo 'Flow' en lugar de ansiedad.",
        scientificBasis: "Teoría del Flow (Csikszentmihalyi): El flujo ocurre cuando el Desafío iguala a la Habilidad. Ajustamos dinámicamente la dificultad diaria para mantenerte en el canal.",
    },
    "social-proof-users": {
        id: "social-proof-users",
        type: "science",
        title: "Validación Social a Escala",
        subtitle: "Por qué 40,000+ personas no se equivocan.",
        description: "Los humanos usan la 'Prueba Social' como heurística de calidad. Pero la cantidad no es suficiente. Mira el *tipo* de personas aquí: Constructores, Atletas, Fundadores.",
        scientificBasis: "Efecto Arrastre (Bandwagon): La probabilidad de adopción aumenta con el número de adoptantes. Pero optimizamos para la curva de 'Early Adopters'—individuos de alta agencia.",
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
