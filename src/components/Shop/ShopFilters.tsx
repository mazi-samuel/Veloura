'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface FilterState {
  collections: string[]
  priceRange: [number, number]
  shades: string[]
  finish: string[]
  sortBy: string
}

const ShopFilters = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    collections: [],
    priceRange: [0, 100],
    shades: [],
    finish: [],
    sortBy: 'featured'
  })

  const collections = [
    { name: 'Classic Shine', count: 12 },
    { name: 'Velvet Glow', count: 8 },
    { name: 'Luminé', count: 6 },
    { name: 'Gift Sets', count: 4 }
  ]

  const shadeCategories = [
    { name: 'Nudes', count: 8 },
    { name: 'Reds', count: 6 },
    { name: 'Pinks', count: 10 },
    { name: 'Browns', count: 4 },
    { name: 'Clear', count: 2 }
  ]

  const finishTypes = [
    { name: 'High Gloss', count: 15 },
    { name: 'Velvet Matte', count: 8 },
    { name: 'Shimmer', count: 7 }
  ]

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'best-selling', label: 'Best Selling' }
  ]

  const handleCollectionChange = (collection: string) => {
    setFilters(prev => ({
      ...prev,
      collections: prev.collections.includes(collection)
        ? prev.collections.filter(c => c !== collection)
        : [...prev.collections, collection]
    }))
  }

  const handleShadeChange = (shade: string) => {
    setFilters(prev => ({
      ...prev,
      shades: prev.shades.includes(shade)
        ? prev.shades.filter(s => s !== shade)
        : [...prev.shades, shade]
    }))
  }

  const handleFinishChange = (finish: string) => {
    setFilters(prev => ({
      ...prev,
      finish: prev.finish.includes(finish)
        ? prev.finish.filter(f => f !== finish)
        : [...prev.finish, finish]
    }))
  }

  const clearFilters = () => {
    setFilters({
      collections: [],
      priceRange: [0, 100],
      shades: [],
      finish: [],
      sortBy: 'featured'
    })
  }

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Sort By */}
      <div>
        <h3 className="text-lg font-semibold text-veloura-burgundy mb-4">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Collections */}
      <div>
        <h3 className="text-lg font-semibold text-veloura-burgundy mb-4">Collections</h3>
        <div className="space-y-3">
          {collections.map(collection => (
            <label key={collection.name} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.collections.includes(collection.name)}
                onChange={() => handleCollectionChange(collection.name)}
                className="rounded border-gray-300 text-veloura-burgundy focus:ring-veloura-burgundy"
              />
              <span className="ml-3 text-gray-700 flex-1">{collection.name}</span>
              <span className="text-sm text-gray-500">({collection.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold text-veloura-burgundy mb-4">Price Range</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="100"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
            }))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Shade Categories */}
      <div>
        <h3 className="text-lg font-semibold text-veloura-burgundy mb-4">Shade</h3>
        <div className="space-y-3">
          {shadeCategories.map(shade => (
            <label key={shade.name} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.shades.includes(shade.name)}
                onChange={() => handleShadeChange(shade.name)}
                className="rounded border-gray-300 text-veloura-burgundy focus:ring-veloura-burgundy"
              />
              <span className="ml-3 text-gray-700 flex-1">{shade.name}</span>
              <span className="text-sm text-gray-500">({shade.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Finish */}
      <div>
        <h3 className="text-lg font-semibold text-veloura-burgundy mb-4">Finish</h3>
        <div className="space-y-3">
          {finishTypes.map(finish => (
            <label key={finish.name} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.finish.includes(finish.name)}
                onChange={() => handleFinishChange(finish.name)}
                className="rounded border-gray-300 text-veloura-burgundy focus:ring-veloura-burgundy"
              />
              <span className="ml-3 text-gray-700 flex-1">{finish.name}</span>
              <span className="text-sm text-gray-500">({finish.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full btn-secondary text-center"
      >
        Clear All Filters
      </button>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 btn-secondary"
        >
          <FunnelIcon className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute left-0 top-0 h-full w-80 bg-white overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-veloura-burgundy">Filters</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <FilterContent />
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default ShopFilters
