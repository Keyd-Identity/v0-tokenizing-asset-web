"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { Wallet, CheckCircle2, AlertCircle, ShoppingBag, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function AccountPage() {
  const { user, connectWallet, disconnectWallet } = useStore()
  const { toast } = useToast()

  const handleConnectWallet = () => {
    const mockAddress = `0x${Math.random().toString(16).slice(2, 42)}`
    connectWallet(mockAddress)
    toast({
      title: "Wallet conectada",
      description: "Tu wallet ha sido conectada exitosamente",
    })
  }

  const handleDisconnectWallet = () => {
    disconnectWallet()
    toast({
      title: "Wallet desconectada",
      description: "Tu wallet ha sido desconectada",
    })
  }

  const handleCopyAddress = () => {
    if (user.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress)
      toast({
        title: "Dirección copiada",
        description: "La dirección de tu wallet ha sido copiada al portapapeles",
      })
    }
  }

  const handleVerifyKYC = () => {
    toast({
      title: "Verificación KYC",
      description: "Esta es una función placeholder. En producción, esto iniciaría el proceso de verificación KYC.",
    })
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-2 text-4xl font-bold">Mi Cuenta</h1>
          <p className="text-muted-foreground">Gestiona tu wallet, verificación KYC y historial de compras</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Wallet Section */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Wallet</h2>
              </div>
              {user.walletAddress ? (
                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-background p-4">
                    <p className="mb-2 text-sm text-muted-foreground">Dirección</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 font-mono text-sm">{user.walletAddress}</code>
                      <Button size="sm" variant="ghost" onClick={handleCopyAddress}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Conectada
                    </Badge>
                    <Badge variant="secondary">Polygon</Badge>
                  </div>
                  <Button variant="outline" onClick={handleDisconnectWallet}>
                    Desconectar Wallet
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Conecta tu wallet para comenzar a invertir en activos tokenizados
                  </p>
                  <Button onClick={handleConnectWallet}>
                    <Wallet className="mr-2 h-4 w-4" />
                    Conectar Wallet
                  </Button>
                </div>
              )}
            </section>

            {/* KYC Section */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                {user.kycVerified ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-warning" />
                )}
                <h2 className="text-xl font-semibold">Verificación KYC</h2>
              </div>
              {user.kycVerified ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl border border-success/50 bg-success/5 p-4">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                    <div>
                      <p className="font-medium text-success">Verificación Completada</p>
                      <p className="text-sm text-muted-foreground">Tu identidad ha sido verificada exitosamente</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl border border-warning/50 bg-warning/5 p-4">
                    <AlertCircle className="h-6 w-6 text-warning" />
                    <div>
                      <p className="font-medium text-warning">Verificación Pendiente</p>
                      <p className="text-sm text-muted-foreground">
                        Completa la verificación KYC para poder comprar tokens
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleVerifyKYC}>Iniciar Verificación KYC</Button>
                  <p className="text-xs text-muted-foreground">
                    La verificación KYC es requerida por regulaciones financieras para proteger tu inversión y cumplir
                    con las leyes anti-lavado de dinero.
                  </p>
                </div>
              )}
            </section>

            {/* Purchase History */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Historial de Compras</h2>
              </div>
              {user.purchases.length > 0 ? (
                <div className="space-y-3">
                  {user.purchases.map((purchase) => (
                    <div key={purchase.id} className="rounded-xl border border-border bg-background p-4">
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <p className="font-medium">{purchase.projectName}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(purchase.date).toLocaleDateString("es-ES", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <Badge
                          variant={
                            purchase.status === "completed"
                              ? "default"
                              : purchase.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {purchase.status === "completed"
                            ? "Completada"
                            : purchase.status === "pending"
                              ? "Pendiente"
                              : "Fallida"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Cantidad</p>
                          <p className="font-medium">{purchase.quantity} tokens</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Precio</p>
                          <p className="font-medium">${purchase.pricePerToken} USDT</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total</p>
                          <p className="font-medium">${purchase.total.toLocaleString()} USDT</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-3" asChild>
                        <Link href={`/project/${purchase.projectId}`}>
                          Ver Proyecto
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border">
                  <div className="text-center">
                    <ShoppingBag className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
                    <p className="font-medium">No hay compras aún</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Explora el marketplace para comenzar a invertir
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/marketplace">Ir al Marketplace</Link>
                    </Button>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Quick Stats */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold">Resumen</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Invertido</p>
                    <p className="text-2xl font-bold">
                      ${user.purchases.reduce((sum, p) => sum + p.total, 0).toLocaleString()} USDT
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Compras Realizadas</p>
                    <p className="text-2xl font-bold">{user.purchases.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tokens Totales</p>
                    <p className="text-2xl font-bold">
                      {user.purchases.reduce((sum, p) => sum + p.quantity, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold">Acciones Rápidas</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/marketplace">Explorar Proyectos</Link>
                  </Button>
                  {!user.kycVerified && (
                    <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleVerifyKYC}>
                      Verificar KYC
                    </Button>
                  )}
                  {!user.walletAddress && (
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={handleConnectWallet}
                    >
                      Conectar Wallet
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
