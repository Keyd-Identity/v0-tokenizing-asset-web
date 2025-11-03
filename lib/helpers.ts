import type { Project } from "./types"

export function isFeaturedActive(project: Project): boolean {
  if (!project.featured) return false
  if (!project.highlightUntil) return true
  return new Date() < new Date(project.highlightUntil)
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects
    .filter((p) => p.status === "approved" && isFeaturedActive(p))
    .sort((a, b) => b.featuredScore - a.featuredScore)
}
