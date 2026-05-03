'use client'

import { useState } from 'react'
import { useForm, Controller, type Resolver } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { NuevaInversionInput } from '@/lib/types'

const schema = z.object({
  descripcion: z.string().min(2, 'Descripción requerida'),
  monto: z.coerce.number().positive('Debe ser mayor a 0'),
  tipo: z.enum(['inicial', 'adicional']),
  fecha: z.string().optional(),
})

// Use the output type (after coercion) as the form data type
type FormData = {
  descripcion: string
  monto: number
  tipo: 'inicial' | 'adicional'
  fecha?: string
}

const QUICK_AMOUNTS = [25, 50, 100, 200]

interface NuevaInversionDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (input: NuevaInversionInput) => Promise<void>
}

export function NuevaInversionDrawer({ open, onOpenChange, onSubmit }: NuevaInversionDrawerProps) {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, control, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
    defaultValues: { tipo: 'adicional', fecha: new Date().toISOString().split('T')[0] },
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const montoValue = watch('monto')

  async function handleFormSubmit(data: FormData) {
    setLoading(true)
    try {
      await onSubmit(data)
      reset()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl bg-surface px-4 pb-8">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-left text-text">Nueva Inversión</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Quick amounts */}
          <div>
            <Label className="text-xs text-muted uppercase tracking-wide">Monto rápido</Label>
            <div className="flex gap-2 mt-1.5">
              {QUICK_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setValue('monto', amt, { shouldValidate: true })}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                    montoValue === amt
                      ? 'bg-primary text-white border-primary'
                      : 'bg-background border-gray-200 text-text'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* Monto */}
          <div className="space-y-1.5">
            <Label htmlFor="monto">Monto ($)</Label>
            <Input
              id="monto"
              type="number"
              inputMode="decimal"
              placeholder="0"
              className="h-12 bg-background text-lg font-bold"
              {...register('monto')}
            />
            {errors.monto && <p className="text-xs text-danger">{errors.monto.message}</p>}
          </div>

          {/* Descripcion */}
          <div className="space-y-1.5">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              placeholder="Ej: Paquete de pan"
              className="h-12 bg-background"
              {...register('descripcion')}
            />
            {errors.descripcion && <p className="text-xs text-danger">{errors.descripcion.message}</p>}
          </div>

          {/* Tipo */}
          <div className="space-y-1.5">
            <Label>Tipo</Label>
            <Controller
              control={control}
              name="tipo"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-12 bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adicional">Adicional (entre semana)</SelectItem>
                    <SelectItem value="inicial">Inicial (inicio de mes)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Fecha */}
          <div className="space-y-1.5">
            <Label htmlFor="fecha">Fecha</Label>
            <Input
              id="fecha"
              type="date"
              className="h-12 bg-background"
              {...register('fecha')}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl"
          >
            {loading ? 'Guardando...' : 'Registrar inversión'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
