'use client'

import Link from 'next/link'
import { UserDropdown } from '@/components/navbar/user-dropdown'
import { AuthButtons } from '@/components/navbar/auth-buttons'
import { useSession } from '@/lib/auth/auth-client'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-90"
          >
            <span className="text-3xl font-extrabold tracking-tighter text-foreground">
              workly<span className="text-primary text-4xl ml-0.5">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6"></nav>
        </div>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="hidden sm:block">
                <span className="text-sm font-medium hover:text-primary">
                  Go to Dashboard
                </span>
              </Link>
              <UserDropdown user={session.user} />
            </div>
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </header>
  )
}
