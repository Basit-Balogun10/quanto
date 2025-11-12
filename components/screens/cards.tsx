"use client"

import { mockUser } from "@/lib/mock-data"
import { Lock, Copy, MoreHorizontal } from "lucide-react"

export function CardsScreen() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-50 mb-2">Payment Cards</h2>
        <p className="text-sm text-zinc-400">Manage your debit and credit cards</p>
      </div>

      <div className="space-y-4">
        {mockUser.cards.map((card) => (
          <div
            key={card.id}
            className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white relative overflow-hidden group`}
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-white/60 hover:text-white">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-xs opacity-75 mb-1">{card.type.charAt(0).toUpperCase() + card.type.slice(1)} Card</p>
                <h3 className="text-lg font-semibold">{card.cardholderName}</h3>
              </div>
              {card.isDefault && <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full">Default</span>}
            </div>

            <div className="mb-6">
              <p className="text-xs opacity-75 mb-1">Card Number</p>
              <p className="text-2xl font-mono tracking-widest">•••• •••• •••• {card.lastFour}</p>
            </div>

            <div className="flex justify-between text-xs">
              <div>
                <p className="opacity-75">Expires</p>
                <p className="font-mono">{card.expiry}</p>
              </div>
              <button className="flex items-center gap-1 opacity-75 hover:opacity-100 transition-opacity">
                <Copy size={14} />
                Copy
              </button>
            </div>

            {card.type === "debit" && <div className="absolute bottom-4 right-4 text-xl opacity-50">💳</div>}
          </div>
        ))}
      </div>

      <button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white py-3 rounded-lg font-medium transition-colors">
        + Add New Card
      </button>

      <div className="bg-blue-950 border border-blue-900 rounded-lg p-4 flex gap-3">
        <Lock size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-300">Card Security</p>
          <p className="text-xs text-blue-200/70 mt-1">
            All cards are encrypted with 256-bit security. Enable biometric authentication for added protection.
          </p>
        </div>
      </div>
    </div>
  )
}
