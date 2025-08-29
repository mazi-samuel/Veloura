'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, HeartIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

// Mock data for collections and their products
const collectionsData = {
  signature: {
    id: 'signature',
    name: 'Signature Collection',
    description: 'Our most beloved shades that define the Veloura aesthetic. These timeless colors have been carefully crafted to complement every skin tone and occasion.',
    hero_image: '/collections/signature-hero.jpg',
    story: 'Born from our founder\'s vision of creating the perfect everyday lip color, the Signature Collection represents the essence of Veloura - where luxury meets accessibility.',
    inspiration: 'Inspired by the natural beauty found in everyday moments, from the first blush of dawn to the golden hour of sunset.',
    products: [
      {
        id: '1',
        name: 'Velvet Rose',
        price: 28,
        image: '/products/velvet-rose.jpg',
        shade: '#D4506B',
        description: 'A sophisticated rose with velvet undertones',
        rating: 4.8,
        reviews: 124,
        bestseller: true,
      },
      {
        id: '2',
        name: 'Golden Honey',
        price: 28,
        image: '/products/golden-honey.jpg',
        shade: '#E6A867',
        description: 'Warm golden nude perfect for everyday wear',
        rating: 4.9,
        reviews: 89,
        bestseller: false,
      },
      {
        id: '3',
        name: 'Classic Berry',
        price: 28,
        image: '/products/classic-berry.jpg',
        shade: '#8B2F47',
        description: 'Deep berry that flatters all skin tones',
        rating: 4.7,
        reviews: 156,
        bestseller: true,
      },
    ]
  },
  'limited-edition': {
    id: 'limited-edition',
    name: 'Limited Edition',
    description: 'Exclusive, time-limited shades for the discerning collector. Each piece is a work of art, available only while supplies last.',
    hero_image: '/collections/limited-hero.jpg',
    story: 'Our Limited Edition releases celebrate special moments, collaborations, and seasonal inspirations that deserve to be commemorated in the most luxurious way.',
    inspiration: 'Drawing from haute couture, fine art, and rare gemstones to create truly unique shades you won\'t find anywhere else.',
    products: [
      {
        id: '4',
        name: 'Midnight Sapphire',
        price: 35,
        image: '/products/midnight-sapphire.jpg',
        shade: '#1B1B3A',
        description: 'Deep midnight blue with sapphire shimmer',
        rating: 4.9,
        reviews: 67,
        limited: true,
      },
      {
        id: '5',
        name: 'Rose Gold Luxe',
        price: 35,
        image: '/products/rose-gold-luxe.jpg',
        shade: '#E8B4B8',
        description: 'Lustrous rose gold with 24k accents',
        rating: 4.8,
        reviews: 45,
        limited: true,
      },
    ]
  },
  // Add more collections as needed
}

interface ProductCardProps {
  product: any
  isWishlisted: boolean
  onToggleWishlist: (productId: string) => void
  onAddToCart: (product: any) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isWishlisted, 
  onToggleWishlist, 
  onAddToCart 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
  >
    <div className="relative aspect-square bg-gray-100 overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      
      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {product.bestseller && (
          <span className="bg-veloura-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
            Bestseller
          </span>
        )}
        {product.limited && (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Limited Edition
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => onToggleWishlist(product.id)}
        className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors"
      >
        {isWishlisted ? (
          <HeartSolidIcon className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="h-5 w-5 text-gray-600" />
        )}
      </button>

      {/* Shade Preview */}
      <div className="absolute bottom-4 left-4">
        <div
          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: product.shade }}
        ></div>
      </div>
    </div>

    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
      
      <div className="flex items-center mb-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 ml-2">
          {product.rating} ({product.reviews} reviews)
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">${product.price}</span>
        <div className="flex space-x-2">
          <Link
            href={`/products/${product.id}`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            View Details
          </Link>
          <button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 bg-veloura-burgundy text-white rounded-lg hover:bg-veloura-burgundy/90 transition-colors text-sm flex items-center"
          >
            <ShoppingBagIcon className="h-4 w-4 mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </motion.div>
)

const CollectionDetailPage = () => {
  const params = useParams()
  const collectionId = params.id as string
  const [wishlistedItems, setWishlistedItems] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('name')

  const collection = collectionsData[collectionId as keyof typeof collectionsData]

  useEffect(() => {
    // Load wishlisted items from localStorage or API
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      setWishlistedItems(JSON.parse(saved))
    }
  }, [])

  const handleToggleWishlist = (productId: string) => {
    const newWishlist = wishlistedItems.includes(productId)
      ? wishlistedItems.filter(id => id !== productId)
      : [...wishlistedItems, productId]
    
    setWishlistedItems(newWishlist)
    localStorage.setItem('wishlist', JSON.stringify(newWishlist))
  }

  const handleAddToCart = (product: any) => {
    // Integrate with cart context
    console.log('Adding to cart:', product)
    // You would call your cart context here
  }

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Collection Not Found</h1>
          <p className="text-gray-600 mb-6">The collection you're looking for doesn't exist.</p>
          <Link
            href="/collections"
            className="inline-flex items-center px-6 py-3 bg-veloura-burgundy text-white rounded-lg hover:bg-veloura-burgundy/90 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Collections
          </Link>
        </div>
      </div>
    )
  }

  const sortedProducts = [...collection.products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-veloura-burgundy to-rose-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <Image
          src={collection.hero_image}
          alt={collection.name}
          fill
          className="object-cover mix-blend-overlay"
        />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <Link
              href="/collections"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Collections
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
                {collection.name}
              </h1>
              <p className="text-xl md:text-2xl font-light max-w-3xl">
                {collection.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Collection Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-6">The Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {collection.story}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Inspiration</h3>
              <p className="text-gray-600 leading-relaxed">
                {collection.inspiration}
              </p>
            </div>
            <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
              <Image
                src={collection.hero_image}
                alt={`${collection.name} inspiration`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair">
              Products ({collection.products.length})
            </h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistedItems.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* Related Collections */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-8 text-center">
            Explore More Collections
          </h2>
          <div className="flex justify-center">
            <Link
              href="/collections"
              className="px-8 py-4 bg-veloura-burgundy text-white rounded-lg hover:bg-veloura-burgundy/90 transition-colors font-medium"
            >
              View All Collections
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CollectionDetailPage
