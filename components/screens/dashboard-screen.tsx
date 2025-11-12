"use client"

import type { Persona } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, AlertCircle, Award } from "lucide-react"

interface DashboardScreenProps {
  persona: Persona
  onDemo: (category: string) => void
}

export function DashboardScreen({ persona, onDemo }: DashboardScreenProps) {
  const spendPercentage = (persona.currentSpend / persona.usualMonthlySpend) * 100
  const isOverspending = spendPercentage > 115

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-3xl font-bold text-foreground">{persona.name}</h1>
        <p className="text-muted-foreground">{persona.personaType}</p>
      </div>

      {/* Balance card */}
      <Card className="bg-gradient-to-br from-primary to-primary/90 border-0">
        <CardContent className="pt-6">
          <p className="text-primary-foreground/80 text-sm">Available Balance</p>
          <h2 className="text-4xl font-bold text-primary-foreground">₦{persona.balance.toLocaleString()}</h2>
        </CardContent>
      </Card>

      {/* Spending summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} className="text-accent" />
            Monthly Spending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Current Spend</span>
              <span className="font-semibold">₦{persona.currentSpend.toLocaleString()}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${isOverspending ? "bg-destructive" : "bg-secondary"}`}
                style={{ width: `${Math.min(spendPercentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>vs usual: ₦{persona.usualMonthlySpend.toLocaleString()}</span>
              <span>{spendPercentage.toFixed(0)}%</span>
            </div>
          </div>

          {isOverspending && (
            <Button
              onClick={() => onDemo("preventive")}
              variant="outline"
              className="w-full text-destructive border-destructive hover:bg-destructive/10"
            >
              <AlertCircle size={16} className="mr-2" />
              View Overspending Alert
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Savings streak (if applicable) */}
      {persona.savingsStreak && persona.savingsStreak >= 3 && (
        <Card className="bg-gradient-to-br from-accent to-accent/90 border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Award size={24} className="text-accent-foreground" />
              <div>
                <p className="text-accent-foreground/80 text-sm">Savings Streak</p>
                <p className="text-2xl font-bold text-accent-foreground">{persona.savingsStreak} months</p>
              </div>
            </div>
            <Button
              onClick={() => onDemo("reward")}
              className="w-full mt-4 bg-accent-foreground text-accent hover:bg-accent-foreground/90"
            >
              View Reward
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Demo category buttons */}
      <div className="space-y-2 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Demo Triggers</p>
        <div className="grid grid-cols-2 gap-2">
          {persona.categoriesEnabled.map((category) => (
            <Button key={category} onClick={() => onDemo(category)} variant="outline" className="text-xs capitalize">
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
