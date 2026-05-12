import axios from 'axios'
import {
  Usuario, Periodo, PeriodoConCorte, Inversion,
  CostoFijo, CorteResumen, TendenciasData,
  NuevaInversionInput, CierrePeriodoInput, NuevoCostoFijoInput, PeriodoPasadoInput
} from './types'
import {
  mockUsuario, mockPeriodoActivo, mockCorteActivo,
  mockInversionesActivo, mockPeriodosCerrados, mockCostosFijos,
  mockTendencias, mockPeriodosPasadosCreados
} from './mock-data'
import { getToken } from './auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/v1'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

// ─── Mock flag — set NEXT_PUBLIC_USE_MOCK=true in .env.local ─────────────────
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true'

function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<Usuario> {
  if (USE_MOCK) {
    await delay()
    if (password !== 'demo') throw new Error('Credenciales inválidas')
    return mockUsuario
  }
  const { data } = await apiClient.post<Usuario>('/auth/login', { email, password })
  return data
}

export async function loginWithPin(pin: string): Promise<Usuario> {
  if (USE_MOCK) {
    await delay()
    if (pin !== '000000') throw new Error('PIN incorrecto')
    return mockUsuario
  }
  const { data } = await apiClient.post<Usuario & { access_token: string }>('/auth/login-pin', { pin })
  const { setToken } = await import('./auth')
  setToken(data.access_token)
  return data
}

export async function logout(): Promise<void> {
  if (USE_MOCK) { await delay(); return }
  await apiClient.post('/auth/logout')
}

export async function getMe(): Promise<Usuario> {
  if (USE_MOCK) { await delay(); return mockUsuario }
  const { data } = await apiClient.get<Usuario>('/auth/me')
  return data
}

// ─── Períodos ─────────────────────────────────────────────────────────────────

export async function getPeriodos(): Promise<Periodo[]> {
  if (USE_MOCK) {
    await delay()
    return [mockPeriodoActivo, ...mockPeriodosCerrados, ...mockPeriodosPasadosCreados]
  }
  const { data } = await apiClient.get<Periodo[]>('/periodos')
  return data
}

export async function getPeriodoActivo(): Promise<Periodo | null> {
  if (USE_MOCK) { await delay(); return mockPeriodoActivo }
  const { data } = await apiClient.get<Periodo | null>('/periodos/activo')
  return data
}

export async function getPeriodo(id: string): Promise<PeriodoConCorte> {
  if (USE_MOCK) {
    await delay()
    const cerrado = mockPeriodosCerrados.find((p) => p.id === id)
    if (cerrado) {
      return {
        ...cerrado,
        corte: {
          periodoId: cerrado.id,
          totalInversiones: cerrado.totalInversionesSnapshot ?? 0,
          totalCostosFijos: cerrado.totalCostosFijosSnapshot ?? 0,
          totalEgresos: (cerrado.totalInversionesSnapshot ?? 0) + (cerrado.totalCostosFijosSnapshot ?? 0),
          resultadoNeto: cerrado.resultadoNeto ?? 0,
          gananciaReal: cerrado.gananciaReal ?? 0,
          margen: cerrado.resultadoNeto ? ((cerrado.gananciaReal ?? 0) / cerrado.resultadoNeto) * 100 : 0,
          ahorro: cerrado.ahorro ?? 0,
          inversionSiguiente: cerrado.inversionSiguiente ?? 0,
        },
      }
    }
    return { ...mockPeriodoActivo, corte: mockCorteActivo }
  }
  const { data } = await apiClient.get<PeriodoConCorte>(`/periodos/${id}`)
  return data
}

export async function crearPeriodo(año: number, mes: number): Promise<Periodo> {
  if (USE_MOCK) { await delay(); return { ...mockPeriodoActivo, año, mes } }
  const { data } = await apiClient.post<Periodo>('/periodos', { año, mes })
  return data
}

