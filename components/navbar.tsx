import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-2">
                <Link href="/">
                    <span className="text-2xl font-bold text-foreground">workly.</span>
                </Link>
            </div>
            <div className="flex items-center gap-2">
                <Link href="/sign-in">    
                    <Button variant="ghost" className="cursor-pointer font-medium text-muted-foreground hover:text-primary">
                        Register
                    </Button>
                </Link>
                <Link href="/sign-up">
                    <Button className="cursor-pointer font-semibold shadow-sm">
                        Login
                    </Button>
                </Link>
            </div>
        </nav>
    )
}