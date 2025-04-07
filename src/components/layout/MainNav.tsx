"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Activity, Users, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  const navItems = [
    { label: "Dashboard", href: "/", icon: Home },
    { label: "Activity", href: "/activity", icon: Activity },
    { label: "Friends", href: "/friends", icon: Users },
    { label: "Groups", href: "/groups", icon: Layers },
  ]

  return (
    <nav className="flex gap-4 sm:gap-6">
      {navItems.map(({ label, href, icon: Icon }) => (
        <Link
        key={href}
        href={href}
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-colors rounded-md px-3 py-1",
          pathname === href
            ? "bg-muted text-white" // 👈 active tab
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </Link>      
      ))}
    </nav>
  )
}
