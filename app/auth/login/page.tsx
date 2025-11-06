"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function LoginContent() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const returnUrl = searchParams.get("returnUrl") || window.location.origin + "/auth/callback"
    const baseUrl = process.env.NEXT_PUBLIC_KEYD_PLATFORM_URL || "https://kyc-platform-production-1aa2.up.railway.app/auth/login"
    const url = new URL(baseUrl)
    url.searchParams.set("returnUrl", returnUrl)
    window.location.href = url.toString()
  }, [searchParams])

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold">Redirigiendo a la plataforma de identidad...</h1>
        <p className="text-muted-foreground">Por favor, espera mientras te redirigimos al inicio de sesión</p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold">Cargando...</h1>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
