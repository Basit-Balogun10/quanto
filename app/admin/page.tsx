"use client"

import { useState } from "react"
import { defaultAdminControls } from "@/lib/mock-data"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [controls, setControls] = useState(defaultAdminControls)

  const toggleCategory = (category: string) => {
    setControls((prev) => ({
      ...prev,
      enabledCategories: {
        ...prev.enabledCategories,
        [category]: !prev.enabledCategories[category as any],
      },
    }))
  }

  const toggleRule = (ruleId: string) => {
    setControls((prev) => ({
      ...prev,
      rules: prev.rules.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)),
    }))
  }

  const categoryLabels: Record<string, string> = {
    empathetic: "Empathetic Support",
    preventive: "Preventive Alerts",
    reward: "Rewards & Incentives",
    educational: "Educational Tips",
    ambient: "Ambient Suggestions",
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="px-4 py-4 flex items-center gap-3">
          <Link href="/" className="hover:bg-zinc-800 p-2 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Quanto Admin</h1>
        </div>
      </div>

      <main className="px-4 py-6 max-w-2xl mx-auto pb-24">
        {/* Categories */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-zinc-50 mb-4">Insight Categories</h2>
          <div className="space-y-3 bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-50">{label}</p>
                  <p className="text-xs text-zinc-400 capitalize">{key}</p>
                </div>
                <button
                  onClick={() => toggleCategory(key)}
                  className={`w-11 h-6 rounded-full transition-colors ${
                    controls.enabledCategories[key as any] ? "bg-blue-600" : "bg-zinc-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      controls.enabledCategories[key as any] ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Rules */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-zinc-50 mb-4">Engagement Rules</h2>
          <div className="space-y-3">
            {controls.rules.map((rule) => (
              <div key={rule.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-zinc-50">{rule.name}</p>
                    <p className="text-xs text-zinc-400 mt-1">{rule.trigger}</p>
                  </div>
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                      rule.enabled ? "bg-blue-600" : "bg-zinc-700"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        rule.enabled ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-zinc-400">{rule.message}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Save Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors sticky bottom-6">
          <Save size={18} />
          Save Changes
        </button>
      </main>
    </div>
  )
}
