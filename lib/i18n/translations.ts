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
            settings: 'Settings'
        },
        sidebar: {
            core: 'Core',
            execution: 'Execution',
            growth: 'Growth',
            review: 'Review'
        },
        calendar: {
            new_event: 'New Event',
            today: 'Today'
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
            settings: 'Ajustes'
        },
        sidebar: {
            core: 'Principal',
            execution: 'Ejecución',
            growth: 'Crecimiento',
            review: 'Revisión'
        },
        calendar: {
            new_event: 'Nuevo Evento',
            today: 'Hoy'
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
