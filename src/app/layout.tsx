import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { ShellLayout } from '@/components/shell-layout'
import { AuthGuard } from '@/components/auth-guard'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Finanzas Pro-Tienda',
  description: 'Control financiero para tu negocio',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'FinPro' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#E85D26',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geist.className} bg-background min-h-screen`}>
        <AuthGuard>
          <ShellLayout>{children}</ShellLayout>
        </AuthGuard>
      </body>
    </html>
  )
}
