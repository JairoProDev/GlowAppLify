"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "./Sidebar"
import { BottomNav } from "./BottomNav"
import { cn } from "@/lib/utils"

interface AppLayoutProps {
    children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    const pathname = usePathname()
    const isCalendar = pathname?.includes('/calendar')

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <main className={cn(
                    "flex-1 bg-background-alt/50",
                    isCalendar ? "overflow-hidden p-0" : "overflow-y-auto p-4 pb-24 md:pb-6 md:p-8"
                )}>
                    <div className={cn(
                        "animate-in fade-in zoom-in duration-500 h-full",
                        !isCalendar && "mx-auto max-w-7xl"
                    )}>
                        {children}
                    </div>
                </main>
                <BottomNav />
            </div>
        </div>
    )
}
