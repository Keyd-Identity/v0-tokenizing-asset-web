"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockInvestorHoldings } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, ShoppingCart } from "lucide-react"

export function PortfolioCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mockInvestorHoldings.map((holding) => (
        <Card key={holding.projectId} className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <Badge variant="outline" className="mb-2">
                {holding.category}
              </Badge>
              <h3 className="font-semibold leading-tight">{holding.projectName}</h3>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tokens</span>
              <span className="font-medium">{holding.tokensOwned}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Costo promedio</span>
              <span className="font-medium">${holding.avgCost}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Valor actual</span>
              <span className="font-bold">${holding.totalValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="text-sm text-muted-foreground">PnL</span>
              <div className="flex items-center gap-1">
                {holding.pnl >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`font-semibold ${holding.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                  ${Math.abs(holding.pnl)} ({holding.pnlPercent > 0 ? "+" : ""}
                  {holding.pnlPercent}%)
                </span>
              </div>
            </div>
          </div>

          <Button asChild className="mt-4 w-full bg-transparent" variant="outline">
            <Link href={`/project/${holding.projectId}/buy`}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Comprar más
            </Link>
          </Button>
        </Card>
      ))}
    </div>
  )
}
