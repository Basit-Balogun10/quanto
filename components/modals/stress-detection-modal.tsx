"use client";

import { useState, useEffect, useRef } from "react";
import { X, AlertTriangle, Shield, CheckCircle, Activity } from "lucide-react";
import type { StressMetrics } from "@/lib/types";

interface StressDetectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFreeze: () => void;
  onContinue: () => void;
  transferAmount: number;
  recipientName: string;
  metrics: StressMetrics;
  responseTitle?: string;
  responseMessage?: string;
}

type Step = "analyzing" | "results" | "recommendation";

export function StressDetectionModal({
  isOpen,
  onClose,
  onFreeze,
  onContinue,
  transferAmount,
  recipientName,
  metrics,
  responseTitle,
  responseMessage,
}: StressDetectionModalProps) {
  const [step, setStep] = useState<Step>("analyzing");
  const [progress, setProgress] = useState(0);
  const hiddenFocusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setStep("analyzing");
      setProgress(0);
      return;
    }

    // Focus a hidden element to steal focus from any input (mitigate iOS Shake-to-Undo)
    try {
      setTimeout(() => {
        hiddenFocusRef.current?.focus();
      }, 50);
    } catch (err) {
      // ignore
    }

    // Simulate analyzing progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Move to results after analysis complete
          setTimeout(() => setStep("results"), 300);
          return 100;
        }
        return prev + 2; // 5 seconds total (100/2 * 100ms)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    // Auto-advance from results to recommendation after 2 seconds
    if (step === "results") {
      const timer = setTimeout(() => {
        setStep("recommendation");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (!isOpen) return null;

  // We no longer expose the numeric stress score in the UI — show a gentle Quanto response instead.
  const respostaTitle = responseTitle || "Security Check";
  const respostaMessage = responseMessage || "We detected unusual movement patterns; please review this transfer for your safety.";

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-zinc-900 w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl overflow-hidden border border-zinc-800 max-h-[90vh] flex flex-col animate-scale-in">
        {/* Hidden focus element to steal focus from inputs on open (mitigate iOS 'Shake to Undo') */}
        <div ref={hiddenFocusRef} tabIndex={-1} aria-hidden style={{ position: "absolute", left: -9999, width: 1, height: 1 }} />
        {/* Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-zinc-50">Security Check</h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-50 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Step 1: Analyzing */}
          {step === "analyzing" && (
            <div className="p-6 space-y-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-blue-900/30 border-2 border-blue-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Activity className="w-10 h-10 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-zinc-50 mb-2">
                    Analyzing Movement Patterns
                  </h4>
                  <p className="text-sm text-zinc-400">
                    Monitoring device sensors for stress indicators...
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Progress</span>
                  <span className="text-zinc-50 font-semibold">{progress}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <p className="text-sm text-center text-zinc-400">
                Monitoring device sensors for a brief window. Shake the phone if you feel pressured; we'll open a security check.
              </p>
            </div>
          )}

          {/* Step 2: Results */}
            {step === "results" && (
              <div className="p-6 space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 border-2 rounded-full flex items-center justify-center mx-auto text-amber-400 bg-amber-900/30">
                    <AlertTriangle className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-zinc-50 mb-2">{respostaTitle}</h4>
                    <p className="text-sm text-zinc-400">{respostaMessage}</p>
                  </div>
                </div>

                {/* Minimal explanation and CTA */}
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <p className="text-sm text-zinc-300">We've analyzed recent movement patterns and recommend taking a moment before proceeding.</p>
                </div>
              </div>
            )}

          {/* Step 3: Recommendation */}
          {step === "recommendation" && (
            <div className="p-6 space-y-6">
              <div className="bg-amber-950/50 border border-amber-900/50 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-amber-300 mb-2">
                      Unusual Stress Detected
                    </h4>
                    <p className="text-sm text-amber-200/80 leading-relaxed">
                      We detected elevated stress levels during this ₦
                      {transferAmount.toLocaleString()} transfer to {recipientName}.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-900/30 border border-amber-800/50 rounded-lg p-4">
                  <p className="text-sm text-amber-200 leading-relaxed">
                    <span className="font-semibold">Why this matters:</span> Stress
                    during large transfers can indicate pressure, coercion, or
                    uncertainty. Your safety is our priority.
                  </p>
                </div>
              </div>

              {/* Action Options */}
              <div className="space-y-3">
                <h5 className="text-sm font-semibold text-zinc-50">
                  What would you like to do?
                </h5>

                {/* Freeze Option */}
                <button
                  onClick={onFreeze}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold mb-1">
                        Freeze Account (15 minutes)
                      </div>
                      <div className="text-sm text-blue-100">
                        Take a break and review this transfer later
                      </div>
                    </div>
                  </div>
                </button>

                {/* Continue Option */}
                <button
                  onClick={onContinue}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-50 rounded-xl p-4 transition-all border border-zinc-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold mb-1">Continue Transfer</div>
                      <div className="text-sm text-zinc-400">
                        I understand the risks and want to proceed
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <p className="text-xs text-center text-zinc-500">
                Confidence: {Math.round(metrics.confidence)}% • Powered by MEMS sensors
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
