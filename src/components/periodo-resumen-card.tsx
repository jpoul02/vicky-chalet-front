import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { CorteResumen, Periodo } from '@/lib/types'
import { NOMBRE_MES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface PeriodoResumenCardProps {
  periodo: Periodo
  corte: CorteResumen
}

function Moneda({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn('font-bold', className)}>
      ${value.toLocaleString('es-SV')}
    </span>
  )
}

export function PeriodoResumenCard({ periodo, corte }: PeriodoResumenCardProps) {
  const gananciaPositiva = corte.gananciaReal >= 0

  return (
    <Card className="rounded-2xl bg-surface shadow-sm p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted uppercase tracking-wide">Período actual</p>
          <h2 className="font-semibold text-text">
            {NOMBRE_MES[periodo.mes]} {periodo.año}
          </h2>
        </div>
        <Badge
          className={cn(
            'rounded-full px-3 py-1 text-xs font-semibold',
            periodo.estado === 'activo'
              ? 'bg-primary/10 text-primary'
              : 'bg-gray-100 text-neutral'
          )}
        >
          {periodo.estado === 'activo' ? 'Activo' : 'Cerrado'}
        </Badge>
      </div>

      {/* Main number */}
      <div>
        <p className="text-xs text-muted uppercase tracking-wide mb-1">Total egresos</p>
        <Moneda value={corte.totalEgresos} className="text-3xl text-text" />
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-background rounded-xl p-3">
          <p className="text-xs text-muted mb-1">Inversiones</p>
          <Moneda value={corte.totalInversiones} className="text-lg text-text" />
        </div>
        <div className="bg-background rounded-xl p-3">
          <p className="text-xs text-muted mb-1">Costos fijos</p>
          <Moneda value={corte.totalCostosFijos} className="text-lg text-text" />
        </div>
      </div>

      {/* Ganancia (only shown for closed periods) */}
      {periodo.estado === 'cerrado' && (
        <div className={cn('rounded-xl p-3', gananciaPositiva ? 'bg-success/10' : 'bg-danger/10')}>
          <p className="text-xs text-muted mb-1">Ganancia real</p>
          <Moneda
            value={corte.gananciaReal}
            className={cn('text-xl', gananciaPositiva ? 'text-success' : 'text-danger')}
          />
        </div>
      )}
    </Card>
  )
}