export async function crearPeriodoPasado(año: number, mes: number, input: PeriodoPasadoInput): Promise<Periodo> {
  if (USE_MOCK) {
    await delay()
    const gananciaReal = input.resultadoNeto - input.ahorro
    const nuevo: Periodo = {
      id: crypto.randomUUID(),
      usuarioId: '1',
      año,
      mes,
      estado: 'cerrado',
      resultadoNeto: input.resultadoNeto,
      totalInversionesSnapshot: 0,
      totalCostosFijosSnapshot: 0,
      gananciaReal,
      ahorro: input.ahorro,
      inversionSiguiente: 0,
      fechaCreacion: `${año}-${String(mes).padStart(2, '0')}-01T00:00:00Z`,
      fechaCierre: `${año}-${String(mes).padStart(2, '0')}-28T20:00:00Z`,
    }
    mockPeriodosPasadosCreados.push(nuevo)
    return nuevo
  }
  const { data } = await apiClient.post<Periodo>('/periodos/pasado', { año, mes, ...input })
  return data
}

export async function cerrarPeriodo(id: string, input: CierrePeriodoInput): Promise<CorteResumen> {
  if (USE_MOCK) {
    await delay()
    if (id !== mockPeriodoActivo.id) throw new Error(`Período ${id} no está activo`)
    const gananciaReal = input.resultadoNeto - mockCorteActivo.totalEgresos
    return { ...mockCorteActivo, resultadoNeto: input.resultadoNeto, gananciaReal, ahorro: input.ahorro, inversionSiguiente: gananciaReal - input.ahorro }
  }
  const { data } = await apiClient.patch<CorteResumen>(`/periodos/${id}/cerrar`, input)
  return data
}

// ─── Inversiones ─────────────────────────────────────────────────────────────

export async function getInversiones(periodoId: string): Promise<Inversion[]> {
  if (USE_MOCK) {
    await delay()
    if (periodoId !== mockPeriodoActivo.id) return []
    return mockInversionesActivo
  }
  const { data } = await apiClient.get<Inversion[]>(`/periodos/${periodoId}/inversiones`)
  return data
}

export async function crearInversion(periodoId: string, input: NuevaInversionInput): Promise<Inversion> {
  if (USE_MOCK) {
    await delay()
    return { id: crypto.randomUUID(), periodoId, ...input, fecha: input.fecha ?? new Date().toISOString().split('T')[0], origen: 'webapp', creadoEn: new Date().toISOString() }
  }
  const { data } = await apiClient.post<Inversion>(`/periodos/${periodoId}/inversiones`, input)
  return data
}

export async function eliminarInversion(id: string): Promise<void> {
  if (USE_MOCK) { await delay(); return }
  await apiClient.delete(`/inversiones/${id}`)
}

// ─── Costos Fijos ─────────────────────────────────────────────────────────────

export async function getCostosFijos(): Promise<CostoFijo[]> {
  if (USE_MOCK) { await delay(); return mockCostosFijos }
  const { data } = await apiClient.get<CostoFijo[]>('/costos-fijos')
  return data
}

export async function crearCostoFijo(input: NuevoCostoFijoInput): Promise<CostoFijo> {
  if (USE_MOCK) { await delay(); return { id: crypto.randomUUID(), ...input, activo: true } }
  const { data } = await apiClient.post<CostoFijo>('/costos-fijos', input)
  return data
}

export async function actualizarCostoFijo(id: string, changes: Partial<NuevoCostoFijoInput & { activo: boolean }>): Promise<CostoFijo> {
  if (USE_MOCK) {
    await delay()
    const base = mockCostosFijos.find((c) => c.id === id) ?? mockCostosFijos[0]
    return { ...base, ...changes }
  }
  const { data } = await apiClient.put<CostoFijo>(`/costos-fijos/${id}`, changes)
  return data
}

export async function eliminarCostoFijo(id: string): Promise<void> {
  if (USE_MOCK) { await delay(); return }
  await apiClient.delete(`/costos-fijos/${id}`)
}

// ─── Reportes ─────────────────────────────────────────────────────────────────

export async function getTendencias(): Promise<TendenciasData> {
  if (USE_MOCK) { await delay(); return mockTendencias }
  const { data } = await apiClient.get<TendenciasData>('/reportes/tendencias')
  return data
}
