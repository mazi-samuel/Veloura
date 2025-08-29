import React from 'react'
import ProductDetail from '@/components/Product/ProductDetail'
import RelatedProducts from '@/components/Product/RelatedProducts'
import ProductReviews from '@/components/Product/ProductReviews'

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  // In a real app, fetch product data here
  return {
    title: `Product | Veloura`,
    description: 'Luxury lip gloss with hydrating, non-sticky formula.',
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <ProductDetail productId={params.id} />
      <ProductReviews productId={params.id} />
      <RelatedProducts productId={params.id} />
    </div>
  )
}
