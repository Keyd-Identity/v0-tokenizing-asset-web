import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp, Lock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-1 items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-balance text-5xl font-bold tracking-tight md:text-7xl">Tokenizadora de Activos</h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl">
              Invierte en activos reales tokenizados. Accede a oportunidades de inversión en inmuebles, energía
              renovable y más, con total transparencia y seguridad blockchain.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/marketplace">
                  Ver Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/marketplace">Explorar Proyectos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Seguridad Blockchain</h3>
              <p className="text-muted-foreground">
                Todos los activos están respaldados por contratos inteligentes auditados en la red Polygon.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <TrendingUp className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Rentabilidad Atractiva</h3>
              <p className="text-muted-foreground">Proyectos seleccionados con APY estimados entre 7% y 12% anuales.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">KYC Verificado</h3>
              <p className="text-muted-foreground">
                Proceso de verificación de identidad para cumplir con regulaciones y proteger tu inversión.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center md:p-12">
            <h2 className="text-balance text-3xl font-bold md:text-4xl">Comienza a invertir hoy</h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Explora nuestro marketplace y descubre oportunidades de inversión en activos tokenizados de alta calidad.
            </p>
            <Button size="lg" className="mt-8" asChild>
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
