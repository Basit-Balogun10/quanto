"use client"

import type { Persona } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"
import { useState } from "react"

interface ControlsScreenProps {
  persona: Persona
}

export function ControlsScreen({ persona }: ControlsScreenProps) {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    persona.categoriesEnabled.reduce((acc, cat) => ({ ...acc, [cat]: true }), {}),
  )

  const categories = [
    { id: "empathetic", name: "Empathetic Support", description: "Supportive messages when you need help" },
    { id: "preventive", name: "Preventive Alerts", description: "Alerts before issues happen" },
    { id: "reward", name: "Rewards & Recognition", description: "Celebrate your financial wins" },
    { id: "educational", name: "Learning Resources", description: "Financial tips and guidance" },
    { id: "ambient", name: "Ambient Insights", description: "Context-aware spending patterns" },
  ]

  const toggle = (id: string) => {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-2xl font-bold">Privacy & Controls</h1>
        <p className="text-muted-foreground text-sm">Manage your Quanto preferences</p>
      </div>

      <Card className="bg-secondary/10 border-secondary/30">
        <CardContent className="p-4 flex items-start gap-3">
          <ShieldCheck size={20} className="text-secondary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground">Your data is yours</p>
            <p className="text-sm text-muted-foreground">Quanto only uses data you explicitly enable</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              <Button
                onClick={() => toggle(category.id)}
                variant="outline"
                size="sm"
                className={enabled[category.id] ? "bg-secondary text-secondary-foreground" : ""}
              >
                {enabled[category.id] ? "On" : "Off"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
