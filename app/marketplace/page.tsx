"use client"

import { useState, useMemo } from "react"
import { ProjectCard } from "@/components/project-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useStore } from "@/lib/store"
import { categories } from "@/lib/mock-data"
import { Search, SlidersHorizontal } from "lucide-react"
import { isFeaturedActive } from "@/lib/helpers"
import { useSearchParams } from "next/navigation"

export default function MarketplacePage() {
  const { projects } = useStore()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [showFilters, setShowFilters] = useState(false)
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(searchParams.get("featured") === "true")

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        if (project.status !== "approved") {
          return false
        }

        if (showOnlyFeatured && !isFeaturedActive(project)) {
          return false
        }

        // Category filter
        if (selectedCategory !== "All" && project.category !== selectedCategory) {
          return false
        }

        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          const matchesSearch =
            project.name.toLowerCase().includes(query) ||
            project.location.toLowerCase().includes(query) ||
            project.category.toLowerCase().includes(query)
          if (!matchesSearch) return false
        }

        // Price range filter
        const minPrice = priceRange.min ? Number.parseFloat(priceRange.min) : 0
        const maxPrice = priceRange.max ? Number.parseFloat(priceRange.max) : Number.POSITIVE_INFINITY
        if (project.pricePerTokenUSDT < minPrice || project.pricePerTokenUSDT > maxPrice) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        const aFeatured = isFeaturedActive(a)
        const bFeatured = isFeaturedActive(b)
        if (aFeatured && !bFeatured) return -1
        if (!aFeatured && bFeatured) return 1
        if (aFeatured && bFeatured) return b.featuredScore - a.featuredScore
        return b.salesUSDT - a.salesUSDT // Sort by sales for non-featured
      })
  }, [projects, selectedCategory, searchQuery, priceRange, showOnlyFeatured])

  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl">Marketplace</h1>
          <p className="text-sm text-muted-foreground sm:text-base">Explora proyectos tokenizados de alta calidad</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, ubicación o categoría..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:hidden w-full sm:w-auto">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-full space-y-4 lg:w-64 lg:block ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <Label htmlFor="featured-toggle" className="cursor-pointer font-semibold">
                  Solo destacados
                </Label>
                <Switch id="featured-toggle" checked={showOnlyFeatured} onCheckedChange={setShowOnlyFeatured} />
              </div>
              {showOnlyFeatured && filteredProjects.length === 0 && (
                <p className="mt-2 text-xs text-muted-foreground">Aún no hay proyectos destacados</p>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-4 font-semibold">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      selectedCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-4 font-semibold">Rango de Precio</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="min-price" className="text-xs text-muted-foreground">
                    Mínimo (USDT)
                  </Label>
                  <Input
                    id="min-price"
                    type="number"
                    placeholder="0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="max-price" className="text-xs text-muted-foreground">
                    Máximo (USDT)
                  </Label>
                  <Input
                    id="max-price"
                    type="number"
                    placeholder="Sin límite"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="mt-1"
                  />
                </div>
                {(priceRange.min || priceRange.max) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPriceRange({ min: "", max: "" })}
                    className="w-full"
                  >
                    Limpiar
                  </Button>
                )}
              </div>
            </div>
          </aside>

          {/* Projects Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredProjects.length} {filteredProjects.length === 1 ? "proyecto" : "proyectos"}
                {filteredProjects.length !== projects.filter((p) => p.status === "approved").length && " encontrados"}
              </p>
            </div>
            {filteredProjects.length > 0 ? (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-border">
                <div className="text-center">
                  <p className="text-lg font-medium">No se encontraron proyectos</p>
                  <p className="mt-1 text-sm text-muted-foreground">Intenta ajustar los filtros de búsqueda</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
