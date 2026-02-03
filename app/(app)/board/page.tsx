"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ExecutionBoard } from "@/lib/types"
import { getBoard, saveBoard } from "@/lib/storage"
import ExecutionBoardView from "@/components/ExecutionBoardView"
import { Button } from "@/components/ui/button"

export default function BoardPage() {
    const [board, setBoard] = useState<ExecutionBoard | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const existingBoard = getBoard()
        if (!existingBoard) {
            // If no board, redirect to onboarding (home)
            router.push("/")
        } else {
            setBoard(existingBoard)
        }
        setLoading(false)
    }, [router])

    const handleBoardUpdated = (updatedBoard: ExecutionBoard) => {
        saveBoard(updatedBoard)
        setBoard(updatedBoard)
    }

    const handleStartDaily = () => {
        // Navigate to Daily view (maybe separate route later)
        // For now we might keep daily within board or make it a route
        // Roadmap suggests it's a tool/view.
        // Let's assume /daily route or keep as is?
        // Current DailyView is a component.
        router.push("/daily") // We should create this route too
    }

    if (loading) return <div>Loading...</div>

    if (!board) return null // Redirecting

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Execution Board</h1>
                <Button onClick={handleStartDaily}>Start Daily Execution</Button>
            </div>
            <ExecutionBoardView
                board={board}
                onBoardUpdated={handleBoardUpdated}
                onStartDaily={handleStartDaily}
            />
        </div>
    )
}
