"use client"

import { Card } from "@/components/ui/card"
import { mockInvestorHoldings } from "@/lib/mock-data"
import { PieChart } from "lucide-react"

export function CategoryDistribution() {
  const distribution = mockInvestorHoldings.reduce(
    (acc, holding) => {
      acc[holding.category] = (acc[holding.category] || 0) + holding.totalValue
      return acc
    },
    {} as Record<string, number>,
  )

  const total = Object.values(distribution).reduce((sum, val) => sum + val, 0)

  const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500"]

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <PieChart className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Distribución por Categoría</h3>
          <p className="text-sm text-muted-foreground">Diversificación del portafolio</p>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(distribution).map(([category, value], index) => {
          const percentage = ((value / total) * 100).toFixed(1)
          return (
            <div key={category}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">{category}</span>
                <span className="text-muted-foreground">{percentage}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div className={`h-full ${colors[index % colors.length]}`} style={{ width: `${percentage}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">${value.toLocaleString()}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
