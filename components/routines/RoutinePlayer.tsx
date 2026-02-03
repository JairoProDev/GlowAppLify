"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Routine, RoutineStep } from "@/lib/store/routine-store"
import { ChevronRight, CheckCircle2, X } from "lucide-react"
import { useState, useEffect } from "react"
import confetti from 'canvas-confetti'

interface RoutinePlayerProps {
    routine: Routine
    onClose: () => void
}

export function RoutinePlayer({ routine, onClose }: RoutinePlayerProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [timeLeft, setTimeLeft] = useState(routine.steps[0].duration * 60)
    const [isPaused, setIsPaused] = useState(false)

    const currentStep = routine.steps[currentStepIndex]
    const isLastStep = currentStepIndex === routine.steps.length - 1

    useEffect(() => {
        setTimeLeft(currentStep.duration * 60)
        setIsPaused(false)
    }, [currentStepIndex, currentStep])

    useEffect(() => {
        if (isPaused) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [isPaused, currentStepIndex])

    const handleNext = () => {
        if (isLastStep) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            })
            setTimeout(onClose, 2000)
        } else {
            setCurrentStepIndex(prev => prev + 1)
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const progress = ((currentStepIndex) / routine.steps.length) * 100

    return (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-card w-full max-w-lg rounded-3xl shadow-2xl border p-8 flex flex-col items-center text-center space-y-8 relative overflow-hidden">
                {/* Background Progress */}
                <div className="absolute top-0 left-0 w-full h-1 bg-secondary">
                    <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>

                <Button variant="ghost" size="icon" className="absolute top-2 right-2 rounded-full" onClick={onClose}>
                    <X className="h-6 w-6" />
                </Button>

                <div className="space-y-2 pt-4">
                    <h3 className="text-muted-foreground uppercase tracking-widest text-xs">Step {currentStepIndex + 1} of {routine.steps.length}</h3>
                    <h2 className="text-3xl font-bold">{currentStep.title}</h2>
                </div>

                <div className="w-64 h-64 rounded-full border-8 border-primary/20 flex items-center justify-center relative">
                    {/* Circular Progress could go here */}
                    <div className="text-6xl font-mono font-bold tabular-nums">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="flex gap-4 w-full">
                    <Button variant="outline" className="flex-1" onClick={() => setIsPaused(!isPaused)}>
                        {isPaused ? "Resume" : "Pause"}
                    </Button>
                    <Button className="flex-1" onClick={handleNext}>
                        {isLastStep ? (
                            <><CheckCircle2 className="mr-2 h-4 w-4" /> Finish</>
                        ) : (
                            <><ChevronRight className="mr-2 h-4 w-4" /> Next Step</>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
