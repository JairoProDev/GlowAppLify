
import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};
