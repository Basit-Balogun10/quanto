export type Category =
  | "empathetic"
  | "preventive"
  | "reward"
  | "educational"
  | "ambient";

export type Card = {
  id: string;
  lastFour: string;
  type: "debit" | "credit";
  cardholderName: string;
  expiry: string;
  isDefault: boolean;
  color: string;
};

export type Account = {
  id: string;
  name: string;
  type: "checking" | "savings";
  balance: number;
  accountNumber: string;
  routingNumber: string;
};

export type Transaction = {
  id: string;
  date: string;
  vendor: string;
  amount: number;
  category: string;
  type: "debit" | "credit";
  description?: string;
  icon?: string;
  narrationTag?: string;
  recipientName?: string;
  recipientAccount?: string;
  recipientBank?: string;
  transactionReference?: string;
  status?: "completed" | "pending" | "failed";
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  accounts: Account[];
  cards: Card[];
};

export type QuantoInsight = {
  id: string;
  category: Category;
  title: string;
  message: string;
  actionLabel: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
  read: boolean;
  flowType?:
    | "salary_delay"
    | "subscription_warning"
    | "reward_offer"
    | "spending_cooloff"
    | "detty_december"
    | "travel_reward";
  flowData?: Record<string, any>;
};

export type Rule = {
  id: string;
  category: Category;
  name: string;
  trigger: string;
  message: string;
  enabled: boolean;
};

export type Campaign = {
  id: string;
  name: string;
  message: string;
  criteria: {
    type: "spending" | "transactions" | "balance" | "category";
    operator: "greater_than" | "less_than" | "equals";
    value: number;
    category?: string;
  };
  reward: {
    type: "cashback" | "discount" | "freebie";
    value: number; // percentage or amount
    description: string;
  };
  enabled: boolean;
  createdAt: string;
  qualifiedUserIds?: string[];
  estimatedReach?: number;
  estimatedCost?: number;
};

export type AdminControls = {
  enabledCategories: Record<Category, boolean>;
  rules: Rule[];
  campaigns?: Campaign[];
};

export type Persona = {
  id: string; // Changed from string to be UUID-like format
  name: string;
  personaType: string;
  accountNumber: string;
  balance: number;
  usualMonthlySpend: number;
  currentSpend: number;
  savingsStreak: number;
  email: string;
  avatar: string;
  transactions: Transaction[];
  quantoResponses: QuantoInsight[];
  salaryExpectedDate?: string;
  lastSalaryDate?: string;
  lastSalaryAmount?: number;
  subscriptionData?: Array<{
    name: string;
    amount: number;
    renewalDate: string;
    enabled: boolean;
  }>;
  recentFlightPurchase?: boolean;
  spendingInThreeDays?: number;
  month?: number;
  hasDettyDecemberTrigger?: boolean;
  recentFunTransfers?: string[]; // Array of transfer categories that can trigger detty december
  activatedFeatures?: {
    dettyDecemberTracker?: boolean;
    cooloffPeriod?: boolean;
    salaryDelaySupport?: boolean;
    travelReward?: boolean;
  };
};

export type QuickAction = {
  id: string;
  label: string;
  icon: string;
  description?: string;
};

export { defaultAdminControls } from "./mock-data";
