'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronRightIcon, SparklesIcon } from '@heroicons/react/24/outline'

// Mock collections data - easily scalable
const collections = [
  {
    id: 'signature',
    name: 'Signature Collection',
    description: 'Our most beloved shades that define the Veloura aesthetic',
    image: '/collections/signature-collection.jpg',
    products: 12,
    featured: true,
    season: 'All Year',
    tags: ['bestseller', 'classic'],
    launchDate: '2024-01-15',
  },
  {
    id: 'limited-edition',
    name: 'Limited Edition',
    description: 'Exclusive, time-limited shades for the discerning collector',
    image: '/collections/limited-edition.jpg',
    products: 6,
    featured: true,
    season: 'Spring 2024',
    tags: ['exclusive', 'limited'],
    launchDate: '2024-03-01',
  },
  {
    id: 'velvet-dreams',
    name: 'Velvet Dreams',
    description: 'Rich, deep shades inspired by luxurious velvet textures',
    image: '/collections/velvet-dreams.jpg',
    products: 8,
    featured: false,
    season: 'Fall 2024',
    tags: ['rich', 'deep'],
    launchDate: '2024-09-15',
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    description: 'Warm, luminous shades that capture the magic of sunset',
    image: '/collections/golden-hour.jpg',
    products: 10,
    featured: false,
    season: 'Summer 2024',
    tags: ['warm', 'luminous'],
    launchDate: '2024-06-01',
  },
  {
    id: 'midnight-muse',
    name: 'Midnight Muse',
    description: 'Bold, mysterious shades for the night owls and rebels',
    image: '/collections/midnight-muse.jpg',
    products: 7,
    featured: false,
    season: 'Winter 2024',
    tags: ['bold', 'mysterious'],
    launchDate: '2024-12-01',
  },
  {
    id: 'rose-garden',
    name: 'Rose Garden',
    description: 'Romantic pinks and roses inspired by blooming gardens',
    image: '/collections/rose-garden.jpg',
    products: 9,
    featured: false,
    season: 'Spring 2024',
    tags: ['romantic', 'pink'],
    launchDate: '2024-04-15',
  },
]

const CollectionsPage = () => {
  const [filteredCollections, setFilteredCollections] = useState(collections)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  const filters = [
    { value: 'all', label: 'All Collections' },
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'bestseller', label: 'Bestsellers' },
    { value: 'limited', label: 'Limited Edition' },
  ]

  const sortOptions = [
    { value: 'featured', label: 'Featured First' },
    { value: 'newest', label: 'Newest First' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'products', label: 'Most Products' },
  ]

  useEffect(() => {
    let filtered = [...collections]

    // Apply filters
    switch (selectedFilter) {
      case 'featured':
        filtered = filtered.filter(collection => collection.featured)
        break
      case 'newest':
        filtered = filtered.sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()).slice(0, 3)
        break
      case 'bestseller':
        filtered = filtered.filter(collection => collection.tags.includes('bestseller'))
        break
      case 'limited':
        filtered = filtered.filter(collection => collection.tags.includes('limited') || collection.tags.includes('exclusive'))
        break
    }

    // Apply sorting
    switch (sortBy) {
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime())
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'products':
        filtered.sort((a, b) => b.products - a.products)
        break
    }

    setFilteredCollections(filtered)
  }, [selectedFilter, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-veloura-burgundy text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-veloura-burgundy to-rose-900 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SparklesIcon className="h-16 w-16 mx-auto mb-6 text-veloura-gold" />
            <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6">
              Our Collections
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              Discover curated collections that celebrate the art of beauty, each telling its own story of elegance and sophistication.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter.value
                    ? 'bg-veloura-burgundy text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-veloura-burgundy hover:text-veloura-burgundy'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Collections Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {filteredCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Collection Image */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {collection.featured && (
                  <div className="absolute top-4 left-4 bg-veloura-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                {collection.tags.includes('limited') && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Limited
                  </div>
                )}
              </div>

              {/* Collection Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 font-playfair">
                    {collection.name}
                  </h3>
                  <span className="text-sm text-gray-500">{collection.season}</span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {collection.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    {collection.products} products
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {collection.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/collections/${collection.id}`}
                  className="inline-flex items-center justify-center w-full px-4 py-3 bg-veloura-burgundy text-white rounded-lg hover:bg-veloura-burgundy/90 transition-colors font-medium"
                >
                  Explore Collection
                  <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No collections found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedFilter('all')
                setSortBy('featured')
              }}
              className="mt-4 text-veloura-burgundy hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-20 bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair mb-4">
            Can't decide? Let us help you find your perfect shade.
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Take our personalized shade quiz to discover which Veloura collection and shades are made for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="px-8 py-4 bg-veloura-burgundy text-white rounded-lg hover:bg-veloura-burgundy/90 transition-colors font-medium"
            >
              Take Shade Quiz
            </Link>
            <Link
              href="/shop"
              className="px-8 py-4 border border-veloura-burgundy text-veloura-burgundy rounded-lg hover:bg-veloura-burgundy hover:text-white transition-colors font-medium"
            >
              Shop All Products
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CollectionsPage
