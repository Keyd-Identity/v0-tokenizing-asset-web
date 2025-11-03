"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockPayouts } from "@/lib/mock-data"
import { DollarSign } from "lucide-react"

export function PayoutsCard() {
  const totalPaid = mockPayouts.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <DollarSign className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Recompensas & Flujos</h3>
          <p className="text-sm text-muted-foreground">Pagos recibidos</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground">Total recibido</p>
        <p className="text-3xl font-bold">${totalPaid.toLocaleString()}</p>
      </div>

      <div className="space-y-3">
        {mockPayouts.map((payout) => (
          <div key={payout.id} className="flex items-center justify-between border-t pt-3">
            <div className="flex-1">
              <p className="text-sm font-medium">{payout.projectName}</p>
              <p className="text-xs text-muted-foreground">{new Date(payout.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">${payout.amount}</span>
              <Badge variant={payout.status === "paid" ? "default" : "secondary"}>{payout.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
