
"use client";

import { Star, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stats = [
    { label: "Active Users", value: "47,329" },
    { label: "Average Rating", value: "4.8" },
    { label: "Retention (30 days)", value: "92%" },
    { label: "Goal Completion", value: "3.2x" },
];

const testimonials = [
    {
        name: "Sarah M.",
        role: "Product Manager, SF",
        quote: "I've tried Notion, Motion, Todoist—all of them. GlowApplify is the first tool where I didn't have to build everything myself. It just WORKED.",
        results: ["Lost 15 lbs", "Launched side project", "Meditates daily"],
        image: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        name: "Marcus L.",
        role: "Founder, New York",
        quote: "The AI actually understood my life. When I told it fundraising was taking over, it automatically adjusted my board. That's the future.",
        results: ["Raised $500K", "Runs 4x/week", "Reads 2 books/month"],
        image: "https://i.pravatar.cc/150?u=marcus"
    },
    {
        name: "Emma R.",
        role: "Designer, London",
        quote: "Other apps felt like homework. GlowApplify feels like having a coach in my pocket. The daily check-ins keep me accountable without being annoying.",
        results: ["Promoted Senior", "Learning Spanish", "60-day streak"],
        image: "https://i.pravatar.cc/150?u=emma"
    },
];

export function SocialProof() {
    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                            <div className="text-3xl lg:text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                        Join 47,329 ambitious people building their best lives.
                    </h2>
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="flex flex-col h-full bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                                    <AvatarImage src={t.image} alt={t.name} />
                                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-bold text-zinc-900 dark:text-white">{t.name}</div>
                                    <div className="text-sm text-zinc-500">{t.role}</div>
                                </div>
                            </div>
                            <p className="text-zinc-700 dark:text-zinc-300 italic mb-6 flex-grow">"{t.quote}"</p>

                            <div className="space-y-2 mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                {t.results.map((r, j) => (
                                    <div key={j} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                        {r}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
