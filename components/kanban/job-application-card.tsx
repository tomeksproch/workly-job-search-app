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
  Briefcase,
  LinkIcon,
  Hash,
  FileText,
  StickyNote,
  DollarSign,
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
import {
  deleteJobApplication,
  updateJobApplication,
} from '@/lib/actions/job-applications'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useState } from 'react'

interface JobApplicationCardProps {
  job: JobApplication
  columns: Column[]
  dragHandleProps?: React.HTMLAttributes<HTMLElement>
  isOverlay?: boolean
}

export default function JobApplicationCard({
  job,
  columns,
  dragHandleProps,
}: JobApplicationCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    company: job.company,
    position: job.position,
    location: job.location || '',
    notes: job.notes || '',
    salary: job.salary || '',
    jobUrl: job.jobUrl || '',
    columnId: job.columnId || '',
    tags: job.tags?.join(', ') || '',
    description: job.description || '',
  })

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    try {
      const result = await updateJobApplication(job._id, {
        ...formData,
        tags: formData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      })

      if (!result.error) {
        setIsEditing(false)
      }
    } catch (err) {
      console.error('Failed to move job application: ', err)
    }
  }

  async function handleDelete() {
    try {
      const result = await deleteJobApplication(job._id)

      if (result.error) {
        console.error('Failed to delete job application:', result.error)
      }
    } catch (err) {
      console.error('Failed to move job application: ', err)
    }
  }

  async function handleMove(newColumnId: string) {
    try {
      const result = await updateJobApplication(job._id, {
        columnId: newColumnId,
      })
    } catch (err) {
      console.error('Failed to move job application: ', err)
    }
  }

  return (
    <>
      <Card
        className="group relative z-10 rounded-xl border border-border/50 bg-white shadow-sm transition-all hover:border-primary/20 hover:shadow-md cursor-grab active:cursor-grabbing"
        {...dragHandleProps}
      >
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
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
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
                        <DropdownMenuItem
                          key={key}
                          className="cursor-pointer"
                          onClick={() => handleMove(col._id)}
                        >
                          <Move className="mr-2 h-4 w-4" />
                          {col.name}
                        </DropdownMenuItem>
                      ))}
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
                  onClick={() => handleDelete()}
                >
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

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="flex max-h-[85dvh] w-[95vw] flex-col gap-0 p-0 sm:max-h-[85vh] sm:max-w-2xl overflow-hidden rounded-2xl bg-white">
          <DialogHeader className="shrink-0 border-b px-6 py-4">
            <DialogTitle className="text-xl font-bold">
              Edit Job Application
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Keep track of a new opportunity by filling out the details below.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <form
              className="space-y-5"
              id="create-job-form"
              onSubmit={handleUpdate}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="company"
                    className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                  >
                    <Building2 className="h-3.5 w-3.5" /> Company *
                  </Label>
                  <Input
                    id="company"
                    placeholder="e.g. Acme Corp"
                    required
                    className="h-10 rounded-lg bg-secondary/30 focus:bg-background transition-colors"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="position"
                    className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                  >
                    <Briefcase className="h-3.5 w-3.5" /> Position *
                  </Label>
                  <Input
                    id="position"
                    placeholder="e.g. Frontend Engineer"
                    required
                    className="h-10 rounded-lg bg-secondary/30 focus:bg-background transition-colors"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                  >
                    <MapPin className="h-3.5 w-3.5" /> Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g. Remote"
                    className="h-10 rounded-lg bg-secondary/30 focus:bg-background transition-colors"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="salary"
                    className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                  >
                    <DollarSign className="h-3.5 w-3.5" /> Salary
                  </Label>
                  <Input
                    id="salary"
                    placeholder="e.g. $120k+"
                    className="h-10 rounded-lg bg-secondary/30 focus:bg-background transition-colors"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="jobUrl"
                  className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                >
                  <LinkIcon className="h-3.5 w-3.5" /> URL
                </Label>
                <Input
                  id="jobUrl"
                  type="url"
                  placeholder="https://..."
                  className="h-10 rounded-lg bg-secondary/30 focus:bg-background transition-colors"
                  value={formData.jobUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, jobUrl: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="tags"
                  className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                >
                  <Hash className="h-3.5 w-3.5" /> Tags
                </Label>
                <Input
                  id="tags"
                  placeholder="React, Remote..."
                  className="h-10 rounded-lg bg-secondary/30 focus:bg-background transition-colors"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                >
                  <FileText className="h-3.5 w-3.5" /> Description
                </Label>
                <Textarea
                  id="description"
                  rows={3}
                  placeholder="Key requirements..."
                  className="resize-none rounded-lg bg-secondary/30 focus:bg-background transition-colors min-h-[80px]"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="notes"
                  className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                >
                  <StickyNote className="h-3.5 w-3.5" /> Notes
                </Label>
                <Textarea
                  id="notes"
                  rows={2}
                  placeholder="My thoughts..."
                  className="resize-none rounded-lg bg-secondary/30 focus:bg-background transition-colors min-h-[60px]"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>
            </form>
          </div>

          <DialogFooter className="shrink-0 gap-2 border-t px-6 py-4 sm:flex-row flex-col-reverse">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer h-10 rounded-lg px-6 w-full sm:w-auto"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="create-job-form"
              className="cursor-pointer h-10 rounded-lg px-6 shadow-md shadow-primary/20 w-full sm:w-auto"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
