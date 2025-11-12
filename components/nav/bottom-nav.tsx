"use client"

import { CreditCard, History, Zap, Settings, Home } from "lucide-react"

type Screen = "dashboard" | "cards" | "transactions" | "insights" | "settings"

interface BottomNavProps {
  currentScreen: Screen
  onScreenChange: (screen: Screen) => void
  unreadCount: number
}

export function BottomNav({ currentScreen, onScreenChange, unreadCount }: BottomNavProps) {
  const navItems: Array<{ id: Screen; label: string; icon: typeof Home }> = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "cards", label: "Cards", icon: CreditCard },
    { id: "transactions", label: "History", icon: History },
    { id: "insights", label: "Insights", icon: Zap },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-900 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/95">
      <div className="flex items-center justify-around">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onScreenChange(id)}
            className={`flex-1 py-4 flex flex-col items-center gap-1 text-xs font-medium transition-colors relative ${
              currentScreen === id ? "text-blue-400" : "text-zinc-400 hover:text-zinc-300"
            }`}
          >
            <Icon size={24} />
            <span>{label}</span>
            {id === "insights" && unreadCount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
