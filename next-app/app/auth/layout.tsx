"use client"

import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './auth.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  adjustFontFallback: false
})

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
      </head>
      <body className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <main className="w-full max-w-md mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
