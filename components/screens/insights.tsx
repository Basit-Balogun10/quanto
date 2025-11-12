"use client"

import { quantoInsights } from "@/lib/mock-data"
import { QuantoCard } from "@/components/quanto/quanto-card"
import { CheckCircle2 } from "lucide-react"

interface InsightsScreenProps {
  onMarkAllRead: () => void
}

export function InsightsScreen({ onMarkAllRead }: InsightsScreenProps) {
  const unreadInsights = quantoInsights.filter((i) => !i.read)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-50 mb-1">Insights</h2>
          <p className="text-sm text-zinc-400">
            {unreadInsights.length} new insight{unreadInsights.length !== 1 ? "s" : ""}
          </p>
        </div>
        {unreadInsights.length > 0 && (
          <button
            onClick={onMarkAllRead}
            className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Unread Insights */}
      {unreadInsights.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-zinc-400 uppercase">New</p>
          {unreadInsights.map((insight) => (
            <QuantoCard
              key={insight.id}
              title={insight.title}
              message={insight.message}
              category={insight.category}
              actionLabel={insight.actionLabel}
              priority={insight.priority}
            />
          ))}
        </div>
      )}

      {/* Read Insights */}
      {quantoInsights.filter((i) => i.read).length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-zinc-400 uppercase">Earlier</p>
          {quantoInsights
            .filter((i) => i.read)
            .map((insight) => (
              <div key={insight.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 opacity-60">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-400">{insight.title}</p>
                    <p className="text-xs text-zinc-500 mt-1">{insight.message}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
