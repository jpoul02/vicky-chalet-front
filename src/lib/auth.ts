import type { Usuario } from './types'

const SESSION_KEY = 'finanzas_session'
const USER_KEY = 'finanzas_user'
const SESSION_DURATION_MS = 30 * 60 * 1000 // 30 minutes

interface Session {
  expiresAt: number
}

export function getCurrentUser(): Usuario | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Usuario
  } catch {
    return null
  }
}

export function setCurrentUser(user: Usuario): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

function clearCurrentUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(USER_KEY)
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return false
  try {
    const session = JSON.parse(raw) as Session
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY)
      return false
    }
    return true
  } catch {
    return false
  }
}

export function setAuthenticated(value: boolean): void {
  if (typeof window === 'undefined') return
  if (value) {
    const session: Session = { expiresAt: Date.now() + SESSION_DURATION_MS }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
}

export function refreshSession(): void {
  if (typeof window === 'undefined') return
  if (isAuthenticated()) {
    setAuthenticated(true)
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(SESSION_KEY)
  clearCurrentUser()
}

export function isFirstLogin(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('onboarding_done') !== 'true'
}

export function markOnboardingDone(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('onboarding_done', 'true')
}
