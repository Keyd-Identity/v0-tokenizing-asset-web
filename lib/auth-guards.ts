"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "./store"

export function useRequireAuth() {
  const router = useRouter()
  const { user } = useStore()

  useEffect(() => {
    if (!user.role) {
      router.push("/auth/login")
    }
  }, [user.role, router])

  return user
}

export function useRequireRole(requiredRole: "admin" | "investor" | "promoter") {
  const router = useRouter()
  const { user } = useStore()

  useEffect(() => {
    if (!user.role) {
      router.push("/auth/login")
    } else if (user.role !== requiredRole) {
      router.push("/403")
    }
  }, [user.role, requiredRole, router])

  return user
}
