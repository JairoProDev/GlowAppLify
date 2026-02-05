
"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { landingContent } from "@/lib/i18n/landingContent";
import { X, HelpCircle, CheckCircle2 } from "lucide-react";

export function Comparison() {
    const { language } = useLanguage();
    const t = landingContent[language].comparison;

    // Helper to render cell content based on string indicators
    const renderCell = (content: string, isGlow: boolean) => {
        if (content.startsWith("✅")) {
            return (
                <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${isGlow ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-500'}`} />
                    <span className={`font-medium ${isGlow ? 'text-blue-900 dark:text-blue-100' : 'text-zinc-900 dark:text-zinc-100'}`}>
                        {content.substring(2)}
                    </span>
                </div>
            );
        }
        if (content.startsWith("❌")) {
            return (
                <div className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-400 opacity-60 flex-shrink-0" />
                    <span className="text-zinc-500 dark:text-zinc-500">
                        {content.substring(2)}
                    </span>
                </div>
            );
        }
        if (content.startsWith("⚠️")) {
            return (
                <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-500 opacity-60 flex-shrink-0" />
                    <span className="text-zinc-600 dark:text-zinc-400">
                        {content.substring(2)}
                    </span>
                </div>
            );
        }

        return <span className={isGlow ? "font-bold text-blue-700 dark:text-blue-300" : "text-zinc-600 dark:text-zinc-400"}>{content}</span>;
    };

    return (
        <section className="py-24 bg-white dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white mb-4">
                        {t.headline}
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        {t.subtitle}
                    </p>
                </div>

                <div className="overflow-x-auto pb-4">
                    <table className="w-full min-w-[1000px] border-collapse text-left">
                        <thead>
                            <tr className="border-b-2 border-zinc-100 dark:border-zinc-800">
                                <th className="p-4 w-1/5"></th>
                                {t.headers.slice(1).map((header, i) => (
                                    <th key={i} className={`p-4 w-1/5 text-sm uppercase tracking-wider font-semibold ${i === 3 ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10 rounded-t-xl border-t-4 border-blue-500 relative' : 'text-zinc-500 dark:text-zinc-400'}`}>
                                        {header}
                                        {i === 3 && (
                                            <span className="absolute top-2 right-2 flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                            </span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {t.categories?.map((category, catIndex) => (
                                <React.Fragment key={catIndex}>
                                    {/* Category Header */}
                                    <tr className="bg-zinc-50/50 dark:bg-zinc-900/30">
                                        <td colSpan={5} className="p-3 text-xs font-bold text-zinc-400 uppercase tracking-widest pl-4">
                                            {category.name}
                                        </td>
                                    </tr>
                                    {/* Rows */}
                                    {category.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group">
                                            <td className="p-4 font-medium text-zinc-900 dark:text-white border-r border-transparent group-hover:border-zinc-200 dark:group-hover:border-zinc-800 transition-colors">
                                                {row.label}
                                            </td>
                                            <td className="p-4 bg-white dark:bg-zinc-950">{renderCell(row.generic, false)}</td>
                                            <td className="p-4 bg-white dark:bg-zinc-950 border-l border-zinc-100 dark:border-zinc-800">{renderCell(row.chat, false)}</td>
                                            <td className="p-4 bg-white dark:bg-zinc-950 border-l border-zinc-100 dark:border-zinc-800">{renderCell(row.coach, false)}</td>
                                            <td className="p-4 bg-blue-50/30 dark:bg-blue-900/10 border-l border-blue-100 dark:border-blue-900/30 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]">
                                                {renderCell(row.glow, true)}
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg font-medium text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
                        {t.bottomLine}
                    </div>
                </div>
            </div>
        </section>
    );
}
