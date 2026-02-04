
import React from 'react';

interface StepContainerProps {
    children: React.ReactNode;
}

export const StepContainer: React.FC<StepContainerProps> = ({ children }) => {
    return (
        <div className="w-full max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            {children}
        </div>
    );
};
