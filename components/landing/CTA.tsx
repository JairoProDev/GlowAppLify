
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
    return (
        <section className="relative py-24 px-6 lg:px-8 overflow-hidden bg-indigo-900 text-white">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[128px] opacity-30"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[128px] opacity-30"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/50 border border-indigo-700 text-indigo-200 text-sm mb-8">
                    <Sparkles className="w-4 h-4" />
                    <span>Limited Beta Access</span>
                </div>

                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                    Your best life is waiting.
                    <br />
                    Start building it today.
                </h2>

                <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                    Join 47,329 ambitious people who stopped plannning and started doing.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/onboarding">
                        <Button size="lg" className="h-16 px-8 text-lg rounded-xl bg-white text-indigo-900 hover:bg-zinc-100 font-bold shadow-xl shadow-indigo-900/50 hover:scale-105 transition-transform">
                            Get Your Personalized Life System Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>

                <p className="mt-6 text-sm text-indigo-300 font-medium">
                    Free forever • 3-minute setup • No credit card
                </p>

                <div className="mt-12 pt-8 border-t border-indigo-800/50 max-w-lg mx-auto">
                    <p className="text-indigo-200 italic">"If you're serious about your goals, this is the only tool you need."</p>
                    <div className="mt-2 font-bold text-white">— Tim F., Entrepreneur & Executive Coach</div>
                </div>
            </div>
        </section>
    );
}
