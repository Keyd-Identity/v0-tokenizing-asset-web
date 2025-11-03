"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useStore } from "@/lib/store"

interface FeaturedDrawerProps {
  currentProjectId: string
}

export function FeaturedDrawer({ currentProjectId }: FeaturedDrawerProps) {
  const { projects } = useStore()
  const featuredProjects = projects
    .filter((p) => p.featured && p.status === "approved" && p.id !== currentProjectId)
    .sort((a, b) => b.featuredScore - a.featuredScore)

  if (featuredProjects.length === 0) return null

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Star className="mr-2 h-4 w-4" />
          Ver otros destacados
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Proyectos Destacados</SheetTitle>
          <SheetDescription>Otros proyectos seleccionados por el equipo</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="block overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50"
            >
              <div className="relative aspect-video">
                <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
                {project.featuredTag && (
                  <Badge className="absolute right-2 top-2 bg-primary/90 backdrop-blur-sm">{project.featuredTag}</Badge>
                )}
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-semibold">{project.name}</h3>
                <p className="mb-2 text-sm text-muted-foreground">{project.category}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">${project.pricePerTokenUSDT} USDT</span>
                  {project.apyEstimated && <span className="text-success">{project.apyEstimated}% APY</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
