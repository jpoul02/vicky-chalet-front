'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { PeriodoResumenCard } from '@/components/periodo-resumen-card'
import { InversionesList } from '@/components/inversiones-list'
import { NuevaInversionDrawer } from '@/components/nueva-inversion-drawer'
import { getPeriodoActivo, getPeriodo, getInversiones, crearInversion } from '@/lib/api'
import type { Periodo, CorteResumen, Inversion, NuevaInversionInput } from '@/lib/types'
import { Plus, TrendingUp, CalendarPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const router = useRouter()
  const [periodo, setPeriodo] = useState<Periodo | null>(null)
  const [corte, setCorte] = useState<CorteResumen | null>(null)
  const [inversiones, setInversiones] = useState<Inversion[]>([])
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cargar = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const p = await getPeriodoActivo()
      if (!p) { setLoading(false); return }
      const [pc, invs] = await Promise.all([getPeriodo(p.id), getInversiones(p.id)])
      setPeriodo(pc)
      setCorte(pc.corte)
      setInversiones(invs)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        // No active period — show empty state instead of error
      } else {
        setError('Error al cargar datos. Intenta de nuevo.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { cargar() }, [cargar])

  async function handleNuevaInversion(input: NuevaInversionInput) {
    if (!periodo) return
    try {
      const nueva = await crearInversion(periodo.id, input)
      setInversiones((prev) => [nueva, ...prev])
      const pc = await getPeriodo(periodo.id)
      setCorte(pc.corte)
      setDrawerOpen(false)
    } catch {
      // drawer stays open on error so user can retry
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted text-sm">Cargando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-8">
        <div className="w-20 h-20 rounded-3xl bg-danger/10 flex items-center justify-center">
          <TrendingUp size={36} className="text-danger" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-base font-semibold text-text">Algo salió mal</p>
          <p className="text-sm text-muted">No se pudieron cargar los datos</p>
        </div>
        <button
          onClick={cargar}
          className="h-11 px-6 rounded-2xl bg-primary text-white text-sm font-semibold"
        >
          Reintentar
        </button>
      </div>
    )
  }

  if (!periodo || !corte) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-8">
        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
          <CalendarPlus size={42} className="text-primary" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-bold text-text">Sin período activo</p>
          <p className="text-sm text-muted leading-relaxed">
            Creá un período para empezar a registrar tus inversiones y costos del mes.
          </p>
        </div>
        <button
          onClick={() => router.push('/periodos')}
          className="h-11 px-6 rounded-2xl bg-primary text-white text-sm font-semibold"
        >
          Crear período
        </button>
      </div>
    )
  }

  return (
    <div className="px-4 pt-6 space-y-5 lg:max-w-2xl lg:mx-auto lg:px-8 lg:pt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-text">Dashboard</h1>
      </div>

      {/* Summary card */}
      <PeriodoResumenCard periodo={periodo} corte={corte} />

      {/* Recent inversiones */}
      <InversionesList
        inversiones={inversiones.slice(0, 5)}
        titulo="Últimas inversiones"
      />

      {/* FAB */}
      <Button
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg text-white"
        size="icon"
      >
        <Plus size={24} />
      </Button>

      {/* Drawer */}
      <NuevaInversionDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onSubmit={handleNuevaInversion}
      />
    </div>
  )
}
