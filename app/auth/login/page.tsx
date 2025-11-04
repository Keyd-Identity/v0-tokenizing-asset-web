"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const returnUrl = searchParams.get("returnUrl") || window.location.origin + "/auth/callback"
    const keydPlatformUrl = process.env.NEXT_PUBLIC_KEYD_PLATFORM_URL || "https://localhost:3001"
    const redirectUrl = `${keydPlatformUrl}?returnUrl=${encodeURIComponent(returnUrl)}`
    
    window.location.href = redirectUrl
  }, [searchParams])

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold">Redirigiendo a Keyd Platform...</h1>
        <p className="text-muted-foreground">Por favor, espera mientras te redirigimos al inicio de sesión</p>
      </div>
    </div>
  )
}
