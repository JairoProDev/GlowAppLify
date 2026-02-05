
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { landingContent } from "@/lib/i18n/landingContent";

export function CTA() {
    const { language } = useLanguage();
    const t = landingContent[language].cta;

    return (
        <section className="relative py-24 px-6 lg:px-8 overflow-hidden bg-blue-900 text-white">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px] opacity-40"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[128px] opacity-40"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/50 border border-blue-700 text-blue-200 text-sm mb-8">
                    <Sparkles className="w-4 h-4" />
                    <span>Beta Access</span>
                </div>

                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                    {t.headline}
                    <br />
                    <span className="text-blue-200">{t.subheadline}</span>
                </h2>


                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 mb-8">
                    <Link href="/onboarding">
                        <Button size="lg" className="h-16 px-8 text-lg rounded-xl bg-white text-blue-900 hover:bg-zinc-100 font-bold shadow-xl shadow-blue-900/50 hover:scale-105 transition-transform">
                            {t.button} <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>

                <p className="mt-6 text-sm text-blue-300 font-medium">
                    {t.micro}
                </p>

                <div className="mt-12 pt-8 border-t border-blue-800/50 max-w-lg mx-auto">
                    <p className="text-blue-100 italic">"{t.quote}"</p>
                    <div className="mt-2 font-bold text-white">— Tim F., Entrepreneur</div>
                </div>
            </div>
        </section>
    );
}
