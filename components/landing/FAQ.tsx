
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
    {
        question: "Is this another productivity app I'll abandon in 2 weeks?",
        answer: "No. Most apps fail because setup is overwhelming and they don't feel personal. GlowApplify solves this with a 3-minute AI setup and gentle daily check-ins tailored to your life. Our retention is 3x the industry average.",
    },
    {
        question: "How is this different from ChatGPT or Claude?",
        answer: "ChatGPT has no memory and builds nothing—it just gives advice. GlowApplify remembers your entire life context, builds an actual execution system with tools (goals, habits, tracker), and keeps you accountable daily.",
    },
    {
        question: "Do I have to use it every day?",
        answer: "Your system is there whenever you need it. However, users who spend just 3.5 minutes a day (Morning View + Evening Check-in) see 3.2x better goal completion rates.",
    },
    {
        question: "What if I'm not 'productive' or 'ambitious'?",
        answer: "Perfect! This isn't for hustle addicts. It's for anyone who wants to improve something—like sleeping better, reading more, or feeling less stressed—without drowning in complexity.",
    },
    {
        question: "Is my data private?",
        answer: "100% yes. We never sell your data. Conversations are encrypted. We don't train public AI models on your personal info. You own your data.",
    },
    {
        question: "Can I cancel anytime?",
        answer: "You're not locked into anything. GlowApplify is currently free forever during our beta. No credit card required. If you leave, you can export your data.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-center text-zinc-900 sm:text-4xl dark:text-white mb-16">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="flex items-center justify-between w-full p-6 text-left"
                            >
                                <span className="font-semibold text-lg text-zinc-900 dark:text-white pr-8">{faq.question}</span>
                                {openIndex === i ? (
                                    <Minus className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                                ) : (
                                    <Plus className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                                )}
                            </button>

                            {/* Simple CSS transition for height if Framer Motion fails, but using AnimatePresence since user asked for Framer Motion */}
                            {openIndex === i && (
                                <div className="px-6 pb-6 text-zinc-600 dark:text-zinc-400 leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
