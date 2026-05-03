'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getPeriodo, cerrarPeriodo } from '@/lib/api'
import type { PeriodoConCorte } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NOMBRE_MES } from '@/lib/mock-data'

type Step = 1 | 2 | 3

export default function CerrarPeriodoPage() {
  const { periodoId } = useParams<{ periodoId: string }>()
  const router = useRouter()

  const [data, setData] = useState<PeriodoConCorte | null>(null)
  const [step, setStep] = useState<Step>(1)
  const [resultadoNeto, setResultadoNeto] = useState('')
  const [ahorro, setAhorro] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPeriodo(periodoId).then(setData).catch(() => setError('Error al cargar el período.'))
  }, [periodoId])

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-6 text-center">
      <p className="text-danger text-sm">{error}</p>
      <button onClick={() => router.back()} className="text-primary text-sm underline">Volver</button>
    </div>
  )

  if (!data) return <div className="flex items-center justify-center min-h-screen"><p className="text-muted text-sm">Cargando...</p></div>

  const neto = parseFloat(resultadoNeto) || 0
  const ahorroNum = parseFloat(ahorro) || 0
  const ganancia = neto - data.corte.totalEgresos
  const inversionSiguiente = ganancia - ahorroNum
  const gananciaPositiva = ganancia >= 0
  const splitValido = ganancia < 0 ? true : (ahorroNum >= 0 && inversionSiguiente >= 0)

  async function handleCerrar() {
    setLoading(true)
    setError(null)
    try {
      await cerrarPeriodo(periodoId, { resultadoNeto: neto, ahorro: ganancia < 0 ? 0 : ahorroNum, inversionSiguiente: ganancia < 0 ? 0 : inversionSiguiente })
      setDone(true)
    } catch {
      setError('Error al cerrar el período. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center gap-4">
        <CheckCircle size={64} className="text-success" />
        <h2 className="text-2xl font-bold text-text">¡Mes cerrado!</h2>
        <p className="text-muted text-sm">
          {NOMBRE_MES[data.mes]} {data.año} registrado correctamente.
        </p>
        <Button
          onClick={() => router.replace('/periodos')}
          className="h-12 w-full max-w-xs bg-primary text-white rounded-xl font-semibold"
        >
          Ver períodos
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 pt-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => step === 1 ? router.back() : setStep((s) => (s - 1) as Step)}
          className="text-neutral"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-text">Cerrar mes</h1>
        <span className="ml-auto text-xs text-muted">{step}/3</span>
      </div>

      {/* Step indicators */}
      <div className="flex gap-1 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              s <= step ? 'bg-primary' : 'bg-gray-200'
            )}
          />
        ))}
      </div>

      {/* Step 1: Enter neto */}
      {step === 1 && (
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text mb-1">¿Cuánto ingresó este mes?</h2>
            <p className="text-sm text-muted">Total de ventas de {NOMBRE_MES[data.mes]} {data.año}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="neto">Resultado neto ($)</Label>
            <Input
              id="neto"
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={resultadoNeto}
              onChange={(e) => setResultadoNeto(e.target.value)}
              className="h-16 text-3xl font-bold bg-surface text-center"
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

      {/* Step 2: Preview */}
      {step === 2 && (
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-text mb-1">Resumen del mes</h2>
            <p className="text-sm text-muted">Verificá los números antes de continuar</p>
          </div>

          <div className="bg-surface rounded-2xl shadow-sm p-4 space-y-3">
            {[
              { label: 'Ingresos', value: neto },
              { label: 'Inversiones', value: -data.corte.totalInversiones },
              { label: 'Costos fijos', value: -data.corte.totalCostosFijos },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-neutral">{label}</span>
                <span className={cn('font-semibold', value < 0 ? 'text-danger' : 'text-text')}>
                  {value < 0 ? '-' : ''}${Math.abs(value).toLocaleString('es-SV')}
                </span>
              </div>
            ))}

            <div className={cn(
              'flex justify-between items-center pt-2 rounded-xl px-3 py-3',
              gananciaPositiva ? 'bg-success/10' : 'bg-danger/10'
            )}>
              <span className="font-bold text-text">Ganancia real</span>
              <span className={cn('font-bold text-xl', gananciaPositiva ? 'text-success' : 'text-danger')}>
                {gananciaPositiva ? '+' : '-'}${Math.abs(ganancia).toLocaleString('es-SV')}
              </span>
            </div>
          </div>

          {!gananciaPositiva && (
            <p className="text-xs text-danger bg-danger/10 rounded-xl px-3 py-2">
              ⚠️ Este mes tuvo pérdidas. Podés cerrarlo igual para mantener el historial.
            </p>
          )}

          <Button
            onClick={() => setStep(3)}
            className="h-12 w-full bg-primary text-white rounded-xl font-semibold"
          >
            Siguiente <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      )}

      {/* Step 3: Split */}
      {step === 3 && (
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-text mb-1">¿Cómo repartís la ganancia?</h2>
            <p className="text-sm text-muted">
              Ganancia disponible: <span className={cn('font-bold', gananciaPositiva ? 'text-success' : 'text-danger')}>
                {gananciaPositiva ? '+' : '-'}${Math.abs(ganancia).toLocaleString('es-SV')}
              </span>
            </p>
          </div>

          {!gananciaPositiva ? (
            <div className="bg-danger/10 rounded-xl p-4">
              <p className="text-sm text-danger font-semibold">Mes con pérdidas</p>
              <p className="text-xs text-muted mt-1">
                No hay ganancia para distribuir. El cierre se registrará con ahorro=$0 e inversión=$0.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="ahorro">Ahorro ($)</Label>
              <Input
                id="ahorro"
                type="number"
                inputMode="decimal"
                placeholder="0"
                value={ahorro}
                onChange={(e) => setAhorro(e.target.value)}
                className="h-12 bg-surface"
              />
            </div>
          )}

          {gananciaPositiva && (
            <div className="bg-primary/10 rounded-xl p-4">
              <p className="text-xs text-muted mb-1">Inversión próximo mes</p>
              <p className={cn(
                'text-2xl font-bold',
                inversionSiguiente >= 0 ? 'text-primary' : 'text-danger'
              )}>
                ${inversionSiguiente.toLocaleString('es-SV')}
              </p>
              {!splitValido && (
                <p className="text-xs text-danger mt-1">El ahorro no puede exceder la ganancia</p>
              )}
            </div>
          )}

          {error && <p className="text-xs text-danger text-center">{error}</p>}

          <Button
            onClick={handleCerrar}
            disabled={loading || !splitValido}
            className="h-12 w-full bg-text text-white rounded-xl font-semibold"
          >
            {loading ? 'Cerrando...' : '✓ Confirmar y cerrar mes'}
          </Button>
        </div>
      )}
    </div>
  )
}
