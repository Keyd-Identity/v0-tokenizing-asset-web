import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectFacts } from "@/components/project-facts"
import { mockProjects } from "@/lib/mock-data"
import { MapPin, FileText, AlertTriangle, ArrowLeft } from "lucide-react"

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = mockProjects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/marketplace">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Marketplace
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[400px] overflow-hidden border-b border-border">
        <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 pb-8">
            <Badge className="mb-3">{project.category}</Badge>
            <h1 className="mb-2 text-balance text-4xl font-bold md:text-5xl">{project.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{project.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Description */}
            <section>
              <h2 className="mb-4 text-2xl font-bold">Descripción del Proyecto</h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">{project.description}</p>
            </section>

            {/* Key Facts */}
            <section>
              <h2 className="mb-4 text-2xl font-bold">Datos Clave</h2>
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
              <h2 className="mb-4 text-2xl font-bold">Documentación</h2>
              <div className="space-y-3">
                {project.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
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
            <section className="rounded-2xl border border-warning/50 bg-warning/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <h3 className="text-lg font-semibold">Riesgos y Avisos Legales</h3>
              </div>
              <p className="text-pretty leading-relaxed text-muted-foreground">{project.riskNotes}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Esta inversión conlleva riesgos. El valor de los tokens puede fluctuar. Lee toda la documentación antes
                de invertir. No inviertas más de lo que puedas permitirte perder.
              </p>
            </section>
          </div>

          {/* Sidebar - Purchase CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-2xl border border-border bg-card p-6">
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

              <Button size="lg" className="w-full" asChild>
                <Link href={`/project/${project.id}/buy`}>Comprar Tokens</Link>
              </Button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Necesitas verificación KYC para comprar tokens
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
