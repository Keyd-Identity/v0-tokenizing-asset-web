"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useStore } from "@/lib/store"
import { CheckCircle, XCircle, Pause, Play, Star, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Project } from "@/lib/types"

export function ProjectTableAdmin() {
  const { projects, updateProjectStatus, updateFeaturedStatus, addAuditLog, user } = useStore()
  const { toast } = useToast()
  const [filter, setFilter] = useState<"all" | "draft" | "pending" | "approved" | "paused">("all")
  const [editingFeatured, setEditingFeatured] = useState<Project | null>(null)
  const [featuredForm, setFeaturedForm] = useState({
    featured: false,
    score: 0,
    tag: undefined as "Nuevo" | "Top" | "Limitado" | "Alta demanda" | undefined,
    highlightUntil: "",
  })

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.status === filter)

  const handleStatusChange = (projectId: string, projectName: string, newStatus: "approved" | "paused" | "pending") => {
    updateProjectStatus(projectId, newStatus)
    addAuditLog({
      action: `Proyecto ${newStatus === "approved" ? "aprobado" : newStatus === "paused" ? "pausado" : "marcado como pendiente"}`,
      by: "Admin Principal",
      byRole: user.role,
      date: new Date().toISOString(),
      refId: projectId,
      details: projectName,
    })
    toast({
      title: "Estado actualizado",
      description: `${projectName} ahora está ${newStatus === "approved" ? "aprobado" : newStatus === "paused" ? "pausado" : "pendiente"}`,
    })
  }

  const openFeaturedDialog = (project: Project) => {
    setEditingFeatured(project)
    setFeaturedForm({
      featured: project.featured,
      score: project.featuredScore,
      tag: project.featuredTag,
      highlightUntil: project.highlightUntil || "",
    })
  }

  const handleFeaturedSave = () => {
    if (!editingFeatured) return

    if (featuredForm.featured && editingFeatured.status !== "approved") {
      toast({
        title: "Error",
        description: "Solo los proyectos aprobados pueden ser destacados",
        variant: "destructive",
      })
      return
    }

    updateFeaturedStatus(
      editingFeatured.id,
      featuredForm.featured,
      featuredForm.score,
      featuredForm.tag,
      featuredForm.highlightUntil || undefined,
    )

    addAuditLog({
      action: featuredForm.featured ? "Proyecto marcado como destacado" : "Proyecto removido de destacados",
      by: "Admin Principal",
      byRole: user.role,
      date: new Date().toISOString(),
      refId: editingFeatured.id,
      details: `${editingFeatured.name} - Score: ${featuredForm.score}`,
    })

    toast({
      title: "Destacado actualizado",
      description: `${editingFeatured.name} ${featuredForm.featured ? "ahora es destacado" : "ya no es destacado"}`,
    })

    setEditingFeatured(null)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      draft: "secondary",
      pending: "outline",
      approved: "default",
      paused: "destructive",
    }
    return <Badge variant={variants[status] || "default"}>{status}</Badge>
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["all", "draft", "pending", "approved", "paused"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(status as any)}
          >
            {status === "all" ? "Todos" : status}
          </Button>
        ))}
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proyecto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Supply</TableHead>
              <TableHead>Ventas</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell>{getStatusBadge(project.status)}</TableCell>
                <TableCell>
                  {project.featured ? (
                    <Badge className="bg-primary">
                      <Star className="mr-1 h-3 w-3 fill-current" />
                      Sí
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )}
                </TableCell>
                <TableCell>{project.featured ? project.featuredScore : "-"}</TableCell>
                <TableCell>
                  {project.availableSupply} / {project.totalSupply}
                </TableCell>
                <TableCell>${project.salesUSDT.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="ghost" onClick={() => openFeaturedDialog(project)}>
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Gestionar Destacado</DialogTitle>
                          <DialogDescription>{project.name}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="featured-switch">Destacado</Label>
                            <Switch
                              id="featured-switch"
                              checked={featuredForm.featured}
                              onCheckedChange={(checked) => setFeaturedForm({ ...featuredForm, featured: checked })}
                            />
                          </div>
                          {project.status !== "approved" && featuredForm.featured && (
                            <p className="text-sm text-destructive">
                              ⚠️ Solo los proyectos aprobados pueden ser destacados
                            </p>
                          )}
                          {featuredForm.featured && (
                            <>
                              <div className="space-y-2">
                                <Label htmlFor="score">Score (0-100)</Label>
                                <Input
                                  id="score"
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={featuredForm.score}
                                  onChange={(e) =>
                                    setFeaturedForm({ ...featuredForm, score: Number.parseInt(e.target.value) || 0 })
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="tag">Tag</Label>
                                <Select
                                  value={featuredForm.tag}
                                  onValueChange={(value) =>
                                    setFeaturedForm({
                                      ...featuredForm,
                                      tag: value as "Nuevo" | "Top" | "Limitado" | "Alta demanda",
                                    })
                                  }
                                >
                                  <SelectTrigger id="tag">
                                    <SelectValue placeholder="Seleccionar tag" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Nuevo">Nuevo</SelectItem>
                                    <SelectItem value="Top">Top</SelectItem>
                                    <SelectItem value="Limitado">Limitado</SelectItem>
                                    <SelectItem value="Alta demanda">Alta demanda</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="highlight-until">Destacar hasta (opcional)</Label>
                                <Input
                                  id="highlight-until"
                                  type="datetime-local"
                                  value={featuredForm.highlightUntil}
                                  onChange={(e) => setFeaturedForm({ ...featuredForm, highlightUntil: e.target.value })}
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <DialogFooter>
                          <Button onClick={handleFeaturedSave}>Guardar</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    {project.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStatusChange(project.id, project.name, "approved")}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStatusChange(project.id, project.name, "paused")}
                        >
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    )}
                    {project.status === "approved" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusChange(project.id, project.name, "paused")}
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    )}
                    {project.status === "paused" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusChange(project.id, project.name, "approved")}
                      >
                        <Play className="h-4 w-4 text-green-500" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
