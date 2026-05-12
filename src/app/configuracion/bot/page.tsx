'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, MessageCircle } from 'lucide-react'

const COMANDOS = [
  { cmd: '"gasté 50 en pan"', desc: 'Registra una inversión adicional de $50 con descripción "pan"' },
  { cmd: '"invertí 200 inicial"', desc: 'Registra una inversión inicial de $200' },
  { cmd: '"¿cuánto llevo?"', desc: 'Muestra el total de egresos del período activo' },
  { cmd: '"balance"', desc: 'Mismo que "¿cuánto llevo?"' },
]

export default function BotPage() {
  const router = useRouter()

  return (
    <div className="px-4 pt-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="text-neutral"><ArrowLeft size={20} /></button>
        <h1 className="text-lg font-bold text-text">Bot de WhatsApp</h1>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm p-4 space-y-3">
        <div className="flex items-center gap-2">
          <MessageCircle size={20} className="text-success" />
          <h2 className="font-semibold text-text">Comandos disponibles</h2>
        </div>
        {COMANDOS.map(({ cmd, desc }) => (
          <div key={cmd} className="border-b border-gray-50 last:border-0 pb-3 last:pb-0">
            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-primary">{cmd}</code>
            <p className="text-xs text-muted mt-1">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-2xl shadow-sm p-4">
        <h2 className="font-semibold text-text mb-2">Configuración del webhook</h2>
        <p className="text-xs text-muted">
          El webhook de WhatsApp se configura en el backend (FastAPI). Una vez desplegado en Railway, el endpoint es:
        </p>
        <code className="text-xs font-mono bg-gray-100 block px-3 py-2 rounded mt-2 text-neutral break-all">
          POST https://api.finanzas-pro.railway.app/v1/webhook/whatsapp
        </code>
        <p className="text-xs text-muted mt-2">
          Configura este URL en tu cuenta de Twilio o Meta Cloud API como webhook de mensajes entrantes.
        </p>
      </div>
    </div>
  )
}
