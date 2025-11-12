"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"

interface CooloffModalProps {
  isOpen: boolean
  onClose: () => void
  spendingPercentage: number
  cooloffHours: number
}

export function CooloffModal({ isOpen, onClose, spendingPercentage, cooloffHours }: CooloffModalProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [autoReminder, setAutoReminder] = useState(true)

  if (!isOpen) return null

  const handleSetup = () => {
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
            <div className="bg-indigo-950/50 border-b border-indigo-900/50 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-50">24-Hour Cool-Off Mode</h3>
              <button onClick={onClose} className="text-zinc-400 hover:text-zinc-50">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <p className="text-sm text-zinc-300">
                  You've spent <span className="font-bold text-white">{spendingPercentage}%</span> of your salary within
                  3 days. This cool-off feature will help you make more mindful spending decisions.
                </p>

                <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-lg p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-indigo-300">What cool-off does:</h4>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      <span>Nudges you before purchases over ₦50,000</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      <span>Suggests waiting 24 hours for non-essential items</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      <span>Shows your spending breakdown daily</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      <span>Expires automatically in {cooloffHours} hours</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3 bg-zinc-800/50 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoReminder}
                    onChange={(e) => setAutoReminder(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-600 accent-indigo-600"
                  />
                  <span className="text-sm text-zinc-300">Enable auto-reminders for big purchases</span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-50 rounded-lg font-medium transition-colors"
                >
                  Not now
                </button>
                <button
                  onClick={handleSetup}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  Set it up
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
              <h3 className="text-lg font-bold text-zinc-50">Cool-off activated</h3>
              <p className="text-sm text-zinc-400">We'll nudge you if you try large spends within 24 hours.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
