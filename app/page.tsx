"use client"

import { useState, useMemo } from "react"
import { DashboardScreen } from "@/components/screens/dashboard"
import { CardsScreen } from "@/components/screens/cards"
import { TransactionsScreen } from "@/components/screens/transactions"
import { InsightsScreen } from "@/components/screens/insights"
import { SettingsScreen } from "@/components/screens/settings"
import { BottomNav } from "@/components/nav/bottom-nav"
import { Header } from "@/components/nav/header"

type Screen = "dashboard" | "cards" | "transactions" | "insights" | "settings"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard")
  const [unreadInsights, setUnreadInsights] = useState(2)

  const screenContent = useMemo(() => {
    switch (currentScreen) {
      case "dashboard":
        return <DashboardScreen />
      case "cards":
        return <CardsScreen />
      case "transactions":
        return <TransactionsScreen />
      case "insights":
        return <InsightsScreen onMarkAllRead={() => setUnreadInsights(0)} />
      case "settings":
        return <SettingsScreen />
      default:
        return null
    }
  }, [currentScreen])

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      <main className="px-4 py-6">{screenContent}</main>
      <BottomNav currentScreen={currentScreen} onScreenChange={setCurrentScreen} unreadCount={unreadInsights} />
    </div>
  )
}
