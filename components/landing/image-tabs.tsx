'use client'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState('organize')
  const tabs = [
    { id: 'organize', label: 'Kanban Board' },
    { id: 'get-hired', label: 'Interview Tracker' },
    { id: 'manage-boards', label: 'Offer Insights' },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-12 flex justify-center">
            <div className="inline-flex rounded-full border border-border bg-muted/50 p-1.5 backdrop-blur-md">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative rounded-full px-6 py-2 text-sm font-semibold transition-all cursor-pointer outline-none',
                    activeTab === tab.id
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-background shadow-sm"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="group relative mx-auto max-w-5xl rounded-2xl border border-border bg-white p-2 shadow-2xl">
            <div className="mb-2 flex items-center gap-1.5 px-4 pt-2">
              <div className="size-3 rounded-full bg-red-400/20" />
              <div className="size-3 rounded-full bg-yellow-400/20" />
              <div className="size-3 rounded-full bg-green-400/20" />
              <div className="ml-4 h-5 w-1/3 rounded-md bg-muted/50" />
            </div>

            <div className="relative overflow-hidden rounded-xl bg-muted">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Image
                    src={`/hero-images/hero${activeTab === 'organize' ? '1' : activeTab === 'get-hired' ? '2' : '3'}.png`}
                    alt={activeTab}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
