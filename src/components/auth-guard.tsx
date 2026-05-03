'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAuthenticated, refreshSession } from '@/lib/auth'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/auth') return
    if (!isAuthenticated()) {
      router.replace('/auth')
    } else {
      refreshSession()
    }
  }, [pathname, router])

  if (pathname !== '/auth' && !isAuthenticated()) {
    return null
  }

  return <>{children}</>
}
