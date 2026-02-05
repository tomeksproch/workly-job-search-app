import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function AuthButtons() {
  return (
    <div className="flex items-center gap-3">
      <Link href="/sign-in">
        <Button
          variant="ghost"
          className="h-10 rounded-full px-5 text-sm font-semibold transition-colors hover:bg-muted cursor-pointer"
        >
          Sign In
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button className="h-10 rounded-full bg-primary px-6 text-sm font-bold shadow-md shadow-primary/20 transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] cursor-pointer">
          Create Account
        </Button>
      </Link>
    </div>
  )
}
