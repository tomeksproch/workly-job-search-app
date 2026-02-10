'use client'

import { Board, Column } from '@/lib/models/models.types'
import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,
  MoreHorizontal,
  Plus,
  Trash2,
  XCircle,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import CreateJobApplicationDialog from './create-job-dialog'

interface KanbanBoardProps {
  board: Board
  userId: string
}

interface ColConfig {
  bg: string
  text: string
  icon: React.ReactNode
}

const COLUMN_CONFIG: Array<ColConfig> = [
  {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600',
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    bg: 'bg-purple-500/10',
    text: 'text-purple-600',
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600',
    icon: <Mic className="h-4 w-4" />,
  },
  {
    bg: 'bg-amber-500/10',
    text: 'text-amber-600',
    icon: <Award className="h-4 w-4" />,
  },
  {
    bg: 'bg-red-500/10',
    text: 'text-red-600',
    icon: <XCircle className="h-4 w-4" />,
  },
]

function DroppableColumn({
  column,
  config,
  boardId,
  index,
}: {
  column: Column
  config: ColConfig
  boardId: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex h-[500px] w-full shrink-0 flex-col rounded-2xl border border-border/40 bg-secondary/20 p-3 backdrop-blur-sm xl:h-full xl:w-auto xl:flex-1 xl:min-w-0"
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
              config.bg,
              config.text,
            )}
          >
            {config.icon}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-foreground">
              {column.name}
            </h3>
            <p className="text-[10px] font-medium text-muted-foreground">
              0 jobs
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 text-muted-foreground hover:bg-background hover:text-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete Column
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-1 pb-2 [&::-webkit-scrollbar]:hidden">
        <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
      </div>
    </motion.div>
  )
}

export default function KanbanBoard({ board }: KanbanBoardProps) {
  const columns = board.columns

  return (
    <div className="flex h-auto w-full flex-col p-4 md:p-6 xl:h-[calc(100vh-100px)]">
      <div className="flex w-full flex-col gap-6 xl:h-full xl:flex-row xl:gap-4 xl:overflow-visible xl:pb-0 [&::-webkit-scrollbar]:hidden">
        {columns.map((col, key) => {
          const config = COLUMN_CONFIG[key] || {
            bg: 'bg-primary/10',
            text: 'text-primary',
            icon: <Calendar className="h-4 w-4" />,
          }
          return (
            <DroppableColumn
              key={key}
              index={key}
              column={col}
              config={config}
              boardId={board._id}
            />
          )
        })}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex h-[60px] w-full shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60 bg-transparent text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary xl:w-[60px]"
          title="Add New Column"
        >
          <Plus className="h-6 w-6" />
        </motion.button>
      </div>
    </div>
  )
}
