
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface Step0NameProps {
    value: string;
    onChange: (value: string) => void;
    onNext: () => void;
    content: any;
}

export default function Step0Name({ value, onChange, onNext, content }: Step0NameProps) {
    const [inputValue, setInputValue] = useState(value);

    const handleContinue = () => {
        if (inputValue.trim()) {
            onChange(inputValue.trim());
            onNext();
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-card rounded-2xl p-6 border shadow-sm relative">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">
                        {content.bubble}
                    </p>
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-card border-l border-t rotate-45" />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pl-14 space-y-4"
            >
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={content.placeholder}
                    className="text-xl py-6 rounded-xl border-2 focus:border-primary transition-all bg-background"
                    onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                    autoFocus
                />

                <Button
                    onClick={handleContinue}
                    disabled={!inputValue.trim()}
                    className="w-full py-6 text-lg rounded-xl shadow-lg shadow-primary/20"
                >
                    {content.continue}
                </Button>
            </motion.div>
        </div>
    );
}
