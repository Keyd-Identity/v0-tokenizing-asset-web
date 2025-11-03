"use client"

import { useRequireRole } from "@/lib/auth-guards"
import { useStore } from "@/lib/store"
import { StatCard } from "@/components/panels/stat-card"
import { ProjectTableAdmin } from "@/components/panels/admin/project-table-admin"
import { KycTable } from "@/components/panels/admin/kyc-table"
import { FeesCard } from "@/components/panels/admin/fees-card"
import { AuditLog } from "@/components/panels/admin/audit-log"
import { DollarSign, FolderKanban, TrendingUp, Users } from "lucide-react"

export default function AdminDashboard() {
  useRequireRole("admin")
  const { projects, orders, kycRecords } = useStore()

  const tvl = projects.reduce((sum, p) => sum + (p.totalSupply - p.availableSupply) * p.pricePerTokenUSDT, 0)
  const sales24h = orders
    .filter((o) => {
      const orderDate = new Date(o.createdAt)
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      return orderDate > yesterday
    })
    .reduce((sum, o) => sum + o.total, 0)
  const verifiedUsers = kycRecords.filter((k) => k.status === "verified").length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground">Gestión completa del marketplace</p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="TVL Total"
          value={`$${tvl.toLocaleString()}`}
          icon={DollarSign}
          description="Valor total bloqueado"
        />
        <StatCard
          title="Proyectos"
          value={projects.length}
          icon={FolderKanban}
          description={`${projects.filter((p) => p.status === "approved").length} aprobados`}
        />
        <StatCard
          title="Ventas 24h"
          value={`$${sales24h.toLocaleString()}`}
          icon={TrendingUp}
          description="Últimas 24 horas"
        />
        <StatCard
          title="Usuarios Verificados"
          value={verifiedUsers}
          icon={Users}
          description={`${kycRecords.filter((k) => k.status === "pending").length} pendientes`}
        />
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Gestión de Proyectos</h2>
          <ProjectTableAdmin />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">KYC & Cumplimiento</h2>
          <KycTable />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <FeesCard />
          <AuditLog />
        </div>
      </div>
    </div>
  )
}
