
"use client";

import Link from "next/link";
import { BrainCircuit, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { landingContent } from "@/lib/i18n/landingContent";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
    const { language, setLanguage } = useLanguage();
    const t = landingContent[language].nav;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/30">
                        <BrainCircuit size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        GlowApplify
                    </span>
                </div>
                <div className="flex items-center gap-4">

                    {/* Language Switcher */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-blue-600 transition-colors">
                                <Globe className="h-5 w-5" />
                                <span className="sr-only">Switch Language</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setLanguage('es')} className={language === 'es' ? 'bg-blue-50 text-blue-600 font-medium' : ''}>
                                🇪🇸 Español
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-blue-50 text-blue-600 font-medium' : ''}>
                                🇺🇸 English
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/login" className="text-sm font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 hidden sm:block">
                        {t.signIn}
                    </Link>
                    <Link href="/onboarding">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
                            {t.getStarted}
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
