// i18n - Internationalization system

export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Landing/Onboarding
    appName: 'GlowAppLify',
    tagline: 'Transform your goal into an execution board in seconds',
    goalLabel: "What's your ONE goal for the next 90 days?",
    goalPlaceholder: 'Example: Launch my online business, lose 20 pounds, learn to code, write a book...',
    contextLabel: "What's your situation? (optional)",
    contextPlaceholder: 'Example: full-time student, working 9-5, entrepreneur, parent...',
    timeLabel: 'How much time can you dedicate per day? (optional)',
    timePlaceholder: 'Example: 15 minutes, 1 hour, 2-3 hours...',
    obstaclesLabel: 'What obstacles have stopped you before? (optional)',
    obstaclesPlaceholder: 'Example: lack of time, procrastination, unclear plan...',
    obstaclesHint: 'Separate multiple obstacles with commas',
    generateButton: 'Generate My Execution Board',
    generating: 'Generating your execution board...',
    loadingEstimate: 'This usually takes 10-30 seconds',

    // Loading states
    loadingStep1: 'Analyzing your goal...',
    loadingStep2: 'Creating your vision...',
    loadingStep3: 'Breaking down into actions...',
    loadingStep4: 'Planning obstacles...',
    loadingStep5: 'Finalizing your board...',

    // Board View
    yourBoard: 'Your Execution Board',
    editBoard: 'Edit Board',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    startDaily: 'Start Daily Execution',
    backToBoard: 'Back to Board',

    // Layers
    visionTitle: 'Vision',
    goalTitle: '90-Day Goal',
    executionTitle: 'Weekly Execution',
    obstaclesTitle: 'Obstacles & If-Then Plans',
    habitsTitle: 'Daily Habits',

    // Vision
    identity: 'Identity',
    mantra: 'Mantra',
    futureSelf: 'Future Self',

    // Goal
    smartGoal: 'SMART Goal',
    type: 'Type',
    deadline: 'Deadline',
    kpis: 'Key Performance Indicators',

    // Execution
    week: 'Week',
    oneThingBadge: 'ONE THING',

    // Days
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',

    // Habits
    morning: 'Morning',
    deepwork: 'Deep Work',
    evening: 'Evening',

    // Daily View
    todayExecution: "Today's Execution",
    dailyProgress: 'Daily Progress',
    oneThingToday: 'Your ONE Thing Today',
    todayActions: "Today's Actions",
    noActions: 'No actions scheduled for today.',
    eveningCheckin: 'Evening Check-in',
    howWasDay: 'How did today go?',
    dailyReflection: 'Daily Reflection (optional)',
    reflectionPlaceholder: 'What went well? What could be improved? Any insights?',
    saveCheckin: 'Save Check-in',
    dailyHabits: 'Daily Habits',

    // Moods
    struggled: 'Struggled',
    ok: 'OK',
    good: 'Good',
    great: 'Great',
    amazing: 'Amazing',

    // Goal types
    Biology: 'Biology',
    Capital: 'Capital',
    Intellect: 'Intellect',
    Legacy: 'Legacy',
    Social: 'Social',
    Spirit: 'Spirit',

    // Messages
    boardGenerated: 'Execution board generated!',
    boardUpdated: 'Board updated successfully!',
    checkinSaved: 'Daily reflection saved!',
    goalRequired: 'Please enter your goal',
    errorGenerate: 'Failed to generate board. Please try again.',
  },
  es: {
    // Landing/Onboarding
    appName: 'GlowAppLify',
    tagline: 'Transforma tu meta en un tablero de ejecución en segundos',
    goalLabel: '¿Cuál es tu UNA meta para los próximos 90 días?',
    goalPlaceholder: 'Ejemplo: Lanzar mi negocio online, perder 10 kilos, aprender a programar, escribir un libro...',
    contextLabel: '¿Cuál es tu situación? (opcional)',
    contextPlaceholder: 'Ejemplo: estudiante, trabajo 9-5, emprendedor, padre/madre...',
    timeLabel: '¿Cuánto tiempo puedes dedicar por día? (opcional)',
    timePlaceholder: 'Ejemplo: 15 minutos, 1 hora, 2-3 horas...',
    obstaclesLabel: '¿Qué obstáculos te han detenido antes? (opcional)',
    obstaclesPlaceholder: 'Ejemplo: falta de tiempo, procrastinación, plan poco claro...',
    obstaclesHint: 'Separa múltiples obstáculos con comas',
    generateButton: 'Generar Mi Tablero de Ejecución',
    generating: 'Generando tu tablero de ejecución...',
    loadingEstimate: 'Esto suele tomar 10-30 segundos',

    // Loading states
    loadingStep1: 'Analizando tu meta...',
    loadingStep2: 'Creando tu visión...',
    loadingStep3: 'Desglosando en acciones...',
    loadingStep4: 'Planificando obstáculos...',
    loadingStep5: 'Finalizando tu tablero...',

    // Board View
    yourBoard: 'Tu Tablero de Ejecución',
    editBoard: 'Editar Tablero',
    saveChanges: 'Guardar Cambios',
    cancel: 'Cancelar',
    startDaily: 'Comenzar Ejecución Diaria',
    backToBoard: 'Volver al Tablero',

    // Layers
    visionTitle: 'Visión',
    goalTitle: 'Meta de 90 Días',
    executionTitle: 'Ejecución Semanal',
    obstaclesTitle: 'Obstáculos y Planes Si-Entonces',
    habitsTitle: 'Hábitos Diarios',

    // Vision
    identity: 'Identidad',
    mantra: 'Mantra',
    futureSelf: 'Yo Futuro',

    // Goal
    smartGoal: 'Meta SMART',
    type: 'Tipo',
    deadline: 'Fecha límite',
    kpis: 'Indicadores Clave de Desempeño',

    // Execution
    week: 'Semana',
    oneThingBadge: 'LO MÁS IMPORTANTE',

    // Days
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo',

    // Habits
    morning: 'Mañana',
    deepwork: 'Trabajo Profundo',
    evening: 'Noche',

    // Daily View
    todayExecution: 'Ejecución de Hoy',
    dailyProgress: 'Progreso Diario',
    oneThingToday: 'Tu Cosa Más Importante Hoy',
    todayActions: 'Acciones de Hoy',
    noActions: 'No hay acciones programadas para hoy.',
    eveningCheckin: 'Revisión Nocturna',
    howWasDay: '¿Cómo fue tu día?',
    dailyReflection: 'Reflexión Diaria (opcional)',
    reflectionPlaceholder: '¿Qué salió bien? ¿Qué podría mejorar? ¿Alguna idea?',
    saveCheckin: 'Guardar Revisión',
    dailyHabits: 'Hábitos Diarios',

    // Moods
    struggled: 'Difícil',
    ok: 'OK',
    good: 'Bien',
    great: 'Genial',
    amazing: 'Increíble',

    // Goal types
    Biology: 'Biología',
    Capital: 'Capital',
    Intellect: 'Intelecto',
    Legacy: 'Legado',
    Social: 'Social',
    Spirit: 'Espíritu',

    // Messages
    boardGenerated: '¡Tablero de ejecución generado!',
    boardUpdated: '¡Tablero actualizado exitosamente!',
    checkinSaved: '¡Reflexión diaria guardada!',
    goalRequired: 'Por favor ingresa tu meta',
    errorGenerate: 'Error al generar el tablero. Por favor intenta de nuevo.',
  },
};

// Detect user's language from browser
export function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('es')) return 'es';
  return 'en';
}

// Get translation
export function t(key: string, lang: Language): string {
  return translations[lang][key as keyof typeof translations.en] || key;
}
