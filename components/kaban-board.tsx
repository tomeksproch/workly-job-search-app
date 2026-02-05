'use client'

import { Board } from '@/lib/models/models.types'

interface KanbanBoardProps {
  board: Board
  userId: string
}

export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
  return (
    <div>
      <h1>Kaban Board</h1>
    </div>
  )
}
