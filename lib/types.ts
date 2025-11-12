export type Category = "empathetic" | "preventive" | "reward" | "educational" | "ambient"

export type Card = {
  id: string
  lastFour: string
  type: "debit" | "credit"
  cardholderName: string
  expiry: string
  isDefault: boolean
  color: string
}

export type Account = {
  id: string
  name: string
  type: "checking" | "savings"
  balance: number
  accountNumber: string
  routingNumber: string
}

export type Transaction = {
  id: string
  date: string
  vendor: string
  amount: number
  category: string
  type: "debit" | "credit"
  description?: string
  icon?: string
}

export type User = {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  accounts: Account[]
  cards: Card[]
}

export type QuantoInsight = {
  id: string
  category: Category
  title: string
  message: string
  actionLabel: string
  priority: "high" | "medium" | "low"
  timestamp: string
  read: boolean
}

export type Rule = {
  id: string
  category: Category
  name: string
  trigger: string
  message: string
  enabled: boolean
}

export type AdminControls = {
  enabledCategories: Record<Category, boolean>
  rules: Rule[]
}

export { defaultAdminControls } from "./mock-data"
