"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { CheckCircle, XCircle, Clock, FileText } from "lucide-react"

export function ComplianceChecklist() {
  const { kycRecords, user } = useStore()

  const kycStatus = kycRecords.find((k) => k.userId === user.id)

  const documents = [
    { name: "Identificación oficial", status: "verified" },
    { name: "Comprobante de domicilio", status: "verified" },
    { name: "Documentos del proyecto", status: kycStatus?.status === "verified" ? "verified" : "pending" },
    { name: "Certificaciones legales", status: kycStatus?.status === "verified" ? "verified" : "pending" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />
    }
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
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Compliance del Proyecto</h3>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Estado KYC</span>
          {kycStatus && getStatusBadge(kycStatus.status)}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Documentos requeridos</p>
        {documents.map((doc) => (
          <div key={doc.name} className="flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-3">
              {getStatusIcon(doc.status)}
              <span className="text-sm">{doc.name}</span>
            </div>
            {getStatusBadge(doc.status)}
          </div>
        ))}
      </div>
    </Card>
  )
}
