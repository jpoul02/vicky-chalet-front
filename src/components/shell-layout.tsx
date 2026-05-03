'use client'

import { usePathname } from 'next/navigation'
import { BottomNav } from './bottom-nav'
import { SidebarNav } from './sidebar-nav'

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuth = pathname === '/auth'

  return (
    <div className="min-h-screen bg-background lg:flex">
      {!isAuth && <SidebarNav />}
      <main className="flex-1 min-h-screen max-w-md mx-auto pb-20 lg:max-w-none lg:mx-0 lg:pb-0 lg:overflow-y-auto">
        {children}
      </main>
      {!isAuth && <BottomNav />}
    </div>
  )
}
