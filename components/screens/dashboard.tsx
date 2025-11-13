"use client";

import type { Persona, QuantoInsight, Campaign } from "@/lib/types";
import { ChevronRight, Eye, EyeOff, Send, Zap, Gift, TrendingUp, X } from "lucide-react";
import { useState, useEffect } from "react";
import { QuantoCard } from "@/components/quanto/quanto-card";
import { quickActions } from "@/lib/mock-data";
import {
  TransferModal,
  type TransferData,
} from "@/components/modals/transfer-modal";
import { DettyDecemberModal } from "@/components/modals/detty-december-modal";
import { TravelRewardModal } from "@/components/modals/travel-reward-modal";
import { CooloffModal } from "@/components/modals/cooloff-modal";

interface DashboardScreenProps {
  persona: Persona;
}

export function DashboardScreen({ persona }: DashboardScreenProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [currentPersona, setCurrentPersona] = useState(persona);
  const [showDettyModal, setShowDettyModal] = useState(false);
  const [showDettyCard, setShowDettyCard] = useState(false);
  const [showTravelRewardModal, setShowTravelRewardModal] = useState(false);
  const [showTravelRewardCard, setShowTravelRewardCard] = useState(false);
  const [showCooloffModal, setShowCooloffModal] = useState(false);
  const [cooloffFlowData, setCooloffFlowData] = useState<any>(null);
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [dismissedCampaigns, setDismissedCampaigns] = useState<string[]>([]);

  // Load campaigns from localStorage and filter for this user
  useEffect(() => {
    const loadCampaigns = () => {
      const savedCampaigns = JSON.parse(localStorage.getItem("quantoCampaigns") || "[]");
      const userQualifiedCampaigns = savedCampaigns.filter((campaign: Campaign) => 
        campaign.enabled && 
        campaign.qualifiedUserIds?.includes(currentPersona.id) &&
        !dismissedCampaigns.includes(campaign.id)
      );
      setActiveCampaigns(userQualifiedCampaigns);
    };

    loadCampaigns();

    // Poll for campaign updates every 2 seconds
    const interval = setInterval(loadCampaigns, 2000);

    return () => clearInterval(interval);
  }, [currentPersona.id, dismissedCampaigns]);

  const handleDismissCampaign = (campaignId: string) => {
    setDismissedCampaigns(prev => [...prev, campaignId]);
  };

  // Filter out the detty december insight and travel reward from regular display initially
  let displayInsights = currentPersona.quantoResponses;

  if (!showDettyCard) {
    displayInsights = displayInsights.filter(
      (r) => r.flowType !== "detty_december"
    );
  }

  if (!showTravelRewardCard) {
    displayInsights = displayInsights.filter(
      (r) => r.flowType !== "travel_reward"
    );
  }

  const topInsight = displayInsights[0];

  const handleTransferComplete = (transferData: TransferData) => {
    // Update persona balance
    const newBalance = currentPersona.balance - transferData.amount;

    // Check if transfer is fun-related and trigger detty december
    const funCategories = ["ticketing", "concert", "entertainment", "fun"];
    const isFunTransfer = funCategories.includes(transferData.category);

    // Check if transfer is travel-related for Ngozi (any flight/travel purchase triggers Air Peace voucher)
    const isFlightPurchase = transferData.category === "travel";

    // Add transfer to transactions
    const newTransaction = {
      id: `tx_${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      vendor: transferData.recipientName,
      amount: transferData.amount,
      category: transferData.category,
      type: "debit" as const,
      icon: "➡️",
      narrationTag: transferData.narration,
      recipientName: transferData.recipientName,
      recipientAccount: transferData.recipientAccount,
      recipientBank: transferData.recipientBank,
      status: "completed" as const,
    };

    const updatedPersona = {
      ...currentPersona,
      balance: newBalance,
      currentSpend: currentPersona.currentSpend + transferData.amount,
      transactions: [newTransaction, ...currentPersona.transactions],
      hasDettyDecemberTrigger:
        currentPersona.id === "user_raymond_9q3r" &&
        currentPersona.month === 12 &&
        isFunTransfer
          ? true
          : currentPersona.hasDettyDecemberTrigger,
      recentFunTransfers:
        isFunTransfer && currentPersona.recentFunTransfers
          ? [...currentPersona.recentFunTransfers, transferData.category]
          : currentPersona.recentFunTransfers,
      recentFlightPurchase:
        currentPersona.id === "user_ngozi_8m5n" && isFlightPurchase
          ? true
          : currentPersona.recentFlightPurchase,
    };

    setCurrentPersona(updatedPersona);

    // Check if Tolu crosses 60% spending threshold after this transfer
    if (
      currentPersona.id === "user_tolu_6x2k" &&
      currentPersona.lastSalaryAmount
    ) {
      const newSpendingSincePayday =
        currentPersona.currentSpend + transferData.amount;
      const spendingPercentage =
        (newSpendingSincePayday / currentPersona.lastSalaryAmount) * 100;
      const previousPercentage =
        (currentPersona.currentSpend / currentPersona.lastSalaryAmount) * 100;

      // Trigger if we just crossed the 60% threshold
      if (previousPercentage < 60 && spendingPercentage >= 60) {
        // Calculate days since payday
        const payday = new Date(currentPersona.lastSalaryDate || Date.now());
        const today = new Date();
        const daysElapsed = Math.ceil(
          (today.getTime() - payday.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Prepare flow data for the modal
        const flowData = {
          cooloffHours: 24,
          spendingPercentage: Math.round(spendingPercentage),
          salaryAmount: currentPersona.lastSalaryAmount,
          spent3Days: newSpendingSincePayday,
          remaining: currentPersona.lastSalaryAmount - newSpendingSincePayday,
          paydayDate: currentPersona.lastSalaryDate,
          daysElapsed,
          averageDailySpend: Math.round(newSpendingSincePayday / daysElapsed),
          breakdown: [
            {
              day: 1,
              date: "Nov 10",
              amount: 30200,
              description: "Payday celebrations",
            },
            {
              day: 2,
              date: "Nov 11",
              amount: 49900,
              description: "Business investments",
            },
            {
              day: 3,
              date: "Nov 12",
              amount: 32900,
              description: "Equipment & utilities",
            },
          ],
          largestPurchase: {
            vendor: "Camera Equipment Store",
            amount: 25000,
            date: "2025-11-11",
          },
        };

        setCooloffFlowData(flowData);

        // Show cool-off modal immediately after transfer
        setTimeout(() => {
          setShowCooloffModal(true);
        }, 500);
      }
    }

    // Show Detty December modal if triggered for Raymond
    if (
      currentPersona.id === "user_raymond_9q3r" &&
      currentPersona.month === 12 &&
      isFunTransfer
    ) {
      setTimeout(() => {
        setShowDettyModal(true);
      }, 500);
    }

    // Show Air Peace Travel Reward modal if triggered for Ngozi (any flight purchase)
    if (currentPersona.id === "user_ngozi_8m5n" && isFlightPurchase) {
      setTimeout(() => {
        setShowTravelRewardModal(true);
      }, 500);
    }
  };

  const handleDettyModalClose = () => {
    setShowDettyModal(false);
    // Show the detty december card on dashboard after modal closes
    if (
      currentPersona.id === "user_raymond_9q3r" &&
      currentPersona.month === 12 &&
      currentPersona.hasDettyDecemberTrigger
    ) {
      setShowDettyCard(true);
    }
  };

  const handleDettyActivate = () => {
    // Update the persona with activated feature
    const updatedPersona = {
      ...currentPersona,
      activatedFeatures: {
        ...currentPersona.activatedFeatures,
        dettyDecemberTracker: true,
      },
    };
    setCurrentPersona(updatedPersona);
  };

  const handleTravelRewardModalClose = () => {
    setShowTravelRewardModal(false);
    // Add the travel reward insight to Ngozi's dashboard after claiming
    if (
      currentPersona.id === "user_ngozi_8m5n" &&
      currentPersona.recentFlightPurchase
    ) {
      const travelRewardInsight: QuantoInsight = {
        id: "insight_travel_reward",
        title: "Travel Discount Voucher",
        message:
          "Your 15% off voucher from Air Peace is ready! Use code AIRPEACE15 when booking your next flight.",
        category: "reward",
        actionLabel: "View Voucher",
        priority: "high",
        timestamp: new Date().toISOString(),
        read: false,
        flowType: "travel_reward",
        flowData: {
          partner: "Air Peace Airlines",
          discount: "15%",
          promoCode: "AIRPEACE15",
          expiryDate: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(), // 30 days from now
        },
      };

      const updatedPersona: Persona = {
        ...currentPersona,
        quantoResponses: [
          travelRewardInsight,
          ...currentPersona.quantoResponses,
        ],
        activatedFeatures: {
          ...currentPersona.activatedFeatures,
          travelReward: true,
        },
      };

      setCurrentPersona(updatedPersona);
      setShowTravelRewardCard(true);
    }
  };

  const handleCooloffActivate = () => {
    // Update the persona with activated cooloff feature
    const updatedPersona = {
      ...currentPersona,
      activatedFeatures: {
        ...currentPersona.activatedFeatures,
        cooloffPeriod: true,
      },
    };
    setCurrentPersona(updatedPersona);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm opacity-75">Account Balance</p>
              <h2 className="text-4xl font-bold">
                {showBalance
                  ? `₦${currentPersona.balance.toLocaleString()}`
                  : "••••••"}
              </h2>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white/70 hover:text-white"
            >
              {showBalance ? <Eye size={24} /> : <EyeOff size={24} />}
            </button>
          </div>

          {/* Action Buttons - Consolidated */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowTransferModal(true)}
              className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-3 rounded-xl font-medium transition-all"
            >
              <Send size={18} />
              Send Money
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-3 rounded-xl font-medium transition-all">
              <Zap size={18} />
              Quick Pay
            </button>
          </div>
        </div>
      </div>

      {/* Campaign Banners */}
      {activeCampaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="relative bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-6 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <button
              onClick={() => handleDismissCampaign(campaign.id)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-zinc-800/80 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-zinc-400" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">{campaign.name}</h3>
                <p className="text-sm text-zinc-300 mb-4">{campaign.message}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-xs">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-zinc-400">
                      <span className="text-green-400 font-semibold">{campaign.reward.value}%</span> {campaign.reward.type}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500">
                    • {campaign.reward.description}
                  </div>
                </div>

                <button className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/20">
                  Claim Reward
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Quick Actions Grid */}
      <div>
        <p className="text-xs font-semibold text-zinc-400 mb-3">
          Quick Actions
        </p>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:border-zinc-700"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium text-zinc-300 text-center">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quanto Insight Card */}
      {topInsight && (
        <QuantoCard
          title={topInsight.title}
          message={topInsight.message}
          category={topInsight.category}
          actionLabel={topInsight.actionLabel}
          priority={topInsight.priority}
          flowType={topInsight.flowType}
          flowData={topInsight.flowData}
          isActivated={
            topInsight.flowType === "detty_december"
              ? currentPersona.activatedFeatures?.dettyDecemberTracker
              : topInsight.flowType === "spending_cooloff"
              ? currentPersona.activatedFeatures?.cooloffPeriod
              : topInsight.flowType === "salary_delay"
              ? currentPersona.activatedFeatures?.salaryDelaySupport
              : topInsight.flowType === "travel_reward"
              ? currentPersona.activatedFeatures?.travelReward
              : false
          }
        />
      )}

      {/* Spending Overview */}
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <h3 className="font-semibold text-zinc-50 mb-4">
          This Month's Spending
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-400">Current Spend</span>
              <span className="text-zinc-50 font-semibold">
                ₦{currentPersona.currentSpend.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    (currentPersona.currentSpend /
                      currentPersona.usualMonthlySpend) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-zinc-400">
            <span>
              Usual Monthly: ₦
              {currentPersona.usualMonthlySpend.toLocaleString()}
            </span>
            <span>
              {Math.round(
                (currentPersona.currentSpend /
                  currentPersona.usualMonthlySpend) *
                  100
              )}
              % of usual
            </span>
          </div>
        </div>
      </div>

      {/* Recent Transactions Preview */}
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-zinc-50">Recent Activity</h3>
          <button className="text-blue-400 text-sm font-medium flex items-center gap-1">
            View all
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {currentPersona.transactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xl">{tx.icon}</div>
                <div>
                  <p className="text-sm font-medium text-zinc-50">
                    {tx.vendor}
                  </p>
                  <p className="text-xs text-zinc-400">{tx.date}</p>
                </div>
              </div>
              <p
                className={`font-semibold ${
                  tx.type === "credit" ? "text-green-400" : "text-zinc-50"
                }`}
              >
                {tx.type === "credit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Transfer Modal */}
      <TransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        onTransferComplete={handleTransferComplete}
        currentBalance={currentPersona.balance}
        userName={currentPersona.name}
      />

      {/* Detty December Modal - Shows after fun transfer */}
      <DettyDecemberModal
        isOpen={showDettyModal}
        onClose={handleDettyModalClose}
        onActivate={handleDettyActivate}
        trackerTypes={[
          "Entertainment vs. Savings Tracker",
          "Food & Drinks Tracker",
        ]}
        isInitialPopup={true}
      />

      {/* Travel Reward Modal - Shows after flight purchase for Ngozi */}
      <TravelRewardModal
        isOpen={showTravelRewardModal}
        onClose={handleTravelRewardModalClose}
        partner="Air Peace Airlines"
        discount="15%"
        promoCode="AIRPEACE15"
        expiryDate={new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString()}
      />

      {/* Cool-off Modal - Shows when Tolu crosses 60% spending threshold */}
      {cooloffFlowData && (
        <CooloffModal
          isOpen={showCooloffModal}
          onClose={() => setShowCooloffModal(false)}
          onActivate={handleCooloffActivate}
          spendingPercentage={cooloffFlowData.spendingPercentage}
          cooloffHours={cooloffFlowData.cooloffHours}
          flowData={cooloffFlowData}
        />
      )}
    </div>
  );
}
