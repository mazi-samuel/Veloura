'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HeartIcon, ShoppingBagIcon, EyeIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  collection: string
  shades: string[]
  rating: number
  reviewCount: number
  isLimited?: boolean
  isBestSeller?: boolean
}

const ProductGrid = () => {
  const { addItem } = useCart()
  const { addToWishlist, removeFromWishlist, state: authState } = useAuth()

  const products: Product[] = [
    {
      id: '1',
      name: 'Ruby Velvet',
      price: 28,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      collection: 'Classic Shine',
      shades: ['Ruby Velvet'],
      rating: 4.9,
      reviewCount: 127,
      isBestSeller: true
    },
    {
      id: '2',
      name: 'Burgundy Dreams',
      price: 32,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      collection: 'Velvet Glow',
      shades: ['Burgundy Dreams'],
      rating: 4.8,
      reviewCount: 89
    },
    {
      id: '3',
      name: 'Golden Hour',
      price: 42,
      originalPrice: 48,
      image: 'https://images.unsplash.com/photo-1625186145516-56e54cb27394?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      collection: 'Luminé',
      shades: ['Golden Hour'],
      rating: 5.0,
      reviewCount: 203,
      isLimited: true
    },
    {
      id: '4',
      name: 'Rose Gold',
      price: 28,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      collection: 'Classic Shine',
      shades: ['Rose Gold'],
      rating: 4.7,
      reviewCount: 156
    },
    {
      id: '5',
      name: 'Mauve Mystique',
      price: 32,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      collection: 'Velvet Glow',
      shades: ['Mauve Mystique'],
      rating: 4.6,
      reviewCount: 92
    },
    {
      id: '6',
      name: 'Sunset Shimmer',
      price: 42,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      collection: 'Luminé',
      shades: ['Sunset Shimmer'],
      rating: 4.9,
      reviewCount: 174,
      isLimited: true
    }
  ]

  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

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
          <svg
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? 'text-veloura-gold' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      shade: product.shades[0],
      collection: product.collection
    })
  }

  const handleWishlistToggle = (productId: string) => {
    if (!authState.isAuthenticated) {
      // Redirect to login or show modal
      return
    }

    const isInWishlist = authState.user?.wishlist.includes(productId)
    if (isInWishlist) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(productId)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            All Products
          </h2>
          <p className="text-gray-600 mt-1">
            {products.length} products
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onHoverStart={() => setHoveredProduct(product.id)}
            onHoverEnd={() => setHoveredProduct(null)}
            className="group"
          >
            <div className="card-luxury">
              <div className="relative">
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-80 overflow-hidden rounded-t-xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 space-y-2">
                      {product.isBestSeller && (
                        <span className="bg-veloura-burgundy text-white px-2 py-1 rounded-full text-xs font-medium">
                          Best Seller
                        </span>
                      )}
                      {product.isLimited && (
                        <span className="bg-veloura-gold text-black px-2 py-1 rounded-full text-xs font-medium">
                          Limited Edition
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => handleWishlistToggle(product.id)}
                      className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      {authState.user?.wishlist.includes(product.id) ? (
                        <HeartSolidIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </Link>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredProduct === product.id ? 1 : 0,
                    y: hoveredProduct === product.id ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 left-4 right-4 flex space-x-2"
                >
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-veloura-burgundy hover:bg-veloura-burgundy-light text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                  >
                    <ShoppingBagIcon className="h-4 w-4" />
                    <span className="text-sm">Add to Cart</span>
                  </button>
                  <Link
                    href={`/products/${product.id}`}
                    className="bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>

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
                    {product.reviewCount} reviews
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-veloura-burgundy">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="btn-secondary">
          Load More Products
        </button>
      </div>
    </div>
  )
}

export default ProductGrid
