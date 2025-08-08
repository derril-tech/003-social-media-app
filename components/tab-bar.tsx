"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PlusSquare, UserRound } from 'lucide-react'
import { cn } from "@/lib/utils"

const items = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/upload", label: "Upload", Icon: PlusSquare },
  { href: "/profile", label: "Profile", Icon: UserRound },
]

export function TabBar() {
  const pathname = usePathname()
  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed bottom-0 inset-x-0 z-50 border-t border-black/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70"
    >
      <ul className="mx-auto flex max-w-3xl items-stretch justify-around px-4 py-2">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href))
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex min-w-[96px] flex-col items-center justify-center gap-1 rounded-md px-3 py-2 text-xs font-medium",
                  active ? "text-emerald-600" : "text-zinc-700 hover:text-black"
                )}
              >
                <Icon className={cn("h-5 w-5", active ? "stroke-emerald-600" : "stroke-current")} />
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default function PixelPalsTabBar() {
  return <TabBar />
}
