"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export default function ForbiddenPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <h1 className="mb-2 text-4xl font-bold">403</h1>
        <h2 className="mb-4 text-2xl font-semibold">Acceso Denegado</h2>
        <p className="mb-8 text-muted-foreground">No tienes permisos para acceder a esta página.</p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">Volver al Inicio</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/auth/login">Cambiar Rol</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
