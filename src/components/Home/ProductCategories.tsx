'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const ProductCategories = () => {
  const categories = [
    {
      id: 'liquid-lipstick',
      name: 'Liquid Lipsticks',
      description: 'Velvety matte finish with long-wearing formula',
      image: '/categories/liquid-lipsticks.jpg',
      featured: ['Velvet Radiance', 'Signature Collection'],
      price: 'From $28',
      benefits: ['12+ Hour Wear', 'Velvet Finish', 'Hydrating Formula']
    },
    {
      id: 'lip-gloss',
      name: 'Lip Glosses',
      description: 'High-shine formula with plumping effect',
      image: '/categories/lip-glosses.jpg',
      featured: ['Glossy Luxe'],
      price: 'From $26',
      benefits: ['Mirror Shine', 'Plumping Effect', 'Non-Sticky']
    },
    {
      id: 'lip-liner',
      name: 'Lip Liners',
      description: 'Precision application for perfect definition',
      image: '/categories/lip-liners.jpg',
      featured: ['Precision Liners'],
      price: 'From $22',
      benefits: ['Precise Application', 'Long-Wearing', 'Creamy Texture']
    },
    {
      id: 'lip-treatment',
      name: 'Lip Treatments',
      description: 'Advanced care for healthy, beautiful lips',
      image: '/categories/lip-treatments.jpg',
      featured: ['Repair & Therapy'],
      price: 'From $28',
      benefits: ['Overnight Repair', 'SPF Protection', 'Anti-Aging']
    },
    {
      id: 'lip-sets',
      name: 'Curated Sets',
      description: 'Complete lip routines in luxury packaging',
      image: '/categories/lip-sets.jpg',
      featured: ['Curated Sets'],
      price: 'From $58',
      benefits: ['Complete Routine', 'Gift Ready', 'Value Savings']
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-veloura-burgundy mb-6">
            Luxury Lip Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our complete range of premium lip products, each crafted with the finest ingredients and innovative technology for extraordinary results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Category Image */}
              <div className="relative h-48 bg-gradient-to-br from-veloura-burgundy/10 to-rose-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-veloura-burgundy text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {category.price}
                  </span>
                </div>
              </div>

              {/* Category Info */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-veloura-burgundy mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>

                {/* Featured Collections */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Featured Collections:</p>
                  <div className="flex flex-wrap gap-2">
                    {category.featured.map((collection) => (
                      <span
                        key={collection}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {collection}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Key Benefits:</p>
                  <ul className="space-y-1">
                    {category.benefits.map((benefit) => (
                      <li key={benefit} className="text-sm text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-veloura-gold rounded-full mr-2"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  href={`/collections?filter=${category.id}`}
                  className="inline-flex items-center justify-center w-full px-4 py-3 bg-veloura-burgundy text-white rounded-lg hover:bg-veloura-burgundy/90 transition-colors font-medium group-hover:scale-105 duration-300"
                >
                  Explore {category.name}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-veloura-burgundy to-rose-900 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-serif font-bold mb-4">
              Complete Your Luxury Lip Routine
            </h3>
            <p className="text-veloura-blush mb-8 text-lg max-w-2xl mx-auto">
              Build your perfect lip look with our expertly curated combinations. From everyday elegance to special occasion glamour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/collections"
                className="px-8 py-4 bg-veloura-gold text-veloura-burgundy rounded-lg hover:bg-veloura-gold/90 transition-colors font-semibold"
              >
                Shop All Collections
              </Link>
              <Link
                href="/quiz"
                className="px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-veloura-burgundy transition-colors font-semibold"
              >
                Take Shade Quiz
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductCategories
