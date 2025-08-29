'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const FeaturedCollections = () => {
  const collections = [
    {
      id: 'classic-shine',
      name: 'Classic Shine',
      description: 'Timeless elegance meets modern luxury. Our signature collection offers brilliant shine with a comfortable, long-lasting formula.',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      shades: ['Ruby Velvet', 'Rose Gold', 'Champagne Kiss', 'Cherry Glow'],
      featured: true
    },
    {
      id: 'velvet-glow',
      name: 'Velvet Glow',
      description: 'Matte meets luxe in this sophisticated collection. Velvety finish with a subtle luminous undertone.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      shades: ['Burgundy Dreams', 'Mauve Mystique', 'Nude Noir', 'Coral Velvet'],
      featured: true
    },
    {
      id: 'lumine',
      name: 'Luminé',
      description: 'Limited edition collection featuring iridescent shades that transform with light. Pure luxury in every application.',
      image: 'https://images.unsplash.com/photo-1625186145516-56e54cb27394?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      shades: ['Golden Hour', 'Moonbeam', 'Sunset Shimmer', 'Starlight'],
      featured: true,
      isLimited: true
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-veloura-burgundy mb-6">
            Signature Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated collections, each designed to capture a different facet of luxury and sophistication.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="card-luxury overflow-hidden h-full">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {collection.isLimited && (
                    <div className="absolute top-4 left-4 bg-veloura-gold text-black px-3 py-1 rounded-full text-sm font-semibold">
                      Limited Edition
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-serif font-bold mb-2">
                      {collection.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {collection.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-veloura-burgundy mb-3">
                      Featured Shades:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {collection.shades.map((shade) => (
                        <span
                          key={shade}
                          className="text-sm bg-veloura-blush/50 text-veloura-burgundy px-3 py-1 rounded-full"
                        >
                          {shade}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/collections/${collection.id}`}
                      className="btn-primary text-center flex-1"
                    >
                      Explore Collection
                    </Link>
                    <Link
                      href={`/collections/${collection.id}#shop`}
                      className="btn-secondary text-center flex-1"
                    >
                      Quick Shop
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Collections CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/collections"
            className="inline-flex items-center text-veloura-burgundy hover:text-veloura-burgundy-light transition-colors text-lg font-semibold group"
          >
            View All Collections
            <svg
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedCollections
