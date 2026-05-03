'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { markOnboardingDone } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { IlluOnboarding1 } from '@/components/illustrations/illu-onboarding-1'
import { IlluOnboarding2 } from '@/components/illustrations/illu-onboarding-2'
import { IlluOnboarding3 } from '@/components/illustrations/illu-onboarding-3'

const SLIDES = [
  {
    illustration: <IlluOnboarding1 width={180} height={150} />,
    titulo: 'Bienvenido a Finanzas Pro-Tienda',
    desc: 'Controlá las finanzas de tu negocio de forma simple, mes a mes.',
  },
  {
    illustration: <IlluOnboarding2 width={180} height={150} />,
    titulo: 'Registrá tus inversiones',
    desc: 'Cada vez que comprás materia prima o productos, registralo como inversión. Podés hacerlo desde la app o por WhatsApp.',
  },
  {
    illustration: <IlluOnboarding3 width={180} height={150} />,
    titulo: 'Cerrá el mes y ves tu ganancia',
    desc: 'Al final del mes ingresás el total de ventas. La app calcula tu ganancia real y te ayuda a decidir cuánto ahorrar.',
  },
]

interface OnboardingModalProps {
  open: boolean
  onClose: () => void
}

export function OnboardingModal({ open, onClose }: OnboardingModalProps) {
  const [slide, setSlide] = useState(0)
  const isLast = slide === SLIDES.length - 1
  const current = SLIDES[slide]

  function handleNext() {
    if (isLast) {
      markOnboardingDone()
      onClose()
    } else {
      setSlide((s) => s + 1)
    }
  }

  function handleSkip() {
    markOnboardingDone()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleSkip() }}>
      <DialogContent className="max-w-sm mx-auto rounded-3xl bg-surface p-6 flex flex-col items-center text-center gap-4">
        {/* Slide indicator */}
        <div className="flex gap-1.5 self-center">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === slide ? 'w-6 bg-primary' : 'w-1.5 bg-gray-200'
              )}
            />
          ))}
        </div>

        {/* Illustration */}
        <div className="flex items-center justify-center">{current.illustration}</div>

        <h2 className="text-xl font-bold text-text leading-snug">{current.titulo}</h2>
        <p className="text-sm text-muted leading-relaxed">{current.desc}</p>

        <Button
          onClick={handleNext}
          className="h-12 w-full bg-primary text-white rounded-xl font-semibold"
        >
          {isLast ? 'Comenzar' : 'Siguiente'}
        </Button>
        {!isLast && (
          <button onClick={handleSkip} className="text-sm text-muted">
            Omitir
          </button>
        )}
      </DialogContent>
    </Dialog>
  )
}
