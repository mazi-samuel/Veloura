'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface ProductReviewsProps {
  productId: string
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [sortBy, setSortBy] = useState('newest')
  const [showReviewForm, setShowReviewForm] = useState(false)

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      date: '2024-01-15',
      title: 'Absolutely love this!',
      content: 'This is hands down the best lip gloss I\'ve ever used. The color is stunning and it feels so comfortable on my lips. No stickiness at all and the staying power is incredible.',
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      name: 'Emma R.',
      rating: 5,
      date: '2024-01-10',
      title: 'Perfect everyday gloss',
      content: 'I wear this every single day now. The formula is so hydrating and the color is perfect for both work and going out. Will definitely be repurchasing.',
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      name: 'Maya C.',
      rating: 4,
      date: '2024-01-05',
      title: 'Beautiful color',
      content: 'The color is absolutely gorgeous and looks great on my skin tone. Only reason I didn\'t give 5 stars is that I wish it lasted a bit longer, but overall very happy with my purchase.',
      verified: true,
      helpful: 5
    }
  ]

  const overallRating = 4.9
  const totalReviews = 127

  const ratingBreakdown = [
    { stars: 5, percentage: 85, count: 108 },
    { stars: 4, percentage: 12, count: 15 },
    { stars: 3, percentage: 2, count: 3 },
    { stars: 2, percentage: 1, count: 1 },
    { stars: 1, percentage: 0, count: 0 }
  ]

  const renderStars = (rating: number, size = 'h-5 w-5') => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`${size} ${
              i < Math.floor(rating) ? 'text-veloura-gold' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
            Customer Reviews
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Rating Summary */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-veloura-burgundy mb-2">
                  {overallRating}
                </div>
                {renderStars(overallRating, 'h-6 w-6')}
                <p className="text-gray-600 mt-2">
                  Based on {totalReviews} reviews
                </p>
              </div>

              <div className="space-y-2">
                {ratingBreakdown.map(({ stars, percentage, count }) => (
                  <div key={stars} className="flex items-center space-x-2 text-sm">
                    <span className="w-2">{stars}</span>
                    <StarIcon className="h-4 w-4 text-veloura-gold" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-veloura-gold h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-600 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Write Review */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Share Your Experience
                </h3>
                <p className="text-gray-600 mb-6">
                  Have you tried this product? We'd love to hear your thoughts!
                </p>
                
                {!showReviewForm ? (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="btn-primary"
                  >
                    Write a Review
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <button key={i} className="text-gray-300 hover:text-veloura-gold">
                            <StarIcon className="h-6 w-6" />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Review Title
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
                        placeholder="Summarize your experience"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                      </label>
                      <textarea
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
                        placeholder="Tell us about your experience with this product"
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="btn-primary">
                        Submit Review
                      </button>
                      <button
                        onClick={() => setShowReviewForm(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Reviews ({totalReviews})
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veloura-burgundy focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-veloura-burgundy rounded-full flex items-center justify-center text-white font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">
                          {review.name}
                        </span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        {renderStars(review.rating, 'h-4 w-4')}
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 mb-2">
                        {review.title}
                      </h4>
                      
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {review.content}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="text-gray-500 hover:text-veloura-burgundy transition-colors">
                          Helpful ({review.helpful})
                        </button>
                        <button className="text-gray-500 hover:text-veloura-burgundy transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 text-center border-t border-gray-200">
              <button className="btn-secondary">
                Load More Reviews
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductReviews
