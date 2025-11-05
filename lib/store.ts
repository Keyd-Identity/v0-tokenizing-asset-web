"use client"

import { create } from "zustand"
import type {
  User,
  Purchase,
  Project,
  Order,
  KycRecord,
  MarketplaceFees,
  AuditLog,
  PromoterBalance,
  FeaturedTelemetry,
} from "./types"
import {
  mockUser,
  mockProjects,
  mockOrders,
  mockKycRecords,
  mockMarketplaceFees,
  mockAuditLogs,
  mockPromoterBalances,
} from "./mock-data"

interface AppState {
  user: User
  projects: Project[]
  orders: Order[]
  kycRecords: KycRecord[]
  fees: MarketplaceFees
  auditLogs: AuditLog[]
  promoterBalances: PromoterBalance[]
  featuredTelemetry: FeaturedTelemetry[]
  setUserRole: (role: "admin" | "investor" | "promoter" | null) => void
  login: (role: "admin" | "investor" | "promoter") => void
  loginWithKeydData: (role: "admin" | "investor" | "promoter", keydData?: { email?: string; wallet?: string; name?: string }) => void
  logout: () => void
  connectWallet: (address: string) => void
  disconnectWallet: () => void
  addPurchase: (purchase: Purchase) => void
  updateProjectSupply: (projectId: string, quantity: number) => void
  updateProjectStatus: (projectId: string, status: "draft" | "pending" | "approved" | "paused") => void
  createProject: (project: Omit<Project, "id">) => void
  updateKycStatus: (userId: string, status: "verified" | "pending" | "rejected") => void
  updateMarketplaceFee: (bps: number) => void
  addAuditLog: (log: Omit<AuditLog, "id">) => void
  updateProject: (projectId: string, updates: Partial<Project>) => void
  withdrawBalance: (promoterId: string, amount: number) => void
  updateFeaturedStatus: (
    projectId: string,
    featured: boolean,
    score?: number,
    tag?: "Nuevo" | "Top" | "Limitado" | "Alta demanda",
    highlightUntil?: string,
  ) => void
  trackFeaturedClick: (projectId: string, type: "view" | "buy") => void
}

export const useStore = create<AppState>((set) => ({
  user: mockUser,
  projects: mockProjects,
  orders: mockOrders,
  kycRecords: mockKycRecords,
  fees: mockMarketplaceFees,
  auditLogs: mockAuditLogs,
  promoterBalances: mockPromoterBalances,
  featuredTelemetry: [],

  setUserRole: (role) =>
    set((state) => ({
      user: { ...state.user, role },
    })),

  login: (role) =>
    set((state) => ({
      user: {
        ...state.user,
        role,
        id: role === "admin" ? "admin-1" : role === "investor" ? "investor-1" : "promoter-1",
      },
    })),

  loginWithKeydData: (role: "admin" | "investor" | "promoter", keydData?: { email?: string; wallet?: string; name?: string }) =>
    set((state) => ({
      user: {
        ...state.user,
        role,
        id: role === "admin" ? "admin-1" : role === "investor" ? "investor-1" : "promoter-1",
        walletAddress: keydData?.wallet || state.user.walletAddress,
      },
    })),

  logout: () =>
    set((state) => ({
      user: { ...state.user, role: null, walletAddress: null },
    })),

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

  updateProjectStatus: (projectId: string, status) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === projectId ? { ...p, status } : p)),
    })),

  createProject: (project) =>
    set((state) => ({
      projects: [...state.projects, { ...project, id: `project-${Date.now()}` }],
    })),

  updateKycStatus: (userId: string, status) =>
    set((state) => ({
      kycRecords: state.kycRecords.map((record) => (record.userId === userId ? { ...record, status } : record)),
    })),

  updateMarketplaceFee: (bps: number) =>
    set((state) => ({
      fees: { ...state.fees, bps },
    })),

  addAuditLog: (log) =>
    set((state) => ({
      auditLogs: [{ ...log, id: `log-${Date.now()}` }, ...state.auditLogs],
    })),

  updateProject: (projectId: string, updates) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === projectId ? { ...p, ...updates } : p)),
    })),

  withdrawBalance: (promoterId: string, amount: number) =>
    set((state) => ({
      promoterBalances: state.promoterBalances.map((balance) =>
        balance.promoterId === promoterId ? { ...balance, availableUSDT: balance.availableUSDT - amount } : balance,
      ),
    })),

  updateFeaturedStatus: (projectId, featured, score = 0, tag, highlightUntil) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              featured,
              featuredScore: featured ? score : 0,
              featuredTag: featured ? tag : undefined,
              highlightUntil: featured ? highlightUntil : undefined,
            }
          : p,
      ),
    })),

  trackFeaturedClick: (projectId, type) =>
    set((state) => {
      const existing = state.featuredTelemetry.find((t) => t.projectId === projectId)
      if (existing) {
        return {
          featuredTelemetry: state.featuredTelemetry.map((t) =>
            t.projectId === projectId
              ? {
                  ...t,
                  viewClicks: type === "view" ? t.viewClicks + 1 : t.viewClicks,
                  buyClicks: type === "buy" ? t.buyClicks + 1 : t.buyClicks,
                }
              : t,
          ),
        }
      }
      return {
        featuredTelemetry: [
          ...state.featuredTelemetry,
          {
            projectId,
            viewClicks: type === "view" ? 1 : 0,
            buyClicks: type === "buy" ? 1 : 0,
          },
        ],
      }
    }),
}))
