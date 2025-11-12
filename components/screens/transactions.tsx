"use client"

import { recentTransactions } from "@/lib/mock-data"
import { Download } from "lucide-react"
import { useState } from "react"

export function TransactionsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["All", "Dining", "Shopping", "Transport", "Utilities", "Entertainment", "Income"]

  const filteredTransactions =
    selectedCategory && selectedCategory !== "All"
      ? recentTransactions.filter((tx) => tx.category.toLowerCase() === selectedCategory.toLowerCase())
      : recentTransactions

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-50 mb-2">Transaction History</h2>
        <p className="text-sm text-zinc-400">All your recent transactions</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === "All" ? null : cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              (cat === "All" && !selectedCategory) || (cat === selectedCategory)
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-zinc-900 hover:bg-zinc-800/50 border border-zinc-800 rounded-lg p-4 flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="text-2xl w-10 h-10 flex items-center justify-center">{tx.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-50">{tx.vendor}</p>
                <p className="text-xs text-zinc-500">{tx.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${tx.type === "credit" ? "text-green-400" : "text-zinc-50"}`}>
                {tx.type === "credit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
              </p>
              <p className="text-xs text-zinc-500 capitalize">{tx.category}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg font-medium transition-colors">
        <Download size={18} />
        Download Statement
      </button>
    </div>
  )
}
