"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Type } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"

export function ThemeLanguageToggle() {
    const { setTheme, theme } = useTheme()
    const { language, setLanguage, t } = useLanguage()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Monitor className="mr-2 h-4 w-4" />
                        <span>{t('settings.appearance')}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            <Sun className="mr-2 h-4 w-4" />
                            <span>{t('settings.light_mode')}</span>
                            {theme === 'light' && <span className="ml-auto text-xs opacity-50">✓</span>}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            <Moon className="mr-2 h-4 w-4" />
                            <span>{t('settings.dark_mode')}</span>
                            {theme === 'dark' && <span className="ml-auto text-xs opacity-50">✓</span>}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            <Monitor className="mr-2 h-4 w-4" />
                            <span>{t('settings.system_mode')}</span>
                            {theme === 'system' && <span className="ml-auto text-xs opacity-50">✓</span>}
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Type className="mr-2 h-4 w-4" />
                        <span>{t('settings.language')}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setLanguage("en")}>
                            <span className="mr-2">🇺🇸</span>
                            <span>English</span>
                            {language === 'en' && <span className="ml-auto text-xs opacity-50">✓</span>}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage("es")}>
                            <span className="mr-2">🇪🇸</span>
                            <span>Español</span>
                            {language === 'es' && <span className="ml-auto text-xs opacity-50">✓</span>}
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
