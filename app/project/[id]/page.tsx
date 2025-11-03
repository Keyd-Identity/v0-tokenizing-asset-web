"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectFacts } from "@/components/project-facts"
import { FeaturedDrawer } from "@/components/featured-drawer"
import { useStore } from "@/lib/store"
import { MapPin, FileText, AlertTriangle, ArrowLeft, CheckCircle, XCircle, Pause, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { isFeaturedActive } from "@/lib/helpers"

interface ProjectPageProps {
  params: { id: string }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = params
  const { projects, user, updateProjectStatus, addAuditLog } = useStore()
  const { toast } = useToast()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  const isFeatured = isFeaturedActive(project)

  const handleAdminAction = (action: "approved" | "paused" | "pending") => {
    updateProjectStatus(project.id, action)
    addAuditLog({
      action: `Proyecto ${action === "approved" ? "aprobado" : action === "paused" ? "pausado" : "marcado como pendiente"}`,
      by: "Admin",
      byRole: user.role,
      date: new Date().toISOString(),
      refId: project.id,
      details: project.name,
    })
    toast({
      title: "Estado actualizado",
      description: `${project.name} ahora está ${action}`,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/marketplace">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Volver al Marketplace</span>
              <span className="sm:hidden">Volver</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[300px] overflow-hidden border-b border-border sm:h-[350px] md:h-[400px]">
        <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge>{project.category}</Badge>
              {isFeatured && (
                <Badge className="bg-primary">
                  <Star className="mr-1 h-3 w-3 fill-current" />
                  Proyecto destacado
                </Badge>
              )}
              {isFeatured && project.featuredTag && <Badge variant="secondary">{project.featuredTag}</Badge>}
            </div>
            <h1 className="mb-2 text-balance text-3xl font-bold sm:mb-4 sm:text-4xl md:text-5xl">{project.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{project.location}</span>
            </div>
            {isFeatured && (
              <p className="mt-3 text-sm text-muted-foreground">Seleccionado por el equipo según demanda y liquidez</p>
            )}
          </div>
        </div>
      </div>

      {user.role === "admin" && (
        <div className="border-b border-border bg-muted/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Acciones de Admin:</span>
                <Badge
                  variant={
                    project.status === "approved" ? "default" : project.status === "paused" ? "destructive" : "outline"
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <div className="flex gap-2">
                {project.status !== "approved" && (
                  <Button size="sm" variant="outline" onClick={() => handleAdminAction("approved")}>
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Aprobar
                  </Button>
                )}
                {project.status === "approved" && (
                  <Button size="sm" variant="outline" onClick={() => handleAdminAction("paused")}>
                    <Pause className="mr-2 h-4 w-4" />
                    Pausar
                  </Button>
                )}
                {project.status !== "pending" && project.status !== "approved" && (
                  <Button size="sm" variant="outline" onClick={() => handleAdminAction("pending")}>
                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                    Marcar Pendiente
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2 lg:space-y-8">
            {/* Description */}
            <section>
              <h2 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">Descripción del Proyecto</h2>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                {project.description}
              </p>
            </section>

            {/* Key Facts */}
            <section>
              <h2 className="mb-4 text-2xl font-bold sm:mb-5 sm:text-3xl">Datos Clave</h2>
              <ProjectFacts
                pricePerToken={project.pricePerTokenUSDT}
                totalSupply={project.totalSupply}
                availableSupply={project.availableSupply}
                minBuy={project.minBuy}
                maxBuy={project.maxBuy}
                apyEstimated={project.apyEstimated}
              />
            </section>

            {/* Documents */}
            <section>
              <h2 className="mb-4 text-2xl font-bold sm:mb-5 sm:text-3xl">Documentación</h2>
              <div className="space-y-3">
                {project.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.type}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        Ver
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </section>

            {/* Risk Notice */}
            <section className="rounded-2xl border border-warning/50 bg-warning/5 p-6 sm:p-7">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <h3 className="text-lg font-semibold sm:text-xl md:text-2xl">Riesgos y Avisos Legales</h3>
              </div>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                {project.riskNotes}
              </p>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base md:text-lg">
                Esta inversión conlleva riesgos. El valor de los tokens puede fluctuar. Lee toda la documentación antes
                de invertir. No inviertas más de lo que puedas permitirte perder.
              </p>
            </section>
          </div>

          {/* Sidebar - Purchase CTA */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20 space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                <div className="mb-6">
                  <p className="mb-1 text-sm text-muted-foreground">Precio por Token</p>
                  <p className="text-3xl font-bold">${project.pricePerTokenUSDT} USDT</p>
                </div>

                <div className="mb-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tokens Disponibles</span>
                    <span className="font-medium">{project.availableSupply.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Compra Mínima</span>
                    <span className="font-medium">{project.minBuy} tokens</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Compra Máxima</span>
                    <span className="font-medium">{project.maxBuy} tokens</span>
                  </div>
                </div>

                {project.status === "approved" ? (
                  <Button size="lg" className="w-full" asChild>
                    <Link href={`/project/${project.id}/buy`}>Comprar Tokens</Link>
                  </Button>
                ) : (
                  <Button size="lg" className="w-full" disabled>
                    No Disponible ({project.status})
                  </Button>
                )}

                <p className="mt-4 text-center text-xs text-muted-foreground sm:text-sm md:text-base">
                  Necesitas verificación KYC para comprar tokens
                </p>
              </div>

              {isFeatured && (
                <div className="flex justify-center">
                  <FeaturedDrawer currentProjectId={project.id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
