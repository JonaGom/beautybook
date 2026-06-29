import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { NEGOCIO } from '@/lib/datos-ejemplo'

export const metadata: Metadata = {
  title: `${NEGOCIO.nombre} — Reservá tu turno`,
  description: NEGOCIO.descripcion,
  themeColor: '#FDFBF7',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#3D3530',
              color: '#FDFBF7',
              borderRadius: '12px',
              padding: '12px 20px',
            },
            success: {
              iconTheme: { primary: '#9BAF9B', secondary: '#FDFBF7' },
            },
          }}
        />
      </body>
    </html>
  )
}
