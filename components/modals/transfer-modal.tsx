"use client";

import { useState } from "react";
import { X, ArrowLeft, Check, ChevronRight } from "lucide-react";
import { mockBeneficiaries } from "@/lib/mock-data";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransferComplete: (transfer: TransferData) => void;
  currentBalance: number;
  userName: string;
}

export interface TransferData {
  recipientName: string;
  recipientAccount: string;
  recipientBank: string;
  amount: number;
  narration: string;
  category: string;
}

type Step = "amount" | "recipient" | "pin" | "success";

const TRANSFER_PURPOSES = [
  { id: "general", label: "General", icon: "💰", color: "bg-zinc-700" },
  {
    id: "ticketing",
    label: "Event Ticket",
    icon: "🎫",
    color: "bg-purple-600",
  },
  { id: "concert", label: "Concert", icon: "🎵", color: "bg-pink-600" },
  {
    id: "entertainment",
    label: "Entertainment",
    icon: "🎉",
    color: "bg-red-600",
  },
  { id: "fun", label: "Fun & Leisure", icon: "🎊", color: "bg-orange-600" },
  { id: "travel", label: "Travel/Flight", icon: "✈️", color: "bg-blue-600" },
  { id: "food", label: "Food & Drinks", icon: "🍽️", color: "bg-yellow-600" },
  { id: "bills", label: "Bills", icon: "�", color: "bg-blue-600" },
];

