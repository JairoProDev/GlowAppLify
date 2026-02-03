"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ExecutionBoard } from "@/lib/types"
import { getBoard } from "@/lib/storage"
import DailyView from "@/components/DailyView"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DailyPage() {
    const [board, setBoard] = useState<ExecutionBoard | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const existingBoard = getBoard()
        if (!existingBoard) {
            router.push("/")
        } else {
            setBoard(existingBoard)
        }
        setLoading(false)
    }, [router])

    const handleBackToBoard = () => {
        router.push("/board")
    }

    if (loading) return <div>Loading...</div>
    if (!board) return null

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleBackToBoard}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Daily Execution</h1>
            </div>
            <DailyView
                board={board}
                onBackToBoard={handleBackToBoard}
            />
        </div>
    )
}
