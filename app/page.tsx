"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp, Lock } from "lucide-react"
import { useStore } from "@/lib/store"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { getFeaturedProjects } from "@/lib/helpers"
import { useMemo } from "react"

export default function HomePage() {
  const { user, projects } = useStore()

  const featuredProjects = useMemo(() => {
    const featured = getFeaturedProjects(projects)
    return featured.slice(0, 8)
  }, [projects])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-1 items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Tokenizadora de Activos
            </h1>
            <p className="mt-4 text-pretty text-base text-muted-foreground sm:mt-6 sm:text-lg md:text-xl">
              Invierte en activos reales tokenizados. Accede a oportunidades de inversión en inmuebles, energía
              renovable y más, con total transparencia y seguridad blockchain.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/marketplace">
                  Ver Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {!user.role ? (
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                  <Link href="/auth/login">Iniciar Sesión</Link>
                </Button>
              ) : (
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                  <Link
                    href={
                      user.role === "admin"
                        ? "/panels/admin"
                        : user.role === "investor"
                          ? "/panels/investor"
                          : "/panels/promoter"
                    }
                  >
                    Mi Panel
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="border-b border-border py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Proyectos Destacados</h2>
                <p className="mt-1 text-sm text-muted-foreground sm:mt-2 sm:text-base">
                  Seleccionados por el equipo según demanda y liquidez
                </p>
              </div>
              {featuredProjects.length > 8 && (
                <Button variant="ghost" asChild className="hidden md:flex">
                  <Link href="/marketplace?featured=true">
                    Ver todos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
            <FeaturedCarousel projects={featuredProjects} />
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="border-b border-border py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 sm:h-14 sm:w-14">
                <Shield className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
              </div>
              <h3 className="mb-2 text-lg font-semibold sm:text-xl">Seguridad Blockchain</h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                Todos los activos están respaldados por contratos inteligentes auditados en la red Polygon.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 sm:h-14 sm:w-14">
                <TrendingUp className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
              </div>
              <h3 className="mb-2 text-lg font-semibold sm:text-xl">Rentabilidad Atractiva</h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                Proyectos seleccionados con APY estimados entre 7% y 12% anuales.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 sm:h-14 sm:w-14">
                <Lock className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
              </div>
              <h3 className="mb-2 text-lg font-semibold sm:text-xl">KYC Verificado</h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                Proceso de verificación de identidad para cumplir con regulaciones y proteger tu inversión.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 text-center sm:p-8 md:p-12">
            <h2 className="text-balance text-2xl font-bold sm:text-3xl md:text-4xl">Comienza a invertir hoy</h2>
            <p className="mt-3 text-pretty text-sm text-muted-foreground sm:mt-4 sm:text-base">
              Explora nuestro marketplace y descubre oportunidades de inversión en activos tokenizados de alta calidad.
            </p>
            <Button size="lg" className="mt-6 w-full sm:mt-8 sm:w-auto" asChild>
              <Link href="/marketplace">
                Ir al Marketplace
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
