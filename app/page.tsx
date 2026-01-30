import ImageTabs from '@/components/landing/image-tabs'
import HeroSection from '@/components/landing/hero-section'
import FeaturesSection from '@/components/landing/features-section'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <HeroSection />
        <ImageTabs />
        <FeaturesSection />
      </main>
    </div>
  )
}
