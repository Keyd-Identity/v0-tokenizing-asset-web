"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { Shield, TrendingUp, Building2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useStore()
  const [selectedRole, setSelectedRole] = useState<"admin" | "investor" | "promoter" | null>(null)

  const handleLogin = () => {
    if (selectedRole) {
      login(selectedRole)
      router.push(
        selectedRole === "admin"
          ? "/panels/admin"
          : selectedRole === "investor"
            ? "/panels/investor"
            : "/panels/promoter",
      )
    }
  }

  const roles = [
    {
      id: "admin" as const,
      name: "Administrador",
      description: "Gestión completa del marketplace",
      icon: Shield,
    },
    {
      id: "investor" as const,
      name: "Inversor",
      description: "Compra tokens y gestiona tu portafolio",
      icon: TrendingUp,
    },
    {
      id: "promoter" as const,
      name: "Promotor",
      description: "Crea y gestiona proyectos tokenizados",
      icon: Building2,
    },
  ]

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">Iniciar Sesión</h1>
          <p className="text-muted-foreground">Selecciona tu rol para acceder a la plataforma (Demo)</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <Card
                key={role.id}
                className={`cursor-pointer border-2 p-6 transition-all hover:border-primary ${
                  selectedRole === role.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{role.name}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Button size="lg" onClick={handleLogin} disabled={!selectedRole}>
            Continuar como{" "}
            {selectedRole === "admin"
              ? "Administrador"
              : selectedRole === "investor"
                ? "Inversor"
                : selectedRole === "promoter"
                  ? "Promotor"
                  : "..."}
          </Button>
        </div>
      </div>
    </div>
  )
}
