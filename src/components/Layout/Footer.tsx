'use client'

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)
      setEmail('')
      // Reset after 3 seconds to allow multiple subscriptions for demo
      setTimeout(() => setIsSubscribed(false), 3000)
    }, 1000)
  }
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/shop' },
        { name: 'Classic Shine', href: '/collections/classic-shine' },
        { name: 'Velvet Glow', href: '/collections/velvet-glow' },
        { name: 'Luminé', href: '/collections/lumine' },
        { name: 'Gift Sets', href: '/shop/gift-sets' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Story', href: '/about#story' },
        { name: 'Sustainability', href: '/sustainability' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Veloura Society',
      links: [
        { name: 'Join Now', href: '/society' },
        { name: 'Member Benefits', href: '/society#benefits' },
        { name: 'Exclusive Access', href: '/society#exclusive' },
        { name: 'Loyalty Program', href: '/society#loyalty' },
        { name: 'Refer a Friend', href: '/society#refer' },
      ],
    },
  ]

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/veloura', icon: '📸' },
    { name: 'TikTok', href: 'https://tiktok.com/@veloura', icon: '🎵' },
    { name: 'YouTube', href: 'https://youtube.com/veloura', icon: '📺' },
    { name: 'Pinterest', href: 'https://pinterest.com/veloura', icon: '📌' },
  ]

  return (
    <footer className="bg-gray-50 border-t">
      {/* Newsletter Section */}
      <div className="bg-veloura-burgundy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {isSubscribed ? (
            <div className="max-w-md mx-auto">
              <div className="bg-veloura-gold text-black rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Welcome to Veloura Society! 🎉</h3>
                <p className="text-sm">Thank you for subscribing. Check your email for a special welcome gift!</p>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-3xl font-serif font-bold mb-4">
                Join Veloura Society
              </h3>
              <p className="text-lg mb-8 opacity-90">
                Get early access to new collections, exclusive offers, and beauty tips
              </p>
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-veloura-gold"
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-veloura-gold hover:bg-veloura-gold-light text-black font-semibold px-6 py-3 rounded-r-md transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Joining...' : 'Subscribe'}
                </button>
              </form>
              <p className="text-sm mt-4 opacity-75">
                By subscribing, you agree to our Privacy Policy and Terms of Service
              </p>
            </>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <div className="text-2xl font-serif font-bold text-veloura-burgundy mb-4">
              Veloura
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Where velvet meets radiance. Luxury lip gloss collection featuring 
              hydrating, non-sticky, skincare-infused formulas for the modern woman.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <EnvelopeIcon className="h-4 w-4" />
                <span className="text-sm">hello@veloura.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <PhoneIcon className="h-4 w-4" />
                <span className="text-sm">1-800-VELOURA</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-gray-900 mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-veloura-burgundy transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-veloura-burgundy transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600">
              <div className="flex space-x-4">
                <Link href="/privacy" className="hover:text-veloura-burgundy transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-veloura-burgundy transition-colors">
                  Terms of Service
                </Link>
                <Link href="/accessibility" className="hover:text-veloura-burgundy transition-colors">
                  Accessibility
                </Link>
              </div>
              <p>© {currentYear} Veloura. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
