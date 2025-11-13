"use client";

interface SpendingDay {
  day: number;
  date: string;
  amount: number;
  description: string;
}

interface SpendingTimelineProps {
  salaryAmount: number;
  spent3Days: number;
  spendingPercentage: number;
  paydayDate: string;
  breakdown: SpendingDay[];
  largestPurchase: {
    vendor: string;
    amount: number;
    date: string;
  };
  usualMonthlySpend?: number;
}

export function SpendingTimeline({
  salaryAmount,
  spent3Days,
  spendingPercentage,
  breakdown,
  largestPurchase,
  usualMonthlySpend = 65000,
}: SpendingTimelineProps) {
  const remaining = salaryAmount - spent3Days;
  const projectedMonthly = (spent3Days / 3) * 30;

  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm mb-1">Spent in 3 days</p>
            <h3 className="text-3xl font-bold">
              ₦{spent3Days.toLocaleString()}
            </h3>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5">
            <span className="text-lg font-bold">{spendingPercentage}%</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span>of ₦{salaryAmount.toLocaleString()} salary</span>
          <span className="font-semibold">
            ₦{remaining.toLocaleString()} left
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${spendingPercentage}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <h4 className="font-semibold text-zinc-50">3-Day Spending Journey</h4>

        {breakdown.map((day, index) => (
          <div key={day.day} className="relative pl-8">
            {/* Timeline line */}
            {index !== breakdown.length - 1 && (
              <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-zinc-700" />
            )}

            {/* Timeline dot */}
            <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              {day.day}
            </div>

            {/* Content */}
            <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-zinc-50">{day.date}</p>
                  <p className="text-sm text-zinc-400">{day.description}</p>
                </div>
                <span className="text-lg font-bold text-red-400">
                  -₦{day.amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Largest Purchase Highlight */}
      <div className="bg-amber-950 border border-amber-900 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl">⚠️</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-amber-100 mb-1">
              Largest Purchase
            </p>
            <p className="text-sm text-amber-200">
              {largestPurchase.vendor} • ₦
              {largestPurchase.amount.toLocaleString()}
            </p>
            <p className="text-xs text-amber-300 mt-1">
              {largestPurchase.date}
            </p>
          </div>
        </div>
      </div>

      {/* Projection Warning */}
      <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📊</span>
          <div>
            <p className="font-semibold text-zinc-50 mb-1">
              Spending Projection
            </p>
            <p className="text-sm text-zinc-300">
              At this rate, you'd spend{" "}
              <span className="font-bold text-red-400">
                ₦{projectedMonthly.toLocaleString()}
              </span>{" "}
              this month (
              {Math.round((projectedMonthly / usualMonthlySpend) * 10) / 10}x
              your usual ₦{usualMonthlySpend.toLocaleString()})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
