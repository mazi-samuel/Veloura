'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SparklesIcon, HeartIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const USPSection = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: 'Hydrating Formula',
      description: 'Infused with nourishing ingredients like hyaluronic acid and vitamin E for long-lasting moisture.',
      color: 'text-veloura-gold'
    },
    {
      icon: HeartIcon,
      title: 'Non-Sticky Finish',
      description: 'Luxurious velvet texture that feels weightless and comfortable on your lips all day.',
      color: 'text-veloura-burgundy'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Skincare-Infused',
      description: 'Enriched with antioxidants and peptides that care for your lips while delivering stunning color.',
      color: 'text-veloura-gold'
    }
  ]

  return (
    <section className="py-20 bg-veloura-blush/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-veloura-burgundy mb-6">
            The Veloura Difference
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect fusion of luxury beauty and advanced skincare. 
            Our revolutionary formula delivers uncompromising glamour while nurturing your lips.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <feature.icon className={`h-10 w-10 ${feature.color}`} />
                </div>
                <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-veloura-gold/20 to-veloura-burgundy/20 -z-10 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </div>
              
              <h3 className="text-2xl font-serif font-semibold text-veloura-burgundy mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-serif font-bold text-veloura-burgundy mb-4">
              Ready to Experience Luxury?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Join thousands of women who have discovered the perfect lip gloss that combines beauty with care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Shop Collections
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default USPSection
