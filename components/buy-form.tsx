"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"
import type { Project } from "@/lib/types"
import { AlertCircle, CheckCircle2, Wallet } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface BuyFormProps {
  project: Project
}

export function BuyForm({ project }: BuyFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user, connectWallet, addPurchase, updateProjectSupply } = useStore()
  const [quantity, setQuantity] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState("Polygon")

  const quantityNum = Number.parseInt(quantity) || 0
  const total = quantityNum * project.pricePerTokenUSDT

  const errors = {
    tooLow: quantityNum > 0 && quantityNum < project.minBuy,
    tooHigh: quantityNum > project.maxBuy,
    notAvailable: quantityNum > project.availableSupply,
    noWallet: !user.walletAddress,
    noKYC: !user.kycVerified,
  }

  const hasErrors = Object.values(errors).some(Boolean)

  const handleConnectWallet = () => {
    // Simulate wallet connection
    const mockAddress = `0x${Math.random().toString(16).slice(2, 42)}`
    connectWallet(mockAddress)
    toast({
      title: "Wallet conectada",
      description: "Tu wallet ha sido conectada exitosamente",
    })
  }

  const handleConfirmPurchase = async () => {
    setIsLoading(true)
    setShowConfirmDialog(false)

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create purchase record
    const purchase = {
      id: Math.random().toString(36).slice(2),
      projectId: project.id,
      projectName: project.name,
      quantity: quantityNum,
      pricePerToken: project.pricePerTokenUSDT,
      total,
      date: new Date().toISOString(),
      status: "completed" as const,
    }

    addPurchase(purchase)
    updateProjectSupply(project.id, quantityNum)

    toast({
      title: "Compra exitosa",
      description: `Has comprado ${quantityNum} tokens de ${project.name}`,
    })

    setIsLoading(false)
    setQuantity("")

    // Redirect to account page
    setTimeout(() => {
      router.push("/account")
    }, 1500)
  }

  return (
    <>
      <div className="space-y-6">
        {/* KYC Status */}
        <div
          className={`rounded-xl border p-4 ${
            user.kycVerified ? "border-success/50 bg-success/5" : "border-warning/50 bg-warning/5"
          }`}
        >
          <div className="flex items-center gap-2">
            {user.kycVerified ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="font-medium text-success">KYC Verificado</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-warning" />
                <span className="font-medium text-warning">KYC No Verificado</span>
              </>
            )}
          </div>
          {!user.kycVerified && (
            <p className="mt-2 text-sm text-muted-foreground">
              Necesitas completar la verificación KYC para comprar tokens. Este es un placeholder para el proceso de
              verificación.
            </p>
          )}
        </div>

        {/* Wallet Connection */}
        <div>
          <Label className="mb-2 block">Wallet</Label>
          {user.walletAddress ? (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3">
              <Wallet className="h-5 w-5 text-muted-foreground" />
              <span className="font-mono text-sm">
                {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
              </span>
              <Badge variant="secondary" className="ml-auto">
                Conectada
              </Badge>
            </div>
          ) : (
            <Button onClick={handleConnectWallet} variant="outline" className="w-full bg-transparent">
              <Wallet className="mr-2 h-4 w-4" />
              Conectar Wallet
            </Button>
          )}
        </div>

        {/* Network Selection */}
        {user.walletAddress && (
          <div>
            <Label className="mb-2 block">Red</Label>
            <div className="flex gap-2">
              {["Polygon", "Ethereum", "BSC"].map((network) => (
                <button
                  key={network}
                  onClick={() => setSelectedNetwork(network)}
                  className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedNetwork === network
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {network}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Input */}
        <div>
          <Label htmlFor="quantity" className="mb-2 block">
            Cantidad de Tokens
          </Label>
          <Input
            id="quantity"
            type="number"
            placeholder={`Mínimo ${project.minBuy} tokens`}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={project.minBuy}
            max={Math.min(project.maxBuy, project.availableSupply)}
          />
          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Mín: {project.minBuy} | Máx: {project.maxBuy}
            </span>
            <span>Disponible: {project.availableSupply.toLocaleString()}</span>
          </div>
        </div>

        {/* Errors */}
        {errors.tooLow && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/5 p-3 text-sm">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <span>La cantidad mínima de compra es {project.minBuy} tokens</span>
          </div>
        )}
        {errors.tooHigh && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/5 p-3 text-sm">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <span>La cantidad máxima de compra es {project.maxBuy} tokens</span>
          </div>
        )}
        {errors.notAvailable && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/5 p-3 text-sm">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <span>Solo hay {project.availableSupply} tokens disponibles</span>
          </div>
        )}

        {/* Total Calculation */}
        {quantityNum > 0 && !hasErrors && (
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Cantidad</span>
              <span className="font-medium">{quantityNum} tokens</span>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Precio por token</span>
              <span className="font-medium">${project.pricePerTokenUSDT} USDT</span>
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold">${total.toLocaleString()} USDT</span>
              </div>
            </div>
          </div>
        )}

        {/* Purchase Button */}
        <Button
          size="lg"
          className="w-full"
          disabled={hasErrors || !quantityNum || isLoading}
          onClick={() => setShowConfirmDialog(true)}
        >
          {isLoading ? "Procesando..." : "Confirmar Compra"}
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Compra</DialogTitle>
            <DialogDescription>Revisa los detalles de tu compra antes de confirmar</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Proyecto</span>
              <span className="font-medium">{project.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Cantidad</span>
              <span className="font-medium">{quantityNum} tokens</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Precio unitario</span>
              <span className="font-medium">${project.pricePerTokenUSDT} USDT</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Red</span>
              <span className="font-medium">{selectedNetwork}</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total a pagar</span>
                <span className="text-xl font-bold">${total.toLocaleString()} USDT</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmPurchase}>Confirmar y Pagar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
