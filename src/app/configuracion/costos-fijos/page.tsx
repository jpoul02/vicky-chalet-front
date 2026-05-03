'use client'

import { useState, useEffect, useCallback } from 'react'
import { getCostosFijos, crearCostoFijo, actualizarCostoFijo, eliminarCostoFijo } from '@/lib/api'
import type { CostoFijo } from '@/lib/types'
import { useForm, Controller, type Resolver } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Plus, Trash2, Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const schema = z.object({
  nombre: z.string().min(2, 'Nombre requerido'),
  monto: z.coerce.number().positive('Debe ser mayor a 0'),
  tipo: z.enum(['salario', 'alquiler', 'otro']),
})

type FormData = {
  nombre: string
  monto: number
  tipo: 'salario' | 'alquiler' | 'otro'
}

export default function CostosFijosPage() {
  const router = useRouter()
  const [costos, setCostos] = useState<CostoFijo[]>([])
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
    defaultValues: { tipo: 'salario' },
  })

  const cargar = useCallback(async () => {
    setCostos(await getCostosFijos())
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { cargar() }, [cargar])

  function abrirNuevo() {
    setEditingId(null)
    reset({ tipo: 'salario' })
    setSheetOpen(true)
  }

  function abrirEditar(costo: CostoFijo) {
    setEditingId(costo.id)
    reset({ nombre: costo.nombre, monto: costo.monto, tipo: costo.tipo })
    setSheetOpen(true)
  }

  async function onSubmit(data: FormData) {
    setSubmitError(null)
    try {
      if (editingId) {
        await actualizarCostoFijo(editingId, data)
      } else {
        await crearCostoFijo(data)
      }
      setSheetOpen(false)
      cargar()
    } catch {
      setSubmitError('Error al guardar. Intenta de nuevo.')
    }
  }

  async function handleToggle(costo: CostoFijo) {
    try {
      await actualizarCostoFijo(costo.id, { activo: !costo.activo })
      cargar()
    } catch { /* list stays unchanged */ }
  }

  async function handleEliminar(id: string) {
    try {
      await eliminarCostoFijo(id)
      cargar()
    } catch { /* list stays unchanged */ }
  }

  const total = costos.filter((c) => c.activo).reduce((sum, c) => sum + c.monto, 0)

  return (
    <div className="px-4 pt-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="text-neutral"><ArrowLeft size={20} /></button>
        <h1 className="text-lg font-bold text-text">Costos Fijos</h1>
        <Button onClick={abrirNuevo} size="sm" className="ml-auto h-10 bg-primary text-white rounded-xl">
          <Plus size={16} className="mr-1" /> Nuevo
        </Button>
      </div>

      {/* Total */}
      <div className="bg-primary/10 rounded-2xl p-4">
        <p className="text-xs text-muted uppercase tracking-wide">Total mensual activo</p>
        <p className="text-2xl font-bold text-primary">${total.toLocaleString('es-SV')}</p>
      </div>

      {/* List */}
      <div className="space-y-2">
        {costos.map((costo) => (
          <div
            key={costo.id}
            className={cn(
              'flex items-center gap-3 bg-surface rounded-2xl px-4 py-3 shadow-sm',
              !costo.activo && 'opacity-50'
            )}
          >
            <div className="flex-1">
              <p className="font-medium text-text text-sm">{costo.nombre}</p>
              <p className="text-xs text-muted capitalize">{costo.tipo}</p>
            </div>
            <p className="font-bold text-text">${costo.monto.toLocaleString('es-SV')}</p>
            <button onClick={() => handleToggle(costo)} className="text-neutral text-xs px-2 py-1 rounded-lg border border-gray-200">
              {costo.activo ? 'ON' : 'OFF'}
            </button>
            <button onClick={() => abrirEditar(costo)} className="text-neutral"><Pencil size={15} /></button>
            <button onClick={() => handleEliminar(costo.id)} className="text-danger"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>

      {/* Sheet form */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl bg-surface px-4 pb-8">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-left">{editingId ? 'Editar costo' : 'Nuevo costo fijo'}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nombre</Label>
              <Input placeholder="Ej: Salario Empleada 1" className="h-12 bg-background" {...register('nombre')} />
              {errors.nombre && <p className="text-xs text-danger">{errors.nombre.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Monto mensual ($)</Label>
              <Input type="number" inputMode="decimal" placeholder="0" className="h-12 bg-background" {...register('monto')} />
              {errors.monto && <p className="text-xs text-danger">{errors.monto.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <Controller
                control={control}
                name="tipo"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-12 bg-background"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salario">Salario</SelectItem>
                      <SelectItem value="alquiler">Alquiler</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {submitError && <p className="text-xs text-danger">{submitError}</p>}
            <Button type="submit" className="h-12 w-full bg-primary text-white rounded-xl font-semibold">
              {editingId ? 'Guardar cambios' : 'Agregar'}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
