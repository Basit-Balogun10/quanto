"use client"

import { Bell, Lock, Eye, Globe, HelpCircle, LogOut, ChevronRight } from "lucide-react"
import { useState } from "react"

const settingsSections = [
  {
    title: "Notifications",
    items: [
      { label: "Transaction Alerts", icon: Bell, enabled: true },
      { label: "Quanto Insights", icon: Globe, enabled: true },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      { label: "Biometric Login", icon: Lock, enabled: true },
      { label: "Privacy Settings", icon: Eye, enabled: false },
    ],
  },
  {
    title: "About",
    items: [
      { label: "Help & Support", icon: HelpCircle, enabled: null },
      { label: "Terms & Conditions", icon: Globe, enabled: null },
    ],
  },
]

export function SettingsScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Transaction Alerts": true,
    "Quanto Insights": true,
    "Biometric Login": true,
    "Privacy Settings": false,
  })

  const handleToggle = (label: string) => {
    setToggles((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-50 mb-1">Settings</h2>
        <p className="text-sm text-zinc-400">Manage your preferences</p>
      </div>

      {settingsSections.map((section) => (
        <div key={section.title}>
          <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-3">{section.title}</h3>
          <div className="space-y-2">
            {section.items.map(({ label, icon: Icon, enabled }) => (
              <div
                key={label}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className="text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-50">{label}</span>
                </div>
                {enabled !== null && (
                  <button
                    onClick={() => handleToggle(label)}
                    className={`w-11 h-6 rounded-full transition-colors ${
                      toggles[label] ? "bg-blue-600" : "bg-zinc-700"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        toggles[label] ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                )}
                {enabled === null && <ChevronRight size={20} className="text-zinc-600" />}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button className="w-full flex items-center justify-center gap-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 py-3 rounded-lg font-medium transition-colors border border-red-900/50">
        <LogOut size={18} />
        Sign Out
      </button>
    </div>
  )
}
