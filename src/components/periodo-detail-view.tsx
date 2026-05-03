'use client'

import { useState, useEffect, useCallback } from 'react'
import { getPeriodo, getInversiones, crearInversion } from '@/lib/api'
import type { PeriodoConCorte, Inversion, NuevaInversionInput } from '@/lib/types'
import { PeriodoResumenCard } from '@/components/periodo-resumen-card'
import { CorteResumen } from '@/components/corte-resumen'
import { InversionesList } from '@/components/inversiones-list'
import { NuevaInversionDrawer } from '@/components/nueva-inversion-drawer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Lock } from 'lucide-react'
import { NOMBRE_MES } from '@/lib/mock-data'
import Link from 'next/link'

interface PeriodoDetailViewProps {
  periodoId: string
  onBack?: () => void
}

export function PeriodoDetailView({ periodoId, onBack }: PeriodoDetailViewProps) {
  const [data, setData] = useState<PeriodoConCorte | null>(null)
  const [inversiones, setInversiones] = useState<Inversion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [inversionError, setInversionError] = useState<string | null>(null)

  const cargar = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [pc, invs] = await Promise.all([getPeriodo(periodoId), getInversiones(periodoId)])
      setData(pc)
      setInversiones(invs)
    } catch {
      setError('Error al cargar el período. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [periodoId])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { cargar() }, [cargar])

  async function handleNuevaInversion(input: NuevaInversionInput) {
    if (!data) return
    setInversionError(null)
    try {
      const nueva = await crearInversion(data.id, input)
      setInversiones((prev) => [nueva, ...prev])
      const refreshed = await getPeriodo(data.id)
      setData(refreshed)
      setDrawerOpen(false)
    } catch {
      setInversionError('Error al registrar la inversión.')
    }
  }

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-100 gap-4 px-6">
      <p className="text-danger text-sm text-center">{error}</p>
      <button onClick={cargar} className="text-primary text-sm underline">Reintentar</button>
    </div>
  )

  if (loading || !data) return (
    <div className="flex items-center justify-center min-h-100">
      <p className="text-muted text-sm">Cargando...</p>
    </div>
  )

  const esActivo = data.estado === 'activo'

  return (
    <div className="px-4 pt-4 pb-8 space-y-5">
      {onBack && (
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-neutral">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-text">
            {NOMBRE_MES[data.mes]} {data.año}
          </h1>
        </div>
      )}

      <PeriodoResumenCard periodo={data} corte={data.corte} />
      <CorteResumen corte={data.corte} mostrarGanancia={!esActivo} />
      <InversionesList inversiones={inversiones} titulo="Todas las inversiones" />

      {esActivo && (
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => setDrawerOpen(true)}
            className="flex-1 h-12 rounded-xl border-primary text-primary font-semibold"
          >
            <Plus size={16} className="mr-1" /> Inversión
          </Button>
          <Link href={`/periodos/${periodoId}/cerrar`} className="flex-1">
            <Button className="w-full h-12 rounded-xl bg-text text-white font-semibold">
              <Lock size={16} className="mr-1" /> Cerrar mes
            </Button>
          </Link>
        </div>
      )}

      {inversionError && <p className="text-xs text-danger text-center">{inversionError}</p>}

      <NuevaInversionDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onSubmit={handleNuevaInversion}
      />
    </div>
  )
}
