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
}

export interface Document {
  id: string
  name: string
  type: string
  url: string
}

export interface User {
  walletAddress: string | null
  kycVerified: boolean
  purchases: Purchase[]
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
