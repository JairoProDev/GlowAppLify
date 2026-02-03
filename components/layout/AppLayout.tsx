"use client"

import * as React from "react"
import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"
import { BottomNav } from "./BottomNav"

interface AppLayoutProps {
    children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-y-auto bg-background-alt/50 p-4 pb-24 md:pb-6 md:p-8">
                    <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-500">
                        {children}
                    </div>
                </main>
                <BottomNav />
            </div>
        </div>
    )
}
