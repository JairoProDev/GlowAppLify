
import React from 'react';
import { Sparkles } from 'lucide-react';

interface BloomAIBubbleProps {
    message: string;
    isTyping?: boolean;
}

export const BloomAIBubble: React.FC<BloomAIBubbleProps> = ({ message, isTyping = false }) => {
    return (
        <div className="flex gap-4 max-w-2xl mx-auto my-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground shadow-lg">
                    <Sparkles className="w-6 h-6" />
                </div>
            </div>

            <div className="flex-1 bg-card border border-border rounded-2xl p-6 shadow-sm relative context-bubble">
                {/* Triangle for speech bubble effect */}
                <div className="absolute top-6 -left-2 w-4 h-4 bg-card border-l border-b border-border transform rotate-45" />

                <div className="prose prose-sm dark:prose-invert max-w-none">
                    {message.split('\n').map((line, i) => (
                        <p key={i} className="mb-2 last:mb-0 text-lg leading-relaxed">{line}</p>
                    ))}

                    {isTyping && (
                        <div className="flex gap-1 mt-2">
                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
