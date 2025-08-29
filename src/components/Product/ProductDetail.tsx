'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { HeartIcon, ShoppingBagIcon, ShareIcon, TruckIcon, ShieldCheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'

interface ProductDetailProps {
  productId: string
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  const { addItem, openCart } = useCart()
  const { addToWishlist, removeFromWishlist, state: authState } = useAuth()
  
  const [selectedShade, setSelectedShade] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Mock product data - in real app, fetch from API
  const product = {
    id: productId,
    name: 'Ruby Velvet',
    collection: 'Classic Shine',
    price: 28,
    originalPrice: 32,
    rating: 4.9,
    reviewCount: 127,
    description: 'Experience the perfect fusion of luxury and comfort with our Ruby Velvet lip gloss. This stunning shade delivers rich, vibrant color with a non-sticky, hydrating formula that feels weightless on your lips.',
    longDescription: `Our Ruby Velvet lip gloss is the epitome of luxury beauty. Infused with nourishing ingredients like hyaluronic acid, vitamin E, and peptides, this formula doesn't just deliver stunning color – it cares for your lips throughout the day.

    The velvet-smooth texture glides on effortlessly, providing full coverage with a beautiful glossy finish that won't feel sticky or heavy. Perfect for both day and evening wear, Ruby Velvet complements all skin tones with its universally flattering red undertones.`,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    shades: [
      { name: 'Ruby Velvet', hex: '#8B1538' },
      { name: 'Rose Gold', hex: '#E8B4B8' },
      { name: 'Champagne Kiss', hex: '#F7E7CE' }
    ],
    features: [
      'Hydrating formula with hyaluronic acid',
      'Non-sticky, comfortable wear',
      'Long-lasting color payoff',
      'Cruelty-free and vegan',
      'Dermatologist tested'
    ],
    ingredients: 'Polybutene, Diisostearyl Malate, Hydrogenated Polyisobutene, Phenyl Trimethicone, Tridecyl Trimellitate, Isononyl Isononanoate, Microcrystalline Wax, Silica Dimethyl Silylate',
    inStock: true,
    isBestSeller: true
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      shade: product.shades[selectedShade].name,
      collection: product.collection
    })
    openCart()
  }

  const handleWishlistToggle = () => {
    if (!authState.isAuthenticated) {
      // Redirect to login or show modal
      return
    }

    const isInWishlist = authState.user?.wishlist.includes(product.id)
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-5 w-5 ${
              i < Math.floor(rating) ? 'text-veloura-gold' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-medium text-gray-900">
          {rating}
        </span>
        <span className="ml-1 text-gray-600">
          ({product.reviewCount} reviews)
        </span>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-[600px] rounded-2xl overflow-hidden bg-gray-100"
          >
            <Image
              src={product.images[selectedImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Badges */}
            <div className="absolute top-6 left-6 space-y-2">
              {product.isBestSeller && (
                <span className="bg-veloura-burgundy text-white px-3 py-1 rounded-full text-sm font-medium">
                  Best Seller
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Sale
                </span>
              )}
            </div>
          </motion.div>

          {/* Thumbnail Images */}
          <div className="flex space-x-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative h-20 w-20 rounded-lg overflow-hidden ${
                  selectedImageIndex === index
                    ? 'ring-2 ring-veloura-burgundy'
                    : 'ring-1 ring-gray-200'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-4">
              <span className="text-veloura-burgundy font-medium">
                {product.collection}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {renderStars(product.rating)}

            <div className="flex items-center space-x-4 mt-6">
              <span className="text-3xl font-bold text-veloura-burgundy">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mt-6">
              {product.description}
            </p>
          </motion.div>

          {/* Shade Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Choose Your Shade
            </h3>
            <div className="flex space-x-3">
              {product.shades.map((shade, index) => (
                <button
                  key={shade.name}
                  onClick={() => setSelectedShade(index)}
                  className={`relative p-1 rounded-full ${
                    selectedShade === index
                      ? 'ring-2 ring-veloura-burgundy ring-offset-2'
                      : 'ring-1 ring-gray-300'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full border border-gray-200"
                    style={{ backgroundColor: shade.hex }}
                  />
                  {selectedShade === index && (
                    <div className="absolute inset-0 rounded-full bg-white/20" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Selected: {product.shades[selectedShade].name}
            </p>
          </motion.div>

          {/* Quantity & Add to Cart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              
              <button
                onClick={handleWishlistToggle}
                className="btn-secondary flex items-center justify-center px-4"
              >
                <HeartIcon className="h-5 w-5" />
              </button>
              
              <button className="btn-secondary flex items-center justify-center px-4">
                <ShareIcon className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Product Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="text-center">
                <TruckIcon className="h-8 w-8 text-veloura-burgundy mx-auto mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders $75+</p>
              </div>
              <div className="text-center">
                <ArrowPathIcon className="h-8 w-8 text-veloura-burgundy mx-auto mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-600">30-day policy</p>
              </div>
              <div className="text-center">
                <ShieldCheckIcon className="h-8 w-8 text-veloura-burgundy mx-auto mb-2" />
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-gray-600">SSL protected</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-veloura-gold rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Product Description */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 max-w-4xl"
      >
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
          Product Details
        </h2>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="leading-relaxed whitespace-pre-line">
            {product.longDescription}
          </p>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ingredients
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.ingredients}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProductDetail
