import { CalendarEvent, RecurrenceFrequency } from './types'
import {
    addDays,
    addWeeks,
    addMonths,
    isSameDay,
    startOfDay,
    isAfter,
    isBefore,
    differenceInDays
} from 'date-fns'

export function expandRecurringEvents(events: CalendarEvent[], start: Date, end: Date): CalendarEvent[] {
    const expanded: CalendarEvent[] = []

    events.forEach(event => {
        // Always add the original event if it's within range
        const eventStart = new Date(event.startTime)
        if (isAfter(eventStart, start) && isBefore(eventStart, end) || isSameDay(eventStart, start) || isSameDay(eventStart, end)) {
            // But only if it's not already recurring? 
            // Actually, we'll handle recurring events separately to avoid duplicates if the original is in range.
        }

        if (!event.isRecurring || !event.recurrenceFrequency || event.recurrenceFrequency === 'none') {
            if (isAfter(eventStart, start) && isBefore(eventStart, end) || isSameDay(eventStart, start) || isSameDay(eventStart, end)) {
                expanded.push(event)
            }
            return
        }

        // Handle recurring events
        let currentInstanceStart = new Date(event.startTime)
        let currentInstanceEnd = new Date(event.endTime)
        const duration = currentInstanceEnd.getTime() - currentInstanceStart.getTime()

        // Iterate forward from the event's start date up to the requested 'end' date or a reasonable limit (e.g. 1 year)
        const limitDate = addMonths(start, 3) // Let's limit expansion to 3 months for performance

        // Find the first instance that could be in or after our range
        while (isBefore(currentInstanceStart, start) && !isSameDay(currentInstanceStart, start)) {
            currentInstanceStart = getNextOccurrence(currentInstanceStart, event.recurrenceFrequency)
        }

        // Now collect instances within the range
        while (isBefore(currentInstanceStart, end) || isSameDay(currentInstanceStart, end)) {
            if (isAfter(currentInstanceStart, limitDate)) break

            if ((isAfter(currentInstanceStart, start) || isSameDay(currentInstanceStart, start)) &&
                (isBefore(currentInstanceStart, end) || isSameDay(currentInstanceStart, end))) {

                expanded.push({
                    ...event,
                    id: `${event.id}-${currentInstanceStart.getTime()}`, // Virtual ID
                    startTime: new Date(currentInstanceStart),
                    endTime: new Date(currentInstanceStart.getTime() + duration),
                    isVirtualInstance: true // Mark as virtual so we know it's not the original for editing
                } as any)
            }

            currentInstanceStart = getNextOccurrence(currentInstanceStart, event.recurrenceFrequency)
        }
    })

    return expanded
}

function getNextOccurrence(date: Date, frequency: RecurrenceFrequency): Date {
    switch (frequency) {
        case 'daily':
            return addDays(date, 1)
        case 'interdaily':
            return addDays(date, 2)
        case 'weekly':
            return addWeeks(date, 1)
        case 'monthly':
            return addMonths(date, 1)
        default:
            return addDays(date, 1)
    }
}
