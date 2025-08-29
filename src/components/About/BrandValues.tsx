'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { HeartIcon, SparklesIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const BrandValues = () => {
  const values = [
    {
      icon: SparklesIcon,
      title: 'Luxury & Elegance',
      description: 'We believe that true luxury lies in the details. Every Veloura product is crafted with meticulous attention to quality, from our velvet-smooth formulas to our sophisticated packaging.',
      color: 'text-veloura-gold'
    },
    {
      icon: HeartIcon,
      title: 'Confidence & Empowerment',
      description: 'Beauty is about feeling confident in your own skin. Our products are designed to enhance your natural radiance and empower you to express your unique style with confidence.',
      color: 'text-veloura-burgundy'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Quality & Innovation',
      description: 'We never compromise on quality. Our research and development team works tirelessly to innovate new formulas that deliver exceptional performance while caring for your lips.',
      color: 'text-veloura-gold'
    },
    {
      icon: GlobeAltIcon,
      title: 'Sustainability & Ethics',
      description: 'We are committed to responsible beauty. All our products are cruelty-free, vegan, and packaged in recyclable materials. Beauty should never come at the expense of our planet.',
      color: 'text-veloura-burgundy'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-veloura-blush/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-veloura-burgundy mb-6">
            Our Values
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The principles that guide everything we do, from product development to customer experience. 
            These values are the foundation of the Veloura promise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-veloura-gold/20 to-veloura-burgundy/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <value.icon className={`h-8 w-8 ${value.color}`} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-serif font-semibold text-veloura-burgundy mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-serif font-bold text-veloura-burgundy mb-6">
              Experience the Veloura Difference
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Join thousands of women who have discovered luxury beauty that truly cares. 
              Every Veloura product embodies our commitment to excellence, innovation, and your confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Shop Our Collections
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Join Veloura Society
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BrandValues
