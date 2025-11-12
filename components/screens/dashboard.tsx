"use client"

import { mockUser, recentTransactions, quantoInsights } from "@/lib/mock-data"
import { ChevronRight, Eye, EyeOff, Send, Plus } from "lucide-react"
import { useState } from "react"
import { QuantoCard } from "@/components/quanto/quanto-card"

export function DashboardScreen() {
  const [showBalance, setShowBalance] = useState(true)
  const primaryCard = mockUser.cards[0]
  const primaryAccount = mockUser.accounts[0]
  const topInsight = quantoInsights[0]

  return (
    <div className="space-y-6">
      {/* Primary Card */}
      <div className="relative">
        <div
          className={`bg-gradient-to-br ${primaryCard.color} rounded-2xl p-6 text-white shadow-lg aspect-video flex flex-col justify-between`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs opacity-75">Checking Account</p>
              <h3 className="text-lg font-semibold">{primaryCard.cardholderName}</h3>
            </div>
            <div className="w-10 h-6 bg-white/30 rounded"></div>
          </div>
          <div>
            <p className="text-xs opacity-75 mb-1">Card Number</p>
            <p className="text-xl font-mono tracking-widest">•••• •••• •••• {primaryCard.lastFour}</p>
            <div className="flex justify-between mt-4 text-xs">
              <span>{primaryCard.expiry}</span>
              <span>Valid</span>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Section */}
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-zinc-400">Total Balance</h3>
          <button onClick={() => setShowBalance(!showBalance)} className="text-zinc-400 hover:text-zinc-300">
            {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        <h2 className="text-3xl font-bold text-zinc-50 mb-4">
          {showBalance ? `₦${(primaryAccount.balance + mockUser.accounts[1].balance).toLocaleString()}` : "••••••"}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
            <Send size={18} />
            Send
          </button>
          <button className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg font-medium transition-colors">
            <Plus size={18} />
            Request
          </button>
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
        />
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Pay Bills", icon: "📱" },
          { label: "View Offers", icon: "🎁" },
          { label: "Support", icon: "💬" },
        ].map((item) => (
          <button
            key={item.label}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg p-4 flex flex-col items-center gap-2 transition-colors"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-medium text-zinc-300">{item.label}</span>
          </button>
        ))}
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
          {recentTransactions.slice(0, 3).map((tx) => (
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
