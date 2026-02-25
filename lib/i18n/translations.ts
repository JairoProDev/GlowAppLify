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
    | 'board.vision_identity'
    | 'board.emotional_anchor'
    | 'board.future_vision'
    | 'board.mantra'
    | 'board.the_goal'
    | 'board.success_description'
    | 'board.smart_goal'
    | 'board.deadline'
    | 'board.kpi'
    | 'board.target_by'
    | 'board.execution_plan'
    | 'board.weekly_sprints'
    | 'board.weekly_theme'
    | 'board.milestone'
    | 'board.day_abbr'
    | 'board.obstacles_title'
    | 'board.obstacles_subtitle'
    | 'board.no_obstacles'
    | 'board.if'
    | 'board.then'
    | 'board.habits_title'
    | 'board.habits_subtitle'
    | 'board.morning_ritual'
    | 'board.deep_work'
    | 'board.evening_wind_down'
    | 'board.start'
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
        analytics: {
            title: 'Analytics',
            analyzing: 'Analyzing your progress...',
            failed: 'Failed to load data',
            overview: 'Overview',
            weeks: 'Weeks',
            insights: 'Insights',
            milestones: 'Milestones',
            demo_celebration: 'Demo Celebration Animation',
            your_progress: 'Your Progress',
            goal_90d: '90-Day Goal',
            complete_status: '{percent}% Complete',
            week_of: 'Week {current} of {total}',
            days_active: '{days} days in • {remaining} days to go',
            current_week: 'Current Week: {theme}',
            milestone_label: 'Milestone',
            streak: 'Streak',
            days: 'Days',
            completed_label: 'Completed',
            time_focused: 'Time Focused',
            view_breakdown: 'View Weekly Breakdown',
            week_breakdown: 'Week by Week Breakdown',
            week_label: 'Week',
            current_status: 'CURRENT',
            complete_status_label: 'COMPLETE',
            unlock_previous: 'Complete previous week to unlock',
            milestone_prefix: 'Milestone: {milestone}',
            est_completion: 'Estimated completion: {day}',
            on_track: 'ON TRACK ✓',
            locked_status: 'LOCKED',
            ai_insights: 'AI Insights',
            analysis_7d: 'Analysis based on your last 7 days of activity. Updates daily at midnight.',
            your_trends: 'Your Trends',
            completion_rate: 'Completion rate',
            avg_time: 'Avg time/action',
            best_day: 'Best day',
            pattern_detected: 'PATTERN DETECTED',
            prediction: 'PREDICTION',
            recommendation: 'RECOMMENDATION',
            suggestion_label: 'Suggestion:',
            apply_auto: 'Apply Adjustment Automatically',
            add_reminder: 'Add Reminder',
            activity_consistency: 'Activity Consistency',
            activity_desc: 'Tasks and routines completed (last 12 weeks)',
            less: 'Less',
            more: 'More',
            activities_label: 'activities',
            week_complete: 'WEEK {num} COMPLETE!',
            what_accomplished: 'What You Accomplished',
            progress_label: 'Progress',
            momentum_label: 'Momentum',
            momentum_strong: 'Strong 🔥',
            continue_to_week: 'Continue to Week {num}',
            share_win: 'Share This Win',
            weekly_productivity: 'Weekly Productivity Score',
            prod_desc: 'Based on task completions and mood tracking',
            score_label: 'Score',
            tasks_label: 'Tasks',
            mood_label: 'Mood'
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
            today: 'Today',
            schedule_event: 'Schedule Event',
            edit_event: 'Edit Event',
            modify_existing: 'Modify existing plan.',
            plan_effectively: 'Plan your time effectively. Remember to align with your energy.',
            title: 'Title',
            placeholder_title: 'e.g., Deep Work Project X',
            start_time: 'Start Time',
            end_time: 'End Time',
            instant_action: 'Instant Action (no duration)',
            event_type: 'Event Type',
            energy_required: 'Energy Required',
            recurrence: 'Recurrence',
            location: 'Location',
            placeholder_location: 'e.g., Home, Office, Zoom',
            description: 'Description (Optional)',
            placeholder_description: 'Add details, links, or sub-tasks...',
            save: 'Save Changes',
            schedule: 'Schedule',
            cancel: 'Cancel',
            delete: 'Delete Event',
            recurrence_options: {
                none: 'None',
                daily: 'Daily',
                interdaily: 'Interdaily (Every 2 days)',
                weekly: 'Weekly',
                monthly: 'Monthly'
            }
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
                saveCheckin: 'Save Check-in',
                scorecard: {
                    title: "Today's Scorecard",
                    subtitle: 'Review what you accomplished',
                    completed: 'Completed',
                    incomplete: "Didn't Finish",
                    crushed_it: 'Your ONE Thing - Crushed it! ⭐',
                    no_worries: "No worries - we'll handle this in a moment.",
                    actions_done: 'Actions Done',
                    week: 'Week',
                    streak: 'Streak',
                    continue: 'Continue'
                },
                reflection_step: {
                    title: 'Capture today in one sentence',
                    subtitle: 'Optional. What did you learn? What surprised you?',
                    placeholder: 'Example: Investor deck took longer but I\'m happy with the result...',
                    save: 'Save & Close Day',
                    skip: 'Skip'
                },
                insights: {
                    loading_title: 'Connecting to AI Neural Net...',
                    loading_subtitle: 'Analyzing mood • Processing reflection • Generating strategy',
                    your_insights: 'Your AI Insights',
                    why_happened: 'Why it happened',
                    suggestion_title: 'Actionable Suggestion',
                    error_msg: 'AI Service unavailable (Using offline mode)',
                    fallback_title: 'Day Complete',
                    fallback_pattern: 'You\'re consistently showing up.',
                    fallback_reason: 'Data analysis unavailable, but your effort is recorded.',
                    fallback_suggestion: 'Take some rest and prepare for tomorrow.',
                    fallback_action: 'Continue'
                },
                tomorrow: {
                    title: "Tomorrow's Preview 🌅",
                    subtitle: 'Your brain can rest knowing this is handled.',
                    moved_title: 'Moved from today (Don\'t worry about these)',
                    rescheduled: 'Rescheduled for tomorrow afternoon',
                    one_thing: "Tomorrow's One Thing",
                    ready: "I'm Ready to Close"
                },
                closure: {
                    title: 'TODAY IS COMPLETE',
                    accomplished: 'You accomplished {count} actions today.',
                    let_go: 'Tomorrow is planned. You can let go now.',
                    sleep_mode: 'Enter Sleep Mode',
                    no_notifications: 'No Notifications Until 7am'
                }
            },
            oneThing: {
                priority: 'Priority #1',
                today: 'Today',
                why_matters: 'Why This Matters',
                start_deep_work: 'Start Deep Work',
                schedule: 'Schedule',
                later: 'Later',
                recommended: 'Recommended',
                peak_flow: 'for peak flow state',
                work_type: 'Work'
            },
            other_actions: {
                title: 'Other Actions',
                queue: "Today's Queue"
            },
            todayExecution: "Today's Execution",
            dailyProgress: 'Daily Progress',
            oneThingToday: 'Your ONE Thing Today',
            todayActions: "Today's Actions",
            noActions: 'No actions scheduled for today.',
            dailyHabits: 'Daily Habits',
            backToBoard: 'Back to Board',
            syncing: 'Syncing your execution board...',
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
            start_daily: 'Start Daily Execution',
            vision_identity: 'Vision & Identity',
            emotional_anchor: 'Your emotional anchor',
            future_vision: 'Fixed Future Vision (90 Days)',
            mantra: 'Your Mantra',
            the_goal: 'The Goal',
            success_description: 'What success looks like',
            smart_goal: 'SMART Goal',
            deadline: 'Deadline',
            kpi: 'KPI',
            target_by: 'Target by',
            execution_plan: 'Execution Plan',
            weekly_sprints: 'Weekly Sprints & Daily Actions',
            weekly_theme: 'Weekly Theme',
            milestone: 'Milestone',
            day_abbr: 'D',
            obstacles_title: 'Anticipated Obstacles',
            obstacles_subtitle: 'Proactive If-Then Planning',
            no_obstacles: 'No obstacles anticipated yet. Good luck!',
            if: 'IF',
            then: 'THEN I WILL...',
            habits_title: 'Daily Habits',
            habits_subtitle: 'Automating Excellence with Routines',
            morning_ritual: 'Morning Ritual',
            deep_work: 'Deep Work',
            evening_wind_down: 'Evening Wind-down',
            start: 'Start'
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
        analytics: {
            title: 'Analítica',
            analyzing: 'Analizando tu progreso...',
            failed: 'Error al cargar los datos',
            overview: 'Vista General',
            weeks: 'Semanas',
            insights: 'Hallazgos',
            milestones: 'Hitos',
            demo_celebration: 'Demo de Animación de Celebración',
            your_progress: 'Tu Progreso',
            goal_90d: 'Meta de 90 días',
            complete_status: '{percent}% Completado',
            week_of: 'Semana {current} de {total}',
            days_active: '{days} días transcurridos • faltan {remaining} días',
            current_week: 'Semana Actual: {theme}',
            milestone_label: 'Hito',
            streak: 'Racha',
            days: 'Días',
            completed_label: 'Completado',
            time_focused: 'Tiempo Enfocado',
            view_breakdown: 'Ver Desglose Semanal',
            week_breakdown: 'Desglose Semana a Semana',
            week_label: 'Semana',
            current_status: 'ACTUAL',
            complete_status_label: 'COMPLETADA',
            unlock_previous: 'Completa la semana anterior para desbloquear',
            milestone_prefix: 'Hito: {milestone}',
            est_completion: 'Finalización estimada: {day}',
            on_track: 'EN RUTA ✓',
            locked_status: 'BLOQUEADA',
            ai_insights: 'Hallazgos de IA',
            analysis_7d: 'Análisis basado en tus últimos 7 días de actividad. Se actualiza cada medianoche.',
            your_trends: 'Tus Tendencias',
            completion_rate: 'Tasa de completado',
            avg_time: 'Tiempo prom./acción',
            best_day: 'Mejor día',
            pattern_detected: 'PATRÓN DETECTADO',
            prediction: 'PREDICCIÓN',
            recommendation: 'RECOMENDACIÓN',
            suggestion_label: 'Sugerencia:',
            apply_auto: 'Aplicar Ajuste Automáticamente',
            add_reminder: 'Agregar Recordatorio',
            activity_consistency: 'Consistencia de Actividad',
            activity_desc: 'Tareas y rutinas completadas (últimas 12 semanas)',
            less: 'Menos',
            more: 'Más',
            activities_label: 'actividades',
            week_complete: '¡SEMANA {num} COMPLETADA!',
            what_accomplished: 'Lo que has logrado',
            progress_label: 'Progreso',
            momentum_label: 'Impulso',
            momentum_strong: 'Fuerte 🔥',
            continue_to_week: 'Continuar a la Semana {num}',
            share_win: 'Compartir este Logro',
            weekly_productivity: 'Puntuación de Productividad Semanal',
            prod_desc: 'Basado en tareas completadas y seguimiento del ánimo',
            score_label: 'Puntuación',
            tasks_label: 'Tareas',
            mood_label: 'Ánimo'
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
            today: 'Hoy',
            schedule_event: 'Programar Evento',
            edit_event: 'Editar Evento',
            modify_existing: 'Modificar plan existente.',
            plan_effectively: 'Planifica tu tiempo efectivamente. Recuerda alinearte con tu energía.',
            title: 'Título',
            placeholder_title: 'ej. Trabajo Profundo: Proyecto X',
            start_time: 'Hora de Inicio',
            end_time: 'Hora de Fin',
            instant_action: 'Acción Instantánea (sin duración)',
            event_type: 'Tipo de Evento',
            energy_required: 'Energía Requerida',
            recurrence: 'Recurrencia',
            location: 'Ubicación',
            placeholder_location: 'ej. Casa, Oficina, Zoom',
            description: 'Descripción (Opcional)',
            placeholder_description: 'Añade detalles, links o sub-tareas...',
            save: 'Guardar cambios',
            schedule: 'Programar',
            cancel: 'Cancelar',
            delete: 'Eliminar Evento',
            recurrence_options: {
                none: 'Ninguna',
                daily: 'Diario',
                interdaily: 'Interdiario (Cada 2 días)',
                weekly: 'Semanalmente',
                monthly: 'Mensualmente'
            }
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
                saveCheckin: 'Guardar Revisión',
                scorecard: {
                    title: 'Puntuación de Hoy',
                    subtitle: 'Revisa lo que lograste',
                    completed: 'Completado',
                    incomplete: 'No Terminado',
                    crushed_it: '¡Destrozaste tu Cosa #1! ⭐',
                    no_worries: 'No te preocupes, lo manejaremos en un momento.',
                    actions_done: 'Acciones Listas',
                    week: 'Semana',
                    streak: 'Racha',
                    continue: 'Continuar'
                },
                reflection_step: {
                    title: 'Captura hoy en una frase',
                    subtitle: 'Opcional. ¿Qué aprendiste? ¿Qué te sorprendió?',
                    placeholder: 'Ej: El diseño tomó más tiempo pero estoy feliz con el resultado...',
                    save: 'Guardar y Cerrar Día',
                    skip: 'Saltar'
                },
                insights: {
                    loading_title: 'Conectando con la Red Neuronal IA...',
                    loading_subtitle: 'Analizando humor • Procesando reflexión • Generando estrategia',
                    your_insights: 'Tus Insights de IA',
                    why_happened: 'Por qué sucedió',
                    suggestion_title: 'Sugerencia Accionable',
                    error_msg: 'Servicio de IA no disponible (Usando modo offline)',
                    fallback_title: 'Día Completado',
                    fallback_pattern: 'Estás apareciendo consistentemente.',
                    fallback_reason: 'Análisis de datos no disponible, pero tu esfuerzo está registrado.',
                    fallback_suggestion: 'Descansa y prepárate para mañana.',
                    fallback_action: 'Continuar'
                },
                tomorrow: {
                    title: 'Vista Previa de Mañana 🌅',
                    subtitle: 'Tu cerebro puede descansar sabiendo que esto está bajo control.',
                    moved_title: 'Movido de hoy (No te preocupes por esto)',
                    rescheduled: 'Reprogramado para mañana por la tarde',
                    one_thing: 'Cosa #1 de Mañana',
                    ready: 'Estoy Listo para Cerrar'
                },
                closure: {
                    title: 'EL DÍA HA TERMINADO',
                    accomplished: 'Lograste {count} acciones hoy.',
                    let_go: 'Mañana está planeado. Puedes soltar ahora.',
                    sleep_mode: 'Entrar en Modo Sueño',
                    no_notifications: 'Sin notificaciones hasta las 7 am'
                }
            },
            oneThing: {
                priority: 'Prioridad #1',
                today: 'Hoy',
                why_matters: 'Por Qué Esto Importa',
                start_deep_work: 'Iniciar Trabajo Profundo',
                schedule: 'Programar',
                later: 'Luego',
                recommended: 'Recomendado',
                peak_flow: 'para el máximo estado de flujo',
                work_type: 'Trabajo'
            },
            other_actions: {
                title: 'Otras Acciones',
                queue: 'Cola de Hoy'
            },
            todayExecution: 'Ejecución de Hoy',
            dailyProgress: 'Progreso Diario',
            oneThingToday: 'Tu Cosa Más Importante Hoy',
            todayActions: 'Acciones de Hoy',
            noActions: 'No hay acciones programadas para hoy.',
            dailyHabits: 'Hábitos Diarios',
            backToBoard: 'Volver al Tablero',
            syncing: 'Sincronizando tu tablero de ejecución...',
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
            start_daily: 'Comenzar Ejecución Diaria',
            vision_identity: 'Visión e Identidad',
            emotional_anchor: 'Tu anclaje emocional',
            future_vision: 'Visión Futura Fija (90 Días)',
            mantra: 'Tu Mantra',
            the_goal: 'La Meta',
            success_description: 'Cómo se ve el éxito',
            smart_goal: 'Meta SMART',
            deadline: 'Fecha Límite',
            kpi: 'KPI',
            target_by: 'Objetivo para',
            execution_plan: 'Plan de Ejecución',
            weekly_sprints: 'Sprints Semanales y Acciones Diarias',
            weekly_theme: 'Tema Semanal',
            milestone: 'Hito',
            day_abbr: 'D',
            obstacles_title: 'Obstáculos Anticipados',
            obstacles_subtitle: 'Capa de Escudo y Estrategia',
            no_obstacles: 'Aún no hay obstáculos anticipados. ¡Buena suerte!',
            if: 'SI',
            then: 'ENTONCES HARÉ...',
            habits_title: 'Hábitos Diarios',
            habits_subtitle: 'Automatizando la Excelencia con Rutinas',
            morning_ritual: 'Ritual Mañanero',
            deep_work: 'Trabajo Profundo',
            evening_wind_down: 'Cierre del Día',
            start: 'Inicio'
        },
        energy: {
            peak: 'CIMA',
            dip: 'BAJO'
        }
    }
}


