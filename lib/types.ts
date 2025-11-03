export interface Project {
  id: string
  name: string
  category: string
  location: string
  image: string
  pricePerTokenUSDT: number
  totalSupply: number
  availableSupply: number
  minBuy: number
  maxBuy: number
  apyEstimated?: number
  riskNotes: string
  description: string
  documents: Document[]
  status: "draft" | "pending" | "approved" | "paused"
  ownerPromoterId?: string
  salesUSDT: number
  buyersCount: number
  featured: boolean
  featuredScore: number
  featuredTag?: "Nuevo" | "Top" | "Limitado" | "Alta demanda"
  highlightUntil?: string
}

export interface Document {
  id: string
  name: string
  type: string
  url: string
}

export interface User {
  id: string
  walletAddress: string | null
  kycVerified: boolean
  purchases: Purchase[]
  role: "admin" | "investor" | "promoter" | null
}

export interface Purchase {
  id: string
  projectId: string
  projectName: string
  quantity: number
  pricePerToken: number
  total: number
  date: string
  status: "completed" | "pending" | "failed"
}

export interface Order {
  id: string
  projectId: string
  projectName: string
  investorId: string
  investorWallet: string
  quantity: number
  pricePerToken: number
  total: number
  createdAt: string
  status: "success" | "failed" | "pending"
}

export interface KycRecord {
  userId: string
  userName: string
  role: "admin" | "investor" | "promoter" | null
  status: "verified" | "pending" | "rejected"
  submittedAt: string
}

export interface MarketplaceFees {
  bps: number
  accruedUSDT: number
}

export interface Payout {
  id: string
  investorId: string
  projectId: string
  projectName: string
  amount: number
  date: string
  status: "paid" | "pending"
}

export interface AuditLog {
  id: string
  action: string
  by: string
  byRole: "admin" | "investor" | "promoter" | null
  date: string
  refId?: string
  details?: string
}

export interface PromoterBalance {
  promoterId: string
  availableUSDT: number
  pendingUSDT: number
}

export interface InvestorHolding {
  projectId: string
  projectName: string
  category: string
  tokensOwned: number
  avgCost: number
  currentPrice: number
  totalValue: number
  pnl: number
  pnlPercent: number
}

export interface FeaturedTelemetry {
  projectId: string
  viewClicks: number
  buyClicks: number
}
