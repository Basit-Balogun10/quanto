"use client"

import type { Persona, Campaign } from "@/lib/types"
import { Search, Gift, TrendingUp, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { QuantoCard } from "@/components/quanto/quanto-card"

interface InsightsScreenProps {
  persona: Persona
}

export function InsightsScreen({ persona }: InsightsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([])

  // Load campaigns from localStorage and filter for this user
  useEffect(() => {
    const loadCampaigns = () => {
      const savedCampaigns = JSON.parse(localStorage.getItem("quantoCampaigns") || "[]");
      const userQualifiedCampaigns = savedCampaigns.filter((campaign: Campaign) => 
        campaign.enabled && 
        campaign.qualifiedUserIds?.includes(persona.id)
      );
      setActiveCampaigns(userQualifiedCampaigns);
    };

    loadCampaigns();

    // Poll for campaign updates every 2 seconds
    const interval = setInterval(loadCampaigns, 2000);

    return () => clearInterval(interval);
  }, [persona.id]);

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

      {/* Active Campaigns Section */}
      {activeCampaigns.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-zinc-50">Exclusive Offers for You</h3>
          </div>
          
          <div className="grid gap-4">
            {activeCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-white mb-1">{campaign.name}</h4>
                    <p className="text-sm text-zinc-300 mb-3">{campaign.message}</p>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                        <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-xs font-semibold text-green-400">
                          {campaign.reward.value}% {campaign.reward.type}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400">
                        {campaign.reward.description}
                      </span>
                    </div>

                    <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm rounded-lg font-medium transition-all shadow-lg shadow-purple-500/20">
                      Claim Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
