
"use client";

import { BrainCircuit } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { landingContent } from "@/lib/i18n/landingContent";
import { InteractiveTrigger } from "@/components/landing/InteractiveTrigger";
import { deepDivesEn, deepDivesEs } from "@/lib/landing/deepDiveContent";

export function Footer() {
    const { language } = useLanguage();
    const t = landingContent[language].nav; // Use nav translations for generic links or just hardcode some universals
    const currentDeepDives = language === 'es' ? deepDivesEs : deepDivesEn;

    return (
        <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 lg:col-span-2">
                        <InteractiveTrigger diveData={currentDeepDives["mission"]}>
                            <div className="flex items-center gap-2 mb-4 cursor-pointer group">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white group-hover:scale-110 transition-transform">
                                    <BrainCircuit size={20} />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                    GlowApplify
                                </span>
                            </div>
                        </InteractiveTrigger>
                        <p className="text-zinc-500 text-sm max-w-sm mb-6">
                            The AI Life Copilot.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholder */}
                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-100 transition-colors"></div>
                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-100 transition-colors"></div>
                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-100 transition-colors"></div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white mb-4">Product</h4>
                        <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <li className="hover:text-blue-600 cursor-pointer">{t.howItWorks}</li>
                            <li className="hover:text-blue-600 cursor-pointer">{t.features}</li>
                            <li className="hover:text-blue-600 cursor-pointer">{t.pricing}</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <li className="hover:text-blue-600 cursor-pointer">Blog</li>
                            <li className="hover:text-blue-600 cursor-pointer">Case Studies</li>
                            <li className="hover:text-blue-600 cursor-pointer">Help Center</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white mb-4">Company</h4>
                        <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <li className="hover:text-blue-600 cursor-pointer">About</li>
                            <li className="hover:text-blue-600 cursor-pointer">Careers</li>
                            <InteractiveTrigger diveData={currentDeepDives["privacy"]}>
                                <li className="hover:text-blue-600 cursor-pointer">Privacy</li>
                            </InteractiveTrigger>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
                    <div>&copy; 2026 GlowApplify Inc. All rights reserved.</div>
                    <div className="flex gap-6">
                        <span className="cursor-pointer hover:text-zinc-900 dark:hover:text-white">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-zinc-900 dark:hover:text-white">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
