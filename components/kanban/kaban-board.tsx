'use client'

import { Board, Column, JobApplication } from '@/lib/models/models.types'
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
import JobApplicationCard from './job-application-card'
import { useBoards } from '@/lib/hooks/useBoards'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { CSS } from '@dnd-kit/utilities'

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
  sortedColumns,
}: {
  column: Column
  config: ColConfig
  boardId: string
  index: number
  sortedColumns: Column[]
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column._id,
    data: {
      type: 'column',
      columnId: column._id,
    },
  })

  const sortedJobs =
    column.jobApplications?.sort((a, b) => a.order - b.order) || []
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex h-[500px] w-full shrink-0 flex-col rounded-2xl border border-border/40 bg-secondary/20 p-3 backdrop-blur-sm xl:h-full xl:w-[320px]"
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
              className="cursor-pointer h-7 w-7 shrink-0 text-muted-foreground hover:bg-background hover:text-foreground"
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

      <div
        ref={setNodeRef}
        className={`flex flex-1 flex-col gap-3 overflow-y-auto px-1 pb-2 [&::-webkit-scrollbar]:hidden ${isOver ? 'ring-2 ring-primary/50 rounded-xl' : ''}`}
      >
        <SortableContext
          items={sortedJobs.map((job) => job._id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedJobs.map((job, key) => (
            <SortableJobCard
              key={key}
              job={{ ...job, columnId: column._id || column._id }}
              columns={sortedColumns}
            />
          ))}
        </SortableContext>
        <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
      </div>
    </motion.div>
  )
}

function SortableJobCard({
  job,
  columns,
}: {
  job: JobApplication
  columns: Column[]
}) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({
    id: job._id,
    data: {
      type: 'job',
      job,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <JobApplicationCard
        job={job}
        columns={columns}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </motion.div>
  )
}

export default function KanbanBoard({ board }: KanbanBoardProps) {
  const { columns, moveJob } = useBoards(board)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sortedColumns = columns.sort((a, b) => a.order - b.order)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  )

  async function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    setActiveId(null)

    if (!over || !board._id) return

    const activeId = active.id as string
    const overId = over.id as string

    let draggedJob: JobApplication | null = null
    let sourceColumn: Column | null = null
    let sourceIndex = -1

    for (const column of sortedColumns) {
      const jobs =
        column.jobApplications.sort((a, b) => a.order - b.order) || []
      const jobIndex = jobs.findIndex((j) => j._id === activeId)
      if (jobIndex !== -1) {
        draggedJob = jobs[jobIndex]
        sourceColumn = column
        sourceIndex = jobIndex
        break
      }
    }

    if (!draggedJob || !sourceColumn) return

    // Check if dropped in a column or another job
    const targetColumn = sortedColumns.find((col) => col._id === overId)
    const targetJob = sortedColumns
      .flatMap((col) => col.jobApplications || [])
      .find((job) => job._id === overId)

    let targetColumnId: string
    let newOrder: number

    if (targetColumn) {
      targetColumnId = targetColumn._id
      const jobsInTarget =
        targetColumn.jobApplications
          .filter((j) => j._id !== activeId)
          .sort((a, b) => a.order - b.order) || []
      newOrder = jobsInTarget.length
    } else if (targetJob) {
      const targetJobColumn = sortedColumns.find((col) =>
        col.jobApplications.some((j) => j._id === targetJob._id),
      )
      targetColumnId = targetJob.columnId || targetJobColumn?._id || ''
      if (!targetColumnId) return

      const targetColumnObj = sortedColumns.find(
        (col) => col._id === targetColumnId,
      )

      if (!targetColumnObj) return

      const allJobsInTargetOriginal =
        targetColumnObj.jobApplications.sort((a, b) => a.order - b.order) || []

      const allJobsInTargetFiltered =
        allJobsInTargetOriginal.filter((j) => j._id !== activeId) || []

      const targetIndexInOriginal = allJobsInTargetOriginal.findIndex(
        (j) => j._id === overId,
      )

      const targetIndexInFiltered = allJobsInTargetFiltered.findIndex(
        (j) => j._id === overId,
      )

      if (targetIndexInFiltered !== -1) {
        if (sourceColumn._id === targetColumnId) {
          if (sourceIndex < targetIndexInOriginal) {
            newOrder = targetIndexInFiltered + 1
          } else {
            newOrder = targetIndexInFiltered
          }
        } else {
          newOrder = targetIndexInFiltered
        }
      } else {
        newOrder = allJobsInTargetFiltered.length
      }
    } else {
      return
    }

    if (!targetColumnId) {
      return
    }

    await moveJob(activeId, targetColumnId, newOrder)
  }

  const activeJob = sortedColumns
    .flatMap((col) => col.jobApplications || [])
    .find((job) => job._id === activeId)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-auto w-full flex-col p-4 md:p-6 xl:h-[calc(100vh-200px)] ">
        <div
          className="flex w-full flex-col gap-6 xl:h-full xl:flex-row xl:gap-4 xl:overflow-x-auto xl:pb-2 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-none
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-none
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
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
                sortedColumns={sortedColumns}
              />
            )
          })}

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="cursor-pointer flex h-[60px] w-full shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60 bg-transparent text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary xl:w-[60px]"
            title="Add New Column"
          >
            <Plus className="h-6 w-6" />
          </motion.button>
        </div>
      </div>
      <DragOverlay>
        {activeJob ? (
          <div className="opacity-50">
            <JobApplicationCard
              job={activeJob}
              columns={sortedColumns}
              isOverlay={true}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
