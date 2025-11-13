"use client";

import { useState } from "react";
import { X, Plane, Gift, Copy, Check } from "lucide-react";

interface TravelRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: string;
  discount: string;
  promoCode: string;
  expiryDate: string;
}

export function TravelRewardModal({
  isOpen,
  onClose,
  partner,
  discount,
  promoCode,
  expiryDate,
}: TravelRewardModalProps) {
  const [copied, setCopied] = useState(false);
  const [claimed, setClaimed] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = () => {
    setClaimed(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      {!claimed ? (
        <div className="bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 rounded-3xl max-w-sm w-full overflow-hidden border border-blue-500/30 shadow-2xl animate-scale-in">
          <div className="relative p-8 text-center space-y-6">
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 text-2xl animate-bounce">
              ✈️
            </div>
            <div className="absolute top-4 right-4 text-2xl animate-bounce delay-100">
              🎁
            </div>
            <div className="absolute bottom-4 left-6 text-2xl animate-bounce delay-200">
              🌍
            </div>
            <div className="absolute bottom-4 right-6 text-2xl animate-bounce delay-300">
              ⭐
            </div>

            {/* Main content */}
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                <Plane size={40} className="text-white" strokeWidth={2.5} />
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">
                Flying Soon? 🎉
              </h2>

              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <p className="text-2xl font-bold text-white">{discount} OFF</p>
              </div>

              <p className="text-lg text-blue-100 leading-relaxed mb-6">
                As a valued customer, you've unlocked an exclusive travel
                discount from our partner{" "}
                <span className="font-bold text-white">{partner}</span>!
              </p>

              {/* Promo Code */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 space-y-3">
                <p className="text-xs text-blue-200 uppercase tracking-wider">
                  Your Promo Code
                </p>
                <div className="flex items-center justify-center gap-3">
                  <code className="text-2xl font-bold text-white tracking-wider">
                    {promoCode}
                  </code>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors active:scale-95"
                    title="Copy code"
                  >
                    {copied ? (
                      <Check size={20} className="text-green-300" />
                    ) : (
                      <Copy size={20} className="text-white" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-blue-200">
                  Valid until {new Date(expiryDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 relative z-10">
              <button
                onClick={handleClaim}
                className="w-full py-4 bg-white hover:bg-gray-100 text-blue-900 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                <Gift size={20} />
                Claim Voucher
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
      ) : (
        // Success screen
        <div className="bg-zinc-900 rounded-3xl max-w-sm w-full p-8 text-center space-y-6 border border-zinc-800 animate-scale-in">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
              <Check size={32} className="text-white" strokeWidth={3} />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-zinc-50">
              Voucher Claimed! ✈️
            </h3>
            <p className="text-sm text-zinc-400">
              Your {discount} discount has been saved to your rewards wallet.
              Bon voyage!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
