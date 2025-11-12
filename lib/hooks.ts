"use client"

import { useState, useCallback, useEffect } from "react"
import { personas, quantoResponses, defaultAdminControls } from "./mock-data"
import type { QuantoInsight, AdminControls } from "./types"

export function usePersona(personaId: string) {
  const persona = personas.find((p) => p.id === personaId)
  return persona || personas[0]
}

export function useTriggerResponse(category: string) {
  const responseMap: Record<string, string> = {
    empathetic: "salary_delay",
    preventive: "overspending_alert",
    reward: "savings_milestone",
    educational: "first_salary",
    ambient: "coffee_reminder",
  }
  return quantoResponses[responseMap[category]] || null
}

export function useAdminControls() {
  const [controls, setControls] = useState<AdminControls>(defaultAdminControls)

  const toggleCategory = useCallback((category: string) => {
    setControls((prev) => ({
      ...prev,
      enabledCategories: {
        ...prev.enabledCategories,
        [category]: !prev.enabledCategories[category as keyof typeof prev.enabledCategories],
      },
    }))
  }, [])

  const toggleSubcontrol = useCallback((subcontrol: string) => {
    setControls((prev) => ({
      ...prev,
      enabledSubcontrols: {
        ...prev.enabledSubcontrols,
        [subcontrol]: !prev.enabledSubcontrols[subcontrol],
      },
    }))
  }, [])

  return { controls, toggleCategory, toggleSubcontrol }
}

export function useQuantoMessages(personaId: string) {
  const [messages, setMessages] = useState<QuantoInsight[]>([])
  const persona = usePersona(personaId)
  const empatheticResponse = useTriggerResponse("empathetic")
  const preventiveResponse = useTriggerResponse("preventive")
  const rewardResponse = useTriggerResponse("reward")
  const educationalResponse = useTriggerResponse("educational")
  const ambientResponse = useTriggerResponse("ambient")

  useEffect(() => {
    const triggered: QuantoInsight[] = []

    if (personaId === "ada" && empatheticResponse) {
      triggered.push(empatheticResponse as QuantoInsight)
    }

    if (personaId === "malik" && persona.currentSpend > persona.usualMonthlySpend * 1.15 && preventiveResponse) {
      triggered.push(preventiveResponse as QuantoInsight)
    }

    if (persona.savingsStreak && persona.savingsStreak >= 3 && rewardResponse) {
      triggered.push(rewardResponse as QuantoInsight)
    }

    if (personaId === "ngozi" && educationalResponse) {
      triggered.push(educationalResponse as QuantoInsight)
    }

    if (personaId === "tolu" && ambientResponse) {
      triggered.push(ambientResponse as QuantoInsight)
    }

    setMessages(triggered)
  }, [personaId, persona, empatheticResponse, preventiveResponse, rewardResponse, educationalResponse, ambientResponse])

  return { messages }
}
