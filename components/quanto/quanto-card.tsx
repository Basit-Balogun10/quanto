"use client"

import { AlertCircle, Gift, BookOpen, Eye } from "lucide-react"
import type { Category } from "@/lib/types"

interface QuantoCardProps {
  title: string
  message: string
  category: Category
  actionLabel: string
  priority: "high" | "medium" | "low"
}

export function QuantoCard({ title, message, category, actionLabel, priority }: QuantoCardProps) {
  const categoryConfig: Record<Category, { icon: typeof AlertCircle; color: string; label: string }> = {
    empathetic: { icon: AlertCircle, color: "blue", label: "Support" },
    preventive: { icon: AlertCircle, color: "amber", label: "Alert" },
    reward: { icon: Gift, color: "emerald", label: "Reward" },
    educational: { icon: BookOpen, color: "indigo", label: "Learn" },
    ambient: { icon: Eye, color: "violet", label: "Tip" },
  }

  const config = categoryConfig[category]
  const Icon = config.icon

  const bgColors: Record<string, string> = {
    blue: "bg-blue-950 border-blue-900",
    amber: "bg-amber-950 border-amber-900",
    emerald: "bg-emerald-950 border-emerald-900",
    indigo: "bg-indigo-950 border-indigo-900",
    violet: "bg-violet-950 border-violet-900",
  }

  const textColors: Record<string, string> = {
    blue: "text-blue-400",
    amber: "text-amber-400",
    emerald: "text-emerald-400",
    indigo: "text-indigo-400",
    violet: "text-violet-400",
  }

  const priorityIndicator: Record<string, string> = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-zinc-500",
  }

  return (
    <div className={`${bgColors[config.color]} border rounded-lg p-4 flex gap-4`}>
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 rounded-lg bg-${config.color}-900/50 flex items-center justify-center`}>
          <Icon size={20} className={textColors[config.color]} />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between mb-1">
          <p className={`text-xs font-semibold ${textColors[config.color]} uppercase`}>{config.label}</p>
          <div className={`${priorityIndicator[priority]} w-2 h-2 rounded-full`} />
        </div>
        <h4 className="text-sm font-semibold text-zinc-50 mb-1">{title}</h4>
        <p className="text-xs text-zinc-300 mb-3">{message}</p>
        <button className={`text-xs font-medium ${textColors[config.color]} hover:opacity-80 transition-opacity`}>
          {actionLabel} →
        </button>
      </div>
    </div>
  )
}
