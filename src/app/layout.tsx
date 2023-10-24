import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { APPNAME } from '@/lib/constants'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: APPNAME,
  description: APPNAME,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
