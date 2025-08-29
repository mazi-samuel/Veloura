'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBagIcon, HeartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import Cart from '@/components/Cart/Cart'
import SearchModal from '@/components/Search/SearchModal'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { state: cartState, toggleCart } = useCart()
  const { state: authState } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
    { name: 'Veloura Society', href: '/society' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        {/* Top Bar */}
        <div className="bg-veloura-burgundy text-white text-sm py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <p className="text-center flex-1 truncate">
                Free shipping on orders over $75 | Join Veloura Society for exclusive perks
              </p>
              <div className="hidden md:flex space-x-4 text-xs">
                <span>USD</span>
                <span>•</span>
                <span>Help</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Mobile menu button */}
            <div className="md:hidden flex-shrink-0">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 hover:text-veloura-burgundy transition-colors"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <div className="text-2xl md:text-3xl font-serif font-bold text-veloura-burgundy">
                  Veloura
                </div>
                <div className="hidden sm:block text-xs text-gray-600 font-light max-w-[120px] truncate">
                  Where Velvet Meets Radiance
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-900 hover:text-veloura-burgundy transition-colors font-medium relative group whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-veloura-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-900 hover:text-veloura-burgundy transition-colors"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>

              {authState.isAuthenticated ? (
                <Link
                  href="/account"
                  className="text-gray-900 hover:text-veloura-burgundy transition-colors"
                >
                  <UserIcon className="h-6 w-6" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-900 hover:text-veloura-burgundy transition-colors"
                >
                  <UserIcon className="h-6 w-6" />
                </Link>
              )}

              <Link
                href="/wishlist"
                className="text-gray-900 hover:text-veloura-burgundy transition-colors relative"
              >
                <HeartIcon className="h-6 w-6" />
                {authState.user?.wishlist && authState.user.wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-veloura-burgundy text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {authState.user.wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleCart}
                className="text-gray-900 hover:text-veloura-burgundy transition-colors relative"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-veloura-burgundy text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartState.itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-900 hover:text-veloura-burgundy transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Cart Sidebar */}
      <Cart />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

export default Header
