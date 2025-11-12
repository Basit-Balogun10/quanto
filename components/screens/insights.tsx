"use client"

import type { Persona } from "@/lib/types"
import { Search } from "lucide-react"
import { useState } from "react"
import { QuantoCard } from "@/components/quanto/quanto-card"

interface InsightsScreenProps {
  persona: Persona
}

export function InsightsScreen({ persona }: InsightsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["empathetic", "preventive", "reward", "educational", "ambient"] as const

  const filteredInsights = persona.quantoResponses.filter((insight) => {
    const matchesSearch =
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || insight.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-50">Quanto Insights</h2>
        <p className="text-sm text-zinc-400">AI-powered financial guidance</p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === null ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors capitalize ${
                selectedCategory === cat ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Insights List - Removed category legend */}
      <div className="space-y-4">
        {filteredInsights.length > 0 ? (
          filteredInsights.map((insight) => (
            <QuantoCard
              key={insight.id}
              title={insight.title}
              message={insight.message}
              category={insight.category}
              actionLabel={insight.actionLabel}
              priority={insight.priority}
              flowType={insight.flowType}
              flowData={insight.flowData}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-400">No insights match your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
