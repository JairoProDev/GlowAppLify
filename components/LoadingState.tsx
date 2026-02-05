import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingStateProps {
    text?: string
    fullScreen?: boolean
    className?: string
}

export function LoadingState({ text = "Loading...", fullScreen = false, className }: LoadingStateProps) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center gap-3",
            fullScreen && "min-h-screen",
            !fullScreen && "min-h-[400px]",
            className
        )}>
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">{text}</p>
        </div>
    )
}

export function InlineLoader({ text, className }: { text?: string; className?: string }) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            {text && <span className="text-sm text-muted-foreground">{text}</span>}
        </div>
    )
}
