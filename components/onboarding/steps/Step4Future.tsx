
import React, { useState } from 'react';
import { useOnboardingStore } from '@/lib/onboarding/store';
import { BloomAIBubble } from '../BloomAIBubble';
import { ContinueButton } from '../ContinueButton';
import { StepContainer } from '../StepContainer';
import { Sparkles, Eye } from 'lucide-react';

export const Step4Future: React.FC = () => {
    const { answers, setAnswer, nextStep } = useOnboardingStore();
    const [vision, setVision] = useState(answers.futureSelfVision);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (vision.trim()) {
            setAnswer('futureSelfVision', vision);
            nextStep(); // Triggers loading state/generation
        }
    };

    return (
        <StepContainer>
            <BloomAIBubble
                message={`Last step! This is powerful.\n\nImagine it's 90 days from now. You achieved your goal.\n\nHow do you FEEL? What changed in your life?`}
            />

            <div className="mt-8 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-card rounded-2xl p-6 border border-border">
                    <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
                        <Eye className="w-4 h-4 text-primary" />
                        <span>Visualization Exercise</span>
                    </div>

                    <textarea
                        value={vision}
                        onChange={(e) => setVision(e.target.value)}
                        placeholder="e.g. I feel accomplished and energized. My startup has actual users and I wake up excited to work on it..."
                        className="w-full bg-transparent border-0 focus:ring-0 p-0 text-lg leading-relaxed resize-none min-h-[120px] placeholder:text-muted-foreground/50"
                        autoFocus
                    />
                </div>
            </div>

            <div className="mt-6 flex items-start gap-3 bg-secondary/50 p-4 rounded-xl text-sm text-muted-foreground">
                <Sparkles className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <p>
                    <strong>Science Fact:</strong> Vividly visualizing your future success ("Mental Contrasting") increases motivation by 2x more than standard goal setting.
                </p>
            </div>

            <div className="mt-8">
                <ContinueButton
                    onClick={handleSubmit}
                    disabled={!vision.trim() || vision.length < 10}
                >
                    Create My Execution Board
                </ContinueButton>
            </div>
        </StepContainer>
    );
};
