"use client"

import { AlertCircle, Gift, BookOpen, Eye, ChevronRight, X } from "lucide-react"
import type { Category } from "@/lib/types"
import { useState } from "react"
import { CooloffModal } from "@/components/modals/cooloff-modal"
import { DettyDecemberModal } from "@/components/modals/detty-december-modal"

interface QuantoCardProps {
  title: string
  message: string
  category: Category
  actionLabel: string
  priority: "high" | "medium" | "low"
  flowType?: string
  flowData?: Record<string, any>
}

export function QuantoCard({ title, message, category, actionLabel, priority, flowType, flowData }: QuantoCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [showCooloffModal, setShowCooloffModal] = useState(false)
  const [showDettyModal, setShowDettyModal] = useState(false)

  const categoryConfig: Record<Category, { icon: typeof AlertCircle; color: string; label: string }> = {
    empathetic: { icon: AlertCircle, color: "blue", label: "Support" },
    preventive: { icon: AlertCircle, color: "amber", label: "Alert" },
    reward: { icon: Gift, color: "emerald", label: "Reward" },
    educational: { icon: BookOpen, color: "indigo", label: "Learn" },
    ambient: { icon: Eye, color: "violet", label: "Tip" },
  }

  const config = categoryConfig[category]
  const Icon = config.icon

  const bgColors: Record<string, string> = {
    blue: "bg-blue-950 border-blue-900",
    amber: "bg-amber-950 border-amber-900",
    emerald: "bg-emerald-950 border-emerald-900",
    indigo: "bg-indigo-950 border-indigo-900",
    violet: "bg-violet-950 border-violet-900",
  }

  const textColors: Record<string, string> = {
    blue: "text-blue-400",
    amber: "text-amber-400",
    emerald: "text-emerald-400",
    indigo: "text-indigo-400",
    violet: "text-violet-400",
  }

  const priorityIndicator: Record<string, string> = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-zinc-500",
  }

  const handleAction = () => {
    if (flowType === "spending_cooloff") {
      setShowCooloffModal(true)
    } else if (flowType === "detty_december") {
      setShowDettyModal(true)
    } else {
      setShowModal(true)
    }
  }

  return (
    <>
      <div
        className={`${bgColors[config.color]} border rounded-lg p-4 flex gap-4 cursor-pointer hover:opacity-90 transition-opacity`}
        onClick={handleAction}
      >
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-lg bg-${config.color}-900/50 flex items-center justify-center`}>
            <Icon size={20} className={textColors[config.color]} />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <p className={`text-xs font-semibold ${textColors[config.color]} uppercase`}>{config.label}</p>
            <div className={`${priorityIndicator[priority]} w-2 h-2 rounded-full`} />
          </div>
          <h4 className="text-sm font-semibold text-zinc-50 mb-1">{title}</h4>
          <p className="text-xs text-zinc-300 mb-3">{message}</p>
          <button
            className={`text-xs font-medium ${textColors[config.color]} hover:opacity-80 transition-opacity flex items-center gap-1`}
          >
            {actionLabel}
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Generic modal for other flows */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-2xl max-w-md w-full p-6 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-50">{title}</h3>
              <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-zinc-50">
                <X size={24} />
              </button>
            </div>

            <div className="bg-zinc-800/50 rounded p-4 space-y-3 text-sm text-zinc-300">
              {flowType === "salary_delay" && (
                <>
                  <p className="text-zinc-50 font-semibold">24-Hour Fee Waiver Activated</p>
                  <p>
                    Your salary hasn't arrived on the expected date. We've waived all transaction fees for the next 24
                    hours to help you manage.
                  </p>
                  <div className="bg-zinc-700/50 rounded p-3 text-xs space-y-1">
                    <p>✓ Transfer fees: Waived</p>
                    <p>✓ ATM withdrawal fees: Waived</p>
                    <p>✓ Bill payment fees: Waived</p>
                  </div>
                </>
              )}

              {flowType === "subscription_warning" && (
                <>
                  <p className="text-zinc-50 font-semibold">Manage Your Subscriptions</p>
                  <p>
                    You have {flowData?.subscriptions || 3} subscriptions renewing on {flowData?.renewalDate}.
                  </p>
                  {flowData?.renewalDate && (
                    <div className="bg-zinc-700/50 rounded p-3 text-xs space-y-2">
                      <p className="text-zinc-400">Netflix • ₦2,400</p>
                      <p className="text-zinc-400">Apple Music • ₦1,800</p>
                      <p className="text-zinc-400">Canva Pro • ₦2,900</p>
                      <p className="font-semibold text-white pt-2">Total: ₦7,100</p>
                    </div>
                  )}
                  <p className="text-zinc-400">Toggle to pause subscriptions for this month.</p>
                </>
              )}

              {flowType === "reward_offer" && (
                <>
                  <p className="text-zinc-50 font-semibold">✈️ Exclusive Travel Offer</p>
                  <p>
                    Partner: <span className="font-semibold">{flowData?.partner}</span>
                  </p>
                  <p>
                    Get <span className="font-semibold text-green-400">{flowData?.discount} off</span> on your next
                    travel booking.
                  </p>
                  <div className="bg-zinc-700/50 rounded p-3 text-xs space-y-2">
                    <p>
                      Promo Code: <span className="font-mono font-semibold">{flowData?.promoCode}</span>
                    </p>
                    <p>Valid until: {flowData?.expiryDate}</p>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <CooloffModal
        isOpen={showCooloffModal}
        onClose={() => setShowCooloffModal(false)}
        spendingPercentage={flowData?.spendingPercentage || 60}
        cooloffHours={flowData?.cooloffHours || 24}
      />

      <DettyDecemberModal
        isOpen={showDettyModal}
        onClose={() => setShowDettyModal(false)}
        trackerTypes={flowData?.trackerTypes || []}
      />
    </>
  )
}
