import { Briefcase, CheckCircle2, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Briefcase,
    title: 'Organize Applications',
    description:
      'Create custom boards and columns to track your job applications at every stage of the process.',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description:
      'Monitor your application status from applied to interview to offer with visual Kanban boards.',
  },
  {
    icon: CheckCircle2,
    title: 'Stay Organized',
    description:
      'Never lose track of an application. Keep all your job search information in one centralized place.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
