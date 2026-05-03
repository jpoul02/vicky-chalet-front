import Link from 'next/link'
import type { Periodo } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'
import { NOMBRE_MES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface PeriodoCardProps {
  periodo: Periodo
  onClick?: () => void
}

export function PeriodoCard({ periodo, onClick }: PeriodoCardProps) {
  const esActivo = periodo.estado === 'activo'
  const gananciaPositiva = (periodo.gananciaReal ?? 0) >= 0

  const inner = (
    <div className="flex items-center gap-3 bg-surface rounded-2xl px-4 py-4 shadow-sm">
      <div className={cn(
        'w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
        esActivo ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-neutral'
      )}>
        {NOMBRE_MES[periodo.mes].slice(0, 3).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-text">
            {NOMBRE_MES[periodo.mes]} {periodo.año}
          </p>
          <Badge className={cn(
            'rounded-full px-2 py-0 text-xs',
            esActivo ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-neutral'
          )}>
            {esActivo ? 'Activo' : 'Cerrado'}
          </Badge>
        </div>
        {!esActivo && periodo.gananciaReal !== undefined && (
          <p className={cn('text-sm font-semibold', gananciaPositiva ? 'text-success' : 'text-danger')}>
            {gananciaPositiva ? '+' : '-'}${Math.abs(periodo.gananciaReal).toLocaleString('es-SV')} ganancia
          </p>
        )}
        {esActivo && <p className="text-xs text-muted">En curso</p>}
      </div>

      <ChevronRight size={16} className="text-muted shrink-0" />
    </div>
  )

  if (onClick) {
    return <div onClick={onClick} className="cursor-pointer">{inner}</div>
  }

  return <Link href={`/periodos/${periodo.id}`}>{inner}</Link>
}
