'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 [background:radial-gradient(120%_120%_at_50%_10%,#fff_40%,#e0e7ff_100%)]" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <Briefcase className="size-4" />
            <span>Your All-in-One Job Search Tracker</span>
          </motion.div>
          <motion.h1
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="max-w-4xl text-balance text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl"
          >
            Control the chaos of <br />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              your career journey.
            </span>
          </motion.h1>
          <motion.p
            {...fadeIn}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Workly is the visual command center for job seekers. Scale your
            applications without losing your mind in spreadsheets.
          </motion.p>
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/sign-up">
              <Button
                size="lg"
                className="h-14 rounded-full cursor-pointer px-10 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                Get Started Free <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
