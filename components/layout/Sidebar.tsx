"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUIStore } from "@/lib/store/ui-store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    LayoutDashboard,
    Target, // Board
    Calendar,
    CheckSquare, // Tasks
    FileText, // Notes
    BookOpen, // Journal
    Repeat, // Routines
    BarChart2, // Analytics
    Settings,
    Bot, // AI Coach
    Menu,
    ChevronLeft,
    ChevronRight
} from "lucide-react"

interface SidebarItemProps {
    icon: React.ElementType
    label: string
    href: string
    active?: boolean
    collapsed?: boolean
}

function SidebarItem({ icon: Icon, label, href, active, collapsed }: SidebarItemProps) {
    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Link
                    href={href}
                    className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground",
                        collapsed && "justify-center px-2"
                    )}
                >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{label}</span>}
                </Link>
            </TooltipTrigger>
            {collapsed && (
                <TooltipContent side="right">
                    {label}
                </TooltipContent>
            )}
        </Tooltip>
    )
}

export function Sidebar() {
    const pathname = usePathname()
    const { sidebarOpen, toggleSidebar } = useUIStore()

    // This might need adjustment based on real routes, using hash or query params for now if single page
    // But Roadmap suggests routing. For MVP refactor, assuming we might move to routes later.
    // For now, I'll link to hash or stay on page with query params if the user hasn't set up routes yet.
    // Actually, let's assume standard routes for the Future.

    const items = [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Execution Board", icon: Target, href: "/board" },
        { label: "Calendar", icon: Calendar, href: "/calendar" },
        { label: "Tasks", icon: CheckSquare, href: "/tasks" },
        { label: "Notes", icon: FileText, href: "/notes" },
        { label: "Journal", icon: BookOpen, href: "/journal" },
        { label: "Routines", icon: Repeat, href: "/routines" },
        { label: "Analytics", icon: BarChart2, href: "/analytics" },
        { label: "Settings", icon: Settings, href: "/settings" },
    ]

    return (
        <div
            className={cn(
                "relative hidden flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 md:flex",
                sidebarOpen ? "w-64" : "w-16"
            )}
        >
            <div className="flex h-14 items-center border-b px-3 justify-between">
                {sidebarOpen ? (
                    <span className="font-bold text-lg tracking-tight pl-2">GlowAppLify</span>
                ) : (
                    <span className="font-bold text-xl pl-2">G</span>
                )}
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto h-8 w-8">
                    {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
            </div>

            <ScrollArea className="flex-1 py-4">
                <nav className="grid gap-1 px-2">
                    {items.map((item, index) => (
                        <SidebarItem
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                            active={pathname === item.href || (item.href === '/board' && pathname === '/')} // Temporary logic
                            collapsed={!sidebarOpen}
                        />
                    ))}
                </nav>
            </ScrollArea>

            <div className="border-t p-2">
                <SidebarItem
                    icon={Bot}
                    label="AI Coach"
                    href="/coach"
                    active={pathname === "/coach"}
                    collapsed={!sidebarOpen}
                />
            </div>
        </div>
    )
}
