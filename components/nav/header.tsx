"use client"

import type { Persona } from "@/lib/types"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  persona: Persona
}

export function Header({ persona }: HeaderProps) {
  const [copied, setCopied] = useState(false)

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(persona.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            {persona.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-50">{persona.name}</p>
            <button
              onClick={copyAccountNumber}
              className="text-xs text-zinc-400 hover:text-zinc-300 transition-colors flex items-center gap-1 group"
            >
              <span className="font-mono">•••• •••• •••• {persona.accountNumber.slice(-4)}</span>
              {copied ? (
                <Check size={12} className="text-green-400" />
              ) : (
                <Copy size={12} className="opacity-0 group-hover:opacity-100" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
