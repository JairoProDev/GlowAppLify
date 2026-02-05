
export const onboardingContent = {
    es: {
        step1: {
            bubble: "¡Hola! Soy Bloom, tu coach de ejecución.\n\nTe ayudaré a construir un sistema basado en ciencia para lograr tu meta más importante.\n\nPrimero: ¿cuál es la ÚNICA meta que quieres lograr en los próximos 90 días?",
            placeholder: "Ej: Lanzar mi MVP y conseguir 10 clientes...",
            quickGoals: [
                'Lanzar mi startup',
                'Correr un maratón',
                'Aprender a programar',
                'Perder 10kg',
                'Escribir un libro',
                'Duplicar mis ingresos'
            ],
            continue: "Continuar"
        },
        step2: {
            initialBubble: "¡Entendido! \"{{goal}}\" es una gran meta.\n\nAhora, ¿cuál es tu mayor restricción en este momento?\n\nEntender esto me ayuda a diseñar acciones que se ajusten a TU vida.",
            followUpTime: "¿Cuántas horas al día puedes dedicar a esto de manera realista?",
            followUpGeneric: "Entendido. Diseñaremos el sistema para optimizar {{constraint}}.",
            constraints: {
                Time: "Tiempo",
                Energy: "Energía",
                Money: "Dinero",
                Skills: "Habilidades",
                Support: "Apoyo",
                Other: "Otro"
            },
            timeLabels: {
                min: "15 min",
                max: "8 hrs",
                message: "Esfuerzos pequeños constantes vencen a esfuerzos heroicos esporádicos."
            },
            continue: "Continuar"
        },
        step3: {
            initialBubble: "¿Has intentado lograr esta meta antes?\n\n(Sin juicios - solo quiero construir un sistema que funcione ESTA vez.)",
            options: {
                'Yes, multiple times': 'Sí, varias veces',
                'Yes, once': 'Sí, una vez',
                'No, first time': 'No, primera vez'
            },
            part2Bubble: "¿Qué te detiene típicamente?\n\n(Selecciona todo lo que aplique)",
            obstacles: [
                'Perdí la motivación',
                'Me ocupé demasiado',
                'No vi progreso',
                'Me sentí abrumado',
                'La vida se interpuso',
                'No supe qué hacer después'
            ],
            continue: "Continuar"
        },
        step4: {
            bubble: "¡Último paso! Esto es poderoso.\n\nImaginas que es dentro de 90 días. Lograste tu meta.\n\n¿Cómo te SIENTES? ¿Qué cambió en tu vida?",
            visualizationLabel: "Ejercicio de Visualización",
            placeholder: "Ej: Me siento realizado y con energía. Mi startup tiene usuarios reales y me despierto emocionado por trabajar en ella...",
            scienceFact: "Hecho Científico: Visualizar vívidamente tu éxito futuro (\"Contraste Mental\") aumenta la motivación 2x más que el establecimiento de metas estándar.",
            createButton: "Crear Mi Tablero de Ejecución"
        },
        loading: {
            headline: "Creando tu sistema personalizado",
            steps: [
                "Analizando tu meta...",
                "Diseñando tu plan de ejecución...",
                "Generando acciones diarias...",
                "Construyendo tu sistema de hábitos...",
                "Creando tus planes de obstáculos...",
                "Casi listo..."
            ],
            didYouKnow: "¿Sabías qué?",
            facts: [
                "Los usuarios que completan el onboarding tienen 10x más probabilidades de lograr sus metas.",
                "Dividir metas en acciones diarias aumenta la finalización en 3x.",
                "El usuario promedio completa su primera acción en menos de 24 horas.",
                "1,247 personas comenzaron su viaje esta semana.",
                "Las personas que visualizan su Yo Futuro están 2x más motivadas."
            ]
        },
        step5: {
            title: "¡Tu Tablero de Ejecución está Listo!",
            subtitlePart1: "Hemos construido un sistema personalizado para ayudarte a lograr",
            subtitlePart2: "superando tus restricciones.",
            visionLayer: "Capa de Visión",
            executionLayer: "Capa de Ejecución",
            week1: "Semana 1: Fundación y Planificación",
            daily: "Diario: 3 Acciones de Alto Impacto",
            enterButton: "Entrar a Mi Tablero",
            pressEnter: "Presionar enter desbloqueará tu panel"
        }
    },
    en: {
        step1: {
            bubble: "Hi! I'm Bloom, your execution coach.\n\nI'll help you build a science-backed system to achieve your most important goal.\n\nFirst: what's the ONE goal you want to achieve in the next 90 days?",
            placeholder: "e.g. Launch my MVP and get 10 paying users...",
            quickGoals: [
                'Launch my startup',
                'Run a marathon',
                'Learn to code',
                'Lose 10kg',
                'Write a book',
                'Double my income'
            ],
            continue: "Continue"
        },
        step2: {
            initialBubble: "Got it! \"{{goal}}\" is a great goal.\n\nNow, what's your biggest constraint right now?\n\nUnderstanding this helps me design actions that fit YOUR life.",
            followUpTime: "How many hours per day can you realistically dedicate to this?",
            followUpGeneric: "Got it. We'll design the system to optimize for {{constraint}}.",
            constraints: {
                Time: "Time",
                Energy: "Energy",
                Money: "Money",
                Skills: "Skills",
                Support: "Support",
                Other: "Other"
            },
            timeLabels: {
                min: "15 min",
                max: "8 hrs",
                message: "Consistent small efforts beat sporadic heroic efforts."
            },
            continue: "Continue"
        },
        step3: {
            initialBubble: "Have you tried achieving this goal before?\n\n(No judgment - I just want to build a system that works THIS time.)",
            options: {
                'Yes, multiple times': 'Yes, multiple times',
                'Yes, once': 'Yes, once',
                'No, first time': 'No, first time'
            },
            part2Bubble: "What typically stops you?\n\n(Select all that apply)",
            obstacles: [
                'Lost motivation',
                'Got too busy',
                "Didn't see progress",
                'Felt overwhelmed',
                'Life got in the way',
                "Didn't know what to do next"
            ],
            continue: "Continue"
        },
        step4: {
            bubble: "Last step! This is powerful.\n\nImagine it's 90 days from now. You achieved your goal.\n\nHow do you FEEL? What changed in your life?",
            visualizationLabel: "Visualization Exercise",
            placeholder: "e.g. I feel accomplished and energized. My startup has actual users and I wake up excited to work on it...",
            scienceFact: "Science Fact: Vividly visualizing your future success (\"Mental Contrasting\") increases motivation by 2x more than standard goal setting.",
            createButton: "Create My Execution Board"
        },
        loading: {
            headline: "Creating your personalized system",
            steps: [
                "Analyzing your goal...",
                "Designing your execution plan...",
                "Generating daily actions...",
                "Building your habits system...",
                "Creating your obstacle plans...",
                "Almost there..."
            ],
            didYouKnow: "Did you know?",
            facts: [
                "Users who complete onboarding are 10x more likely to achieve their goals.",
                "Breaking goals into daily actions increases completion by 3x.",
                "The average user completes their first action in under 24 hours.",
                "1,247 people started their journey this week.",
                "People who visualize their Future Self are 2x more motivated."
            ]
        },
        step5: {
            title: "Your Execution Board is Ready!",
            subtitlePart1: "We've built a custom system to help you achieve",
            subtitlePart2: "by overcoming your constraints.",
            visionLayer: "Vision Layer",
            executionLayer: "Execution Layer",
            week1: "Week 1: Foundation & Planning",
            daily: "Daily: 3 High-Impact Actions",
            enterButton: "Enter My Board",
            pressEnter: "Pressing enter will unlock your dashboard"
        }
    }
};
