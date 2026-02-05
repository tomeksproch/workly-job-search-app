'use client'

import { LogOut, Settings, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth/auth-client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface UserDropdownProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter()

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U'

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in')
          router.refresh()
        },
      },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full border border-border/50 p-0 hover:bg-muted cursor-pointer"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ''} alt={user.name || ''} />
            <AvatarFallback className="bg-primary/10 text-[10px] font-bold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 rounded-xl p-2 shadow-xl"
        align="end"
      >
        <DropdownMenuLabel className="p-3 font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="mx-1" />

        <DropdownMenuGroup className="p-1">
          <Link href="/dashboard">
            <DropdownMenuItem className="rounded-lg py-2.5 cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Dashboard</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem className="rounded-lg py-2.5 cursor-pointer">
              <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mx-1" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="rounded-lg py-2.5 cursor-pointer text-red-500 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span className="font-medium">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
