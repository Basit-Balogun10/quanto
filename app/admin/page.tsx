"use client"

import { useState } from "react"
import { defaultAdminControls } from "@/lib/mock-data"
import { Plus, Trash2 } from "lucide-react"
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

type AdminTab = "categories" | "rules" | "insights"

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState<AdminTab>("categories")
  const [controls, setControls] = useState(defaultAdminControls)

  const toggleCategory = (category: string) => {
    setControls((prev) => ({
      ...prev,
      enabledCategories: {
        ...prev.enabledCategories,
        [category]: !prev.enabledCategories[category as keyof typeof prev.enabledCategories],
      },
    }))
  }

  const toggleRule = (ruleId: string) => {
    setControls((prev) => ({
      ...prev,
      rules: prev.rules.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)),
    }))
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Removed back button */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-zinc-50">Quanto Admin</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage AI response categories, rules, and insights</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-zinc-800">
          {[
            { id: "categories" as AdminTab, label: "Categories" },
            { id: "rules" as AdminTab, label: "Rules" },
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

        {/* Rules Tab */}
        {currentTab === "rules" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-zinc-50">Custom Rules</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                <Plus size={18} />
                Add Rule
              </button>
            </div>

            {controls.rules.map((rule) => (
              <div key={rule.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-lg font-semibold text-zinc-50">{rule.name}</p>
                    <p className="text-sm text-zinc-400 mt-1 font-mono">{rule.trigger}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleRule(rule.id)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        rule.enabled ? "bg-blue-600" : "bg-zinc-700"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          rule.enabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <button className="p-2 text-zinc-400 hover:text-red-400 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <p className="text-sm text-zinc-300">"{rule.message}"</p>
                </div>
                <div className="mt-3 text-xs text-zinc-500">
                  <span className="inline-block px-2 py-1 bg-zinc-800 rounded">{rule.category.toUpperCase()}</span>
                </div>
              </div>
            ))}
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

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <p className="text-sm text-zinc-400 mb-2">Avg. User Engagement</p>
                <p className="text-3xl font-bold text-blue-400">79%</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <p className="text-sm text-zinc-400 mb-2">Total Rules Triggered (24h)</p>
                <p className="text-3xl font-bold text-green-400">1,207</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
