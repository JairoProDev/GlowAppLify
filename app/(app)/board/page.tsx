"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ExecutionBoard } from "@/lib/types"
import { getBoard, saveBoard } from "@/lib/storage"
import ExecutionBoardView from "@/components/ExecutionBoardView"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export default function BoardPage() {
    const [board, setBoard] = useState<ExecutionBoard | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { t, language } = useLanguage()

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
        router.push("/daily")
    }

    if (loading) return <div className="flex items-center justify-center h-full text-muted-foreground">{language === 'es' ? 'Cargando...' : 'Loading...'}</div>

    if (!board) return null // Redirecting

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">{t('board.title')}</h1>
                <Button onClick={handleStartDaily}>{t('board.start_daily')}</Button>
            </div>
            <ExecutionBoardView
                board={board}
                onBoardUpdated={handleBoardUpdated}
                onStartDaily={handleStartDaily}
            />
        </div>
    )
}

