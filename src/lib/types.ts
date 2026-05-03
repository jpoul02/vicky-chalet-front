// ─── Core entities ───────────────────────────────────────────────────────────

export interface Usuario {
  id: string
  email: string
  negocioNombre: string
}

export interface Periodo {
  id: string
  usuarioId: string
  año: number
  mes: number // 1–12
  estado: 'activo' | 'cerrado'
  // Populated only on closed periods — frozen at close time
  resultadoNeto?: number
  totalInversionesSnapshot?: number
  totalCostosFijosSnapshot?: number
  gananciaReal?: number
  ahorro?: number
  inversionSiguiente?: number
  fechaCreacion: string
  fechaCierre?: string
}

export interface Inversion {
  id: string
  periodoId: string
  descripcion: string
  monto: number
  fecha: string // ISO date YYYY-MM-DD
  tipo: 'inicial' | 'adicional'
  origen: 'webapp' | 'whatsapp'
  creadoEn: string
}

export interface CostoFijo {
  id: string
  nombre: string
  monto: number
  tipo: 'salario' | 'alquiler' | 'otro'
  activo: boolean
}

// ─── Computed (returned by backend for active periods) ────────────────────────

export interface CorteResumen {
  periodoId: string
  totalInversiones: number
  totalCostosFijos: number
  totalEgresos: number
  resultadoNeto: number  // 0 while period is active
  gananciaReal: number   // 0 while period is active
  margen: number         // 0 while period is active
  ahorro: number
  inversionSiguiente: number
}

// ─── Form inputs ─────────────────────────────────────────────────────────────

export interface NuevaInversionInput {
  descripcion: string
  monto: number
  tipo: 'inicial' | 'adicional'
  fecha?: string
}

export interface CierrePeriodoInput {
  resultadoNeto: number
  ahorro: number
  inversionSiguiente: number
}

export interface PeriodoPasadoInput {
  resultadoNeto: number
  ahorro: number
}

export interface NuevoCostoFijoInput {
  nombre: string
  monto: number
  tipo: 'salario' | 'alquiler' | 'otro'
}

// ─── API response shapes ──────────────────────────────────────────────────────

export interface PeriodoConCorte extends Periodo {
  corte: CorteResumen
}

export interface TendenciasData {
  meses: string[]
  ganancias: number[]
  egresos: number[]
  inversiones: number[]
}
