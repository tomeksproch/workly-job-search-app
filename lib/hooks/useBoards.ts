'use client'

import { useState } from "react"
import { Board, Column } from "../models/models.types"

export function useBoards(initialBoard: Board | null) {
    const [board, setBoard] = useState<Board | null>(initialBoard)
    const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || [])
    const [error, setError] = useState<string | null>(null)

    const [prevBoard, setPrevBoard] = useState<Board | null>(initialBoard)

    if (initialBoard !== prevBoard) {
        setPrevBoard(initialBoard)
        setBoard(initialBoard)
        setColumns(initialBoard?.columns || [])
    }

    async function moveJob(jobApplicationId: string, newColumnId: string, newOrder: number) {

    }

    return {
        board,
        columns,
        error,
        moveJob
    }
}