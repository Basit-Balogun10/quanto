"use client";

import { useState } from "react";
import { X, Check, Clock, ShieldCheck, TrendingDown } from "lucide-react";
import { SpendingTimeline } from "../quanto/spending-timeline";

interface CooloffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate?: () => void;
  spendingPercentage: number;
  cooloffHours: number;
  flowData?: {
    salaryAmount?: number;
    spent3Days?: number;
    remaining?: number;
    paydayDate?: string;
    daysElapsed?: number;
    breakdown?: Array<{
      day: number;
      date: string;
      amount: number;
      description: string;
    }>;
    largestPurchase?: {
      vendor: string;
      amount: number;
      date: string;
    };
  };
}

export function CooloffModal({
  isOpen,
  onClose,
  onActivate,
  spendingPercentage,
  cooloffHours,
  flowData,
}: CooloffModalProps) {
  const [step, setStep] = useState<"overview" | "timeline" | "confirmation">(
    "overview"
  );
  const [autoReminder, setAutoReminder] = useState(true);

  if (!isOpen) return null;

  const handleActivate = () => {
    setStep("confirmation");
    setTimeout(() => {
      if (onActivate) onActivate();
      setTimeout(() => {
        setStep("overview");
        onClose();
      }, 2000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-zinc-900 w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto animate-slide-up border border-zinc-800">
        {/* Header */}
        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-zinc-50">Cool-off Period</h3>
            <p className="text-sm text-zinc-400">Protect your budget</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "overview" && (
            <div className="space-y-6">
              {/* Alert Banner */}
              <div className="bg-red-950 border border-red-900 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-100 mb-1">
                      Rapid Spending Detected
                    </p>
                    <p className="text-sm text-red-200">
                      You've spent {spendingPercentage}% of your salary in just
                      3 days
                    </p>
                  </div>
                </div>
              </div>

              {/* What is Cool-off */}
              <div>
                <h4 className="font-semibold text-zinc-50 mb-3">
                  What's a Cool-off Period?
                </h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-50">24-hour pause</p>
                      <p className="text-sm text-zinc-400">
                        Before making purchases over ₦50,000, you'll get a
                        gentle reminder to wait 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-50">
                        Impulse protection
                      </p>
                      <p className="text-sm text-zinc-400">
                        Helps you avoid rushed decisions and stick to your
                        budget
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-purple-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🎯</span>
                    </div>
                    <div>
                      <p className="font-medium text-zinc-50">
                        You're still in control
                      </p>
                      <p className="text-sm text-zinc-400">
                        This is a nudge, not a block. You can turn it off
                        anytime
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto-reminder toggle */}
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoReminder}
                    onChange={(e) => setAutoReminder(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-600 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900"
                  />
                  <span className="text-sm text-zinc-300">
                    Enable auto-reminders for big purchases
                  </span>
                </label>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => setStep("timeline")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-semibold transition-colors"
                >
                  View Spending Breakdown
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl py-4 font-semibold transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          )}

          {step === "timeline" && flowData && (
            <div className="space-y-6">
              <SpendingTimeline
                salaryAmount={flowData.salaryAmount || 150000}
                spent3Days={flowData.spent3Days || 90000}
                spendingPercentage={spendingPercentage}
                paydayDate={flowData.paydayDate || "2025-11-10"}
                breakdown={flowData.breakdown || []}
                largestPurchase={
                  flowData.largestPurchase || {
                    vendor: "Unknown",
                    amount: 0,
                    date: "N/A",
                  }
                }
              />

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={handleActivate}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-4 font-semibold transition-all transform active:scale-95"
                >
                  Yes, Activate Cool-off ✨
                </button>
                <button
                  onClick={() => setStep("overview")}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl py-4 font-semibold transition-colors"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {step === "confirmation" && (
            <div className="py-12 text-center">
              <div className="w-20 h-20 bg-green-900/30 border-2 border-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <Check className="w-10 h-10 text-green-400" />
              </div>
              <h4 className="text-2xl font-bold text-zinc-50 mb-2">
                Cool-off Activated!
              </h4>
              <p className="text-zinc-400">
                We'll nudge you before big purchases for the next 24 hours
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
