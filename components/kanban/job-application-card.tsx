'use client'

import { Column, JobApplication } from '@/lib/models/models.types'
import { Card, CardContent } from '@/components/ui/card'
import {
  MoreVertical,
  Move,
  Pencil,
  Trash2,
  Building2,
  Calendar,
  MapPin,
  Globe,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface JobApplicationCardProps {
  job: JobApplication
  columns: Column[]
}

export default function JobApplicationCard({
  job,
  columns,
}: JobApplicationCardProps) {
  return (
    <Card className="group relative z-10 rounded-xl border border-border/50 bg-white shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
      <CardContent className="p-4">
        <div className="absolute right-2 top-2 z-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer h-8 w-8 text-muted-foreground opacity-100 transition-opacity hover:bg-secondary hover:text-foreground sm:opacity-0 sm:group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48" sideOffset={5}>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              {columns.length > 1 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                    Move to
                  </DropdownMenuLabel>
                  {columns
                    .filter((col) => col._id !== job.columnId)
                    .map((col, key) => (
                      <DropdownMenuItem key={key} className="cursor-pointer">
                        <Move className="mr-2 h-4 w-4" />
                        {col.name}
                      </DropdownMenuItem>
                    ))}
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="pr-8">
          <h3 className="line-clamp-1 text-base font-semibold text-foreground">
            {job.position}
          </h3>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 min-w-0">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate max-w-[150px] font-medium text-foreground/80">
                {job.company}
              </span>
            </div>

            {job.location && (
              <div className="flex items-center gap-1 min-w-0">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate max-w-[120px]">{job.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {job.tags.map((tag, key) => (
                <Badge
                  key={key}
                  variant="outline"
                  className="flex items-center gap-0.5 rounded-md border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary transition-colors hover:border-primary/30 hover:bg-primary/10"
                >
                  <span className="opacity-70">#</span>
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {job.description && (
            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground/80">
              {job.description}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-dashed border-border/60 pt-3">
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Just now</span>
          </div>

          {job.jobUrl && (
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer inline-flex items-center gap-1 text-[10px] font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
            >
              <Globe className="h-3 w-3" />
              Job site
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
