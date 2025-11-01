import { AlertTriangle, FileText } from "lucide-react"
import type { Project } from "@/lib/types"

interface SummaryBoxProps {
  project: Project
}

export function SummaryBox({ project }: SummaryBoxProps) {
  return (
    <div className="space-y-6">
      {/* Purchase Summary */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">Resumen de Compra</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Proyecto</p>
            <p className="font-medium">{project.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Categoría</p>
            <p className="font-medium">{project.category}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Ubicación</p>
            <p className="font-medium">{project.location}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Precio por Token</p>
            <p className="text-xl font-bold">${project.pricePerTokenUSDT} USDT</p>
          </div>
        </div>
      </div>

      {/* Terms and Risks */}
      <div className="rounded-2xl border border-warning/50 bg-warning/5 p-6">
        <div className="mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h3 className="font-semibold">Términos y Riesgos</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
            <span>Esta inversión conlleva riesgos financieros</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
            <span>El valor de los tokens puede fluctuar</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
            <span>Lee toda la documentación antes de invertir</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
            <span>No inviertas más de lo que puedas perder</span>
          </li>
        </ul>
      </div>

      {/* Documents */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 font-semibold">Documentos</h3>
        <div className="space-y-2">
          {project.documents.map((doc) => (
            <a
              key={doc.id}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-secondary"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span>{doc.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
