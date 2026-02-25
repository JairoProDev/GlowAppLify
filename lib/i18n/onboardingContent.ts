
export const onboardingContent = {
    es: {
        step0: {
            bubble: "¡Hola! Soy Bloom, tu coach de rendimiento personal.\n\nAntes de empezar a diseñar tu sistema de ejecución de élite, ¿cómo debería llamarte?",
            placeholder: "Tu nombre...",
            continue: "Empezar Viaje"
        },
        step1: {
            bubble: "Mucho gusto, {{name}}.\n\nPara construir el sistema perfecto, necesito saber: ¿cuál es la ÚNICA meta que quieres conquistar en los próximos 90 días?",
            placeholder: "Ej: Escalar mi negocio a $10k/mes...",
            areas: {
                label: "Área de enfoque:",
                health: "Salud & Vitalidad",
                wealth: "Finanzas & Riqueza",
                career: "Carrera & Negocios",
                relationships: "Relaciones",
                growth: "Desarrollo Personal",
                other: "Otro"
            },
            continue: "Siguiente Paso"
        },
        step2: {
            bubble: "Excelente elección. Ahora hablemos de logística.\n\n¿En qué momento del día tienes más energía y cuánto tiempo real tienes disponible?",
            timeLabel: "¿Tiempo diario para esta meta?",
            energyLabel: "¿Tu pico de energía?",
            energyOptions: {
                morning: "Mañana",
                afternoon: "Tarde",
                evening: "Noche"
            },
            constraintsLabel: "¿Alguna restricción horaria? (Ej: Trabajo 9-5)",
            constraintsPlaceholder: "Ej: Solo disponible después de las 6pm...",
            continue: "Configurar Estrategia"
        },
        step3: {
            bubble: "Entendido. Para evitar los errores del pasado: ¿qué obstáculos te han detenido anteriormente al intentar esto?",
            obstaclesLabel: "Selecciona tus barreras comunes:",
            obstacles: [
                'Falta de claridad semanal',
                'Procrastinación',
                'Falta de energía/Burnout',
                'Demasiadas distracciones',
                'No ver resultados rápidos',
                'Inconsistencia'
            ],
            continue: "Casi Listos"
        },
        step4: {
            bubble: "¡Último toque! La ciencia demuestra que visualizar el éxito aumenta la retención de hábitos en un 40%.",
            visualizationLabel: "¿Quieres hacer un breve ejercicio de visualización?",
            visualizationSub: "Es opcional, pero altamente recomendado.",
            placeholder: "Visualiza que es dentro de 90 días... Lograste {{goal}}. ¿Cómo se ve tu día a día? ¿Quién eres ahora?",
            scienceFact: "Hecho Científico: El contraste mental combina tus deseos con la realidad, creando una conexión neuronal que impulsa la acción.",
            createButton: "Generar Mi Sistema de Élite"
        },
        loading: {
            headline: "Diseñando tu infraestructura de éxito",
            steps: [
                "Sincronizando con tu pico de energía...",
                "Construyendo bloques de trabajo profundo...",
                "Configurando protocolos de obstáculos...",
                "Mapeando tu identidad de 90 días...",
                "Finalizando sistema táctico...",
                "Preparando lanzamiento..."
            ],
            didYouKnow: "¿Sabías qué?",
            facts: [
                "Los sistemas de ejecución vencen a la fuerza de voluntad el 100% de las veces.",
                "Escribir tu meta aumenta la probabilidad de éxito en un 42%.",
                "Tener un coach (aunque sea IA) aumenta tu compromiso en un 70%.",
                "Pequeñas victorias diarias liberan dopamina que mantiene el ciclo de éxito.",
                "El 92% de las personas abandonan sus metas; tú estás en el 8% restante."
            ]
        },
        step5: {
            title: "¡Bienvenido al 8%, {{name}}!",
            subtitlePart1: "Tu infraestructura de ejecución para",
            subtitlePart2: "ha sido desplegada.",
            visionLayer: "Capa de Identidad",
            executionLayer: "Capa Táctica",
            week1: "Semana 1: Establecer el Ritmo",
            daily: "Enfoque: Tu 'One Thing' Diario",
            enterButton: "Entrar al Centro de Control",
            pressEnter: "Presiona Enter para comenzar"
        }
    },
    en: {
        step0: {
            bubble: "Hi! I'm Bloom, your personal performance coach.\n\nBefore we start designing your elite execution system, what should I call you?",
            placeholder: "Your name...",
            continue: "Start Journey"
        },
        step1: {
            bubble: "Nice to meet you, {{name}}.\n\nTo build the perfect system, I need to know: what is the ONE goal you want to conquer in the next 90 days?",
            placeholder: "e.g. Scale my business to $10k/month...",
            areas: {
                label: "Focus area:",
                health: "Health & Vitality",
                wealth: "Finance & Wealth",
                career: "Career & Business",
                relationships: "Relationships",
                growth: "Personal Development",
                other: "Other"
            },
            continue: "Next Step"
        },
        step2: {
            bubble: "Excellent choice. Now let's talk logistics.\n\nWhen do you have the most energy, and how much real time do you have available?",
            timeLabel: "Daily time for this goal?",
            energyLabel: "Your energy peak?",
            energyOptions: {
                morning: "Morning",
                afternoon: "Afternoon",
                evening: "Evening"
            },
            constraintsLabel: "Any schedule constraints? (e.g. Work 9-5)",
            constraintsPlaceholder: "e.g. Only available after 6pm...",
            continue: "Set Strategy"
        },
        step3: {
            bubble: "Got it. To avoid past mistakes: what obstacles have stopped you before when trying this?",
            obstaclesLabel: "Select your common barriers:",
            obstacles: [
                'Lack of weekly clarity',
                'Procrastination',
                'Lack of energy/Burnout',
                'Too many distractions',
                'Not seeing fast results',
                'Inconsistency'
            ],
            continue: "Almost There"
        },
        step4: {
            bubble: "Last touch! Science shows that visualizing success increases habit retention by 40%.",
            visualizationLabel: "Do you want to do a brief visualization exercise?",
            visualizationSub: "It's optional, but highly recommended.",
            placeholder: "Visualize it's 90 days from now... You achieved {{goal}}. What does your day-to-day look like? Who are you now?",
            scienceFact: "Science Fact: Mental contrasting links your desires with reality, creating a neural connection that drives action.",
            createButton: "Generate My Elite System"
        },
        loading: {
            headline: "Designing your success infrastructure",
            steps: [
                "Syncing with your energy peak...",
                "Building deep work blocks...",
                "Setting up obstacle protocols...",
                "Mapping your 90-day identity...",
                "Finalizing tactical system...",
                "Preparing for launch..."
            ],
            didYouKnow: "Did you know?",
            facts: [
                "Execution systems beat willpower 100% of the time.",
                "Writing your goal increases success probability by 42%.",
                "Having a coach (even an AI) increases your commitment by 70%.",
                "Small daily wins release dopamine that sustains the success cycle.",
                "92% of people quit their goals; you are in the remaining 8%."
            ]
        },
        step5: {
            title: "Welcome to the 8%, {{name}}!",
            subtitlePart1: "Your execution infrastructure for",
            subtitlePart2: "has been deployed.",
            visionLayer: "Identity Layer",
            executionLayer: "Tactical Layer",
            week1: "Week 1: Setting the Rhythm",
            daily: "Focus: Your Daily 'One Thing'",
            enterButton: "Enter Control Center",
            pressEnter: "Press Enter to start"
        }
    }
};
