"use client"

import { useState, useEffect } from "react"
import { defaultAdminControls, personas } from "@/lib/mock-data"
import { Plus, Trash2, Send, TrendingUp, TrendingDown, Users, DollarSign, Target, Eye, X } from "lucide-react"
import type { Campaign } from "@/lib/types"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

type AdminTab = "categories" | "campaigns" | "insights"

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState<AdminTab>("campaigns")
  const [controls, setControls] = useState(defaultAdminControls)
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    name: "",
    message: "",
    criteria: {
      type: "spending",
      operator: "greater_than",
      value: 0,
    },
    reward: {
      type: "cashback",
      value: 0,
      description: "",
    },
    enabled: true,
  })

  // Calculate qualified users for a campaign
  const calculateQualifiedUsers = (campaign: Partial<Campaign>) => {
    if (!campaign.criteria) return []
    
    const qualified = Object.values(personas).filter(persona => {
      switch (campaign.criteria!.type) {
        case "spending":
          if (campaign.criteria!.operator === "greater_than") {
            return persona.currentSpend >= campaign.criteria!.value
          }
          return false
        case "balance":
          if (campaign.criteria!.operator === "greater_than") {
            return persona.balance >= campaign.criteria!.value
          }
          return false
        default:
          return false
      }
    })
    
    return qualified
  }

  // Calculate campaign metrics
  const calculateCampaignMetrics = (campaign: Partial<Campaign>) => {
    if (!campaign.criteria?.value || !campaign.reward?.value) {
      return {
        qualifiedUsers: [],
        estimatedReach: 0,
        estimatedCost: 0,
      }
    }

    const qualifiedUsers = calculateQualifiedUsers(campaign)
    const estimatedReach = qualifiedUsers.length
    
    // Calculate estimated cost dynamically based on criteria and reward
    let estimatedCost = 0
    if (estimatedReach > 0) {
      if (campaign.reward?.type === "cashback" || campaign.reward?.type === "discount") {
        // For percentage-based rewards, calculate based on the actual criteria value
        // This represents the cost per user based on their spending/balance level
        estimatedCost = (campaign.criteria.value * (campaign.reward.value / 100)) * estimatedReach
      } else if (campaign.reward?.type === "freebie") {
        // For freebies, use reward value as flat cost per user
        estimatedCost = campaign.reward.value * estimatedReach
      }
    }
    
    return {
      qualifiedUsers,
      estimatedReach,
      estimatedCost,
    }
  }

  const toggleCategory = (category: string) => {
    setControls((prev) => ({
      ...prev,
      enabledCategories: {
        ...prev.enabledCategories,
        [category]: !prev.enabledCategories[category as keyof typeof prev.enabledCategories],
      },
    }))
  }

  const handleCreateCampaign = () => {
    const metrics = calculateCampaignMetrics(newCampaign)
    const campaign: Campaign = {
      id: `campaign_${Date.now()}`,
      name: newCampaign.name!,
      message: newCampaign.message!,
      criteria: newCampaign.criteria!,
      reward: newCampaign.reward!,
      enabled: true,
      createdAt: new Date().toISOString(),
      qualifiedUserIds: metrics.qualifiedUsers.map(u => u.id),
      estimatedReach: metrics.estimatedReach,
      estimatedCost: metrics.estimatedCost,
    }

    // Save to localStorage
    const existingCampaigns = JSON.parse(localStorage.getItem("quantoCampaigns") || "[]")
    localStorage.setItem("quantoCampaigns", JSON.stringify([...existingCampaigns, campaign]))

    setControls(prev => ({
      ...prev,
      campaigns: [...(prev.campaigns || []), campaign]
    }))

    setShowCampaignModal(false)
    setNewCampaign({
      name: "",
      message: "",
      criteria: {
        type: "spending",
        operator: "greater_than",
        value: undefined as any,
      },
      reward: {
        type: "cashback",
        value: undefined as any,
        description: "",
      },
      enabled: true,
    })
  }

  // Calculate current metrics for modal preview
  const currentMetrics = calculateCampaignMetrics(newCampaign)

  // Load campaigns from localStorage on mount
  useEffect(() => {
    const savedCampaigns = JSON.parse(localStorage.getItem("quantoCampaigns") || "[]")
    if (savedCampaigns.length > 0) {
      setControls(prev => ({
        ...prev,
        campaigns: savedCampaigns
      }))
    }
  }, [])

  const toggleCampaign = (campaignId: string) => {
    setControls(prev => {
      const updated = {
        ...prev,
        campaigns: prev.campaigns?.map(c => 
          c.id === campaignId ? { ...c, enabled: !c.enabled } : c
        )
      }
      // Save to localStorage
      localStorage.setItem("quantoCampaigns", JSON.stringify(updated.campaigns || []))
      return updated
    })
  }

  const deleteCampaign = (campaignId: string) => {
    setControls(prev => {
      const updated = {
        ...prev,
        campaigns: prev.campaigns?.filter(c => c.id !== campaignId)
      }
      // Save to localStorage
      localStorage.setItem("quantoCampaigns", JSON.stringify(updated.campaigns || []))
      return updated
    })
  }

  const engagementData = [
    { category: "Empathetic", engagement: 78, optIn: 82 },
    { category: "Preventive", engagement: 92, optIn: 95 },
    { category: "Reward", engagement: 85, optIn: 88 },
    { category: "Educational", engagement: 69, optIn: 72 },
    { category: "Ambient", engagement: 76, optIn: 80 },
  ]

  const rulesTriggeredData = [
    { time: "Mon", triggers: 234 },
    { time: "Tue", triggers: 289 },
    { time: "Wed", triggers: 198 },
    { time: "Thu", triggers: 256 },
    { time: "Fri", triggers: 301 },
    { time: "Sat", triggers: 187 },
    { time: "Sun", triggers: 142 },
  ]

  const campaignPerformanceData = [
    { time: "Mon", reach: 145, conversions: 87 },
    { time: "Tue", reach: 178, conversions: 112 },
    { time: "Wed", reach: 156, conversions: 98 },
    { time: "Thu", reach: 189, conversions: 125 },
    { time: "Fri", reach: 201, conversions: 143 },
    { time: "Sat", reach: 167, conversions: 104 },
    { time: "Sun", reach: 123, conversions: 79 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-zinc-50">Quanto Admin</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage AI response categories, marketing campaigns, and insights</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-zinc-800">
          {[
            { id: "categories" as AdminTab, label: "Categories" },
            { id: "campaigns" as AdminTab, label: "Campaigns" },
            { id: "insights" as AdminTab, label: "Insights" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                currentTab === tab.id
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-zinc-400 hover:text-zinc-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Categories Tab */}
        {currentTab === "categories" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-zinc-50 mb-6">Response Categories</h2>
            {Object.entries(controls.enabledCategories).map(([category, enabled]) => (
              <div
                key={category}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-semibold text-zinc-50 capitalize">{category}</p>
                  <p className="text-sm text-zinc-400 mt-2">
                    {category === "empathetic" && "Supportive messages for financial hardship"}
                    {category === "preventive" && "Alerts for unusual spending or risky behavior"}
                    {category === "reward" && "Celebrate achievements and milestones"}
                    {category === "educational" && "Financial literacy tips and best practices"}
                    {category === "ambient" && "Context-aware spending reminders"}
                  </p>
                </div>
                <button
                  onClick={() => toggleCategory(category)}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    enabled ? "bg-blue-600" : "bg-zinc-700"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      enabled ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Campaigns Tab */}
        {currentTab === "campaigns" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-50">Marketing Campaigns</h2>
                <p className="text-sm text-zinc-400 mt-1">Create targeted campaigns based on user behavior and spending patterns</p>
              </div>
              <button 
                onClick={() => setShowCampaignModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20"
              >
                <Plus size={18} />
                Add Campaign
              </button>
            </div>

            {/* Campaign Cards */}
            {controls.campaigns && controls.campaigns.length > 0 ? (
              <div className="space-y-4">
                {controls.campaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-zinc-50">{campaign.name}</h3>
                          {campaign.enabled && (
                            <span className="text-xs px-2 py-1 bg-green-950/50 border border-green-900/50 text-green-400 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-zinc-400 mb-4">"{campaign.message}"</p>
                        
                        {/* Campaign Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-zinc-800/50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Users className="w-4 h-4 text-blue-400" />
                              <span className="text-xs text-zinc-400">Reach</span>
                            </div>
                            <p className="text-lg font-bold text-zinc-50">{campaign.estimatedReach}</p>
                            <p className="text-xs text-zinc-500">qualified users</p>
                          </div>
                          
                          <div className="bg-zinc-800/50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <DollarSign className="w-4 h-4 text-amber-400" />
                              <span className="text-xs text-zinc-400">Est. Cost</span>
                            </div>
                            <p className="text-lg font-bold text-amber-400">₦{(campaign.estimatedCost || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                            <p className="text-xs text-zinc-500">per campaign</p>
                          </div>
                          
                          <div className="bg-zinc-800/50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Target className="w-4 h-4 text-purple-400" />
                              <span className="text-xs text-zinc-400">Reward</span>
                            </div>
                            <p className="text-lg font-bold text-purple-400">{campaign.reward.value}%</p>
                            <p className="text-xs text-zinc-500">{campaign.reward.type}</p>
                          </div>
                        </div>

                        {/* Criteria Display */}
                        <div className="bg-blue-950/30 border border-blue-900/30 rounded-lg p-3">
                          <p className="text-xs text-blue-300 font-medium mb-1">Campaign Criteria:</p>
                          <p className="text-sm text-zinc-300">
                            Users with <span className="font-semibold">{campaign.criteria.type}</span>{" "}
                            <span className="font-semibold">{campaign.criteria.operator.replace("_", " ")}</span>{" "}
                            <span className="font-semibold">₦{campaign.criteria.value.toLocaleString()}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => toggleCampaign(campaign.id)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            campaign.enabled ? "bg-blue-600" : "bg-zinc-700"
                          }`}
                        >
                          <div
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              campaign.enabled ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                        <button 
                          onClick={() => deleteCampaign(campaign.id)}
                          className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                <Target className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 mb-2">No campaigns yet</p>
                <p className="text-sm text-zinc-500">Create your first campaign to start targeting users</p>
              </div>
            )}
          </div>
        )}

        {/* Insights Tab - With Charts */}
        {currentTab === "insights" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-zinc-50 mb-6">Advanced Insights & Analytics</h2>

            {/* Engagement Chart */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-zinc-50 mb-4">Category Engagement</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="category" stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" />
                  <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a" }} />
                  <Legend />
                  <Bar dataKey="engagement" fill="#3b82f6" name="Engagement %" />
                  <Bar dataKey="optIn" fill="#10b981" name="Opt-in %" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Rules Triggered Chart */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-zinc-50 mb-4">Rules Triggered (7 Days)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={rulesTriggeredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="time" stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" />
                  <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a" }} />
                  <Line type="monotone" dataKey="triggers" stroke="#3b82f6" strokeWidth={2} name="Triggers" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Campaign Performance Chart */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-zinc-50 mb-4">Campaign Performance (7 Days)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={campaignPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="time" stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" />
                  <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a" }} />
                  <Legend />
                  <Line type="monotone" dataKey="reach" stroke="#3b82f6" strokeWidth={2} name="Reach" />
                  <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} name="Conversions" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <p className="text-sm text-zinc-400 mb-2">Avg. User Engagement</p>
                <p className="text-3xl font-bold text-blue-400">79%</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <p className="text-sm text-zinc-400 mb-2">Active Campaigns</p>
                <p className="text-3xl font-bold text-green-400">{controls.campaigns?.filter(c => c.enabled).length || 0}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Campaign Creation Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-zinc-50">Create Marketing Campaign</h3>
                <p className="text-sm text-zinc-400 mt-1">Target specific users with personalized offers</p>
              </div>
              <button
                onClick={() => setShowCampaignModal(false)}
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Campaign Name */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  placeholder="e.g., Premium Spenders Cashback"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Campaign Message */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Message to Users
                </label>
                <textarea
                  value={newCampaign.message}
                  onChange={(e) => setNewCampaign({ ...newCampaign, message: e.target.value })}
                  placeholder="e.g., You've spent over ₦400,000! Enjoy 10% cashback on your next purchase."
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Criteria Section */}
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Target Criteria
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-2">Criteria Type</label>
                    <select
                      value={newCampaign.criteria?.type}
                      onChange={(e) => setNewCampaign({
                        ...newCampaign,
                        criteria: { ...newCampaign.criteria!, type: e.target.value as any }
                      })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="spending">Total Spending</option>
                      <option value="balance">Account Balance</option>
                      <option value="transactions">Transaction Count</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-2">Operator</label>
                    <select
                      value={newCampaign.criteria?.operator}
                      onChange={(e) => setNewCampaign({
                        ...newCampaign,
                        criteria: { ...newCampaign.criteria!, operator: e.target.value as any }
                      })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="greater_than">Greater Than</option>
                      <option value="less_than">Less Than</option>
                      <option value="equals">Equals</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-2">Value (₦)</label>
                    <input
                      type="number"
                      value={newCampaign.criteria?.value || ""}
                      onChange={(e) => setNewCampaign({
                        ...newCampaign,
                        criteria: { ...newCampaign.criteria!, value: e.target.value ? Number(e.target.value) : undefined as any }
                      })}
                      placeholder="400000"
                      min="0"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Reward Section */}
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Reward Details
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-2">Reward Type</label>
                    <select
                      value={newCampaign.reward?.type}
                      onChange={(e) => setNewCampaign({
                        ...newCampaign,
                        reward: { ...newCampaign.reward!, type: e.target.value as any }
                      })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="cashback">Cashback</option>
                      <option value="discount">Discount</option>
                      <option value="freebie">Freebie</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-2">Percentage (%)</label>
                    <input
                      type="number"
                      value={newCampaign.reward?.value || ""}
                      onChange={(e) => setNewCampaign({
                        ...newCampaign,
                        reward: { ...newCampaign.reward!, value: e.target.value ? Number(e.target.value) : undefined as any }
                      })}
                      placeholder="10"
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-2">Description</label>
                    <input
                      type="text"
                      value={newCampaign.reward?.description}
                      onChange={(e) => setNewCampaign({
                        ...newCampaign,
                        reward: { ...newCampaign.reward!, description: e.target.value }
                      })}
                      placeholder="10% cashback"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Preview Section - Only show if criteria and reward are filled */}
              {newCampaign.criteria?.value && newCampaign.criteria.value > 0 && newCampaign.reward?.value && newCampaign.reward.value > 0 ? (
                <div className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-blue-300 mb-4 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Campaign Preview
                  </h4>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-zinc-900/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-zinc-400">Qualified Users</span>
                      </div>
                      <p className="text-2xl font-bold text-zinc-50">{currentMetrics.estimatedReach}</p>
                      {currentMetrics.estimatedReach > 0 && (
                        <div className="mt-2 text-xs text-zinc-500">
                          {currentMetrics.qualifiedUsers.slice(0, 3).map(u => u.name).join(", ")}
                          {currentMetrics.qualifiedUsers.length > 3 && ` +${currentMetrics.qualifiedUsers.length - 3} more`}
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-zinc-900/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-zinc-400">Estimated Cost</span>
                      </div>
                      <p className="text-2xl font-bold text-amber-400">
                        ₦{currentMetrics.estimatedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {newCampaign.reward.value}% of ₦{newCampaign.criteria.value.toLocaleString()} × {currentMetrics.estimatedReach} users
                      </p>
                    </div>
                    
                    <div className="bg-zinc-900/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-zinc-400">Reward Type</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-400">{newCampaign.reward.value}%</p>
                      <p className="text-xs text-zinc-500 mt-1 capitalize">{newCampaign.reward.type}</p>
                    </div>
                  </div>

                  {/* Info Message */}
                  {currentMetrics.estimatedReach > 0 ? (
                    <div className="flex items-start gap-3 bg-blue-950/30 border border-blue-900/30 rounded-lg p-4">
                      <TrendingUp className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-300 mb-1">Ready to Launch</p>
                        <p className="text-xs text-blue-400/80">
                          This campaign will reach {currentMetrics.estimatedReach} qualified user{currentMetrics.estimatedReach > 1 ? 's' : ''} with an estimated cost of ₦{currentMetrics.estimatedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}. Users will see this offer immediately on their dashboard and insights page.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 bg-amber-950/30 border border-amber-900/30 rounded-lg p-4">
                      <Target className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-amber-300 mb-1">No Qualified Users</p>
                        <p className="text-xs text-amber-400/80">
                          No users currently meet the criteria you've set. Try adjusting the spending threshold or criteria type.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center">
                  <Eye className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                  <p className="text-sm text-zinc-400 mb-1">Preview will appear here</p>
                  <p className="text-xs text-zinc-500">Fill in the criteria and reward details to see campaign metrics</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCampaignModal(false)}
                  className="flex-1 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCampaign}
                  disabled={!newCampaign.name || !newCampaign.message || currentMetrics.estimatedReach === 0}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Create & Launch Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
