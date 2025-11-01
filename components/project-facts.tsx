import { TrendingUp, Coins, ShoppingCart, AlertCircle } from "lucide-react"

interface ProjectFactsProps {
  pricePerToken: number
  totalSupply: number
  availableSupply: number
  minBuy: number
  maxBuy: number
  apyEstimated?: number
}

export function ProjectFacts({
  pricePerToken,
  totalSupply,
  availableSupply,
  minBuy,
  maxBuy,
  apyEstimated,
}: ProjectFactsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
          <Coins className="h-4 w-4" />
          <span className="text-sm">Precio por Token</span>
        </div>
        <p className="text-2xl font-bold">${pricePerToken} USDT</p>
      </div>

      {apyEstimated && (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">APY Estimado</span>
          </div>
          <p className="text-2xl font-bold text-success">{apyEstimated}%</p>
        </div>
      )}

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
          <ShoppingCart className="h-4 w-4" />
          <span className="text-sm">Disponibilidad</span>
        </div>
        <p className="text-2xl font-bold">
          {availableSupply.toLocaleString()}
          <span className="text-base font-normal text-muted-foreground"> / {totalSupply.toLocaleString()}</span>
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">Compra Mínima</span>
        </div>
        <p className="text-2xl font-bold">{minBuy} tokens</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">Compra Máxima</span>
        </div>
        <p className="text-2xl font-bold">{maxBuy} tokens</p>
      </div>
    </div>
  )
}
