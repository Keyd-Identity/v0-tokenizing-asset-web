"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useStore } from "@/lib/store"
import { CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function KycTable() {
  const { kycRecords, updateKycStatus, addAuditLog, user } = useStore()
  const { toast } = useToast()

  const handleKycUpdate = (userId: string, userName: string, newStatus: "verified" | "rejected") => {
    updateKycStatus(userId, newStatus)
    addAuditLog({
      action: `KYC ${newStatus === "verified" ? "aprobado" : "rechazado"}`,
      by: "Admin Principal",
      byRole: user.role,
      date: new Date().toISOString(),
      refId: userId,
      details: userName,
    })
    toast({
      title: "KYC actualizado",
      description: `${userName} ha sido ${newStatus === "verified" ? "verificado" : "rechazado"}`,
    })
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      verified: "default",
      pending: "secondary",
      rejected: "destructive",
    }
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kycRecords.map((record) => (
            <TableRow key={record.userId}>
              <TableCell className="font-medium">{record.userName}</TableCell>
              <TableCell className="capitalize">{record.role}</TableCell>
              <TableCell>{getStatusBadge(record.status)}</TableCell>
              <TableCell>{new Date(record.submittedAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                {record.status === "pending" && (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleKycUpdate(record.userId, record.userName, "verified")}
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleKycUpdate(record.userId, record.userName, "rejected")}
                    >
                      <XCircle className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
