'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, DollarSign, MessageCircle, HelpCircle, LogOut } from 'lucide-react'
import { clearSession } from '@/lib/auth'

const ITEMS = [
  { href: '/configuracion/costos-fijos', icon: DollarSign, label: 'Costos fijos', desc: 'Salarios y alquiler' },
  { href: '/configuracion/bot', icon: MessageCircle, label: 'Bot de WhatsApp', desc: 'Comandos y configuración' },
]

export default function ConfiguracionPage() {
  const router = useRouter()

  function handleLogout() {
    clearSession()
    router.replace('/auth')
  }

  return (
    <div className="px-4 pt-6 space-y-4 lg:max-w-2xl lg:mx-auto lg:px-8 lg:pt-8">
      <h1 className="text-xl font-bold text-text">Configuración</h1>

      <div className="space-y-6">
        {ITEMS.map(({ href, icon: Icon, label, desc }) => (
          <Link key={href} href={href}>
            <div className="flex items-center gap-3 bg-surface rounded-2xl px-4 py-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-text">{label}</p>
                <p className="text-xs text-muted">{desc}</p>
              </div>
              <ChevronRight size={16} className="text-muted" />
            </div>
          </Link>
        ))}
      </div>

      {/* Ayuda section */}
      <div className="mt-6">
        <h2 className="text-xs text-muted uppercase tracking-wide font-semibold mb-3">Ayuda</h2>
        <div className="bg-surface rounded-2xl shadow-sm p-4 space-y-4">
          <div className="flex gap-3">
            <HelpCircle size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-text text-sm">¿Qué es una Inversión?</p>
              <p className="text-xs text-muted mt-1">
                Es el dinero que gastás en comprar productos o materia prima para vender (ej: paquetes de pan, ingredientes). Se registra cada vez que ocurre.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <HelpCircle size={20} className="text-neutral shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-text text-sm">¿Qué es un Costo Fijo?</p>
              <p className="text-xs text-muted mt-1">
                Son gastos que se repiten todos los meses: salarios de empleados y alquiler. Se configuran una sola vez y se suman automáticamente al corte mensual.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <HelpCircle size={20} className="text-neutral shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-text text-sm">¿Cómo se calcula la ganancia?</p>
              <p className="text-xs text-muted mt-1">
                Ganancia Real = Resultado Neto del mes − (Inversiones + Costos Fijos)
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 bg-surface rounded-2xl px-4 py-4 shadow-sm text-danger mt-2"
      >
        <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center shrink-0">
          <LogOut size={20} className="text-danger" />
        </div>
        <span className="font-medium">Cerrar sesión</span>
      </button>
    </div>
  )
}
