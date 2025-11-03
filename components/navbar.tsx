"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useStore } from "@/lib/store"
import { Wallet, ChevronDown, LayoutDashboard, LogOut } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useStore()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">T</span>
            </div>
            <span className="text-lg font-semibold">Tokenizadora</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/marketplace"
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                pathname === "/marketplace" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Marketplace
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=open]:text-foreground">
                Paneles
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/panels/admin" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Admin
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/panels/investor" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Inversor
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/panels/promoter" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Promotor
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/account"
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                pathname === "/account" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Mi Cuenta
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {user.walletAddress ? (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-mono">
                {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
              </span>
            </div>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/account">Conectar Wallet</Link>
            </Button>
          )}
          {user.role && (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
