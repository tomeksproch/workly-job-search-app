'use client'

import Link from 'next/link'
import { UserDropdown } from '@/components/navbar/user-dropdown'
import { AuthButtons } from '@/components/navbar/auth-buttons'
import { useSession } from '@/lib/auth/auth-client'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <Link href="/">
          <span className="text-2xl font-bold text-foreground">
            workly<span className="text-primary text-4xl">.</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {session?.user ? <UserDropdown user={session.user} /> : <AuthButtons />}
      </div>
    </nav>
  )
}
