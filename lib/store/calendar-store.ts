import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CalendarEvent, EventType } from '@/lib/calendar/types'
import { addHours, startOfDay, addDays } from 'date-fns'

interface CalendarState {
    events: CalendarEvent[];
    addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
    updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
    deleteEvent: (id: string) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

// Mock data generator for "WOW" factor
const now = new Date();
const today = startOfDay(now);

const mockEvents: CalendarEvent[] = [
    {
        id: '1',
        userId: 'user-1',
        title: 'Deep Work: MVP Architecture',
        description: 'Focusing on the core database schema and refined UI types.',
        startTime: addHours(today, 9), // 9:00 AM
        endTime: addHours(today, 11), // 11:00 AM
        timeZone: 'UTC',
        type: 'DEEP_WORK_ANALYTICAL',
        energyRequired: 'high',
        status: 'scheduled',
        isRecurring: false
    },
    {
        id: '2',
        userId: 'user-1',
        title: 'Team Sync',
        startTime: addHours(today, 13), // 1:00 PM
        endTime: addHours(today, 13.5), // 1:30 PM
        timeZone: 'UTC',
        type: 'MEETING_GROUP',
        energyRequired: 'medium',
        status: 'scheduled',
        isRecurring: true
    },
    {
        id: '3',
        userId: 'user-1',
        title: 'Gym Session',
        startTime: addHours(today, 17), // 5:00 PM
        endTime: addHours(today, 18.5), // 6:30 PM
        timeZone: 'UTC',
        type: 'HEALTH_FITNESS',
        energyRequired: 'high',
        status: 'scheduled',
        isRecurring: true
    },
    {
        id: '4',
        userId: 'user-1',
        title: 'Creative: UI Design',
        startTime: addHours(addDays(today, 1), 10), // Tomorrow 10 AM
        endTime: addHours(addDays(today, 1), 12),
        timeZone: 'UTC',
        type: 'DEEP_WORK_CREATIVE',
        energyRequired: 'high',
        status: 'scheduled',
        isRecurring: false
    }
];

export const useCalendarStore = create<CalendarState>()(
    persist(
        (set) => ({
            events: mockEvents,
            addEvent: (event) => set((state) => ({
                events: [...state.events, { ...event, id: generateId() }]
            })),
            updateEvent: (id, updates) => set((state) => ({
                events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e))
            })),
            deleteEvent: (id) => set((state) => ({
                events: state.events.filter((e) => e.id !== id)
            })),
        }),
        {
            name: 'glow-calendar-storage',
        }
    )
)
