
"use client";

import { Check, X, AlertTriangle } from "lucide-react";

export function Comparison() {
    return (
        <section className="py-24 bg-white dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white mb-4">
                        GlowApplify vs. Everything Else
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Why waste time with tools that make you do all the work?
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] border-collapse text-left">
                        <thead>
                            <tr>
                                <th className="p-4 border-b border-zinc-200 dark:border-zinc-800 w-1/4">What You Need</th>
                                <th className="p-4 border-b border-zinc-200 dark:border-zinc-800 w-1/4 text-zinc-500 font-medium">Generic Apps (Notion, Todoist)</th>
                                <th className="p-4 border-b border-zinc-200 dark:border-zinc-800 w-1/4 text-zinc-500 font-medium">AI Chatbots (ChatGPT)</th>
                                <th className="p-4 border-b border-zinc-200 dark:border-zinc-800 w-1/4 bg-indigo-50 dark:bg-indigo-900/20 rounded-t-xl text-indigo-700 dark:text-indigo-300 font-bold border-t-2 border-indigo-500">GlowApplify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { label: "Easy Setup", generic: "❌ 2-5 hours config", chat: "⚠️ N/A (no setup)", glow: "✅ 3 minutes, AI does it" },
                                { label: "Personalized To You", generic: "❌ Manual templates", chat: "⚠️ Partial memory", glow: "✅ AI analyzes entire life" },
                                { label: "Actionable System", generic: "❌ You configure everything", chat: "❌ No tools, just chat", glow: "✅ Complete execution system" },
                                { label: "Daily Guidance", generic: "❌ You decide", chat: "❌ You have to ask", glow: "✅ AI tells you what to do" },
                                { label: "Progress Tracking", generic: "❌ Manual logging", chat: "❌ None", glow: "✅ Automatic, visual" },
                                { label: "Adapts To Changes", generic: "❌ Manual reconfig", chat: "⚠️ Limited context", glow: "✅ AI adjusts automatically" },
                                { label: "Science-Based", generic: "⚠️ Varies", chat: "❌ No methodology", glow: "✅ 40+ years research" },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-zinc-100 dark:border-zinc-800">
                                    <td className="p-4 font-semibold text-zinc-900 dark:text-white">{row.label}</td>
                                    <td className="p-4 text-zinc-600 dark:text-zinc-400">{row.generic}</td>
                                    <td className="p-4 text-zinc-600 dark:text-zinc-400">{row.chat}</td>
                                    <td className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 font-medium text-zinc-900 dark:text-zinc-100 border-x border-indigo-100 dark:border-indigo-900/30">
                                        {row.glow}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 text-center bg-zinc-50 dark:bg-zinc-900 rounded-full py-4 px-6 inline-block mx-auto">
                    <p className="text-zinc-700 dark:text-zinc-300 font-medium">Most apps make you work harder. <span className="text-indigo-600 dark:text-indigo-400 font-bold">GlowApplify makes you work smarter.</span></p>
                </div>
            </div>
        </section>
    );
}
