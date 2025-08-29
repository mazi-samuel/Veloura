'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

interface RelatedProductsProps {
  productId: string
}

const RelatedProducts = ({ productId }: RelatedProductsProps) => {
  // Mock related products - in real app, fetch based on productId
  const relatedProducts = [
    {
      id: '2',
      name: 'Rose Gold',
      price: 28,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      collection: 'Classic Shine',
      rating: 4.7,
      reviewCount: 156
    },
    {
      id: '3',
      name: 'Burgundy Dreams',
      price: 32,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      collection: 'Velvet Glow',
      rating: 4.8,
      reviewCount: 89
    },
    {
      id: '4',
      name: 'Golden Hour',
      price: 42,
      originalPrice: 48,
      image: 'https://images.unsplash.com/photo-1625186145516-56e54cb27394?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      collection: 'Luminé',
      rating: 5.0,
      reviewCount: 203,
      isLimited: true
    },
    {
      id: '5',
      name: 'Champagne Kiss',
      price: 28,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      collection: 'Classic Shine',
      rating: 4.6,
      reviewCount: 92
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? 'text-veloura-gold' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            You Might Also Love
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover more shades and collections that complement your style
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card-luxury">
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-64 overflow-hidden rounded-t-xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {product.isLimited && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-veloura-gold text-black px-2 py-1 rounded-full text-xs font-medium">
                          Limited Edition
                        </span>
                      </div>
                    )}

                    {product.originalPrice && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Sale
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-veloura-burgundy font-medium">
                      {product.collection}
                    </span>
                  </div>
                  
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-veloura-burgundy transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center mb-3">
                    {renderStars(product.rating)}
                    <span className="ml-2 text-sm text-gray-500">
                      ({product.reviewCount})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-veloura-burgundy">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className="mt-4 w-full btn-secondary text-center text-sm"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/shop"
            className="btn-primary text-lg px-8 py-4"
          >
            Shop All Products
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default RelatedProducts
