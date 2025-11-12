"use client"

import type { Persona } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"

interface TransactionsScreenProps {
  persona: Persona
  onDemo: (category: string) => void
}

export function TransactionsScreen({ persona, onDemo }: TransactionsScreenProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-muted-foreground text-sm">Recent activity for {persona.name}</p>
      </div>

      <div className="space-y-2">
        {persona.recentTransactions.map((txn) => (
          <Card key={txn.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-foreground">{txn.vendor}</p>
                <p className="text-xs text-muted-foreground">{txn.date}</p>
              </div>
              <div className={`font-semibold ${txn.amount > 0 ? "text-secondary" : "text-foreground"}`}>
                {txn.amount > 0 ? "+" : ""} ₦{Math.abs(txn.amount).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
