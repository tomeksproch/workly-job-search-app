import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center px-4 py-32 text-center md:py-48">
          <div className="mx-auto max-w-5xl">
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Your job search, <br className="hidden sm:block" />
              <span className="text-primary">finally organized.</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground sm:text-2xl">
              Ditch the messy spreadsheets. Track applications, manage interviews, and land your dream job with Workly.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/sign-up">
                <Button size="lg" className="h-14 px-8 text-lg font-semibold cursor-pointer">
                  Let's get to work <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
            </div>
            
            <p className="mt-6 text-sm font-medium text-muted-foreground">
              No credit card required · Free for job seekers
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}