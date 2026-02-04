"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Calendar,
    CheckSquare,
    FileText,
    BookOpen,
    Zap,
    BarChart,
    Settings,
    ChevronLeft,
    ChevronRight,
    Target,
    Bot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/lib/store/ui-store"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GlobalSearch } from "../GlobalSearch"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useLanguage } from "@/lib/i18n/LanguageContext"

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

function SidebarSection({ title, collapsed, children }: { title: string, collapsed: boolean, children: React.ReactNode }) {
    if (collapsed) return <div className="space-y-1 py-2 border-t first:border-t-0">{children}</div>;

    return (
        <div className="py-2">
            <h4 className="mb-1 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
                {title}
            </h4>
            <div className="space-y-1">{children}</div>
        </div>
    )
}

export function Sidebar() {
    const pathname = usePathname()
    const { sidebarOpen, toggleSidebar } = useUIStore()
    const { t } = useLanguage()
    const collapsed = !sidebarOpen

    return (
        <aside
            onClick={(e) => {
                // If collapsed and clicking main container, toggle
                if (collapsed) {
                    toggleSidebar()
                }
            }}
            className={cn(
                "relative flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
                collapsed ? "w-[60px] cursor-pointer hover:bg-sidebar/50" : "w-64"
            )}
        >
            <div className="flex h-14 items-center justify-between border-b px-3.5 group">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground relative transition-transform group-hover:scale-105">
                        {collapsed ? (
                            <>
                                <span className="group-hover:hidden">G</span>
                                <ChevronRight className="h-5 w-5 hidden group-hover:block" />
                            </>
                        ) : (
                            <span>G</span>
                        )}
                    </div>
                    {!collapsed && <span>Glow<span className="text-foreground">AppLify</span></span>}
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:bg-background/80"
                    onClick={(e) => {
                        e.stopPropagation()
                        toggleSidebar()
                    }}
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                {!collapsed && (
                    <div className="px-4 mb-4">
                        <GlobalSearch />
                    </div>
                )}

                <nav className="grid gap-1 px-2">
                    <SidebarSection title={t('sidebar.core') as string} collapsed={collapsed}>
                        <SidebarItem icon={LayoutDashboard} label={t('common.dashboard') as string} href="/dashboard" active={pathname === "/dashboard"} collapsed={collapsed} />
                        <SidebarItem icon={Target} label="Execution Board" href="/board" active={pathname === "/board"} collapsed={collapsed} />
                    </SidebarSection>

                    <SidebarSection title={t('sidebar.execution') as string} collapsed={collapsed}>
                        <SidebarItem icon={Calendar} label={t('common.calendar') as string} href="/calendar" active={pathname === "/calendar"} collapsed={collapsed} />
                        <SidebarItem icon={CheckSquare} label={t('common.tasks') as string} href="/tasks" active={pathname === "/tasks"} collapsed={collapsed} />
                    </SidebarSection>

                    <SidebarSection title={t('sidebar.growth') as string} collapsed={collapsed}>
                        <SidebarItem icon={BookOpen} label={t('common.journal') as string} href="/journal" active={pathname === "/journal"} collapsed={collapsed} />
                        <SidebarItem icon={Zap} label={t('common.routines') as string} href="/routines" active={pathname === "/routines"} collapsed={collapsed} />
                        <SidebarItem icon={Bot} label={t('common.aiCoach') as string} href="/coach" active={pathname === "/coach"} collapsed={collapsed} />
                    </SidebarSection>

                    <SidebarSection title={t('sidebar.review') as string} collapsed={collapsed}>
                        <SidebarItem icon={FileText} label={t('common.notes') as string} href="/notes" active={pathname === "/notes"} collapsed={collapsed} />
                        <SidebarItem icon={BarChart} label={t('common.analytics') as string} href="/analytics" active={pathname === "/analytics"} collapsed={collapsed} />
                    </SidebarSection>
                </nav>
            </div>

            <div className="mt-auto border-t p-2">
                <SidebarItem icon={Settings} label={t('common.settings') as string} href="/settings" active={pathname === "/settings"} collapsed={collapsed} />

                <div className={cn("flex items-center gap-2 mt-2", collapsed ? "justify-center" : "px-2")}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className={cn("w-full justify-start gap-2 px-1 hover:bg-sidebar-accent", collapsed && "justify-center px-0")}>
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                {!collapsed && (
                                    <div className="flex flex-col items-start text-xs">
                                        <span className="font-semibold">Jairo Pro</span>
                                        <span className="text-muted-foreground">Pro Plan</span>
                                    </div>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56" side="right">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>
        </aside>
    )
}
