'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, CalendarDays, BarChart2, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const TABS = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/periodos', label: 'Períodos', icon: CalendarDays },
  { href: '/reportes', label: 'Reportes', icon: BarChart2 },
  { href: '/configuracion', label: 'Config', icon: Settings },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-gray-100 pb-safe lg:hidden">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'relative flex flex-col items-center gap-0.5 px-4 py-2 text-xs font-medium transition-colors',
                active ? 'text-primary' : 'text-neutral'
              )}
            >
              <Icon
                size={22}
                className={cn(active && 'stroke-primary')}
                strokeWidth={active ? 2.5 : 1.8}
              />
              {label}
              {active && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
