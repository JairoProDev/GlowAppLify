
import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContinueButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
    className,
    loading,
    disabled,
    children,
    ...props
}) => {
    return (
        <button
            className={cn(
                "group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl",
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            <span className="flex items-center gap-2">
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {children || 'Continue'}
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </span>
        </button>
    );
};
