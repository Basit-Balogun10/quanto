"use client"

import { mockUser } from "@/lib/mock-data"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
            {mockUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-50">{mockUser.name}</p>
            <p className="text-xs text-zinc-400">{mockUser.email}</p>
          </div>
        </div>
        <Link
          href="/admin"
          className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
        >
          Admin
        </Link>
      </div>
    </header>
  )
}
