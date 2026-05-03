'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, BarChart2, Settings, Store } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/periodos', icon: Calendar, label: 'Períodos' },
  { href: '/reportes', icon: BarChart2, label: 'Reportes' },
  { href: '/configuracion', icon: Settings, label: 'Config' },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="w-16 min-h-screen bg-text hidden lg:flex flex-col items-center py-4 gap-2 shrink-0">
      {/* Brand mark */}
      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mb-4">
        <Store size={20} className="text-white" />
      </div>

      {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={href}
            href={href}
            title={label}
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
              isActive ? 'text-primary bg-white/10' : 'text-[#888] hover:text-white hover:bg-white/5'
            )}
          >
            <Icon size={20} />
          </Link>
        )
      })}
    </aside>
  )
}
