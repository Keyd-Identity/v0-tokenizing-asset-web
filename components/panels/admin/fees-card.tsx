"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { DollarSign } from "lucide-react"

export function FeesCard() {
  const { fees, updateMarketplaceFee, addAuditLog, user } = useStore()
  const { toast } = useToast()
  const [newBps, setNewBps] = useState(fees.bps.toString())

  const handleUpdateFee = () => {
    const bps = Number.parseInt(newBps)
    if (isNaN(bps) || bps < 0 || bps > 1000) {
      toast({
        title: "Error",
        description: "El fee debe estar entre 0 y 1000 bps",
        variant: "destructive",
      })
      return
    }

    const oldBps = fees.bps
    updateMarketplaceFee(bps)
    addAuditLog({
      action: "Fee actualizado",
      by: "Admin Principal",
      byRole: user.role,
      date: new Date().toISOString(),
      details: `Fee cambiado de ${oldBps} bps a ${bps} bps`,
    })
    toast({
      title: "Fee actualizado",
      description: `Nuevo fee: ${(bps / 100).toFixed(2)}%`,
    })
  }

  const handleWithdraw = () => {
    toast({
      title: "Retiro simulado",
      description: `Se simularía el retiro de $${fees.accruedUSDT.toLocaleString()} USDT`,
    })
  }

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <DollarSign className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Fees & Comisiones</h3>
          <p className="text-sm text-muted-foreground">Gestión de comisiones del marketplace</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Comisiones acumuladas</span>
            <span className="text-2xl font-bold">${fees.accruedUSDT.toLocaleString()}</span>
          </div>
          <Button onClick={handleWithdraw} className="w-full">
            Simular Retiro
          </Button>
        </div>

        <div className="border-t pt-6">
          <Label htmlFor="fee-bps">Fee del Marketplace (bps)</Label>
          <div className="mt-2 flex gap-2">
            <Input
              id="fee-bps"
              type="number"
              value={newBps}
              onChange={(e) => setNewBps(e.target.value)}
              placeholder="250"
            />
            <Button onClick={handleUpdateFee}>Actualizar</Button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Actual: {fees.bps} bps ({(fees.bps / 100).toFixed(2)}%)
          </p>
        </div>
      </div>
    </Card>
  )
}
