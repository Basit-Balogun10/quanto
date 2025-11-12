"use client"

import type { Persona } from "@/lib/types"
import { ChevronRight, Eye, EyeOff, Send, Zap } from "lucide-react"
import { useState } from "react"
import { QuantoCard } from "@/components/quanto/quanto-card"
import { quickActions } from "@/lib/mock-data"

interface DashboardScreenProps {
  persona: Persona
}

export function DashboardScreen({ persona }: DashboardScreenProps) {
  const [showBalance, setShowBalance] = useState(true)
  const topInsight = persona.quantoResponses[0]

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm opacity-75">Account Balance</p>
              <h2 className="text-4xl font-bold">{showBalance ? `₦${persona.balance.toLocaleString()}` : "••••••"}</h2>
            </div>
            <button onClick={() => setShowBalance(!showBalance)} className="text-white/70 hover:text-white">
              {showBalance ? <Eye size={24} /> : <EyeOff size={24} />}
            </button>
          </div>

          {/* Action Buttons - Consolidated */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-3 rounded-xl font-medium transition-all">
              <Send size={18} />
              Send Money
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-3 rounded-xl font-medium transition-all">
              <Zap size={18} />
              Quick Pay
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <p className="text-xs font-semibold text-zinc-400 mb-3">Quick Actions</p>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:border-zinc-700"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium text-zinc-300 text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quanto Insight Card */}
      {topInsight && (
        <QuantoCard
          title={topInsight.title}
          message={topInsight.message}
          category={topInsight.category}
          actionLabel={topInsight.actionLabel}
          priority={topInsight.priority}
          flowType={topInsight.flowType}
          flowData={topInsight.flowData}
        />
      )}

      {/* Spending Overview */}
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="font-semibold text-zinc-50 mb-4">This Month's Spending</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-400">Current Spend</span>
              <span className="text-zinc-50 font-semibold">₦{persona.currentSpend.toLocaleString()}</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(persona.currentSpend / persona.usualMonthlySpend) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-zinc-400">
            <span>Usual Monthly: ₦{persona.usualMonthlySpend.toLocaleString()}</span>
            <span>{Math.round((persona.currentSpend / persona.usualMonthlySpend) * 100)}% of usual</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions Preview */}
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-zinc-50">Recent Activity</h3>
          <button className="text-blue-400 text-sm font-medium flex items-center gap-1">
            View all
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {persona.transactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xl">{tx.icon}</div>
                <div>
                  <p className="text-sm font-medium text-zinc-50">{tx.vendor}</p>
                  <p className="text-xs text-zinc-400">{tx.date}</p>
                </div>
              </div>
              <p className={`font-semibold ${tx.type === "credit" ? "text-green-400" : "text-zinc-50"}`}>
                {tx.type === "credit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
