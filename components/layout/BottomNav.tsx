"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Target, Calendar, Plus, Bot } from "lucide-react"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export function BottomNav() {
    const pathname = usePathname()
    const { t } = useLanguage()

    const items = [
        { label: t('nav.home'), icon: LayoutDashboard, href: "/dashboard" },
        { label: t('nav.board'), icon: Target, href: "/board" },
        { label: t('nav.add'), icon: Plus, href: "/new-task", highlight: true },
        { label: t('nav.calendar'), icon: Calendar, href: "/calendar" },
        { label: t('nav.aiCoach'), icon: Bot, href: "/coach" },
    ]

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background p-2 md:hidden">
            <nav className="flex items-center justify-around">
                {items.map((item, index) => {
                    const isActive = pathname === item.href

                    if (item.highlight) {
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg -mt-6"
                            >
                                <item.icon className="h-6 w-6" />
                            </Link>
                        )
                    }

                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 text-xs font-medium transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}

