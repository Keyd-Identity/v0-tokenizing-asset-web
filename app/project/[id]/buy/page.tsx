import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BuyForm } from "@/components/buy-form"
import { SummaryBox } from "@/components/summary-box"
import { mockProjects } from "@/lib/mock-data"
import { ArrowLeft } from "lucide-react"

interface BuyPageProps {
  params: Promise<{ id: string }>
}

export default async function BuyPage({ params }: BuyPageProps) {
  const { id } = await params
  const project = mockProjects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/project/${project.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Volver al Proyecto</span>
              <span className="sm:hidden">Volver</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Comprar Tokens</h1>
          <p className="text-sm text-muted-foreground sm:text-base">{project.name}</p>
        </div>

        {/* Buy Form */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 md:p-8">
              <BuyForm project={project} />
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20">
              <SummaryBox project={project} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
