// @ts-nocheck
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { startOfDay, setHours, setMinutes } from "date-fns";

import { onboardingContent } from "@/lib/i18n/onboardingContent";
import { useDailyStore } from "@/lib/store/useDailyStore";
import { useTaskStore } from "@/lib/store/task-store";
import { useRoutineStore } from "@/lib/store/routine-store";
import { useCalendarStore } from "@/lib/store/calendar-store";
import { useOnboardingStore } from "@/lib/onboarding/store";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useGoalStore } from "@/lib/store/goal-store";
import { saveBoard, STORAGE_KEYS } from "@/lib/storage";

import Step0Name from "./steps/Step0Name";
import Step1Goal from "./steps/Step1Goal";
import { Step2Context } from "./steps/Step2Context";
import { Step3Past } from "./steps/Step3Past";
import { Step4Future } from "./steps/Step4Future";
import { Step5Reveal } from "./steps/Step5Reveal";
import OnboardingLoading from "./OnboardingLoading";

export default function OnboardingFlow() {
    const router = useRouter();
    const { setInitialData } = useDailyStore();
    const { language } = useLanguage();
    const t = onboardingContent[language];

    const {
        currentStep,
        answers,
        isLoading,
        setStep,
        nextStep: storeNextStep,
        setAnswer,
        setLoading
    } = useOnboardingStore();

    // Trigger AI generation when we reach step 6 (loading)
    useEffect(() => {
        if (currentStep === 6 && !isLoading) {
            handleComplete();
        }
    }, [currentStep]);

    const handleComplete = async () => {
        setLoading(true);
        try {
            // Save user name to local storage immediately
            localStorage.setItem('user_name', answers.name);

            // Call the AI API with all collected data
            const res = await fetch('/api/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...answers,
                    language
                })
            });

            if (!res.ok) {
                throw new Error(`API error: ${res.status}`);
            }

            const rawPlan = await res.json();
            console.log("Plan created:", rawPlan);

            // --- MAP TO EXECUTION BOARD INTERFACE (Fixes "Vision loading..." bug) ---
            const plan = {
                vision_layer: {
                    futureVision: rawPlan.vision.title + ": " + rawPlan.vision.motivation,
                    mantra: rawPlan.vision.identity
                },
                goal_layer: {
                    smartGoal: answers.goal,
                    deadline: "90 days",
                    kpis: [
                        { metric: "Consistency", target: "90%", deadline: "30 days" }
                    ]
                },
                execution_layer: {
                    weeks: rawPlan.strategy.phases.map((phase: string, idx: number) => ({
                        weekNumber: idx + 1,
                        theme: phase,
                        milestone: "Complete phase objective",
                        actions: []
                    }))
                },
                obstacle_layer: {
                    plans: answers.obstacles.map(obs => ({
                        if: obs,
                        then: ["Focus on the primary lever", "Breathe and re-center"]
                    }))
                },
                habits_layer: {
                    morning: {
                        time: "07:00",
                        duration: "20 min",
                        steps: rawPlan.habits?.morning?.map((h: any) => typeof h === 'string' ? h : h.title) || []
                    },
                    deepWork: {
                        time: "09:00",
                        duration: "90 min",
                        steps: ["Focus on the hardest task first"]
                    },
                    evening: {
                        time: "21:00",
                        duration: "15 min",
                        steps: rawPlan.habits?.evening?.map((h: any) => typeof h === 'string' ? h : h.title) || []
                    }
                }
            };

            // --- SAVE BOARD (Local Storage) ---
            saveBoard(plan);

            // --- 0. POPULATE GOALS ---
            const goalStore = useGoalStore.getState();
            goalStore.addGoal({
                title: answers.goal,
                status: 'active',
                motivation: rawPlan.vision.motivation,
                lifeAreaId: answers.goalCategory
            });

            // --- 1. POPULATE TASKS ---
            const tasks = rawPlan.executionBoard?.tasks || [];
            const taskStore = useTaskStore.getState();
            tasks.forEach((t: any) => {
                taskStore.addTask({
                    title: t.title,
                    priority: t.priority || 'important',
                    status: 'todo',
                    tags: [t.tag || 'onboarding'],
                    description: `Generated for goal: ${answers.goal}`
                });
            });

            // --- 2. POPULATE DAILY VIEW ---
            if (tasks.length > 0) {
                const oneThing = {
                    id: tasks[0].id || `task-${Date.now()}`,
                    title: tasks[0].title,
                    duration: '90 min',
                    type: 'creative',
                    why: 'Highest leverage for your goal',
                    bestTime: 'Morning',
                    completed: false,
                    priority: 'one-thing'
                };
                setInitialData(oneThing, []);
            }

            // --- 3. POPULATE CALENDAR ---
            const calendarStore = useCalendarStore.getState();
            if (rawPlan.calendar?.blocks) {
                const today = startOfDay(new Date());
                rawPlan.calendar.blocks.forEach((block: any) => {
                    const [startH, startM] = block.start.split(':').map(Number);
                    const [endH, endM] = block.end.split(':').map(Number);
                    calendarStore.addEvent({
                        userId: 'current-user',
                        title: block.title,
                        startTime: setMinutes(setHours(today, startH), startM),
                        endTime: setMinutes(setHours(today, endH), endM),
                        timeZone: 'local',
                        type: block.type || 'DEEP_WORK_CREATIVE',
                        energyRequired: 'high',
                        status: 'scheduled',
                        isRecurring: true
                    });
                });
            }

            // Move to reveal step
            storeNextStep();
            setLoading(false);
        } catch (error) {
            console.error("Error creating plan", error);
            setLoading(false);
            alert("Hubo un error al generar tu plan. Por favor intenta de nuevo.");
        }
    };

    if (isLoading) {
        return <OnboardingLoading language={language} />;
    }

    if (currentStep === 7) {
        return <Step5Reveal />;
    }

    return (
        <div className="w-full max-w-2xl mx-auto py-12 px-4">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden shadow-inner">
                    <motion.div
                        className="h-full bg-primary transition-all duration-700 ease-out shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / 5) * 100}%` }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {currentStep === 1 && (
                        <Step0Name
                            value={answers.name}
                            onChange={(v) => setAnswer('name', v)}
                            onNext={storeNextStep}
                            content={t.step0}
                        />
                    )}

                    {currentStep === 2 && (
                        <Step1Goal
                            name={answers.name}
                            goal={answers.goal}
                            category={answers.goalCategory}
                            onChange={setAnswer}
                            onNext={storeNextStep}
                            content={t.step1}
                        />
                    )}

                    {currentStep === 3 && (
                        <Step2Context
                            timePerDay={answers.timePerDay}
                            energyPeak={answers.energyPeak}
                            scheduleConstraints={answers.scheduleConstraints}
                            onChange={setAnswer}
                            onNext={storeNextStep}
                            content={t.step2}
                        />
                    )}

                    {currentStep === 4 && (
                        <Step3Past
                            selectedObstacles={answers.obstacles}
                            onChange={setAnswer}
                            onNext={storeNextStep}
                            content={t.step3}
                        />
                    )}

                    {currentStep === 5 && (
                        <Step4Future
                            goal={answers.goal}
                            wantsVisualization={answers.wantsVisualization}
                            futureSelfVision={answers.futureSelfVision}
                            onChange={setAnswer}
                            onNext={storeNextStep}
                            content={t.step4}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
