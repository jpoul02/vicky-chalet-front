import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BottomNav } from './bottom-nav'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}))

describe('BottomNav', () => {
  it('renders 4 tabs', () => {
    render(<BottomNav />)
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Períodos')).toBeInTheDocument()
    expect(screen.getByText('Reportes')).toBeInTheDocument()
    expect(screen.getByText('Config')).toBeInTheDocument()
  })

  it('marks dashboard tab as active on /dashboard', () => {
    render(<BottomNav />)
    const link = screen.getByRole('link', { name: /inicio/i })
    expect(link).toHaveClass('text-primary')
  })
})
