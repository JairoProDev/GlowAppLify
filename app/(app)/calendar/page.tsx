import CalendarView from "@/components/calendar/CalendarView"

export default function CalendarPage() {
    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col p-4 animate-in fade-in duration-500">
            <CalendarView />
        </div>
    )
}
