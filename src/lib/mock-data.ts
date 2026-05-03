import type { Periodo, Inversion, CostoFijo, CorteResumen, TendenciasData, Usuario } from './types'

export const mockUsuario: Usuario = {
  id: '1',
  email: 'dueno@tienda.com',
  negocioNombre: 'Mi Tienda Escolar',
}

export const mockCostosFijos: CostoFijo[] = [
  { id: '1', nombre: 'Salario Empleada 1', monto: 500, tipo: 'salario', activo: true },
  { id: '2', nombre: 'Salario Empleada 2', monto: 500, tipo: 'salario', activo: true },
  { id: '3', nombre: 'Alquiler Local', monto: 300, tipo: 'alquiler', activo: true },
]

export const mockPeriodoActivo: Periodo = {
  id: 'p-mayo-2026',
  usuarioId: '1',
  año: 2026,
  mes: 5,
  estado: 'activo',
  fechaCreacion: '2026-05-01T00:00:00Z',
}

export const mockInversionesActivo: Inversion[] = [
  { id: 'i1', periodoId: 'p-mayo-2026', descripcion: 'Paquetes de pan', monto: 120, fecha: '2026-05-01', tipo: 'inicial', origen: 'webapp', creadoEn: '2026-05-01T08:00:00Z' },
  { id: 'i2', periodoId: 'p-mayo-2026', descripcion: 'Ingredientes sándwich', monto: 80, fecha: '2026-05-01', tipo: 'inicial', origen: 'webapp', creadoEn: '2026-05-01T08:10:00Z' },
  { id: 'i3', periodoId: 'p-mayo-2026', descripcion: 'Bebidas', monto: 150, fecha: '2026-05-05', tipo: 'adicional', origen: 'whatsapp', creadoEn: '2026-05-05T10:00:00Z' },
]

export const mockCorteActivo: CorteResumen = {
  periodoId: 'p-mayo-2026',
  totalInversiones: 350,
  totalCostosFijos: 1300,
  totalEgresos: 1650,
  resultadoNeto: 0,
  gananciaReal: 0,
  margen: 0,
  ahorro: 0,
  inversionSiguiente: 0,
}

export const mockPeriodosCerrados: Periodo[] = [
  { id: 'p-abr-2026', usuarioId: '1', año: 2026, mes: 4, estado: 'cerrado', resultadoNeto: 2800, totalInversionesSnapshot: 600, totalCostosFijosSnapshot: 1300, gananciaReal: 900, ahorro: 400, inversionSiguiente: 500, fechaCreacion: '2026-04-01T00:00:00Z', fechaCierre: '2026-04-30T20:00:00Z' },
  { id: 'p-mar-2026', usuarioId: '1', año: 2026, mes: 3, estado: 'cerrado', resultadoNeto: 2500, totalInversionesSnapshot: 550, totalCostosFijosSnapshot: 1300, gananciaReal: 650, ahorro: 300, inversionSiguiente: 350, fechaCreacion: '2026-03-01T00:00:00Z', fechaCierre: '2026-03-31T20:00:00Z' },
  { id: 'p-feb-2026', usuarioId: '1', año: 2026, mes: 2, estado: 'cerrado', resultadoNeto: 2200, totalInversionesSnapshot: 480, totalCostosFijosSnapshot: 1300, gananciaReal: 420, ahorro: 200, inversionSiguiente: 220, fechaCreacion: '2026-02-01T00:00:00Z', fechaCierre: '2026-02-28T20:00:00Z' },
]

export const mockTendencias: TendenciasData = {
  meses: ['Feb', 'Mar', 'Abr', 'May'],
  ganancias: [420, 650, 900, 0],
  egresos: [1780, 1850, 1900, 1650],
  inversiones: [480, 550, 600, 350],
}

export const mockPeriodosPasadosCreados: Periodo[] = []

export const NOMBRE_MES: Record<number, string> = {
  1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril',
  5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto',
  9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre',
}
