import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/sign-in">
        <Button
          variant="ghost"
          className="cursor-pointer font-medium text-muted-foreground hover:text-primary"
        >
          Sign In
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button className="cursor-pointer font-semibold shadow-sm">
          Create Account
        </Button>
      </Link>
    </div>
  )
}
