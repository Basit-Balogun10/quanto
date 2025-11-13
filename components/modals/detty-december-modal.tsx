"use client";

import { useState } from "react";
import { X, Check, Sparkles } from "lucide-react";

interface DettyDecemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate?: () => void;
  trackerTypes: string[];
  isInitialPopup?: boolean; // True for the enticing popup after transfer
}

export function DettyDecemberModal({
  isOpen,
  onClose,
  onActivate,
  trackerTypes,
  isInitialPopup = false,
}: DettyDecemberModalProps) {
  const [selectedTracker, setSelectedTracker] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showTrackerSelection, setShowTrackerSelection] = useState(false);

  if (!isOpen) return null;

  // Initial popup - just enticing message
  if (isInitialPopup && !showTrackerSelection) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 rounded-3xl max-w-sm w-full overflow-hidden border border-purple-500/30 shadow-2xl animate-scale-in">
          <div className="relative p-8 text-center space-y-6">
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 text-2xl animate-bounce">
              🎉
            </div>
            <div className="absolute top-4 right-4 text-2xl animate-bounce delay-100">
              ✨
            </div>
            <div className="absolute bottom-4 left-6 text-2xl animate-bounce delay-200">
              🎊
            </div>
            <div className="absolute bottom-4 right-6 text-2xl animate-bounce delay-300">
              🎈
            </div>

            {/* Main content */}
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                <Sparkles size={40} className="text-white" strokeWidth={2.5} />
              </div>

              <h2 className="text-3xl font-bold text-white mb-3">
                It's Detty December! 🎉
              </h2>

              <p className="text-lg text-purple-100 leading-relaxed">
                We noticed you're getting ready for the festivities! Before the
                duties take over, want to track your enjoyment vs. savings?
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 relative z-10">
              <button
                onClick={() => setShowTrackerSelection(true)}
                className="w-full py-4 bg-white hover:bg-gray-100 text-purple-900 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg"
              >
                Yes, let's balance it! ✨
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 text-white/80 hover:text-white font-medium transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const trackerDetails: Record<
    string,
    { description: string; icon: string; mockProgress: number }
  > = {
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
  };

  const handleActivate = () => {
    if (!selectedTracker) return;
    setShowConfirmation(true);

    // Call the onActivate callback to update the parent state
    if (onActivate) {
      onActivate();
    }

    setTimeout(() => {
      setShowConfirmation(false);
      onClose();
    }, 2000);
  };

  // Tracker selection screen
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center">
      <div className="bg-zinc-900 w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl overflow-hidden border border-zinc-800 max-h-[90vh] flex flex-col">
        {!showConfirmation ? (
          <>
            <div className="bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-red-900/50 border-b border-purple-800/50 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-zinc-50">
                Choose Your Tracker
              </h3>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-zinc-50"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <p className="text-sm text-zinc-300">
                Select a tracker to help you enjoy Detty December while staying
                on top of your finances.
              </p>

              <div className="space-y-3">
                {trackerTypes.map((trackerType) => {
                  const details = trackerDetails[trackerType];
                  const isSelected = selectedTracker === trackerType;

                  return (
                    <button
                      key={trackerType}
                      onClick={() => setSelectedTracker(trackerType)}
                      className={`w-full p-5 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                        isSelected
                          ? "border-purple-500 bg-purple-950/30 shadow-lg shadow-purple-500/20"
                          : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{details?.icon}</span>
                          <h4 className="font-semibold text-zinc-50 text-lg">
                            {trackerType}
                          </h4>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <Check
                              size={16}
                              className="text-white"
                              strokeWidth={3}
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 mb-4">
                        {details?.description}
                      </p>

                      {/* Mock progress bar preview */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-zinc-400">
                          <span>Spending this month</span>
                          <span className="font-semibold">
                            {details?.mockProgress}%
                          </span>
                        </div>
                        <div className="w-full bg-zinc-700 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 transition-all"
                            style={{ width: `${details?.mockProgress}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleActivate}
                disabled={!selectedTracker}
                className="w-full px-4 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg"
              >
                Activate Tracker
              </button>
            </div>
          </>
        ) : (
          <div className="px-6 py-12 text-center space-y-6">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                <Check size={32} className="text-white" strokeWidth={3} />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-zinc-50">
                Tracker Activated!
              </h3>
              <p className="text-sm text-zinc-400">
                Let's make Detty December guilt-free! 🎉
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
