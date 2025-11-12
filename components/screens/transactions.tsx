"use client"

import type { Persona, Transaction } from "@/lib/types"
import { useState } from "react"
import { X, BarChart3 } from "lucide-react"

interface TransactionsScreenProps {
  persona: Persona
}

export function TransactionsScreen({ persona }: TransactionsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const categories = Array.from(new Set(persona.transactions.map((tx) => tx.category)))
  const filteredTransactions = selectedCategory
    ? persona.transactions.filter((tx) => tx.category === selectedCategory)
    : persona.transactions

  const categorySpending = categories.map((cat) => {
    const spending = persona.transactions
      .filter((tx) => tx.category === cat && tx.type === "debit")
      .reduce((sum, tx) => sum + tx.amount, 0)
    return { category: cat, spending, count: persona.transactions.filter((tx) => tx.category === cat).length }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-50 mb-2">Transactions</h2>
          <p className="text-sm text-zinc-400">View and manage your account activity</p>
        </div>
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <BarChart3 size={18} />
          Analytics
        </button>
      </div>

      {/* Analytics View */}
      {showAnalytics && (
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h3 className="font-semibold text-zinc-50 mb-4">Spending by Category</h3>
          <div className="space-y-3">
            {categorySpending
              .filter((item) => item.spending > 0)
              .sort((a, b) => b.spending - a.spending)
              .map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm capitalize text-zinc-300">{item.category}</span>
                    <span className="text-sm font-semibold text-zinc-50">₦{item.spending.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${(item.spending / Math.max(...categorySpending.map((c) => c.spending))) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

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
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.map((tx) => (
          <button
            key={tx.id}
            onClick={() => setSelectedTransaction(tx)}
            className="w-full text-left bg-zinc-900 rounded-xl p-4 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{tx.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-zinc-50">{tx.vendor}</p>
                  <p className="text-xs text-zinc-400">{tx.date}</p>
                </div>
              </div>
              <p className={`font-semibold text-lg ${tx.type === "credit" ? "text-green-400" : "text-zinc-50"}`}>
                {tx.type === "credit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
              </p>
            </div>
          </button>
        ))}
      </div>

      {selectedTransaction && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
          <div className="w-full bg-zinc-900 rounded-t-2xl p-6 border-t border-zinc-800 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-zinc-50">Transaction Details</h3>
              <button onClick={() => setSelectedTransaction(null)} className="text-zinc-400 hover:text-zinc-50">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-zinc-800 rounded-lg p-4">
                <p className="text-sm text-zinc-400 mb-1">Amount</p>
                <p
                  className={`text-3xl font-bold ${selectedTransaction.type === "credit" ? "text-green-400" : "text-zinc-50"}`}
                >
                  {selectedTransaction.type === "credit" ? "+" : "-"}₦{selectedTransaction.amount.toLocaleString()}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-zinc-400 mb-1">Vendor</p>
                  <p className="text-sm font-medium text-zinc-50">{selectedTransaction.vendor}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 mb-1">Date & Time</p>
                  <p className="text-sm font-medium text-zinc-50">{selectedTransaction.date}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 mb-1">Category</p>
                  <p className="text-sm font-medium text-zinc-50 capitalize">{selectedTransaction.category}</p>
                </div>
                {selectedTransaction.transactionReference && (
                  <div>
                    <p className="text-xs text-zinc-400 mb-1">Reference</p>
                    <p className="text-sm font-mono text-zinc-50">{selectedTransaction.transactionReference}</p>
                  </div>
                )}
                {selectedTransaction.recipientName && (
                  <>
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Recipient Name</p>
                      <p className="text-sm font-medium text-zinc-50">{selectedTransaction.recipientName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Recipient Account</p>
                      <p className="text-sm font-mono text-zinc-50">{selectedTransaction.recipientAccount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 mb-1">Recipient Bank</p>
                      <p className="text-sm font-medium text-zinc-50">{selectedTransaction.recipientBank}</p>
                    </div>
                  </>
                )}
                <div>
                  <p className="text-xs text-zinc-400 mb-1">Status</p>
                  <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                    {selectedTransaction.status || "Completed"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
