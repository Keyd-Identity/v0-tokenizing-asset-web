"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStore } from "@/lib/store"

export function SalesTable() {
  const { orders, projects, user } = useStore()

  const promoterProjectIds = projects.filter((p) => p.ownerPromoterId === user.id).map((p) => p.id)

  const promoterSales = orders.filter((o) => promoterProjectIds.includes(o.projectId))

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      success: "default",
      pending: "secondary",
      failed: "destructive",
    }
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Proyecto</TableHead>
            <TableHead>Inversor</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {promoterSales.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No hay ventas registradas
              </TableCell>
            </TableRow>
          ) : (
            promoterSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{new Date(sale.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{sale.projectName}</TableCell>
                <TableCell className="font-mono text-sm">
                  {sale.investorWallet.slice(0, 6)}...{sale.investorWallet.slice(-4)}
                </TableCell>
                <TableCell>{sale.quantity} tokens</TableCell>
                <TableCell className="font-semibold">${sale.total.toLocaleString()}</TableCell>
                <TableCell>{getStatusBadge(sale.status)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
