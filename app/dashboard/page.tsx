"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardScreen } from "@/components/screens/dashboard";
import { CardsScreen } from "@/components/screens/cards";
import { TransactionsScreen } from "@/components/screens/transactions";
import { InsightsScreen } from "@/components/screens/insights";
import { SettingsScreen } from "@/components/screens/settings";
import { BottomNav } from "@/components/nav/bottom-nav";
import { Header } from "@/components/nav/header";
import { personas } from "@/lib/mock-data";

type Screen = "dashboard" | "cards" | "transactions" | "insights" | "settings";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user") || "user_ada_f4k9";

  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [unreadInsights, setUnreadInsights] = useState(2);

  const currentPersona = useMemo(() => {
    // Try direct lookup first (for UUID format)
    if (personas[userId as keyof typeof personas]) {
      return personas[userId as keyof typeof personas];
    }

    // Try to find by partial match (e.g., "ada" -> "user_ada_f4k9")
    const foundPersona = Object.values(personas).find((p) =>
      p.id.includes(userId.toLowerCase())
    );
    return foundPersona || personas.user_ada_f4k9;
  }, [userId]);

  const screenContent = useMemo(() => {
    switch (currentScreen) {
      case "dashboard":
        return <DashboardScreen persona={currentPersona} />;
      case "cards":
        return <CardsScreen />;
      case "transactions":
        return <TransactionsScreen persona={currentPersona} />;
      case "insights":
        return <InsightsScreen persona={currentPersona} />;
      case "settings":
        return <SettingsScreen persona={currentPersona} />;
      default:
        return null;
    }
  }, [currentScreen, currentPersona]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header persona={currentPersona} />
      <main className="px-4 py-6">{screenContent}</main>
      <BottomNav
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
        unreadCount={unreadInsights}
      />
    </div>
  );
}
