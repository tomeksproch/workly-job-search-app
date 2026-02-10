'use client'

import {
  Plus,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Link as LinkIcon,
  Hash,
  FileText,
  StickyNote,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface CreateJobApplicationDialogProps {
  columnId: string
  boardId: string
}

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group h-12 w-full justify-start rounded-xl border-dashed border-border bg-background/50 px-3 text-muted-foreground hover:border-primary hover:bg-primary/5 hover:text-primary"
        >
          <Plus className="mr-2 h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
          <span className="truncate">Add new application</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[85dvh] w-[95vw] flex-col gap-0 p-0 sm:max-h-[85vh] sm:max-w-2xl overflow-hidden rounded-2xl bg-white">
        <DialogHeader className="shrink-0 border-b px-6 py-4">
          <DialogTitle className="text-xl font-bold">
            Add Job Application
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Keep track of a new opportunity by filling out the details below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <form className="space-y-5" id="create-job-form">
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
              />
            </div>
          </form>
        </div>

        <DialogFooter className="shrink-0 gap-2 border-t px-6 py-4 sm:flex-row flex-col-reverse">
          <Button
            type="button"
            variant="outline"
            className="h-10 rounded-lg px-6 w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-job-form"
            className="h-10 rounded-lg px-6 shadow-md shadow-primary/20 w-full sm:w-auto"
          >
            Add Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
