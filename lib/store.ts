"use client"

import { create } from "zustand"
import type { User, Purchase } from "./types"
import { mockUser, mockProjects } from "./mock-data"

interface AppState {
  user: User
  projects: typeof mockProjects
  connectWallet: (address: string) => void
  disconnectWallet: () => void
  addPurchase: (purchase: Purchase) => void
  updateProjectSupply: (projectId: string, quantity: number) => void
}

export const useStore = create<AppState>((set) => ({
  user: mockUser,
  projects: mockProjects,
  connectWallet: (address: string) =>
    set((state) => ({
      user: { ...state.user, walletAddress: address },
    })),
  disconnectWallet: () =>
    set((state) => ({
      user: { ...state.user, walletAddress: null },
    })),
  addPurchase: (purchase: Purchase) =>
    set((state) => ({
      user: {
        ...state.user,
        purchases: [purchase, ...state.user.purchases],
      },
    })),
  updateProjectSupply: (projectId: string, quantity: number) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, availableSupply: p.availableSupply - quantity } : p,
      ),
    })),
}))
