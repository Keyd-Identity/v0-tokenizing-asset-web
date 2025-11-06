"use client"

import { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { Loader2 } from "lucide-react"

function LoginContent() {
  const router = useRouter()
  const { loginWithKeydData } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [provider, setProvider] = useState<"google" | "apple" | null>(null)

  const handleLogin = async (provider: "google" | "apple") => {
    setIsLoading(true)
    setProvider(provider)

    // Simular un pequeño delay para que parezca más real
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simular datos de usuario según el proveedor
    const mockUserData = {
      email: provider === "google" ? "usuario@gmail.com" : "usuario@icloud.com",
      wallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      name: provider === "google" ? "Usuario Google" : "Usuario Apple",
    }

    // Iniciar sesión con rol de inversor por defecto
    loginWithKeydData("investor", mockUserData)

    // Redirigir al panel de inversor
    router.push("/panels/investor")
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">
            Elige tu método de autenticación preferido
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => handleLogin("google")}
            disabled={isLoading}
            className="w-full"
            variant="outline"
            size="lg"
          >
            {isLoading && provider === "google" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continuar con Google
          </Button>

          <Button
            onClick={() => handleLogin("apple")}
            disabled={isLoading}
            className="w-full"
            variant="outline"
            size="lg"
          >
            {isLoading && provider === "apple" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            )}
            Continuar con Apple
          </Button>
        </CardContent>
      </Card>
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
