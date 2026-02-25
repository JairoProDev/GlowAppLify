/**
 * Area Modules Store - GlowApplify
 * Central store for all per-area data: OKRs, Key Results, habits, weekly actions,
 * area-specific tools, AI insights, and cross-area connections.
 *
 * Architecture: Each area is treated as a "Life Operating System" module
 * with 5 layers: Vision → OKR → Weekly Actions → Daily Habits → Record & Feedback
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const generateId = () =>
    typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2);

// ─────────────────────────────────────────────
// CORE TYPES
// ─────────────────────────────────────────────

export interface KeyResult {
    id: string;
    title: string;
    currentValue: number;
    targetValue: number;
    unit: string; // "$", "kg", "h", "%", "x", "days", etc.
    progress: number; // 0-100 calculated
}

export interface OKR {
    id: string;
    areaId: string;
    objective: string;
    keyResults: KeyResult[];
    startDate: string;
    endDate: string; // default 90 days from start
    status: 'active' | 'completed' | 'paused';
    createdAt: string;
}

export type ActionStatus = 'todo' | 'done' | 'skipped';

export interface WeeklyAction {
    id: string;
    areaId: string;
    title: string;
    description?: string;
    weekStart: string; // ISO date of Monday
    status: ActionStatus;
    priority: 1 | 2 | 3 | 4 | 5;
    estimatedMinutes?: number;
    completedAt?: string;
    notes?: string;
}

export type HabitFrequency = 'daily' | '3x_week' | 'weekly';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'anytime';

export interface AreaHabit {
    id: string;
    areaId: string;
    title: string;
    description?: string;
    frequency: HabitFrequency;
    timeOfDay: TimeOfDay;
    targetDaysPerWeek: number;
    completedDates: string[]; // 'YYYY-MM-DD' strings
    streak: number;
    longestStreak: number;
    active: boolean;
    createdAt: string;
    cue?: string;          // Implementation intention: trigger
    reward?: string;       // Implementation intention: reward
}

export interface AreaNote {
    id: string;
    areaId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    aiGenerated: boolean;
    tags: string[];
}

export type InsightType = 'insight' | 'warning' | 'celebration' | 'suggestion' | 'synergy';

export interface AreaInsight {
    id: string;
    areaId: string;
    content: string;
    type: InsightType;
    generatedAt: string;
    dismissed: boolean;
    relatedAreaId?: string; // For synergy insights
}

export interface AreaConnection {
    id: string;
    sourceAreaId: string;
    targetAreaId: string;
    type: 'synergy' | 'conflict' | 'dependency';
    description: string;
    detectedBy: 'user' | 'ai';
    createdAt: string;
}

// ─────────────────────────────────────────────
// FINANCE-SPECIFIC TYPES
// ─────────────────────────────────────────────

export interface Asset {
    id: string;
    name: string;
    category: 'cash' | 'investments' | 'real_estate' | 'business' | 'other';
    value: number;
    currency: string;
    updatedAt: string;
}

export interface Liability {
    id: string;
    name: string;
    category: 'credit_card' | 'loan' | 'mortgage' | 'business_debt' | 'other';
    balance: number;
    monthlyPayment?: number;
    interestRate?: number;
    currency: string;
    updatedAt: string;
}

export interface Subscription {
    id: string;
    name: string;
    monthlyAmount: number;
    category: string;
    lastUsed?: string;
    active: boolean;
    notes?: string;
}

export interface FinancialData {
    areaId: string;
    monthlyIncome: number;
    monthlyExpenses: number;
    assets: Asset[];
    liabilities: Liability[];
    subscriptions: Subscription[];
    freedomTargetAnnualExpenses: number; // Annual expenses * 25 = Freedom Number
    currentPortfolio: number;
    currency: string;
    updatedAt: string;
}

// ─────────────────────────────────────────────
// HEALTH-SPECIFIC TYPES
// ─────────────────────────────────────────────

export interface ReadinessLog {
    id: string;
    date: string; // YYYY-MM-DD
    sleepQuality: number; // 1-10
    energyLevel: number; // 1-10
    muscleSoreness: number; // 0-10
    hrv?: number; // ms
    readinessScore: number; // calculated 0-100
    recommendation: 'hard' | 'moderate' | 'light' | 'rest';
}

export interface SleepLog {
    id: string;
    date: string;
    bedtime: string; // HH:MM
    wakeTime: string; // HH:MM
    durationHours: number;
    quality: number; // 1-10
    factors: string[]; // 'alcohol', 'caffeine', 'stress', 'screens', 'exercise'
    notes?: string;
}

export interface TrainingSession {
    id: string;
    date: string;
    type: 'strength' | 'cardio' | 'mobility' | 'sport' | 'other';
    name: string;
    durationMinutes: number;
    rpe: number; // 1-10
    notes?: string;
    exercises?: { name: string; sets: number; reps?: number; weight?: number; }[];
}

export interface HealthData {
    areaId: string;
    readinessLogs: ReadinessLog[];
    sleepLogs: SleepLog[];
    trainingSessions: TrainingSession[];
    dailyProteinTarget: number; // grams
    currentWeight?: number;
    targetWeight?: number;
    heightCm?: number;
    updatedAt: string;
}

// ─────────────────────────────────────────────
// CAREER-SPECIFIC TYPES
// ─────────────────────────────────────────────

export interface DeepWorkSession {
    id: string;
    date: string;
    activity: string;
    durationMinutes: number;
    quality: 1 | 2 | 3 | 4 | 5; // 1=poor to 5=exceptional
    interruptions: number;
    output: string; // tangible output achieved
    energyStart: number; // 1-10
    energyEnd: number; // 1-10
}

export interface Project {
    id: string;
    name: string;
    description?: string;
    okrId?: string;
    metrics: { name: string; value: number; unit: string; }[];
    status: 'active' | 'paused' | 'completed';
    updatedAt: string;
}

export interface CareerData {
    areaId: string;
    legacyVision: string; // 10-year vision
    deepWorkSessions: DeepWorkSession[];
    projects: Project[];
    weeklyDeepWorkTarget: number; // hours
    updatedAt: string;
}

// ─────────────────────────────────────────────
// RELATIONSHIPS-SPECIFIC TYPES
// ─────────────────────────────────────────────

export interface RelationshipContact {
    id: string;
    name: string;
    category: 'partner' | 'family' | 'friend' | 'mentor' | 'colleague';
    circle: 1 | 2 | 3; // Dunbar circles
    lastContact?: string; // ISO date
    nextContactTarget?: string; // ISO date
    contactFrequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly';
    loveLanguage?: 'words' | 'time' | 'service' | 'gifts' | 'touch';
    status: 'excellent' | 'good' | 'needs_attention' | 'distant';
    notes?: string;
    importantDates: { label: string; date: string; }[];
}

export interface QualityMoment {
    id: string;
    contactId: string;
    date: string;
    description: string;
    depth: 1 | 2 | 3; // 1=casual, 2=meaningful, 3=deep
}

export interface RelationshipData {
    areaId: string;
    contacts: RelationshipContact[];
    qualityMoments: QualityMoment[];
    updatedAt: string;
}

// ─────────────────────────────────────────────
// LEARNING-SPECIFIC TYPES
// ─────────────────────────────────────────────

export type ReadingStatus = 'want_to_read' | 'reading' | 'processing' | 'applied' | 'abandoned';

export interface BookEntry {
    id: string;
    title: string;
    author: string;
    status: ReadingStatus;
    startDate?: string;
    finishDate?: string;
    progressPercent: number;
    keyIdeas: string[]; // Atomic ideas extracted
    topInsight?: string; // Single most important idea
    howApplied?: string; // How it was applied in real life
    rating?: number; // 1-5
    notes?: string;
}

export interface KnowledgeNode {
    id: string;
    title: string;
    content: string; // Atomic note
    sourceId?: string; // Book or course it came from
    sourceType?: 'book' | 'course' | 'conversation' | 'experience';
    connections: string[]; // IDs of connected nodes
    tags: string[];
    reviewCount: number;
    nextReviewDate?: string; // Spaced repetition
    createdAt: string;
}

export interface CourseEntry {
    id: string;
    title: string;
    platform?: string;
    reason: string; // Why taking it
    progressPercent: number;
    status: 'planned' | 'active' | 'completed' | 'paused';
    keyLearnings: string[];
    startDate?: string;
    completedDate?: string;
}

export interface LearningData {
    areaId: string;
    books: BookEntry[];
    courses: CourseEntry[];
    knowledgeNodes: KnowledgeNode[];
    updatedAt: string;
}

// ─────────────────────────────────────────────
// WELLNESS-SPECIFIC TYPES
// ─────────────────────────────────────────────

export interface MoodEntry {
    id: string;
    date: string;
    mood: number; // 1-10
    energy: number; // 1-10
    stress: number; // 1-10
    tags: string[]; // 'anxious', 'grateful', 'focused', 'scattered', etc.
    notes?: string;
}

export interface MindfulnessSession {
    id: string;
    date: string;
    type: 'meditation' | 'breathing' | 'journaling' | 'gratitude' | 'body_scan' | 'other';
    durationMinutes: number;
    quality: 1 | 2 | 3 | 4 | 5;
    notes?: string;
}

export interface WellnessData {
    areaId: string;
    moodEntries: MoodEntry[];
    mindfulnessSessions: MindfulnessSession[];
    currentTherapist?: string;
    therapyFrequency?: string;
    updatedAt: string;
}

// ─────────────────────────────────────────────
// CREATIVITY-SPECIFIC TYPES
// ─────────────────────────────────────────────

export interface CreativeProject {
    id: string;
    title: string;
    type: 'music' | 'visual_art' | 'writing' | 'sport' | 'crafts' | 'dance' | 'other';
    currentLevel: 1 | 2 | 3 | 4 | 5; // beginner to expert
    currentFocus: string; // Specific thing being practiced
    targetFrequency: string;
    nextMilestone: string;
    status: 'active' | 'paused' | 'completed';
    createdAt: string;
}

export interface FlowSession {
    id: string;
    projectId: string;
    date: string;
    durationMinutes: number;
    achievedFlow: boolean | 'partial';
    flowConditions: string[]; // What helped
    blockers: string[]; // What blocked
    notes?: string;
}

export interface CreativityData {
    areaId: string;
    projects: CreativeProject[];
    flowSessions: FlowSession[];
    brainstormNotes: string; // Free-form brainstorming space
    wantedExperiences: { title: string; completed: boolean; date?: string; notes?: string; }[];
    updatedAt: string;
}

// ─────────────────────────────────────────────
// GROWTH-SPECIFIC TYPES
// ─────────────────────────────────────────────

export interface Value {
    id: string;
    name: string;
    description: string; // Personal definition
    examples: string[]; // Real examples of living this value
    tensionWith?: string[]; // Values it sometimes conflicts with
    weeklyReflection?: string;
    weeklyReflectionDate?: string;
}

export interface DiscomfortChallenge {
    id: string;
    title: string;
    description: string;
    category: 'social' | 'physical' | 'creative' | 'intellectual' | 'emotional';
    date?: string;
    completed: boolean;
    reflection?: string;
}

export interface GrowthData {
    areaId: string;
    values: Value[];
    missionStatement: string; // Personal mission
    legacyStatement: string; // Epitaph / how to be remembered
    lifeRules: string[]; // Non-negotiable principles
    discomfortChallenges: DiscomfortChallenge[];
    ikigaiNotes: {
        love: string;
        worldNeeds: string;
        goodAt: string;
        paidFor: string;
    };
    updatedAt: string;
}

// ─────────────────────────────────────────────
// MAIN STORE STATE
// ─────────────────────────────────────────────

interface AreaModulesState {
    // Core data
    okrs: OKR[];
    weeklyActions: WeeklyAction[];
    habits: AreaHabit[];
    notes: AreaNote[];
    insights: AreaInsight[];
    connections: AreaConnection[];

    // Area-specific data
    financialData: Record<string, FinancialData>;
    healthData: Record<string, HealthData>;
    careerData: Record<string, CareerData>;
    relationshipData: Record<string, RelationshipData>;
    learningData: Record<string, LearningData>;
    wellnessData: Record<string, WellnessData>;
    creativityData: Record<string, CreativityData>;
    growthData: Record<string, GrowthData>;

    // ─── OKR Actions ───
    addOKR: (okr: Omit<OKR, 'id' | 'createdAt' | 'keyResults'> & { keyResults: Omit<KeyResult, 'id' | 'progress'>[] }) => string;
    updateOKR: (id: string, updates: Partial<OKR>) => void;
    updateKeyResult: (okrId: string, krId: string, updates: Partial<KeyResult>) => void;
    addKeyResult: (okrId: string, kr: Omit<KeyResult, 'id' | 'progress'>) => void;
    removeKeyResult: (okrId: string, krId: string) => void;
    deleteOKR: (id: string) => void;
    getActiveOKRForArea: (areaId: string) => OKR | undefined;
    getOKRProgress: (okrId: string) => number;

    // ─── Weekly Actions ───
    addWeeklyAction: (action: Omit<WeeklyAction, 'id'>) => string;
    updateWeeklyAction: (id: string, updates: Partial<WeeklyAction>) => void;
    deleteWeeklyAction: (id: string) => void;
    getActionsForAreaWeek: (areaId: string, weekStart: string) => WeeklyAction[];
    getCurrentWeekActions: (areaId: string) => WeeklyAction[];
    toggleActionDone: (id: string) => void;

    // ─── Habits ───
    addHabit: (habit: Omit<AreaHabit, 'id' | 'completedDates' | 'streak' | 'longestStreak' | 'createdAt'>) => string;
    updateHabit: (id: string, updates: Partial<AreaHabit>) => void;
    deleteHabit: (id: string) => void;
    toggleHabitDate: (habitId: string, date: string) => void;
    getHabitsForArea: (areaId: string) => AreaHabit[];
    calculateStreak: (habit: AreaHabit) => number;

    // ─── Notes ───
    addNote: (note: Omit<AreaNote, 'id' | 'createdAt' | 'updatedAt'>) => string;
    updateNote: (id: string, updates: Partial<AreaNote>) => void;
    deleteNote: (id: string) => void;
    getNotesForArea: (areaId: string) => AreaNote[];

    // ─── Insights ───
    addInsight: (insight: Omit<AreaInsight, 'id' | 'generatedAt' | 'dismissed'>) => void;
    dismissInsight: (id: string) => void;
    getActiveInsightsForArea: (areaId: string) => AreaInsight[];

    // ─── Connections ───
    addConnection: (conn: Omit<AreaConnection, 'id' | 'createdAt'>) => void;
    removeConnection: (id: string) => void;
    getConnectionsForArea: (areaId: string) => AreaConnection[];

    // ─── Area Health Score ───
    calculateHealthScore: (areaId: string) => number;

    // ─── Area-Specific Module Getters/Setters ───
    getFinancialData: (areaId: string) => FinancialData;
    updateFinancialData: (areaId: string, data: Partial<FinancialData>) => void;
    getHealthData: (areaId: string) => HealthData;
    updateHealthData: (areaId: string, data: Partial<HealthData>) => void;
    getCareerData: (areaId: string) => CareerData;
    updateCareerData: (areaId: string, data: Partial<CareerData>) => void;
    getRelationshipData: (areaId: string) => RelationshipData;
    updateRelationshipData: (areaId: string, data: Partial<RelationshipData>) => void;
    getLearningData: (areaId: string) => LearningData;
    updateLearningData: (areaId: string, data: Partial<LearningData>) => void;
    getWellnessData: (areaId: string) => WellnessData;
    updateWellnessData: (areaId: string, data: Partial<WellnessData>) => void;
    getCreativityData: (areaId: string) => CreativityData;
    updateCreativityData: (areaId: string, data: Partial<CreativityData>) => void;
    getGrowthData: (areaId: string) => GrowthData;
    updateGrowthData: (areaId: string, data: Partial<GrowthData>) => void;
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function getMonday(date: Date = new Date()): string {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    return d.toISOString().split('T')[0];
}

function calcKRProgress(kr: Pick<KeyResult, 'currentValue' | 'targetValue'>): number {
    if (kr.targetValue === 0) return 0;
    return Math.min(100, Math.round((kr.currentValue / kr.targetValue) * 100));
}

function calcOKRProgress(okr: OKR): number {
    if (okr.keyResults.length === 0) return 0;
    const avg = okr.keyResults.reduce((sum, kr) => sum + calcKRProgress(kr), 0) / okr.keyResults.length;
    return Math.round(avg);
}

function calcHabitStreak(habit: AreaHabit): number {
    if (habit.completedDates.length === 0) return 0;
    const sorted = [...habit.completedDates].sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    let streak = 0;
    let checkDate = today;

    for (let i = 0; i < 365; i++) {
        if (sorted.includes(checkDate)) {
            streak++;
        } else if (i > 0) {
            // Allow 1-day gap for daily habits
            break;
        }
        const d = new Date(checkDate);
        d.setDate(d.getDate() - 1);
        checkDate = d.toISOString().split('T')[0];
    }
    return streak;
}

// Default data factories
function defaultFinancialData(areaId: string): FinancialData {
    return {
        areaId,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        assets: [],
        liabilities: [],
        subscriptions: [],
        freedomTargetAnnualExpenses: 0,
        currentPortfolio: 0,
        currency: 'USD',
        updatedAt: new Date().toISOString(),
    };
}

function defaultHealthData(areaId: string): HealthData {
    return {
        areaId,
        readinessLogs: [],
        sleepLogs: [],
        trainingSessions: [],
        dailyProteinTarget: 150,
        updatedAt: new Date().toISOString(),
    };
}

function defaultCareerData(areaId: string): CareerData {
    return {
        areaId,
        legacyVision: '',
        deepWorkSessions: [],
        projects: [],
        weeklyDeepWorkTarget: 20,
        updatedAt: new Date().toISOString(),
    };
}

function defaultRelationshipData(areaId: string): RelationshipData {
    return {
        areaId,
        contacts: [],
        qualityMoments: [],
        updatedAt: new Date().toISOString(),
    };
}

function defaultLearningData(areaId: string): LearningData {
    return {
        areaId,
        books: [],
        courses: [],
        knowledgeNodes: [],
        updatedAt: new Date().toISOString(),
    };
}

function defaultWellnessData(areaId: string): WellnessData {
    return {
        areaId,
        moodEntries: [],
        mindfulnessSessions: [],
        updatedAt: new Date().toISOString(),
    };
}

function defaultCreativityData(areaId: string): CreativityData {
    return {
        areaId,
        projects: [],
        flowSessions: [],
        brainstormNotes: '',
        wantedExperiences: [],
        updatedAt: new Date().toISOString(),
    };
}

function defaultGrowthData(areaId: string): GrowthData {
    return {
        areaId,
        values: [],
        missionStatement: '',
        legacyStatement: '',
        lifeRules: [],
        discomfortChallenges: [],
        ikigaiNotes: { love: '', worldNeeds: '', goodAt: '', paidFor: '' },
        updatedAt: new Date().toISOString(),
    };
}

// ─────────────────────────────────────────────
// STORE CREATION
// ─────────────────────────────────────────────

export const useAreaModulesStore = create<AreaModulesState>()(
    persist(
        (set, get) => ({
            okrs: [],
            weeklyActions: [],
            habits: [],
            notes: [],
            insights: [],
            connections: [],
            financialData: {},
            healthData: {},
            careerData: {},
            relationshipData: {},
            learningData: {},
            wellnessData: {},
            creativityData: {},
            growthData: {},

            // ─── OKR Actions ───
            addOKR: (okr) => {
                const id = generateId();
                const newOKR: OKR = {
                    ...okr,
                    id,
                    createdAt: new Date().toISOString(),
                    keyResults: okr.keyResults.map(kr => ({
                        ...kr,
                        id: generateId(),
                        progress: calcKRProgress(kr),
                    })),
                };
                set(state => ({ okrs: [...state.okrs, newOKR] }));
                return id;
            },

            updateOKR: (id, updates) => {
                set(state => ({
                    okrs: state.okrs.map(o => o.id === id ? { ...o, ...updates } : o)
                }));
            },

            updateKeyResult: (okrId, krId, updates) => {
                set(state => ({
                    okrs: state.okrs.map(o => {
                        if (o.id !== okrId) return o;
                        return {
                            ...o,
                            keyResults: o.keyResults.map(kr => {
                                if (kr.id !== krId) return kr;
                                const updated = { ...kr, ...updates };
                                return { ...updated, progress: calcKRProgress(updated) };
                            })
                        };
                    })
                }));
            },

            addKeyResult: (okrId, kr) => {
                const newKR: KeyResult = {
                    ...kr,
                    id: generateId(),
                    progress: calcKRProgress(kr),
                };
                set(state => ({
                    okrs: state.okrs.map(o =>
                        o.id === okrId
                            ? { ...o, keyResults: [...o.keyResults, newKR] }
                            : o
                    )
                }));
            },

            removeKeyResult: (okrId, krId) => {
                set(state => ({
                    okrs: state.okrs.map(o =>
                        o.id === okrId
                            ? { ...o, keyResults: o.keyResults.filter(kr => kr.id !== krId) }
                            : o
                    )
                }));
            },

            deleteOKR: (id) => {
                set(state => ({ okrs: state.okrs.filter(o => o.id !== id) }));
            },

            getActiveOKRForArea: (areaId) => {
                return get().okrs.find(o => o.areaId === areaId && o.status === 'active');
            },

            getOKRProgress: (okrId) => {
                const okr = get().okrs.find(o => o.id === okrId);
                return okr ? calcOKRProgress(okr) : 0;
            },

            // ─── Weekly Actions ───
            addWeeklyAction: (action) => {
                const id = generateId();
                set(state => ({
                    weeklyActions: [...state.weeklyActions, { ...action, id }]
                }));
                return id;
            },

            updateWeeklyAction: (id, updates) => {
                set(state => ({
                    weeklyActions: state.weeklyActions.map(a =>
                        a.id === id ? { ...a, ...updates } : a
                    )
                }));
            },

            deleteWeeklyAction: (id) => {
                set(state => ({
                    weeklyActions: state.weeklyActions.filter(a => a.id !== id)
                }));
            },

            getActionsForAreaWeek: (areaId, weekStart) => {
                return get().weeklyActions.filter(
                    a => a.areaId === areaId && a.weekStart === weekStart
                );
            },

            getCurrentWeekActions: (areaId) => {
                const weekStart = getMonday();
                return get().weeklyActions.filter(
                    a => a.areaId === areaId && a.weekStart === weekStart
                );
            },

            toggleActionDone: (id) => {
                set(state => ({
                    weeklyActions: state.weeklyActions.map(a => {
                        if (a.id !== id) return a;
                        const newStatus: ActionStatus = a.status === 'done' ? 'todo' : 'done';
                        return {
                            ...a,
                            status: newStatus,
                            completedAt: newStatus === 'done' ? new Date().toISOString() : undefined,
                        };
                    })
                }));
            },

            // ─── Habits ───
            addHabit: (habit) => {
                const id = generateId();
                const newHabit: AreaHabit = {
                    ...habit,
                    id,
                    completedDates: [],
                    streak: 0,
                    longestStreak: 0,
                    createdAt: new Date().toISOString(),
                };
                set(state => ({ habits: [...state.habits, newHabit] }));
                return id;
            },

            updateHabit: (id, updates) => {
                set(state => ({
                    habits: state.habits.map(h => h.id === id ? { ...h, ...updates } : h)
                }));
            },

            deleteHabit: (id) => {
                set(state => ({ habits: state.habits.filter(h => h.id !== id) }));
            },

            toggleHabitDate: (habitId, date) => {
                set(state => ({
                    habits: state.habits.map(h => {
                        if (h.id !== habitId) return h;
                        const isCompleted = h.completedDates.includes(date);
                        const newDates = isCompleted
                            ? h.completedDates.filter(d => d !== date)
                            : [...h.completedDates, date];
                        const updatedHabit = { ...h, completedDates: newDates };
                        const streak = calcHabitStreak(updatedHabit);
                        return {
                            ...updatedHabit,
                            streak,
                            longestStreak: Math.max(h.longestStreak, streak),
                        };
                    })
                }));
            },

            getHabitsForArea: (areaId) => {
                return get().habits.filter(h => h.areaId === areaId && h.active);
            },

            calculateStreak: (habit) => calcHabitStreak(habit),

            // ─── Notes ───
            addNote: (note) => {
                const id = generateId();
                const now = new Date().toISOString();
                set(state => ({
                    notes: [...state.notes, { ...note, id, createdAt: now, updatedAt: now }]
                }));
                return id;
            },

            updateNote: (id, updates) => {
                set(state => ({
                    notes: state.notes.map(n =>
                        n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
                    )
                }));
            },

            deleteNote: (id) => {
                set(state => ({ notes: state.notes.filter(n => n.id !== id) }));
            },

            getNotesForArea: (areaId) => {
                return get().notes
                    .filter(n => n.areaId === areaId)
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            },

            // ─── Insights ───
            addInsight: (insight) => {
                set(state => ({
                    insights: [...state.insights, {
                        ...insight,
                        id: generateId(),
                        generatedAt: new Date().toISOString(),
                        dismissed: false,
                    }]
                }));
            },

            dismissInsight: (id) => {
                set(state => ({
                    insights: state.insights.map(i => i.id === id ? { ...i, dismissed: true } : i)
                }));
            },

            getActiveInsightsForArea: (areaId) => {
                return get().insights
                    .filter(i => i.areaId === areaId && !i.dismissed)
                    .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime());
            },

            // ─── Connections ───
            addConnection: (conn) => {
                set(state => ({
                    connections: [...state.connections, {
                        ...conn,
                        id: generateId(),
                        createdAt: new Date().toISOString(),
                    }]
                }));
            },

            removeConnection: (id) => {
                set(state => ({ connections: state.connections.filter(c => c.id !== id) }));
            },

            getConnectionsForArea: (areaId) => {
                return get().connections.filter(
                    c => c.sourceAreaId === areaId || c.targetAreaId === areaId
                );
            },

            // ─── Health Score ───
            calculateHealthScore: (areaId) => {
                const state = get();
                const weekStart = getMonday();
                const actions = state.getActionsForAreaWeek(areaId, weekStart);
                const habits = state.getHabitsForArea(areaId);
                const okr = state.getActiveOKRForArea(areaId);

                let score = 50; // Base score

                // Action completion rate (30% of score)
                if (actions.length > 0) {
                    const completionRate = actions.filter(a => a.status === 'done').length / actions.length;
                    score += completionRate * 30 - 15;
                }

                // Habit streaks (30% of score)
                if (habits.length > 0) {
                    const avgStreak = habits.reduce((sum, h) => sum + Math.min(h.streak, 21), 0) / habits.length;
                    score += (avgStreak / 21) * 30 - 15;
                }

                // OKR progress (20% of score)
                if (okr) {
                    const progress = calcOKRProgress(okr);
                    score += (progress / 100) * 20 - 10;
                }

                // Active area bonus (20%)
                score += 15;

                return Math.max(0, Math.min(100, Math.round(score)));
            },

            // ─── Area-Specific Data ───
            getFinancialData: (areaId) => {
                return get().financialData[areaId] || defaultFinancialData(areaId);
            },
            updateFinancialData: (areaId, data) => {
                set(state => ({
                    financialData: {
                        ...state.financialData,
                        [areaId]: {
                            ...defaultFinancialData(areaId),
                            ...state.financialData[areaId],
                            ...data,
                            updatedAt: new Date().toISOString(),
                        }
                    }
                }));
            },

            getHealthData: (areaId) => get().healthData[areaId] || defaultHealthData(areaId),
            updateHealthData: (areaId, data) => {
                set(state => ({
                    healthData: {
                        ...state.healthData,
                        [areaId]: { ...defaultHealthData(areaId), ...state.healthData[areaId], ...data, updatedAt: new Date().toISOString() }
                    }
                }));
            },

            getCareerData: (areaId) => get().careerData[areaId] || defaultCareerData(areaId),
            updateCareerData: (areaId, data) => {
                set(state => ({
                    careerData: {
                        ...state.careerData,
                        [areaId]: { ...defaultCareerData(areaId), ...state.careerData[areaId], ...data, updatedAt: new Date().toISOString() }
                    }
                }));
            },

            getRelationshipData: (areaId) => get().relationshipData[areaId] || defaultRelationshipData(areaId),
            updateRelationshipData: (areaId, data) => {
                set(state => ({
                    relationshipData: {
                        ...state.relationshipData,
                        [areaId]: { ...defaultRelationshipData(areaId), ...state.relationshipData[areaId], ...data, updatedAt: new Date().toISOString() }
                    }
                }));
            },

            getLearningData: (areaId) => get().learningData[areaId] || defaultLearningData(areaId),
            updateLearningData: (areaId, data) => {
                set(state => ({
                    learningData: {
                        ...state.learningData,
                        [areaId]: { ...defaultLearningData(areaId), ...state.learningData[areaId], ...data, updatedAt: new Date().toISOString() }
                    }
                }));
            },

            getWellnessData: (areaId) => get().wellnessData[areaId] || defaultWellnessData(areaId),
            updateWellnessData: (areaId, data) => {
                set(state => ({
                    wellnessData: {
                        ...state.wellnessData,
                        [areaId]: { ...defaultWellnessData(areaId), ...state.wellnessData[areaId], ...data, updatedAt: new Date().toISOString() }
                    }
                }));
            },

            getCreativityData: (areaId) => get().creativityData[areaId] || defaultCreativityData(areaId),
            updateCreativityData: (areaId, data) => {
                set(state => ({
                    creativityData: {
                        ...state.creativityData,
                        [areaId]: { ...defaultCreativityData(areaId), ...state.creativityData[areaId], ...data, updatedAt: new Date().toISOString() }
                    }
                }));
            },

            getGrowthData: (areaId) => get().growthData[areaId] || defaultGrowthData(areaId),
            updateGrowthData: (areaId, data) => {
                set(state => ({
                    growthData: {
                        ...state.growthData,
                        [areaId]: { ...defaultGrowthData(areaId), ...state.growthData[areaId], ...data, updatedAt: new Date().toISOString() }
                    }
                }));
            },
        }),
        {
            name: 'glow-area-modules-v1',
        }
    )
);

// ─────────────────────────────────────────────
// UTILITY EXPORTS
// ─────────────────────────────────────────────

export { getMonday, calcKRProgress, calcOKRProgress };
