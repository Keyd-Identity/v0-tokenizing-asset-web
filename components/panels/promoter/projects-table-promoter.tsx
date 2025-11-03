"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStore } from "@/lib/store"
import { Edit, Pause, Play, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ProjectsTablePromoter() {
  const { projects, user, updateProject, updateProjectStatus, addAuditLog } = useStore()
  const { toast } = useToast()
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [newPrice, setNewPrice] = useState("")

  const promoterProjects = projects.filter((p) => p.ownerPromoterId === user.id)

  const handlePriceUpdate = (projectId: string, projectName: string) => {
    const price = Number.parseFloat(newPrice)
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Error",
        description: "El precio debe ser mayor a 0",
        variant: "destructive",
      })
      return
    }

    updateProject(projectId, { pricePerTokenUSDT: price })
    addAuditLog({
      action: "Precio actualizado",
      by: "Promotor",
      byRole: user.role,
      date: new Date().toISOString(),
      refId: projectId,
      details: `${projectName} - Nuevo precio: $${price}`,
    })
    toast({
      title: "Precio actualizado",
      description: `${projectName} ahora cuesta $${price} por token`,
    })
    setEditingProject(null)
    setNewPrice("")
  }

  const handleToggleStatus = (projectId: string, projectName: string, currentStatus: string) => {
    const newStatus = currentStatus === "approved" ? "paused" : "approved"
    updateProjectStatus(projectId, newStatus)
    addAuditLog({
      action: `Proyecto ${newStatus === "approved" ? "reanudado" : "pausado"}`,
      by: "Promotor",
      byRole: user.role,
      date: new Date().toISOString(),
      refId: projectId,
      details: projectName,
    })
    toast({
      title: "Estado actualizado",
      description: `${projectName} está ahora ${newStatus === "approved" ? "activo" : "pausado"}`,
    })
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
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proyecto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Precio/Token</TableHead>
            <TableHead>Supply</TableHead>
            <TableHead>Ventas</TableHead>
            <TableHead>Compradores</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {promoterProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{getStatusBadge(project.status)}</TableCell>
              <TableCell>${project.pricePerTokenUSDT}</TableCell>
              <TableCell>
                {project.availableSupply} / {project.totalSupply}
              </TableCell>
              <TableCell className="font-semibold">${project.salesUSDT.toLocaleString()}</TableCell>
              <TableCell>{project.buyersCount}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingProject(project.id)
                          setNewPrice(project.pricePerTokenUSDT.toString())
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Actualizar Precio</DialogTitle>
                        <DialogDescription>{project.name}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="price">Precio por Token (USDT)</Label>
                          <Input
                            id="price"
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            placeholder="100"
                          />
                        </div>
                        <Button onClick={() => handlePriceUpdate(project.id, project.name)} className="w-full">
                          Actualizar Precio
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {project.status === "approved" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleToggleStatus(project.id, project.name, project.status)}
                    >
                      <Pause className="h-4 w-4" />
                    </Button>
                  )}
                  {project.status === "paused" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleToggleStatus(project.id, project.name, project.status)}
                    >
                      <Play className="h-4 w-4 text-green-500" />
                    </Button>
                  )}

                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/project/${project.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
