'use client'

import { useState, useEffect, useCallback } from 'react'
import { getPeriodos, crearPeriodo } from '@/lib/api'
import type { Periodo } from '@/lib/types'
import { PeriodoCard } from '@/components/periodo-card'
import { PeriodoHuecoCard } from '@/components/periodo-hueco-card'
import { ImportarPeriodoWizard } from '@/components/importar-periodo-wizard'
import { PeriodoDetailView } from '@/components/periodo-detail-view'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Plus } from 'lucide-react'
import { NOMBRE_MES } from '@/lib/mock-data'
import { IlluSelectPeriodo } from '@/components/illustrations/illu-select-periodo'

function EmptyDetailState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 pt-16">
      <IlluSelectPeriodo width={200} height={160} />
    </div>
  )
}

export default function PeriodosPage() {
  const [periodos, setPeriodos] = useState<Periodo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [creando, setCreando] = useState(false)
  const [confirmSheetOpen, setConfirmSheetOpen] = useState(false)
  const [wizardHueco, setWizardHueco] = useState<{ mes: number; año: number } | null>(null)
  const [selectedPeriodoId, setSelectedPeriodoId] = useState<string | null>(null)

  const hoy = new Date()
  const mesActual = hoy.getMonth() + 1
  const añoActual = hoy.getFullYear()

  const cargar = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getPeriodos()
      setPeriodos(data)
    } catch {
      setError('Error al cargar períodos. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { cargar() }, [cargar])

  const activo = periodos.find((p) => p.estado === 'activo')
  const periodoAnteriorCerrado = [...periodos]
    .filter((p) => p.estado === 'cerrado')
    .sort((a, b) => b.año - a.año || b.mes - a.mes)[0]
  const tieneInversionCarryOver = (periodoAnteriorCerrado?.inversionSiguiente ?? 0) > 0

  function handleNuevoClick() {
    if (tieneInversionCarryOver) {
      setConfirmSheetOpen(true)
    } else {
      ejecutarCrearPeriodo()
    }
  }

  async function ejecutarCrearPeriodo() {
    if (creando) return
    setCreando(true)
    try {
      await crearPeriodo(añoActual, mesActual)
      cargar()
    } catch {
      setError('Error al crear período.')
    } finally {
      setCreando(false)
    }
  }

  function handleAgregarHueco(mes: number, año: number) {
    setWizardHueco({ mes, año })
  }

  const mesesAño = Array.from({ length: mesActual }, (_, i) => i + 1)

  if (loading) return <div className="flex items-center justify-center min-h-screen"><p className="text-muted text-sm">Cargando...</p></div>

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-6">
      <p className="text-danger text-sm text-center">{error}</p>
      <button onClick={cargar} className="text-primary text-sm underline">Reintentar</button>
    </div>
  )

  const newPeriodoRow = !activo && (
    <div className="flex items-center justify-between py-2 px-1">
      <p className="text-sm text-muted">{NOMBRE_MES[mesActual]} {añoActual}</p>
      <Button
        onClick={handleNuevoClick}
        disabled={creando}
        size="sm"
        className="h-9 bg-primary text-white rounded-xl"
      >
        <Plus size={14} className="mr-1" /> {creando ? 'Creando...' : 'Nuevo'}
      </Button>
    </div>
  )

  const mobileList = (
    <div className="space-y-5">
      {newPeriodoRow}
      {[...mesesAño].reverse().map((mes) => {
        const periodo = periodos.find((p) => p.mes === mes && p.año === añoActual)
        if (periodo) return <PeriodoCard key={mes} periodo={periodo} />
        if (mes < mesActual) return (
          <PeriodoHuecoCard key={mes} mes={mes} año={añoActual} onAgregar={handleAgregarHueco} />
        )
        return null
      })}
      {periodos.length === 0 && !activo && (
        <div className="text-center py-12 text-muted text-sm">No hay períodos. Crea el primero.</div>
      )}
    </div>
  )

  const desktopList = (
    <div className="space-y-5">
      {newPeriodoRow}
      {[...mesesAño].reverse().map((mes) => {
        const periodo = periodos.find((p) => p.mes === mes && p.año === añoActual)
        if (periodo) return (
          <PeriodoCard
            key={mes}
            periodo={periodo}
            onClick={() => setSelectedPeriodoId(periodo.id)}
          />
        )
        if (mes < mesActual) return (
          <PeriodoHuecoCard key={mes} mes={mes} año={añoActual} onAgregar={handleAgregarHueco} />
        )
        return null
      })}
    </div>
  )

  return (
    <>
      {/* Mobile layout */}
      <div className="lg:hidden px-4 pt-6 space-y-6">
        <h1 className="text-xl font-bold text-text">Períodos</h1>
        {mobileList}
      </div>

      {/* Desktop 2-panel layout */}
      <div className="hidden lg:flex flex-1 min-h-screen">
        <div className="w-80 border-r border-border overflow-y-auto px-4 pt-6 shrink-0">
          <h1 className="text-xl font-bold text-text mb-4">Períodos</h1>
          {desktopList}
        </div>
        <div className="flex-1 overflow-y-auto">
          {selectedPeriodoId
            ? <PeriodoDetailView periodoId={selectedPeriodoId} />
            : <EmptyDetailState />}
        </div>
      </div>

      {/* Carry-over confirm sheet */}
      <Sheet open={confirmSheetOpen} onOpenChange={setConfirmSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl bg-surface px-4 pb-8">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-left text-text">Inversión inicial disponible</SheetTitle>
          </SheetHeader>
          <div className="space-y-4">
            <p className="text-sm text-text">
              El mes anterior cerró con{' '}
              <span className="font-bold text-primary">
                ${(periodoAnteriorCerrado?.inversionSiguiente ?? 0).toLocaleString('es-SV')}
              </span>{' '}
              disponible para invertir este mes.
            </p>
            <p className="text-xs text-muted">
              Se registrará automáticamente como inversión inicial al confirmar.
            </p>
            <Button
              onClick={() => { setConfirmSheetOpen(false); ejecutarCrearPeriodo() }}
              disabled={creando}
              className="h-12 w-full bg-primary text-white rounded-xl font-semibold"
            >
              Confirmar
            </Button>
            <Button variant="ghost" onClick={() => setConfirmSheetOpen(false)} className="h-12 w-full">
              Cancelar
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Importar periodo wizard */}
      {wizardHueco && (
        <ImportarPeriodoWizard
          mes={wizardHueco.mes}
          año={wizardHueco.año}
          open={!!wizardHueco}
          onOpenChange={(open) => { if (!open) setWizardHueco(null) }}
          onDone={() => { setWizardHueco(null); cargar() }}
        />
      )}
    </>
  )
}
