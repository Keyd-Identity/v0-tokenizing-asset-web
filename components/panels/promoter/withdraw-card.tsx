"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { Wallet } from "lucide-react"

export function WithdrawCard() {
  const { promoterBalances, user, withdrawBalance } = useStore()
  const { toast } = useToast()
  const [amount, setAmount] = useState("")

  const balance = promoterBalances.find((b) => b.promoterId === user.id)

  const handleWithdraw = () => {
    const withdrawAmount = Number.parseFloat(amount)
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast({
        title: "Error",
        description: "El monto debe ser mayor a 0",
        variant: "destructive",
      })
      return
    }

    if (!balance || withdrawAmount > balance.availableUSDT) {
      toast({
        title: "Error",
        description: "Fondos insuficientes",
        variant: "destructive",
      })
      return
    }

    withdrawBalance(user.id, withdrawAmount)
    toast({
      title: "Retiro simulado",
      description: `Se simularía el retiro de $${withdrawAmount.toLocaleString()} USDT`,
    })
    setAmount("")
  }

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Wallet className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Balance & Retiros</h3>
          <p className="text-sm text-muted-foreground">Gestión de fondos</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Balance disponible</span>
            <span className="text-2xl font-bold">${balance?.availableUSDT.toLocaleString() || 0}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Balance pendiente</span>
            <span className="text-lg font-semibold text-muted-foreground">
              ${balance?.pendingUSDT.toLocaleString() || 0}
            </span>
          </div>
        </div>

        <div className="border-t pt-6">
          <Label htmlFor="withdraw-amount">Monto a retirar (USDT)</Label>
          <div className="mt-2 flex gap-2">
            <Input
              id="withdraw-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000"
            />
            <Button onClick={handleWithdraw}>Retirar</Button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Los retiros se procesan en 24-48 horas</p>
        </div>
      </div>
    </Card>
  )
}
