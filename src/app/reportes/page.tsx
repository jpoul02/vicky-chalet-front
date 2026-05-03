'use client'

import { useState, useEffect } from 'react'
import { getTendencias } from '@/lib/api'
import type { TendenciasData } from '@/lib/types'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'

export default function ReportesPage() {
  const [data, setData] = useState<TendenciasData | null>(null)

  useEffect(() => {
    getTendencias().then(setData)
  }, [])

  if (!data) return <div className="flex items-center justify-center min-h-screen"><p className="text-muted text-sm">Cargando...</p></div>

  const chartData = data.meses.map((mes, i) => ({
    mes,
    Ganancia: data.ganancias[i],
    Egresos: data.egresos[i],
    Inversiones: data.inversiones[i],
  }))

  const totalGanancia = data.ganancias.reduce((a, b) => a + b, 0)
  const promedioEgresos = Math.round(data.egresos.reduce((a, b) => a + b, 0) / data.egresos.length)

  return (
    <div className="px-4 pt-6 space-y-5 lg:max-w-2xl lg:mx-auto lg:px-8 lg:pt-8">
      <h1 className="text-xl font-bold text-text">Reportes</h1>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface rounded-2xl shadow-sm p-4">
          <p className="text-xs text-muted uppercase tracking-wide">Ganancia acumulada</p>
          <p className="text-xl font-bold text-success mt-1">
            ${totalGanancia.toLocaleString('es-SV')}
          </p>
        </div>
        <div className="bg-surface rounded-2xl shadow-sm p-4">
          <p className="text-xs text-muted uppercase tracking-wide">Egresos promedio</p>
          <p className="text-xl font-bold text-text mt-1">
            ${promedioEgresos.toLocaleString('es-SV')}
          </p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm p-4">
        <h2 className="text-sm font-semibold text-text mb-4">Ganancia por mes</h2>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="gananciaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip formatter={(v: unknown) => `$${typeof v === 'number' ? v.toLocaleString('es-SV') : String(v)}`} />
            <Area type="monotone" dataKey="Ganancia" stroke="#22C55E" strokeWidth={2} fill="url(#gananciaGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm p-4">
        <h2 className="text-sm font-semibold text-text mb-4">Egresos vs Inversiones</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip formatter={(v: unknown) => `$${typeof v === 'number' ? v.toLocaleString('es-SV') : String(v)}`} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="Egresos" fill="#E85D26" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Inversiones" fill="#FAB95B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
