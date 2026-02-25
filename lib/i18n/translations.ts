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
    | 'sidebar.proPlan'
    | 'calendar.new_event'
    | 'calendar.today'
    | 'settings.appearance'
    | 'settings.language'
    | 'settings.dark_mode'
    | 'settings.light_mode'
    | 'settings.system_mode'
    | 'settings.title'
    | 'settings.subtitle'
    | 'settings.general'
    | 'settings.account'
    | 'settings.data'
    | 'settings.notifications'
    | 'settings.notifications_desc'
    | 'settings.push_notifications'
    | 'settings.push_notifications_desc'
    | 'settings.profile'
    | 'settings.profile_desc'
    | 'settings.change_avatar'
    | 'settings.uploading'
    | 'settings.max_size'
    | 'settings.display_name'
    | 'settings.email'
    | 'settings.theme_prefs'
    | 'settings.theme_desc'
    | 'settings.data_mgmt'
    | 'settings.data_desc'
    | 'settings.export_data'
    | 'settings.export_desc'
    | 'settings.export_button'
    | 'settings.danger_zone'
    | 'settings.danger_desc'
    | 'settings.clear_data'
    | 'search.placeholder'
    | 'search.command_placeholder'
    | 'search.no_results'
    | 'search.suggestions'
    | 'search.tools'
    | 'board.title'
    | 'board.start_daily'
    | 'nav.home'
    | 'nav.board'
    | 'nav.add'
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
            review: 'Review',
            proPlan: 'Pro Plan'
        },
        nav: {
            home: 'Home',
            board: 'Board',
            add: 'Add'
        },
        search: {
            placeholder: 'Search website...',
            command_placeholder: 'Type a command or search...',
            no_results: 'No results found.',
            suggestions: 'Suggestions',
            tools: 'Tools'
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
            title: 'Settings',
            subtitle: 'Manage your account and preferences.',
            general: 'General',
            account: 'Account',
            appearance: 'Appearance',
            data: 'Data Zone',
            language: 'Language',
            dark_mode: 'Dark',
            light_mode: 'Light',
            system_mode: 'System',
            notifications: 'Notifications',
            notifications_desc: 'Configure how you receive alerts.',
            push_notifications: 'Push Notifications',
            push_notifications_desc: 'Receive daily summaries and habit reminders.',
            profile: 'Profile',
            profile_desc: 'Update your personal information.',
            change_avatar: 'Change Avatar',
            uploading: 'Uploading...',
            max_size: 'Max size: 2MB',
            display_name: 'Display Name',
            email: 'Email',
            theme_prefs: 'Theme Preferences',
            theme_desc: 'Select the theme for the application.',
            data_mgmt: 'Data Management',
            data_desc: 'Control your local data.',
            export_data: 'Export Data',
            export_desc: 'Download a JSON copy of all your boards, tasks, and notes.',
            export_button: 'Export',
            danger_zone: 'Danger Zone',
            danger_desc: 'Permanently delete all local data. This cannot be undone.',
            clear_data: 'Clear All Data'
        },
        board: {
            title: 'Execution Board',
            start_daily: 'Start Daily Execution'
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
            review: 'Revisión',
            proPlan: 'Plan Pro'
        },
        nav: {
            home: 'Inicio',
            board: 'Tablero',
            add: 'Agregar'
        },
        search: {
            placeholder: 'Buscar en la plataforma...',
            command_placeholder: 'Escribe un comando o busca...',
            no_results: 'No se encontraron resultados.',
            suggestions: 'Sugerencias',
            tools: 'Herramientas'
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
            title: 'Ajustes',
            subtitle: 'Gestiona tu cuenta y preferencias.',
            general: 'General',
            account: 'Cuenta',
            appearance: 'Apariencia',
            data: 'Zona de Datos',
            language: 'Idioma',
            dark_mode: 'Oscuro',
            light_mode: 'Claro',
            system_mode: 'Sistema',
            notifications: 'Notificaciones',
            notifications_desc: 'Configura cómo recibes las alertas.',
            push_notifications: 'Notificaciones Push',
            push_notifications_desc: 'Recibe resúmenes diarios y recordatorios de hábitos.',
            profile: 'Perfil',
            profile_desc: 'Actualiza tu información personal.',
            change_avatar: 'Cambiar Avatar',
            uploading: 'Subiendo...',
            max_size: 'Máx: 2MB',
            display_name: 'Nombre mostrado',
            email: 'Correo electrónico',
            theme_prefs: 'Preferencias de Tema',
            theme_desc: 'Selecciona el tema para la aplicación.',
            data_mgmt: 'Gestión de Datos',
            data_desc: 'Controla tus datos locales.',
            export_data: 'Exportar Datos',
            export_desc: 'Descarga una copia JSON de todos tus tableros, tareas y notas.',
            export_button: 'Exportar',
            danger_zone: 'Zona de Peligro',
            danger_desc: 'Elimina permanentemente todos los datos locales. Esto no se puede deshacer.',
            clear_data: 'Borrar Todos los Datos'
        },
        board: {
            title: 'Tablero de Ejecución',
            start_daily: 'Comenzar Ejecución Diaria'
        },
        energy: {
            peak: 'CIMA',
            dip: 'BAJO'
        }
    }
}

