
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { landingContent } from "@/lib/i18n/landingContent";

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { language } = useLanguage();
    const t = landingContent[language].faq;

    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-center text-zinc-900 sm:text-4xl dark:text-white mb-16">
                    {t.headline}
                </h2>

                <div className="space-y-4">
                    {t.items.map((faq, i) => (
                        <div key={i} className="border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="flex items-center justify-between w-full p-6 text-left"
                            >
                                <span className="font-semibold text-lg text-zinc-900 dark:text-white pr-8">{faq.q}</span>
                                {openIndex === i ? (
                                    <Minus className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                ) : (
                                    <Plus className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                                )}
                            </button>

                            {openIndex === i && (
                                <div className="px-6 pb-6 text-zinc-600 dark:text-zinc-400 leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
