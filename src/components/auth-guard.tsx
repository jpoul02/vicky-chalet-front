'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAuthenticated, refreshSession, getToken, clearSession } from '@/lib/auth'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (pathname === '/auth') {
      setReady(true)
      return
    }
    if (!isAuthenticated() || !getToken()) {
      clearSession()
      router.replace('/auth')
    } else {
      refreshSession()
      setReady(true)
    }
  }, [pathname, router])

  if (!ready) return null

  return <>{children}</>
}
