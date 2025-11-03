"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useStore } from "@/lib/store"
import { Menu, Home, Store, Star, LayoutDashboard, User, LogIn, LogOut, ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [panelsOpen, setPanelsOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useStore()

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  const closeMenu = () => {
    setOpen(false)
    setPanelsOpen(false)
  }

  const isActive = (path: string) => pathname === path

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú" aria-controls="mobile-menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" id="mobile-menu" aria-modal="true">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-2">
          <Link
            href="/"
            onClick={closeMenu}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive("/") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
            }`}
          >
            <Home className="h-5 w-5" />
            Home
          </Link>

          <Link
            href="/marketplace"
            onClick={closeMenu}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive("/marketplace") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
            }`}
          >
            <Store className="h-5 w-5" />
            Marketplace
          </Link>

          <Link
            href="/marketplace?featured=true"
            onClick={closeMenu}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              pathname === "/marketplace" &&
              typeof window !== "undefined" &&
              window.location.search.includes("featured=true")
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }`}
          >
            <Star className="h-5 w-5" />
            Proyectos Destacados
          </Link>

          <Collapsible open={panelsOpen} onOpenChange={setPanelsOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-secondary">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-5 w-5" />
                Paneles
              </div>
              <ChevronRight className={`h-4 w-4 transition-transform ${panelsOpen ? "rotate-90" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-8 mt-1 space-y-1">
              <Link
                href="/panels/admin"
                onClick={closeMenu}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive("/panels/admin") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
              >
                Admin
              </Link>
              <Link
                href="/panels/investor"
                onClick={closeMenu}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive("/panels/investor") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
              >
                Inversor
              </Link>
              <Link
                href="/panels/promoter"
                onClick={closeMenu}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive("/panels/promoter") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                }`}
              >
                Promotor
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <Link
            href="/account"
            onClick={closeMenu}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive("/account") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
            }`}
          >
            <User className="h-5 w-5" />
            Mi Cuenta
          </Link>

          <div className="my-4 border-t border-border" />

          {user.role ? (
            <Button variant="ghost" onClick={handleLogout} className="justify-start gap-3">
              <LogOut className="h-5 w-5" />
              Cerrar sesión
            </Button>
          ) : (
            <Link href="/auth/login" onClick={closeMenu}>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <LogIn className="h-5 w-5" />
                Login
              </Button>
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
