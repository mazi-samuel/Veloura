'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HeartIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'

const WishlistPage = () => {
  const { state: authState } = useAuth()
  const { addItem } = useCart()

  // Mock wishlist data for demo
  const wishlistItems = [
    {
      id: '1',
      name: 'Velvet Rose',
      price: 28,
      image: '/products/velvet-rose.jpg',
      inStock: true,
      category: 'Signature Collection',
      rating: 4.8,
      reviewCount: 124,
    },
    {
      id: '2',
      name: 'Golden Hour',
      price: 28,
      image: '/products/golden-hour.jpg',
      inStock: true,
      category: 'Limited Edition',
      rating: 4.9,
      reviewCount: 89,
    },
    {
      id: '3',
      name: 'Midnight Berry',
      price: 28,
      image: '/products/midnight-berry.jpg',
      inStock: false,
      category: 'Signature Collection',
      rating: 4.7,
      reviewCount: 156,
    },
  ]

  const handleAddToCart = (item: any) => {
    // This would integrate with your actual cart system
    console.log('Adding to cart:', item)
    // addItem(item)
  }

  const handleRemoveFromWishlist = (itemId: string) => {
    // This would integrate with your actual wishlist system
    console.log('Removing from wishlist:', itemId)
  }

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view your wishlist</h2>
          <p className="text-gray-600 mb-6">
            Save your favorite products and access them anytime.
          </p>
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-veloura-burgundy hover:bg-veloura-burgundy/90 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">My Wishlist</h1>
          <p className="text-gray-600 mt-2">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Start browsing and save your favorite products to your wishlist.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-veloura-burgundy hover:bg-veloura-burgundy/90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors"
                  >
                    <TrashIcon className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(item.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">
                      {item.rating} ({item.reviewCount})
                    </span>
                  </div>
                  
                  <p className="text-xl font-bold text-gray-900 mb-4">
                    ${item.price}
                  </p>

                  {/* Actions */}
                  <div className="space-y-2">
                    {item.inStock ? (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-veloura-burgundy hover:bg-veloura-burgundy/90 transition-colors"
                      >
                        <ShoppingBagIcon className="h-4 w-4 mr-2" />
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-500 bg-gray-100 cursor-not-allowed"
                      >
                        Notify When Available
                      </button>
                    )}
                    
                    <Link
                      href={`/products/${item.id}`}
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {wishlistItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">
              You might also like
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mock recommendation items */}
                {[1, 2, 3].map((item) => (
                  <div key={item} className="text-center">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3"></div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Recommended Product {item}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">$28</p>
                    <button className="text-sm text-veloura-burgundy hover:underline">
                      Add to Wishlist
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistPage
