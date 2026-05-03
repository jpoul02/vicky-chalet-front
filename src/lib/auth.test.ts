import { describe, it, expect, beforeEach, vi } from 'vitest'
import { isAuthenticated, setAuthenticated, clearSession, refreshSession, isFirstLogin, markOnboardingDone } from './auth'

describe('auth helpers', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useRealTimers()
  })

  it('returns false when no session set', () => {
    expect(isAuthenticated()).toBe(false)
  })

  it('returns true after setAuthenticated(true)', () => {
    setAuthenticated(true)
    expect(isAuthenticated()).toBe(true)
  })

  it('session expires after 30 minutes', () => {
    vi.useFakeTimers()
    setAuthenticated(true)
    expect(isAuthenticated()).toBe(true)
    vi.advanceTimersByTime(30 * 60 * 1000 + 1)
    expect(isAuthenticated()).toBe(false)
  })

  it('refreshSession extends expiry', () => {
    vi.useFakeTimers()
    setAuthenticated(true)
    vi.advanceTimersByTime(25 * 60 * 1000) // 25 min
    refreshSession()
    vi.advanceTimersByTime(10 * 60 * 1000) // 10 more min (35 total from start)
    expect(isAuthenticated()).toBe(true) // refreshed, so still valid
  })

  it('clearSession removes auth', () => {
    setAuthenticated(true)
    clearSession()
    expect(isAuthenticated()).toBe(false)
  })

  it('isFirstLogin true by default', () => {
    expect(isFirstLogin()).toBe(true)
  })

  it('isFirstLogin false after markOnboardingDone', () => {
    markOnboardingDone()
    expect(isFirstLogin()).toBe(false)
  })
})
