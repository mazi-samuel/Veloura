import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Veloura | Where Velvet Meets Radiance',
  description: 'Luxury lip gloss collection featuring hydrating, non-sticky, skincare-infused formulas for the modern woman.',
  keywords: 'luxury lip gloss, beauty, skincare, velvet, radiance, high-end cosmetics',
  authors: [{ name: 'Veloura' }],
  openGraph: {
    title: 'Veloura | Where Velvet Meets Radiance',
    description: 'Luxury lip gloss collection featuring hydrating, non-sticky, skincare-infused formulas.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen pt-24">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
