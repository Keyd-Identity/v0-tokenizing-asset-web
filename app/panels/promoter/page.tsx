"use client"

import { useRequireRole } from "@/lib/auth-guards"
import { useStore } from "@/lib/store"
import { StatCard } from "@/components/panels/stat-card"
import { ProjectsTablePromoter } from "@/components/panels/promoter/projects-table-promoter"
import { SalesTable } from "@/components/panels/promoter/sales-table"
import { WithdrawCard } from "@/components/panels/promoter/withdraw-card"
import { ComplianceChecklist } from "@/components/panels/promoter/compliance-checklist"
import { FolderKanban, DollarSign, Users, TrendingUp } from "lucide-react"

export default function PromoterDashboard() {
  useRequireRole("promoter")
  const { projects, orders, promoterBalances, user } = useStore()

  const promoterProjects = projects.filter((p) => p.ownerPromoterId === user.id)
  const totalSales = promoterProjects.reduce((sum, p) => sum + p.salesUSDT, 0)
  const totalBuyers = promoterProjects.reduce((sum, p) => sum + p.buyersCount, 0)
  const balance = promoterBalances.find((b) => b.promoterId === user.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Panel de Promotor</h1>
        <p className="text-muted-foreground">Gestión de tus proyectos</p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Mis Proyectos"
          value={promoterProjects.length}
          icon={FolderKanban}
          description={`${promoterProjects.filter((p) => p.status === "approved").length} activos`}
        />
        <StatCard
          title="Ventas Totales"
          value={`$${totalSales.toLocaleString()}`}
          icon={DollarSign}
          description="Acumulado"
        />
        <StatCard title="Compradores" value={totalBuyers} icon={Users} description="Únicos" />
        <StatCard
          title="Balance Disponible"
          value={`$${balance?.availableUSDT.toLocaleString() || 0}`}
          icon={TrendingUp}
          description={`$${balance?.pendingUSDT.toLocaleString() || 0} pendiente`}
        />
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Mis Proyectos</h2>
          <ProjectsTablePromoter />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Órdenes & Ventas</h2>
          <SalesTable />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <WithdrawCard />
          <ComplianceChecklist />
        </div>
      </div>
    </div>
  )
}
