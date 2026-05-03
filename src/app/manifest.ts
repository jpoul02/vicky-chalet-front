import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Finanzas Pro-Tienda',
    short_name: 'FinPro',
    description: 'Control financiero para tu negocio',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#FAF7F2',
    theme_color: '#E85D26',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
