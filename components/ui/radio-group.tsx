"use client"

import * as React from "react"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        onValueChange?: (value: string) => void
        defaultValue?: string
        value?: string
    }
>(({ className, onValueChange, defaultValue, value: controlledValue, ...props }, ref) => {
    const [value, setValue] = React.useState(defaultValue || "")

    // Handle controlled/uncontrolled
    const actualValue = controlledValue !== undefined ? controlledValue : value

    const handleValueChange = (newValue: string) => {
        setValue(newValue)
        onValueChange?.(newValue)
    }

    // Pass context to children
    return (
        <RadioGroupContext.Provider value={{ value: actualValue, onValueChange: handleValueChange }}>
            <div className={cn("grid gap-2", className)} ref={ref} {...props} />
        </RadioGroupContext.Provider>
    )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupContext = React.createContext<{
    value: string
    onValueChange: (value: string) => void
} | null>(null)

const RadioGroupItem = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext)
    const isChecked = context?.value === value

    return (
        <button
            type="button"
            role="radio"
            aria-checked={isChecked}
            ref={ref}
            className={cn(
                "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            onClick={() => context?.onValueChange(value)}
            {...props}
        >
            <span className={cn("flex items-center justify-center", isChecked ? "opacity-100" : "opacity-0")}>
                <Circle className="h-2.5 w-2.5 fill-current text-current" />
            </span>
        </button>
    )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
