"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"

interface DettyDecemberModalProps {
  isOpen: boolean
  onClose: () => void
  trackerTypes: string[]
}

export function DettyDecemberModal({ isOpen, onClose, trackerTypes }: DettyDecemberModalProps) {
  const [selectedTracker, setSelectedTracker] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  if (!isOpen) return null

  const trackerDetails: Record<string, { description: string; icon: string; mockProgress: number }> = {
    "Entertainment vs. Savings Tracker": {
      description: "Balance festive fun with savings goals",
      icon: "🎉",
      mockProgress: 35,
    },
    "Food & Drinks Tracker": {
      description: "Monitor dining and celebration expenses",
      icon: "🍾",
      mockProgress: 52,
    },
  }

  const handleActivate = () => {
    if (!selectedTracker) return
    setShowConfirmation(true)
    setTimeout(() => {
      setShowConfirmation(false)
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-2xl max-w-md w-full border border-zinc-800 overflow-hidden">
        {!showConfirmation ? (
          <>
            <div className="bg-violet-950/50 border-b border-violet-900/50 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-50">Detty December Tracker</h3>
              <button onClick={onClose} className="text-zinc-400 hover:text-zinc-50">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-sm text-zinc-300">
                Before the duties take over, choose a tracker to balance enjoyment and savings this December.
              </p>

              <div className="space-y-3">
                {trackerTypes.map((trackerType) => {
                  const details = trackerDetails[trackerType]
                  const isSelected = selectedTracker === trackerType

                  return (
                    <button
                      key={trackerType}
                      onClick={() => setSelectedTracker(trackerType)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? "border-violet-500 bg-violet-950/30"
                          : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{details?.icon}</span>
                          <h4 className="font-semibold text-zinc-50">{trackerType}</h4>
                        </div>
                        {isSelected && <Check size={20} className="text-violet-400 mt-1" />}
                      </div>
                      <p className="text-xs text-zinc-400 mb-3">{details?.description}</p>

                      {/* Mock progress bar preview */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-400">
                          <span>Spending this month</span>
                          <span>{details?.mockProgress}%</span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all"
                            style={{ width: `${details?.mockProgress}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-50 rounded-lg font-medium transition-colors"
                >
                  Ignore
                </button>
                <button
                  onClick={handleActivate}
                  disabled={!selectedTracker}
                  className="flex-1 px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  Activate tracker
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="px-6 py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Check size={32} className="text-green-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-zinc-50">Tracker activated</h3>
              <p className="text-sm text-zinc-400">Let's make Detty December guilt-free!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
