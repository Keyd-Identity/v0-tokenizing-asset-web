"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useStore } from "@/lib/store"

export default function CallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { loginWithKeydData } = useStore()
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing")

  useEffect(() => {
    const token = searchParams.get("token")
    
    if (!token) {
      setStatus("error")
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
      return
    }

    try {
      const decodedData = JSON.parse(atob(decodeURIComponent(token)))
      
      if (decodedData.authenticated) {
        const role = decodedData.role || "investor"
        const userData = decodedData.user || {}
        
        loginWithKeydData(role as "admin" | "investor" | "promoter", {
          email: userData.email,
          wallet: userData.wallet,
          name: userData.name,
        })
        
        setStatus("success")
        
        setTimeout(() => {
          const redirectPath = role === "admin"
            ? "/panels/admin"
            : role === "investor"
              ? "/panels/investor"
              : "/panels/promoter"
          
          router.push(redirectPath)
        }, 1000)
      } else {
        setStatus("error")
        setTimeout(() => {
          router.push("/auth/login")
        }, 2000)
      }
    } catch (error) {
      setStatus("error")
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    }
  }, [searchParams, router, loginWithKeydData])

  if (status === "processing") {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold">Procesando autenticación...</h1>
          <p className="text-muted-foreground">Por favor, espera mientras verificamos tu sesión</p>
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold text-destructive">Error de autenticación</h1>
          <p className="text-muted-foreground">Redirigiendo al inicio de sesión...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-green-600">¡Autenticación exitosa!</h1>
        <p className="text-muted-foreground">Redirigiendo a tu panel...</p>
      </div>
    </div>
  )
}
