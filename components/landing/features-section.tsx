'use client'
import { motion } from 'framer-motion'
import {
  Briefcase,
  TrendingUp,
  Zap,
  CheckCircle2,
  MousePointer2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Briefcase,
    title: 'Organize Applications',
    description:
      'Create custom boards and columns to track your job applications at every stage.',
    className: 'md:col-span-2 md:row-span-2 bg-blue-50/50 dark:bg-blue-950/10',
    iconClassName: 'bg-blue-500/10 text-blue-600',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description:
      'Monitor status from applied to offer with visual Kanban boards.',
    className:
      'md:col-span-1 md:row-span-1 bg-slate-50/50 dark:bg-slate-900/50',
    iconClassName: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    icon: Zap,
    title: 'Fast & Fluid',
    description: 'Lightning fast interface built for speed.',
    className:
      'md:col-span-1 md:row-span-1 bg-orange-50/50 dark:bg-orange-950/10',
    iconClassName: 'bg-orange-500/10 text-orange-600',
  },
  {
    icon: CheckCircle2,
    title: 'Stay Organized',
    description:
      'Keep all your job search information in one centralized place.',
    className:
      'md:col-span-1 md:row-span-1 bg-purple-50/50 dark:bg-purple-950/10',
    iconClassName: 'bg-purple-500/10 text-purple-600',
  },
  {
    icon: MousePointer2,
    title: 'Drag & Drop',
    description: 'Move applications between stages with ease.',
    className:
      'md:col-span-2 md:row-span-1 bg-slate-50/50 dark:bg-slate-900/50',
    iconClassName: 'bg-primary/10 text-primary',
  },
]

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to land the job
          </h2>
          <p className="mt-4 text-muted-foreground">
            Powerful tools designed to make your job search systematic and
            stress-free.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 auto-rows-[180px]"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                'group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1',
                feature.className,
              )}
            >
              <div>
                <div
                  className={cn(
                    'mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl',
                    feature.iconClassName,
                  )}
                >
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-[240px]">
                  {feature.description}
                </p>
              </div>
              <div className="absolute -right-4 -bottom-4 size-24 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