export function TransferModal({
  isOpen,
  onClose,
  onTransferComplete,
  currentBalance,
  userName,
}: TransferModalProps) {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<
    (typeof mockBeneficiaries)[0] | null
  >(null);
  const [narration, setNarration] = useState("");
  const [category, setCategory] = useState("general");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [pinError, setPinError] = useState(false);

  if (!isOpen) return null;

  const handleAmountClick = (value: string) => {
    if (value === "clear") {
      setAmount("");
    } else if (value === "del") {
      setAmount(amount.slice(0, -1));
    } else {
      if (amount.length < 10) {
        // Prevent leading zeros except for decimal
        if (amount === "" && value === "0") return;
        setAmount(amount + value);
      }
    }
  };

  const handleContinueFromAmount = () => {
    const transferAmount = parseFloat(amount);
    if (transferAmount > 0 && transferAmount <= currentBalance) {
      setStep("recipient");
    }
  };

  const handleSelectRecipient = (
    beneficiary: (typeof mockBeneficiaries)[0]
  ) => {
    setSelectedRecipient(beneficiary);
    setStep("pin");
  };

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < 3) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        nextInput?.focus();
      }

      // Auto-submit when all 4 digits entered
      if (newPin.every((d) => d) && index === 3) {
        setTimeout(() => handlePinSubmit(newPin), 300);
      }
    }
  };

  const handlePinSubmit = (pinToSubmit = pin) => {
    const enteredPin = pinToSubmit.join("");
    if (enteredPin.length === 4) {
      setLoading(true);
      setTimeout(() => {
        if (selectedRecipient) {
          setStep("success");
          setLoading(false);

          setTimeout(() => {
            onTransferComplete({
              recipientName: selectedRecipient.name,
              recipientAccount: selectedRecipient.accountNumber,
              recipientBank: selectedRecipient.bank,
              amount: parseFloat(amount),
              narration,
              category,
            });
            handleReset();
            onClose();
          }, 2000);
        }
      }, 1000);
    }
  };

  const handleReset = () => {
    setStep("amount");
    setAmount("");
    setSelectedRecipient(null);
    setNarration("");
    setCategory("general");
    setPin(["", "", "", ""]);
    setPinError(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-end sm:items-center justify-center animate-fade-in">
      <div className="bg-[#0a0a0a] w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl overflow-hidden max-h-[95vh] flex flex-col shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl">
          {step !== "amount" && step !== "success" && (
            <button
              onClick={() => {
                if (step === "recipient") setStep("amount");
                if (step === "pin") setStep("recipient");
              }}
              className="text-zinc-400 hover:text-zinc-50 -ml-2 active:scale-95 transition-transform"
            >
              <ArrowLeft size={22} />
            </button>
          )}
          <h3 className="text-lg font-semibold text-zinc-50 flex-1 text-center">
            {step === "amount" && "Transfer Money"}
            {step === "recipient" && "Select Recipient"}
            {step === "pin" && "Confirm Transfer"}
            {step === "success" && "Transfer Complete"}
          </h3>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-zinc-50 -mr-2 active:scale-95 transition-transform"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Step 1: Amount Entry */}
          {step === "amount" && (
            <div className="p-5 space-y-5">
              {/* Amount Display */}
              <div className="text-center py-6">
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                  Amount
                </p>
                <div className="text-5xl font-bold text-zinc-50 mb-2 min-h-[60px] flex items-center justify-center">
                  ₦{amount || "0"}
                  <span className="animate-pulse ml-1">|</span>
                </div>
                <p className="text-xs text-zinc-500">
                  Available Balance: ₦{currentBalance.toLocaleString()}
                </p>
              </div>

              {/* Quick Amounts */}
              <div className="grid grid-cols-3 gap-2.5">
                {["1000", "5000", "10000"].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className="py-3.5 bg-zinc-800/80 hover:bg-zinc-800 active:scale-95 border border-zinc-700/50 rounded-xl text-sm font-semibold text-zinc-300 transition-all"
                  >
                    ₦{preset}
                  </button>
                ))}
              </div>

              {/* Number Pad */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  ".",
                  "0",
                  "⌫",
                ].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleAmountClick(num === "⌫" ? "del" : num)}
                    className="aspect-square bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 border border-zinc-800/50 rounded-xl text-2xl font-medium text-zinc-50 transition-all active:scale-95"
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Continue Button */}
              <button
                onClick={handleContinueFromAmount}
                disabled={
                  !amount ||
                  parseFloat(amount) <= 0 ||
                  parseFloat(amount) > currentBalance
                }
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-base transition-all shadow-lg shadow-blue-600/20"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Recipient Selection */}
          {step === "recipient" && (
            <div className="p-5 space-y-4">
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-800/30">
                <p className="text-xs text-zinc-400 mb-1">Transfer Amount</p>
                <p className="text-2xl font-bold text-zinc-50">
                  ₦{parseFloat(amount).toLocaleString()}
                </p>
              </div>

              {/* Purpose */}
              <div>
                <p className="text-sm font-semibold text-zinc-300 mb-3">
                  What's this for?
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {TRANSFER_PURPOSES.map((purpose) => (
                    <button
                      key={purpose.id}
                      onClick={() => setCategory(purpose.id)}
                      className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all active:scale-95 ${
                        category === purpose.id
                          ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                          : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                      }`}
                    >
                      <span className="text-xl">{purpose.icon}</span>
                      <span className="text-[9px] text-zinc-300 text-center leading-tight font-medium">
                        {purpose.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Narration */}
              <div>
                <p className="text-sm font-semibold text-zinc-300 mb-2">
                  Add a note (optional)
                </p>
                <input
                  type="text"
                  value={narration}
                  onChange={(e) => setNarration(e.target.value.slice(0, 50))}
                  placeholder="e.g., Concert ticket"
                  className="w-full px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Beneficiaries */}
              <div>
                <p className="text-sm font-semibold text-zinc-300 mb-3">
                  Select recipient
                </p>
                <div className="space-y-2 max-h-[340px] overflow-y-auto">
                  {mockBeneficiaries.map((beneficiary) => (
                    <button
                      key={beneficiary.id}
                      onClick={() => handleSelectRecipient(beneficiary)}
                      className="w-full flex items-center gap-3 p-3.5 bg-zinc-900/80 hover:bg-zinc-800 active:scale-[0.98] border border-zinc-800/50 hover:border-zinc-700 rounded-xl transition-all group"
                    >
                      <img
                        src={beneficiary.avatar}
                        alt={beneficiary.name}
                        className="w-11 h-11 rounded-full bg-zinc-800 border border-zinc-700"
                      />
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-zinc-50 text-sm">
                          {beneficiary.name}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {beneficiary.bank} • {beneficiary.accountNumber}
                        </p>
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-zinc-600 group-hover:text-zinc-400 transition-colors"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: PIN Entry */}
          {step === "pin" && selectedRecipient && (
            <div className="p-6 space-y-6">
              {/* Transaction Summary */}
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedRecipient.avatar}
                    alt={selectedRecipient.name}
                    className="w-14 h-14 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-zinc-50">
                      {selectedRecipient.name}
                    </p>
                    <p className="text-sm text-zinc-400">
                      {selectedRecipient.bank}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-sm text-zinc-400 mb-1">You're sending</p>
                  <p className="text-3xl font-bold text-zinc-50">
                    ₦{parseFloat(amount).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* PIN Input */}
              <div className="text-center">
                <p className="text-sm text-zinc-400 mb-6">
                  Enter your transaction PIN
                </p>
                <div className="flex justify-center gap-4 mb-6">
                  {pin.map((digit, index) => (
                    <input
                      key={index}
                      id={`pin-${index}`}
                      type="password"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handlePinChange(index, e.target.value)}
                      maxLength={1}
                      className={`w-14 h-14 text-center text-2xl bg-zinc-900 border-2 rounded-xl text-zinc-50 focus:outline-none focus:border-blue-500 transition-colors ${
                        pinError
                          ? "border-red-500 animate-shake"
                          : "border-zinc-700"
                      }`}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                {pinError && (
                  <p className="text-sm text-red-400 mb-4">
                    Incorrect PIN. Please try again.
                  </p>
                )}

                {loading && (
                  <div className="flex items-center justify-center gap-2 text-blue-400">
                    <div className="animate-spin h-5 w-5 border-2 border-blue-400 border-t-transparent rounded-full" />
                    <span className="text-sm">Processing...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === "success" && selectedRecipient && (
            <div className="p-6 py-12 text-center space-y-6">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                  <Check size={48} className="text-white" strokeWidth={3} />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-zinc-50">
                  Transfer Successful!
                </h3>
                <p className="text-zinc-400">
                  ₦{parseFloat(amount).toLocaleString()} sent to{" "}
                  {selectedRecipient.name}
                </p>
              </div>
              <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Recipient</span>
                  <span className="text-zinc-50 font-medium">
                    {selectedRecipient.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Bank</span>
                  <span className="text-zinc-50 font-medium">
                    {selectedRecipient.bank}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Amount</span>
                  <span className="text-zinc-50 font-medium">
                    ₦{parseFloat(amount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
