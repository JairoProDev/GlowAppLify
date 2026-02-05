
"use client";

import { FileX, History, AlertTriangle, TrendingDown } from "lucide-react";

const problems = [
    {
        icon: FileX,
        title: "Generic Templates",
        description: "You spend hours setting up Notion boards that still feel empty and irrelevant. Sound familiar?",
    },
    {
        icon: History,
        title: "Forgotten Habits",
        description: "You download habit trackers, use them for 3 days, then forget they exist. We've all been there.",
    },
    {
        icon: AlertTriangle,
        title: "Reactive Days",
        description: "Every morning feels chaotic. No clear plan. Just reacting to what comes. There's a better way.",
    },
    {
        icon: TrendingDown,
        title: "No Progress",
        description: "You work hard but can't see if you're actually getting closer to your goals. It's exhausting.",
    },
];

export function Problem() {
    return (
        <section className="bg-white py-24 sm:py-32 dark:bg-zinc-950">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                        You've tried everything.
                        <br />
                        <span className="text-zinc-500">And you're still not where you want to be.</span>
                    </h2>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                        {problems.map((problem) => (
                            <div key={problem.title} className="flex flex-col items-start bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl hover:translate-y-[-4px] transition-transform duration-300">
                                <div className="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 p-2 ring-1 ring-indigo-100 dark:ring-indigo-900/30">
                                    <problem.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                                </div>
                                <dt className="mt-4 font-semibold text-lg text-zinc-900 dark:text-white">
                                    {problem.title}
                                </dt>
                                <dd className="mt-2 leading-7 text-zinc-600 dark:text-zinc-400">
                                    {problem.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="mt-20 text-center">
                    <p className="text-xl font-medium text-indigo-600 dark:text-indigo-400">
                        The problem isn't you. It's the tools.
                    </p>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                        They're built for everyone—which means they're perfect for no one.
                    </p>
                </div>
            </div>
        </section>
    );
}
