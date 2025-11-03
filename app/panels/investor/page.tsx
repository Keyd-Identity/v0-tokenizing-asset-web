"use client"

import { useRequireRole } from "@/lib/auth-guards"
import { StatCard } from "@/components/panels/stat-card"
import { PortfolioCards } from "@/components/panels/investor/portfolio-cards"
import { PurchasesTable } from "@/components/panels/investor/purchases-table"
import { PayoutsCard } from "@/components/panels/investor/payouts-card"
import { CategoryDistribution } from "@/components/panels/investor/category-distribution"
import { mockInvestorHoldings } from "@/lib/mock-data"
import { Wallet, TrendingUp, Package, DollarSign } from "lucide-react"

export default function InvestorDashboard() {
  useRequireRole("investor")

  const totalValue = mockInvestorHoldings.reduce((sum, h) => sum + h.totalValue, 0)
  const totalPnL = mockInvestorHoldings.reduce((sum, h) => sum + h.pnl, 0)
  const totalTokens = mockInvestorHoldings.reduce((sum, h) => sum + h.tokensOwned, 0)
  const avgPnLPercent = (totalPnL / (totalValue - totalPnL)) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Panel de Inversor</h1>
        <p className="text-muted-foreground">Tu portafolio y posiciones</p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Valor Total"
          value={`$${totalValue.toLocaleString()}`}
          icon={Wallet}
          description="Portafolio completo"
        />
        <StatCard
          title="PnL Total"
          value={`$${totalPnL.toLocaleString()}`}
          icon={TrendingUp}
          trend={{
            value: `${avgPnLPercent.toFixed(2)}%`,
            positive: totalPnL >= 0,
          }}
        />
        <StatCard
          title="Tokens Totales"
          value={totalTokens}
          icon={Package}
          description={`${mockInvestorHoldings.length} proyectos`}
        />
        <StatCard title="Recompensas" value="$695" icon={DollarSign} description="Total recibido" />
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Mi Portafolio</h2>
          <PortfolioCards />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <CategoryDistribution />
          <PayoutsCard />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Historial de Compras</h2>
          <PurchasesTable />
        </div>
      </div>
    </div>
  )
}
