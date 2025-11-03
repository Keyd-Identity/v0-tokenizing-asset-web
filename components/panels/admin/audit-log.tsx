"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AuditLog() {
  const { auditLogs } = useStore()

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Registro de Auditoría</h3>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {auditLogs.map((log) => (
            <div key={log.id} className="border-b pb-4 last:border-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">{log.action}</p>
                  <p className="text-sm text-muted-foreground">
                    Por: {log.by}{" "}
                    {log.byRole && (
                      <Badge variant="outline" className="ml-2">
                        {log.byRole}
                      </Badge>
                    )}
                  </p>
                  {log.details && <p className="mt-1 text-sm text-muted-foreground">{log.details}</p>}
                </div>
                <span className="text-xs text-muted-foreground">{new Date(log.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
