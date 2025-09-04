import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Providers } from './Providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'ObodoFarm | MVP',
  description: '...decentralized Cooperative Platform for African Smallholder FarmersCreated with v0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col">
        <Providers>
          {/* Fixed Header across all pages */}
          <Header />
          {/* Main content with proper spacing for fixed header */}
          <main className="pt-16 flex-1">
            {children}
          </main>
          {/* Footer across all pages */}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
