'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  GiftIcon, 
  TrophyIcon, 
  SparklesIcon, 
  HeartIcon,
  StarIcon,
  BoltIcon,
  CheckIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline'

const membershipTiers = [
  {
    id: 'luxe',
    name: 'Luxe Member',
    price: 'Free',
    color: 'from-gray-100 to-gray-200',
    icon: HeartIcon,
    benefits: [
      'Free shipping on orders $75+',
      'Birthday month 15% discount',
      'Early access to sales',
      'Member-only content',
      'Points on every purchase',
    ],
    points: '1 point per $1 spent',
  },
  {
    id: 'elite',
    name: 'Elite Member',
    price: '$50/year',
    color: 'from-rose-100 to-pink-200',
    icon: StarIcon,
    popular: true,
    benefits: [
      'All Luxe benefits',
      'Free shipping on all orders',
      'Birthday month 20% discount',
      'Quarterly exclusive product',
      'Double points on purchases',
      'VIP customer service',
    ],
    points: '2 points per $1 spent',
  },
  {
    id: 'royalty',
    name: 'Royalty Member',
    price: '$150/year',
    color: 'from-veloura-burgundy to-rose-900',
    icon: TrophyIcon,
    textColor: 'text-white',
    benefits: [
      'All Elite benefits',
      'Annual exclusive collection access',
      'Birthday month 25% discount',
      'Bi-monthly exclusive products',
      'Triple points on purchases',
      'Personal beauty consultant',
      'Invitation-only events',
    ],
    points: '3 points per $1 spent',
  },
]

const rewards = [
  { points: 100, reward: '10% off next purchase', icon: '🎯' },
  { points: 250, reward: 'Free mini lip gloss', icon: '💋' },
  { points: 500, reward: 'Free full-size product', icon: '🎁' },
  { points: 750, reward: '20% off next purchase', icon: '✨' },
  { points: 1000, reward: 'Exclusive limited edition shade', icon: '👑' },
  { points: 1500, reward: 'Private virtual consultation', icon: '💎' },
]

const VelouraSocietyPage = () => {
  const [selectedTier, setSelectedTier] = useState('elite')
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      // Here you would integrate with your email service
      console.log('Subscribing email:', email)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-veloura-burgundy via-rose-800 to-pink-700 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <TrophyIcon className="h-20 w-20 mx-auto mb-6 text-veloura-gold" />
            <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6">
              Welcome to Veloura Society
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed mb-8">
              Join our exclusive community of beauty enthusiasts and unlock a world of luxury, rewards, and personalized experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#membership"
                className="px-8 py-4 bg-veloura-gold text-veloura-burgundy rounded-lg hover:bg-veloura-gold/90 transition-colors font-semibold"
              >
                Join Society
              </Link>
              <Link
                href="#benefits"
                className="px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-veloura-burgundy transition-colors font-semibold"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Overview */}
      <section id="benefits" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair mb-4">
              Exclusive Member Benefits
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience luxury like never before with perks designed to enhance your beauty journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: GiftIcon,
                title: 'Exclusive Products',
                description: 'Access to member-only shades and limited editions before anyone else.',
              },
              {
                icon: SparklesIcon,
                title: 'Earn Points',
                description: 'Get rewarded for every purchase and redeem points for amazing benefits.',
              },
              {
                icon: BoltIcon,
                title: 'Early Access',
                description: 'Be the first to shop new collections and seasonal sales.',
              },
              {
                icon: HeartIcon,
                title: 'Personal Touch',
                description: 'Receive personalized recommendations and beauty consultations.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-veloura-burgundy text-white rounded-2xl mb-4">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section id="membership" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair mb-4">
              Choose Your Membership
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the membership tier that best fits your beauty needs and lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, index) => {
              const IconComponent = tier.icon
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative rounded-2xl p-8 bg-gradient-to-br ${tier.color} ${
                    tier.popular ? 'ring-2 ring-veloura-burgundy scale-105' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-veloura-burgundy text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <IconComponent className={`h-12 w-12 mx-auto mb-4 ${tier.textColor || 'text-gray-700'}`} />
                    <h3 className={`text-2xl font-bold mb-2 ${tier.textColor || 'text-gray-900'}`}>
                      {tier.name}
                    </h3>
                    <div className={`text-3xl font-bold ${tier.textColor || 'text-gray-900'}`}>
                      {tier.price}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start">
                        <CheckIcon className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${tier.textColor || 'text-gray-600'}`} />
                        <span className={`text-sm ${tier.textColor || 'text-gray-700'}`}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className={`text-center mb-6 ${tier.textColor || 'text-gray-700'}`}>
                    <span className="text-sm font-medium">{tier.points}</span>
                  </div>

                  <button
                    onClick={() => setSelectedTier(tier.id)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      tier.id === 'royalty'
                        ? 'bg-white text-veloura-burgundy hover:bg-gray-100'
                        : 'bg-veloura-burgundy text-white hover:bg-veloura-burgundy/90'
                    }`}
                  >
                    {tier.price === 'Free' ? 'Join Free' : 'Select Plan'}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Rewards Program */}
      <section className="py-16 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair mb-4">
              Rewards Program
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Earn points with every purchase and unlock exclusive rewards as you climb the beauty ladder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.points}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{reward.icon}</div>
                  <div className="text-lg font-bold text-veloura-burgundy mb-1">
                    {reward.points} Points
                  </div>
                  <div className="text-gray-700 font-medium">{reward.reward}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Newsletter */}
      <section className="py-16 bg-veloura-burgundy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get exclusive updates, beauty tips, and member-only offers delivered to your inbox.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-veloura-gold"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-veloura-gold text-veloura-burgundy rounded-lg hover:bg-veloura-gold/90 transition-colors font-semibold whitespace-nowrap"
                >
                  Join Now
                </button>
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2 text-veloura-gold">
                <CheckIcon className="h-6 w-6" />
                <span className="text-lg font-semibold">Welcome to Veloura Society!</span>
              </div>
              <p className="mt-2 opacity-90">Check your email for exclusive member content.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: 'How do I earn points?',
                answer: 'You earn points with every purchase, referrals, reviews, and special promotions. Points vary by membership tier.',
              },
              {
                question: 'When do my points expire?',
                answer: 'Points never expire as long as you remain an active member with at least one purchase per year.',
              },
              {
                question: 'Can I change my membership tier?',
                answer: 'Yes, you can upgrade or downgrade your membership at any time. Changes take effect immediately.',
              },
              {
                question: 'How do I redeem my rewards?',
                answer: 'You can redeem rewards at checkout or through your account dashboard. Some rewards are automatically applied.',
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default VelouraSocietyPage
