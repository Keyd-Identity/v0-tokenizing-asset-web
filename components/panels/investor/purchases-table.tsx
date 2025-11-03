"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStore } from "@/lib/store"

export function PurchasesTable() {
  const { orders } = useStore()

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
            <TableHead>Cantidad</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{order.projectName}</TableCell>
              <TableCell>{order.quantity} tokens</TableCell>
              <TableCell>${order.pricePerToken}</TableCell>
              <TableCell className="font-semibold">${order.total.toLocaleString()}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
