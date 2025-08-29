'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { EnvelopeIcon, CheckIcon } from '@heroicons/react/24/outline'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)
      setEmail('')
    }, 1000)
  }

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-veloura-burgundy to-veloura-burgundy-light text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-12"
          >
            <div className="w-16 h-16 bg-veloura-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-4">
              Welcome to Veloura Society!
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Thank you for joining our exclusive community. You'll be the first to know about new collections, limited editions, and special offers.
            </p>
            <p className="text-sm opacity-75">
              Check your email for a special welcome gift 💎
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-veloura-burgundy to-veloura-burgundy-light text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-veloura-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-veloura-gold rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Join Veloura Society
            </h2>
            <p className="text-xl md:text-2xl font-light mb-4 opacity-90">
              Where Luxury Meets Exclusivity
            </p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
              Be the first to discover new collections, enjoy exclusive member benefits, 
              and receive personalized beauty recommendations from our experts.
            </p>
          </div>

          {/* Benefits List */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-veloura-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-xl">✨</span>
              </div>
              <h4 className="font-semibold mb-2">Early Access</h4>
              <p className="text-sm opacity-80">First to shop limited editions and new launches</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-veloura-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-xl">🎁</span>
              </div>
              <h4 className="font-semibold mb-2">Exclusive Perks</h4>
              <p className="text-sm opacity-80">Special discounts and birthday surprises</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-veloura-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-xl">💄</span>
              </div>
              <h4 className="font-semibold mb-2">Beauty Tips</h4>
              <p className="text-sm opacity-80">Expert advice and application tutorials</p>
            </motion.div>
          </div>

          {/* Newsletter Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="relative flex items-center mb-4">
                <EnvelopeIcon className="absolute left-4 w-5 h-5 text-white/70" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-veloura-gold focus:border-transparent"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-veloura-gold hover:bg-veloura-gold-light text-black font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Joining Society...
                  </span>
                ) : (
                  'Join Veloura Society'
                )}
              </button>

              <p className="text-xs opacity-75 mt-4 leading-relaxed">
                By subscribing, you agree to our Privacy Policy and Terms of Service. 
                You can unsubscribe at any time.
              </p>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsletterSignup
