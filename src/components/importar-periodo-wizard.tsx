'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NOMBRE_MES } from '@/lib/mock-data'
import { crearPeriodoPasado } from '@/lib/api'

type Step = 1 | 2 | 3

interface ImportarPeriodoWizardProps {
  mes: number
  año: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onDone: () => void
}

export function ImportarPeriodoWizard({ mes, año, open, onOpenChange, onDone }: ImportarPeriodoWizardProps) {
  const [step, setStep] = useState<Step>(1)
  const [resultadoNeto, setResultadoNeto] = useState('')
  const [ahorro, setAhorro] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const neto = parseFloat(resultadoNeto) || 0
  const ahorroNum = parseFloat(ahorro) || 0
  const ganancia = neto
  const inversionSiguiente = ganancia - ahorroNum
  const gananciaPositiva = ganancia >= 0
  const splitValido = ganancia < 0 ? true : (ahorroNum >= 0 && inversionSiguiente >= 0)

  function handleClose(open: boolean) {
    if (!open) {
      setStep(1)
      setResultadoNeto('')
      setAhorro('')
      setDone(false)
      setError(null)
    }
    onOpenChange(open)
  }

  async function handleConfirmar() {
    setLoading(true)
    setError(null)
    try {
      await crearPeriodoPasado(año, mes, {
        resultadoNeto: neto,
        ahorro: ganancia < 0 ? 0 : ahorroNum,
      })
      setDone(true)
    } catch {
      setError('Error al guardar el período. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  function handleDone() {
    handleClose(false)
    onDone()
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="rounded-t-2xl bg-surface px-4 pb-8 max-h-[90vh] overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-left text-text">
            Agregar {NOMBRE_MES[mes]} {año}
          </SheetTitle>
        </SheetHeader>

        {done ? (
          <div className="flex flex-col items-center py-8 gap-4 text-center">
            <CheckCircle size={48} className="text-success" />
            <h2 className="text-xl font-bold text-text">Período guardado</h2>
            <p className="text-sm text-muted">{NOMBRE_MES[mes]} {año} registrado en el historial.</p>
            <Button onClick={handleDone} className="h-12 w-full bg-primary text-white rounded-xl font-semibold">
              Listo
            </Button>
          </div>
        ) : (
          <>
            {/* Step indicators */}
            <div className="flex gap-1 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={cn('h-1 flex-1 rounded-full transition-colors', s <= step ? 'bg-primary' : 'bg-gray-200')}
                />
              ))}
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-text mb-1">
                    ¿Cuánto ingresó en {NOMBRE_MES[mes]} {año}?
                  </h2>
                  <p className="text-sm text-muted">Total de ventas del mes</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wiz-neto">Resultado neto ($)</Label>
                  <Input
                    id="wiz-neto"
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    value={resultadoNeto}
                    onChange={(e) => setResultadoNeto(e.target.value)}
                    className="h-16 text-3xl font-bold bg-background text-center"
                  />
                </div>
                <Button
                  onClick={() => setStep(2)}
                  disabled={neto <= 0}
                  className="h-12 w-full bg-primary text-white rounded-xl font-semibold"
                >
                  Siguiente <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-text mb-1">Resumen del mes</h2>
                  <p className="text-sm text-muted">Verificá los números antes de continuar</p>
                </div>

                <div className="bg-background rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-neutral">Ingresos</span>
                    <span className="font-semibold text-text">${neto.toLocaleString('es-SV')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-neutral">Inversiones</span>
                    <span className="font-semibold text-muted">$0</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-neutral">Costos fijos</span>
                    <span className="font-semibold text-muted">$0</span>
                  </div>
                  <div className={cn('flex justify-between items-center pt-2 rounded-xl px-3 py-3', gananciaPositiva ? 'bg-success/10' : 'bg-danger/10')}>
                    <span className="font-bold text-text">Ganancia real</span>
                    <span className={cn('font-bold text-xl', gananciaPositiva ? 'text-success' : 'text-danger')}>
                      {gananciaPositiva ? '+' : '-'}${Math.abs(ganancia).toLocaleString('es-SV')}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted bg-gray-50 rounded-xl px-3 py-2">
                  Las inversiones de ese mes no se registrarán retroactivamente.
                </p>

                <Button
                  onClick={() => setStep(3)}
                  className="h-12 w-full bg-primary text-white rounded-xl font-semibold"
                >
                  Siguiente <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-text mb-1">¿Cómo repartís la ganancia?</h2>
                  <p className="text-sm text-muted">
                    Ganancia disponible:{' '}
                    <span className={cn('font-bold', gananciaPositiva ? 'text-success' : 'text-danger')}>
                      {gananciaPositiva ? '+' : '-'}${Math.abs(ganancia).toLocaleString('es-SV')}
                    </span>
                  </p>
                </div>

                {!gananciaPositiva ? (
                  <div className="bg-danger/10 rounded-xl p-4">
                    <p className="text-sm text-danger font-semibold">Mes con pérdidas</p>
                    <p className="text-xs text-muted mt-1">
                      No hay ganancia para distribuir. El cierre se registrará con ahorro=$0.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="wiz-ahorro">Ahorro ($)</Label>
                    <Input
                      id="wiz-ahorro"
                      type="number"
                      inputMode="decimal"
                      placeholder="0"
                      value={ahorro}
                      onChange={(e) => setAhorro(e.target.value)}
                      className="h-12 bg-background"
                    />
                  </div>
                )}

                {gananciaPositiva && (
                  <div className="bg-primary/10 rounded-xl p-4">
                    <p className="text-xs text-muted mb-1">Inversión próximo mes</p>
                    <p className={cn('text-2xl font-bold', inversionSiguiente >= 0 ? 'text-primary' : 'text-danger')}>
                      ${inversionSiguiente.toLocaleString('es-SV')}
                    </p>
                    {!splitValido && (
                      <p className="text-xs text-danger mt-1">El ahorro no puede exceder la ganancia</p>
                    )}
                  </div>
                )}

                {error && <p className="text-xs text-danger text-center">{error}</p>}

                <Button
                  onClick={handleConfirmar}
                  disabled={loading || !splitValido}
                  className="h-12 w-full bg-text text-white rounded-xl font-semibold"
                >
                  {loading ? 'Guardando...' : '✓ Confirmar y guardar'}
                </Button>
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
