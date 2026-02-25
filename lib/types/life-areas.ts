export type AreaType =
    | 'finances'
    | 'health'
    | 'learning'
    | 'career'
    | 'relationships'
    | 'wellness'
    | 'creativity'
    | 'growth';

export type AreaStatus =
    | 'principal'     // Top priority (max 1-2)
    | 'active'        // Working on it (max 3-5 total active)
    | 'maintenance'   // Habits only
    | 'inactive';     // No current focus

export interface LifeArea {
    id: string;
    user_id: string;
    area_type: AreaType;
    status: AreaStatus;
    created_at: string;
    updated_at: string;
}

export type ConnectionType = 'synergy' | 'conflict' | 'dependency';

export interface AreaConnection {
    id: string;
    user_id: string;
    source_area_id: string;
    target_area_id: string;
    connection_type: ConnectionType;
    description: string;
    detected_by: 'user' | 'ai';
    created_at: string;
}

export const AREA_ICONS: Record<AreaType, string> = {
    finances: '💰',
    health: '🏋️',
    learning: '🧠',
    career: '🚀',
    relationships: '❤️',
    wellness: '🧘',
    creativity: '🎨',
    growth: '🌱'
};

export const AREA_LABELS: Record<AreaType, string> = {
    finances: 'Finanzas',
    health: 'Salud Física',
    learning: 'Desarrollo Intelectual',
    career: 'Carrera & Logros',
    relationships: 'Relaciones',
    wellness: 'Bienestar Mental',
    creativity: 'Creatividad & Ocio',
    growth: 'Crecimiento Personal'
};
