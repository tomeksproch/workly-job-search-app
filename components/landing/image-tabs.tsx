'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState('organize')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  return (
    <section className="py-16 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-2 justify-center mb-10">
            <Button
              className={`rounded-lg px-6 py3 text-sm font-medium transition-colors duration-200 ease-in-out cursor-pointer ${activeTab === 'organize' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 border-primary text-gray-700 hover:bg-gray-200 over:text-primary'}`}
              onClick={() => handleTabChange('organize')}
            >
              Organize your job applications
            </Button>
            <Button
              className={`rounded-lg px-6 py3 text-sm font-medium transition-colors duration-200 ease-in-out cursor-pointer ${activeTab === 'get-hired' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 border-primary text-gray-700 hover:bg-gray-200 over:text-primary'}`}
              onClick={() => handleTabChange('get-hired')}
            >
              Get Hired
            </Button>
            <Button
              className={`rounded-lg px-6 py3 text-sm font-medium transition-colors duration-200 ease-in-out cursor-pointer ${activeTab === 'manage-boards' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 border-primary text-gray-700 hover:bg-gray-200 over:text-primary'}`}
              onClick={() => handleTabChange('manage-boards')}
            >
              Manage Boards
            </Button>
          </div>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
            {activeTab === 'organize' && (
              <Image
                src="/hero-images/hero1.png"
                alt="Organize your job applications"
                width={1200}
                height={800}
              />
            )}
            {activeTab === 'get-hired' && (
              <Image
                src="/hero-images/hero2.png"
                alt="Oet Hired"
                width={1200}
                height={800}
              />
            )}
            {activeTab === 'manage-boards' && (
              <Image
                src="/hero-images/hero3.png"
                alt="Manage Boards"
                width={1200}
                height={800}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
