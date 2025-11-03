"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/types"
import { MapPin, TrendingUp, Settings, Star } from "lucide-react"
import { useStore } from "@/lib/store"
import { isFeaturedActive } from "@/lib/helpers"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { user } = useStore()
  const availabilityPercentage = (project.availableSupply / project.totalSupply) * 100
  const isPromoterOwner = user.role === "promoter" && project.ownerPromoterId === user.id
  const isFeatured = isFeaturedActive(project)

  return (
    <div
      className={`group overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-lg ${
        isFeatured ? "border-primary/50 shadow-md shadow-primary/10" : "border-border hover:border-primary/50"
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {project.category}
          </Badge>
          {isFeatured && (
            <Badge className="bg-primary/90 backdrop-blur-sm">
              <Star className="mr-1 h-3 w-3 fill-current" />
              Destacado
            </Badge>
          )}
        </div>
        {project.status !== "approved" && (
          <div className="absolute left-3 top-3">
            <Badge
              variant={project.status === "paused" ? "destructive" : "outline"}
              className="bg-background/90 backdrop-blur-sm"
            >
              {project.status}
            </Badge>
          </div>
        )}
        {isFeatured && project.featuredTag && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {project.featuredTag}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-balance text-lg font-semibold leading-tight">{project.name}</h3>
        </div>
        <div className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{project.location}</span>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Precio por Token</p>
            <p className="text-lg font-semibold">${project.pricePerTokenUSDT} USDT</p>
          </div>
          {project.apyEstimated && (
            <div>
              <p className="text-xs text-muted-foreground">APY Estimado</p>
              <p className="flex items-center gap-1 text-lg font-semibold text-success">
                <TrendingUp className="h-4 w-4" />
                {project.apyEstimated}%
              </p>
            </div>
          )}
        </div>
        <div className="mb-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Disponibilidad</span>
            <span className="font-medium">
              {project.availableSupply.toLocaleString()} / {project.totalSupply.toLocaleString()}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${availabilityPercentage}%` }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1" asChild>
            <Link href={`/project/${project.id}`}>Ver Proyecto</Link>
          </Button>
          {isPromoterOwner && (
            <Button variant="outline" size="icon" asChild>
              <Link href="/panels/promoter">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
