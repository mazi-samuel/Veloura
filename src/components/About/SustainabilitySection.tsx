'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SparklesIcon, ArrowPathIcon, HeartIcon } from '@heroicons/react/24/outline'

const SustainabilitySection = () => {
  const initiatives = [
    {
      icon: SparklesIcon,
      title: 'Cruelty-Free Beauty',
      description: 'We have never and will never test on animals. All our products are certified cruelty-free and we work only with suppliers who share our ethical standards.',
      stats: '100% Cruelty-Free'
    },
    {
      icon: ArrowPathIcon,
      title: 'Sustainable Packaging',
      description: 'Our packaging is designed with the environment in mind. We use recyclable materials and are continuously working to reduce our environmental footprint.',
      stats: '85% Recyclable Materials'
    },
    {
      icon: HeartIcon,
      title: 'Giving Back',
      description: 'Through our Veloura Cares program, we donate 1% of our profits to organizations supporting women\'s empowerment and education around the world.',
      stats: '$50K+ Donated in 2024'
    }
  ]

  return (
    <section className="py-20 bg-veloura-burgundy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Responsible Beauty
          </h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
            Beauty with purpose. We believe luxury should never come at the expense of our values, 
            our planet, or the communities we serve.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-veloura-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <initiative.icon className="h-8 w-8 text-black" />
                </div>
                
                <h3 className="text-xl font-serif font-semibold mb-4">
                  {initiative.title}
                </h3>
                
                <p className="opacity-90 leading-relaxed mb-6">
                  {initiative.description}
                </p>

                <div className="text-veloura-gold font-bold text-lg">
                  {initiative.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg opacity-90 mb-8">
            Learn more about our sustainability initiatives and how you can join us in making a difference.
          </p>
          <button className="btn-gold">
            Read Our Impact Report
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default SustainabilitySection
