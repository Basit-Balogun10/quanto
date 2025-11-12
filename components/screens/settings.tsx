"use client"

import type { Persona } from "@/lib/types"
import { useState } from "react"

interface SettingsScreenProps {
  persona: Persona
}

export function SettingsScreen({ persona }: SettingsScreenProps) {
  const [controls, setControls] = useState({
    empathetic: true,
    preventive: true,
    reward: true,
    educational: true,
    ambient: true,
  })

  const toggleCategory = (category: keyof typeof controls) => {
    setControls((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-50 mb-2">Privacy & Controls</h2>
        <p className="text-sm text-zinc-400">Manage what Quanto can access and do</p>
      </div>

      {/* Quanto Categories */}
      <div className="space-y-4">
        <h3 className="font-semibold text-zinc-50">Quanto Response Categories</h3>

        <div className="space-y-3">
          {[
            {
              id: "empathetic",
              name: "Empathetic Support",
              description: "Detect salary delays and offer financial support",
            },
            {
              id: "preventive",
              name: "Preventive Alerts",
              description: "Alert when overspending or unusual patterns detected",
            },
            {
              id: "reward",
              name: "Rewards & Achievements",
              description: "Celebrate milestones and savings achievements",
            },
            {
              id: "educational",
              name: "Educational Tips",
              description: "Provide financial literacy and best practices",
            },
            {
              id: "ambient",
              name: "Ambient Insights",
              description: "Context-aware spending reminders and suggestions",
            },
          ].map((cat) => (
            <div
              key={cat.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-50">{cat.name}</p>
                <p className="text-xs text-zinc-400 mt-1">{cat.description}</p>
              </div>
              <button
                onClick={() => toggleCategory(cat.id as keyof typeof controls)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  controls[cat.id as keyof typeof controls] ? "bg-blue-600" : "bg-zinc-700"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    controls[cat.id as keyof typeof controls] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Usage */}
      <div>
        <h3 className="font-semibold text-zinc-50 mb-3">Data Usage</h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div>
            <p className="text-sm text-zinc-300">Spending Patterns</p>
            <p className="text-xs text-zinc-400 mt-1">Used for preventive and educational insights</p>
          </div>
          <div>
            <p className="text-sm text-zinc-300">Income & Savings</p>
            <p className="text-xs text-zinc-400 mt-1">Used for reward and ambient insights</p>
          </div>
          <div>
            <p className="text-sm text-zinc-300">Transaction History</p>
            <p className="text-xs text-zinc-400 mt-1">Used for all Quanto analysis</p>
          </div>
        </div>
      </div>

      {/* About Quanto */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <h3 className="font-semibold text-zinc-50 mb-2">About Quanto</h3>
        <p className="text-sm text-zinc-400">
          Quanto is a privacy-first AI companion designed to provide empathetic, explainable financial guidance based on
          your explicit consent.
        </p>
      </div>
    </div>
  )
}
