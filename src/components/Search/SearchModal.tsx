'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { products, collections, categories, searchProducts } from '@/data/products'

// Pages data for search
const pages = [
  {
    id: 'about',
    name: 'About Veloura',
    description: 'Learn about our story and mission',
    url: '/about',
    type: 'page',
  },
  {
    id: 'society',
    name: 'Veloura Society',
    description: 'Join our exclusive membership program',
    url: '/society',
    type: 'page',
  },
  {
    id: 'blog',
    name: 'Beauty Blog',
    description: 'Beauty tips, trends, and tutorials',
    url: '/blog',
    type: 'page',
  },
  {
    id: 'contact',
    name: 'Contact Us',
    description: 'Get in touch with our team',
    url: '/contact',
    type: 'page',
  },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true)
      // Simulate API delay
      const timer = setTimeout(() => {
        performSearch(query)
        setIsLoading(false)
      }, 200)

      return () => clearTimeout(timer)
    } else {
      setResults([])
    }
  }, [query])

  const performSearch = (searchQuery: string) => {
    const normalizedQuery = searchQuery.toLowerCase().trim()
    const searchResults: any[] = []

    // Search products using centralized data
    const productResults = searchProducts(searchQuery)
    productResults.forEach(product => {
      const score = calculateRelevanceScore(normalizedQuery, {
        name: product.name,
        description: product.description,
        tags: product.tags,
        category: product.category,
      })
      if (score > 0) {
        searchResults.push({ 
          ...product, 
          score, 
          resultType: 'product',
          image: product.images[0] 
        })
      }
    })

    // Search collections
    collections.forEach(collection => {
      const score = calculateRelevanceScore(normalizedQuery, {
        name: collection.name,
        description: collection.description,
        tags: collection.tags,
      })
      if (score > 0) {
        searchResults.push({ 
          ...collection, 
          score, 
          resultType: 'collection',
          image: collection.images[0]
        })
      }
    })

    // Search pages
    pages.forEach(page => {
      const score = calculateRelevanceScore(normalizedQuery, {
        name: page.name,
        description: page.description,
      })
      if (score > 0) {
        searchResults.push({ ...page, score, resultType: 'page' })
      }
    })

    // Search categories
    categories.forEach(category => {
      const score = calculateRelevanceScore(normalizedQuery, {
        name: category.name,
        description: category.description,
      })
      if (score > 0) {
        searchResults.push({ ...category, score, resultType: 'category' })
      }
    })

    // Sort by relevance score and limit results
    const sortedResults = searchResults
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)

    setResults(sortedResults)
    setSelectedIndex(0)
  }

  const calculateRelevanceScore = (query: string, item: any) => {
    let score = 0
    const queryWords = query.split(' ')

    queryWords.forEach(word => {
      // Name match (highest priority)
      if (item.name.toLowerCase().includes(word)) {
        score += 10
      }

      // Description match
      if (item.description?.toLowerCase().includes(word)) {
        score += 5
      }

      // Tags match (for products)
      if (item.tags?.some((tag: string) => tag.toLowerCase().includes(word))) {
        score += 7
      }

      // Category match
      if (item.category?.toLowerCase().includes(word)) {
        score += 6
      }

      // Exact word match bonus
      if (item.name.toLowerCase() === word) {
        score += 15
      }
    })

    return score
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      handleResultClick(results[selectedIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const handleResultClick = (result: any) => {
    // Navigate to the appropriate page
    let url = ''
    switch (result.resultType) {
      case 'product':
        url = `/products/${result.id}`
        break
      case 'collection':
        url = `/collections/${result.id}`
        break
      case 'page':
        url = result.url
        break
      case 'category':
        url = `/shop?category=${result.id}`
        break
      default:
        url = '/shop'
    }
    
    window.location.href = url
    onClose()
  }

  const getResultIcon = (resultType: string) => {
    switch (resultType) {
      case 'product':
        return '💄'
      case 'collection':
        return '✨'
      case 'page':
        return '📄'
      case 'category':
        return '🏷️'
      default:
        return '🔍'
    }
  }

  const getResultSubtitle = (result: any) => {
    switch (result.resultType) {
      case 'product':
        return `${result.collection || result.category} • $${result.price}`
      case 'collection':
        return 'Collection'
      case 'page':
        return 'Page'
      case 'category':
        return 'Category'
      default:
        return ''
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-start justify-center min-h-screen pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center p-6 border-b border-gray-200">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products, collections, or anything..."
              className="flex-1 text-lg focus:outline-none placeholder-gray-400"
            />
            <button
              onClick={onClose}
              className="ml-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-veloura-burgundy"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={`${result.resultType}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors text-left ${
                      index === selectedIndex ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg mr-4 flex items-center justify-center text-xl">
                      {result.image && result.resultType === 'product' ? (
                        <Image
                          src={result.image}
                          alt={result.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        getResultIcon(result.resultType)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {result.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {getResultSubtitle(result)}
                      </div>
                      {result.description && (
                        <div className="text-sm text-gray-400 truncate mt-1">
                          {result.description}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : query.length > 0 ? (
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No results found for "{query}"</p>
                <p className="text-sm text-gray-400 mt-2">
                  Try searching for products, collections, or categories
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Start typing to search</p>
                <p className="text-sm text-gray-400 mt-2">
                  Find products, collections, and more
                </p>
              </div>
            )}
          </div>

          {/* Search Tips */}
          {query.length === 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="text-sm text-gray-500">
                <div className="font-medium mb-2">Quick tips:</div>
                <div className="space-y-1">
                  <div>• Try "red lipstick" or "signature collection"</div>
                  <div>• Use arrow keys to navigate results</div>
                  <div>• Press Enter to select</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SearchModal
