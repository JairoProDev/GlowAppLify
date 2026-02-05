export type Language = 'en' | 'es'

export type TranslationKeys =
    | 'common.dashboard'
    | 'common.calendar'
    | 'common.tasks'
    | 'common.journal'
    | 'common.routines'
    | 'common.aiCoach'
    | 'common.notes'
    | 'common.analytics'
    | 'common.settings'
    | 'sidebar.core'
    | 'sidebar.execution'
    | 'sidebar.growth'
    | 'sidebar.review'
    | 'calendar.new_event'
    | 'calendar.today'
    | 'settings.appearance'
    | 'settings.language'
    | 'settings.dark_mode'
    | 'settings.light_mode'
    | 'settings.system_mode'
    | 'energy.peak'
    | 'energy.dip'

export const translations = {
    en: {
        common: {
            dashboard: 'Dashboard',
            calendar: 'Calendar',
            tasks: 'Tasks',
            journal: 'Journal',
            routines: 'Routines',
            aiCoach: 'AI Coach',
            notes: 'Notes',
            analytics: 'Analytics',
            settings: 'Settings',
            dailyView: 'Daily View',
            executionBoard: 'Execution Board',
            progress: 'Progress'
        },
        sidebar: {
            core: 'Core',
            execution: 'Execution',
            growth: 'Growth',
            review: 'Review'
        },
        account: {
            title: 'My Account',
            profile: 'Profile',
            billing: 'Billing',
            team: 'Team',
            logout: 'Logout'
        },
        calendar: {
            new_event: 'New Event',
            today: 'Today'
        },
        daily: {
            morning: {
                greeting: 'Good morning',
                streak: 'Current Streak',
                days: 'Days',
                weeklyGoal: 'Weekly Goal',
                tasksDone: 'Tasks Done',
                focusTime: 'Focus Time'
            },
            deepWork: {
                title: 'Deep Work Session',
                subtitle: 'Focus on your ONE Thing',
                complete: 'Complete Session',
                done: "I'm Done!",
                tips: 'Focus Tips',
                tip1: 'Phone in airplane mode ✈️',
                tip2: 'Close email & Slack 🔕',
                tip3: 'One task only 🎯',
                tip4: 'Hydrate 💧',
                exit: 'Exit without saving'
            },
            celebration: {
                title: 'Great job!',
                subtitle: 'You completed your #1 focus for today.',
                continue: 'Keep going',
                mainTitle: 'YOU DID IT!',
                impactMessage: 'You completed the MOST IMPACTFUL action of your day.',
                weeklyGoal: 'Weekly Goal',
                done: 'Done',
                todayBoost: '+20% today',
                dayStreak: 'Day Streak',
                onFire: 'On fire! 🔥',
                impact: 'Impact',
                high: 'High',
                investorReady: 'Investor Ready',
                continueButton: 'Continue Day'
            },
            evening: {
                title: 'Evening Review',
                subtitle: 'Reflect on your day',
                howWasDay: 'How did today go?',
                reflection: 'Daily Reflection',
                checkInTitle: 'Evening Check-in',
                checkInSubtitle: "Let's close your day, clear your mind, and prepare for tomorrow.",
                takesTime: 'Takes just 2 minutes.',
                startCheckIn: 'Start Check-in',
                eveningCheckin: 'Evening Check-in',
                dailyReflection: 'Daily Reflection (optional)',
                reflectionPlaceholder: 'What went well? What could be improved? Any insights?',
                saveCheckin: 'Save Check-in'
            },
            todayExecution: "Today's Execution",
            dailyProgress: 'Daily Progress',
            oneThingToday: 'Your ONE Thing Today',
            todayActions: "Today's Actions",
            noActions: 'No actions scheduled for today.',
            dailyHabits: 'Daily Habits',
            backToBoard: 'Back to Board',
            messages: {
                saved: 'Daily reflection saved!'
            }
        },
        moods: {
            struggled: 'Struggled',
            ok: 'OK',
            good: 'Good',
            great: 'Great',
            amazing: 'Amazing'
        },
        settings: {
            appearance: 'Appearance',
            language: 'Language',
            dark_mode: 'Dark',
            light_mode: 'Light',
            system_mode: 'System'
        },
        energy: {
            peak: 'PEAK',
            dip: 'DIP'
        }
    },
    es: {
        common: {
            dashboard: 'Panel',
            calendar: 'Calendario',
            tasks: 'Tareas',
            journal: 'Diario',
            routines: 'Rutinas',
            aiCoach: 'Coach IA',
            notes: 'Notas',
            analytics: 'Analítica',
            settings: 'Ajustes',
            dailyView: 'Vista Diaria',
            executionBoard: 'Tablero Táctico',
            progress: 'Progreso'
        },
        sidebar: {
            core: 'Principal',
            execution: 'Ejecución',
            growth: 'Crecimiento',
            review: 'Revisión'
        },
        account: {
            title: 'Mi Cuenta',
            profile: 'Perfil',
            billing: 'Facturación',
            team: 'Equipo',
            logout: 'Cerrar sesión'
        },
        calendar: {
            new_event: 'Nuevo Evento',
            today: 'Hoy'
        },
        daily: {
            morning: {
                greeting: 'Buenos días',
                streak: 'Racha Actual',
                days: 'Días',
                weeklyGoal: 'Meta Semanal',
                tasksDone: 'Tareas Listas',
                focusTime: 'Tiempo de Foco'
            },
            deepWork: {
                title: 'Sesión de Trabajo Profundo',
                subtitle: 'Enfócate en tu Cosa #1',
                complete: 'Finalizar Sesión',
                done: '¡He Terminado!',
                tips: 'Consejos de Foco',
                tip1: 'Celular en modo avión ✈️',
                tip2: 'Cierra email y Slack 🔕',
                tip3: 'Solo una tarea 🎯',
                tip4: 'Hidrátate 💧',
                exit: 'Salir sin guardar'
            },
            celebration: {
                title: '¡Buen trabajo!',
                subtitle: 'Completaste tu foco #1 de hoy.',
                continue: 'Continuar',
                mainTitle: '¡LO LOGRASTE!',
                impactMessage: 'Completaste la acción MÁS IMPACTANTE de tu día.',
                weeklyGoal: 'Meta Semanal',
                done: 'Listo',
                todayBoost: '+20% hoy',
                dayStreak: 'Racha de Días',
                onFire: '¡Imparable! 🔥',
                impact: 'Impacto',
                high: 'Alto',
                investorReady: 'Listo para Despegue',
                continueButton: 'Continuar Día'
            },
            evening: {
                title: 'Revisión Nocturna',
                subtitle: 'Reflexiona sobre tu día',
                howWasDay: '¿Cómo fue hoy?',
                reflection: 'Reflexión Diaria',
                checkInTitle: 'Cierre del Día',
                checkInSubtitle: 'Cerremos tu día, despeja tu mente y prepárate para mañana.',
                takesTime: 'Solo toma 2 minutos.',
                startCheckIn: 'Comenzar Cierre',
                eveningCheckin: 'Revisión Nocturna',
                dailyReflection: 'Reflexión Diaria (opcional)',
                reflectionPlaceholder: '¿Qué salió bien? ¿Qué podría mejorar? ¿Alguna idea?',
                saveCheckin: 'Guardar Revisión'
            },
            todayExecution: 'Ejecución de Hoy',
            dailyProgress: 'Progreso Diario',
            oneThingToday: 'Tu Cosa Más Importante Hoy',
            todayActions: 'Acciones de Hoy',
            noActions: 'No hay acciones programadas para hoy.',
            dailyHabits: 'Hábitos Diarios',
            backToBoard: 'Volver al Tablero',
            messages: {
                saved: '¡Reflexión diaria guardada!'
            }
        },
        moods: {
            struggled: 'Difícil',
            ok: 'OK',
            good: 'Bien',
            great: 'Genial',
            amazing: 'Increíble'
        },
        settings: {
            appearance: 'Apariencia',
            language: 'Idioma',
            dark_mode: 'Oscuro',
            light_mode: 'Claro',
            system_mode: 'Sistema'
        },
        energy: {
            peak: 'CIMA',
            dip: 'BAJO'
        }
    }
}
