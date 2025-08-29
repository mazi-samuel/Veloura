'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

const SocialProof = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, NY',
      rating: 5,
      text: 'Absolutely obsessed with Veloura! The texture is incredible - not sticky at all, and the color payoff is amazing. I get compliments every time I wear it.',
      product: 'Classic Shine - Ruby Velvet'
    },
    {
      id: 2,
      name: 'Emma Rodriguez',
      location: 'Los Angeles, CA',
      rating: 5,
      text: 'I have tried so many lip glosses and this is hands down the best. The formula is so hydrating and the shine lasts for hours without feeling heavy.',
      product: 'Velvet Glow - Burgundy Dreams'
    },
    {
      id: 3,
      name: 'Maya Chen',
      location: 'Chicago, IL',
      rating: 5,
      text: 'The limited edition Luminé collection is pure magic! The way it catches the light is stunning. Definitely worth the investment for special occasions.',
      product: 'Luminé - Golden Hour'
    }
  ]

  const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '4.9/5', label: 'Average Rating' },
    { value: '98%', label: 'Would Recommend' },
    { value: '24/7', label: 'Customer Support' }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-veloura-blush/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-veloura-burgundy mb-12">
            Loved by Beauty Enthusiasts Worldwide
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-veloura-burgundy mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-veloura-gold rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>

              {/* Rating */}
              <div className="flex mb-4 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-veloura-gold" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Product */}
              <div className="text-sm text-veloura-burgundy font-medium mb-4 bg-veloura-blush/50 rounded-lg px-3 py-2">
                {testimonial.product}
              </div>

              {/* Reviewer Info */}
              <div>
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonial.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 mt-16 pt-8 border-t border-gray-200"
        >
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7l-8-5z"/>
            </svg>
            <span className="text-sm font-medium">Cruelty-Free</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7l-8-5z"/>
            </svg>
            <span className="text-sm font-medium">Vegan Formula</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7l-8-5z"/>
            </svg>
            <span className="text-sm font-medium">Dermatologist Tested</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="text-sm font-medium">30-Day Guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SocialProof
