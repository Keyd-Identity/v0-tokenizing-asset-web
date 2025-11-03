"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, TrendingUp, MapPin } from "lucide-react"
import type { Project } from "@/lib/types"
import { useStore } from "@/lib/store"

interface FeaturedCarouselProps {
  projects: Project[]
}

export function FeaturedCarousel({ projects }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { trackFeaturedClick } = useStore()

  if (projects.length === 0) return null

  const currentProject = projects[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  }

  const handleViewClick = () => {
    trackFeaturedClick(currentProject.id, "view")
  }

  const handleBuyClick = () => {
    trackFeaturedClick(currentProject.id, "buy")
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={currentProject.image || "/placeholder.svg"}
            alt={currentProject.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                Destacado
              </Badge>
              {currentProject.featuredTag && (
                <Badge variant="secondary" className="bg-secondary/80">
                  {currentProject.featuredTag}
                </Badge>
              )}
              <Badge variant="outline">{currentProject.category}</Badge>
            </div>

            <h2 className="mb-2 text-balance text-2xl font-bold md:text-4xl lg:text-5xl">{currentProject.name}</h2>

            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground md:text-base">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {currentProject.location}
              </div>
              {currentProject.apyEstimated && (
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  {currentProject.apyEstimated}% APY
                </div>
              )}
              <div>
                <span className="font-semibold text-foreground">${currentProject.pricePerTokenUSDT}</span> por token
              </div>
              <div>
                <span className="font-semibold text-foreground">{currentProject.availableSupply.toLocaleString()}</span>{" "}
                tokens disponibles
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild onClick={handleViewClick}>
                <Link href={`/project/${currentProject.id}`}>Ver proyecto</Link>
              </Button>
              <Button size="lg" variant="outline" asChild onClick={handleBuyClick}>
                <Link href={`/project/${currentProject.id}/buy`}>Comprar tokens</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {projects.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={goToPrevious}
            aria-label="Proyecto anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={goToNext}
            aria-label="Siguiente proyecto"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="mt-4 flex justify-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                }`}
                aria-label={`Ir al proyecto ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
