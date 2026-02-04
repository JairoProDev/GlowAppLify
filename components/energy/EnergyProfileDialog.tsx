"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEnergyStore, Chronotype } from "@/lib/store/energy-store"
import { Sun, Moon, Battery, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export function EnergyProfileDialog() {
    const { profile, setChronotype, completeSetup } = useEnergyStore()
    const [isOpen, setIsOpen] = React.useState(false)

    // Open automatically if not setup
    React.useEffect(() => {
        if (!profile.isSetup) {
            // Small delay for better UX on load
            const timer = setTimeout(() => setIsOpen(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [profile.isSetup])

    const handleSave = () => {
        completeSetup()
        setIsOpen(false)
    }

    const ChronotypeOption = ({ value, label, icon: Icon, description }: { value: Chronotype, label: string, icon: any, description: string }) => (
        <Label
            htmlFor={value}
            className={cn(
                "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all",
                profile.chronotype === value && "border-primary bg-primary/5"
            )}
        >
            <RadioGroupItem value={value} id={value} className="sr-only" />
            <Icon className={cn("mb-3 h-8 w-8", profile.chronotype === value ? "text-primary" : "text-muted-foreground")} />
            <span className="font-semibold">{label}</span>
            <span className="text-xs text-center text-muted-foreground mt-1">{description}</span>
        </Label>
    )

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px] gap-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center">Discover Your Energy Flow</DialogTitle>
                    <DialogDescription className="text-center text-base">
                        GlowCalendar optimizes your schedule based on your biology.
                        When do you feel most productive?
                    </DialogDescription>
                </DialogHeader>

                <RadioGroup
                    defaultValue={profile.chronotype}
                    onValueChange={(val) => setChronotype(val as Chronotype)}
                    className="grid grid-cols-2 gap-4"
                >
                    <ChronotypeOption
                        value="morning_lark"
                        label="Morning Lark"
                        icon={Sun}
                        description="Early riser. Peak focus before noon."
                    />
                    <ChronotypeOption
                        value="night_owl"
                        label="Night Owl"
                        icon={Moon}
                        description="Late riser. Peak focus in the evening."
                    />
                    <ChronotypeOption
                        value="afternoon_dip"
                        label="Standard"
                        icon={Battery}
                        description="9-5 energy. Slump in mid-afternoon."
                    />
                    <ChronotypeOption
                        value="steady"
                        label="Consistency Machine"
                        icon={Zap}
                        description="Steady energy flow throughout the day."
                    />
                </RadioGroup>

                <div className="bg-muted/50 p-4 rounded-lg text-sm text-center">
                    Glow will use this to suggest <strong>Deep Work</strong> blocks during your peak hours
                    and <strong>Admin/Rest</strong> during your dips.
                </div>

                <DialogFooter className="sm:justify-center">
                    <Button size="lg" className="w-full sm:w-auto min-w-[200px]" onClick={handleSave}>
                        Personalize My Calendar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
