'use client'

import { Plus } from 'lucide-react'
import { NOMBRE_MES } from '@/lib/mock-data'

interface PeriodoHuecoCardProps {
  mes: number
  año: number
  onAgregar: (mes: number, año: number) => void
}

export function PeriodoHuecoCard({ mes, año, onAgregar }: PeriodoHuecoCardProps) {
  return (
    <div className="flex items-center gap-3 bg-surface rounded-2xl px-4 py-4 shadow-sm opacity-60">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-neutral shrink-0">
        {NOMBRE_MES[mes].slice(0, 3).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-text">{NOMBRE_MES[mes]} {año}</p>
        <p className="text-xs text-muted">Sin datos</p>
      </div>

      <button
        onClick={() => onAgregar(mes, año)}
        className="flex items-center gap-1 text-xs font-semibold text-primary border border-primary/30 rounded-xl px-3 py-1.5 shrink-0"
      >
        <Plus size={12} /> Agregar
      </button>
    </div>
  )
}
