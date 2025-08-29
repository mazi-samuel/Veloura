'use client'

import React from 'react'
import { motion } from 'framer-motion'

const ShopHeader = () => {
  return (
    <div className="bg-gradient-to-r from-veloura-burgundy to-veloura-burgundy-light text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Luxury Lip Gloss Collection
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Discover our complete range of hydrating, non-sticky, skincare-infused lip glosses. 
            From timeless classics to limited edition treasures.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ShopHeader
