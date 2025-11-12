"use client"

import type { Persona } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface QuantoScreenProps {
  persona: Persona
  onDemo: (category: string) => void
}

export function QuantoScreen({ persona, onDemo }: QuantoScreenProps) {
  const responses = [
    { category: "empathetic", title: "Supportive Responses", description: "When life happens" },
    { category: "preventive", title: "Preventive Alerts", description: "Before issues arise" },
    { category: "reward", title: "Rewards & Recognition", description: "For good habits" },
    { category: "educational", title: "Learning Resources", description: "Financial guidance" },
    { category: "ambient", title: "Ambient Insights", description: "Context-aware tips" },
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-2xl font-bold">Quanto AI</h1>
        <p className="text-muted-foreground text-sm">Privacy-first financial companion</p>
      </div>

      <div className="space-y-3">
        {responses.map((response) => (
          <Card key={response.category} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4" onClick={() => onDemo(response.category)}>
              <div className="flex items-start gap-3">
                <Sparkles size={20} className="text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{response.title}</h3>
                  <p className="text-sm text-muted-foreground">{response.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
