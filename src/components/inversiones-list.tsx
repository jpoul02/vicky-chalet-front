import type { Inversion } from '@/lib/types'
import { Flag, PlusCircle, MessageCircle } from 'lucide-react'

interface InversionesListProps {
  inversiones: Inversion[]
  titulo?: string
}

const TIPO_ICON: Record<Inversion['tipo'], React.ReactNode> = {
  inicial: <Flag size={14} className="text-primary" />,
  adicional: <PlusCircle size={14} className="text-neutral" />,
}

const ORIGEN_ICON: Record<Inversion['origen'], React.ReactNode> = {
  webapp: null,
  whatsapp: <MessageCircle size={12} className="text-muted ml-1 inline-block" />,
}

export function InversionesList({ inversiones, titulo = 'Inversiones' }: InversionesListProps) {
  if (inversiones.length === 0) {
    return (
      <div className="text-center py-8 text-muted text-sm">
        No hay inversiones registradas
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {titulo && <h3 className="text-xs text-muted uppercase tracking-wide font-semibold px-1">{titulo}</h3>}
      {inversiones.map((inv) => (
        <div
          key={inv.id}
          className="flex items-center gap-3 bg-surface rounded-xl px-4 py-3 shadow-sm"
        >
          <span className="flex items-center justify-center w-6 h-6">
            {TIPO_ICON[inv.tipo]}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text truncate">
              {inv.descripcion}
              {ORIGEN_ICON[inv.origen]}
            </p>
            <p className="text-xs text-muted">
              {new Date(inv.fecha).toLocaleDateString('es-SV', { day: '2-digit', month: 'short' })}
            </p>
          </div>
          <span className="font-bold text-text">
            ${inv.monto.toLocaleString('es-SV')}
          </span>
        </div>
      ))}
    </div>
  )
}
