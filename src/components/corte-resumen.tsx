import type { CorteResumen as CorteResumenType } from '@/lib/types'
import { cn } from '@/lib/utils'

interface CorteResumenProps {
  corte: CorteResumenType
  mostrarGanancia?: boolean
}

function Row({ label, value, className }: { label: string; value: number; className?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-sm text-neutral">{label}</span>
      <span className={cn('font-semibold text-text', className)}>
        ${value.toLocaleString('es-SV')}
      </span>
    </div>
  )
}

export function CorteResumen({ corte, mostrarGanancia = false }: CorteResumenProps) {
  const gananciaPositiva = corte.gananciaReal >= 0

  return (
    <div className="bg-surface rounded-2xl shadow-sm p-4">
      <h3 className="text-xs text-muted uppercase tracking-wide font-semibold mb-3">Desglose</h3>
      <Row label="Inversiones en producto" value={corte.totalInversiones} />
      <Row label="Costos fijos (salarios + alquiler)" value={corte.totalCostosFijos} />
      <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
        <span className="text-sm font-semibold text-text">Total egresos</span>
        <span className="font-bold text-text">${corte.totalEgresos.toLocaleString('es-SV')}</span>
      </div>

      {mostrarGanancia && corte.resultadoNeto > 0 && (
        <>
          <Row label="Resultado neto (ingresos)" value={corte.resultadoNeto} />
          <div className="flex items-center justify-between pt-3">
            <span className="text-sm font-bold text-text">Ganancia real</span>
            <span className={cn(
              'font-bold text-lg',
              gananciaPositiva ? 'text-success' : 'text-danger'
            )}>
              {gananciaPositiva ? '+' : '-'}${Math.abs(corte.gananciaReal).toLocaleString('es-SV')}
            </span>
          </div>
          {corte.ahorro > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="bg-success/10 rounded-xl p-3 text-center">
                <p className="text-xs text-muted">Ahorro</p>
                <p className="font-bold text-success">${corte.ahorro.toLocaleString('es-SV')}</p>
              </div>
              <div className="bg-primary/10 rounded-xl p-3 text-center">
                <p className="text-xs text-muted">Próx. inversión</p>
                <p className="font-bold text-primary">${corte.inversionSiguiente.toLocaleString('es-SV')}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
