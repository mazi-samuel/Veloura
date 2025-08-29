'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const BrandStory = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-veloura-burgundy mb-6">
                The Veloura Vision
              </h2>
              <div className="w-20 h-1 bg-veloura-gold mb-8"></div>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Veloura was born from a simple yet revolutionary idea: luxury beauty should 
                never compromise on comfort or care. Founded in 2023 by beauty innovator Sofia 
                Chen, our brand represents the perfect fusion of velvet elegance and radiant beauty.
              </p>

              <p>
                After years in the beauty industry, Sofia recognized a gap in the market. Women 
                were forced to choose between stunning color payoff and comfortable wear. Traditional 
                lip glosses were either sticky and uncomfortable or lacked the vibrant, long-lasting 
                color that modern women deserved.
              </p>

              <p>
                The breakthrough came during a trip to Milan, where Sofia discovered an innovative 
                velvet-texture technology used in luxury fashion. Inspired by the way velvet feels 
                smooth yet substantial, she envisioned a lip gloss that would deliver the same 
                luxurious sensation.
              </p>

              <p>
                Three years of research and development later, working with leading cosmetic chemists 
                and skincare experts, Veloura launched with our signature promise: 
                <span className="font-semibold text-veloura-burgundy">
                  "Hydrating. Non-sticky. Skincare-infused luxury."
                </span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-veloura-burgundy">2023</div>
                <div className="text-sm text-gray-600">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-veloura-burgundy">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-veloura-burgundy">3</div>
                <div className="text-sm text-gray-600">Signature Collections</div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Veloura founder and luxury beauty products"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Floating Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 bg-white p-8 rounded-xl shadow-xl max-w-sm"
            >
              <blockquote className="text-gray-700 italic mb-4">
                "Every woman deserves to feel luxurious and confident. 
                Veloura is my gift to the world – beauty without compromise."
              </blockquote>
              <div className="font-semibold text-veloura-burgundy">
                – Sofia Chen, Founder
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BrandStory
