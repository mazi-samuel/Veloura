import React from 'react'
import ProductGrid from '@/components/Shop/ProductGrid'
import ShopFilters from '@/components/Shop/ShopFilters'
import ShopHeader from '@/components/Shop/ShopHeader'

export const metadata = {
  title: 'Shop All Products | Veloura',
  description: 'Discover our complete collection of luxury lip glosses. From Classic Shine to Velvet Glow and limited edition Luminé.',
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <ShopFilters />
          </aside>
          <main className="lg:w-3/4">
            <ProductGrid />
          </main>
        </div>
      </div>
    </div>
  )
}
