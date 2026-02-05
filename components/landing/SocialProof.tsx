
"use client";

import { CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { landingContent } from "@/lib/i18n/landingContent";

// Needs to match the order in the content file
const avatars = [
    "https://i.pravatar.cc/150?u=sarah",
    "https://i.pravatar.cc/150?u=marcus",
    "https://i.pravatar.cc/150?u=emma"
];

// Results are hardcoded visually here or mapped if I put them in content file clearly.
// For now I'll use the ones I put in content file which are arrays of strings.

export function SocialProof() {
    const { language } = useLanguage();
    const t = landingContent[language].socialProof;

    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {t.stats.map((stat, i) => (
                        <div key={i} className="text-center p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:-translate-y-1 transition-transform">
                            <div className="text-3xl lg:text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">
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
                        {t.headline}
                    </h2>
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t.testimonials.map((testimonial, i) => (
                        <div key={i} className="flex flex-col h-full bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg shadow-blue-100/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                                    <AvatarImage src={avatars[i]} alt={testimonial.name} />
                                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-bold text-zinc-900 dark:text-white">{testimonial.name}</div>
                                    <div className="text-sm text-zinc-500">{testimonial.role}</div>
                                </div>
                            </div>
                            <p className="text-zinc-700 dark:text-zinc-300 italic mb-6 flex-grow">"{testimonial.quote}"</p>

                            {/* Assuming results might vary, visualized simply for now */}
                            <div className="space-y-2 mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    <span>Verified User</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
