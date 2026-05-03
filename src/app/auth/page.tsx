'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Store, Delete } from 'lucide-react'
import { verifyPin } from '@/lib/auth-actions'
import { setAuthenticated, isFirstLogin } from '@/lib/auth'
import { OnboardingModal } from '@/components/onboarding-modal'
import { cn } from '@/lib/utils'

const PIN_LENGTH = 6

const PAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', '⌫'],
]

export default function AuthPage() {
  const router = useRouter()
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  async function submit(value: string) {
    setLoading(true)
    setError(false)
    const ok = await verifyPin(value)
    if (ok) {
      setAuthenticated(true)
      if (isFirstLogin()) {
        setShowOnboarding(true)
      } else {
        router.replace('/dashboard')
      }
    } else {
      setError(true)
      setPin('')
    }
    setLoading(false)
  }

  function handleDigit(key: string) {
    if (pin.length === PIN_LENGTH - 1 && key !== '⌫') {
      const next = pin + key
      setPin(next)
      submit(next)
      return
    }
    if (loading) return
    if (key === '⌫') {
      setPin((p) => p.slice(0, -1))
      setError(false)
      return
    }
    if (pin.length < PIN_LENGTH - 1) {
      setPin((p) => p + key)
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-6 bg-background">
      <div className="w-full max-w-xs flex flex-col items-center gap-8">
        {/* Brand */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Store size={36} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-text">Finanzas Pro-Tienda</h1>
          <p className="text-sm text-muted mt-1">Ingresá tu PIN de 6 dígitos</p>
        </div>

        {/* PIN dots */}
        <div className="flex gap-3">
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-4 h-4 rounded-full border-2 transition-all',
                i < pin.length
                  ? error
                    ? 'bg-danger border-danger'
                    : 'bg-primary border-primary'
                  : 'border-gray-300 bg-transparent'
              )}
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-danger -mt-4">PIN incorrecto. Intentá de nuevo.</p>
        )}

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {PAD.flat().map((key, i) => {
            if (key === '') return <div key={i} />
            return (
              <button
                key={i}
                onClick={() => handleDigit(key)}
                disabled={loading}
                className={cn(
                  'h-16 rounded-2xl text-xl font-semibold transition-colors select-none',
                  key === '⌫'
                    ? 'bg-transparent text-neutral flex items-center justify-center'
                    : 'bg-surface text-text active:bg-gray-200 shadow-sm'
                )}
              >
                {key === '⌫' ? <Delete size={22} /> : key}
              </button>
            )
          })}
        </div>
      </div>

      <OnboardingModal
        open={showOnboarding}
        onClose={() => router.replace('/dashboard')}
      />
    </div>
  )
}
